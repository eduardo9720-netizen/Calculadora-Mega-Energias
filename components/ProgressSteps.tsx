const STEPS = [1, 2, 3] as const;

export default function ProgressSteps({ current }: { current: 1 | 2 | 3 }) {
  return (
    <div className="flex items-center gap-2">
      {STEPS.map((step, idx) => (
        <div key={step} className="flex items-center gap-2">
          <div
            className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold transition ${
              step === current
                ? "bg-brand-600 text-white"
                : step < current
                ? "bg-brand-200 text-brand-800"
                : "bg-white text-brand-300 border border-brand-200"
            }`}
          >
            {step}
          </div>
          {idx < STEPS.length - 1 && (
            <div
              className={`h-0.5 w-6 sm:w-10 ${
                step < current ? "bg-brand-300" : "bg-brand-100"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
