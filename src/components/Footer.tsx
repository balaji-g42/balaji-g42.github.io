export default function Footer() {
  return (
    <footer className="border-t border-line px-4 py-10 text-center text-xs text-muted">
      <p>© {new Date().getFullYear()} Balaji G. Site code is MIT licensed. Text, photos and other content: all rights reserved.</p>
      <p className="mt-2">Fan tribute: Iron Man, Tony Stark and Stark Industries are Marvel properties. Quotes are attributed; no affiliation or endorsement.</p>
      <p className="mt-2">A personal portfolio in the style of a streaming series. Not affiliated with, endorsed by or connected to Netflix.</p>
    </footer>
  );
}
