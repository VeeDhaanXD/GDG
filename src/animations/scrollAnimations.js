import { gsap } from "../lib/gsap";
import { prefersReducedMotion } from "../lib/utils";

/**
 * Generic scroll reveal. Elements are hidden imperatively (so a reduced-motion
 * user or a failed ScrollTrigger never leaves content invisible forever) and
 * revealed once when they enter the viewport.
 */
export function reveal(scope, selector, options = {}) {
  const {
    trigger,
    start = "top 85%",
    y = 44,
    x = 0,
    opacity = 0,
    duration = 0.95,
    stagger = 0.09,
    ease = "power3.out",
    scrub = false,
    once = true,
    scale = 1,
  } = options;

  const targets = gsap.utils.selector(scope)(selector);
  if (!targets.length) return null;

  if (prefersReducedMotion()) return null;

  gsap.set(targets, { autoAlpha: opacity, y, x, scale, willChange: "transform, opacity" });

  const tween = gsap.to(targets, {
    autoAlpha: 1,
    y: 0,
    x: 0,
    scale: 1,
    duration: scrub ? 1 : duration,
    ease,
    stagger,
    onComplete: () => gsap.set(targets, { clearProps: "willChange" }),
    scrollTrigger: {
      trigger: trigger || targets[0],
      start,
      once,
      scrub: scrub || false,
      invalidateOnRefresh: true,
    },
  });

  return tween;
}

/** Masked word-by-word rise for any <SplitHeading>. */
export function revealHeading(scope, options = {}) {
  if (prefersReducedMotion()) return null;
  const q = gsap.utils.selector(scope);
  const words = q("[data-split-word]");
  if (!words.length) return null;

  gsap.set(words, { yPercent: 115 });

  return gsap.to(words, {
    yPercent: 0,
    duration: 1.05,
    ease: "power4.out",
    stagger: 0.05,
    scrollTrigger: {
      trigger: options.trigger || words[0],
      start: options.start || "top 88%",
      once: true,
    },
  });
}

/** Expanding hairline used as an editorial divider. */
export function expandRule(scope, selector, options = {}) {
  if (prefersReducedMotion()) return null;
  const targets = gsap.utils.selector(scope)(selector);
  if (!targets.length) return null;

  gsap.set(targets, { scaleX: 0, transformOrigin: "left center" });

  return gsap.to(targets, {
    scaleX: 1,
    duration: 1.15,
    ease: "power4.out",
    stagger: 0.12,
    scrollTrigger: {
      trigger: options.trigger || targets[0],
      start: options.start || "top 88%",
      once: true,
    },
  });
}

/** Soft parallax for decorative layers inside any section. */
export function parallax(scope, selector, options = {}) {
  if (prefersReducedMotion()) return null;
  const targets = gsap.utils.selector(scope)(selector);
  if (!targets.length) return null;

  const distance = options.distance ?? 60;

  return gsap.to(targets, {
    y: options.y ?? -distance,
    ease: "none",
    scrollTrigger: {
      trigger: options.trigger || scope,
      start: options.start || "top bottom",
      end: options.end || "bottom top",
      scrub: options.scrub ?? 0.8,
    },
  });
}

/** Count-free "stat" reveal: label rises, underline sweeps, note fades. */
export function revealPillars(scope, selector) {
  if (prefersReducedMotion()) return null;
  const q = gsap.utils.selector(scope);
  const items = q(selector);
  if (!items.length) return null;

  gsap.set(q("[data-pillar-index]"), { autoAlpha: 0, y: 26 });
  gsap.set(q("[data-pillar-word]"), { autoAlpha: 0, y: 46 });
  gsap.set(q("[data-pillar-note]"), { autoAlpha: 0, y: 22 });
  gsap.set(q("[data-pillar-rule]"), { scaleX: 0, transformOrigin: "left center" });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: q("[data-pillars]")[0],
      start: "top 82%",
      once: true,
    },
  });

  tl.to(q("[data-pillar-index]"), { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1 })
    .to(q("[data-pillar-word]"), { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.11, ease: "power4.out" }, "-=0.4")
    .to(q("[data-pillar-rule]"), { scaleX: 1, duration: 0.9, stagger: 0.1, ease: "power4.out" }, "-=0.75")
    .to(q("[data-pillar-note]"), { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.09 }, "-=0.65");

  return tl;
}
