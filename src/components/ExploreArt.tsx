import type { ReactElement } from "react";

const line = { fill: "none", stroke: "rgba(255,255,255,0.7)", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const gold = { fill: "none", stroke: "#e0b04a", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function About() {
  return (
    <g>
      <rect x="40" y="26" width="160" height="88" rx="10" {...line} />
      <circle cx="82" cy="60" r="14" {...gold} />
      <path d="M58 100c2-16 12-22 24-22s22 6 24 22" {...gold} />
      {[52, 66, 80, 94].map((y, i) => (
        <line key={y} x1="126" y1={y} x2={i === 0 ? 180 : i === 3 ? 154 : 172} y2={y} {...line} />
      ))}
    </g>
  );
}

function Journey() {
  return (
    <g>
      <path d="M22 108C60 108 60 42 100 56s40 56 80 36 36-56 46-60" {...line} strokeDasharray="2 7" />
      {[[22, 108], [100, 56], [150, 98], [214, 38]].map(([x, y], i) => (
        <g key={x}>
          <circle cx={x} cy={y} r={i === 3 ? 10 : 7} {...(i === 3 ? gold : line)} fill={i === 3 ? "rgba(224,176,74,0.25)" : "rgba(255,255,255,0.12)"} />
          {i === 3 && <path d="M210 38l3 3 6-7" {...gold} />}
        </g>
      ))}
    </g>
  );
}

function Originals() {
  return (
    <g>
      <rect x="34" y="44" width="52" height="72" rx="6" {...line} transform="rotate(-8 60 80)" />
      <rect x="92" y="30" width="56" height="80" rx="6" {...gold} fill="rgba(224,176,74,0.12)" />
      <path d="M112 58l22 12-22 12z" {...gold} />
      <rect x="154" y="44" width="52" height="72" rx="6" {...line} transform="rotate(8 180 80)" />
    </g>
  );
}

function Skills() {
  const nodes = [[120, 68], [60, 38], [186, 40], [46, 100], [192, 98], [120, 112]];
  return (
    <g>
      {nodes.slice(1).map(([x, y]) => (
        <line key={`${x}-${y}`} x1="120" y1="68" x2={x} y2={y} {...line} />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={i === 0 ? 14 : 7} {...(i === 0 ? gold : line)} fill={i === 0 ? "rgba(224,176,74,0.25)" : "rgba(255,255,255,0.12)"} />
      ))}
      <path d="M113 68l5 5 9-10" {...gold} />
    </g>
  );
}

function Moments() {
  return (
    <g>
      <path d="M96 34c-26 8-38 34-30 62M82 40c-8 8-10 18-8 28M72 62c-6 6-6 14-4 22" {...gold} />
      <path d="M144 34c26 8 38 34 30 62M158 40c8 8 10 18 8 28M168 62c6 6 6 14 4 22" {...gold} />
      <path d="M120 44l9 19 21 3-15 15 4 21-19-10-19 10 4-21-15-15 21-3z" {...gold} fill="rgba(224,176,74,0.25)" />
    </g>
  );
}

function Story() {
  return (
    <g>
      <path d="M78 22h62l24 24v68H78z" {...line} />
      <path d="M140 22v24h24" {...line} />
      {[60, 74, 88].map((y) => (
        <line key={y} x1="92" y1={y} x2={y === 88 ? 124 : 150} y2={y} {...line} />
      ))}
      <path d="M121 96v16m-8-8l8 8 8-8" {...gold} />
    </g>
  );
}

const art: Record<string, () => ReactElement> = { resume: Story, about: About, journey: Journey, projects: Originals, skills: Skills, achievements: Moments };

export default function ExploreArt({ id }: { id: string }) {
  const Art = art[id] ?? About;
  return (
    <svg
      aria-hidden
      viewBox="0 0 240 135"
      preserveAspectRatio="xMidYMid meet"
      className="pointer-events-none absolute inset-x-0 top-3 h-[68%] w-full opacity-90 transition duration-500 group-hover:scale-105"
    >
      <Art />
    </svg>
  );
}
