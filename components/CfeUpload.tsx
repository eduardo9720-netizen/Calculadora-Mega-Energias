"use client";

import { useRef } from "react";
import { useI18n } from "@/lib/i18n-context";

interface Props {
  file: File | null;
  onFileChange: (file: File | null) => void;
}

export default function CfeUpload({ file, onFileChange }: Props) {
  const { t } = useI18n();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-950 sm:text-3xl">
        {t.cfeTitle}
      </h1>
      <p className="mt-2 max-w-2xl text-brand-700">{t.cfeSub}</p>

      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        className="mt-6 cursor-pointer rounded-lg border border-dashed border-brand-300 bg-white p-10 text-center"
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*,application/pdf"
          className="hidden"
          onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
        />
        {file ? (
          <div>
            <p className="font-medium text-brand-950">{file.name}</p>
            <p className="mt-1 text-sm text-brand-500">
              {(file.size / 1024 / 1024).toFixed(1)} MB
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onFileChange(null);
              }}
              className="mt-3 text-sm font-medium text-brand-600 underline underline-offset-2"
            >
              {t.cfeRemove}
            </button>
          </div>
        ) : (
          <p className="text-brand-600">{t.cfeDropHint}</p>
        )}
      </div>
    </div>
  );
}
