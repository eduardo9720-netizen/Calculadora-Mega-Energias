const BOLT_PATH = "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z";

export default function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg viewBox="0 0 24 24" className="h-7 w-7 flex-shrink-0" aria-hidden="true">
        <path d={BOLT_PATH} fill="#394a62" transform="translate(1.6 1.6)" />
        <path d={BOLT_PATH} fill="#e9ad5b" />
      </svg>
      <div className="leading-tight">
        <div className="font-display text-xl text-brand-600">MEGA</div>
      </div>
    </div>
  );
}
