import type { CSSProperties } from "react";

type CloudShape = "wide" | "puff" | "wisp" | "asym";

type CloudSpec = {
  phase: number;
  duration: number;
  staticLeft: string;
  top: string;
  width: string;
  opacity: number;
  shape: CloudShape;
  tilt: number;
};

const CLOUDS: CloudSpec[] = [
  {
    phase: 0.43,
    duration: 290,
    staticLeft: "6%",
    top: "4%",
    width: "clamp(150px, 16vw, 250px)",
    opacity: 0.8,
    shape: "wide",
    tilt: -1.5,
  },
  {
    phase: 0.555,
    duration: 380,
    staticLeft: "34%",
    top: "22%",
    width: "clamp(100px, 10vw, 160px)",
    opacity: 0.62,
    shape: "wisp",
    tilt: 1,
  },
  {
    phase: 0.68,
    duration: 340,
    staticLeft: "60%",
    top: "8%",
    width: "clamp(170px, 18vw, 285px)",
    opacity: 0.72,
    shape: "puff",
    tilt: -1,
  },
  {
    phase: 0.805,
    duration: 410,
    staticLeft: "84%",
    top: "33%",
    width: "clamp(85px, 8vw, 125px)",
    opacity: 0.5,
    shape: "asym",
    tilt: 2,
  },
  {
    phase: 0.93,
    duration: 310,
    staticLeft: "16%",
    top: "40%",
    width: "clamp(70px, 7vw, 115px)",
    opacity: 0.38,
    shape: "wisp",
    tilt: 1.5,
  },
  {
    phase: 0.055,
    duration: 360,
    staticLeft: "46%",
    top: "14%",
    width: "clamp(120px, 12vw, 190px)",
    opacity: 0.58,
    shape: "puff",
    tilt: 1.2,
  },
  {
    phase: 0.18,
    duration: 300,
    staticLeft: "70%",
    top: "30%",
    width: "clamp(95px, 9vw, 145px)",
    opacity: 0.46,
    shape: "wide",
    tilt: -2,
  },
  {
    phase: 0.305,
    duration: 350,
    staticLeft: "92%",
    top: "6%",
    width: "clamp(110px, 11vw, 175px)",
    opacity: 0.66,
    shape: "asym",
    tilt: -0.8,
  },
];

const FADE =
  "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 45%, rgba(0,0,0,0.9) 60%, rgba(0,0,0,0.62) 74%, rgba(0,0,0,0.28) 87%, rgba(0,0,0,0) 100%)";

function Cloud({ shape }: { shape: CloudShape }) {
  return (
    <svg
      viewBox="0 0 240 64"
      aria-hidden="true"
      style={{ display: "block", width: "100%", height: "auto" }}
    >
      <g fill="#fff">
        {shape === "wide" && (
          <>
            <ellipse cx="120" cy="42" rx="118" ry="20" />
            <ellipse cx="54" cy="46" rx="76" ry="15" />
            <ellipse cx="194" cy="45" rx="86" ry="16" />
            <ellipse cx="138" cy="29" rx="66" ry="16" />
            <ellipse cx="94" cy="32" rx="52" ry="13" />
          </>
        )}
        {shape === "puff" && (
          <>
            <ellipse cx="118" cy="46" rx="98" ry="18" />
            <ellipse cx="60" cy="48" rx="60" ry="14" />
            <ellipse cx="182" cy="47" rx="64" ry="15" />
            <ellipse cx="104" cy="30" rx="54" ry="18" />
            <ellipse cx="146" cy="33" rx="42" ry="15" />
            <ellipse cx="74" cy="36" rx="34" ry="12" />
          </>
        )}
        {shape === "wisp" && (
          <>
            <ellipse cx="120" cy="42" rx="114" ry="13" />
            <ellipse cx="58" cy="44" rx="62" ry="9" />
            <ellipse cx="186" cy="43" rx="66" ry="10" />
            <ellipse cx="132" cy="34" rx="48" ry="10" />
            <ellipse cx="94" cy="35" rx="34" ry="7" />
          </>
        )}
        {shape === "asym" && (
          <>
            <ellipse cx="130" cy="44" rx="100" ry="17" />
            <ellipse cx="58" cy="47" rx="54" ry="12" />
            <ellipse cx="202" cy="49" rx="42" ry="10" />
            <ellipse cx="122" cy="30" rx="44" ry="14" />
            <ellipse cx="170" cy="34" rx="32" ry="10" />
            <ellipse cx="86" cy="35" rx="28" ry="9" />
          </>
        )}
      </g>
    </svg>
  );
}

export default function TopBar({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      aria-hidden="true"
      className={`tb-root ${className}`}
      style={{
        position: "relative",
        width: "100%",
        height: "clamp(80px, 8vw, 120px)",
        overflow: "hidden",
        pointerEvents: "none",
        background:
          "linear-gradient(to bottom, #a8d3ec 0%, #bfe1f3 34%, #d6ebf6 68%, #eaf4f9 100%)",
        maskImage: FADE,
        WebkitMaskImage: FADE,
        ...style,
      }}
    >
      <style>{CSS}</style>
      {CLOUDS.map((cloud, i) => (
        <div
          key={i}
          className="tb-cloud"
          style={
            {
              "--tb-left": cloud.staticLeft,
              top: cloud.top,
              width: cloud.width,
              opacity: cloud.opacity,
              animationDuration: `${cloud.duration}s`,
              animationDelay: `${-cloud.phase * cloud.duration}s`,
            } as CSSProperties
          }
        >
          <div style={{ transform: `rotate(${cloud.tilt}deg)` }}>
            <Cloud shape={cloud.shape} />
          </div>
        </div>
      ))}
    </div>
  );
}

const CSS = `
.tb-cloud{position:absolute;left:0;display:block;filter:blur(5px);will-change:transform;animation-name:tb-drift;animation-timing-function:linear;animation-iteration-count:infinite}
@keyframes tb-drift{from{transform:translateX(-130vw)}to{transform:translateX(130vw)}}
@media (prefers-reduced-motion:reduce){.tb-cloud{animation:none;left:var(--tb-left,0)}}
`;
