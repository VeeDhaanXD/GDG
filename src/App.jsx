import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import Hero from "./components/Hero";
import About from "./components/About";
import EventSection from "./components/EventSection";
import { eventSections } from "./data/eventSections";
import Team from "./components/Team";
import Gallery from "./components/Gallery";
import UpcomingEvents from "./components/UpcomingEvents";
import Snapshots from "./components/Snapshots";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import IntroPage from "./pages/IntroPage";
import { ScrollTrigger } from "./lib/gsap";

const normalizePath = (pathname = "/") => {
  const clean = pathname.split("?")[0].split("#")[0].replace(/\/+$/, "");
  return clean === "" ? "/" : clean;
};

const ROUTES = {
  "/api/intro": IntroPage,
  "/intro": IntroPage,
};

export default function App() {
  const [path, setPath] = useState(() =>
    typeof window === "undefined" ? "/" : normalizePath(window.location.pathname),
  );

  useEffect(() => {
    const onPop = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

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

  const RoutedPage = ROUTES[path];

  return (
    <>
      <CustomCursor />

      {RoutedPage ? (
        <RoutedPage />
      ) : (
        <>
          <Navbar />

          <main>
            <Hero />
            <About />
            {eventSections.map((event, i) => (
              <EventSection key={event.id} event={event} index={i} />
            ))}
            <Team />
            <Gallery />
            <UpcomingEvents />
            <Snapshots />
            <CTA />
          </main>

          <Footer />
        </>
      )}

      <div
        aria-hidden="true"
        className="noise-overlay pointer-events-none fixed inset-0 z-[85] opacity-[0.035]"
      />
    </>
  );
}
