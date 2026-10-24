import { person } from "../data/portfolio";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

const links = [
  ["LinkedIn", person.links.linkedin],
  ["GitHub", person.links.github],
  ["Instagram", person.links.instagram],
];

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-24 sm:px-8">
      <SectionTitle kicker="Next episode" title="Contact" />
      <Reveal>
        <p className="max-w-xl text-2xl font-semibold">Got something to build, test, deploy or fix? Let&apos;s talk. I also set up self-hosted Docker, Proxmox and Linux server stacks.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={`mailto:${person.email}`} className="rounded bg-accent px-6 py-3 font-semibold transition-colors hover:bg-accent/80">
            {person.email}
          </a>
        </div>
        <ul className="mt-6 flex flex-wrap gap-5 text-sm">
          {links.map(([label, href]) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noreferrer" className="text-muted underline-offset-4 transition-colors hover:text-white hover:underline">
                {label} ↗
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted">{person.location}</p>
      </Reveal>
    </section>
  );
}
