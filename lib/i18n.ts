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
  addonsTitle: string;
  searchHint: string;
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
  intakeEquipmentTab: string;
  intakeCfeTab: string;
  cfeTitle: string;
  cfeSub: string;
  cfeDropHint: string;
  cfeRemove: string;
  step3TitleCfe: string;
  step3SubCfe: string;
  submitSuccessCfe: string;
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
    addonsTitle: "Extras",
    searchHint: "¿No encuentras algo? Búscalo abajo.",
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
    intakeEquipmentTab: "Seleccionar equipos",
    intakeCfeTab: "Subir mi recibo CFE",
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
    addonsTitle: "Extras",
    searchHint: "Can't find something? Search below.",
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
    intakeEquipmentTab: "Select equipment",
    intakeCfeTab: "Upload my utility bill",
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
