import SplitHeading from "./ui/SplitHeading";
import SectionMeta from "./ui/SectionMeta";
import Icon from "./ui/Icon";
import { upcomingEvents } from "../data/upcomingEvents";
import { ACCENT } from "./ui/Art";
import { useGsap } from "../lib/useGsap";
import { reveal, revealHeading, expandRule } from "../animations/scrollAnimations";
import { upcomingTimeline } from "../animations/eventAnimations";

const CORNERS = [
  "left-3 top-16 border-l border-t",
  "right-3 top-16 border-r border-t",
  "left-3 bottom-3 border-l border-b",
  "right-3 bottom-3 border-r border-b",
];

export default function UpcomingEvents() {
  const ref = useGsap((self, scope) => {
    reveal(scope, "[data-reveal]", { stagger: 0.1 });
    revealHeading(scope);
    expandRule(scope, "[data-section-rule]");
    upcomingTimeline(scope);
  }, []);

  return (
    <section
      id="upcoming"
      ref={ref}
      aria-labelledby="upcoming-title"
      className="section-pad relative overflow-hidden border-t border-white/8 bg-abyss"
    >
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 opacity-25 mask-fade-y"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/3 h-[540px] w-[540px] rounded-full opacity-40 blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(66,133,244,0.28), transparent 65%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-1/4 h-[420px] w-[420px] rounded-full opacity-30 blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(251,188,4,0.18), transparent 65%)" }}
      />

      <div className="shell relative">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionMeta num="07" label="What's Next" />
            <SplitHeading
              as="h2"
              id="upcoming-title"
              lines={["Seven AI sessions,", "one track."]}
              className="mt-8 font-display text-[clamp(2.1rem,5vw,4rem)] font-semibold leading-[1.03] tracking-[-0.04em] text-white"
            />
            <p data-reveal className="mt-6 font-mono text-[12.5px] text-white/45">
              <span className="text-gblue">$</span> gdgoc ai-series --queue 7 --status upcoming
              <span
                aria-hidden="true"
                className="ml-1.5 inline-block h-[13px] w-[7px] translate-y-[2px] animate-pulse bg-gblue/70 align-middle"
              />
            </p>
          </div>

          <p data-reveal className="max-w-sm text-[14.5px] leading-relaxed text-mist sm:text-right">
            A seven-session AI track for the campus. Every session ends with something you built.
            Dates land here first — follow the community channels so you do not miss the drop.
          </p>
        </div>

        <div
          data-reveal
          className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 font-mono text-[10.5px] uppercase tracking-[0.2em] text-white/45"
        >
          <span className="inline-flex items-center gap-2 text-ggreen">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ggreen" />
            system ready
          </span>
          <span>
            queued <span className="text-white/85">07</span>
          </span>
          <span>
            track <span className="text-white/85">gemini · agents · cloud</span>
          </span>
          <span className="sm:ml-auto">
            dates <span className="text-gyellow">tba</span>
          </span>
        </div>

        <div data-timeline className="relative mt-14">
          <div
            aria-hidden="true"
            className="absolute left-[6px] top-3 h-[calc(100%-1.5rem)] w-px bg-white/10"
          >
            <span
              data-timeline-line
              className="block h-full w-full origin-top bg-gradient-to-b from-gblue via-gyellow to-ggreen"
            />
          </div>

          <ol className="relative grid gap-6 lg:gap-7">
            {upcomingEvents.map((event) => {
              const accent = ACCENT[event.accent] || ACCENT.blue;
              return (
                <li key={event.id} data-timeline-item className="group relative pl-10 md:pl-16">
                  <span
                    data-timeline-dot
                    aria-hidden="true"
                    className="absolute left-0 top-[15px] h-3.5 w-3.5 rounded-[3px] border-2 border-void"
                    style={{ background: accent.hex, boxShadow: `0 0 14px ${accent.hex}90` }}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute left-[15px] top-[22px] h-px w-[25px] bg-white/15 md:w-[49px]"
                  />

                  <article
                    data-cursor="hover"
                    className="relative overflow-hidden rounded-[16px] border border-white/10 bg-panel transition-[translate,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-white/25"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-px"
                      style={{
                        background: `linear-gradient(90deg, ${accent.hex}, transparent 70%)`,
                      }}
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        boxShadow: `inset 0 0 0 1px ${accent.hex}3d, 0 26px 60px -36px ${accent.hex}`,
                      }}
                    />
                    {CORNERS.map((pos) => (
                      <span
                        key={pos}
                        aria-hidden="true"
                        className={`pointer-events-none absolute h-3 w-3 opacity-0 transition-opacity duration-500 group-hover:opacity-70 ${pos}`}
                        style={{ borderColor: accent.hex }}
                      />
                    ))}

                    <header className="flex items-center justify-between gap-4 border-b border-white/8 bg-white/[0.02] px-5 py-3.5">
                      <span className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.2em] text-white/55">
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: accent.hex, boxShadow: `0 0 10px ${accent.hex}` }}
                        />
                        SESSION_{event.id}
                      </span>
                      <span className="hidden font-mono text-[11px] tracking-[0.2em] text-white/35 sm:inline">
                        {event.code}
                      </span>
                      <span className="font-display text-[26px] font-bold leading-none text-white/12">
                        {event.id}
                      </span>
                    </header>

                    <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1.35fr_1fr] lg:gap-10">
                      <div className="min-w-0">
                        <div className="flex items-center gap-3">
                          <span
                            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10"
                            style={{
                              background: `${accent.hex}1a`,
                              color: accent.hex,
                            }}
                          >
                            <Icon name={event.icon} className="h-[18px] w-[18px]" />
                          </span>
                          <span
                            className="rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em]"
                            style={{ color: accent.hex, background: `${accent.hex}1f` }}
                          >
                            {event.type}
                          </span>
                        </div>

                        <h3 className="mt-4 font-display text-[20px] font-semibold leading-snug tracking-tight text-white sm:text-[23px]">
                          {event.title}
                        </h3>

                        <ul className="mt-4 space-y-2.5">
                          {event.topics.map((topic) => (
                            <li
                              key={topic}
                              className="flex gap-3 font-mono text-[12.5px] leading-relaxed text-mist"
                            >
                              <span
                                aria-hidden="true"
                                className="shrink-0 select-none"
                                style={{ color: accent.hex }}
                              >
                                ▸
                              </span>
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex min-w-0 flex-col gap-4">
                        <div
                          data-build
                          className="rounded-xl border-l-2 px-4 py-3.5"
                          style={{ borderColor: accent.hex, background: `${accent.hex}12` }}
                        >
                          <span
                            className="font-mono text-[10px] uppercase tracking-[0.22em]"
                            style={{ color: accent.hex }}
                          >
                            you will build
                          </span>
                          <p className="mt-2 text-[14px] leading-relaxed text-chalk">
                            {event.outcome}
                          </p>
                        </div>

                        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/8 pt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">
                          <span>{event.date}</span>
                          <span className="inline-flex items-center gap-2">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gyellow" />
                            {event.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
