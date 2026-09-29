import { useEffect, useMemo } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Users,
  Sparkles,
  MessagesSquare,
  Route,
  Handshake,
} from "lucide-react";
import SplitHeading from "../components/ui/SplitHeading";
import SectionMeta from "../components/ui/SectionMeta";
import MagneticButton from "../components/ui/MagneticButton";
import Brand from "../components/ui/Brand";
import { navigateTo, scrollToId } from "../lib/utils";
import { useGsap } from "../lib/useGsap";
import {
  introEntrance,
  introLoops,
  introScroll,
} from "../animations/introAnimations";

const EVENT = {
  collab: "GDGOC x LoL",
  title: "Introductory Session",
  date: "29 Sept 2026",
  dateLong: "29 September 2026",
  weekday: "Tuesday",
  venue: "Remote Center Hall",
};

const MARQUEE_ITEMS = [
  "GDGOC x LoL",
  "Introductory Session",
  "29 Sept 2026",
  "Remote Center Hall",
  "Learn. Build. Connect.",
];

const DETAIL_CARDS = [
  {
    key: "when",
    icon: CalendarDays,
    accent: "text-gblue",
    label: "When",
    value: EVENT.dateLong,
    note: `${EVENT.weekday} · Save the date`,
  },
  {
    key: "where",
    icon: MapPin,
    accent: "text-gred",
    label: "Where",
    value: EVENT.venue,
    note: "Venue details shared with registered attendees",
  },
  {
    key: "who",
    icon: Users,
    accent: "text-gyellow",
    label: "Who",
    value: EVENT.collab,
    note: "A collaborative introductory meet-up",
  },
];

const EXPECT_CARDS = [
  {
    icon: Sparkles,
    accent: "bg-gblue/12 text-gblue",
    title: "Meet the community",
    copy: "Say hello to the GDGOC crew and the LoL team, and see who is building what on campus.",
  },
  {
    icon: Route,
    accent: "bg-gyellow/12 text-gyellow",
    title: "Session roadmap",
    copy: "A guided walk-through of what this introductory session covers and how the series unfolds.",
  },
  {
    icon: MessagesSquare,
    accent: "bg-ggreen/12 text-ggreen",
    title: "Questions & next steps",
    copy: "Bring your questions — leave with clear next steps, resources and people to connect with.",
  },
];

const FLOW = [
  { num: "01", title: "Welcome & intros", copy: "Check-in, ice-breakers and a quick round of hellos." },
  { num: "02", title: "Intro session", copy: "The core GDGOC x LoL introductory walkthrough." },
  { num: "03", title: "Collaboration highlights", copy: "What the chapters are planning together next." },
  { num: "04", title: "Open floor", copy: "Questions, connections and closing notes." },
];

const GdgMark = ({ className = "" }) => (
  <span
    className={`grid place-items-center rounded-2xl border border-white/12 bg-white/[0.05] ${className}`}
    title="GDGOC"
  >
    <span aria-hidden="true" className="grid grid-cols-2 gap-[5px]">
      <i className="block h-3 w-3 rounded-full bg-gblue sm:h-3.5 sm:w-3.5" />
      <i className="block h-3 w-3 rounded-full bg-gred sm:h-3.5 sm:w-3.5" />
      <i className="block h-3 w-3 rounded-full bg-gyellow sm:h-3.5 sm:w-3.5" />
      <i className="block h-3 w-3 rounded-full bg-ggreen sm:h-3.5 sm:w-3.5" />
    </span>
    <span className="sr-only">GDGOC</span>
  </span>
);

const LolMark = ({ className = "" }) => (
  <span
    className={`grid place-items-center overflow-hidden rounded-2xl border border-white/12 bg-white/[0.05] p-2 ${className}`}
    title="LoL"
  >
    <img
      src="/lol.png"
      alt="LoL logo"
      width={44}
      height={44}
      loading="eager"
      decoding="async"
      className="h-full w-full object-contain"
    />
  </span>
);

const PARTICLE_SEED = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: `${(i * 53) % 100}%`,
  top: `${(i * 37) % 100}%`,
  size: 2 + ((i * 29) % 4),
  accent: ["#4285f4", "#ea4335", "#fbbc04", "#34a853"][i % 4],
  opacity: 0.18 + ((i * 17) % 5) * 0.08,
}));

export default function IntroPage() {
  const particles = useMemo(() => PARTICLE_SEED, []);

  useEffect(() => {
    const previous = document.title;
    document.title = `${EVENT.collab} — ${EVENT.title} · GDGOC WIT Solapur`;
    return () => {
      document.title = previous;
    };
  }, []);

  const ref = useGsap((self, scope) => {
    const teardownEntrance = introEntrance(scope);
    const teardownLoops = introLoops(scope);
    const teardownScroll = introScroll(scope);

    return () => {
      teardownEntrance?.();
      teardownLoops?.();
      teardownScroll?.();
    };
  }, []);

  const marqueeRow = (
    <div className="flex w-max shrink-0 items-center gap-10 pr-10">
      {MARQUEE_ITEMS.map((item, i) => (
        <span key={`${item}-${i}`} className="flex items-center gap-10 whitespace-nowrap">
          <span className="font-display text-[clamp(1.4rem,3vw,2.4rem)] font-semibold tracking-[-0.03em] text-white/85">
            {item}
          </span>
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 rotate-45 bg-gblue"
          />
        </span>
      ))}
    </div>
  );

  return (
    <div ref={ref} className="relative min-h-[100svh] w-full overflow-x-hidden bg-void">
      {/* ---------- background layers ---------- */}
      <div
        aria-hidden="true"
        className="bg-grid mask-fade-b pointer-events-none fixed inset-0 opacity-[0.45]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 h-[70vh] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(66,133,244,0.16),transparent_70%)]"
      />

      <div
        aria-hidden="true"
        data-intro-orb
        className="pointer-events-none fixed left-[-22vw] top-[14vh] h-[70vmin] w-[70vmin] sm:left-[-12vw]"
      >
        <div
          className="absolute inset-0 rounded-full opacity-[0.32] blur-[90px]"
          style={{
            background:
              "conic-gradient(from 140deg, #4285f4, #34a853, #fbbc04, #ea4335, #8ab4f8, #4285f4)",
          }}
        />
        <div className="absolute inset-[20%] rounded-full bg-void/70 blur-[50px]" />
      </div>

      <div aria-hidden="true" className="pointer-events-none fixed inset-0">
        {particles.map((p) => (
          <span
            key={p.id}
            data-intro-particle
            className="absolute rounded-full"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background: p.accent,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>

      {/* ---------- top bar ---------- */}
      <header
        data-intro-topbar
        data-intro-anim
        className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-void/70 backdrop-blur-xl"
      >
        <div className="shell flex h-16 items-center justify-between">
          <button
            type="button"
            onClick={() => navigateTo("/")}
            className="rounded-full"
            aria-label="Back to GDGOC home"
          >
            <Brand />
          </button>

          <button
            type="button"
            onClick={() => navigateTo("/")}
            className="arrow-slide inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[13px] font-medium text-white/75 transition-colors duration-300 hover:border-white/35 hover:text-white sm:px-5"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to site</span>
          </button>
        </div>
      </header>

      {/* ---------- hero ---------- */}
      <section className="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden">
        {/* horizontal strip riding the top of the hero */}
        <div
          aria-hidden="true"
          className="relative z-10 mt-16 border-b border-white/8 bg-panel/70 py-4 backdrop-blur-sm"
        >
          <div className="mask-fade-y flex overflow-hidden">
            <div className="animate-marquee flex">
              {marqueeRow}
              {marqueeRow}
            </div>
          </div>
        </div>

        <div className="shell relative z-10 flex flex-1 flex-col justify-center pb-24 pt-14 sm:pt-20">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <p
                data-intro-eyebrow
                data-intro-anim
                className="eyebrow mb-7 flex flex-wrap items-center gap-x-3 gap-y-2 overflow-hidden !text-white/55"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 !text-white/70">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-ggreen" />
                  </span>
                  Registrations open soon
                </span>
                <span>
                  <span className="text-gblue">◆</span>&nbsp;&nbsp;Collaborative session
                </span>
              </p>

              <div
                data-intro-logos
                data-intro-anim
                className="mb-6 flex flex-wrap items-center gap-3 sm:gap-4"
              >
                <GdgMark className="h-14 w-14 sm:h-16 sm:w-16" />
                <span
                  data-intro-x
                  data-intro-anim
                  className="font-display text-2xl font-medium text-white/40"
                  aria-hidden="true"
                >
                  ×
                </span>
                <LolMark className="h-14 w-14 sm:h-16 sm:w-16" />
                <span className="gradient-text font-display text-[clamp(1.35rem,2.6vw,2rem)] font-semibold tracking-[-0.04em]">
                  {EVENT.collab}
                </span>
              </div>

              <SplitHeading
                as="h1"
                id="intro-title"
                lines={["Introductory", "Session"]}
                className="font-display text-[clamp(2.6rem,7vw,5.75rem)] font-semibold leading-[0.94] tracking-[-0.045em] text-white"
              />

              <div
                data-intro-rule
                data-intro-anim
                className="mt-6 mb-7 flex gap-2"
                aria-hidden="true"
              >
                <span className="h-[3px] w-16 rounded-full bg-gblue sm:w-24" />
                <span className="h-[3px] w-8 rounded-full bg-gred sm:w-12" />
                <span className="h-[3px] w-8 rounded-full bg-gyellow sm:w-12" />
                <span className="h-[3px] w-8 rounded-full bg-ggreen sm:w-12" />
              </div>

              <p
                data-intro-copy
                data-intro-anim
                className="max-w-xl text-[15px] leading-relaxed text-mist sm:text-base"
              >
                One room, two communities. Join {EVENT.collab} for a guided introductory
                session — what we do, how to get involved, and where the year is headed.
              </p>

              <div className="mt-9 grid gap-3 sm:grid-cols-2">
                <div
                  data-intro-meta
                  data-intro-anim
                  className="glass flex items-center gap-4 rounded-2xl px-5 py-4"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gblue/12 text-gblue">
                    <CalendarDays className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="eyebrow !text-white/45">Date</p>
                    <p className="truncate font-display text-lg font-semibold tracking-tight text-white">
                      {EVENT.date}
                    </p>
                    <p className="text-[12px] text-white/40">{EVENT.weekday}</p>
                  </div>
                </div>

                <div
                  data-intro-meta
                  data-intro-anim
                  className="glass flex items-center gap-4 rounded-2xl px-5 py-4"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gred/12 text-gred">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="eyebrow !text-white/45">Venue</p>
                    <p className="truncate font-display text-lg font-semibold tracking-tight text-white">
                      {EVENT.venue}
                    </p>
                    <p className="truncate text-[12px] text-white/40">In person</p>
                  </div>
                </div>
              </div>

              <div
                data-intro-cta
                data-intro-anim
                className="mt-9 flex flex-wrap items-center gap-4"
              >
                <MagneticButton
                  onClick={() => scrollToId("register", 84)}
                  className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-void transition-colors duration-300 hover:bg-gblue hover:text-white"
                  ariaLabel="Get notified for the session"
                >
                  Get notified
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </MagneticButton>

                <button
                  type="button"
                  onClick={() => scrollToId("details", 84)}
                  className="arrow-slide inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-4 text-sm font-medium text-white/80 transition-colors duration-300 hover:border-white/35 hover:text-white"
                >
                  Event details
                </button>
              </div>
            </div>

            {/* event pass */}
            <div className="relative lg:col-span-5">
              <div
                data-intro-float
                data-intro-anim
                className="glass relative mx-auto w-full max-w-[420px] overflow-hidden rounded-3xl p-6 sm:p-7"
              >
                <div className="absolute inset-x-0 top-0 flex h-1.5">
                  <span className="h-full flex-1 bg-gblue" />
                  <span className="h-full flex-1 bg-gred" />
                  <span className="h-full flex-1 bg-gyellow" />
                  <span className="h-full flex-1 bg-ggreen" />
                </div>

                <div className="mb-6 flex items-center justify-between pt-2">
                  <span className="eyebrow !text-white/45">Event pass</span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-3 py-1 text-[11px] font-medium text-white/70">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-ggreen" />
                    </span>
                    Upcoming
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <GdgMark className="h-11 w-11 rounded-xl [&_i]:h-2.5 [&_i]:w-2.5" />
                  <span className="text-lg text-white/35" aria-hidden="true">
                    ×
                  </span>
                  <LolMark className="h-11 w-11 rounded-xl" />
                </div>

                <p className="gradient-text mt-4 font-display text-2xl font-semibold tracking-[-0.04em]">
                  {EVENT.collab}
                </p>
                <p className="mt-1 font-display text-[15px] font-medium text-white/70">
                  {EVENT.title}
                </p>

                <div className="my-6 h-px w-full bg-white/10" />

                <dl className="grid grid-cols-2 gap-5">
                  <div>
                    <dt className="eyebrow !text-white/40">Date</dt>
                    <dd className="mt-1.5 font-display text-base font-semibold text-white">
                      {EVENT.date}
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow !text-white/40">Day</dt>
                    <dd className="mt-1.5 font-display text-base font-semibold text-white">
                      {EVENT.weekday}
                    </dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="eyebrow !text-white/40">Venue</dt>
                    <dd className="mt-1.5 font-display text-base font-semibold text-white">
                      {EVENT.venue}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 flex items-end justify-between gap-4">
                  <div aria-hidden="true" className="grid grid-cols-6 gap-[3px]">
                    {Array.from({ length: 18 }, (_, i) => (
                      <span
                        key={i}
                        className="block h-7 w-[3px] bg-white/70"
                        style={{ opacity: i % 3 === 0 ? 0.85 : i % 2 === 0 ? 0.5 : 0.7 }}
                      />
                    ))}
                  </div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
                    no. 0929
                  </p>
                </div>
              </div>

              <div className="mt-5 flex justify-center gap-3">
                <span
                  data-intro-float
                  data-intro-anim
                  className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11.5px] font-medium text-white/75"
                >
                  <Users className="h-3.5 w-3.5 text-gblue" /> Student-led
                </span>
                <span
                  data-intro-float
                  data-intro-anim
                  className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11.5px] font-medium text-white/75"
                >
                  <Handshake className="h-3.5 w-3.5 text-gyellow" /> GDGOC × LoL
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          data-intro-scroll
          data-intro-anim
          className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center"
          aria-hidden="true"
        >
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/40">
            <span>Scroll</span>
            <span className="relative h-8 w-px overflow-hidden bg-white/15">
              <span className="absolute inset-x-0 top-0 h-3 animate-bounce bg-gblue" />
            </span>
          </div>
        </div>
      </section>

      {/* ---------- details ---------- */}
      <section id="details" className="section-pad relative z-10">
        <div className="shell">
          <SectionMeta num="01" label="Event details" />

          <div className="mt-8 grid items-end gap-6 lg:grid-cols-12">
            <h2
              data-reveal
              className="font-display text-[clamp(1.9rem,3.6vw,3rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-white lg:col-span-7"
            >
              Everything you need before you walk in.
            </h2>
            <p
              data-reveal
              className="text-[15px] leading-relaxed text-mist lg:col-span-5 lg:justify-self-end"
            >
              Save the date, note the venue, and keep an eye out — registration details
              drop shortly.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DETAIL_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.key}
                  data-reveal-card
                  className="card-surface group relative overflow-hidden rounded-2xl p-6 transition-transform duration-500 hover:-translate-y-1.5"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/[0.04] blur-2xl transition-opacity duration-500 group-hover:opacity-0"
                  />
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-xl bg-white/[0.05] ${card.accent}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="eyebrow mt-6 !text-white/45">{card.label}</p>
                  <p className="mt-2 font-display text-2xl font-semibold tracking-[-0.03em] text-white">
                    {card.value}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-mist-dim">{card.note}</p>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gblue via-gyellow to-ggreen transition-transform duration-500 group-hover:scale-x-100"
                  />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- what to expect ---------- */}
      <section className="relative z-10 border-t border-white/8 bg-panel/40 section-pad">
        <div className="shell">
          <SectionMeta num="02" label="What to expect" />

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {EXPECT_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  data-reveal-card
                  className="glass rounded-2xl p-7 transition-colors duration-500 hover:border-white/20"
                >
                  <span className={`grid h-12 w-12 place-items-center rounded-xl ${card.accent}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold tracking-[-0.03em] text-white">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist">{card.copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- session flow ---------- */}
      <section className="relative z-10 section-pad">
        <div className="shell">
          <SectionMeta num="03" label="Session flow" />

          <div className="mt-8 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2
                data-reveal
                className="font-display text-[clamp(1.9rem,3.6vw,3rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-white"
              >
                How the hour unfolds.
              </h2>
              <p data-reveal className="mt-5 max-w-md text-[15px] leading-relaxed text-mist">
                A relaxed, beginner-friendly flow — no prior involvement needed.
              </p>
              <span
                data-section-rule
                aria-hidden="true"
                className="mt-8 block h-px w-full bg-white/15"
              />
            </div>

            <ol className="lg:col-span-8">
              {FLOW.map((step) => (
                <li
                  key={step.num}
                  data-reveal-tick
                  className="group flex items-start gap-6 border-b border-white/8 py-7 first:pt-0"
                >
                  <span className="font-mono text-sm text-white/35 transition-colors duration-300 group-hover:text-gblue">
                    {step.num}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-mist">{step.copy}</p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="mt-3 hidden h-2 w-2 shrink-0 rotate-45 border border-white/25 transition-colors duration-300 group-hover:border-gblue group-hover:bg-gblue sm:block"
                  />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------- register ---------- */}
      <section
        id="register"
        className="relative z-10 overflow-hidden border-t border-white/8 section-pad"
      >
        <div
          aria-hidden="true"
          data-intro-parallax="70"
          className="pointer-events-none absolute inset-x-0 bottom-[-30%] h-[70%] bg-[radial-gradient(50%_50%_at_50%_100%,rgba(66,133,244,0.18),transparent_70%)]"
        />

        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p data-reveal className="eyebrow !text-white/50">
              Pending · Registration
            </p>

            <h2
              data-reveal
              className="mt-6 font-display text-[clamp(2.1rem,5vw,4rem)] font-semibold leading-[1] tracking-[-0.045em] text-white"
            >
              Seats are filling.{" "}
              <span className="gradient-text">Registration opens shortly.</span>
            </h2>

            <p
              data-reveal
              className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-mist sm:text-base"
            >
              We are finalizing the roster for {EVENT.collab} at {EVENT.venue} on{" "}
              {EVENT.dateLong}. Drop your interest and you will be the first to know when
              the link goes live.
            </p>

            <div
              data-reveal
              className="mt-9 flex flex-wrap items-center justify-center gap-4"
            >
              <MagneticButton
                onClick={() => scrollToId("details", 84)}
                className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-void transition-colors duration-300 hover:bg-gblue hover:text-white"
                ariaLabel="Review event details"
              >
                Review details
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </MagneticButton>

              <button
                type="button"
                onClick={() => navigateTo("/")}
                className="arrow-slide inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-4 text-sm font-medium text-white/80 transition-colors duration-300 hover:border-white/35 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to GDGOC
              </button>
            </div>

            <div
              data-reveal
              className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-gyellow" />
              </span>
              <span className="text-[13px] text-white/70">
                Registration link pending — check back soon
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- footer ---------- */}
      <footer className="relative z-10 border-t border-white/8 bg-panel/60">
        <div className="shell flex flex-col items-center justify-between gap-5 py-8 sm:flex-row">
          <Brand />
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
            {EVENT.collab} · {EVENT.date} · {EVENT.venue}
          </p>
          <button
            type="button"
            onClick={() => navigateTo("/")}
            className="link-underline text-[13px] font-medium text-white/70 transition-colors duration-300 hover:text-white"
          >
            gdgoc-wit-solapur
          </button>
        </div>
      </footer>
    </div>
  );
}
