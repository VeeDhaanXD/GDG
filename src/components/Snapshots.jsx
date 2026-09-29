import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import SplitHeading from "./ui/SplitHeading";
import SectionMeta from "./ui/SectionMeta";
import { GalleryPlate, ACCENT } from "./ui/Art";
import { snapshots } from "../data/snapshots";
import { useGsap } from "../lib/useGsap";
import { reveal, revealHeading, expandRule } from "../animations/scrollAnimations";

const TILES = [
  "sm:col-span-2 lg:col-span-6 lg:h-[460px]",
  "lg:col-span-6 lg:h-[460px]",
  "lg:col-span-12 lg:h-[480px]",
];
const TILE_FALLBACK = "lg:col-span-6 lg:h-[440px]";
const RATIO = { landscape: "aspect-[4/3]", portrait: "aspect-[3/4]" };
const KEN_BURNS = [
  { delay: "0s", duration: "20s" },
  { delay: "-6s", duration: "24s" },
  { delay: "-12s", duration: "28s" },
];
const SWEEP_DELAY = ["0s", "2.2s", "4.4s"];

export default function Snapshots() {
  const [open, setOpen] = useState(-1);
  const closeRef = useRef(null);
  const total = snapshots.length;

  const ref = useGsap((self, scope) => {
    reveal(scope, "[data-reveal]", { stagger: 0.1 });
    revealHeading(scope);
    expandRule(scope, "[data-section-rule]");
    reveal(scope, "[data-snapshot-card]", { y: 64, stagger: 0.09, start: "top 88%" });
  }, []);

  const close = useCallback(() => setOpen(-1), []);
  const step = useCallback(
    (d) => setOpen((i) => (i + d + total) % total),
    [total],
  );

  useEffect(() => {
    if (open < 0) return undefined;

    const onKey = (e) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };

    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, step]);

  const current = open >= 0 ? snapshots[open] : null;

  return (
    <section
      id="snapshots"
      ref={ref}
      aria-labelledby="snapshots-title"
      className="section-pad relative overflow-hidden border-t border-white/8 bg-abyss"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-8%] top-[12%] h-[380px] w-[380px] rounded-full bg-gblue/8 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-6%] bottom-[10%] h-[320px] w-[320px] rounded-full bg-gred/8 blur-[110px]"
      />

      <div className="shell relative">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionMeta num="09" label="Snapshots" />
            <SplitHeading
              as="h2"
              id="snapshots-title"
              lines={["The rest", "of the roll."]}
              className="mt-8 font-display text-[clamp(2.1rem,5vw,4rem)] font-semibold leading-[1.03] tracking-[-0.04em] text-white"
            />
          </div>

          <div className="max-w-sm sm:text-right">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-ggreen" />
              </span>
              Live roll · {String(total).padStart(2, "0")} frames
            </span>
            <p data-reveal className="mt-4 text-[14.5px] leading-relaxed text-mist">
              Three frames from the roll — each one drifting on its own clock. Open any of
              them full screen and move through with the arrow keys.
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-12">
          {snapshots.map((item, i) => (
            <button
              key={item.id}
              type="button"
              data-snapshot-card
              data-cursor="hover"
              onClick={() => setOpen(i)}
              aria-label={`Open photo ${item.id} of ${String(total).padStart(2, "0")}`}
              className={`group/snap relative block overflow-hidden rounded-[22px] border border-white/10 bg-void/40 outline-none transition-[border-color] duration-500 hover:border-white/25 focus-visible:border-gblue ${
                TILES[i] || TILE_FALLBACK
              } ${RATIO[item.orientation] || RATIO.landscape} lg:aspect-auto`}
            >
              <span className="absolute inset-0 block overflow-hidden">
                <span className="block h-full w-full transition-transform duration-[900ms] ease-out group-hover/snap:scale-[1.06]">
                  <span
                    className="animate-kenburns block h-full w-full will-change-transform"
                    style={{
                      animationDelay: KEN_BURNS[i]?.delay || "0s",
                      animationDuration: KEN_BURNS[i]?.duration || "22s",
                    }}
                  >
                    <GalleryPlate item={item} />
                  </span>
                </span>
              </span>

              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 block overflow-hidden"
              >
                <span
                  className="animate-light-sweep absolute -inset-y-10 left-0 w-[28%] bg-gradient-to-r from-transparent via-white/12 to-transparent"
                  style={{ animationDelay: SWEEP_DELAY[i] || "0s" }}
                />
              </span>

              <span
                aria-hidden="true"
                className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/12 bg-void/55 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70 backdrop-blur-md sm:left-5 sm:top-5"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span
                    className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full"
                    style={{ background: ACCENT[item.accent]?.hex || "#4285f4" }}
                  />
                </span>
                Frame {item.id}
              </span>

              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-void/85 via-void/10 to-transparent opacity-70 transition-opacity duration-500 group-hover/snap:opacity-95"
              />

              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5"
              >
                <span className="font-display text-[11px] font-medium tracking-[0.24em] text-white/75">
                  {item.id} <span className="text-white/40">/ {String(total).padStart(2, "0")}</span>
                </span>
                <span className="animate-float-soft inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-void/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md transition-colors duration-500 group-hover/snap:border-white/50">
                  View <ArrowUpRight className="h-3 w-3" />
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
          className="fixed inset-0 z-[95] flex flex-col bg-void/95 p-4 backdrop-blur-xl sm:p-7"
        >
          <div className="flex shrink-0 items-center justify-between gap-4">
            <span className="font-display text-[12px] tracking-[0.24em] text-white/55">
              {current.id} <span className="text-white/30">/ {String(total).padStart(2, "0")}</span>
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close viewer"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/70 outline-none transition-colors duration-300 hover:border-white/45 hover:text-white focus-visible:border-gblue"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex min-h-0 flex-1 items-center justify-center py-5">
            <img
              key={current.image}
              src={current.image}
              alt={current.title}
              className="animate-soft-in max-h-full max-w-full rounded-2xl object-contain shadow-[0_30px_90px_rgba(0,0,0,0.55)]"
            />
          </div>

          <div className="flex shrink-0 items-center justify-center gap-3 sm:gap-5">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photo"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/70 outline-none transition-colors duration-300 hover:border-white/45 hover:text-white focus-visible:border-gblue"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              {snapshots.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-label={`Go to photo ${item.id}`}
                  aria-current={i === open}
                  className={`h-1.5 rounded-full outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-gblue ${
                    i === open ? "w-7 bg-white" : "w-1.5 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photo"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/70 outline-none transition-colors duration-300 hover:border-white/45 hover:text-white focus-visible:border-gblue"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
