import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import SplitHeading from "./ui/SplitHeading";
import SectionMeta from "./ui/SectionMeta";
import Icon from "./ui/Icon";
import { activities } from "../data/activities";
import { useGsap } from "../lib/useGsap";
import { reveal, revealHeading, expandRule } from "../animations/scrollAnimations";

const ACCENT_BAR = {
  blue: "bg-gblue",
  red: "bg-gred",
  yellow: "bg-gyellow",
  green: "bg-ggreen",
};

const ACCENT_TEXT = {
  blue: "text-gblue",
  red: "text-gred",
  yellow: "text-gyellow",
  green: "text-ggreen",
};

const ACCENT_GLOW = {
  blue: "rgba(66,133,244,0.16)",
  red: "rgba(234,67,53,0.16)",
  yellow: "rgba(251,188,4,0.14)",
  green: "rgba(52,168,83,0.16)",
};

export default function WhatWeDo() {
  const [hovered, setHovered] = useState(null);

  const ref = useGsap((self, scope) => {
    reveal(scope, "[data-reveal]", { stagger: 0.1 });
    revealHeading(scope);
    reveal(scope, "[data-activity-card]", { y: 66, stagger: 0.08, start: "top 88%" });
    expandRule(scope, "[data-section-rule]");
  }, []);

  return (
    <section
      id="what-we-do"
      ref={ref}
      aria-labelledby="what-title"
      className="section-pad relative overflow-hidden border-t border-white/8 bg-abyss"
    >
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-30 mask-fade-y" />

      <div className="shell relative">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionMeta num="02" label="What We Do" />
            <SplitHeading
              as="h2"
              id="what-title"
              lines={["Six ways we", "show up."]}
              className="mt-8 font-display text-[clamp(2.1rem,5vw,4rem)] font-semibold leading-[1.03] tracking-[-0.04em] text-white"
            />
          </div>

          <p data-reveal className="max-w-sm text-[14.5px] leading-relaxed text-mist sm:text-right">
            A repeating rhythm of sessions, sprints and hangouts — each one designed to leave you
            with something you did not know an hour earlier.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((item, i) => {
            const dimmed = hovered !== null && hovered !== i;
            return (
              <article
                key={item.index}
                data-activity-card
                data-cursor="hover"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                tabIndex={0}
                aria-label={item.title}
                className="relative rounded-[22px] outline-none"
              >
                <div
                  className="relative flex min-h-[268px] flex-col overflow-hidden rounded-[22px] p-6 transition-[opacity,transform] duration-500 ease-out sm:p-7"
                  style={{
                    transform: hovered === i ? "translateY(-8px)" : "translateY(0)",
                    opacity: dimmed ? 0.38 : 1,
                  }}
                >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-[22px] transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(120% 90% at 10% 0%, ${ACCENT_GLOW[item.accent]}, transparent 62%)`,
                    opacity: hovered === i ? 1 : 0,
                  }}
                />
                <span
                  aria-hidden="true"
                  className={`absolute inset-0 rounded-[22px] border transition-colors duration-500 ${
                    hovered === i ? "border-white/25" : "border-white/10"
                  }`}
                />
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-8 h-9 w-[3px] rounded-r-full transition-all duration-500 ${
                    hovered === i ? ACCENT_BAR[item.accent] : "bg-white/15"
                  }`}
                />

                <div className="relative flex items-start justify-between">
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/[0.03] transition-all duration-500 ${
                      hovered === i ? "bg-white/[0.07]" : ""
                    }`}
                  >
                    <Icon
                      name={item.icon}
                      className={`h-5 w-5 transition-transform duration-500 ${
                        ACCENT_TEXT[item.accent]
                      } ${hovered === i ? "-translate-y-0.5 scale-110" : ""}`}
                    />
                  </span>
                  <span className="font-display text-[13px] font-medium tracking-[0.14em] text-white/25">
                    {item.index}
                  </span>
                </div>

                <div className="relative mt-auto pt-8">
                  <h3 className="font-display text-[19px] font-semibold leading-snug tracking-tight text-white sm:text-[21px]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-mist">{item.description}</p>

                  <span
                    className={`arrow-slide mt-5 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.16em] transition-opacity duration-500 ${
                      ACCENT_TEXT[item.accent]
                    } ${hovered === i ? "opacity-100" : "opacity-0"}`}
                  >
                    Explore <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
