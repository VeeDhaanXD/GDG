import {
  Wrench,
  Mic,
  Terminal,
  Cloud,
  Trophy,
  Users,
  Sparkles,
  Gift,
  Code,
  Cpu,
  Rocket,
  Calendar,
} from "lucide-react";

const ICONS = {
  Wrench,
  Mic,
  Terminal,
  Cloud,
  Trophy,
  Users,
  Sparkles,
  Gift,
  Code,
  Cpu,
  Rocket,
  Calendar,
};

export default function Icon({ name, className = "h-6 w-6", strokeWidth = 1.5 }) {
  const Cmp = ICONS[name] || Sparkles;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
