import { ArrowUpRight } from "lucide-react";
import SplitHeading from "./ui/SplitHeading";
import SectionMeta from "./ui/SectionMeta";
import { GalleryPlate, ACCENT } from "./ui/Art";
import { gallery } from "../data/gallery";
import { useGsap } from "../lib/useGsap";
import { reveal, revealHeading, expandRule, parallax } from "../animations/scrollAnimations";

export default function Gallery() {
  const ref = useGsap((self, scope) => {
    reveal(scope, "[data-reveal]", { stagger: 0.1 });
    revealHeading(scope);
    expandRule(scope, "[data-section-rule]");
    reveal(scope, "[data-gallery-card]", { y: 74, stagger: 0.13, duration: 1.05, start: "top 88%" });
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
            <SectionMeta num="04" label="Gallery" />
            <SplitHeading
              as="h2"
              id="gallery-title"
              lines={["In the", "room."]}
              className="mt-8 font-display text-[clamp(2.1rem,5vw,4rem)] font-semibold leading-[1.03] tracking-[-0.04em] text-white"
            />
          </div>

          <p data-reveal className="max-w-sm text-[14.5px] leading-relaxed text-mist sm:text-right">
            Three frames from the community — the setup, the middle of it and whatever came out at
            the end.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-12">
          {gallery.map((item, i) => {
            const accent = ACCENT[item.accent] || ACCENT.blue;
            const feature = i === 0;

            return (
              <article
                key={item.id}
                data-gallery-card
                data-cursor="hover"
                aria-label={item.title}
                className={`group/gallery card-surface relative overflow-hidden rounded-[24px] transition-[border-color] duration-500 hover:border-white/25 ${
                  feature
                    ? "aspect-[4/5] sm:col-span-2 sm:aspect-[16/10] lg:col-span-7 lg:row-span-2 lg:aspect-auto lg:h-[560px]"
                    : "aspect-[4/5] sm:aspect-[4/3] lg:col-span-5 lg:aspect-auto lg:h-[270px]"
                }`}
              >
                <div
                  data-gallery-plate
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-[-14%] top-[-14%] overflow-hidden"
                >
                  <div className="h-full w-full transition-transform duration-[900ms] ease-out group-hover/gallery:scale-[1.06]">
                    <GalleryPlate item={item} />
                  </div>
                </div>

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-void via-void/35 to-transparent"
                />

                <span className="absolute right-5 top-4 font-display text-[11px] font-medium tracking-[0.24em] text-white/45">
                  {item.id} <span className="text-white/25">/ 03</span>
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
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

                      <h3 className="mt-3 font-display text-[17px] font-semibold tracking-tight text-white sm:text-[19px] lg:text-[21px]">
                        {item.title}
                      </h3>

                      <p className="mt-1.5 text-[13px] leading-relaxed text-mist">{item.note}</p>
                    </div>

                    <span
                      aria-hidden="true"
                      className="grid h-10 w-10 shrink-0 -translate-x-2 place-items-center rounded-full border border-white/20 bg-void/50 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover/gallery:translate-x-0 group-hover/gallery:opacity-100"
                    >
                      <ArrowUpRight className="h-4 w-4" />
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
