export type Lang = "es" | "en";

export const CATEGORY_LABELS: Record<string, { es: string; en: string }> = {
  agua: { es: "Agua / Bombeo", en: "Water / Pumping" },
  clima: { es: "Clima", en: "Climate" },
  cocina: { es: "Cocina", en: "Kitchen" },
  entret: { es: "Entretenimiento", en: "Entertainment" },
  exterior: { es: "Exterior", en: "Outdoor" },
  iluminacion: { es: "Iluminación", en: "Lighting" },
  lavado: { es: "Lavado", en: "Laundry" },
  personal: { es: "Cuidado personal", en: "Personal care" },
  refrig: { es: "Refrigeración", en: "Refrigeration" },
  seguridad: { es: "Seguridad / Conectividad", en: "Security / Connectivity" },
};

export interface Dict {
  appName: string;
  step1Title: string;
  step1Sub: string;
  searchPlaceholder: string;
  allCategories: string;
  quantity: string;
  hoursPerDay: string;
  essential: string;
  essentialHint: string;
  selectedCount: string;
  next: string;
  back: string;
  step2Title: string;
  step2Sub: string;
  modeOffGridTitle: string;
  modeOffGridDesc: string;
  modeRespaldoTotalTitle: string;
  modeRespaldoTotalDesc: string;
  modeRespaldoParcialTitle: string;
  modeRespaldoParcialDesc: string;
  modeSinRespaldoTitle: string;
  modeSinRespaldoDesc: string;
  seeResults: string;
  step3Title: string;
  dailyConsumption: string;
  solarArray: string;
  panels: string;
  batteryBank: string;
  batteries: string;
  inverter: string;
  noBattery: string;
  gridTieNote: string;
  parallelUnitsNote: (n: number) => string;
  threePhaseNote: string;
  kwhPerBatteryLabel: string;
  autonomyDaysLabel: string;
  leadFormTitle: string;
  leadFormSub: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  submit: string;
  submitting: string;
  submitSuccess: string;
  submitError: string;
  startOver: string;
  editSelection: string;
  litioNote: string;
  perDay: string;
}

export const dict: Record<Lang, Dict> = {
  es: {
    appName: "Calculadora Mega Energías",
    step1Title: "Selecciona tus equipos",
    step1Sub:
      "Marca los equipos de tu casa, ajusta cantidad y horas de uso al día. Marca \"esencial\" si debe seguir funcionando en un apagón.",
    searchPlaceholder: "Buscar equipo...",
    allCategories: "Todas las categorías",
    quantity: "Cantidad",
    hoursPerDay: "Horas/día",
    essential: "Esencial",
    essentialHint: "Sigue con corriente en un apagón (respaldo parcial)",
    selectedCount: "equipos seleccionados",
    next: "Siguiente",
    back: "Atrás",
    step2Title: "Tipo de sistema",
    step2Sub: "Elige cómo quieres que funcione tu sistema solar.",
    modeOffGridTitle: "Off-grid (fuera de red)",
    modeOffGridDesc:
      "Sin CFE. El banco de baterías y el arreglo solar cubren el 100% del consumo diario de la casa.",
    modeRespaldoTotalTitle: "On-grid con respaldo total",
    modeRespaldoTotalDesc:
      "Conectado a CFE, pero en un apagón toda la casa sigue funcionando con batería (100% del consumo).",
    modeRespaldoParcialTitle: "On-grid con respaldo parcial",
    modeRespaldoParcialDesc:
      "Conectado a CFE. En un apagón, solo los equipos marcados como esenciales siguen con corriente.",
    modeSinRespaldoTitle: "On-grid sin respaldo",
    modeSinRespaldoDesc:
      "Solo paneles + inversor interactivo con la red, sin batería. En un apagón el sistema se apaga por seguridad (anti-isla).",
    seeResults: "Ver resultados",
    step3Title: "Tu sistema recomendado",
    dailyConsumption: "Consumo diario",
    solarArray: "Arreglo solar",
    panels: "paneles",
    batteryBank: "Banco de baterías",
    batteries: "baterías",
    inverter: "Inversor",
    noBattery: "Este modo no incluye banco de baterías.",
    gridTieNote:
      "Modelo de inversor a confirmar por tu asesor Mega Energías (interconexión a red, sin batería).",
    parallelUnitsNote: (n: number) =>
      `${n} × MultiPlus-II 15kVA en paralelo`,
    threePhaseNote:
      "Supera el máximo monofásico (6 unidades / 30 kVA) — se requiere configuración trifásica. Un asesor confirmará el arreglo final.",
    kwhPerBatteryLabel: "kWh por batería",
    autonomyDaysLabel: "Días de autonomía",
    leadFormTitle: "Recibe tu cotización",
    leadFormSub: "Un asesor de Mega Energías te contactará con los precios.",
    name: "Nombre",
    phone: "Teléfono",
    email: "Correo (opcional)",
    notes: "Notas (opcional)",
    submit: "Enviar",
    submitting: "Enviando...",
    submitSuccess: "¡Listo! Un asesor te contactará pronto.",
    submitError: "No se pudo enviar. Intenta de nuevo o contáctanos directo.",
    startOver: "Empezar de nuevo",
    editSelection: "Editar selección",
    litioNote: "Batería estándar Mega Energías: litio LiFePO4, 48V, DoD 90%.",
    perDay: "/día",
  },
  en: {
    appName: "Mega Energías Calculator",
    step1Title: "Select your equipment",
    step1Sub:
      "Check the equipment in your home, adjust quantity and hours of use per day. Mark \"essential\" if it must keep running during an outage.",
    searchPlaceholder: "Search equipment...",
    allCategories: "All categories",
    quantity: "Quantity",
    hoursPerDay: "Hours/day",
    essential: "Essential",
    essentialHint: "Stays powered during an outage (partial backup)",
    selectedCount: "items selected",
    next: "Next",
    back: "Back",
    step2Title: "System type",
    step2Sub: "Choose how you want your solar system to work.",
    modeOffGridTitle: "Off-grid",
    modeOffGridDesc:
      "No utility grid. The battery bank and solar array cover 100% of the home's daily consumption.",
    modeRespaldoTotalTitle: "Grid-tied with full backup",
    modeRespaldoTotalDesc:
      "Connected to the grid, but during an outage the whole house keeps running on battery (100% of consumption).",
    modeRespaldoParcialTitle: "Grid-tied with partial backup",
    modeRespaldoParcialDesc:
      "Connected to the grid. During an outage, only the items marked essential stay powered.",
    modeSinRespaldoTitle: "Grid-tied, no backup",
    modeSinRespaldoDesc:
      "Panels + grid-interactive inverter only, no battery. During an outage the system shuts off for safety (anti-islanding).",
    seeResults: "See results",
    step3Title: "Your recommended system",
    dailyConsumption: "Daily consumption",
    solarArray: "Solar array",
    panels: "panels",
    batteryBank: "Battery bank",
    batteries: "batteries",
    inverter: "Inverter",
    noBattery: "This mode does not include a battery bank.",
    gridTieNote:
      "Inverter model to be confirmed by your Mega Energías advisor (grid interconnection, no battery).",
    parallelUnitsNote: (n: number) =>
      `${n} × MultiPlus-II 15kVA in parallel`,
    threePhaseNote:
      "Exceeds the single-phase maximum (6 units / 30 kVA) — a three-phase configuration is required. An advisor will confirm the final setup.",
    kwhPerBatteryLabel: "kWh per battery",
    autonomyDaysLabel: "Autonomy days",
    leadFormTitle: "Get your quote",
    leadFormSub: "A Mega Energías advisor will contact you with pricing.",
    name: "Name",
    phone: "Phone",
    email: "Email (optional)",
    notes: "Notes (optional)",
    submit: "Submit",
    submitting: "Sending...",
    submitSuccess: "Done! An advisor will contact you soon.",
    submitError: "Couldn't send. Try again or contact us directly.",
    startOver: "Start over",
    editSelection: "Edit selection",
    litioNote: "Mega Energías standard battery: LiFePO4 lithium, 48V, 90% DoD.",
    perDay: "/day",
  },
};

export const MODE_LABELS: Record<
  "off-grid" | "respaldo-total" | "respaldo-parcial" | "sin-respaldo",
  { es: string; en: string }
> = {
  "off-grid": { es: "Off-grid", en: "Off-grid" },
  "respaldo-total": { es: "Respaldo total", en: "Respaldo total" },
  "respaldo-parcial": { es: "Respaldo parcial", en: "Respaldo parcial" },
  "sin-respaldo": { es: "Sin respaldo", en: "Sin respaldo" },
};
