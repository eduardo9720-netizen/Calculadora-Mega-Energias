"use client";

import { useState, type FormEvent } from "react";
import type { CalculationResult } from "@/lib/types";
import { useI18n } from "@/lib/i18n-context";

interface Props {
  result: CalculationResult;
}

type Status = "idle" | "submitting" | "success" | "error";

export default function LeadForm({ result }: Props) {
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
      const inverterKW = result.inverterParallelUnits
        ? (result.inverterSize?.kva ?? 0) * result.inverterParallelUnits
        : result.inverterSize?.kva ?? result.gridTieEstimatedKW ?? null;

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email: email || undefined,
          notes: notes || undefined,
          lang,
          mode: result.mode,
          dailyWhTotal: result.dailyWhTotal,
          panelCount: result.panelCount,
          batteryCount: result.batteryCount,
          inverterKW,
        }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-brand-300 bg-brand-50 p-5 text-brand-800">
        {t.submitSuccess}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-brand-100 bg-white p-5 shadow-sm"
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
        className="mt-4 w-full rounded-lg bg-brand-600 px-4 py-2.5 font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? t.submitting : t.submit}
      </button>
    </form>
  );
}
