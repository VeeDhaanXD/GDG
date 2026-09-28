import { ArrowUpRight, CalendarDays } from "lucide-react";
import SplitHeading from "./ui/SplitHeading";
import SectionMeta from "./ui/SectionMeta";
import MagneticButton from "./ui/MagneticButton";
import { scrollToId, prefersReducedMotion } from "../lib/utils";
import { site } from "../data/site";
import { useGsap } from "../lib/useGsap";
import { gsap } from "../lib/gsap";
import { reveal, revealHeading } from "../animations/scrollAnimations";

const SPECKS = Array.from({ length: 26 }, (_, i) => ({
  id: i,
  left: `${(i * 37) % 100}%`,
  top: `${(i * 53) % 100}%`,
  size: 2 + ((i * 17) % 4),
  accent: ["#4285f4", "#ea4335", "#fbbc04", "#34a853"][i % 4],
}));

export default function CTA() {
  const ref = useGsap((self, scope) => {
    reveal(scope, "[data-reveal]", { y: 50, stagger: 0.08, start: "top 88%" });
    revealHeading(scope, { start: "top 88%" });

    if (prefersReducedMotion()) return undefined;

    const q = gsap.utils.selector(scope);
    const tweens = [];

    const blob = q("[data-cta-blob]");
    if (blob.length) {
      tweens.push(
        gsap.to(blob, { rotation: 360, duration: 70, ease: "none", repeat: -1 }),
        gsap.to(blob, { scale: 1.12, duration: 9, ease: "sine.inOut", yoyo: true, repeat: -1 }),
      );
    }

    const sweep = q("[data-cta-sweep]");
    if (sweep.length) {
      tweens.push(
        gsap.fromTo(
          sweep,
          { xPercent: -60, opacity: 0.55 },
          { xPercent: 160, opacity: 0.9, duration: 7, ease: "sine.inOut", repeat: -1, yoyo: true },
        ),
      );
    }

    q("[data-cta-speck]").forEach((el, i) => {
      tweens.push(
        gsap.to(el, {
          y: `-=${14 + (i % 5) * 6}`,
          autoAlpha: 0.25 + (i % 4) * 0.18,
          duration: 4 + (i % 5),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: (i % 6) * 0.4,
        }),
      );
    });

    tweens.push(
      gsap.to(q("[data-cta-bg]"), {
        yPercent: -12,
        ease: "none",
        scrollTrigger: { trigger: scope, start: "top bottom", end: "bottom top", scrub: 0.8 },
      }),
    );

    return () => tweens.forEach((t) => t.kill());
  }, []);

  return (
    <section
      id="join"
      ref={ref}
      aria-labelledby="join-title"
      className="section-pad relative isolate overflow-hidden border-t border-white/8"
    >
      <div
        aria-hidden="true"
        data-cta-bg
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(75%_60%_at_50%_50%,rgba(66,133,244,0.16),transparent_70%)]"
      />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          data-cta-blob
          className="absolute left-1/2 top-1/2 h-[74vmin] w-[74vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[110px]"
          style={{
            background:
              "conic-gradient(from 40deg, #4285f4, #ea4335, #fbbc04, #34a853, #4285f4)",
          }}
        />
        <div className="absolute inset-0 bg-void/65" />
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-void to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-void to-transparent" />
        <span
          data-cta-sweep
          className="absolute -top-10 left-0 h-[140%] w-[26vw] -rotate-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)] blur-2xl"
        />
        {SPECKS.map((s) => (
          <span
            key={s.id}
            data-cta-speck
            className="absolute rounded-full"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              background: s.accent,
              opacity: 0.35,
            }}
          />
        ))}
      </div>

      <div className="shell relative">
              <SectionMeta num="08" label="Join Us" align="center" className="justify-center" />

        <div className="mx-auto mt-10 max-w-4xl text-center">
          <SplitHeading
            as="h2"
            id="join-title"
            lines={["Your Developer Journey", "Starts Here."]}
            className="font-display text-[clamp(2.3rem,7vw,5.4rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-white"
          />

          <p data-reveal className="mx-auto mt-7 max-w-xl text-[16px] leading-relaxed text-mist">
            Learn new technologies. Build real projects. Meet like-minded developers. Grow
            together.
          </p>

          <div data-reveal className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              href={`mailto:${site.email}?subject=${encodeURIComponent("I want to join GDGOC WIT Solapur")}`}
              className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-semibold text-void transition-colors duration-300 hover:bg-gblue hover:text-white"
              ariaLabel="Join the community"
            >
              Join the Community
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </MagneticButton>

            <MagneticButton
              onClick={() => scrollToId("past-events")}
              strength={0.22}
              className="group inline-flex items-center gap-3 rounded-full border border-white/20 px-7 py-4 text-sm font-medium text-white/85 transition-colors duration-300 hover:border-white/50 hover:text-white"
              ariaLabel="Explore events"
            >
              Explore Events
              <CalendarDays className="h-4 w-4 text-gyellow" />
            </MagneticButton>
          </div>

          <p data-reveal className="mt-9 text-[12px] uppercase tracking-[0.26em] text-white/35">
            Free to join &nbsp;·&nbsp; Open to every branch &nbsp;·&nbsp; Students first
          </p>
        </div>
      </div>
    </section>
  );
}
