"use client";

import { useMemo, useState } from "react";
import type { CatalogItem, SelectedItem } from "@/lib/types";
import { itemKey } from "@/lib/calculations";
import { CATEGORY_LABELS } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n-context";
import { ADDONS, type EquipmentPackage } from "@/lib/packages";
import {
  PAQUETES_RESIDENCIALES,
  PAQUETES_COMERCIALES,
  type DefaultPackage,
} from "@/lib/megaDefaults";

const MAIN_PACKAGES = PAQUETES_RESIDENCIALES.filter((p) => p.id !== "rancho_terreno_rural");
const OTHER_PACKAGES = [
  ...PAQUETES_COMERCIALES,
  ...PAQUETES_RESIDENCIALES.filter((p) => p.id === "rancho_terreno_rural"),
];

interface Props {
  catalog: CatalogItem[];
  selected: Record<string, SelectedItem>;
  onToggle: (item: CatalogItem) => void;
  activePackageId: string | null;
  activeAddOnIds: Set<string>;
  onApplyPackage: (pkg: DefaultPackage) => void;
  onSkipPackage: () => void;
  onToggleAddOn: (addon: EquipmentPackage) => void;
}

export default function EquipmentSelector({
  catalog,
  selected,
  onToggle,
  activePackageId,
  activeAddOnIds,
  onApplyPackage,
  onSkipPackage,
  onToggleAddOn,
}: Props) {
  const { t, lang } = useI18n();
  const [otherOpen, setOtherOpen] = useState(false);
  const [category, setCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [browseOpen, setBrowseOpen] = useState(false);

  const categories = useMemo(
    () => Array.from(new Set(catalog.map((c) => c.catId))).sort(),
    [catalog]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return catalog.filter((c) => {
      if (category !== "all" && c.catId !== category) return false;
      if (!q) return true;
      const name = lang === "es" ? c.name : c.nameEn;
      return (
        name.toLowerCase().includes(q) ||
        c.brand.toLowerCase().includes(q) ||
        c.spec.toLowerCase().includes(q)
      );
    });
  }, [catalog, category, query, lang]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-950 sm:text-3xl">
        {t.step1Title}
      </h1>
      <p className="mt-2 max-w-2xl text-brand-700">{t.step1Sub}</p>

      <div className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-600">
          {t.packagesTitle}
        </h2>
        <p className="mt-1 text-sm text-brand-600">{t.packagesHint}</p>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {MAIN_PACKAGES.map((pkg) => {
            const isActive = activePackageId === pkg.id;
            const nombre = lang === "es" ? pkg.nombre : pkg.nombreEn;
            const descripcion = lang === "es" ? pkg.descripcion : pkg.descripcionEn;
            return (
              <button
                key={pkg.id}
                type="button"
                onClick={() => onApplyPackage(pkg)}
                className={`rounded-lg border p-3 text-left transition ${
                  isActive
                    ? "border-brand-600 bg-white"
                    : "border-brand-100 bg-white hover:border-brand-300"
                }`}
              >
                <div className="text-sm font-semibold text-brand-950">{nombre}</div>
                <div className="mt-0.5 text-xs text-brand-500">{descripcion}</div>
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setOtherOpen((o) => !o)}
            className={`rounded-lg border p-3 text-left transition ${
              otherOpen
                ? "border-brand-600 bg-white"
                : "border-brand-100 bg-white hover:border-brand-300"
            }`}
          >
            <div className="text-sm font-semibold text-brand-950">
              {t.otherPackagesTitle}
            </div>
            <div className="mt-0.5 text-xs text-brand-500">{t.otherPackagesHint}</div>
          </button>
        </div>

        {otherOpen && (
          <div className="mt-2 rounded-lg border border-brand-100 bg-brand-50 p-3">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {OTHER_PACKAGES.map((pkg) => {
                const isActive = activePackageId === pkg.id;
                const nombre = lang === "es" ? pkg.nombre : pkg.nombreEn;
                const descripcion = lang === "es" ? pkg.descripcion : pkg.descripcionEn;
                return (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => {
                      onApplyPackage(pkg);
                      setOtherOpen(false);
                    }}
                    className={`rounded-lg border p-3 text-left transition ${
                      isActive
                        ? "border-brand-600 bg-white"
                        : "border-brand-200 bg-white hover:border-brand-300"
                    }`}
                  >
                    <div className="text-sm font-semibold text-brand-950">{nombre}</div>
                    <div className="mt-0.5 text-xs text-brand-500">{descripcion}</div>
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => {
                onSkipPackage();
                setOtherOpen(false);
              }}
              className="mt-3 text-sm font-medium text-brand-600 underline underline-offset-2"
            >
              {t.skipPackage}
            </button>
          </div>
        )}

        <h2 className="mt-5 text-sm font-semibold uppercase tracking-wide text-brand-600">
          {t.addonsTitle}
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {ADDONS.map((addon) => {
            const isActive = activeAddOnIds.has(addon.id);
            return (
              <button
                key={addon.id}
                type="button"
                onClick={() => onToggleAddOn(addon)}
                className={`rounded-md border px-3 py-1.5 text-sm font-medium transition ${
                  isActive
                    ? "border-brand-600 bg-brand-600 text-white"
                    : "border-brand-200 bg-white text-brand-700 hover:border-brand-300"
                }`}
              >
                {addon.title[lang]}
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setBrowseOpen((o) => !o)}
        className="mt-6 text-sm font-medium text-brand-600 underline underline-offset-2"
      >
        {browseOpen ? t.browseHide : t.searchHint}
      </button>

      {browseOpen && (
        <>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full rounded-md border border-brand-200 bg-white px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none sm:max-w-xs"
            />
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCategory("all")}
                className={`rounded-md border px-3 py-1.5 text-sm font-medium transition ${
                  category === "all"
                    ? "border-brand-600 bg-brand-600 text-white"
                    : "border-brand-200 bg-white text-brand-700 hover:border-brand-300"
                }`}
              >
                {t.allCategories}
              </button>
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`rounded-md border px-3 py-1.5 text-sm font-medium transition ${
                    category === c
                      ? "border-brand-600 bg-brand-600 text-white"
                      : "border-brand-200 bg-white text-brand-700 hover:border-brand-300"
                  }`}
                >
                  {CATEGORY_LABELS[c]?.[lang] ?? c}
                </button>
              ))}
            </div>
          </div>

          <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {filtered.map((item) => {
              const key = itemKey(item);
              const sel = selected[key];
              const isSelected = !!sel;
              const name = lang === "es" ? item.name : item.nameEn;
              const spec = lang === "es" ? item.spec : item.specEn;
              return (
                <li
                  key={key}
                  className={`rounded-lg border bg-white p-4 transition ${
                    isSelected ? "border-brand-600" : "border-brand-100"
                  }`}
                >
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggle(item)}
                      className="mt-1 h-4 w-4 rounded border-brand-300 text-brand-600 focus:ring-brand-500"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-semibold text-brand-950">{name}</span>
                        <span className="whitespace-nowrap text-xs text-brand-500">
                          {item.watts} W
                        </span>
                      </div>
                      <div className="text-sm text-brand-600">
                        {item.brand} — {spec}
                      </div>
                    </div>
                  </label>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
