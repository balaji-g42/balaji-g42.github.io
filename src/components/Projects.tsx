import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, contributions, type Project, type ProfileId } from "../data/portfolio";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
import ProjectOverlay from "./ProjectOverlay";
import ProjectArt from "./ProjectArt";

type Open = { p: Project; id: string };

const groupOf = (p: Project) => {
  if (p.kind === "Mobile app" || p.kind === "Freelance app") return "Apps";
  if (p.kind === "Automation" || p.kind === "Developer tool") return "Testing & AI";
  return "Infra & DevOps";
};

const filters = ["All", "Testing & AI", "Apps", "Infra & DevOps"];

function Card({ p, id, onOpen }: { p: Project; id: string; onOpen: (o: Open) => void }) {
  return (
    <motion.button
      type="button"
      layoutId={id}
      onClick={() => onOpen({ p, id })}
      whileHover={{ scale: 1.04, y: -4 }}
      aria-label={`${p.title} details`}
      className="jp-poster group relative flex h-72 w-60 shrink-0 cursor-pointer flex-col justify-end overflow-hidden rounded-xl border border-line p-4 text-left"
      style={{ background: `linear-gradient(160deg, hsl(${p.hue} 70% 32%), hsl(${p.hue} 60% 9%) 70%)` }}
    >
      <ProjectArt p={p} />
      <span className="absolute left-4 top-4 z-10 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/70">{p.kind}</span>
      {p.status && <span className="absolute right-4 top-4 rounded bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-black">{p.status}</span>}
      <h3 className="relative z-10 font-display text-3xl leading-none tracking-wide">{p.title}</h3>
      <div className="jp-preview">
        <p className="mt-2 text-xs leading-snug text-white/85">{p.pitch}</p>
        <div className="mt-3 flex flex-wrap gap-1">
          {p.stack.map((t) => (
            <span key={t} className="rounded bg-black/40 px-1.5 py-0.5 text-[10px]">
              {t}
            </span>
          ))}
        </div>
      </div>
      <span className="mt-3 flex items-center justify-between text-xs font-semibold">
        <span className="flex items-center gap-1.5">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-[8px] text-black">▶</span>
          View details
        </span>
        {p.url && <span aria-hidden className="text-white/70">↗</span>}
      </span>
    </motion.button>
  );
}

export default function Projects({ profile }: { profile: ProfileId }) {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<Open | null>(null);
  const match = (p: Project) => filter === "All" || groupOf(p) === filter;
  const featured = projects.filter((p) => p.featured && match(p));
  const rest = projects.filter((p) => !p.featured && match(p));
  return (
    <section id="projects" className="mx-auto max-w-7xl px-4 py-20 sm:px-8">
      <SectionTitle kicker="Only on this portfolio" title="Originals" />
      <div role="group" aria-label="Filter projects" className="rail mb-6 gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={f === filter}
            onClick={() => setFilter(f)}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
              f === filter ? "border-white bg-white text-black" : "border-line text-muted hover:border-white/40 hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      {featured.length > 0 && (
        <Reveal>
          <h3 className="mb-3 text-lg font-semibold">{profile === "client" ? "Things I've shipped" : "Featured"}</h3>
          <div className="rail">
            {featured.map((p) => (
              <Card key={p.title} p={p} id={`f-${p.title}`} onOpen={setOpen} />
            ))}
          </div>
        </Reveal>
      )}
      {rest.length > 0 && (
        <Reveal delay={0.1}>
          <h3 className="mb-3 mt-8 text-lg font-semibold">More to watch</h3>
          <div className="rail">
            {rest.map((p) => (
              <Card key={p.title} p={p} id={`r-${p.title}`} onOpen={setOpen} />
            ))}
          </div>
        </Reveal>
      )}
      {filter === "All" && (
        <Reveal delay={0.1}>
          <h3 className="mb-3 mt-8 text-lg font-semibold">Open source contributions</h3>
          <div className="rail">
            {contributions.map((p) => (
              <Card key={p.title} p={p} id={`c-${p.title}`} onOpen={setOpen} />
            ))}
          </div>
        </Reveal>
      )}
      <AnimatePresence>{open && <ProjectOverlay p={open.p} layoutId={open.id} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}
