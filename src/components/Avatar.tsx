import type { ProfileId } from "../data/portfolio";

const looks: Record<ProfileId, { bg: string; mouth: string }> = {
  recruiter: { bg: "#e5222f", mouth: "M30 66 Q50 82 70 66" },
  client: { bg: "#1f8fe5", mouth: "M30 68 Q50 78 70 68" },
  developer: { bg: "#f5b400", mouth: "M32 70 L68 70" },
};

export default function Avatar({ id, className = "" }: { id: ProfileId; className?: string }) {
  const l = looks[id];
  return (
    <svg viewBox="0 0 100 100" className={`rounded-md ${className}`} aria-hidden>
      <rect width="100" height="100" fill={l.bg} />
      <circle cx="34" cy="42" r="6" fill="#111" />
      <circle cx="66" cy="42" r="6" fill="#111" />
      <path d={l.mouth} fill="none" stroke="#111" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}
