import type { ProfileId } from "../data/portfolio";

const bg: Record<ProfileId, [string, string]> = {
  recruiter: ["#ff4b57", "#9c1320"],
  client: ["#3fb0ff", "#145a9c"],
  developer: ["#ffd23f", "#c9740a"],
};

function Figure({ id }: { id: ProfileId }) {
  if (id === "recruiter") {
    return (
      <>
        <path d="M14 100 Q16 70 50 68 Q84 70 86 100Z" fill="#2b2f4a" />
        <path d="M42 68 L50 84 L58 68Z" fill="#fff" />
        <path d="M48 76 L52 76 L53 96 L47 96Z" fill="#e5222f" />
        <rect x="43" y="56" width="14" height="14" rx="5" fill="#d9a07a" />
        <ellipse cx="50" cy="42" rx="19" ry="21" fill="#e8b48c" />
        <path d="M30 40 Q30 18 50 18 Q71 18 70 40 Q62 28 50 28 Q38 28 30 40Z" fill="#1d1612" />
        <g fill="none" stroke="#111" strokeWidth="2.2">
          <circle cx="42" cy="44" r="6" />
          <circle cx="58" cy="44" r="6" />
          <path d="M48 44 H52" />
        </g>
        <path d="M43 56 Q50 61 57 56" fill="none" stroke="#7a3b2a" strokeWidth="2.4" strokeLinecap="round" />
      </>
    );
  }
  if (id === "client") {
    return (
      <>
        <path d="M12 100 Q14 70 50 68 Q86 70 88 100Z" fill="#f2f2f2" />
        <path d="M36 70 L50 88 L64 70 L50 68Z" fill="#d9d9d9" />
        <rect x="43" y="56" width="14" height="14" rx="5" fill="#a8704a" />
        <ellipse cx="50" cy="42" rx="19" ry="21" fill="#bd8559" />
        <path d="M29 38 Q31 15 50 15 Q69 15 71 38 Q64 26 50 26 Q36 26 29 38Z" fill="#101010" />
        <path d="M50 20 H62" stroke="#101010" strokeWidth="1" />
        <circle cx="42" cy="44" r="2.6" fill="#111" />
        <circle cx="58" cy="44" r="2.6" fill="#111" />
        <path d="M40 55 Q50 66 60 55" fill="#fff" stroke="#6b2f1f" strokeWidth="1.6" />
        <path d="M32 46 Q32 70 50 72 Q68 70 68 46 Q66 62 50 64 Q34 62 32 46Z" fill="#101010" opacity="0.85" />
      </>
    );
  }
  return (
    <>
      <path d="M10 100 Q12 68 50 68 Q88 68 90 100Z" fill="#26262b" />
      <path d="M34 70 Q50 84 66 70 Q66 78 50 88 Q34 78 34 70Z" fill="#17171a" />
      <rect x="43" y="56" width="14" height="14" rx="5" fill="#c58a62" />
      <ellipse cx="50" cy="42" rx="19" ry="21" fill="#d29b72" />
      <path d="M31 38 Q32 14 50 14 Q69 14 69 38 Q60 24 50 24 Q40 24 31 38Z" fill="#3a2418" />
      <rect x="40" y="42" width="8" height="6" rx="1.5" fill="#101010" />
      <rect x="52" y="42" width="8" height="6" rx="1.5" fill="#101010" />
      <path d="M48 44 H52" stroke="#101010" strokeWidth="1.6" />
      <path d="M43 56 Q50 60 57 56" fill="none" stroke="#7a3b2a" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M27 42 Q27 10 50 10 Q73 10 73 42" fill="none" stroke="#111" strokeWidth="4" strokeLinecap="round" />
      <rect x="22" y="38" width="9" height="16" rx="4" fill="#111" />
      <rect x="69" y="38" width="9" height="16" rx="4" fill="#111" />
    </>
  );
}

export default function Avatar({ id, className = "" }: { id: ProfileId; className?: string }) {
  const [a, b] = bg[id];
  return (
    <svg viewBox="0 0 100 100" className={`overflow-hidden rounded-md ${className}`} aria-hidden>
      <defs>
        <linearGradient id={`av-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill={`url(#av-${id})`} />
      <Figure id={id} />
    </svg>
  );
}
