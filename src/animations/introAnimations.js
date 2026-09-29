import { gsap } from "../lib/gsap";
import { prefersReducedMotion } from "../lib/utils";
import { reveal, expandRule } from "./scrollAnimations";

/** Cinematic first-load sequence for the intro session hero. */
export function introEntrance(scope) {
  const q = gsap.utils.selector(scope);

  if (prefersReducedMotion()) {
    gsap.set(q("[data-intro-anim]"), { clearProps: "all" });
    return undefined;
  }

  const tl = gsap.timeline({ delay: 0.1, defaults: { ease: "power3.out" } });

  tl.from(q("[data-intro-topbar]"), { yPercent: -120, autoAlpha: 0, duration: 0.75 })
    .from(
      q("[data-intro-eyebrow] > *"),
      { yPercent: 130, autoAlpha: 0, duration: 0.7, stagger: 0.08 },
      "-=0.4",
    )
    .from(q("[data-split-word]"), { yPercent: 118, duration: 1.05, stagger: 0.06, ease: "power4.out" }, "-=0.42")
    .from(
      q("[data-intro-logos] > :not([data-intro-x])"),
      { y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.08 },
      "-=0.75",
    )
    .from(q("[data-intro-x]"), { autoAlpha: 0, scale: 0.55, duration: 0.75, ease: "back.out(2)" }, "-=0.62")
    .from(q("[data-intro-rule]"), { scaleX: 0, transformOrigin: "left center", duration: 1 }, "-=0.7")
    .from(q("[data-intro-copy]"), { y: 26, autoAlpha: 0, duration: 0.8 }, "-=0.62")
    .from(q("[data-intro-meta]"), { y: 34, autoAlpha: 0, duration: 0.75, stagger: 0.1 }, "-=0.55")
    .from(q("[data-intro-cta]"), { y: 28, autoAlpha: 0, duration: 0.7, stagger: 0.09 }, "-=0.5")
    .from(q("[data-intro-float]"), { y: 56, scale: 0.94, autoAlpha: 0, duration: 1.05 }, "-=0.75")
    .from(q("[data-intro-scroll]"), { autoAlpha: 0, y: -12, duration: 0.6 }, "-=0.5");

  return () => tl.kill();
}

/** Infinite ambient loops: orb, particles, ticket float, glow breathing. */
export function introLoops(scope) {
  if (prefersReducedMotion()) return undefined;

  const q = gsap.utils.selector(scope);
  const tweens = [];

  q("[data-intro-float]").forEach((el, i) => {
    tweens.push(
      gsap.to(el, {
        y: `-=${10 + (i % 3) * 6}`,
        duration: 3.4 + i * 0.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: i * 0.3,
      }),
    );
  });

  q("[data-intro-particle]").forEach((el, i) => {
    tweens.push(
      gsap.to(el, {
        y: `-=${16 + (i % 5) * 8}`,
        x: `+=${(i % 2 ? 1 : -1) * (7 + (i % 4) * 5)}`,
        autoAlpha: 0.12 + (i % 5) * 0.11,
        duration: 4.5 + (i % 6),
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: (i % 7) * 0.3,
      }),
    );
  });

  const orb = q("[data-intro-orb]");
  if (orb.length) {
    tweens.push(
      gsap.to(orb, { rotation: 360, duration: 70, ease: "none", repeat: -1 }),
      gsap.to(orb, { scale: 1.07, duration: 8, ease: "sine.inOut", yoyo: true, repeat: -1 }),
    );
  }

  const pulse = q("[data-intro-pulse]");
  if (pulse.length) {
    tweens.push(
      gsap.fromTo(
        pulse,
        { scale: 1, autoAlpha: 0.55 },
        { scale: 2.4, autoAlpha: 0, duration: 2.2, ease: "power2.out", repeat: -1 },
      ),
    );
  }

  return () => tweens.forEach((t) => t.kill());
}

/** Scroll-triggered reveals for everything below the fold. */
export function introScroll(scope) {
  const tweens = [
    reveal(scope, "[data-reveal]", { y: 46, stagger: 0.1 }),
    reveal(scope, "[data-reveal-card]", { y: 52, scale: 0.97, stagger: 0.12, start: "top 88%" }),
    reveal(scope, "[data-reveal-line]", { y: 30, stagger: 0.09 }),
    expandRule(scope, "[data-section-rule]"),
    reveal(scope, "[data-reveal-tick]", { x: -28, y: 0, stagger: 0.13, start: "top 86%" }),
  ].filter(Boolean);

  const parallaxTweens = [];

  if (!prefersReducedMotion()) {
    gsap.utils.selector(scope)("[data-intro-parallax]").forEach((el) => {
      const distance = parseFloat(el.dataset.introParallax) || 60;
      parallaxTweens.push(
        gsap.to(el, {
          y: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement || scope,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        }),
      );
    });
  }

  return () => {
    tweens.forEach((t) => t?.scrollTrigger?.kill?.());
    parallaxTweens.forEach((t) => t?.scrollTrigger?.kill?.());
  };
}
