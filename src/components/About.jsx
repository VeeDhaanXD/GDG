import SplitHeading from "./ui/SplitHeading";
import SectionMeta from "./ui/SectionMeta";
import { pillars } from "../data/activities";
import { useGsap } from "../lib/useGsap";
import { reveal, revealHeading, expandRule, parallax, revealPillars } from "../animations/scrollAnimations";
import { gsap } from "../lib/gsap";
import { prefersReducedMotion } from "../lib/utils";

const ORBIT_NODES = [
  { label: "Workshops", accent: "#4285f4", top: "8%", left: "54%" },
  { label: "Talks", accent: "#ea4335", top: "34%", left: "88%" },
  { label: "Cloud", accent: "#fbbc04", top: "74%", left: "78%" },
  { label: "Hackathons", accent: "#34a853", top: "88%", left: "26%" },
  { label: "Meetups", accent: "#4285f4", top: "52%", left: "4%" },
];

const COPY = [
  "GDGOC — Google Developer Groups on Campus — is a student-led technology community that lives inside the campus, run by students, for students. It is a space where curiosity is treated as a valid reason to show up.",
  "The community exists to close the gap between what is taught in classrooms and what the developer ecosystem actually looks like — by giving students a regular place to learn in public, build things, and talk to people who are further along the road.",
  "Members explore modern web, cloud, mobile and AI tooling through workshops, talks and build sessions, then take part by attending, volunteering, presenting or simply bringing a project and a question.",
];

export default function About() {
  const ref = useGsap((self, scope) => {
    reveal(scope, "[data-reveal]", { stagger: 0.1, start: "top 86%" });
    revealHeading(scope, { start: "top 88%" });
    reveal(scope, "[data-about-visual]", { y: 70, scale: 0.94, duration: 1.2, start: "top 84%" });
    expandRule(scope, "[data-section-rule]");
    parallax(scope, "[data-about-float]", { distance: -70, trigger: scope });
    revealPillars(scope, "[data-pillar]");

    if (prefersReducedMotion()) return undefined;

    const q = gsap.utils.selector(scope);
    const rings = q("[data-about-ring]");
    const tweens = rings.map((ring, i) =>
      gsap.to(ring, {
        rotation: i % 2 === 0 ? 360 : -360,
        duration: 46 + i * 22,
        ease: "none",
        repeat: -1,
      }),
    );

    q("[data-about-node]").forEach((node, i) => {
      tweens.push(
        gsap.to(node, {
          y: i % 2 === 0 ? -12 : 12,
          duration: 3.4 + i * 0.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.3,
        }),
      );
    });

    return () => tweens.forEach((t) => t.kill());
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      aria-labelledby="about-title"
      className="section-pad relative overflow-hidden border-t border-white/8"
    >
      <div
        aria-hidden="true"
        data-about-float
        className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-gblue/10 blur-[90px]"
      />
      <div
        aria-hidden="true"
        data-about-float
        className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-ggreen/10 blur-[100px]"
      />

      <div className="shell relative">
        <SectionMeta num="01" label="Introduction" />

        <div className="mt-12 grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SplitHeading
              as="h2"
              id="about-title"
              lines={["More Than Just", "a Community."]}
              className="font-display text-[clamp(2.2rem,5.4vw,4.4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white"
            />

            <div
              data-reveal
              className="mt-8 h-px w-full bg-gradient-to-r from-white/30 via-white/10 to-transparent"
            />

            <div className="mt-8 space-y-6">
              {COPY.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  data-reveal
                  className="max-w-xl text-[15.5px] leading-relaxed text-mist"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div data-reveal className="mt-9 flex flex-wrap gap-3">
              {["Student-led", "Open to every branch", "Hands-on, always"].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-[12px] font-medium text-white/70"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* animated community visual */}
          <div className="lg:col-span-6">
            <div
              data-about-visual
              className="card-surface relative overflow-hidden rounded-[28px] p-6 sm:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="eyebrow">The ecosystem</span>
                <span className="flex items-center gap-2 text-[11px] text-white/40">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ggreen" />
                  active
                </span>
              </div>

              <div className="relative mx-auto mt-6 aspect-square w-full max-w-[440px]">
                <div className="bg-dots absolute inset-0 opacity-40" />

                <div
                  data-about-ring
                  className="absolute inset-[2%] rounded-full border border-white/10"
                />
                <div
                  data-about-ring
                  className="absolute inset-[16%] rounded-full border border-dashed border-white/12"
                />
                <div
                  data-about-ring
                  className="absolute inset-[31%] rounded-full border border-white/8"
                />

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="mx-auto grid h-24 w-24 place-items-center rounded-full border border-white/15 bg-void/80 shadow-[0_0_60px_rgba(66,133,244,0.35)]">
                    <span className="font-display text-sm font-semibold tracking-tight text-white">
                      GDGOC
                    </span>
                  </div>
                  <p className="mt-3 text-[10px] uppercase tracking-[0.24em] text-white/35">
                    WIT Solapur
                  </p>
                </div>

                {ORBIT_NODES.map((node) => (
                  <span
                    key={node.label}
                    data-about-node
                    className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/12 bg-void/85 px-3 py-1.5 text-[11px] font-medium text-white/75 backdrop-blur-md"
                    style={{ top: node.top, left: node.left }}
                  >
                    <span
                      className="mr-2 inline-block h-1.5 w-1.5 rounded-full align-middle"
                      style={{ background: node.accent }}
                    />
                    {node.label}
                  </span>
                ))}
              </div>

              <div className="mt-7 grid grid-cols-3 gap-3 border-t border-white/8 pt-6">
                {[
                  { k: "Format", v: "Workshops & talks" },
                  { k: "Audience", v: "All students" },
                  { k: "Entry", v: "Free to join" },
                ].map((item) => (
                  <div key={item.k}>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                      {item.k}
                    </p>
                    <p className="mt-1.5 text-[12.5px] font-medium text-white/80">{item.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* pillars */}
        <div
          data-pillars
          className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/8 pt-12 lg:grid-cols-4"
        >
          {pillars.map((pillar) => (
            <div key={pillar.word} data-pillar className="relative">
              <p data-pillar-index className="eyebrow !text-white/35">
                {pillar.index}
              </p>
              <p
                data-pillar-word
                className="mt-3 font-display text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-none tracking-[-0.03em] text-white"
              >
                {pillar.word}
              </p>
              <span
                data-pillar-rule
                className="mt-4 block h-px w-full bg-white/20"
                aria-hidden="true"
              />
              <p data-pillar-note className="mt-3 text-[13px] leading-relaxed text-mist-dim">
                {pillar.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
