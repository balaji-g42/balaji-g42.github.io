export default function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-8">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">{kicker}</p>
      <h2 className="font-display text-5xl tracking-wide sm:text-6xl">{title}</h2>
    </div>
  );
}
