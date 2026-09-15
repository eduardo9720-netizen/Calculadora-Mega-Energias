import type {
  CalculationResult,
  InverterSize,
  SelectedItem,
  SystemMode,
} from "./types";

export const SYSTEM_EFFICIENCY = 0.85;
export const PEAK_SUN_HOURS = 5.5;
export const WATTS_PER_PANEL = 550;
export const DOD_LITIO = 0.9;
export const DEFAULT_KWH_PER_BATTERY = 16;
export const DEFAULT_AUTONOMY_DAYS = 1;
export const SYSTEM_VOLTAGE = 48;
export const INVERTER_SAFETY_FACTOR = 1.25;
export const MAX_PARALLEL_UNITS_SINGLE_PHASE = 6; // 6 x 15 kVA = 30 kVA monofásico

// Real Victron MultiPlus-II 48V commercial lineup (continuous @25°C / peak), never invent intermediate sizes.
export const INVERTER_SIZES: InverterSize[] = [
  { kva: 3, model: "MultiPlus-II 48/3000", continuousW: 2400, peakW: 5500 },
  { kva: 4.5, model: "MultiPlus-II 48/4500", continuousW: 4000, peakW: 7200 },
  { kva: 5, model: "MultiPlus-II 48/5000", continuousW: 4000, peakW: 9000 },
  { kva: 8, model: "MultiPlus-II 48/8000", continuousW: 6400, peakW: 15000 },
  { kva: 10, model: "MultiPlus-II 48/10000", continuousW: 8000, peakW: 18000 },
  { kva: 15, model: "MultiPlus-II 48/15000", continuousW: 12000, peakW: 27000 },
];

const LARGEST_INVERTER = INVERTER_SIZES[INVERTER_SIZES.length - 1];

export interface CalculationOptions {
  autonomyDays?: number;
  kwhPerBattery?: number;
  efficiency?: number;
  peakSunHours?: number;
  wattsPerPanel?: number;
}

function sumWh(items: SelectedItem[], essentialOnly: boolean): number {
  return items.reduce((sum, s) => {
    if (essentialOnly && !s.essential) return sum;
    return sum + s.item.watts * s.quantity * s.hours;
  }, 0);
}

function sumConnectedW(items: SelectedItem[], essentialOnly: boolean): number {
  return items.reduce((sum, s) => {
    if (essentialOnly && !s.essential) return sum;
    return sum + s.item.watts * s.quantity;
  }, 0);
}

function pickInverter(requiredW: number): {
  size: InverterSize | null;
  parallelUnits: number | null;
  exceedsSinglePhaseMax: boolean;
} {
  if (requiredW <= 0) {
    return { size: null, parallelUnits: null, exceedsSinglePhaseMax: false };
  }
  const fit = INVERTER_SIZES.find((s) => s.continuousW >= requiredW);
  if (fit) {
    return { size: fit, parallelUnits: null, exceedsSinglePhaseMax: false };
  }
  const units = Math.ceil(requiredW / LARGEST_INVERTER.continuousW);
  return {
    size: LARGEST_INVERTER,
    parallelUnits: units,
    exceedsSinglePhaseMax: units > MAX_PARALLEL_UNITS_SINGLE_PHASE,
  };
}

export function calculate(
  items: SelectedItem[],
  mode: SystemMode,
  options: CalculationOptions = {}
): CalculationResult {
  const efficiency = options.efficiency ?? SYSTEM_EFFICIENCY;
  const peakSunHours = options.peakSunHours ?? PEAK_SUN_HOURS;
  const wattsPerPanel = options.wattsPerPanel ?? WATTS_PER_PANEL;
  const autonomyDays = options.autonomyDays ?? DEFAULT_AUTONOMY_DAYS;
  const kwhPerBattery = options.kwhPerBattery ?? DEFAULT_KWH_PER_BATTERY;

  const dailyWhTotal = sumWh(items, false);
  const dailyWhEssential = sumWh(items, true);
  const totalConnectedW = sumConnectedW(items, false);
  const essentialConnectedW = sumConnectedW(items, true);

  // Solar array always sized on total household consumption (savings benefit applies in every mode).
  const adjustedWhForSolar = dailyWhTotal / efficiency;
  const solarArrayW = adjustedWhForSolar / peakSunHours;
  const panelCount = Math.ceil(solarArrayW / wattsPerPanel);

  if (mode === "sin-respaldo") {
    // Mode 4: grid-interactive, no battery. No Victron MultiPlus-II claim (it's a hybrid
    // charger/inverter, not a pure grid-tie unit) — show only estimated capacity, brand TBD.
    return {
      mode,
      dailyWhTotal,
      dailyWhEssential,
      adjustedWhForSolar,
      solarArrayW,
      panelCount,
      batteryBaseWh: null,
      bankWh: null,
      bankKWh: null,
      batteryCount: null,
      kwhPerBattery,
      totalConnectedW,
      essentialConnectedW,
      requiredInverterContinuousW: null,
      inverterSize: null,
      inverterParallelUnits: null,
      inverterExceedsSinglePhaseMax: false,
      gridTieEstimatedKW: solarArrayW / 1000,
    };
  }

  const batteryBaseWh =
    mode === "respaldo-parcial" ? dailyWhEssential / efficiency : adjustedWhForSolar;
  const bankWh = (batteryBaseWh * autonomyDays) / DOD_LITIO;
  const bankKWh = bankWh / 1000;
  const batteryCount = Math.ceil(bankKWh / kwhPerBattery);

  const inverterLoadW =
    mode === "respaldo-parcial" ? essentialConnectedW : totalConnectedW;
  const requiredInverterContinuousW = inverterLoadW * INVERTER_SAFETY_FACTOR;
  const { size, parallelUnits, exceedsSinglePhaseMax } = pickInverter(
    requiredInverterContinuousW
  );

  return {
    mode,
    dailyWhTotal,
    dailyWhEssential,
    adjustedWhForSolar,
    solarArrayW,
    panelCount,
    batteryBaseWh,
    bankWh,
    bankKWh,
    batteryCount,
    kwhPerBattery,
    totalConnectedW,
    essentialConnectedW,
    requiredInverterContinuousW,
    inverterSize: size,
    inverterParallelUnits: parallelUnits,
    inverterExceedsSinglePhaseMax: exceedsSinglePhaseMax,
    gridTieEstimatedKW: null,
  };
}

export function itemKey(item: {
  catId: string;
  name: string;
  brand: string;
  spec: string;
}): string {
  return `${item.catId}::${item.name}::${item.brand}::${item.spec}`;
}
