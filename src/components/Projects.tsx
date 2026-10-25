import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, contributions, type Project, type ProfileId } from "../data/portfolio";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
import ProjectOverlay, { linkText } from "./ProjectOverlay";

type Open = { p: Project; id: string };

function Card({ p, id, onOpen }: { p: Project; id: string; onOpen: (o: Open) => void }) {
  return (
    <motion.button
      type="button"
      layoutId={id}
      onClick={() => onOpen({ p, id })}
      whileHover={{ scale: 1.04, y: -4 }}
      aria-label={`${p.title} details`}
      className="relative flex h-72 w-60 shrink-0 cursor-pointer flex-col justify-end overflow-hidden rounded-xl border border-line p-4 text-left"
      style={{ background: `linear-gradient(160deg, hsl(${p.hue} 70% 32%), hsl(${p.hue} 60% 9%) 70%)` }}
    >
      <span className="absolute left-4 top-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/70">{p.kind}</span>
      {p.status && <span className="absolute right-4 top-4 rounded bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-black">{p.status}</span>}
      <h3 className="font-display text-3xl leading-none tracking-wide">{p.title}</h3>
      <p className="mt-2 text-xs leading-snug text-white/80">{p.pitch}</p>
      <div className="mt-3 flex flex-wrap gap-1">
        {p.stack.map((t) => (
          <span key={t} className="rounded bg-black/40 px-1.5 py-0.5 text-[10px]">
            {t}
          </span>
        ))}
      </div>
      {p.url && <span className="mt-3 text-xs font-semibold">{linkText(p)}</span>}
    </motion.button>
  );
}

export default function Projects({ profile }: { profile: ProfileId }) {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const [open, setOpen] = useState<Open | null>(null);
  return (
    <section id="projects" className="mx-auto max-w-7xl px-4 py-20 sm:px-8">
      <SectionTitle kicker="Only on this portfolio" title="Originals" />
      <Reveal>
        <h3 className="mb-3 text-lg font-semibold">{profile === "client" ? "Things I've shipped" : "Featured"}</h3>
        <div className="rail">
          {featured.map((p) => (
            <Card key={p.title} p={p} id={`f-${p.title}`} onOpen={setOpen} />
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <h3 className="mb-3 mt-8 text-lg font-semibold">More to watch</h3>
        <div className="rail">
          {rest.map((p) => (
            <Card key={p.title} p={p} id={`r-${p.title}`} onOpen={setOpen} />
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <h3 className="mb-3 mt-8 text-lg font-semibold">Open source contributions</h3>
        <div className="rail">
          {contributions.map((p) => (
            <Card key={p.title} p={p} id={`c-${p.title}`} onOpen={setOpen} />
          ))}
        </div>
      </Reveal>
      <AnimatePresence>{open && <ProjectOverlay p={open.p} layoutId={open.id} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}
