import { useEffect } from "react";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import Hero from "./components/Hero";
import About from "./components/About";
import WhatWeDo from "./components/WhatWeDo";
import Team from "./components/Team";
import PastEvents from "./components/PastEvents";
import UpcomingEvents from "./components/UpcomingEvents";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import { ScrollTrigger } from "./lib/gsap";

export default function App() {
  useEffect(() => {
    const refresh = () => {
      if (typeof window === "undefined") return;
      ScrollTrigger.refresh();
    };

    const timers = [
      window.setTimeout(refresh, 350),
      window.setTimeout(refresh, 1200),
    ];

    window.addEventListener("load", refresh);
    if (document.fonts?.ready) document.fonts.ready.then(refresh).catch(() => {});

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(refresh, 250);
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      window.clearTimeout(resizeTimer);
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <Navbar />

      <main>
        <Hero />
        <About />
        <WhatWeDo />
        <Team />
        <PastEvents />
        <UpcomingEvents />
        <CTA />
      </main>

      <Footer />

      <div
        aria-hidden="true"
        className="noise-overlay pointer-events-none fixed inset-0 z-[85] opacity-[0.035]"
      />
    </>
  );
}
