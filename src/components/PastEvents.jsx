import SplitHeading from "./ui/SplitHeading";
import SectionMeta from "./ui/SectionMeta";
import { EventPoster, ACCENT } from "./ui/Art";
import { pastEvents } from "../data/events";
import { useGsap } from "../lib/useGsap";
import { pastEventsHorizontal } from "../animations/eventAnimations";

export default function PastEvents() {
  const ref = useGsap((self, scope) => {
    pastEventsHorizontal(scope);
  }, []);

  return (
    <section
      id="past-events"
      ref={ref}
      aria-labelledby="past-title"
      className="relative overflow-hidden border-t border-white/8 bg-abyss lg:flex lg:h-[100svh] lg:flex-col"
    >
      <div className="shell shrink-0 pt-20 lg:pt-[84px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionMeta num="04" label="Past Events" />
            <SplitHeading
              as="h2"
              id="past-title"
              lines={["Built Together."]}
              className="mt-6 font-display text-[clamp(2.1rem,4.6vw,3.4rem)] font-semibold leading-[1.03] tracking-[-0.04em] text-white"
            />
          </div>

          <p className="max-w-xs text-[14px] leading-relaxed text-mist sm:text-right">
            A running record of the sessions, sprints and meetups the community has put together.
          </p>
        </div>

        <div aria-hidden="true" className="mt-6 hidden lg:block">
          <div className="h-px w-full bg-white/10">
            <div data-events-progress className="h-px w-full origin-left scale-x-0 bg-gblue" />
          </div>
          <p className="mt-3 text-[10px] uppercase tracking-[0.28em] text-white/35">
            Scroll to move through the gallery
          </p>
        </div>
      </div>

      <div className="mt-8 overflow-hidden pb-20 lg:mt-0 lg:flex lg:flex-1 lg:items-center lg:pb-8">
        <div
          data-events-track
          className="flex flex-col gap-5 px-[clamp(1.25rem,5vw,5rem)] lg:w-max lg:flex-row lg:gap-6"
        >
          {pastEvents.map((event) => {
            const accent = ACCENT[event.accent] || ACCENT.blue;
            return (
              <article
                key={event.id}
                data-event-card
                data-cursor="hover"
                className="group/event card-surface w-full shrink-0 overflow-hidden rounded-[24px] transition-[border-color] duration-500 hover:border-white/25 lg:w-[378px]"
                aria-label={event.title}
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <EventPoster event={event} />
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]"
                      style={{ color: accent.hex, background: `${accent.hex}1f` }}
                    >
                      {event.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-white/40">
                      <span className="h-1 w-1 rounded-full bg-white/40" />
                      {event.date}
                    </span>
                  </div>

                  <h3 className="mt-3.5 font-display text-[19px] font-semibold leading-snug tracking-tight text-white sm:text-[21px]">
                    {event.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-[13.5px] leading-relaxed text-mist">
                    {event.description}
                  </p>

                  <span className="mt-4 block h-px w-full bg-white/10" aria-hidden="true" />
                  <p className="mt-3 font-display text-[11px] tracking-[0.2em] text-white/30">
                    {event.id} — {event.category.toUpperCase()}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
