export interface CatalogItem {
  catId: string;
  name: string;
  nameEn: string;
  brand: string;
  spec: string;
  specEn: string;
  watts: number;
  hours: number;
  confidence?: string;
}

export interface SelectedItem {
  key: string; // `${catId}::${name}::${brand}::${spec}`, or `pkg::${packageId}::${index}::${equipmentId}`
  item: CatalogItem;
  quantity: number;
  hours: number;
  essential: boolean;
  // "package" rows are the current default package's base load — replaced
  // wholesale when the user picks a different package. Manually added rows
  // (browsed equipment, add-ons) are left undefined and always preserved.
  source?: "package";
}

export type SystemMode =
  | "off-grid"
  | "respaldo-total"
  | "respaldo-parcial"
  | "sin-respaldo";

export interface InverterSize {
  kva: number;
  model: string;
  continuousW: number;
  peakW: number;
}

export interface CalculationResult {
  mode: SystemMode;
  dailyWhTotal: number;
  dailyWhEssential: number;
  adjustedWhForSolar: number;
  solarArrayW: number;
  panelCount: number;
  batteryBaseWh: number | null;
  bankWh: number | null;
  bankKWh: number | null;
  batteryCount: number | null;
  kwhPerBattery: number;
  totalConnectedW: number;
  essentialConnectedW: number;
  requiredInverterContinuousW: number | null;
  inverterSize: InverterSize | null;
  inverterParallelUnits: number | null;
  inverterExceedsSinglePhaseMax: boolean;
  gridTieEstimatedKW: number | null;
}

export interface ManualConfig {
  panelCount: number;
  batteryCount: number;
  inverterKva: number;
}

export interface LeadFormData {
  name: string;
  phone: string;
  email: string;
  notes: string;
}
