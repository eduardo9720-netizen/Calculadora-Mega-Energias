"use client";

import { useState, type FormEvent } from "react";
import type { CalculationResult, ManualConfig, SystemMode } from "@/lib/types";
import { exceedsDacThreshold, toPublicRange } from "@/lib/calculations";
import { useI18n } from "@/lib/i18n-context";

interface Props {
  mode: SystemMode;
  result: CalculationResult | null; // set for the "define consumption" path
  cfeFile?: File | null; // set for the CFE receipt path
  manualConfig?: ManualConfig | null; // set for the "build system" path
}

type Status = "idle" | "submitting" | "success" | "error";

function InverterCategoryLabel({ result }: { result: CalculationResult }) {
  const { t } = useI18n();
  const range = toPublicRange(result);
  if (range.inverterCategory === null) return <>{t.inverterTBD}</>;
  if (range.inverterCategory === "compact") return <>{t.inverterCompact}</>;
  if (range.inverterCategory === "medium") return <>{t.inverterMedium}</>;
  if (range.inverterCategory === "large") return <>{t.inverterLarge}</>;
  return <>{t.inverterXLarge}</>;
}

export default function LeadForm({ mode, result, cfeFile, manualConfig }: Props) {
  const { t, lang } = useI18n();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const fd = new FormData();
      fd.append("name", name);
      fd.append("phone", phone);
      fd.append("email", email);
      if (notes) fd.append("notes", notes);
      fd.append("lang", lang);
      fd.append("mode", mode);

      if (result) {
        fd.append("intakeMode", "equipment");
        fd.append("dailyWhTotal", String(result.dailyWhTotal));
        fd.append("panelCount", String(result.panelCount));
        if (result.batteryCount !== null) {
          fd.append("batteryCount", String(result.batteryCount));
        }
        const inverterKW = result.inverterParallelUnits
          ? (result.inverterSize?.kva ?? 0) * result.inverterParallelUnits
          : result.inverterSize?.kva ?? result.gridTieEstimatedKW ?? null;
        if (inverterKW !== null) fd.append("inverterKW", String(inverterKW));
      } else if (manualConfig) {
        fd.append("intakeMode", "manual");
        fd.append("panelCount", String(manualConfig.panelCount));
        fd.append("batteryCount", String(manualConfig.batteryCount));
        fd.append("inverterKW", String(manualConfig.inverterKva));
      } else {
        fd.append("intakeMode", "cfe");
        if (cfeFile) fd.append("receipt", cfeFile, cfeFile.name);
      }

      const res = await fetch("/api/leads", { method: "POST", body: fd });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    if (manualConfig) {
      return (
        <div className="rounded-lg border border-brand-300 bg-brand-50 p-6 text-brand-800">
          <p className="font-semibold">{t.submitSuccessManual}</p>
          <div className="mt-4 rounded-lg border border-brand-200 bg-white p-4">
            <p className="text-sm font-medium text-brand-600">
              {t.manualSummaryIntro}
            </p>
            <ul className="mt-2 space-y-1 text-brand-950">
              <li>{t.manualSummaryPanels(manualConfig.panelCount)}</li>
              {manualConfig.batteryCount > 0 && (
                <li>{t.manualSummaryBatteries(manualConfig.batteryCount)}</li>
              )}
              <li>{t.manualSummaryInverter(`${manualConfig.inverterKva} kVA`)}</li>
            </ul>
          </div>
        </div>
      );
    }
    if (!result) {
      return (
        <div className="rounded-lg border border-brand-300 bg-brand-50 p-6 text-brand-800">
          <p className="font-semibold">{t.submitSuccessCfe}</p>
        </div>
      );
    }
    const range = toPublicRange(result);
    return (
      <div className="rounded-lg border border-brand-300 bg-brand-50 p-6 text-brand-800">
        <p className="font-semibold">{t.submitSuccess}</p>
        <div className="mt-4 rounded-lg border border-brand-200 bg-white p-4">
          <p className="text-sm font-medium text-brand-600">{t.rangeIntro}</p>
          <ul className="mt-2 space-y-1 text-brand-950">
            <li>
              {result.mode === "sin-respaldo"
                ? t.rangeSolarKW(range.solarKWMin, range.solarKWMax)
                : t.rangePanels(range.panelsMin, range.panelsMax)}
            </li>
            {result.mode !== "sin-respaldo" &&
              range.batteriesMin !== null &&
              range.batteriesMax !== null && (
                <li>{t.rangeBatteries(range.batteriesMin, range.batteriesMax)}</li>
              )}
            {result.mode === "sin-respaldo" && <li>{t.rangeNoBattery}</li>}
            <li>
              <InverterCategoryLabel result={result} />
            </li>
          </ul>
          {exceedsDacThreshold(result) && (
            <p className="mt-3 rounded-md bg-accent-50 px-3 py-2 text-xs font-medium text-accent-700">
              {t.dacMessage}
            </p>
          )}
          <p className="mt-3 text-xs text-brand-500">{t.rangeDisclaimer}</p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-brand-100 bg-white p-5"
    >
      <h2 className="text-lg font-semibold text-brand-950">
        {t.leadFormTitle}
      </h2>
      <p className="mt-1 text-sm text-brand-600">{t.leadFormSub}</p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="text-sm text-brand-700">
          {t.name}
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-md border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          />
        </label>
        <label className="text-sm text-brand-700">
          {t.phone}
          <input
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full rounded-md border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          />
        </label>
        <label className="text-sm text-brand-700 sm:col-span-2">
          {t.email}
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          />
        </label>
        <label className="text-sm text-brand-700 sm:col-span-2">
          {t.notes}
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="mt-1 w-full rounded-md border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          />
        </label>
      </div>

      {status === "error" && (
        <p className="mt-3 text-sm text-red-600">{t.submitError}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-4 w-full rounded-lg bg-brand-600 px-4 py-2.5 font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? t.submitting : t.submit}
      </button>
    </form>
  );
}
