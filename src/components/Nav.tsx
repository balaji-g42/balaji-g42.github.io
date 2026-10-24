import { useEffect, useState } from "react";
import { person, profiles, type ProfileId } from "../data/portfolio";

const links = [
  ["about", "About"],
  ["journey", "Journey"],
  ["projects", "Originals"],
  ["skills", "Skills"],
  ["contact", "Contact"],
];

export default function Nav({ profile, onSwitch }: { profile: ProfileId; onSwitch: () => void }) {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-colors ${solid ? "bg-ink/90 backdrop-blur" : "bg-gradient-to-b from-black/70 to-transparent"}`}>
      <nav className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3 sm:px-8" aria-label="Main">
        <a href="#top" className="font-display text-3xl tracking-widest text-accent">
          {person.series}
        </a>
        <ul className="hidden gap-5 text-sm md:flex">
          {links.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className="text-muted transition-colors hover:text-white">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <button onClick={onSwitch} className="ml-auto rounded border border-line px-3 py-1 text-xs text-muted transition-colors hover:border-white hover:text-white">
          {profiles[profile].label} · switch
        </button>
      </nav>
    </header>
  );
}
