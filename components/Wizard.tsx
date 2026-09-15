"use client";

import { useMemo, useState } from "react";
import type {
  CatalogItem,
  ManualConfig,
  SelectedItem,
  SystemMode,
} from "@/lib/types";
import { calculate, itemKey, DEFAULT_AUTONOMY_DAYS, DEFAULT_KWH_PER_BATTERY } from "@/lib/calculations";
import { resolvePackageItems, type EquipmentPackage } from "@/lib/packages";
import { useI18n } from "@/lib/i18n-context";
import LanguageToggle from "./LanguageToggle";
import ProgressSteps from "./ProgressSteps";
import EquipmentSelector from "./EquipmentSelector";
import SystemTypeSelector from "./SystemTypeSelector";
import ResultsView from "./ResultsView";
import BottomNav from "./BottomNav";
import CfeUpload from "./CfeUpload";
import ManualBuilder from "./ManualBuilder";
import LeadForm from "./LeadForm";

interface Props {
  catalog: CatalogItem[];
  loadError: string | null;
}

type IntakeMode = "equipment" | "cfe" | "manual";

const DEFAULT_MANUAL_CONFIG: ManualConfig = {
  panelCount: 4,
  batteryCount: 1,
  inverterKva: 5,
  parallelUnits: 1,
};

export default function Wizard({ catalog, loadError }: Props) {
  const { t } = useI18n();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [intakeMode, setIntakeMode] = useState<IntakeMode>("equipment");
  const [selected, setSelected] = useState<Record<string, SelectedItem>>({});
  const [cfeFile, setCfeFile] = useState<File | null>(null);
  const [manualConfig, setManualConfig] = useState<ManualConfig>(DEFAULT_MANUAL_CONFIG);
  const [mode, setMode] = useState<SystemMode | null>(null);
  const [kwhPerBattery] = useState(DEFAULT_KWH_PER_BATTERY);
  const [autonomyDays] = useState(DEFAULT_AUTONOMY_DAYS);
  const [activePackageId, setActivePackageId] = useState<string | null>(null);
  const [activeAddOnIds, setActiveAddOnIds] = useState<Set<string>>(new Set());

  const selectedList = useMemo(() => Object.values(selected), [selected]);

  const result = useMemo(() => {
    if (!mode || intakeMode !== "equipment") return null;
    return calculate(selectedList, mode, { kwhPerBattery, autonomyDays });
  }, [selectedList, mode, intakeMode, kwhPerBattery, autonomyDays]);

  function toggleItem(item: CatalogItem) {
    const key = itemKey(item);
    setSelected((prev) => {
      const next = { ...prev };
      if (next[key]) {
        delete next[key];
      } else {
        next[key] = {
          key,
          item,
          quantity: 1,
          hours: item.hours,
          essential: false,
        };
      }
      return next;
    });
  }

  function removeItem(key: string) {
    setSelected((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function updateItem(key: string, patch: Partial<SelectedItem>) {
    setSelected((prev) => {
      if (!prev[key]) return prev;
      return { ...prev, [key]: { ...prev[key], ...patch } };
    });
  }

  function applyPackage(pkg: EquipmentPackage) {
    const items = resolvePackageItems(pkg, catalog);
    const next: Record<string, SelectedItem> = {};
    for (const s of items) next[s.key] = s;
    setSelected(next);
    setActivePackageId(pkg.id);
    setActiveAddOnIds(new Set());
  }

  function toggleAddOn(addon: EquipmentPackage) {
    const items = resolvePackageItems(addon, catalog);
    setSelected((prev) => {
      const next = { ...prev };
      const isActive = activeAddOnIds.has(addon.id);
      if (isActive) {
        for (const s of items) delete next[s.key];
      } else {
        for (const s of items) next[s.key] = s;
      }
      return next;
    });
    setActiveAddOnIds((prev) => {
      const next = new Set(prev);
      if (next.has(addon.id)) next.delete(addon.id);
      else next.add(addon.id);
      return next;
    });
  }

  function startOver() {
    setStep(1);
    setSelected({});
    setCfeFile(null);
    setManualConfig(DEFAULT_MANUAL_CONFIG);
    setMode(null);
    setActivePackageId(null);
    setActiveAddOnIds(new Set());
  }

  const step1Valid =
    intakeMode === "equipment"
      ? selectedList.length > 0
      : intakeMode === "cfe"
      ? cfeFile !== null
      : manualConfig.panelCount > 0;

  const canGoNext = step === 1 ? step1Valid : step === 2 ? !!mode : true;
  const nextLabel = step === 2 ? t.seeResults : t.next;

  function handleNext() {
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
  }

  function handleBack() {
    setStep((s) => (s > 1 ? ((s - 1) as 1 | 2) : s));
  }

  const intakeTabs: { id: IntakeMode; label: string }[] = [
    { id: "equipment", label: t.intakeEquipmentTab },
    { id: "cfe", label: t.intakeCfeTab },
    { id: "manual", label: t.intakeManualTab },
  ];

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 pb-24 pt-8 sm:px-6 sm:pt-12">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            {t.appName}
          </h2>
        </div>
        <LanguageToggle />
      </div>

      <div className="mt-6">
        <ProgressSteps current={step} />
      </div>

      {loadError && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {loadError}
        </div>
      )}

      <div className="mt-8">
        {step === 1 && (
          <>
            <div className="grid grid-cols-3 gap-2">
              {intakeTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setIntakeMode(tab.id)}
                  className={`flex min-h-20 items-center justify-center rounded-lg border px-3 py-4 text-center text-sm font-medium transition ${
                    intakeMode === tab.id
                      ? "border-brand-600 bg-brand-600 text-white"
                      : "border-brand-200 bg-white text-brand-700 hover:border-brand-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="mt-6">
              {intakeMode === "equipment" && (
                <EquipmentSelector
                  catalog={catalog}
                  selected={selected}
                  onToggle={toggleItem}
                  activePackageId={activePackageId}
                  activeAddOnIds={activeAddOnIds}
                  onApplyPackage={applyPackage}
                  onToggleAddOn={toggleAddOn}
                />
              )}
              {intakeMode === "cfe" && (
                <CfeUpload file={cfeFile} onFileChange={setCfeFile} />
              )}
              {intakeMode === "manual" && (
                <ManualBuilder config={manualConfig} onChange={setManualConfig} />
              )}
            </div>
          </>
        )}
        {step === 2 && <SystemTypeSelector mode={mode} onSelect={setMode} />}
        {step === 3 && intakeMode === "equipment" && result && (
          <ResultsView result={result} />
        )}
        {step === 3 && intakeMode === "cfe" && mode && (
          <div>
            <h1 className="text-2xl font-bold text-brand-950 sm:text-3xl">
              {t.step3TitleCfe}
            </h1>
            <p className="mt-2 max-w-2xl text-brand-700">{t.step3SubCfe}</p>
            <div className="mt-8">
              <LeadForm mode={mode} result={null} cfeFile={cfeFile} />
            </div>
          </div>
        )}
        {step === 3 && intakeMode === "manual" && mode && (
          <div>
            <h1 className="text-2xl font-bold text-brand-950 sm:text-3xl">
              {t.step3TitleManual}
            </h1>
            <p className="mt-2 max-w-2xl text-brand-700">{t.step3SubManual}</p>
            <div className="mt-8">
              <LeadForm mode={mode} result={null} manualConfig={manualConfig} />
            </div>
          </div>
        )}
      </div>

      <BottomNav
        step={step}
        canGoNext={canGoNext}
        nextLabel={nextLabel}
        onBack={handleBack}
        onNext={handleNext}
        onStartOver={startOver}
        summaryItems={step === 1 && intakeMode === "equipment" ? selectedList : null}
        onRemoveItem={removeItem}
        onUpdateItem={updateItem}
      />
    </main>
  );
}
