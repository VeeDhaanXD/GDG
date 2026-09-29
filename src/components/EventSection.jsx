import { useState } from "react";
import { Play } from "lucide-react";
import SplitHeading from "./ui/SplitHeading";
import SectionMeta from "./ui/SectionMeta";
import { GalleryPlate, ACCENT } from "./ui/Art";
import { useGsap } from "../lib/useGsap";
import { reveal, revealHeading, expandRule } from "../animations/scrollAnimations";
import { eventTrackDrift } from "../animations/eventSectionAnimations";

const TILE =
  "relative aspect-[16/10] w-[74vw] shrink-0 overflow-hidden rounded-[22px] border border-white/10 bg-panel-2 sm:w-[50vw] lg:w-[36vw]";

function MediaTile({ item, event, index }) {
  const [failed, setFailed] = useState(false);
  const accent = ACCENT[event.accent] || ACCENT.blue;
  const broken = failed || !item;

  return (
    <figure
      data-event-tile
      className={`${TILE} ${event.highlight ? "border-white/25 shadow-[0_0_0_1px_rgba(234,67,53,0.35)]" : ""}`}
    >
      {broken ? (
        <GalleryPlate
          item={{
            image: null,
            title: `${event.title} ${index + 1}`,
            accent: event.accent,
            icon: event.icon,
          }}
        />
      ) : item.type === "video" ? (
        <video
          src={item.src}
          muted
          loop
          controls
          playsInline
          preload="metadata"
          onError={() => setFailed(true)}
          className="h-full w-full bg-black object-contain"
        />
      ) : (
        <img
          src={item.src}
          alt={`${event.title} — photo ${index + 1}`}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-700 ease-out"
        />
      )}

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent"
      />

      <figcaption className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2">
        <span
          className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]"
          style={{ color: accent.hex, background: "rgba(5,6,10,0.72)" }}
        >
          {item?.type === "video" ? (
            <span className="flex items-center gap-1.5">
              <Play className="h-3 w-3 fill-current" />
              Clip {index + 1}
            </span>
          ) : (
            `Photo ${index + 1}`
          )}
        </span>
      </figcaption>
    </figure>
  );
}

function CaptionTile({ event }) {
  const accent = ACCENT[event.accent] || ACCENT.blue;
  const shots = event.media.filter((m) => m.type === "image").length;
  const clips = event.media.filter((m) => m.type === "video").length;

  return (
    <div data-event-tile className={`${TILE} flex flex-col justify-between p-6 sm:p-7`}>
      <div className="flex items-center justify-between gap-3">
        <span className="flex flex-wrap items-center gap-2">
          <span
            className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: accent.hex, background: `${accent.hex}1f` }}
          >
            {event.category}
          </span>
          {event.highlight && (
            <span className="rounded-full border border-white/20 bg-white/[0.06] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/80">
              ★ Highlighted
            </span>
          )}
        </span>
        <span className="font-display text-[11px] tracking-[0.2em] text-white/30">
          {event.num}
        </span>
      </div>

      <div className="mt-auto">
        <p className="eyebrow !text-white/45">{event.label}</p>
        <h3 className="mt-3 font-display text-[26px] font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-[32px]">
          {event.title.join(" ")}
        </h3>
        <p className="mt-3 text-[13.5px] leading-relaxed text-mist">{event.note}</p>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <span className="text-[11px] uppercase tracking-[0.16em] text-white/45">
            {shots ? `${shots} ${shots === 1 ? "photo" : "photos"}` : "No photos"}
          </span>
          {clips > 0 && (
            <span className="text-[11px] uppercase tracking-[0.16em] text-white/45">
              {clips} {clips === 1 ? "clip" : "clips"}
            </span>
          )}
        </div>

        <span className="mt-6 flex gap-1.5" aria-hidden="true">
          <span className="h-[3px] w-10 rounded-full bg-gblue" />
          <span className="h-[3px] w-6 rounded-full bg-gred" />
          <span className="h-[3px] w-6 rounded-full bg-gyellow" />
          <span className="h-[3px] w-6 rounded-full bg-ggreen" />
        </span>
      </div>
    </div>
  );
}

export default function EventSection({ event, index }) {
  const flipped = index % 2 === 1;
  const direction = flipped ? -1 : 1;

  const ref = useGsap((self, scope) => {
    reveal(scope, "[data-reveal]", { stagger: 0.1 });
    revealHeading(scope);
    reveal(scope, "[data-event-tile]", { y: 84, stagger: 0.12, start: "top 92%" });
    expandRule(scope, "[data-section-rule]");
    eventTrackDrift(scope, direction);
  }, []);

  const accent = ACCENT[event.accent] || ACCENT.blue;

  return (
    <section
      id={event.id}
      ref={ref}
      aria-labelledby={`${event.id}-title`}
      className={`relative overflow-hidden border-t border-white/8 py-20 sm:py-24 ${
        flipped ? "bg-abyss" : "bg-void"
      }`}
    >
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-25 mask-fade-y" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[45vh] opacity-60"
        style={{
          background: `radial-gradient(55% 70% at ${flipped ? "85%" : "15%"} 0%, ${accent.hex}22, transparent 70%)`,
        }}
      />
      {event.highlight && (
        <>
          <span
            aria-hidden="true"
            className="animate-border-flow pointer-events-none absolute inset-x-0 top-0 z-10 h-[3px]"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #ea4335, #fbbc04, #4285f4, #34a853, #ea4335)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] opacity-70"
            style={{
              background: `radial-gradient(60% 65% at ${flipped ? "80%" : "20%"} 0%, ${accent.hex}33, transparent 72%)`,
            }}
          />
        </>
      )}

      <div className="shell relative">
        <div
          className={`flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between ${
            flipped ? "sm:flex-row-reverse" : ""
          }`}
        >
          <div className={flipped ? "sm:text-right" : ""}>
            <SectionMeta num={event.num} label={event.label} align={flipped ? "right" : "left"} />
            {event.highlight && (
              <p className="mt-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.05] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-md">
                  <span className="relative flex h-1.5 w-1.5">
                    <span
                      className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full"
                      style={{ background: accent.hex }}
                    />
                  </span>
                  ★ Highlighted event
                </span>
              </p>
            )}
            <SplitHeading
              as="h2"
              id={`${event.id}-title`}
              lines={event.title}
              className={`mt-8 font-display text-[clamp(2.3rem,5.6vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-white ${
                flipped ? "sm:justify-end" : ""
              }`}
            />
          </div>

          <div className="max-w-md sm:max-w-sm">
            <p data-reveal className="text-[14.5px] leading-relaxed text-mist">
              {event.description}
            </p>
            <span
              data-section-rule
              aria-hidden="true"
              className="mt-5 block h-px w-full bg-white/15"
            />
            <p data-reveal className="eyebrow mt-4">
              {event.note}
            </p>
          </div>
        </div>
      </div>

      <div className="relative mt-12 overflow-hidden">
        <div
          data-event-track
          className="flex w-max gap-5 px-[clamp(1.25rem,5vw,5rem)] will-change-transform"
        >
          {event.media.map((item, i) => (
            <MediaTile key={`${event.id}-${i}`} item={item} event={event} index={i} />
          ))}
          <CaptionTile event={event} />
        </div>
      </div>

      <div className="shell relative mt-8 flex items-center gap-4">
        <span data-section-rule aria-hidden="true" className="h-px w-16 bg-white/25" />
        <p className="eyebrow">Scroll — the strip moves with you</p>
      </div>
    </section>
  );
}
