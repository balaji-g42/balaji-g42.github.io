import { useCallback, useEffect, useState, type ReactElement } from "react";
import Intro from "./components/Intro";
import Lenis from "lenis";
import { profiles, type ProfileId } from "./data/portfolio";
import ProfilePicker from "./components/ProfilePicker";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Journey from "./components/Journey";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import OffDuty from "./components/OffDuty";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const STORAGE_KEY = "series-profile";

function wantsIntro(): boolean {
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function readProfile(): ProfileId | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v && v in profiles ? (v as ProfileId) : null;
  } catch {
    return null;
  }
}

export default function App() {
  const [profile, setProfile] = useState<ProfileId | null>(readProfile);

  useEffect(() => {
    if (!profile) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis();
    let raf = requestAnimationFrame(function tick(t) {
      lenis.raf(t);
      raf = requestAnimationFrame(tick);
    });
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [profile]);

  const [intro, setIntro] = useState(wantsIntro);
  const endIntro = useCallback(() => setIntro(false), []);

  const choose = (p: ProfileId) => {
    try {
      localStorage.setItem(STORAGE_KEY, p);
    } catch {
      return;
    } finally {
      window.scrollTo(0, 0);
      setProfile(p);
    }
  };

  if (!profile) return <ProfilePicker onPick={choose} />;

  const sections: Record<string, ReactElement> = {
    journey: <Journey key="journey" />,
    projects: <Projects key="projects" profile={profile} />,
    skills: <Skills key="skills" />,
  };

  return (
    <>
      {intro && <Intro onDone={endIntro} />}
      <Nav profile={profile} onSelect={choose} onSwitch={() => setProfile(null)} />
      <main>
        <Hero profile={profile} />
        <About />
        {profiles[profile].order.map((id) => sections[id])}
        <OffDuty />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
