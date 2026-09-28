import { useState } from "react";
import Icon from "./Icon";

export const ACCENT = {
  blue: { hex: "#4285f4", deep: "#10264a" },
  red: { hex: "#ea4335", deep: "#451611" },
  yellow: { hex: "#fbbc04", deep: "#453605" },
  green: { hex: "#34a853", deep: "#0f3620" },
};

/**
 * Editorial portrait for team members. Uses `member.image` when present and
 * falls back to the generated avatar if the photo fails to load.
 */
export function Portrait({ member, className = "" }) {
  const accent = ACCENT[member.accent] || ACCENT.blue;
  const uid = `portrait-${member.id}`;
  const [failed, setFailed] = useState(false);
  const initials = String(member.name)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  if (member.image && !failed) {
    return (
      <img
        src={member.image}
        alt={`${member.name}, ${member.role}`}
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  return (
    <svg
      viewBox="0 0 480 620"
      role="img"
      aria-label={`Placeholder portrait for ${member.name}`}
      className={`h-full w-full ${className}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent.hex} stopOpacity="0.55" />
          <stop offset="55%" stopColor={accent.deep} stopOpacity="0.95" />
          <stop offset="100%" stopColor="#07080f" />
        </linearGradient>
        <radialGradient id={`${uid}-glow`} cx="50%" cy="46%" r="55%">
          <stop offset="0%" stopColor={accent.hex} stopOpacity="0.6" />
          <stop offset="100%" stopColor={accent.hex} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-disc`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1e2b" />
          <stop offset="100%" stopColor="#0a0c14" />
        </linearGradient>
        <pattern id={`${uid}-dots`} width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1.4" cy="1.4" r="1.4" fill="#ffffff" opacity="0.18" />
        </pattern>
        <filter id={`${uid}-grain`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>

      <rect width="480" height="620" fill="#0a0c14" />
      <rect width="480" height="620" fill={`url(#${uid}-bg)`} />
      <rect width="480" height="620" fill={`url(#${uid}-dots)`} opacity="0.6" />
      <rect width="480" height="620" fill={`url(#${uid}-glow)`} />

      <circle cx="240" cy="300" r="196" fill="none" stroke="#ffffff" strokeOpacity="0.12" />
      <circle
        cx="240"
        cy="300"
        r="152"
        fill="none"
        stroke={accent.hex}
        strokeOpacity="0.4"
        strokeDasharray="2 10"
      />

      <text
        x="452"
        y="600"
        textAnchor="end"
        fontFamily="Space Grotesk, sans-serif"
        fontSize="140"
        fontWeight="700"
        fill="#ffffff"
        opacity="0.13"
      >
        {member.id}
      </text>

      <circle
        cx="240"
        cy="300"
        r="104"
        fill={`url(#${uid}-disc)`}
        stroke={accent.hex}
        strokeOpacity="0.85"
        strokeWidth="2"
      />
      <circle cx="240" cy="300" r="118" fill="none" stroke="#ffffff" strokeOpacity="0.14" />

      <text
        x="240"
        y="300"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="Space Grotesk, sans-serif"
        fontSize="74"
        fontWeight="600"
        letterSpacing="2"
        fill={accent.hex}
        opacity="0.95"
      >
        {initials}
      </text>

      <path
        d="M150 470 C170 428 202 408 240 408 C278 408 310 428 330 470"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.16"
        strokeWidth="2"
      />

      <rect
        width="480"
        height="620"
        filter={`url(#${uid}-grain)`}
        opacity="0.07"
        style={{ mixBlendMode: "overlay" }}
      />
    </svg>
  );
}

/**
 * Gallery tile artwork. Renders `item.image` when present and falls back to a
 * generated plate so the grid still reads as designed before photos land.
 */
export function GalleryPlate({ item, className = "" }) {
  const accent = ACCENT[item.accent] || ACCENT.blue;
  const [failed, setFailed] = useState(false);

  if (item.image && !failed) {
    return (
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        style={{ objectPosition: item.fit || "50% 50%" }}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      role="img"
      aria-label={`${item.title} — photo coming soon`}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 100% at 14% 10%, ${accent.hex}55 0%, transparent 58%), radial-gradient(95% 90% at 90% 95%, ${accent.deep} 0%, transparent 64%), linear-gradient(155deg, #0d101a 0%, #07080f 100%)`,
        }}
      />
      <div className="bg-grid absolute inset-0 opacity-40" />
      <div
        aria-hidden="true"
        className="absolute -right-14 -top-14 h-56 w-56 rounded-full blur-3xl"
        style={{ background: accent.hex, opacity: 0.26 }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-16 -left-16 h-52 w-52 rounded-full blur-3xl"
        style={{ background: accent.deep, opacity: 0.55 }}
      />

      <Icon
        name={item.icon}
        className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 opacity-[0.16] sm:h-28 sm:w-28 lg:h-32 lg:w-32"
        strokeWidth={1}
      />
    </div>
  );
}

/**
 * Abstract "poster" used for event imagery.
 * Set `event.image` to a real photo URL to use an <img> instead.
 */
export function EventPoster({ event, className = "" }) {
  const accent = ACCENT[event.accent] || ACCENT.blue;

  if (event.image) {
    return (
      <img
        src={event.image}
        alt={event.title}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover/event:scale-105 ${className}`}
      />
    );
  }

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      role="img"
      aria-label={`${event.title} poster`}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 100% at 12% 8%, ${accent.hex}59 0%, transparent 58%), radial-gradient(95% 85% at 92% 96%, ${accent.deep} 0%, transparent 62%), linear-gradient(160deg, #0d101a 0%, #07080f 100%)`,
        }}
      />
      <div className="bg-grid absolute inset-0 opacity-40" />
      <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full blur-3xl" style={{ background: accent.hex, opacity: 0.28 }} />

      <Icon
        name={event.icon}
        className="absolute bottom-5 right-5 h-28 w-28 opacity-[0.14] sm:h-32 sm:w-32"
        strokeWidth={1}
      />

      <div className="absolute left-5 top-5 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent.hex }} />
        <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/60">
          {event.category}
        </span>
      </div>

      <div className="absolute bottom-5 left-5 font-display text-[46px] font-semibold leading-none text-white/12 sm:text-[56px]">
        {event.id}
      </div>
    </div>
  );
}
