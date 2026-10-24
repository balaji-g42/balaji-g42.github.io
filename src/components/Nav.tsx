import { useEffect, useState } from "react";
import { person, profiles, type ProfileId } from "../data/portfolio";
import Avatar from "./Avatar";

const links = [
  ["about", "About"],
  ["journey", "Journey"],
  ["projects", "Originals"],
  ["skills", "Skills"],
  ["contact", "Contact"],
];

const ids = Object.keys(profiles) as ProfileId[];

export default function Nav({ profile, onSelect, onSwitch }: { profile: ProfileId; onSelect: (p: ProfileId) => void; onSwitch: () => void }) {
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);
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
        <div
          className="relative ml-auto"
          onMouseLeave={() => setMenu(false)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setMenu(false);
          }}
        >
          <button
            onClick={() => setMenu(true)}
            onMouseEnter={() => setMenu(true)}
            aria-haspopup="menu"
            aria-expanded={menu}
            aria-label={`Profile: ${profiles[profile].label}`}
            className="flex items-center gap-2"
          >
            <span className="hidden text-sm text-white sm:inline">{profiles[profile].label}</span>
            <Avatar id={profile} className="h-8 w-8" />
            <span className={`text-xs text-white transition-transform ${menu ? "rotate-180" : ""}`}>▾</span>
          </button>
          {menu && (
            <ul role="menu" className="absolute right-0 top-full w-52 rounded-md border border-line bg-black/95 py-2 shadow-xl">
              {ids.filter((id) => id !== profile).map((id) => (
                <li key={id} role="none">
                  <button role="menuitem" onClick={() => { setMenu(false); onSelect(id); }} className="flex w-full items-center gap-3 px-3 py-2 text-sm text-muted hover:text-white">
                    <Avatar id={id} className="h-8 w-8" />
                    {profiles[id].label}
                  </button>
                </li>
              ))}
              <li role="none" className="mt-1 border-t border-line pt-1">
                <button role="menuitem" onClick={onSwitch} className="w-full px-3 py-2 text-left text-sm text-muted hover:text-white">
                  Switch profiles
                </button>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}
