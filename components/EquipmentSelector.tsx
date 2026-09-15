"use client";

import { useMemo, useState } from "react";
import type { CatalogItem, SelectedItem } from "@/lib/types";
import { itemKey } from "@/lib/calculations";
import { CATEGORY_LABELS } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n-context";
import { PACKAGES, ADDONS, type EquipmentPackage } from "@/lib/packages";

interface Props {
  catalog: CatalogItem[];
  selected: Record<string, SelectedItem>;
  onToggle: (item: CatalogItem) => void;
  onUpdate: (key: string, patch: Partial<SelectedItem>) => void;
  activePackageId: string | null;
  activeAddOnIds: Set<string>;
  onApplyPackage: (pkg: EquipmentPackage) => void;
  onToggleAddOn: (addon: EquipmentPackage) => void;
}

export default function EquipmentSelector({
  catalog,
  selected,
  onToggle,
  onUpdate,
  activePackageId,
  activeAddOnIds,
  onApplyPackage,
  onToggleAddOn,
}: Props) {
  const { t, lang } = useI18n();
  const [category, setCategory] = useState<string>("all");
  const [query, setQuery] = useState("");

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

  const selectedCount = Object.keys(selected).length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-950 sm:text-3xl">
        {t.step1Title}
      </h1>
      <p className="mt-2 max-w-2xl text-brand-700">{t.step1Sub}</p>

      <div className="mt-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-600">
          {t.packagesTitle}
        </h2>
        <p className="mt-1 text-sm text-brand-600">{t.packagesHint}</p>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {PACKAGES.map((pkg) => {
            const isActive = activePackageId === pkg.id;
            return (
              <button
                key={pkg.id}
                type="button"
                onClick={() => onApplyPackage(pkg)}
                className={`rounded-xl border p-3 text-left shadow-sm transition ${
                  isActive
                    ? "border-brand-500 bg-brand-50 ring-2 ring-brand-300"
                    : "border-brand-100 bg-white hover:border-brand-300"
                }`}
              >
                <div className="text-xl">{pkg.emoji}</div>
                <div className="mt-1 text-sm font-semibold text-brand-950">
                  {pkg.title[lang]}
                </div>
                <div className="mt-0.5 text-xs text-brand-500">
                  {pkg.subtitle[lang]}
                </div>
              </button>
            );
          })}
        </div>

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
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-brand-600 text-white"
                    : "bg-white text-brand-700 border border-brand-200 hover:bg-brand-50"
                }`}
              >
                <span>{addon.emoji}</span>
                {addon.title[lang]}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-6 text-sm text-brand-500">{t.searchHint}</p>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 sm:max-w-xs"
        />
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
              category === "all"
                ? "bg-brand-600 text-white"
                : "bg-white text-brand-700 border border-brand-200 hover:bg-brand-50"
            }`}
          >
            {t.allCategories}
          </button>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                category === c
                  ? "bg-brand-600 text-white"
                  : "bg-white text-brand-700 border border-brand-200 hover:bg-brand-50"
              }`}
            >
              {CATEGORY_LABELS[c]?.[lang] ?? c}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-4 text-sm font-medium text-brand-600">
        {selectedCount} {t.selectedCount}
      </p>

      <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {filtered.map((item) => {
          const key = itemKey(item);
          const sel = selected[key];
          const isSelected = !!sel;
          const name = lang === "es" ? item.name : item.nameEn;
          const spec = lang === "es" ? item.spec : item.specEn;
          return (
            <li
              key={key}
              className={`rounded-xl border bg-white p-4 shadow-sm transition ${
                isSelected
                  ? "border-brand-400 ring-1 ring-brand-300"
                  : "border-brand-100"
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

              {isSelected && (
                <div className="mt-3 flex flex-wrap items-center gap-4 border-t border-brand-100 pt-3">
                  <label className="flex items-center gap-2 text-sm text-brand-700">
                    {t.quantity}
                    <input
                      type="number"
                      min={1}
                      value={sel.quantity}
                      onChange={(e) =>
                        onUpdate(key, {
                          quantity: Math.max(1, Number(e.target.value) || 1),
                        })
                      }
                      className="w-16 rounded-md border border-brand-200 px-2 py-1 text-sm focus:border-brand-500 focus:outline-none"
                    />
                  </label>
                  <label className="flex items-center gap-2 text-sm text-brand-700">
                    {t.hoursPerDay}
                    <input
                      type="number"
                      min={0}
                      max={24}
                      step={0.5}
                      value={sel.hours}
                      onChange={(e) =>
                        onUpdate(key, {
                          hours: Math.min(
                            24,
                            Math.max(0, Number(e.target.value) || 0)
                          ),
                        })
                      }
                      className="w-16 rounded-md border border-brand-200 px-2 py-1 text-sm focus:border-brand-500 focus:outline-none"
                    />
                  </label>
                  <label className="flex items-center gap-2 text-sm text-brand-700">
                    <input
                      type="checkbox"
                      checked={sel.essential}
                      onChange={(e) =>
                        onUpdate(key, { essential: e.target.checked })
                      }
                      className="h-4 w-4 rounded border-brand-300 text-sun-500 focus:ring-sun-500"
                    />
                    <span title={t.essentialHint}>{t.essential}</span>
                  </label>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
