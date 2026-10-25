export default function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-8 sm:mb-10">
      <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
        <span className="h-px w-8 bg-accent sm:w-12" />
        {kicker}
      </p>
      <h2 className="mt-1 font-display text-5xl tracking-wide sm:text-6xl">{title}</h2>
      <span className="sec-bar mt-3 block h-[3px] w-24 rounded-full bg-gradient-to-r from-accent to-transparent" />
    </div>
  );
}
