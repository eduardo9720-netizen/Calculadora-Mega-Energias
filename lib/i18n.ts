export type Lang = "es" | "en";

export const CATEGORY_LABELS: Record<string, { es: string; en: string }> = {
  agua: { es: "Agua / Bombeo", en: "Water / Pumping" },
  clima: { es: "Aire acondicionado", en: "Air conditioning" },
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
  step3Sub: string;
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
  perDay: string;
  packagesTitle: string;
  packagesHint: string;
  otherPackagesTitle: string;
  otherPackagesHint: string;
  skipPackage: string;
  addonsTitle: string;
  searchHint: string;
  browseHide: string;
  rangeIntro: string;
  rangePanels: (min: number, max: number) => string;
  rangeBatteries: (min: number, max: number) => string;
  rangeNoBattery: string;
  rangeSolarKW: (min: number, max: number) => string;
  inverterCompact: string;
  inverterMedium: string;
  inverterLarge: string;
  inverterXLarge: string;
  inverterTBD: string;
  rangeDisclaimer: string;
  dacMessage: string;
  intakeEquipmentTab: string;
  intakeCfeTab: string;
  intakeManualTab: string;
  cfeTitle: string;
  cfeSub: string;
  cfeDropHint: string;
  cfeRemove: string;
  step3TitleCfe: string;
  step3SubCfe: string;
  submitSuccessCfe: string;
  manualTitle: string;
  manualSub: string;
  manualPanels: string;
  manualBatteries: string;
  manualBatteriesHint: string;
  manualInverter: string;
  manualInverterInfo: string;
  step3TitleManual: string;
  step3SubManual: string;
  manualSummaryIntro: string;
  manualSummaryPanels: (n: number) => string;
  manualSummaryBatteries: (n: number) => string;
  manualSummaryInverter: (label: string) => string;
  submitSuccessManual: string;
}

export const dict: Record<Lang, Dict> = {
  es: {
    appName: "Planificador de Proyecto Solar",
    step1Title: "¿Para qué necesitas energía?",
    step1Sub:
      "Elige los espacios y equipos de tu casa o negocio. Marca \"esencial\" si debe seguir funcionando en un apagón.",
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
    seeResults: "Ver mi cotización",
    step3Title: "¡Ya tenemos un estimado para ti!",
    step3Sub:
      "Calculamos un estimado de lo que necesita tu casa o negocio. Compártenos tus datos y nos contactamos contigo con tu sistema acomodado a tus necesidades y recomendaciones.",
    leadFormTitle: "Recibe tu cotización",
    leadFormSub:
      "Si quieres ver lo que necesitas, compártenos tu correo y nos ponemos en contacto contigo.",
    name: "Nombre",
    phone: "Teléfono",
    email: "Correo",
    notes: "Notas (opcional)",
    submit: "Enviar",
    submitting: "Enviando...",
    submitSuccess: "¡Listo! Un asesor te contactará pronto.",
    submitError: "No se pudo enviar. Intenta de nuevo o contáctanos directo.",
    startOver: "Empezar de nuevo",
    editSelection: "Editar selección",
    perDay: "/día",
    packagesTitle: "Empieza con un paquete",
    packagesHint: "Elige el que más se parezca a tu casa o negocio y ajusta lo que necesites.",
    otherPackagesTitle: "Otras opciones",
    otherPackagesHint: "Negocio, rancho o arma tu sistema desde cero",
    skipPackage: "Arma tu sistema solar",
    addonsTitle: "Extras",
    searchHint: "Buscar un equipo específico",
    browseHide: "Ocultar lista de equipos",
    rangeIntro: "Como referencia, tu sistema estimado:",
    rangePanels: (min, max) => `${min}–${max} paneles solares`,
    rangeBatteries: (min, max) => `${min}–${max} baterías de litio`,
    rangeNoBattery: "Este modo no incluye banco de baterías.",
    rangeSolarKW: (min, max) => `Arreglo solar de ${min}–${max} kW`,
    inverterCompact: "Inversor Victron línea compacta",
    inverterMedium: "Inversor Victron línea media",
    inverterLarge: "Inversor Victron línea alta capacidad",
    inverterXLarge: "Sistema Victron de múltiples unidades en paralelo",
    inverterTBD: "Modelo de inversor a confirmar por tu asesor",
    rangeDisclaimer: "Rangos de referencia. Tu asesor confirmará el detalle exacto.",
    dacMessage:
      "Tu consumo te ubica en tarifa de alto consumo (DAC) con CFE — con un sistema solar tu retorno de inversión es más rápido.",
    intakeEquipmentTab: "Definir consumo",
    intakeCfeTab: "Subir tu recibo de la CFE",
    intakeManualTab: "Armar sistema solar",
    cfeTitle: "Sube tu recibo CFE",
    cfeSub:
      "Súbelo y salta directo a dejarnos tus datos — un asesor calculará tu sistema recomendado a partir de tu consumo real.",
    cfeDropHint: "Toca para elegir una foto o PDF de tu recibo",
    cfeRemove: "Quitar archivo",
    step3TitleCfe: "¡Ya casi!",
    step3SubCfe:
      "Compártenos tus datos y nos contactamos contigo con tu sistema acomodado a tus necesidades y recomendaciones.",
    submitSuccessCfe:
      "¡Listo! Recibimos tu recibo CFE. Un asesor lo revisará y te contactará pronto.",
    manualTitle: "Arma tu sistema solar",
    manualSub:
      "¿Ya sabes lo que necesitas? Elige el tamaño de tu sistema directamente.",
    manualPanels: "Paneles solares (635 W c/u)",
    manualBatteries: "Baterías de litio",
    manualBatteriesHint: "16 kWh c/u — 0 si no quieres banco de baterías",
    manualInverter: "Potencia que necesita tu casa",
    manualInverterInfo:
      "Es la capacidad de energía que tu casa necesita en un momento dado, medida en kVA (kilovolt-amperios). Entre más alta, más aparatos puede soportar tu sistema funcionando al mismo tiempo — incluyendo los que consumen más al arrancar, como el aire acondicionado.",
    step3TitleManual: "Tu sistema",
    step3SubManual:
      "Confirma tus datos para recibir tu cotización con estos componentes.",
    manualSummaryIntro: "Elegiste:",
    manualSummaryPanels: (n) => `${n} paneles solares`,
    manualSummaryBatteries: (n) => `${n} ${n === 1 ? "batería" : "baterías"} de litio`,
    manualSummaryInverter: (label) => `Potencia de ${label}`,
    submitSuccessManual:
      "¡Listo! Un asesor confirmará disponibilidad y precio de tu sistema.",
  },
  en: {
    appName: "Solar Project Planner",
    step1Title: "What do you need energy for?",
    step1Sub:
      "Pick the spaces and equipment in your home or business. Mark \"essential\" if it must keep running during an outage.",
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
    seeResults: "See my quote",
    step3Title: "We've put together an estimate for you!",
    step3Sub:
      "We calculated an estimate of what your home or business needs. Share your details and we'll get in touch with your system tailored to your needs and recommendations.",
    leadFormTitle: "Get your quote",
    leadFormSub:
      "Want to see what you need? Share your email and we'll get in touch.",
    name: "Name",
    phone: "Phone",
    email: "Email",
    notes: "Notes (optional)",
    submit: "Submit",
    submitting: "Sending...",
    submitSuccess: "Done! An advisor will contact you soon.",
    submitError: "Couldn't send. Try again or contact us directly.",
    startOver: "Start over",
    editSelection: "Edit selection",
    perDay: "/day",
    packagesTitle: "Start with a package",
    packagesHint: "Pick the one closest to your home or business and adjust as needed.",
    otherPackagesTitle: "Other options",
    otherPackagesHint: "Business, ranch, or build your system from scratch",
    skipPackage: "Build your solar system",
    addonsTitle: "Extras",
    searchHint: "Search for specific equipment",
    browseHide: "Hide equipment list",
    rangeIntro: "As a reference, your estimated system:",
    rangePanels: (min, max) => `${min}–${max} solar panels`,
    rangeBatteries: (min, max) => `${min}–${max} lithium batteries`,
    rangeNoBattery: "This mode does not include a battery bank.",
    rangeSolarKW: (min, max) => `${min}–${max} kW solar array`,
    inverterCompact: "Victron compact-line inverter",
    inverterMedium: "Victron mid-line inverter",
    inverterLarge: "Victron high-capacity inverter",
    inverterXLarge: "Victron multi-unit parallel system",
    inverterTBD: "Inverter model to be confirmed by your advisor",
    rangeDisclaimer: "Reference ranges only. Your advisor will confirm the exact details.",
    dacMessage:
      "Your usage puts you in CFE's high-consumption tariff (DAC) — a solar system pays for itself faster.",
    intakeEquipmentTab: "Define consumption",
    intakeCfeTab: "Upload your utility bill",
    intakeManualTab: "Build solar system",
    cfeTitle: "Upload your utility bill",
    cfeSub:
      "Upload it and skip straight to leaving your details — an advisor will size your recommended system from your actual usage.",
    cfeDropHint: "Tap to choose a photo or PDF of your bill",
    cfeRemove: "Remove file",
    step3TitleCfe: "Almost there!",
    step3SubCfe:
      "Share your details and we'll get in touch with your system tailored to your needs and recommendations.",
    submitSuccessCfe:
      "Done! We received your utility bill. An advisor will review it and contact you soon.",
    manualTitle: "Build your solar system",
    manualSub: "Already know what you need? Choose your system size directly.",
    manualPanels: "Solar panels (635 W each)",
    manualBatteries: "Lithium batteries",
    manualBatteriesHint: "16 kWh each — 0 if you don't want a battery bank",
    manualInverter: "Power your home needs",
    manualInverterInfo:
      "This is how much power your home needs at any given moment, measured in kVA (kilovolt-amps). The higher it is, the more appliances your system can run at once — including power-hungry ones like air conditioning at startup.",
    step3TitleManual: "Your system",
    step3SubManual: "Confirm your details to receive your quote with these components.",
    manualSummaryIntro: "You chose:",
    manualSummaryPanels: (n) => `${n} solar panels`,
    manualSummaryBatteries: (n) => `${n} lithium ${n === 1 ? "battery" : "batteries"}`,
    manualSummaryInverter: (label) => `${label} of power`,
    submitSuccessManual: "Done! An advisor will confirm availability and pricing for your system.",
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
