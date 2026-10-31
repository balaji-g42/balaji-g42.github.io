export default function Footer() {
  return (
    <footer className="border-t border-line px-4 py-10 text-center text-xs text-muted">
      <a href="#top" className="mb-6 inline-block rounded-full border border-line px-4 py-1.5 font-semibold uppercase tracking-[0.25em] transition-colors hover:border-white/40 hover:text-white">
        ↑ Back to the top
      </a>
      <a href="https://fazier.com" target="_blank" rel="noopener" className="mb-6 block">
        <img src="https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=launched&theme=dark" width={120} alt="Fazier badge" className="mx-auto" />
      </a>
      <p>© {new Date().getFullYear()} Balaji G. Site code is MIT licensed. Text, photos and other content: all rights reserved.</p>
      <p className="mt-2">Fan tribute: Iron Man, Tony Stark and Stark Industries are Marvel properties. Quotes are attributed; no affiliation or endorsement.</p>
      <p className="mt-2">A personal portfolio in the style of a streaming series. Not affiliated with, endorsed by or connected to Netflix.</p>
    </footer>
  );
}
