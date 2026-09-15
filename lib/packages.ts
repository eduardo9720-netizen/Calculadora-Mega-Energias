import type { CatalogItem, SelectedItem } from "./types";
import { itemKey } from "./calculations";

export interface PackageItemRef {
  catId: string;
  name: string;
  brand: string;
  spec: string;
  quantity: number;
  hours?: number; // override catalog default hours
  essential?: boolean;
}

export interface EquipmentPackage {
  id: string;
  emoji: string;
  title: { es: string; en: string };
  subtitle: { es: string; en: string };
  items: PackageItemRef[];
}

// Starter bundles — pre-fill common home/business profiles from the current
// catalog. Users can still add, remove, or edit anything after applying one.
export const PACKAGES: EquipmentPackage[] = [
  {
    id: "depa-chico",
    emoji: "🏢",
    title: { es: "Depa / casa chica", en: "Apartment / small home" },
    subtitle: { es: "1-2 recámaras, bien equipado", en: "1-2 bedrooms, fully equipped" },
    items: [
      { catId: "refrig", name: "Refrigerador", brand: "Whirlpool", spec: "18 pies, top freezer", quantity: 1, essential: true },
      { catId: "clima", name: "Minisplit", brand: "York", spec: "1 ton / 12,000 BTU, Inverter", quantity: 1 },
      { catId: "entret", name: "TV LED", brand: "Samsung/LG", spec: "43\"", quantity: 1 },
      { catId: "entret", name: "Router / módem", brand: "Genérico", spec: "WiFi", quantity: 1, essential: true },
      { catId: "entret", name: "Laptop", brand: "Genérico", spec: "cargador", quantity: 1 },
      { catId: "entret", name: "Consola de videojuegos", brand: "PlayStation/Xbox", spec: "estándar", quantity: 1 },
      { catId: "lavado", name: "Lavadora", brand: "LG", spec: "carga 20 kg, Inverter", quantity: 1 },
      { catId: "cocina", name: "Microondas", brand: "Samsung", spec: "1.1 pies", quantity: 1 },
      { catId: "cocina", name: "Cafetera", brand: "Oster", spec: "12 tazas", quantity: 1 },
      { catId: "cocina", name: "Licuadora", brand: "Oster", spec: "estándar", quantity: 1 },
      { catId: "personal", name: "Secadora de cabello", brand: "Genérico", spec: "estándar", quantity: 1 },
      { catId: "seguridad", name: "Timbre inteligente", brand: "Ring", spec: "estándar", quantity: 1 },
      { catId: "iluminacion", name: "Foco LED", brand: "Genérico", spec: "estándar 9W", quantity: 8 },
      { catId: "iluminacion", name: "Cargadores varios", brand: "Genérico", spec: "celulares / bocinas", quantity: 1 },
    ],
  },
  {
    id: "casa-3-recamaras",
    emoji: "🏠",
    title: { es: "Casa 3 recámaras", en: "3-bedroom house" },
    subtitle: { es: "3 aires, 2 tele, 1 refrigerador", en: "3 AC units, 2 TVs, 1 fridge" },
    items: [
      { catId: "refrig", name: "Refrigerador", brand: "Samsung", spec: "28 pies Side by Side", quantity: 1, essential: true },
      { catId: "clima", name: "Minisplit", brand: "York", spec: "1.5 ton / 18,000 BTU, Inverter", quantity: 2 },
      { catId: "clima", name: "Minisplit", brand: "York", spec: "1 ton / 12,000 BTU, Inverter", quantity: 1 },
      { catId: "entret", name: "TV LED", brand: "Samsung/LG", spec: "43\"", quantity: 2 },
      { catId: "lavado", name: "Lavadora", brand: "LG", spec: "carga 20 kg, Inverter", quantity: 1 },
      { catId: "entret", name: "Router / módem", brand: "Genérico", spec: "WiFi", quantity: 1, essential: true },
      { catId: "iluminacion", name: "Foco LED", brand: "Genérico", spec: "estándar 9W", quantity: 10 },
      { catId: "iluminacion", name: "Cargadores varios", brand: "Genérico", spec: "celulares / bocinas", quantity: 1 },
    ],
  },
  {
    id: "casa-grande",
    emoji: "🏡",
    title: { es: "Casa grande", en: "Large house" },
    subtitle: { es: "4+ recámaras, cocina equipada", en: "4+ bedrooms, full kitchen" },
    items: [
      { catId: "refrig", name: "Refrigerador", brand: "LG", spec: "22 pies French Door, Inverter", quantity: 1, essential: true },
      { catId: "clima", name: "Minisplit", brand: "York", spec: "1.5 ton / 18,000 BTU, Inverter", quantity: 3 },
      { catId: "clima", name: "Minisplit", brand: "York", spec: "2 ton / 24,000 BTU, Inverter", quantity: 1 },
      { catId: "entret", name: "TV LED", brand: "Samsung/LG", spec: "43\"", quantity: 2 },
      { catId: "entret", name: "TV QLED", brand: "Samsung", spec: "55\"", quantity: 1 },
      { catId: "lavado", name: "Lavadora", brand: "LG", spec: "carga 20 kg, Inverter", quantity: 1 },
      { catId: "lavado", name: "Lavavajillas", brand: "Mabe", spec: "estándar", quantity: 1 },
      { catId: "cocina", name: "Horno eléctrico empotrado", brand: "Mabe", spec: "24\"", quantity: 1 },
      { catId: "entret", name: "Router / módem", brand: "Genérico", spec: "WiFi", quantity: 1, essential: true },
      { catId: "iluminacion", name: "Foco LED", brand: "Genérico", spec: "estándar 9W", quantity: 16 },
      { catId: "iluminacion", name: "Cargadores varios", brand: "Genérico", spec: "celulares / bocinas", quantity: 1 },
    ],
  },
  {
    id: "negocio-chico",
    emoji: "🏪",
    title: { es: "Negocio / oficina pequeña", en: "Small business / office" },
    subtitle: { es: "Cómputo, clima, refrigeración", en: "Computers, AC, fridge" },
    items: [
      { catId: "refrig", name: "Refrigerador", brand: "Whirlpool", spec: "18 pies, top freezer", quantity: 1, essential: true },
      { catId: "clima", name: "Minisplit", brand: "Carrier", spec: "1.5 ton / 18,000 BTU", quantity: 2 },
      { catId: "entret", name: "Computadora de escritorio", brand: "Genérico", spec: "con monitor", quantity: 3, essential: true },
      { catId: "entret", name: "Router / módem", brand: "Genérico", spec: "WiFi", quantity: 1, essential: true },
      { catId: "entret", name: "Impresora", brand: "Genérico", spec: "multifuncional", quantity: 1 },
      { catId: "cocina", name: "Cafetera", brand: "Oster", spec: "12 tazas", quantity: 1 },
      { catId: "iluminacion", name: "Foco LED", brand: "Genérico", spec: "alta potencia 15W", quantity: 10 },
      { catId: "seguridad", name: "Sistema CCTV", brand: "Genérico", spec: "NVR + 4 cámaras", quantity: 1, essential: true },
    ],
  },
  {
    id: "rancho",
    emoji: "🌾",
    title: { es: "Rancho / exterior", en: "Ranch / rural" },
    subtitle: { es: "Bombeo de agua y riego", en: "Water pumping & irrigation" },
    items: [
      { catId: "refrig", name: "Refrigerador", brand: "Mabe", spec: "11 pies, cíclico", quantity: 1, essential: true },
      { catId: "agua", name: "Bomba de agua", brand: "Evans", spec: "1 HP", quantity: 1, essential: true },
      { catId: "agua", name: "Hidroneumático / bomba de presión", brand: "Genérico", spec: "1 HP", quantity: 1, essential: true },
      { catId: "exterior", name: "Bomba de riego / jardín", brand: "Genérico", spec: "estándar", quantity: 1 },
      { catId: "entret", name: "Router / módem", brand: "Genérico", spec: "WiFi", quantity: 1, essential: true },
      { catId: "iluminacion", name: "Foco LED", brand: "Genérico", spec: "estándar 9W", quantity: 6 },
    ],
  },
];

// Add-ons layer extra equipment on top of whatever is already selected
// (from a package or built manually) — they don't replace the selection.
export const ADDONS: EquipmentPackage[] = [
  {
    id: "alberca",
    emoji: "🏊",
    title: { es: "Alberca", en: "Pool" },
    subtitle: { es: "Bomba + calentador", en: "Pump + heater" },
    items: [
      { catId: "agua", name: "Bomba de alberca", brand: "Genérico", spec: "1 HP", quantity: 1 },
      { catId: "agua", name: "Calentador de alberca (bomba de calor)", brand: "Genérico", spec: "residencial", quantity: 1 },
    ],
  },
  {
    id: "auto-electrico",
    emoji: "🚗",
    title: { es: "Auto eléctrico", en: "Electric car" },
    subtitle: { es: "Cargador Nivel 2", en: "Level 2 charger" },
    items: [
      { catId: "exterior", name: "Cargador de auto eléctrico", brand: "Genérico", spec: "Nivel 2, 240V", quantity: 1 },
    ],
  },
  {
    id: "jacuzzi",
    emoji: "💦",
    title: { es: "Jacuzzi / spa", en: "Jacuzzi / spa" },
    subtitle: { es: "Bomba + calentador", en: "Pump + heater" },
    items: [
      { catId: "agua", name: "Jacuzzi / spa exterior", brand: "Genérico", spec: "bomba + calentador", quantity: 1 },
    ],
  },
  {
    id: "starlink",
    emoji: "🛰️",
    title: { es: "Internet satelital", en: "Satellite internet" },
    subtitle: { es: "Starlink", en: "Starlink" },
    items: [
      { catId: "entret", name: "Internet satelital", brand: "Starlink", spec: "Standard (antena + router)", quantity: 1, essential: true },
    ],
  },
  {
    id: "camaras",
    emoji: "📹",
    title: { es: "Seguridad", en: "Security" },
    subtitle: { es: "CCTV + alarma", en: "CCTV + alarm" },
    items: [
      { catId: "seguridad", name: "Sistema CCTV", brand: "Genérico", spec: "NVR + 4 cámaras", quantity: 1, essential: true },
      { catId: "seguridad", name: "Panel de alarma", brand: "Genérico", spec: "estándar", quantity: 1, essential: true },
    ],
  },
];

export function resolvePackageItems(
  pkg: EquipmentPackage,
  catalog: CatalogItem[]
): SelectedItem[] {
  const result: SelectedItem[] = [];
  for (const ref of pkg.items) {
    const item = catalog.find(
      (c) =>
        c.catId === ref.catId &&
        c.name === ref.name &&
        c.brand === ref.brand &&
        c.spec === ref.spec
    );
    if (!item) continue; // catalog changed upstream; skip silently rather than crash
    result.push({
      key: itemKey(item),
      item,
      quantity: ref.quantity,
      hours: ref.hours ?? item.hours,
      essential: ref.essential ?? false,
    });
  }
  return result;
}
