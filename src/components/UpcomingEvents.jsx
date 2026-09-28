import SplitHeading from "./ui/SplitHeading";
import SectionMeta from "./ui/SectionMeta";
import Icon from "./ui/Icon";
import { upcomingEvents } from "../data/upcomingEvents";
import { ACCENT } from "./ui/Art";
import { useGsap } from "../lib/useGsap";
import { reveal, revealHeading, expandRule } from "../animations/scrollAnimations";
import { upcomingTimeline } from "../animations/eventAnimations";

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
      className="section-pad relative overflow-hidden border-t border-white/8"
    >
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 opacity-25 mask-fade-y"
      />

      <div className="shell relative">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionMeta num="05" label="What's Next" />
            <SplitHeading
              as="h2"
              id="upcoming-title"
              lines={["What's Coming", "Next?"]}
              className="mt-8 font-display text-[clamp(2.1rem,5vw,4rem)] font-semibold leading-[1.03] tracking-[-0.04em] text-white"
            />
          </div>

          <p data-reveal className="max-w-sm text-[14.5px] leading-relaxed text-mist sm:text-right">
            Dates land here first. Follow the community channels so you do not miss the announcement.
          </p>
        </div>

        <div data-timeline className="relative mt-16">
          <div
            aria-hidden="true"
            className="absolute left-4 top-0 h-full w-px -translate-x-1/2 bg-white/10 md:left-1/2"
          >
            <span
              data-timeline-line
              className="block h-full w-full origin-top bg-gradient-to-b from-gblue via-gyellow to-ggreen"
            />
          </div>

          <ol className="relative grid gap-9 md:grid-cols-2 md:gap-x-14 md:gap-y-12">
            {upcomingEvents.map((event, i) => {
              const accent = ACCENT[event.accent] || ACCENT.blue;
              const even = i % 2 === 0;
              return (
                <li
                  key={event.id}
                  data-timeline-item
                  className={`relative pl-9 md:pl-0 ${even ? "md:col-start-1" : "md:col-start-2"}`}
                >
                  <span
                    data-timeline-dot
                    aria-hidden="true"
                    className={`absolute top-7 h-3 w-3 rounded-full border-2 border-void ${
                      even
                        ? "left-[10px] md:left-auto md:right-[-34px]"
                        : "left-[10px] md:left-[-34px]"
                    }`}
                    style={{ background: accent.hex, boxShadow: `0 0 16px ${accent.hex}80` }}
                  />

                  <div className="card-surface group relative overflow-hidden rounded-[22px] p-6 transition-[transform,border-color] duration-500 hover:-translate-y-1.5 hover:border-white/25 sm:p-7">
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-px opacity-70"
                      style={{ background: `linear-gradient(90deg, ${accent.hex}, transparent)` }}
                    />

                    <div className="flex items-start justify-between gap-4">
                      <span
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10"
                        style={{ background: `${accent.hex}1a`, color: accent.hex }}
                      >
                        <Icon name={event.icon} className="h-5 w-5" />
                      </span>
                      <span className="font-display text-[42px] font-bold leading-none text-white/8">
                        {event.id}
                      </span>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-2">
                      <span
                        className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]"
                        style={{ color: accent.hex, background: `${accent.hex}1f` }}
                      >
                        {event.type}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/12 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/50">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gyellow" />
                        {event.status}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-[21px] font-semibold leading-snug tracking-tight text-white sm:text-[23px]">
                      {event.title}
                    </h3>

                    <p className="mt-2.5 text-[14px] leading-relaxed text-mist">
                      {event.description}
                    </p>

                    <p className="mt-5 flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-white/35">
                      <span className="h-px w-6 bg-white/25" />
                      {event.date}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
