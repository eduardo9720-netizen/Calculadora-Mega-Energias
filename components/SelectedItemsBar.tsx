"use client";

import { useState } from "react";
import type { SelectedItem } from "@/lib/types";
import { useI18n } from "@/lib/i18n-context";

interface Props {
  items: SelectedItem[];
  onRemove: (key: string) => void;
}

export default function SelectedItemsBar({ items, onRemove }: Props) {
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
            <ul className="max-h-64 overflow-y-auto border-b border-brand-100">
              {items.map((s) => {
                const name = lang === "es" ? s.item.name : s.item.nameEn;
                return (
                  <li
                    key={s.key}
                    className="flex items-center justify-between gap-2 border-b border-brand-50 px-4 py-2 text-sm last:border-b-0"
                  >
                    <span className="text-brand-800">
                      {name}
                      <span className="text-brand-400"> × {s.quantity}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => onRemove(s.key)}
                      aria-label="remove"
                      className="px-1 text-brand-400 hover:text-brand-700"
                    >
                      ×
                    </button>
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
