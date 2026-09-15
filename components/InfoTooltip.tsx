"use client";

import { useState } from "react";

export default function InfoTooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-block align-middle">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onBlur={() => setOpen(false)}
        aria-label="info"
        className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full border border-brand-300 text-[10px] font-semibold leading-none text-brand-500 hover:border-brand-500 hover:text-brand-700"
      >
        ?
      </button>
      {open && (
        <span className="absolute bottom-full left-1/2 z-[60] mb-2 w-64 -translate-x-1/2 rounded-md border border-brand-200 bg-white p-3 text-xs font-normal normal-case text-brand-700">
          {text}
        </span>
      )}
    </span>
  );
}
