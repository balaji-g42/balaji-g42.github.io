import Reveal from "./Reveal";

export default function Quote({ text, by = "Tony Stark", bg }: { text: string; by?: string; bg?: string }) {
  return (
    <section className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-8 sm:py-24">
      {bg && (
        <img
          src={bg}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-contain opacity-30 mix-blend-screen"
        />
      )}
      <Reveal>
        <p className="font-display text-4xl leading-tight tracking-wide sm:text-6xl">&ldquo;{text}&rdquo;</p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-accent">{by}</p>
      </Reveal>
    </section>
  );
}
