import { ArrowUpRight } from "lucide-react";
import SplitHeading from "./ui/SplitHeading";
import SectionMeta from "./ui/SectionMeta";
import { GalleryPlate, ACCENT } from "./ui/Art";
import { gallery } from "../data/gallery";
import { useGsap } from "../lib/useGsap";
import { reveal, revealHeading, expandRule, parallax } from "../animations/scrollAnimations";

const BORDER_FLOW = {
  backgroundImage:
    "linear-gradient(120deg, rgba(66,133,244,0.75), rgba(234,67,53,0.55), rgba(251,188,4,0.55), rgba(52,168,83,0.75), rgba(66,133,244,0.75))",
  WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
  WebkitMaskComposite: "xor",
  mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
  maskComposite: "exclude",
  padding: "1px",
};

export default function Gallery() {
  const item = gallery[0];
  const accent = ACCENT[item.accent] || ACCENT.blue;

  const ref = useGsap((self, scope) => {
    reveal(scope, "[data-reveal]", { stagger: 0.1 });
    revealHeading(scope);
    expandRule(scope, "[data-section-rule]");
    reveal(scope, "[data-gallery-card]", { y: 74, duration: 1.05, start: "top 88%" });
    parallax(scope, "[data-gallery-plate]", { y: -26 });
  }, []);

  return (
    <section
      id="gallery"
      ref={ref}
      aria-labelledby="gallery-title"
      className="section-pad relative overflow-hidden border-t border-white/8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-8%] top-[10%] h-[360px] w-[360px] rounded-full bg-gyellow/8 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-6%] bottom-[8%] h-[340px] w-[340px] rounded-full bg-ggreen/8 blur-[110px]"
      />

      <div className="shell relative">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionMeta num="06" label="Gallery" />
            <SplitHeading
              as="h2"
              id="gallery-title"
              lines={["In the", "room."]}
              className="mt-8 font-display text-[clamp(2.1rem,5vw,4rem)] font-semibold leading-[1.03] tracking-[-0.04em] text-white"
            />
          </div>

          <p data-reveal className="max-w-sm text-[14.5px] leading-relaxed text-mist sm:text-right">
            One frame from a workshop — hands on the keyboards, small groups, one problem,
            real code.
          </p>
        </div>

        <article
          data-gallery-card
          data-cursor="hover"
          aria-label={item.title}
          className="group/gallery card-surface relative mt-12 h-[420px] overflow-hidden rounded-[24px] transition-[border-color] duration-500 hover:border-white/25 sm:h-[520px] lg:mt-14 lg:h-[600px]"
        >
          <span
            aria-hidden="true"
            className="animate-border-flow pointer-events-none absolute inset-0 z-20 rounded-[24px]"
            style={BORDER_FLOW}
          />

          <div
            data-gallery-plate
            aria-hidden="true"
            className="absolute inset-x-0 bottom-[-14%] top-[-14%] overflow-hidden"
          >
            <div className="h-full w-full transition-transform duration-[900ms] ease-out group-hover/gallery:scale-[1.05]">
              <div className="animate-kenburns h-full w-full will-change-transform">
                <GalleryPlate item={item} />
              </div>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <span className="animate-light-sweep absolute -inset-y-12 left-0 w-[32%] bg-gradient-to-r from-transparent via-white/12 to-transparent" />
          </div>

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-void via-void/35 to-transparent"
          />

          <span className="absolute left-5 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-white/12 bg-void/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75 backdrop-blur-md">
            <span className="relative flex h-1.5 w-1.5">
              <span
                className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full"
                style={{ background: accent.hex }}
              />
            </span>
            {item.category}
          </span>

          <span className="absolute right-5 top-4 z-10 font-display text-[11px] font-medium tracking-[0.24em] text-white/45">
            {item.id} <span className="text-white/25">/ 01</span>
          </span>

          <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7">
            <div className="flex items-end justify-between gap-4">
              <div className="min-w-0">
                <span
                  className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: accent.hex, background: `${accent.hex}1f` }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: accent.hex }}
                  />
                  {item.category}
                </span>

                <h3 className="mt-3 font-display text-[20px] font-semibold tracking-tight text-white sm:text-[26px] lg:text-[32px]">
                  {item.title}
                </h3>

                <p className="mt-1.5 max-w-md text-[13.5px] leading-relaxed text-mist sm:text-[15px]">
                  {item.note}
                </p>
              </div>

              <span
                aria-hidden="true"
                className="animate-float-soft grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/20 bg-void/50 text-white backdrop-blur-md transition-colors duration-500 group-hover/gallery:border-white/45 group-hover/gallery:bg-white group-hover/gallery:text-void"
              >
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </div>

            <span
              data-section-rule
              aria-hidden="true"
              className="mt-5 block h-px w-full origin-left bg-white/15"
            />
          </div>
        </article>
      </div>
    </section>
  );
}
