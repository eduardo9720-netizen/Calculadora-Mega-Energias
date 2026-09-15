// Transcribed from mega-energias-calculadora-defaults.json (Mega Energías
// reference data). Packages are editable starting points, never a cap —
// see resolveDefaultPackageItems() and the "source" field on SelectedItem.

export interface GenericEquipment {
  id: string;
  nombre: string;
  nombreEn: string;
  wattsMin: number;
  wattsMax: number;
  horasDiaDefault: number;
  categoria: string;
  esCargaCritica?: boolean;
}

export const EQUIPOS_RESIDENCIALES: GenericEquipment[] = [
  { id: "minisplit_9000btu", nombre: "Minisplit 9,000 BTU (0.75 ton)", nombreEn: "Mini-split 9,000 BTU (0.75 ton)", wattsMin: 500, wattsMax: 750, horasDiaDefault: 8, categoria: "climatizacion" },
  { id: "minisplit_12000btu", nombre: "Minisplit 12,000 BTU (1 ton) inverter", nombreEn: "Mini-split 12,000 BTU (1 ton), Inverter", wattsMin: 560, wattsMax: 1200, horasDiaDefault: 8, categoria: "climatizacion" },
  { id: "minisplit_18000btu", nombre: "Minisplit 18,000 BTU (1.5 ton) inverter", nombreEn: "Mini-split 18,000 BTU (1.5 ton), Inverter", wattsMin: 1400, wattsMax: 2000, horasDiaDefault: 8, categoria: "climatizacion" },
  { id: "minisplit_24000btu", nombre: "Minisplit 24,000 BTU (2 ton) inverter", nombreEn: "Mini-split 24,000 BTU (2 ton), Inverter", wattsMin: 1500, wattsMax: 2500, horasDiaDefault: 8, categoria: "climatizacion" },
  { id: "refrigerador", nombre: "Refrigerador doméstico", nombreEn: "Household refrigerator", wattsMin: 150, wattsMax: 300, horasDiaDefault: 24, categoria: "cocina", esCargaCritica: true },
  { id: "congelador_extra", nombre: "Congelador extra", nombreEn: "Extra freezer", wattsMin: 100, wattsMax: 300, horasDiaDefault: 24, categoria: "cocina" },
  { id: "bomba_alberca_convencional", nombre: "Bomba de alberca convencional (1.5 HP)", nombreEn: "Conventional pool pump (1.5 HP)", wattsMin: 1100, wattsMax: 1100, horasDiaDefault: 7, categoria: "exterior" },
  { id: "bomba_alberca_velocidad_variable", nombre: "Bomba de alberca velocidad variable", nombreEn: "Variable-speed pool pump", wattsMin: 300, wattsMax: 500, horasDiaDefault: 10, categoria: "exterior" },
  { id: "bomba_calor_alberca", nombre: "Bomba de calor para alberca", nombreEn: "Pool heat pump", wattsMin: 5000, wattsMax: 6000, horasDiaDefault: 5, categoria: "exterior" },
  { id: "calentador_agua_electrico", nombre: "Calentador de agua eléctrico", nombreEn: "Electric water heater", wattsMin: 1500, wattsMax: 1500, horasDiaDefault: 1.5, categoria: "agua" },
  { id: "bomba_cisterna_pozo", nombre: "Bomba de cisterna / pozo", nombreEn: "Cistern / well pump", wattsMin: 500, wattsMax: 3000, horasDiaDefault: 1, categoria: "agua" },
  { id: "lavadora", nombre: "Lavadora", nombreEn: "Washer", wattsMin: 350, wattsMax: 500, horasDiaDefault: 0.75, categoria: "lavado" },
  { id: "secadora_electrica", nombre: "Secadora eléctrica", nombreEn: "Electric dryer", wattsMin: 1800, wattsMax: 3000, horasDiaDefault: 0.75, categoria: "lavado" },
  { id: "tv_led", nombre: "TV LED", nombreEn: "LED TV", wattsMin: 60, wattsMax: 150, horasDiaDefault: 5, categoria: "entretenimiento" },
  { id: "microondas", nombre: "Microondas", nombreEn: "Microwave", wattsMin: 700, wattsMax: 1100, horasDiaDefault: 0.3, categoria: "cocina" },
  { id: "cafetera", nombre: "Cafetera", nombreEn: "Coffee maker", wattsMin: 900, wattsMax: 1200, horasDiaDefault: 0.2, categoria: "cocina" },
  { id: "iluminacion_led_casa", nombre: "Iluminación LED (total casa)", nombreEn: "LED lighting (whole house)", wattsMin: 100, wattsMax: 300, horasDiaDefault: 5, categoria: "iluminacion", esCargaCritica: true },
  { id: "router_modem", nombre: "Router / módem", nombreEn: "Router / modem", wattsMin: 10, wattsMax: 20, horasDiaDefault: 24, categoria: "conectividad", esCargaCritica: true },
  { id: "laptop_computo", nombre: "Laptop / equipo de cómputo", nombreEn: "Laptop / computer", wattsMin: 50, wattsMax: 100, horasDiaDefault: 6, categoria: "oficina" },
  { id: "ventilador", nombre: "Ventilador", nombreEn: "Fan", wattsMin: 50, wattsMax: 100, horasDiaDefault: 8, categoria: "climatizacion", esCargaCritica: true },
  { id: "cargador_ev", nombre: "Cargador de auto eléctrico", nombreEn: "EV charger", wattsMin: 3000, wattsMax: 7000, horasDiaDefault: 3, categoria: "transporte" },
];

export const EQUIPOS_COMERCIALES: GenericEquipment[] = [
  { id: "camara_fria_walkin", nombre: "Cámara fría / walk-in cooler", nombreEn: "Walk-in cooler", wattsMin: 2000, wattsMax: 6000, horasDiaDefault: 17, categoria: "refrigeracion_comercial", esCargaCritica: true },
  { id: "congelador_walkin", nombre: "Congelador walk-in", nombreEn: "Walk-in freezer", wattsMin: 2000, wattsMax: 6000, horasDiaDefault: 18, categoria: "refrigeracion_comercial", esCargaCritica: true },
  { id: "refrigerador_comercial", nombre: "Refrigerador comercial (reach-in)", nombreEn: "Commercial refrigerator (reach-in)", wattsMin: 300, wattsMax: 800, horasDiaDefault: 24, categoria: "refrigeracion_comercial", esCargaCritica: true },
  { id: "maquina_hielo", nombre: "Máquina de hielo", nombreEn: "Ice machine", wattsMin: 500, wattsMax: 1500, horasDiaDefault: 14, categoria: "refrigeracion_comercial" },
  { id: "freidora_comercial", nombre: "Freidora eléctrica comercial", nombreEn: "Commercial electric fryer", wattsMin: 5000, wattsMax: 18000, horasDiaDefault: 4, categoria: "cocina_comercial" },
  { id: "horno_conveccion", nombre: "Horno de convección", nombreEn: "Convection oven", wattsMin: 3500, wattsMax: 3500, horasDiaDefault: 4, categoria: "cocina_comercial" },
  { id: "estufa_vaporera", nombre: "Estufa / vaporera comercial", nombreEn: "Commercial stove / steamer", wattsMin: 2500, wattsMax: 2500, horasDiaDefault: 3, categoria: "cocina_comercial" },
  { id: "campana_extraccion", nombre: "Campana de extracción / ventilación", nombreEn: "Range hood / ventilation", wattsMin: 1000, wattsMax: 3000, horasDiaDefault: 12, categoria: "cocina_comercial" },
  { id: "lavavajillas_comercial", nombre: "Lavavajillas comercial", nombreEn: "Commercial dishwasher", wattsMin: 1500, wattsMax: 5000, horasDiaDefault: 2, categoria: "cocina_comercial" },
  { id: "ac_central_comercial", nombre: "A/C central o multi-minisplit comercial", nombreEn: "Central A/C or multi mini-split (commercial)", wattsMin: 3000, wattsMax: 15000, horasDiaDefault: 10, categoria: "climatizacion_comercial" },
  { id: "pos_computo", nombre: "POS / computadoras / caja", nombreEn: "POS / computers / register", wattsMin: 60, wattsMax: 200, horasDiaDefault: 11, categoria: "oficina" },
  { id: "iluminacion_comercial", nombre: "Iluminación comercial LED", nombreEn: "Commercial LED lighting", wattsMin: 500, wattsMax: 3000, horasDiaDefault: 12, categoria: "iluminacion" },
];

export function findGenericEquipment(id: string): GenericEquipment | undefined {
  return (
    EQUIPOS_RESIDENCIALES.find((e) => e.id === id) ??
    EQUIPOS_COMERCIALES.find((e) => e.id === id)
  );
}

export interface DefaultPackage {
  id: string;
  nombre: string;
  nombreEn: string;
  descripcion: string;
  descripcionEn: string;
  equiposIncluidos: string[];
}

// nombre/descripcion are verbatim from the JSON — do not reword.
export const PAQUETES_RESIDENCIALES: DefaultPackage[] = [
  {
    id: "depa_casa_chica",
    nombre: "Casa chica / departamento",
    nombreEn: "Small house / apartment",
    descripcion: "1-2 recámaras, 1-2 aires, equipos básicos",
    descripcionEn: "1-2 bedrooms, 1-2 AC units, basic equipment",
    equiposIncluidos: ["minisplit_12000btu", "minisplit_12000btu", "refrigerador", "tv_led", "lavadora", "router_modem", "microondas", "iluminacion_led_casa"],
  },
  {
    id: "casa_3_recamaras",
    nombre: "Casa mediana / departamento grande",
    nombreEn: "Medium house / large apartment",
    descripcion: "3 recámaras, 2-3 aires, refrigerador, lavadora",
    descripcionEn: "3 bedrooms, 2-3 AC units, refrigerator, washer",
    equiposIncluidos: ["minisplit_18000btu", "minisplit_12000btu", "minisplit_12000btu", "refrigerador", "calentador_agua_electrico", "lavadora", "tv_led", "tv_led", "iluminacion_led_casa"],
  },
  {
    id: "casa_grande",
    nombre: "Casa grande",
    nombreEn: "Large house",
    descripcion: "4+ recámaras, 4+ aires, alberca, cocina equipada",
    descripcionEn: "4+ bedrooms, 4+ AC units, pool, equipped kitchen",
    equiposIncluidos: ["minisplit_24000btu", "minisplit_18000btu", "minisplit_12000btu", "minisplit_12000btu", "minisplit_12000btu", "refrigerador", "congelador_extra", "bomba_alberca_convencional", "calentador_agua_electrico", "secadora_electrica", "lavadora", "tv_led", "tv_led", "tv_led", "iluminacion_led_casa"],
  },
  {
    id: "rancho_terreno_rural",
    nombre: "Rancho / terreno rural",
    nombreEn: "Ranch / rural property",
    descripcion: "Para propiedades sin agua de ciudad, bombeo de pozo",
    descripcionEn: "For properties without city water, well pumping",
    equiposIncluidos: ["bomba_cisterna_pozo", "refrigerador", "iluminacion_led_casa", "router_modem"],
  },
];

export const PAQUETES_COMERCIALES: DefaultPackage[] = [
  {
    id: "negocio_chico",
    nombre: "Negocio / oficina chico",
    nombreEn: "Small business / office",
    descripcion: "1-2 empleados, consultorio, boutique",
    descripcionEn: "1-2 employees, doctor's office, boutique",
    equiposIncluidos: ["minisplit_12000btu", "refrigerador_comercial", "pos_computo", "iluminacion_comercial", "router_modem"],
  },
  {
    id: "negocio_mediano",
    nombre: "Negocio / oficina mediano",
    nombreEn: "Medium business / office",
    descripcion: "5-10 empleados, oficina o restaurante pequeño",
    descripcionEn: "5-10 employees, office or small restaurant",
    equiposIncluidos: ["minisplit_18000btu", "minisplit_12000btu", "minisplit_12000btu", "refrigerador_comercial", "maquina_hielo", "pos_computo", "iluminacion_comercial"],
  },
  {
    id: "negocio_grande",
    nombre: "Negocio grande (restaurante cocina completa / retail / clínica)",
    nombreEn: "Large business (full-kitchen restaurant / retail / clinic)",
    descripcion: "Cocina completa o retail grande",
    descripcionEn: "Full kitchen or large retail",
    equiposIncluidos: ["ac_central_comercial", "camara_fria_walkin", "congelador_walkin", "freidora_comercial", "horno_conveccion", "campana_extraccion", "lavavajillas_comercial", "maquina_hielo", "iluminacion_comercial", "pos_computo"],
  },
];

export function findDefaultPackage(id: string): DefaultPackage | undefined {
  return (
    PAQUETES_RESIDENCIALES.find((p) => p.id === id) ??
    PAQUETES_COMERCIALES.find((p) => p.id === id)
  );
}
