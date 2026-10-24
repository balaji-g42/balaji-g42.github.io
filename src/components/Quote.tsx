import Reveal from "./Reveal";

export default function Quote({ text }: { text: string }) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-8 sm:py-24">
      <Reveal>
        <p className="font-display text-4xl leading-tight tracking-wide sm:text-6xl">&ldquo;{text}&rdquo;</p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-accent">Tony Stark</p>
      </Reveal>
    </section>
  );
}
