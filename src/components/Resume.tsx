import { useState } from "react";
import { person } from "../data/portfolio";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

export default function Resume() {
  const [open, setOpen] = useState(false);
  return (
    <section id="resume" className="mx-auto max-w-7xl px-4 py-20 sm:px-8">
      <SectionTitle kicker="The full script" title="Resume" />
      <Reveal>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="rounded bg-white px-6 py-3 font-semibold text-black transition-colors hover:bg-white/80"
          >
            {open ? "Hide resume" : "▶ View resume"}
          </button>
          <a
            href={person.resume}
            download
            className="rounded bg-white/20 px-6 py-3 font-semibold backdrop-blur transition-colors hover:bg-white/30"
          >
            Download PDF
          </a>
        </div>
        {open && (
          <div className="mt-6 overflow-hidden rounded-lg border border-line bg-panel">
            <object data={person.resume} type="application/pdf" className="h-[80vh] w-full">
              <p className="p-6 text-muted">
                Your browser can't show the PDF inline.{" "}
                <a href={person.resume} className="text-accent underline">
                  Open the resume
                </a>
                .
              </p>
            </object>
          </div>
        )}
      </Reveal>
    </section>
  );
}
