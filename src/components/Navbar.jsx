import { useEffect, useRef, useState, useCallback } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Brand from "./ui/Brand";
import { nav } from "../data/site";
import { scrollToId, observeSections } from "../lib/utils";
import { useGsap } from "../lib/useGsap";
import { gsap } from "../lib/gsap";

const MOBILE_ITEMS = [...nav, { id: "join", label: "Join Us", href: "#join" }];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("about");
  const menuTl = useRef(null);

  const go = useCallback((id) => {
    setOpen(false);
    scrollToId(id);
  }, []);

  /* ---------- scroll state ---------- */
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* ---------- active section indicator ---------- */
  useEffect(() => {
    const ids = ["home", ...nav.map((n) => n.id), "join"];
    return observeSections(ids, setActive);
  }, []);

  /* ---------- mobile overlay timeline ---------- */
  const menuRef = useGsap(
    (self, scope) => {
      const links = gsap.utils.selector(scope)("[data-menu-link]");
      const meta = gsap.utils.selector(scope)("[data-menu-meta]");

      gsap.set(links, { yPercent: 120, autoAlpha: 0 });
      gsap.set(meta, { autoAlpha: 0, y: 20 });
      gsap.set(scope, { autoAlpha: 0 });

      menuTl.current = gsap
        .timeline({ paused: true })
        .to(scope, { autoAlpha: 1, duration: 0.4, ease: "power2.out" })
        .to(links, { yPercent: 0, autoAlpha: 1, duration: 0.6, stagger: 0.055, ease: "power3.out" }, "-=0.2")
        .to(meta, { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.35");

      return () => menuTl.current?.kill();
    },
    [],
  );

  useEffect(() => {
    const tl = menuTl.current;
    if (!tl) return undefined;

    if (open) {
      tl.play(0);
      document.body.style.overflow = "hidden";
    } else {
      tl.reverse();
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          go("about");
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-black"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-void/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="shell flex h-[72px] items-center justify-between gap-6">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              go("home");
            }}
            aria-label="GDGOC WIT Solapur — back to top"
            className="shrink-0"
          >
            <Brand />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {nav.map((item) => (
              <a
                key={item.id}
                href={item.href}
                data-active={active === item.id}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.id);
                }}
                className={`link-underline text-[13px] font-medium tracking-tight transition-colors duration-300 ${
                  active === item.id ? "text-white" : "text-white/55 hover:text-white/90"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#join"
              onClick={(e) => {
                e.preventDefault();
                go("join");
              }}
              className="group hidden items-center gap-2 rounded-full border border-white/15 bg-white px-5 py-2.5 text-[13px] font-semibold text-void transition-all duration-300 hover:border-gblue hover:bg-gblue hover:text-white sm:inline-flex"
            >
              Join Us
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition-colors duration-300 hover:bg-white/10 lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={`fixed inset-0 z-40 lg:hidden ${open ? "" : "pointer-events-none"}`}
        role="dialog"
        aria-modal={open}
        aria-label="Site menu"
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-void/96 backdrop-blur-2xl" />
        <div className="bg-grid absolute inset-0 opacity-25" />

        <div className="relative flex h-full flex-col justify-center px-7 pt-16">
          <p className="eyebrow mb-7">Menu</p>

          <nav aria-label="Mobile" className="flex flex-col">
            {MOBILE_ITEMS.map((item, i) => (
              <span key={item.id} className="block overflow-hidden">
                <a
                  data-menu-link
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(item.id);
                  }}
                  className="flex items-baseline gap-4 border-b border-white/10 py-4 font-display text-[clamp(30px,9vw,38px)] font-medium leading-none tracking-tight text-white/90 transition-colors duration-300 hover:text-white"
                >
                  <span className="text-[11px] tracking-[0.2em] text-white/35">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </a>
              </span>
            ))}
          </nav>

          <div data-menu-meta className="mt-9 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-gblue" />
            <span className="h-2 w-2 rounded-full bg-gred" />
            <span className="h-2 w-2 rounded-full bg-gyellow" />
            <span className="h-2 w-2 rounded-full bg-ggreen" />
            <span className="ml-2 text-[11px] uppercase tracking-[0.22em] text-white/40">
              Learn. Build. Connect.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
