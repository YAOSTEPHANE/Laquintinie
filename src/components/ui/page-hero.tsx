"use client";

import Link from "next/link";
import React from "react";
import { ChevronRight, Home } from "lucide-react";
import { useLanguage } from "@/context/language-context";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface HeroStatItem {
  value: string;
  label: string;
}

interface PageHeroProps {
  breadcrumbs: BreadcrumbItem[];
  eyebrow?: string;
  eyebrowTone?: "cobalt" | "gold" | "crimson" | "emerald";
  title: React.ReactNode;
  description?: string;
  stats?: HeroStatItem[];
  actions?: React.ReactNode;
  rightContent?: React.ReactNode;
  className?: string;
}

const EYEBROW_TONES: Record<
  NonNullable<PageHeroProps["eyebrowTone"]>,
  { badge: string; dot: string }
> = {
  cobalt: {
    badge: "border-[#0A66C2]/25 bg-white/90 text-[#0A66C2]",
    dot: "bg-[#0A66C2]",
  },
  gold: {
    badge: "border-[#B8892E]/35 bg-white/90 text-[#8B641A]",
    dot: "bg-[#B8892E]",
  },
  crimson: {
    badge: "border-[#C81E1E]/25 bg-white/90 text-[#C81E1E]",
    dot: "bg-[#C81E1E]",
  },
  emerald: {
    badge: "border-[#0D7A5F]/25 bg-white/90 text-[#0D7A5F]",
    dot: "bg-[#0D7A5F]",
  },
};

/**
 * PageHero
 * Shared architectural hero header for all secondary pages with ambient glows,
 * accessible pill breadcrumbs, KPI strip or 12-column right visual slot.
 */
export function PageHero({
  breadcrumbs,
  eyebrow,
  eyebrowTone = "cobalt",
  title,
  description,
  stats,
  actions,
  rightContent,
  className = "",
}: PageHeroProps) {
  const { t } = useLanguage();
  const tone = EYEBROW_TONES[eyebrowTone];

  return (
    <section
      className={`relative overflow-hidden border-b border-[#08162B]/8 bg-arch-grid py-10 sm:py-12 lg:py-14 ${className}`}
    >
      {/* Ambient architectural radial glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-36 -top-36 h-[420px] w-[420px] rounded-full bg-[#0A66C2]/8 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 bottom-0 h-[340px] w-[340px] rounded-full bg-[#DFB860]/12 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Pill Breadcrumb Bar */}
        <nav
          aria-label={t({ fr: "Fil d'Ariane", en: "Breadcrumb" })}
          className="inline-flex max-w-full flex-wrap items-center rounded-full border border-[#08162B]/10 bg-white/85 px-3.5 py-1.5 text-xs font-medium text-[#475569] shadow-sm backdrop-blur-md"
        >
          <ol className="flex flex-wrap items-center gap-1.5">
            {breadcrumbs.map((crumb, index) => {
              const isFirst = index === 0;
              const isLast = index === breadcrumbs.length - 1;
              return (
                <li key={`${crumb.label}-${index}`} className="inline-flex items-center gap-1.5">
                  {index > 0 ? (
                    <ChevronRight className="h-3.5 w-3.5 text-[#475569]/60" aria-hidden="true" />
                  ) : null}
                  {crumb.href && !isLast ? (
                    <Link
                      href={crumb.href}
                      className="inline-flex items-center gap-1.5 rounded-full transition-colors hover:text-[#0A66C2]"
                    >
                      {isFirst ? <Home className="h-3.5 w-3.5 text-[#0A66C2]" aria-hidden="true" /> : null}
                      <span>{crumb.label}</span>
                    </Link>
                  ) : (
                    <span className="font-semibold text-[#08162B]">{crumb.label}</span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        {rightContent ? (
          <div className="mt-7 grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="min-w-0 lg:col-span-7">
              {eyebrow ? (
                <span
                  className={`inline-flex max-w-full items-center gap-2 rounded-full border px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] shadow-sm backdrop-blur-md ${tone.badge}`}
                >
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${tone.dot}`} aria-hidden="true" />
                  <span className="truncate">{eyebrow}</span>
                </span>
              ) : null}

              <h1 className="mt-4 break-words text-3xl font-extrabold leading-[1.1] tracking-tight text-[#08162B] sm:text-4xl lg:text-[44px]">
                {title}
              </h1>

              {description ? (
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#475569] sm:text-base">
                  {description}
                </p>
              ) : null}

              {actions ? <div className="mt-6 flex flex-wrap items-center gap-3">{actions}</div> : null}

              {stats && stats.length > 0 ? (
                <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="min-w-0 rounded-2xl border border-white/90 bg-white/90 px-3.5 py-3 shadow-sm backdrop-blur-md sm:px-4"
                    >
                      <p className="break-words font-mono text-base font-extrabold text-[#08162B] sm:text-lg">
                        {stat.value}
                      </p>
                      <p className="mt-0.5 text-[11px] font-medium text-[#475569]">{stat.label}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="min-w-0 lg:col-span-5">{rightContent}</div>
          </div>
        ) : (
          <div className="mt-7 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="min-w-0 max-w-3xl">
              {eyebrow ? (
                <span
                  className={`inline-flex max-w-full items-center gap-2 rounded-full border px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] shadow-sm backdrop-blur-md ${tone.badge}`}
                >
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${tone.dot}`} aria-hidden="true" />
                  <span className="truncate">{eyebrow}</span>
                </span>
              ) : null}

              <h1 className="mt-4 break-words text-3xl font-extrabold leading-[1.1] tracking-tight text-[#08162B] sm:text-4xl lg:text-[44px]">
                {title}
              </h1>

              {description ? (
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#475569] sm:text-base">
                  {description}
                </p>
              ) : null}

              {actions ? <div className="mt-6 flex flex-wrap items-center gap-3">{actions}</div> : null}
            </div>

            {stats && stats.length > 0 ? (
              <div className="grid w-full shrink-0 grid-cols-2 gap-3 sm:grid-cols-4 lg:w-auto lg:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="min-w-0 rounded-2xl border border-white/90 bg-white/90 px-3.5 py-3.5 shadow-sm backdrop-blur-md sm:px-4"
                  >
                    <p className="break-words font-mono text-base font-extrabold text-[#08162B] sm:text-lg xl:text-xl">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-[11px] font-medium text-[#475569]">{stat.label}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
