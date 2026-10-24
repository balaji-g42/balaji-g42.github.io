import type { ProfileId } from "../data/portfolio";

export default function Avatar({ id, className = "" }: { id: ProfileId; className?: string }) {
  return <img src={`/avatars/${id}.webp`} alt="" aria-hidden className={`rounded-md object-cover ${className}`} />;
}
