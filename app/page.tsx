import { getCatalog } from "@/lib/catalog";
import Wizard from "@/components/Wizard";
import type { CatalogItem } from "@/lib/types";

export default async function Home() {
  let catalog: CatalogItem[];
  let loadError: string | null = null;
  try {
    catalog = await getCatalog();
  } catch (e) {
    catalog = [];
    loadError = e instanceof Error ? e.message : "Error desconocido";
  }

  return <Wizard catalog={catalog} loadError={loadError} />;
}
