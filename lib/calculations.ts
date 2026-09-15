import type {
  CalculationResult,
  InverterSize,
  SelectedItem,
  SystemMode,
} from "./types";

// kWp = consumo_anual_kWh / (HSP * 365 * PR) — validado contra normales de
// asoleamiento de San José del Cabo / Los Cabos, BCS.
export const PERFORMANCE_RATIO = 0.78;
export const PEAK_SUN_HOURS = 5.8;
export const WATTS_PER_PANEL = 635;
export const DOD_LITIO = 0.9;
export const EFICIENCIA_INVERSOR = 0.96;
export const EFICIENCIA_BATERIA = 0.98;
export const DEFAULT_KWH_PER_BATTERY = 16;
export const DEFAULT_AUTONOMY_DAYS = 1;
export const SYSTEM_VOLTAGE = 48;
export const INVERTER_SAFETY_FACTOR = 1.25;
export const MAX_PARALLEL_UNITS_SINGLE_PHASE = 6; // max sets of the largest dos-fases pair (30 kVA) stacked together
export const DAC_UMBRAL_KWH_MES = 2000; // tarifa 1E -> DAC, promedio móvil 12 meses (solo contexto comercial)

// Mega Energías always quotes Victron MultiPlus-II 48V units deployed in
// pairs, split-phase ("dos fases") — never a single unit. Each tier below is
// therefore 2x the same real single-unit model's specs; the smallest real
// deployable configuration is 2x 48/3000 = 6 kVA. Never invent intermediate
// sizes — these are exactly double the real single-unit nameplate/continuous/peak.
export const INVERTER_SIZES: InverterSize[] = [
  { kva: 6, model: "2x MultiPlus-II 48/3000 (dos fases)", continuousW: 4800, peakW: 11000 },
  { kva: 9, model: "2x MultiPlus-II 48/4500 (dos fases)", continuousW: 8000, peakW: 14400 },
  { kva: 10, model: "2x MultiPlus-II 48/5000 (dos fases)", continuousW: 8000, peakW: 18000 },
  { kva: 16, model: "2x MultiPlus-II 48/8000 (dos fases)", continuousW: 12800, peakW: 30000 },
  { kva: 20, model: "2x MultiPlus-II 48/10000 (dos fases)", continuousW: 16000, peakW: 36000 },
  { kva: 30, model: "2x MultiPlus-II 48/15000 (dos fases)", continuousW: 24000, peakW: 54000 },
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
  const performanceRatio = options.efficiency ?? PERFORMANCE_RATIO;
  const peakSunHours = options.peakSunHours ?? PEAK_SUN_HOURS;
  const wattsPerPanel = options.wattsPerPanel ?? WATTS_PER_PANEL;
  const autonomyDays = options.autonomyDays ?? DEFAULT_AUTONOMY_DAYS;
  const kwhPerBattery = options.kwhPerBattery ?? DEFAULT_KWH_PER_BATTERY;

  const dailyWhTotal = sumWh(items, false);
  const dailyWhEssential = sumWh(items, true);
  const totalConnectedW = sumConnectedW(items, false);
  const essentialConnectedW = sumConnectedW(items, true);

  // Solar array always sized on total household consumption (savings benefit applies in every mode).
  const adjustedWhForSolar = dailyWhTotal / performanceRatio;
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

  // Battery bank is sized on real daily consumption (essential-only for
  // partial backup), never on the solar-derated figure — that derate is a
  // panel-sizing concept (performance ratio), not a battery-capacity one.
  const batteryBaseWh =
    mode === "respaldo-parcial" ? dailyWhEssential : dailyWhTotal;
  const bankWh =
    (batteryBaseWh * autonomyDays) /
    (DOD_LITIO * EFICIENCIA_INVERSOR * EFICIENCIA_BATERIA);
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

export type InverterCategory = "compact" | "medium" | "large" | "xlarge";

export interface PublicRange {
  panelsMin: number;
  panelsMax: number;
  batteriesMin: number | null;
  batteriesMax: number | null;
  inverterCategory: InverterCategory | null; // null only for mode "sin-respaldo" (model TBD)
  solarKWMin: number;
  solarKWMax: number;
}

// Deliberately fuzzed for the public-facing thank-you screen — the exact
// numbers only go to Notion for the advisor to review before contacting the lead.
export function toPublicRange(result: CalculationResult): PublicRange {
  const panelsMin = Math.max(1, result.panelCount - 1);
  const panelsMax = result.panelCount + 1;
  const solarKW = result.mode === "sin-respaldo"
    ? result.gridTieEstimatedKW ?? 0
    : result.solarArrayW / 1000;
  const solarKWMin = Math.max(0.5, Math.round(solarKW * 0.85 * 10) / 10);
  const solarKWMax = Math.round(solarKW * 1.15 * 10) / 10;

  let batteriesMin: number | null = null;
  let batteriesMax: number | null = null;
  if (result.batteryCount !== null) {
    batteriesMin = Math.max(1, result.batteryCount - 1);
    batteriesMax = result.batteryCount + 1;
  }

  let inverterCategory: InverterCategory | null = null;
  if (result.mode !== "sin-respaldo") {
    if (result.inverterParallelUnits) {
      inverterCategory = "xlarge";
    } else {
      const kva = result.inverterSize?.kva ?? 0;
      if (kva <= 6) inverterCategory = "compact";
      else if (kva <= 10) inverterCategory = "medium";
      else inverterCategory = "large";
    }
  }

  return {
    panelsMin,
    panelsMax,
    batteriesMin,
    batteriesMax,
    inverterCategory,
    solarKWMin,
    solarKWMax,
  };
}

// Informational only — never used to cap or "optimize down" the system size.
export function exceedsDacThreshold(result: CalculationResult): boolean {
  const monthlyKWh = (result.dailyWhTotal / 1000) * 30.4;
  return monthlyKWh >= DAC_UMBRAL_KWH_MES;
}

export function itemKey(item: {
  catId: string;
  name: string;
  brand: string;
  spec: string;
}): string {
  return `${item.catId}::${item.name}::${item.brand}::${item.spec}`;
}
