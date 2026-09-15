export type FlowInverterSize = "compact" | "medium" | "large" | "xlarge" | "tbd";

interface Props {
  panelCount: number;
  hasBattery: boolean;
  batteryCount: number;
  inverterSize: FlowInverterSize;
}

// Manual-builder kVA tiers (6/10/20/30/60) don't map to the residential
// Victron categories, so they get their own thresholds for the diagram.
export function manualKvaToFlowSize(kva: number): FlowInverterSize {
  if (kva <= 10) return "compact";
  if (kva <= 20) return "medium";
  if (kva <= 30) return "large";
  return "xlarge";
}

const INVERTER_SCALE: Record<FlowInverterSize, number> = {
  compact: 0.8,
  medium: 0.95,
  large: 1.1,
  xlarge: 1.3,
  tbd: 0.85,
};

function PanelIcon({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="0" y="0" width="34" height="22" rx="2" fill="#394a62" stroke="#e9ad5b" strokeWidth="1.5" />
      <line x1="0" y1="7.3" x2="34" y2="7.3" stroke="#eeb977" strokeWidth="0.75" opacity="0.7" />
      <line x1="0" y1="14.6" x2="34" y2="14.6" stroke="#eeb977" strokeWidth="0.75" opacity="0.7" />
      <line x1="11.3" y1="0" x2="11.3" y2="22" stroke="#eeb977" strokeWidth="0.75" opacity="0.7" />
      <line x1="22.6" y1="0" x2="22.6" y2="22" stroke="#eeb977" strokeWidth="0.75" opacity="0.7" />
    </g>
  );
}

function BatteryIcon({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="5" y="-4" width="6" height="4" fill="#394a62" />
      <rect x="0" y="0" width="16" height="26" rx="2" fill="white" stroke="#394a62" strokeWidth="1.5" />
      <rect x="2.5" y="15" width="11" height="8.5" fill="#e9ad5b" />
    </g>
  );
}

// Animated, non-numeric illustration of panels -> inverter -> house (and
// -> battery bank when the mode has backup). Sizes are relative/illustrative
// only, driven by the same fuzzed ranges shown to the customer — never the
// exact advisor-facing numbers.
export default function SystemFlowDiagram({
  panelCount,
  hasBattery,
  batteryCount,
  inverterSize,
}: Props) {
  const panels = Math.min(Math.max(Math.round(panelCount), 1), 6);
  const batteries = Math.min(Math.max(Math.round(batteryCount), 1), 5);
  const invScale = INVERTER_SCALE[inverterSize];

  const panelXs = Array.from({ length: panels }, (_, i) => 16 + i * 40);
  const panelRowY = 36;
  const panelExitX = panelXs[panels - 1] + 34;
  const panelExitY = panelRowY + 11;

  const inverterW = 56 * invScale;
  const inverterH = 68 * invScale;
  const inverterX = 300;
  const inverterY = 90 - (inverterH - 68) / 2;
  const inverterMidY = inverterY + inverterH / 2;

  const houseX = 500;
  const houseY = 50;

  const batteryY = 186;
  const batteryStartX = inverterX + inverterW / 2 - (batteries * 22) / 2;

  return (
    <svg viewBox="0 0 620 230" className="w-full" role="img" aria-hidden="true">
      {panelXs.map((x, i) => (
        <PanelIcon key={i} x={x} y={panelRowY} />
      ))}

      <path
        id="mega-flow-panels-inv"
        d={`M ${panelExitX} ${panelExitY} L ${inverterX} ${inverterMidY}`}
        stroke="#b0bfcd"
        strokeWidth="2"
        fill="none"
      />
      <circle r="3.5" fill="#e9ad5b">
        <animateMotion dur="2.4s" repeatCount="indefinite" begin="0s">
          <mpath href="#mega-flow-panels-inv" />
        </animateMotion>
      </circle>

      <rect x={inverterX} y={inverterY} width={inverterW} height={inverterH} rx="6" fill="#394a62" />
      <text
        x={inverterX + inverterW / 2}
        y={inverterMidY + 4}
        textAnchor="middle"
        fill="white"
        fontSize="10"
        fontWeight="600"
      >
        INV
      </text>

      <path
        id="mega-flow-inv-house"
        d={`M ${inverterX + inverterW} ${inverterMidY} L ${houseX} ${houseY + 40}`}
        stroke="#b0bfcd"
        strokeWidth="2"
        fill="none"
      />
      <circle r="3.5" fill="#e9ad5b">
        <animateMotion dur="2.4s" repeatCount="indefinite" begin="0.5s">
          <mpath href="#mega-flow-inv-house" />
        </animateMotion>
      </circle>

      <g transform={`translate(${houseX} ${houseY})`}>
        <polygon points="40,0 0,32 80,32" fill="#e9ad5b" />
        <rect x="10" y="32" width="60" height="46" fill="white" stroke="#394a62" strokeWidth="2" />
        <rect x="33" y="56" width="14" height="22" fill="#394a62" />
      </g>

      {hasBattery && (
        <>
          <path
            id="mega-flow-inv-battery"
            d={`M ${inverterX + inverterW / 2} ${inverterY + inverterH} L ${inverterX + inverterW / 2} ${batteryY}`}
            stroke="#b0bfcd"
            strokeWidth="2"
            fill="none"
          />
          <circle r="3.5" fill="#e9ad5b">
            <animateMotion dur="2.4s" repeatCount="indefinite" begin="1s">
              <mpath href="#mega-flow-inv-battery" />
            </animateMotion>
          </circle>
          {Array.from({ length: batteries }, (_, i) => (
            <BatteryIcon key={i} x={batteryStartX + i * 22} y={batteryY} />
          ))}
        </>
      )}
    </svg>
  );
}
