import { gsap } from "../lib/gsap";
import { prefersReducedMotion } from "../lib/utils";

/**
 * Scroll-scrubbed horizontal drift for an event photo track. When the track is
 * wider than its viewport the whole strip pans across (direction decides which
 * edge it starts from); shorter tracks get a gentle parallax nudge instead.
 */
export function eventTrackDrift(scope, direction = 1) {
  if (prefersReducedMotion()) return null;

  const q = gsap.utils.selector(scope);
  const track = q("[data-event-track]")[0];
  if (!track) return null;

  const parent = track.parentElement;
  const maxShift = () => Math.max(0, track.scrollWidth - (parent?.clientWidth || 0));

  const useFullPan = maxShift() > 24;

  const tween = gsap.fromTo(
    track,
    {
      x: () => (useFullPan ? (direction > 0 ? 0 : -maxShift()) : 0),
      xPercent: () => (useFullPan ? 0 : direction > 0 ? 0 : -7),
    },
    {
      x: () => (useFullPan ? (direction > 0 ? -maxShift() : 0) : 0),
      xPercent: () => (useFullPan ? 0 : direction > 0 ? -7 : 0),
      ease: "none",
      scrollTrigger: {
        trigger: scope,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.7,
        invalidateOnRefresh: true,
      },
    },
  );

  return tween;
}
