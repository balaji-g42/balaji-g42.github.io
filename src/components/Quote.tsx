import Reveal from "./Reveal";

export default function Quote({ text, by = "Tony Stark", bg }: { text: string; by?: string; bg?: string }) {
  return (
    <section className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-8 sm:py-24">
      {bg && (
        <img
          src={bg}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-contain opacity-30 mix-blend-screen"
        />
      )}
      <Reveal>
        <span className="mx-auto mb-5 block h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent" />
        <p className="font-display text-3xl leading-tight tracking-wide sm:text-6xl">&ldquo;{text}&rdquo;</p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-accent">{by}</p>
        <span className="mx-auto mt-5 block h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent" />
      </Reveal>
    </section>
  );
}
