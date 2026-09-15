"use client";

import { useState } from "react";
import type { SelectedItem } from "@/lib/types";
import { useI18n } from "@/lib/i18n-context";

interface Props {
  items: SelectedItem[];
  onRemove: (key: string) => void;
  onUpdate: (key: string, patch: Partial<SelectedItem>) => void;
}

export default function SelectedItemsBar({ items, onRemove, onUpdate }: Props) {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);

  if (items.length === 0) return null;

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="close"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 cursor-default bg-brand-950/20"
        />
      )}
      <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-lg border border-brand-200 bg-white">
          {open && (
            <ul className="max-h-80 overflow-y-auto border-b border-brand-100">
              {items.map((s) => {
                const name = lang === "es" ? s.item.name : s.item.nameEn;
                return (
                  <li
                    key={s.key}
                    className="border-b border-brand-50 px-4 py-2.5 text-sm last:border-b-0"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="min-w-0 truncate text-brand-800">{name}</span>
                      <button
                        type="button"
                        onClick={() => onRemove(s.key)}
                        aria-label="remove"
                        className="flex-shrink-0 px-1 text-brand-400 hover:text-brand-700"
                      >
                        ×
                      </button>
                    </div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-brand-600">
                      <label className="flex items-center gap-1.5">
                        {t.quantity}
                        <input
                          type="number"
                          min={1}
                          value={s.quantity}
                          onChange={(e) =>
                            onUpdate(s.key, {
                              quantity: Math.max(1, Number(e.target.value) || 1),
                            })
                          }
                          className="w-14 rounded-md border border-brand-200 px-1.5 py-1 text-xs focus:border-brand-500 focus:outline-none"
                        />
                      </label>
                      <label className="flex items-center gap-1.5">
                        {t.hoursPerDay}
                        <input
                          type="number"
                          min={0}
                          max={24}
                          step={0.5}
                          value={s.hours}
                          onChange={(e) =>
                            onUpdate(s.key, {
                              hours: Math.min(
                                24,
                                Math.max(0, Number(e.target.value) || 0)
                              ),
                            })
                          }
                          className="w-14 rounded-md border border-brand-200 px-1.5 py-1 text-xs focus:border-brand-500 focus:outline-none"
                        />
                      </label>
                      <label className="flex items-center gap-1.5">
                        <input
                          type="checkbox"
                          checked={s.essential}
                          onChange={(e) =>
                            onUpdate(s.key, { essential: e.target.checked })
                          }
                          className="h-3.5 w-3.5 rounded border-brand-300 text-brand-600 focus:ring-brand-500"
                        />
                        <span title={t.essentialHint}>{t.essential}</span>
                      </label>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-brand-950"
          >
            <span>
              {items.length} {t.selectedCount}
            </span>
            <span className="text-brand-500">{open ? "−" : "+"}</span>
          </button>
        </div>
      </div>
    </>
  );
}
