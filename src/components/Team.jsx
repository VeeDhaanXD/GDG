import { ArrowUpRight } from "lucide-react";
import SplitHeading from "./ui/SplitHeading";
import SectionMeta from "./ui/SectionMeta";
import { Portrait, ACCENT } from "./ui/Art";
import SocialIcon from "./ui/SocialIcon";
import { team } from "../data/team";
import { useGsap } from "../lib/useGsap";
import { reveal, revealHeading, expandRule } from "../animations/scrollAnimations";
import { teamReveal, teamParallax } from "../animations/teamAnimations";

export default function Team() {
  const ref = useGsap((self, scope) => {
    reveal(scope, "[data-reveal]", { stagger: 0.1 });
    revealHeading(scope);
    expandRule(scope, "[data-section-rule]");
    teamReveal(scope);
    teamParallax(scope);
  }, []);

  return (
    <section
      id="team"
      ref={ref}
      aria-labelledby="team-title"
      className="section-pad relative overflow-hidden border-t border-white/8"
    >
      <div
        aria-hidden="true"
        data-team-float
        className="pointer-events-none absolute right-[-10%] top-[6%] h-[420px] w-[420px] rounded-full bg-gred/8 blur-[120px]"
      />
      <div
        aria-hidden="true"
        data-team-float
        className="pointer-events-none absolute left-[-8%] bottom-[4%] h-[360px] w-[360px] rounded-full bg-gblue/8 blur-[110px]"
      />

      <div className="shell relative">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionMeta num="05" label="The Team" />
            <SplitHeading
              as="h2"
              id="team-title"
              lines={["Meet the", "organisers."]}
              className="mt-8 font-display text-[clamp(2.1rem,5vw,4rem)] font-semibold leading-[1.03] tracking-[-0.04em] text-white"
            />
          </div>

          <p data-reveal className="max-w-sm text-[14.5px] leading-relaxed text-mist sm:text-right">
            Three organisers keeping the calendar alive, the rooms booked and the community moving
            forward.
          </p>
        </div>

        <div data-team-grid className="mt-14 grid gap-6 md:grid-cols-3">
          {team.map((member) => {
            const accent = ACCENT[member.accent] || ACCENT.blue;
            return (
              <article
                key={member.id}
                data-team-card
                className="group relative"
                aria-label={`${member.name}, ${member.role}`}
              >
                <div className="card-surface relative overflow-hidden rounded-[26px] transition-transform duration-500 ease-out group-hover:-translate-y-2.5">
                  <div data-team-media className="relative aspect-[3/4] overflow-hidden">
                    <div className="h-full w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]">
                      <Portrait member={member} />
                    </div>

                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-void via-void/35 to-transparent"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(155deg, ${accent.hex}55 0%, transparent 55%)`,
                      }}
                    />

                    <span
                      data-team-number
                      className="absolute left-5 top-5 font-display text-[12px] font-semibold tracking-[0.22em] text-white/70"
                    >
                      {member.id}
                      <span className="text-white/30"> / 03</span>
                    </span>

                    <div data-team-social className="absolute right-4 top-4 flex gap-2">
                      <div className="flex gap-2 opacity-0 transition-all duration-500 group-hover:opacity-100">
                        {member.socials.map((social) => (
                          <a
                            key={social.key}
                            href={social.href}
                            aria-label={`${member.name} on ${social.label}`}
                            className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-void/60 text-white/80 backdrop-blur-md transition-colors duration-300 hover:border-white/50 hover:text-white"
                          >
                            <SocialIcon name={social.key} />
                          </a>
                        ))}
                      </div>
                    </div>

                    <div
                      aria-hidden="true"
                      className="absolute inset-x-5 bottom-5 h-px origin-left scale-x-0 bg-white/40 transition-transform duration-700 group-hover:scale-x-100"
                    />
                  </div>

                  <div data-team-body className="p-6 sm:p-7">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-[22px] font-semibold tracking-tight text-white">
                        {member.name}
                      </h3>
                      <span
                        className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]"
                        style={{
                          color: accent.hex,
                          background: `${accent.hex}1f`,
                        }}
                      >
                        {member.role}
                      </span>
                    </div>
                    <p className="mt-3 text-[14px] leading-relaxed text-mist">{member.bio}</p>

                    <span className="arrow-slide mt-5 inline-flex items-center gap-2 text-[11.5px] font-medium uppercase tracking-[0.18em] text-white/35 transition-colors duration-300 group-hover:text-white/70">
                      Profile <ArrowUpRight className="h-3.5 w-3.5" />
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
