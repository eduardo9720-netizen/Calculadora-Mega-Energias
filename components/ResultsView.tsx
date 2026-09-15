"use client";

import type { CalculationResult } from "@/lib/types";
import { useI18n } from "@/lib/i18n-context";
import LeadForm from "./LeadForm";

interface Props {
  result: CalculationResult;
}

export default function ResultsView({ result }: Props) {
  const { t } = useI18n();

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-950 sm:text-3xl">
        {t.step3Title}
      </h1>
      <p className="mt-2 max-w-2xl text-brand-700">{t.step3Sub}</p>

      <div className="mt-8">
        <LeadForm mode={result.mode} result={result} />
      </div>
    </div>
  );
}
