"use client";

import Link from "next/link";
import React from "react";
import { ChevronRight, Home } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { MedicalBackdrop } from "@/components/ui/medical-backdrop";

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
    badge: "border-[#0D9488]/25 bg-white/95 text-[#0F766E]",
    dot: "bg-[#0D9488]",
  },
  crimson: {
    badge: "border-[#C81E1E]/25 bg-white/95 text-[#C81E1E]",
    dot: "bg-[#C81E1E]",
  },
  emerald: {
    badge: "border-[#0D7A5F]/25 bg-white/95 text-[#0D7A5F]",
    dot: "bg-[#0D7A5F]",
  },
};

/**
 * PageHero
 * Shared clinical architectural hero header for all secondary pages with rich medical
 * geometric shapes, accessible pill breadcrumbs, and KPI strip or 12-column right slot.
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
      className={`relative overflow-hidden border-b border-sky-200/70 bg-gradient-to-br from-[#EAF3FE] via-[#F4F9FF] to-[#ECFEFF] py-10 sm:py-12 lg:py-14 ${className}`}
    >
      <MedicalBackdrop variant="hero" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Pill Breadcrumb Bar */}
        <nav
          aria-label={t({ fr: "Fil d'Ariane", en: "Breadcrumb" })}
          className="inline-flex max-w-full flex-wrap items-center rounded-full border border-sky-200/80 bg-white/90 px-3.5 py-1.5 text-xs font-medium text-[#475569] shadow-sm backdrop-blur-md"
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
                    <span className="font-semibold text-[#071A33]">{crumb.label}</span>
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

              <h1 className="mt-4 break-words text-3xl font-extrabold leading-[1.1] tracking-tight text-[#071A33] sm:text-4xl lg:text-[44px]">
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
                      className="relative min-w-0 overflow-hidden rounded-2xl border border-sky-200/90 bg-white/90 px-3.5 py-3 shadow-premium backdrop-blur-xl sm:px-4"
                    >
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-4 -top-4 h-14 w-14 rounded-full bg-[#0EA5E9]/10 blur-sm"
                      />
                      <span
                        aria-hidden="true"
                        className="mb-2 block h-1 w-8 rounded-full bg-gradient-to-r from-[#0A66C2] to-[#0D9488] shadow-[0_0_10px_rgba(14,165,233,0.45)]"
                      />
                      <p className="break-words font-mono text-base font-extrabold text-[#071A33] sm:text-lg">
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

              <h1 className="mt-4 break-words text-3xl font-extrabold leading-[1.1] tracking-tight text-[#071A33] sm:text-4xl lg:text-[44px]">
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
                    className="relative min-w-0 overflow-hidden rounded-2xl border border-sky-200/90 bg-white/90 px-3.5 py-3.5 shadow-premium backdrop-blur-xl sm:px-4"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-4 -top-4 h-14 w-14 rounded-full bg-[#0EA5E9]/10 blur-sm"
                    />
                    <span
                      aria-hidden="true"
                      className="mb-2 block h-1 w-8 rounded-full bg-gradient-to-r from-[#0A66C2] to-[#0D9488] shadow-[0_0_10px_rgba(14,165,233,0.45)]"
                    />
                    <p className="break-words font-mono text-base font-extrabold text-[#071A33] sm:text-lg xl:text-xl">
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
