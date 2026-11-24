"use client";

import Image from "next/image";
import React from "react";

interface ArchitecturalArchFrameProps {
  src: string;
  alt: string;
  badge?: string;
  caption?: string;
  priority?: boolean;
  aspectClass?: string;
  sizes?: string;
  className?: string;
}

/**
 * ArchitecturalArchFrame
 * Encases photography inside a sculpted Laquintinie-inspired arch with an offset
 * champagne-gold wireframe contour and inner specular bevel (clean, unobstructed photo).
 */
export function ArchitecturalArchFrame({
  src,
  alt,
  priority = false,
  aspectClass = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 580px, 100vw",
  className = "",
}: ArchitecturalArchFrameProps) {
  return (
    <div className={`relative group p-2 sm:p-3 ${className}`}>
      {/* Contained architectural gold + cobalt outline inside safe padding (never overflows) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-1 translate-x-1 translate-y-1 rounded-t-[4rem] rounded-bl-[2.5rem] rounded-br-2xl border border-[#B8892E]/45 transition-transform duration-500 group-hover:translate-x-1.5 group-hover:translate-y-1.5"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-1.5 -translate-x-0.5 -translate-y-0.5 rounded-t-[3.75rem] rounded-bl-[2.25rem] rounded-br-xl border border-[#0A66C2]/25"
      />

      {/* Main sculpted arch image container */}
      <div
        className={`relative overflow-hidden rounded-t-[3.5rem] rounded-bl-[2.25rem] rounded-br-xl bg-[#EFECE6] shadow-premium ring-1 ring-white/80 ${aspectClass}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          preload={priority}
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
    </div>
  );
}

interface ChamferedEditorialFrameProps {
  src: string;
  alt: string;
  aspectClass?: string;
  sizes?: string;
  className?: string;
  label?: string;
}

/**
 * ChamferedEditorialFrame
 * Asymmetric chamfered polygon framing for heritage & clinical photography,
 * paired with architectural corner brackets contained within safe padding.
 */
export function ChamferedEditorialFrame({
  src,
  alt,
  aspectClass = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 540px, 100vw",
  className = "",
}: ChamferedEditorialFrameProps) {
  return (
    <div className={`relative group p-2 sm:p-2.5 ${className}`}>
      {/* Contained corner accent brackets */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-[#B8892E]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-[#0A66C2]"
      />

      <div
        className={`clip-chamfer relative overflow-hidden bg-[#EFECE6] shadow-premium ${aspectClass}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
    </div>
  );
}

interface OverlappingImageShowcaseProps {
  primarySrc: string;
  primaryAlt: string;
  primaryBadge?: string;
  secondarySrc: string;
  secondaryAlt: string;
  secondaryCaption?: string;
  floatingMetric?: {
    value: string;
    label: string;
  };
  ringColorClass?: string;
  priority?: boolean;
  align?: "left" | "right";
  className?: string;
}

/**
 * OverlappingImageShowcase
 * Multi-layer overlapping composition strictly contained within its column bounds:
 * - Primary photo inside an ArchitecturalArchFrame
 * - Secondary photo in a sculpted squircle anchored inside the lower corner
 * - Zero text overlays and zero negative horizontal bleed
 */
export function OverlappingImageShowcase({
  primarySrc,
  primaryAlt,
  secondarySrc,
  secondaryAlt,
  ringColorClass = "ring-[#F8F7F4]",
  priority = false,
  align = "left",
  className = "",
}: OverlappingImageShowcaseProps) {
  const secondaryPos =
    align === "left"
      ? "bottom-0 left-2 sm:left-3"
      : "bottom-0 right-2 sm:right-3";

  return (
    <div className={`relative pb-8 sm:pb-10 ${className}`}>
      <ArchitecturalArchFrame
        src={primarySrc}
        alt={primaryAlt}
        priority={priority}
        aspectClass="aspect-[5/4] sm:aspect-[16/13]"
        sizes="(min-width: 1024px) 620px, 100vw"
      />

      {/* Overlapping secondary framed image contained within bounds */}
      <div
        className={`absolute ${secondaryPos} z-10 w-[42%] max-w-[220px] overflow-hidden rounded-2xl bg-[#08162B] shadow-2xl ring-4 sm:rounded-3xl sm:ring-6 ${ringColorClass} transition-transform duration-500 hover:-translate-y-1`}
      >
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={secondarySrc}
            alt={secondaryAlt}
            fill
            sizes="220px"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

interface PractitionerPortraitFrameProps {
  src?: string;
  name: string;
  accentColor?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * PractitionerPortraitFrame
 * Sculpted arch-capsule portrait frame with gold hairline accent.
 * When no photo exists, renders a refined monogram crest instead of a blank box.
 */
export function PractitionerPortraitFrame({
  src,
  name,
  accentColor = "#0A66C2",
  size = "md",
  className = "",
}: PractitionerPortraitFrameProps) {
  const initials = name
    .replace(/^(Dr|Pr|Mme|M\.)\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  const sizeClasses =
    size === "sm"
      ? "h-16 w-16 rounded-2xl"
      : size === "lg"
        ? "aspect-[4/5] w-full rounded-t-[3rem] rounded-b-2xl"
        : "h-24 w-24 rounded-t-[2rem] rounded-b-2xl";

  return (
    <div
      className={`relative shrink-0 overflow-hidden border border-[#B8892E]/35 bg-[#EFECE6] shadow-sm ${sizeClasses} ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={name}
          fill
          sizes={size === "lg" ? "360px" : "120px"}
          className="object-cover object-top"
        />
      ) : (
        <div
          className="bg-dot-matrix flex h-full w-full items-center justify-center"
          style={{ backgroundColor: `${accentColor}12` }}
        >
          <span
            className="font-serif text-xl font-semibold tracking-wider"
            style={{ color: accentColor }}
          >
            {initials || "HL"}
          </span>
        </div>
      )}
    </div>
  );
}
