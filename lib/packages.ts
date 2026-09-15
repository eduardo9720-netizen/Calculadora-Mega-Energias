import type { CatalogItem, SelectedItem } from "./types";
import { itemKey } from "./calculations";
import { findGenericEquipment, type DefaultPackage } from "./megaDefaults";

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
  title: { es: string; en: string };
  subtitle: { es: string; en: string };
  items: PackageItemRef[];
}

// Add-ons layer extra equipment on top of whatever is already selected
// (from a package or built manually) — they don't replace the selection.
export const ADDONS: EquipmentPackage[] = [
  {
    id: "alberca",
    title: { es: "Alberca", en: "Pool" },
    subtitle: { es: "Bomba + calentador", en: "Pump + heater" },
    items: [
      { catId: "agua", name: "Bomba de alberca", brand: "Genérico", spec: "1 HP", quantity: 1 },
      { catId: "agua", name: "Calentador de alberca (bomba de calor)", brand: "Genérico", spec: "residencial", quantity: 1 },
    ],
  },
  {
    id: "auto-electrico",
    title: { es: "Auto eléctrico", en: "Electric car" },
    subtitle: { es: "Cargador Nivel 2", en: "Level 2 charger" },
    items: [
      { catId: "exterior", name: "Cargador de auto eléctrico", brand: "Genérico", spec: "Nivel 2, 240V", quantity: 1 },
    ],
  },
  {
    id: "jacuzzi",
    title: { es: "Jacuzzi / spa", en: "Jacuzzi / spa" },
    subtitle: { es: "Bomba + calentador", en: "Pump + heater" },
    items: [
      { catId: "agua", name: "Jacuzzi / spa exterior", brand: "Genérico", spec: "bomba + calentador", quantity: 1 },
    ],
  },
];

// Each entry in equiposIncluidos becomes its own independent row — even
// repeated ids (e.g. two "minisplit_12000btu") render as two separate rows,
// never merged into a quantity. Midpoint of watts_min/watts_max is used as
// the point-estimate wattage; horas_dia_default as the starting hours/day —
// both stay user-editable per row afterward.
export function resolveDefaultPackageItems(pkg: DefaultPackage): SelectedItem[] {
  const result: SelectedItem[] = [];
  pkg.equiposIncluidos.forEach((equipoId, index) => {
    const eq = findGenericEquipment(equipoId);
    if (!eq) return; // reference data out of sync; skip rather than crash
    const watts = Math.round((eq.wattsMin + eq.wattsMax) / 2);
    const item: CatalogItem = {
      catId: eq.categoria,
      name: eq.nombre,
      nameEn: eq.nombreEn,
      brand: "",
      spec: "",
      specEn: "",
      watts,
      hours: eq.horasDiaDefault,
    };
    result.push({
      key: `pkg::${pkg.id}::${index}::${equipoId}`,
      item,
      quantity: 1,
      hours: eq.horasDiaDefault,
      essential: !!eq.esCargaCritica,
      source: "package",
    });
  });
  return result;
}

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
