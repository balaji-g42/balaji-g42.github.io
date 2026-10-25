import { useEffect } from "react";
import { motion } from "framer-motion";
import type { Project } from "../data/portfolio";

export const linkText = (p: Project) => p.linkLabel ?? (p.url?.includes("/pull/") ? "View pull request ↗" : "View on GitHub ↗");

export default function ProjectOverlay({ p, layoutId, onClose }: { p: Project; layoutId: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/80 backdrop-blur-sm sm:items-center sm:p-6"
    >
      <motion.div
        layoutId={layoutId}
        role="dialog"
        aria-modal="true"
        aria-label={p.title}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-y-auto rounded-t-2xl border border-line p-6 sm:rounded-2xl sm:p-10"
        style={{ background: `linear-gradient(160deg, hsl(${p.hue} 70% 32%), hsl(${p.hue} 60% 9%) 70%)` }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-lg hover:bg-black/70"
        >
          ✕
        </button>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
          {p.kind}
          {p.year && ` · ${p.year}`}
        </p>
        <h3 className="mt-3 pr-10 font-display text-5xl leading-none tracking-wide sm:text-7xl">{p.title}</h3>
        {p.status && <span className="mt-4 w-fit rounded bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-black">{p.status}</span>}
        <p className="mt-6 text-base leading-relaxed text-white/90 sm:text-lg">{p.pitch}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {p.stack.map((t) => (
            <span key={t} className="rounded bg-black/40 px-2 py-1 text-xs">
              {t}
            </span>
          ))}
        </div>
        {p.url && (
          <a href={p.url} target="_blank" rel="noreferrer" className="mt-8 w-fit rounded bg-white px-6 py-3 font-semibold text-black transition-colors hover:bg-white/80">
            {linkText(p)}
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}
