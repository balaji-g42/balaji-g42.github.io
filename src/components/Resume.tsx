import { person } from "../data/portfolio";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

const pages = [1, 2, 3];

export default function Resume() {
  return (
    <section id="resume" className="mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-20">
      <SectionTitle kicker="The screenplay" title="The Full Story" />
      <Reveal>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-xl text-muted">The whole script on one page set: roles, projects, skills and certifications. Scroll to read, or take a copy with you.</p>
          <a
            href={person.resume}
            download="Balaji_G_Resume.pdf"
            className="flex items-center gap-2 rounded bg-white px-6 py-3 font-semibold text-black transition-colors hover:bg-white/80"
          >
            <span aria-hidden>⬇</span> Download resume
          </a>
        </div>
        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-[#e0b04a]/40 bg-panel shadow-[0_0_60px_-20px_rgba(224,176,74,0.35)]">
          <div className="flex items-center justify-between border-b border-line px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-muted">
            <span>Balaji_G_Resume.pdf</span>
            <span>{pages.length} pages</span>
          </div>
          <div tabIndex={0} aria-label="Resume pages" className="max-h-[75vh] space-y-3 overflow-y-auto bg-black/40 p-3 sm:p-4">
            {pages.map((n) => (
              <img
                key={n}
                src={`/resume/page-${n}.webp`}
                alt={`Resume page ${n} of ${pages.length}`}
                width={1347}
                height={1743}
                loading="lazy"
                className="w-full rounded bg-white"
              />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
