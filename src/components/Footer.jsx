import { ArrowUp, ArrowUpRight } from "lucide-react";
import Brand from "./ui/Brand";
import SocialIcon from "./ui/SocialIcon";
import { footerNav, socials, site } from "../data/site";
import { scrollToId } from "../lib/utils";
import { useGsap } from "../lib/useGsap";
import { reveal } from "../animations/scrollAnimations";

export default function Footer() {
  const ref = useGsap((self, scope) => {
    reveal(scope, "[data-reveal]", { y: 34, stagger: 0.07, start: "top 92%" });
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer ref={ref} className="relative border-t border-white/8 bg-abyss">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-25 mask-fade-b" />

      <div className="shell relative pb-10 pt-16 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5" data-reveal>
            <Brand />
            <p className="mt-5 max-w-sm text-[14.5px] leading-relaxed text-mist">
              {site.fullName} — {site.campus}. A student-led community for learning, building and
              connecting with the developer ecosystem.
            </p>
            <p className="mt-6 font-display text-[13px] uppercase tracking-[0.24em] text-white/35">
              Learn. Build. Connect.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-4" data-reveal>
            <p className="eyebrow mb-5">Navigate</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {footerNav.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(item.id);
                    }}
                    className="link-underline inline-block text-[14px] text-white/60 transition-colors duration-300 hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3" data-reveal>
            <p className="eyebrow mb-5">Elsewhere</p>
            <ul className="flex flex-col gap-3">
              {socials.map((item) => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-3 text-[14px] text-white/60 transition-colors duration-300 hover:text-white"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-white/12 text-white/70 transition-colors duration-300 group-hover:border-white/40 group-hover:text-white">
                      <SocialIcon name={item.key} className="h-4 w-4" />
                    </span>
                    {item.label}
                    <ArrowUpRight className="h-3.5 w-3.5 -translate-y-0.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          data-reveal
          className="mt-14 flex flex-col-reverse items-start justify-between gap-5 border-t border-white/8 pt-7 sm:flex-row sm:items-center"
        >
          <p className="text-[13px] text-white/40">
            Built by the GDGOC community.
            <span className="mx-2 text-white/20">·</span>
            © {year} {site.fullName}
          </p>

          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-1.5 w-1.5 rounded-full bg-gblue" />
              <span className="h-1.5 w-1.5 rounded-full bg-gred" />
              <span className="h-1.5 w-1.5 rounded-full bg-gyellow" />
              <span className="h-1.5 w-1.5 rounded-full bg-ggreen" />
            </span>

            <button
              type="button"
              onClick={() => scrollToId("home")}
              className="group inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-white/45 transition-colors duration-300 hover:text-white"
            >
              Back to top
              <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-1" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
