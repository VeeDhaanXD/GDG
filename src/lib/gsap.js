import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

if (typeof window !== "undefined") {
  gsap.defaults({ duration: 0.9, ease: "power3.out" });
}

export { gsap, ScrollTrigger, ScrollToPlugin };
