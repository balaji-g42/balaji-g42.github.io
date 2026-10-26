import { useEffect, useState } from "react";
import { person, profiles, type ProfileId } from "../data/portfolio";
import Avatar from "./Avatar";

const labels: Record<string, string> = {
  top: "Home",
  about: "About",
  journey: "Journey",
  projects: "Originals",
  skills: "Skills",
  achievements: "Achievements",
  resume: "Resume",
  contact: "Contact",
};

const owner: Record<string, string> = { "top-picks": "projects" };

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const ids = Object.keys(profiles) as ProfileId[];

export default function Nav({ profile, onSelect, onSwitch }: { profile: ProfileId; onSelect: (p: ProfileId) => void; onSwitch: () => void }) {
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("top");
  const links = ["top", "about", ...profiles[profile].order.filter((id) => id in labels), "contact"];

  useEffect(() => {
    const on = () => {
      setSolid(window.scrollY > 40);
      const line = window.innerHeight * 0.35;
      let current = "top";
      for (const id of links) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      const tp = document.getElementById("top-picks");
      if (tp && owner["top-picks"] && tp.getBoundingClientRect().top <= line && tp.getBoundingClientRect().bottom > line) current = owner["top-picks"];
      setActive(current);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, [profile]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setActive(id);
    const el = document.getElementById(id);
    if (id === "top" || !el) window.scrollTo({ top: 0, behavior: reduced() ? "auto" : "smooth" });
    else el.scrollIntoView({ behavior: reduced() ? "auto" : "smooth" });
  };

  const item = (id: string) =>
    `nav-link relative whitespace-nowrap transition-colors ${active === id ? "nav-active text-[#e0b04a]" : "text-muted hover:text-white"}`;

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-colors ${solid ? "bg-ink/90 backdrop-blur" : "bg-gradient-to-b from-black/70 to-transparent"}`}>
      <nav className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3 sm:px-8" aria-label="Main">
        <a href="#top" onClick={go("top")} className="font-display text-3xl tracking-widest text-accent">
          {person.series}
        </a>
        <ul className="hidden gap-5 text-sm lg:flex">
          {links.map((id) => (
            <li key={id}>
              <a href={`#${id}`} onClick={go(id)} aria-current={active === id ? "true" : undefined} className={item(id)}>
                {labels[id]}
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
            <ul role="menu" className="absolute right-0 top-full z-50 w-52 rounded-md border border-line bg-black py-2 shadow-xl">
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
      <div className="mx-auto max-w-7xl px-4 lg:hidden">
        <ul className="rail flex gap-5 pb-2 text-sm" aria-label="Sections">
          {links.map((id) => (
            <li key={id} className="shrink-0">
              <a href={`#${id}`} onClick={go(id)} aria-current={active === id ? "true" : undefined} className={item(id)}>
                {labels[id]}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
