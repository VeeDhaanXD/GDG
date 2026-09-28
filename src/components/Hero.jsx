import { useMemo } from "react";
import { ArrowDown, Terminal, Cloud, Sparkles } from "lucide-react";
import SplitHeading from "./ui/SplitHeading";
import MagneticButton from "./ui/MagneticButton";
import { site } from "../data/site";
import { scrollToId } from "../lib/utils";
import { useGsap } from "../lib/useGsap";
import { heroIntro, heroFloats, heroParallax } from "../animations/heroAnimations";

const PARTICLE_SEED = Array.from({ length: 34 }, (_, i) => {
  const a = (i * 47) % 100;
  const b = (i * 71) % 100;
  const c = (i * 29) % 100;
  return {
    id: i,
    left: `${a}%`,
    top: `${b}%`,
    size: 2 + (c % 4),
    accent: ["#4285f4", "#ea4335", "#fbbc04", "#34a853"][i % 4],
    opacity: 0.2 + (c % 5) * 0.08,
  };
});

export default function Hero() {
  const particles = useMemo(() => PARTICLE_SEED, []);

  const ref = useGsap((self, scope) => {
    const cleanupIntro = heroIntro(scope);
    const cleanupFloats = heroFloats(scope);
    const cleanupParallax = heroParallax(scope);

    return () => {
      cleanupIntro?.();
      cleanupFloats?.();
      cleanupParallax?.();
    };
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden"
    >
      {/* ---------- background layers ---------- */}
      <div
        aria-hidden="true"
        data-scroll-speed="0.5"
        className="bg-grid mask-fade-b pointer-events-none absolute inset-0 opacity-[0.5]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(66,133,244,0.14),transparent_70%)]"
      />

      {/* gradient orb */}
      <div
        aria-hidden="true"
        data-hero-orb
        data-parallax="0.55"
        data-scroll-speed="1.3"
        className="pointer-events-none absolute right-[-18vw] top-[6vh] h-[78vmin] w-[78vmin] sm:right-[-8vw] lg:right-[2vw]"
      >
        <div
          className="absolute inset-0 rounded-full opacity-[0.38] blur-[88px]"
          style={{
            background:
              "conic-gradient(from 210deg, #4285f4, #34a853, #fbbc04, #ea4335, #8ab4f8, #4285f4)",
          }}
        />
        <div className="absolute inset-[18%] rounded-full bg-void/70 blur-[50px]" />
        <div className="absolute inset-[6%] rounded-full border border-white/10" />
      </div>

      {/* floating particles */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {particles.map((p) => (
          <span
            key={p.id}
            data-hero-particle
            data-parallax={0.3 + (p.id % 4) * 0.18}
            className="absolute rounded-full"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background: p.accent,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>

      {/* abstract tech shapes */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
        <span
          data-parallax="1.1"
          data-scroll-speed="1.7"
          className="absolute left-[6%] top-[22%] h-16 w-16 rotate-12 rounded-[14px] border border-white/10"
        />
        <span
          data-parallax="0.8"
          data-scroll-speed="1.1"
          className="absolute bottom-[18%] left-[46%] h-24 w-24 rounded-full border border-dashed border-white/12"
        />
        <span
          data-parallax="1.3"
          data-scroll-speed="1.9"
          className="absolute right-[34%] top-[16%] h-3 w-3 rotate-45 bg-gyellow/70"
        />
        <span
          data-parallax="1"
          data-scroll-speed="1.5"
          className="absolute left-[18%] bottom-[26%] h-2.5 w-2.5 rounded-full bg-ggreen/70"
        />
      </div>

      {/* ---------- content ---------- */}
      <div className="shell relative z-10 flex flex-1 flex-col justify-center pb-24 pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <p data-hero-eyebrow className="eyebrow mb-7 overflow-hidden">
              <span className="block text-white/55">
                <span className="text-gblue">◆</span>&nbsp;&nbsp;Student-led developer community
              </span>
            </p>

            <SplitHeading
              as="h1"
              id="hero-title"
              lines={["Google Developer", "Groups on Campus"]}
              className="font-display text-[clamp(2.4rem,5.4vw,5.25rem)] font-semibold leading-[0.96] tracking-[-0.045em] text-white"
            />

            <div className="mt-3 overflow-hidden pb-[0.16em]">
              <span
                data-hero-campus
                className="gradient-text block font-display text-[clamp(2.4rem,5.4vw,5.25rem)] font-semibold leading-[0.96] tracking-[-0.045em]"
              >
                WIT Solapur
              </span>
            </div>

            <div className="mt-7 mb-7 flex gap-2" data-hero-rule aria-hidden="true">
              <span className="h-[3px] w-16 rounded-full bg-gblue sm:w-24" />
              <span className="h-[3px] w-8 rounded-full bg-gred sm:w-12" />
              <span className="h-[3px] w-8 rounded-full bg-gyellow sm:w-12" />
              <span className="h-[3px] w-8 rounded-full bg-ggreen sm:w-12" />
            </div>

            <p
              data-hero-tag
              className="flex flex-wrap items-center gap-x-4 gap-y-2 font-display text-lg font-medium tracking-tight sm:text-xl"
            >
              <span className="text-gblue">Learn.</span>
              <span className="h-1.5 w-1.5 rounded-full bg-gred" />
              <span className="text-gyellow">Build.</span>
              <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
              <span className="text-ggreen">Connect.</span>
            </p>

            <p
              data-hero-copy
              className="mt-6 max-w-xl text-[15px] leading-relaxed text-mist sm:text-base"
            >
              {site.description}
            </p>

            <div data-hero-cta className="mt-9 flex flex-wrap items-center gap-4">
              <MagneticButton
                onClick={() => scrollToId("about")}
                className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-void transition-colors duration-300 hover:bg-gblue hover:text-white"
                ariaLabel="Explore GDGOC"
              >
                Explore GDGOC
                <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
              </MagneticButton>

              <a
                href="#upcoming"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("upcoming");
                }}
                className="arrow-slide inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-4 text-sm font-medium text-white/80 transition-colors duration-300 hover:border-white/35 hover:text-white"
              >
                See what&apos;s next
              </a>
            </div>
          </div>

          {/* floating UI widgets */}
          <div className="relative lg:col-span-4 lg:h-[420px]">
            <div
              data-hero-float
              data-parallax="1.4"
              className="glass relative z-20 mx-auto w-full max-w-[420px] rounded-2xl p-5 lg:absolute lg:right-0 lg:top-0"
            >
              <div className="mb-4 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-gred/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-gyellow/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-ggreen/80" />
                <span className="ml-2 text-[10px] uppercase tracking-[0.2em] text-white/40">
                  community.jsx
                </span>
              </div>
              <pre className="overflow-hidden text-[12.5px] leading-[1.75] text-white/75">
                <code>
                  <span className="text-gred">const</span>{" "}
                  <span className="text-gblue">gdgoc</span>{" "}
                  <span className="text-white/50">=</span> {"{"}
                  {"\n  "}
                  <span className="text-gyellow">campus</span>
                  <span className="text-white/50">:</span>{" "}
                  <span className="text-ggreen">&quot;WIT Solapur&quot;</span>
                  <span className="text-white/50">,</span>
                  {"\n  "}
                  <span className="text-gyellow">focus</span>
                  <span className="text-white/50">:</span> [
                  <span className="text-ggreen">&quot;learn&quot;</span>
                  <span className="text-white/50">,</span>{" "}
                  <span className="text-ggreen">&quot;build&quot;</span>]
                  <span className="text-white/50">,</span>
                  {"\n  "}
                  <span className="text-gyellow">open</span>
                  <span className="text-white/50">:</span>{" "}
                  <span className="text-gblue">true</span>
                  {"\n"}
                  {"}"};
                </code>
              </pre>
            </div>

            <div
              data-hero-float
              data-parallax="1.1"
              className="glass mx-auto mt-5 w-full max-w-[330px] rounded-2xl p-4 lg:absolute lg:left-0 lg:top-[236px] lg:mt-0"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/8 text-ggreen">
                  <Terminal className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="truncate font-mono text-[12px] text-white/80">
                    npm run community
                  </p>
                  <p className="text-[11px] text-white/40">
                    ready in <span className="text-ggreen">0ms</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:absolute lg:right-0 lg:top-[340px] lg:mt-0">
              <span
                data-hero-float
                data-parallax="0.9"
                className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11.5px] font-medium text-white/75"
              >
                <Cloud className="h-3.5 w-3.5 text-gblue" /> Google Cloud
              </span>
              <span
                data-hero-float
                data-parallax="1.2"
                className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11.5px] font-medium text-white/75"
              >
                <Sparkles className="h-3.5 w-3.5 text-gyellow" /> New technologies
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* scroll indicator */}
      <div
        data-hero-scroll
        className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center"
        aria-hidden="true"
      >
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/40">
          <span>Scroll</span>
          <span className="relative h-8 w-px overflow-hidden bg-white/15">
            <span className="absolute inset-x-0 top-0 h-3 animate-bounce bg-gblue" />
          </span>
        </div>
      </div>
    </section>
  );
}
