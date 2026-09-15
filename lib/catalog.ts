import type { CatalogItem } from "./types";

const CATALOG_URL =
  process.env.CATALOG_URL ||
  "https://raw.githubusercontent.com/eduardo9720-netizen/Calculadora-Mega-Energias/main/catalog.json";

// Revalidate hourly so catalog edits on GitHub show up without a redeploy.
export async function getCatalog(): Promise<CatalogItem[]> {
  const res = await fetch(CATALOG_URL, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error(`No se pudo cargar el catálogo (${res.status})`);
  }
  const data = (await res.json()) as CatalogItem[];
  return data;
}

export function categoriesFrom(items: CatalogItem[]): string[] {
  return Array.from(new Set(items.map((i) => i.catId))).sort();
}
