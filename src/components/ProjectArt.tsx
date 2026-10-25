import type { Project } from "../data/portfolio";

const stroke = { fill: "none", stroke: "rgba(255,255,255,0.55)", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const gold = { fill: "none", stroke: "#e0b04a", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function Weather() {
  const rays = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <g>
      <circle cx="165" cy="70" r="26" {...gold} />
      {rays.map((a) => (
        <line
          key={a}
          x1={165 + 34 * Math.cos((a * Math.PI) / 180)}
          y1={70 + 34 * Math.sin((a * Math.PI) / 180)}
          x2={165 + 44 * Math.cos((a * Math.PI) / 180)}
          y2={70 + 44 * Math.sin((a * Math.PI) / 180)}
          {...gold}
        />
      ))}
      <path d="M62 150a22 22 0 0 1 4-43 30 30 0 0 1 58-4 24 24 0 0 1 10 47z" {...stroke} />
      {[80, 104, 128].map((x) => (
        <line key={x} x1={x} y1="166" x2={x - 8} y2="186" {...gold} />
      ))}
    </g>
  );
}

function Memory() {
  const nodes = [[120, 60], [60, 110], [180, 100], [90, 170], [160, 175], [120, 120]];
  const edges = [[0, 1], [0, 2], [0, 5], [1, 5], [2, 5], [1, 3], [2, 4], [3, 5], [4, 5], [3, 4]];
  return (
    <g>
      {edges.map(([a, b]) => (
        <line key={`${a}-${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} {...stroke} />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={i === 5 ? 12 : 7} {...(i === 5 ? gold : stroke)} fill={i === 5 ? "rgba(224,176,74,0.25)" : "rgba(255,255,255,0.12)"} />
      ))}
    </g>
  );
}

function Test() {
  return (
    <g>
      <rect x="45" y="55" width="150" height="110" rx="10" {...stroke} />
      <line x1="45" y1="82" x2="195" y2="82" {...stroke} />
      <circle cx="60" cy="68" r="3" {...gold} />
      <circle cx="72" cy="68" r="3" {...stroke} />
      {[100, 125, 150].map((y) => (
        <g key={y}>
          <path d={`M62 ${y}l7 7 13-14`} {...gold} />
          <line x1="100" y1={y} x2={y === 125 ? 160 : 175} y2={y} {...stroke} />
        </g>
      ))}
    </g>
  );
}

function Pipeline() {
  const xs = [50, 105, 160];
  return (
    <g>
      {xs.map((x, i) => (
        <g key={x}>
          <rect x={x - 22} y={90} width="44" height="44" rx="10" {...(i === 2 ? gold : stroke)} />
          <path d={`M${x - 8} 112l6 6 10-12`} {...(i === 2 ? gold : stroke)} />
          {i < 2 && <path d={`M${x + 26} 112h${xs[i + 1] - x - 52}m-8 -6l8 6-8 6`} {...stroke} />}
        </g>
      ))}
      <path d="M72 150q48 36 96 0" {...stroke} strokeDasharray="4 6" />
    </g>
  );
}

function Rack() {
  return (
    <g>
      {[60, 100, 140].map((y, i) => (
        <g key={y}>
          <rect x="55" y={y} width="130" height="30" rx="6" {...stroke} />
          <circle cx="72" cy={y + 15} r="4" {...(i === 0 ? gold : stroke)} />
          <line x1="92" y1={y + 15} x2="150" y2={y + 15} {...stroke} />
          <circle cx="168" cy={y + 15} r="3" {...gold} />
        </g>
      ))}
    </g>
  );
}

function Phone() {
  return (
    <g>
      <rect x="75" y="45" width="90" height="150" rx="16" {...stroke} />
      <line x1="108" y1="56" x2="132" y2="56" {...stroke} />
      <rect x="88" y="78" width="64" height="22" rx="8" {...gold} />
      <rect x="88" y="110" width="50" height="22" rx="8" {...stroke} />
      <rect x="100" y="142" width="52" height="22" rx="8" {...stroke} />
    </g>
  );
}

function Home() {
  return (
    <g>
      <path d="M50 120l70-58 70 58M68 108v62h104v-62" {...stroke} />
      <rect x="104" y="132" width="32" height="38" rx="4" {...gold} />
      <path d="M92 90q28-24 56 0M102 98q18-14 36 0" {...gold} />
    </g>
  );
}

function Agent() {
  return (
    <g>
      <rect x="70" y="70" width="100" height="84" rx="18" {...stroke} />
      <circle cx="100" cy="106" r="9" {...gold} />
      <circle cx="140" cy="106" r="9" {...gold} />
      <line x1="104" y1="134" x2="136" y2="134" {...stroke} />
      <line x1="120" y1="70" x2="120" y2="50" {...stroke} />
      <circle cx="120" cy="46" r="5" {...gold} />
    </g>
  );
}

function Code() {
  return (
    <g>
      <path d="M96 80l-40 40 40 40M144 80l40 40-40 40" {...stroke} />
      <line x1="130" y1="68" x2="110" y2="172" {...gold} />
    </g>
  );
}

const pick = (p: Project) => {
  const t = `${p.title} ${p.kind} ${p.stack.join(" ")}`.toLowerCase();
  if (t.includes("weather")) return <Weather />;
  if (t.includes("memory") || t.includes("libretto")) return <Memory />;
  if (t.includes("agentic")) return <Agent />;
  if (t.includes("ci/cd") || t.includes("jenkins") || t.includes("template")) return <Pipeline />;
  if (t.includes("homelab") || t.includes("infrastructure") || t.includes("wud")) return <Rack />;
  if (t.includes("home automation") || t.includes("smart home")) return <Home />;
  if (t.includes("automation") || t.includes("selenium") || t.includes("framework")) return <Test />;
  if (t.includes("app") || t.includes("flutter")) return <Phone />;
  return <Code />;
};

export default function ProjectArt({ p }: { p: Project }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 240 240"
      preserveAspectRatio="xMidYMin meet"
      className="pointer-events-none absolute inset-x-0 top-6 z-0 h-[62%] w-full opacity-90 transition duration-500 group-hover:scale-110 group-hover:opacity-15"
    >
      <defs>
        <radialGradient id={`pa-${p.hue}`} cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor={`hsl(${p.hue} 90% 60%)`} stopOpacity="0.45" />
          <stop offset="100%" stopColor={`hsl(${p.hue} 90% 60%)`} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="120" cy="115" r="105" fill={`url(#pa-${p.hue})`} />
      <circle cx="120" cy="115" r="92" fill="none" stroke="rgba(224,176,74,0.25)" strokeDasharray="2 7" />
      {pick(p)}
    </svg>
  );
}
