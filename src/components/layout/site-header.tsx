"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Compass,
  FlaskConical,
  HeartHandshake,
  HeartPulse,
  Home,
  Mail,
  MapPin,
  Menu,
  Microscope,
  Newspaper,
  Phone,
  Sparkles,
  Stethoscope,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { useLanguage } from "@/context/language-context";
import {
  DEPARTMENTS,
  HOSPITAL_CONTACT,
  SERVICES,
} from "@/data/hospital-data";
import { MedicalBackdrop } from "@/components/ui/medical-backdrop";

type MegaKey = "poles" | "patient" | "hopital" | null;
type MobileAccordionKey = "poles" | "patient" | "hopital" | null;

export function SiteHeader() {
  const { locale, setLocale, t } = useLanguage();
  const pathname = usePathname();

  const [openMega, setOpenMega] = useState<MegaKey>(null);
  const [activeDeptSlug, setActiveDeptSlug] = useState<string>(DEPARTMENTS[0].slug);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<MobileAccordionKey>("poles");
  const [scrolled, setScrolled] = useState(false);

  const headerContainerRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  const clearHoverTimer = useCallback(() => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const openMegaWithIntent = useCallback(
    (key: Exclude<MegaKey, null>) => {
      clearHoverTimer();
      setOpenMega(key);
    },
    [clearHoverTimer]
  );

  const scheduleMegaClose = useCallback(() => {
    clearHoverTimer();
    closeTimeoutRef.current = window.setTimeout(() => {
      setOpenMega(null);
    }, 150);
  }, [clearHoverTimer]);

  // Passive scroll progress bar & elevated shadow state (constant height -> zero jitter)
  useEffect(() => {
    let rafId = 0;

    const updateScroll = () => {
      rafId = 0;
      const y = window.scrollY;
      setScrolled((prev) => {
        const next = y > 20;
        return prev === next ? prev : next;
      });
      if (scrollProgressRef.current) {
        const doc = document.documentElement;
        const maxScroll = Math.max(1, doc.scrollHeight - doc.clientHeight);
        const progress = Math.min(1, Math.max(0, y / maxScroll));
        scrollProgressRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateScroll);
      }
    };

    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  // Automatically close menus on route navigation
  useEffect(() => {
    setMenuOpen(false);
    setOpenMega(null);
  }, [pathname]);

  // Outside click to close mega menu
  useEffect(() => {
    if (!openMega) return;
    const handlePointerDown = (e: MouseEvent) => {
      if (
        headerContainerRef.current &&
        !headerContainerRef.current.contains(e.target as Node)
      ) {
        setOpenMega(null);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [openMega]);

  // Escape key closes open panels
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (menuOpen) {
        setMenuOpen(false);
      } else if (openMega) {
        setOpenMega(null);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [menuOpen, openMega]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

  const activeDept = useMemo(
    () => DEPARTMENTS.find((d) => d.slug === activeDeptSlug) ?? DEPARTMENTS[0],
    [activeDeptSlug]
  );

  const activeDeptServices = useMemo(
    () => SERVICES.filter((s) => s.departmentSlug === activeDept.slug),
    [activeDept.slug]
  );

  const isHomeActive = pathname === "/";
  const isPolesActive =
    pathname.startsWith("/departements") || pathname.startsWith("/services");
  const isHopitalActive = pathname.startsWith("/a-propos");
  const isDoctorsActive = pathname.startsWith("/medecins");
  const isNewsActive = pathname.startsWith("/actualites");

  return (
    <>
      <header className="no-print sticky top-0 z-50 w-full">
        {/* TIER 1 — Full-Width Clinical Institutional Utility Bar (No Urgent items) */}
        <div className="border-b border-sky-400/20 bg-[#071A33] text-white">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-1.5 px-4 py-2 text-xs sm:px-6 lg:px-8">
            <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-1">
              <a
                href={`tel:${HOSPITAL_CONTACT.standardPhoneRaw}`}
                className="inline-flex min-w-0 items-center gap-1.5 font-semibold text-white transition-colors hover:text-[#38BDF8]"
              >
                <Phone className="h-3.5 w-3.5 shrink-0 text-[#38BDF8]" aria-hidden="true" />
                <span className="truncate">
                  {t({ fr: "Standard :", en: "Main desk:" })}{" "}
                  <span className="font-mono text-[#38BDF8]">
                    {HOSPITAL_CONTACT.standardPhone}
                  </span>
                </span>
              </a>

              <span className="hidden text-white/25 sm:inline" aria-hidden="true">
                |
              </span>

              <a
                href={`mailto:${HOSPITAL_CONTACT.email}`}
                className="hidden items-center gap-1.5 text-white/85 transition-colors hover:text-white sm:inline-flex"
              >
                <Mail className="h-3.5 w-3.5 text-[#38BDF8]" aria-hidden="true" />
                <span>{HOSPITAL_CONTACT.email}</span>
              </a>

              <span className="hidden text-white/25 xl:inline" aria-hidden="true">
                |
              </span>

              <Link
                href="/services/maison-du-patient-medecine-generale"
                className="hidden items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2.5 py-0.5 text-emerald-200 transition-colors hover:bg-emerald-500/25 hover:text-white xl:inline-flex"
              >
                <span className="relative flex h-2 w-2 items-center justify-center" aria-hidden="true">
                  <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                <span>
                  {t({
                    fr: "Maison du Patient & Labos ISO",
                    en: "Patient House & ISO Labs",
                  })}
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/#infos"
                className="hidden items-center gap-1.5 text-white/80 transition-colors hover:text-[#38BDF8] lg:inline-flex"
              >
                <MapPin className="h-3.5 w-3.5 text-[#38BDF8]" aria-hidden="true" />
                <span>
                  {HOSPITAL_CONTACT.address}, {HOSPITAL_CONTACT.city}
                </span>
              </Link>

              {/* Segmented Language Switcher */}
              <div
                role="group"
                aria-label={t({ fr: "Choix de la langue", en: "Language selection" })}
                className="inline-flex items-center rounded-lg border border-white/15 bg-white/10 p-0.5"
              >
                <button
                  type="button"
                  lang="fr"
                  aria-pressed={locale === "fr"}
                  onClick={() => setLocale("fr")}
                  className={`rounded-md px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider transition-colors ${locale === "fr"
                    ? "bg-white text-[#08162B]"
                    : "text-white/80 hover:text-white"
                    }`}
                >
                  FR
                </button>
                <button
                  type="button"
                  lang="en"
                  aria-pressed={locale === "en"}
                  onClick={() => setLocale("en")}
                  className={`rounded-md px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider transition-colors ${locale === "en"
                    ? "bg-white text-[#08162B]"
                    : "text-white/80 hover:text-white"
                    }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* TIER 2 — Full-Width Flush Architectural Navigation Bar */}
        <div
          ref={headerContainerRef}
          onMouseLeave={scheduleMegaClose}
          className={`relative w-full border-b transition-colors duration-300 ${scrolled || openMega
            ? "border-[#08162B]/12 bg-white/98 shadow-[0_12px_32px_-12px_rgba(8,22,43,0.12)] backdrop-blur-xl"
            : "border-[#08162B]/8 bg-white/95 backdrop-blur-md"
            }`}
        >
          {/* Passive Scroll-Progress Hairline */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-[#08162B]/5"
          >
            <div
              ref={scrollProgressRef}
              style={{ transform: "scaleX(0)" }}
              className="h-full w-full origin-left bg-gradient-to-r from-[#0A66C2] via-[#0EA5E9] to-[#0D9488]"
            />
          </div>

          <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-2 px-3 sm:gap-3 sm:px-6 lg:h-[76px] lg:px-8">
            {/* Left Brand Lockup */}
            <Link
              href="/"
              onClick={() => {
                setMenuOpen(false);
                setOpenMega(null);
              }}
              className="flex min-w-0 items-center gap-2 rounded-xl py-1 pr-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A66C2] sm:gap-3"
            >
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl border border-[#0A66C2]/25 bg-[#F4F8FC] p-0.5 shadow-xs sm:h-10 sm:w-10 lg:h-11 lg:w-11">
                <Image
                  src="/images/brand/logo-hl.webp"
                  alt={t({
                    fr: "Logo officiel de l'Hôpital Laquintinie de Douala",
                    en: "Official crest of Laquintinie Hospital Douala",
                  })}
                  width={48}
                  height={48}
                  className="h-full w-full rounded-[10px] object-cover"
                />
              </div>
              <span
                aria-hidden="true"
                className="hidden h-8 w-px bg-[#071A33]/12 xl:block"
              />
              <div className="flex min-w-0 flex-col leading-tight">
                <span className="truncate text-[13px] font-extrabold tracking-tight text-[#071A33] sm:text-[15px]">
                  Hôpital Laquintinie
                </span>
                <span className="truncate text-[10px] font-semibold text-[#0A66C2] sm:text-[11px]">
                  {t({ fr: "Centre Hospitalier Public · 1931", en: "Public Referral Hospital · 1931" })}
                </span>
              </div>
            </Link>

            {/* Center Full-Height Architectural Navigation Tabs */}
            <nav
              aria-label={t({ fr: "Navigation principale", en: "Primary navigation" })}
              className="hidden h-full lg:flex"
            >
              <ul className="flex h-full items-stretch gap-0.5 text-[13px] font-bold xl:gap-1 xl:text-[14px]">
                {/* Tab 1: Accueil */}
                <li className="flex" onMouseEnter={scheduleMegaClose}>
                  <Link
                    href="/"
                    className={`relative inline-flex h-full items-center whitespace-nowrap px-2.5 transition-colors focus-visible:outline-2 focus-visible:outline-[#0A66C2] xl:px-3.5 ${isHomeActive && !openMega
                      ? "text-[#0A66C2]"
                      : "text-[#0A1628] hover:text-[#0A66C2]"
                      }`}
                  >
                    <span>{t({ fr: "Accueil", en: "Home" })}</span>
                    {isHomeActive && !openMega ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-2.5 bottom-0 h-[3px] rounded-t-full bg-gradient-to-r from-[#0A66C2] via-[#0EA5E9] to-[#0D9488] shadow-[0_2px_10px_rgba(14,165,233,0.55)] xl:inset-x-3.5"
                      />
                    ) : null}
                  </Link>
                </li>

                {/* Tab 2: Pôles & Services (Mega Menu) */}
                <li className="flex" onMouseEnter={() => openMegaWithIntent("poles")}>
                  <button
                    type="button"
                    aria-expanded={openMega === "poles"}
                    aria-controls="mega-menu-poles"
                    onClick={() =>
                      setOpenMega((prev) => (prev === "poles" ? null : "poles"))
                    }
                    className={`relative inline-flex h-full items-center gap-1 whitespace-nowrap px-2.5 transition-colors focus-visible:outline-2 focus-visible:outline-[#0A66C2] xl:px-3.5 ${openMega === "poles" || isPolesActive
                      ? "text-[#0A66C2]"
                      : "text-[#0A1628] hover:text-[#0A66C2]"
                      }`}
                  >
                    <span>{t({ fr: "Pôles & Services", en: "Care & Units" })}</span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${openMega === "poles" ? "rotate-180" : ""
                        }`}
                      aria-hidden="true"
                    />
                    {openMega === "poles" || isPolesActive ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-2.5 bottom-0 h-[3px] rounded-t-full bg-[#0A66C2] xl:inset-x-3.5"
                      />
                    ) : null}
                  </button>
                </li>

                {/* Tab 3: Espace Patient (Mega Menu) */}
                <li className="flex" onMouseEnter={() => openMegaWithIntent("patient")}>
                  <button
                    type="button"
                    aria-expanded={openMega === "patient"}
                    aria-controls="mega-menu-patient"
                    onClick={() =>
                      setOpenMega((prev) => (prev === "patient" ? null : "patient"))
                    }
                    className={`relative inline-flex h-full items-center gap-1 whitespace-nowrap px-2.5 transition-colors focus-visible:outline-2 focus-visible:outline-[#0A66C2] xl:px-3.5 ${openMega === "patient"
                      ? "text-[#0A66C2]"
                      : "text-[#0A1628] hover:text-[#0A66C2]"
                      }`}
                  >
                    <span>{t({ fr: "Espace Patient", en: "Patient Hub" })}</span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${openMega === "patient" ? "rotate-180" : ""
                        }`}
                      aria-hidden="true"
                    />
                    {openMega === "patient" ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-2.5 bottom-0 h-[3px] rounded-t-full bg-[#0A66C2] xl:inset-x-3.5"
                      />
                    ) : null}
                  </button>
                </li>

                {/* Tab 4: L'Hôpital (Mega Menu) */}
                <li className="flex" onMouseEnter={() => openMegaWithIntent("hopital")}>
                  <button
                    type="button"
                    aria-expanded={openMega === "hopital"}
                    aria-controls="mega-menu-hopital"
                    onClick={() =>
                      setOpenMega((prev) => (prev === "hopital" ? null : "hopital"))
                    }
                    className={`relative inline-flex h-full items-center gap-1 whitespace-nowrap px-2.5 transition-colors focus-visible:outline-2 focus-visible:outline-[#0A66C2] xl:px-3.5 ${openMega === "hopital" || isHopitalActive
                      ? "text-[#0A66C2]"
                      : "text-[#0A1628] hover:text-[#0A66C2]"
                      }`}
                  >
                    <span>{t({ fr: "L'Hôpital", en: "About" })}</span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${openMega === "hopital" ? "rotate-180" : ""
                        }`}
                      aria-hidden="true"
                    />
                    {openMega === "hopital" || isHopitalActive ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-2.5 bottom-0 h-[3px] rounded-t-full bg-[#0A66C2] xl:inset-x-3.5"
                      />
                    ) : null}
                  </button>
                </li>

                {/* Tab 5: Médecins */}
                <li className="flex" onMouseEnter={scheduleMegaClose}>
                  <Link
                    href="/medecins"
                    className={`relative inline-flex h-full items-center gap-1.5 whitespace-nowrap px-2.5 transition-colors focus-visible:outline-2 focus-visible:outline-[#0A66C2] xl:px-3.5 ${isDoctorsActive
                      ? "text-[#0A66C2]"
                      : "text-[#0A1628] hover:text-[#0A66C2]"
                      }`}
                  >
                    <span>{t({ fr: "Médecins", en: "Doctors" })}</span>
                    <span className="hidden rounded-md bg-[#08162B]/8 px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#08162B] xl:inline-block">
                      207
                    </span>
                    {isDoctorsActive ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-2.5 bottom-0 h-[3px] rounded-t-full bg-[#0A66C2] xl:inset-x-3.5"
                      />
                    ) : null}
                  </Link>
                </li>

                {/* Tab 6: Actualités */}
                <li className="flex" onMouseEnter={scheduleMegaClose}>
                  <Link
                    href="/actualites"
                    className={`relative inline-flex h-full items-center whitespace-nowrap px-2.5 transition-colors focus-visible:outline-2 focus-visible:outline-[#0A66C2] xl:px-3.5 ${isNewsActive
                      ? "text-[#0A66C2]"
                      : "text-[#0A1628] hover:text-[#0A66C2]"
                      }`}
                  >
                    <span>{t({ fr: "Actualités", en: "News" })}</span>
                    {isNewsActive ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-2.5 bottom-0 h-[3px] rounded-t-full bg-[#0A66C2] xl:inset-x-3.5"
                      />
                    ) : null}
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Right Action Cluster (Zero search bar, zero Urgences button) */}
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
              {/* Book Appointment Primary CTA */}
              <Link
                href="/rendez-vous"
                onClick={() => {
                  setMenuOpen(false);
                  setOpenMega(null);
                }}
                className="group inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#0A66C2] to-[#0284C7] px-3 py-2 text-xs font-bold text-white shadow-[0_10px_24px_-6px_rgba(10,102,194,0.55)] transition-all hover:from-[#071A33] hover:to-[#0C2547] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A66C2] sm:gap-2 sm:px-4 sm:py-2.5 xl:px-5 xl:text-sm"
              >
                <Calendar className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden="true" />
                <span className="hidden xl:inline">
                  {t({ fr: "Prendre rendez-vous", en: "Book appointment" })}
                </span>
                <span className="xl:hidden">
                  {t({ fr: "Rendez-vous", en: "Book" })}
                </span>
                <ArrowUpRight
                  className="hidden h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:inline-block"
                  aria-hidden="true"
                />
              </Link>

              {/* Mobile / Tablet Slide-Over Drawer Toggle */}
              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation-drawer"
                aria-label={
                  menuOpen
                    ? t({ fr: "Fermer le menu", en: "Close menu" })
                    : t({ fr: "Ouvrir le menu", en: "Open menu" })
                }
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-sky-200 bg-[#F4F8FC] text-[#071A33] transition-colors hover:bg-[#071A33] hover:text-white lg:hidden"
              >
                {menuOpen ? (
                  <X className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* ==============================================================
              FULL-WIDTH FLUSH DOCKED MEGA-MENU PANELS
              ============================================================== */}
          {openMega === "poles" ? (
            <div
              id="mega-menu-poles"
              onMouseEnter={clearHoverTimer}
              className="shadow-mega animate-mega-reveal absolute inset-x-0 top-full z-50 hidden max-h-[calc(100vh-130px)] overflow-y-auto border-b border-[#08162B]/12 bg-white/98 backdrop-blur-2xl lg:block"
            >
              <div className="mx-auto max-w-7xl px-6 py-7 lg:px-8">
                <div className="grid grid-cols-12 gap-6">
                  {/* Col 1: 10 Departments Selector */}
                  <div className="col-span-5 min-w-0 border-r border-[#08162B]/10 pr-5">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0A66C2]">
                        {t({ fr: "Nos 10 Départements", en: "Our 10 Departments" })}
                      </p>
                      <Link
                        href="/departements"
                        onClick={() => setOpenMega(null)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#08162B] hover:text-[#0A66C2]"
                      >
                        {t({ fr: "Tout voir", en: "View all" })}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-1.5">
                      {DEPARTMENTS.map((dept) => {
                        const isHovered = dept.slug === activeDept.slug;
                        return (
                          <Link
                            key={dept.slug}
                            href={`/departements#${dept.slug}`}
                            onMouseEnter={() => setActiveDeptSlug(dept.slug)}
                            onFocus={() => setActiveDeptSlug(dept.slug)}
                            onClick={() => setOpenMega(null)}
                            className={`group flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-all ${isHovered
                              ? "bg-[#071A33] text-white shadow-sm"
                              : "bg-[#F2F7FC] text-[#071A33] hover:bg-[#E8F2FC]"
                              }`}
                          >
                            <span className="flex min-w-0 items-center gap-2">
                              <span
                                className="h-2 w-2 shrink-0 rounded-full"
                                style={{ backgroundColor: dept.accentColor }}
                                aria-hidden="true"
                              />
                              <span className="truncate">{t(dept.shortName)}</span>
                            </span>
                            <span
                              className={`font-mono text-[10px] ${isHovered ? "text-[#38BDF8]" : "text-[#475569]"
                                }`}
                            >
                              {dept.code}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Col 2: Live Active Department & Associated Services Preview */}
                  <div className="col-span-4 flex min-w-0 flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${activeDept.badgeBg}`}
                        >
                          {t({ fr: "Pôle", en: "Dept" })} {activeDept.code}
                        </span>
                        <span className="truncate text-[11px] font-medium text-[#475569]">
                          {t(activeDept.building)}
                        </span>
                      </div>

                      <h3 className="mt-2.5 text-base font-extrabold text-[#071A33]">
                        {t(activeDept.name)}
                      </h3>
                      <p className="mt-1 text-xs font-medium text-[#0A66C2]">
                        {activeDept.chief}
                      </p>
                      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#475569]">
                        {t(activeDept.summary)}
                      </p>

                      <div className="mt-3.5 space-y-1.5">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#475569]">
                          {t({ fr: "Unités & fiches détaillées", en: "Units & fee sheets" })}
                        </p>
                        {activeDeptServices.length > 0 ? (
                          activeDeptServices.slice(0, 3).map((svc) => (
                            <Link
                              key={svc.slug}
                              href={`/services/${svc.slug}`}
                              onClick={() => setOpenMega(null)}
                              className="group flex items-center justify-between gap-3 rounded-xl border border-[#071A33]/8 bg-[#F2F7FC] px-3 py-2 transition-all hover:border-[#0A66C2] hover:bg-white"
                            >
                              <span className="truncate text-xs font-bold text-[#071A33] group-hover:text-[#0A66C2]">
                                {t(svc.name)}
                              </span>
                              <span className="shrink-0 font-mono text-[10px] font-bold text-[#0A66C2]">
                                {svc.exams[0]?.price ?? "4 000 FCFA"}
                              </span>
                            </Link>
                          ))
                        ) : (
                          <Link
                            href={`/departements#${activeDept.slug}`}
                            onClick={() => setOpenMega(null)}
                            className="flex items-center justify-between rounded-xl border border-[#071A33]/8 bg-[#F2F7FC] px-3 py-2.5 text-xs font-bold text-[#071A33] hover:border-[#0A66C2]"
                          >
                            <span>
                              {t({
                                fr: "Consulter le détail du département",
                                en: "View department details",
                              })}
                            </span>
                            <ArrowUpRight className="h-3.5 w-3.5 text-[#0A66C2]" aria-hidden="true" />
                          </Link>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2 border-t border-[#071A33]/10 pt-3">
                      <Link
                        href={`/departements#${activeDept.slug}`}
                        onClick={() => setOpenMega(null)}
                        className="rounded-xl border border-[#071A33]/15 bg-white px-3.5 py-1.5 text-xs font-bold text-[#071A33] hover:border-[#0A66C2]"
                      >
                        {t({ fr: "Fiche pôle", en: "Dept page" })}
                      </Link>
                      <Link
                        href={`/rendez-vous?dept=${activeDept.slug}`}
                        onClick={() => setOpenMega(null)}
                        className="inline-flex items-center gap-1 rounded-xl bg-[#0A66C2] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#071A33]"
                      >
                        <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                        {t({ fr: "Prendre RDV", en: "Book slot" })}
                      </Link>
                    </div>
                  </div>

                  {/* Col 3: Clinical Spotlight Card */}
                  <div className="col-span-3 min-w-0">
                    <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-[#071A33] p-5 text-white">
                      <MedicalBackdrop variant="dark-clinical" />
                      <div className="relative">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/35 bg-sky-400/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#38BDF8]">
                          <FlaskConical className="h-3 w-3" aria-hidden="true" />
                          {t({ fr: "Qualité certifiée", en: "ISO Certified" })}
                        </span>
                        <h4 className="mt-3 text-base font-extrabold leading-snug">
                          {t({
                            fr: "3 Laboratoires Accrédités ISO & Plateau 24h/24",
                            en: "3 ISO-Accredited Labs & 24/7 Platform",
                          })}
                        </h4>
                        <p className="mt-2 text-xs leading-relaxed text-slate-300">
                          {t({
                            fr: "Analyses biologiques jour et nuit, imagerie scanner et pharmacie centrale ouverte en continu.",
                            en: "Round-the-clock clinical lab diagnostics, CT imaging, and 24/7 central pharmacy.",
                          })}
                        </p>
                      </div>

                      <div className="relative mt-5 space-y-2">
                        <Link
                          href="/services/laboratoire-central-iso"
                          onClick={() => setOpenMega(null)}
                          className="flex items-center justify-between rounded-xl bg-white/10 px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-[#0A66C2]"
                        >
                          <span>{t({ fr: "Laboratoire ISO", en: "ISO Laboratory" })}</span>
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>
                        <Link
                          href="/#tarifs"
                          onClick={() => setOpenMega(null)}
                          className="flex items-center justify-between rounded-xl border border-sky-300/25 px-3.5 py-2 text-xs font-semibold text-[#38BDF8] transition-colors hover:bg-white/10"
                        >
                          <span>{t({ fr: "Grille des tarifs", en: "Fee schedule" })}</span>
                          <Wallet className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {openMega === "patient" ? (
            <div
              id="mega-menu-patient"
              onMouseEnter={clearHoverTimer}
              className="shadow-mega animate-mega-reveal absolute inset-x-0 top-full z-50 hidden max-h-[calc(100vh-130px)] overflow-y-auto border-b border-[#08162B]/12 bg-white/98 backdrop-blur-2xl lg:block"
            >
              <div className="mx-auto max-w-7xl px-6 py-7 lg:px-8">
                <div className="grid grid-cols-12 gap-6">
                  {/* Col 1: Consultations & Tarifs */}
                  <div className="col-span-4 min-w-0 space-y-2">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0A66C2]">
                      {t({ fr: "Consultations & Tarifs", en: "Appointments & Fees" })}
                    </p>
                    {[
                      {
                        href: "/rendez-vous",
                        icon: Calendar,
                        title: { fr: "Prendre rendez-vous", en: "Book an appointment" },
                        desc: {
                          fr: "Réservation en ligne sans compte + reçu QR code",
                          en: "Online booking with no account + QR receipt",
                        },
                      },
                      {
                        href: "/#parcours",
                        icon: Compass,
                        title: { fr: "Votre parcours en 5 étapes", en: "5-step patient journey" },
                        desc: {
                          fr: "Avant, pendant et après votre consultation",
                          en: "Before, during, and after your visit",
                        },
                      },
                      {
                        href: "/#tarifs",
                        icon: Wallet,
                        title: { fr: "Tarifs indicatifs", en: "Indicative fees" },
                        desc: {
                          fr: "Consultations dès 4 000 FCFA · Mobile Money & CB",
                          en: "Visits from 4,000 FCFA · Mobile Money & Card",
                        },
                      },
                      {
                        href: "/#partenaires",
                        icon: HeartHandshake,
                        title: { fr: "Assureurs & partenaires", en: "Insurers & partners" },
                        desc: {
                          fr: "24 entreprises & mutuelles conventionnées",
                          en: "24 accredited insurers & corporate plans",
                        },
                      },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setOpenMega(null)}
                          className="group flex items-start gap-3 rounded-2xl p-2.5 transition-colors hover:bg-[#F2F7FC]"
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E8F2FC] text-[#0A66C2] transition-colors group-hover:bg-[#0A66C2] group-hover:text-white">
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          </span>
                          <div>
                            <p className="text-sm font-bold text-[#08162B] group-hover:text-[#0A66C2]">
                              {t(item.title)}
                            </p>
                            <p className="text-xs text-[#475569]">{t(item.desc)}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Col 2: Services d'Appui & Accompagnement */}
                  <div className="col-span-4 space-y-2 border-x border-[#08162B]/10 px-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0D7A5F]">
                      {t({ fr: "Accueil & Plateaux Techniques", en: "Support & Diagnostics" })}
                    </p>
                    {[
                      {
                        href: "/services/maison-du-patient-medecine-generale",
                        title: { fr: "Maison du Patient", en: "Patient House" },
                        desc: { fr: "Accueil, écoute & médiation", en: "Guidance, support & advocacy" },
                        badge: "24h/24",
                      },
                      {
                        href: "/services/laboratoire-central-iso",
                        title: { fr: "Laboratoire Central ISO", en: "ISO Central Laboratory" },
                        desc: { fr: "3 unités biologiques accréditées", en: "3 accredited diagnostic units" },
                        badge: "ISO",
                      },
                      {
                        href: "/services/imagerie-radiologie-scanner",
                        title: { fr: "Imagerie & Scanner", en: "Imaging & CT Scan" },
                        desc: { fr: "Radiologie, Doppler & mammographie", en: "Radiology, Doppler & mammography" },
                        badge: "Imagerie",
                      },
                      {
                        href: "/services/pharmacie-hospitaliere",
                        title: { fr: "Pharmacie Centrale", en: "Central Pharmacy" },
                        desc: { fr: "Médicaments essentiels jour et nuit", en: "Dispensing day and night" },
                        badge: "24h/24",
                      },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpenMega(null)}
                        className="group flex items-center justify-between gap-3 rounded-2xl border border-transparent p-2.5 transition-all hover:border-[#0A66C2]/15 hover:bg-[#F2F7FC]"
                      >
                        <div>
                          <p className="text-sm font-bold text-[#08162B] group-hover:text-[#0A66C2]">
                            {t(item.title)}
                          </p>
                          <p className="text-xs text-[#475569]">{t(item.desc)}</p>
                        </div>
                        <span className="shrink-0 rounded-full bg-[#E8F2FC] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#0A66C2]">
                          {item.badge}
                        </span>
                      </Link>
                    ))}
                  </div>

                  {/* Col 3: Infos Pratiques Card */}
                  <div className="col-span-4">
                    <div className="flex h-full flex-col justify-between rounded-2xl border border-sky-200/70 bg-[#F2F7FC] p-5">
                      <div>
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#0D9488]">
                          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                          {t({ fr: "Infos pratiques & Visites", en: "Practical Info & Visits" })}
                        </span>
                        <dl className="mt-3 space-y-2 text-xs">
                          <div className="flex justify-between rounded-xl bg-white px-3 py-2">
                            <dt className="text-[#475569]">
                              {t({ fr: "Consultations", en: "Clinics" })}
                            </dt>
                            <dd className="font-mono font-bold text-[#071A33]">07h30 – 15h30</dd>
                          </div>
                          <div className="flex justify-between rounded-xl bg-white px-3 py-2">
                            <dt className="text-[#475569]">
                              {t({ fr: "Visites malades", en: "Visiting hours" })}
                            </dt>
                            <dd className="font-mono font-bold text-[#071A33]">12h–14h · 17h–19h</dd>
                          </div>
                        </dl>
                        <p className="mt-3 flex items-start gap-2 text-xs text-[#475569]">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0D9488]" aria-hidden="true" />
                          <span>
                            {t({
                              fr: "Pensez à apporter : CNI, carnet médical, ordonnances et carte d'assurance.",
                              en: "Please bring: ID card, medical booklet, prescriptions & insurance card.",
                            })}
                          </span>
                        </p>
                      </div>

                      <Link
                        href="/#infos"
                        onClick={() => setOpenMega(null)}
                        className="mt-4 inline-flex items-center justify-between rounded-xl bg-[#071A33] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#0A66C2]"
                      >
                        <span>{t({ fr: "Plan d'accès & contacts", en: "Campus map & contacts" })}</span>
                        <MapPin className="h-4 w-4 text-[#38BDF8]" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {openMega === "hopital" ? (
            <div
              id="mega-menu-hopital"
              onMouseEnter={clearHoverTimer}
              className="shadow-mega animate-mega-reveal absolute inset-x-0 top-full z-50 hidden max-h-[calc(100vh-130px)] overflow-y-auto border-b border-[#071A33]/12 bg-white/98 backdrop-blur-2xl lg:block"
            >
              <div className="mx-auto max-w-7xl px-6 py-7 lg:px-8">
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-7 min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0D9488]">
                      {t({
                        fr: "Institution publique depuis 1931",
                        en: "Public Referral Hospital since 1931",
                      })}
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-2.5">
                      {[
                        {
                          href: "/a-propos",
                          icon: Building2,
                          title: { fr: "Histoire & Missions", en: "Heritage & Mission" },
                          desc: { fr: "Soins, enseignement et recherche", en: "Care, teaching & research" },
                        },
                        {
                          href: "/#directeur",
                          icon: Sparkles,
                          title: { fr: "Mot du Directeur", en: "Director's Message" },
                          desc: { fr: "Dr Marie Solange NDOM EBONGUE", en: "Hospital Director's vision" },
                        },
                        {
                          href: "/#95ans",
                          icon: Award,
                          title: { fr: "95 ans d'histoire", en: "95 Years of History" },
                          desc: { fr: "Frise 1920 · 1931 – 2026", en: "Timeline 1920 · 1931 – 2026" },
                        },
                        {
                          href: "/a-propos#gouvernance",
                          icon: Users,
                          title: { fr: "Gouvernance & Comités", en: "Governance & Boards" },
                          desc: { fr: "Comité de Direction & de Gestion", en: "Executive & Management Boards" },
                        },
                        {
                          href: "/a-propos#donnees",
                          icon: Microscope,
                          title: { fr: "Chiffres consolidés", en: "Verified Figures" },
                          desc: { fr: "1 650 agents · 600 lits · 256 824 visites", en: "1,650 staff · 600 beds" },
                        },
                        {
                          href: "/#galerie",
                          icon: HeartPulse,
                          title: { fr: "Visite des pavillons", en: "Campus Showcase" },
                          desc: { fr: "9 hectares au cœur de Douala", en: "9-hectare urban campus" },
                        },
                      ].map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpenMega(null)}
                            className="group flex items-start gap-3 rounded-2xl border border-sky-200/60 bg-[#F2F7FC] p-3 transition-all hover:border-[#0A66C2]/40 hover:bg-white"
                          >
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#0A66C2] shadow-xs group-hover:bg-[#071A33] group-hover:text-[#38BDF8]">
                              <Icon className="h-4 w-4" aria-hidden="true" />
                            </span>
                            <div>
                              <p className="text-sm font-bold text-[#071A33] group-hover:text-[#0A66C2]">
                                {t(item.title)}
                              </p>
                              <p className="text-xs text-[#475569]">{t(item.desc)}</p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Clinical Heritage Showcase Card */}
                  <div className="col-span-5">
                    <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-[#071A33] p-6 text-white">
                      <MedicalBackdrop variant="dark-clinical" />
                      <div className="relative flex items-center gap-4">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 p-2 ring-1 ring-sky-400/40">
                          <Image
                            src="/images/brand/logo-95-ans.webp"
                            alt="Logo des 95 ans de l'Hôpital Laquintinie"
                            width={56}
                            height={56}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <div>
                          <p className="font-mono text-xs font-bold text-[#38BDF8]">
                            1931 – 2026
                          </p>
                          <h4 className="mt-0.5 text-lg font-extrabold leading-tight">
                            {t({
                              fr: "95 ans au service de chaque vie",
                              en: "95 years serving every life",
                            })}
                          </h4>
                        </div>
                      </div>

                      <p className="relative mt-4 text-xs leading-relaxed text-slate-300">
                        {t({
                          fr: "Établissement public de 2e catégorie sous tutelle du Ministère de la Santé Publique, engagé pour l'humanisation des soins et l'excellence médicale en Afrique centrale.",
                          en: "Public referral hospital under the Ministry of Public Health, committed to compassionate care and clinical excellence across Central Africa.",
                        })}
                      </p>

                      <div className="relative mt-5 flex items-center justify-between gap-3">
                        <Link
                          href="/a-propos"
                          onClick={() => setOpenMega(null)}
                          className="inline-flex items-center gap-2 rounded-xl bg-[#0EA5E9] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-white hover:text-[#071A33]"
                        >
                          {t({ fr: "Découvrir l'institution", en: "Explore institution" })}
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>
                        <Link
                          href="/actualites"
                          onClick={() => setOpenMega(null)}
                          className="text-xs font-semibold text-white/85 underline-offset-4 hover:text-white hover:underline"
                        >
                          {t({ fr: "Actualités", en: "News" })}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </header>

      {/* ================================================================
          FULL-HEIGHT SLIDE-OVER MOBILE & TABLET DRAWER (No Search Bar, No Urgent)
          ================================================================ */}
      {menuOpen ? (
        <div className="no-print fixed inset-0 z-[80] lg:hidden">
          <div
            aria-hidden="true"
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-[#08162B]/65 backdrop-blur-sm"
          />

          <aside
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label={t({ fr: "Menu de navigation mobile", en: "Mobile navigation menu" })}
            className="animate-drawer-in fixed inset-y-0 right-0 z-[85] flex w-full max-w-md flex-col bg-white shadow-2xl"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-[#071A33]/10 px-5 py-4">
              <div className="flex items-center gap-2.5">
                <Image
                  src="/images/brand/logo-hl.webp"
                  alt="Logo Hôpital Laquintinie"
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-xl object-cover ring-1 ring-[#0A66C2]/30"
                />
                <div>
                  <p className="text-sm font-bold text-[#071A33]">Hôpital Laquintinie</p>
                  <p className="text-[11px] text-[#475569]">
                    {t({ fr: "Navigation du portail", en: "Portal navigation" })}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label={t({ fr: "Fermer le menu", en: "Close menu" })}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#071A33]/15 text-[#071A33] hover:bg-[#F2F7FC]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Drawer Scrollable Body */}
            <div className="flex-1 space-y-3.5 overflow-y-auto px-5 py-5">
              {/* Direct Home Link */}
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-bold transition-colors ${isHomeActive
                  ? "border-[#0A66C2]/30 bg-[#E8F2FC] text-[#0A66C2]"
                  : "border-[#071A33]/10 bg-[#F2F7FC] text-[#071A33]"
                  }`}
              >
                <span className="flex items-center gap-2.5">
                  <Home className="h-4 w-4 text-[#0A66C2]" aria-hidden="true" />
                  <span>{t({ fr: "Accueil", en: "Home" })}</span>
                </span>
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              {/* Accordion 1: Nos 10 Départements */}
              <div className="overflow-hidden rounded-2xl border border-[#071A33]/10 bg-[#F2F7FC]">
                <button
                  type="button"
                  aria-expanded={mobileAccordion === "poles"}
                  onClick={() =>
                    setMobileAccordion((prev) => (prev === "poles" ? null : "poles"))
                  }
                  className="flex w-full items-center justify-between px-4 py-3.5 text-left text-sm font-bold text-[#071A33]"
                >
                  <span className="flex items-center gap-2.5">
                    <Building2 className="h-4 w-4 text-[#0A66C2]" aria-hidden="true" />
                    {t({ fr: "Pôles & 10 Départements", en: "Care & 10 Departments" })}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${mobileAccordion === "poles" ? "rotate-180" : ""
                      }`}
                    aria-hidden="true"
                  />
                </button>
                {mobileAccordion === "poles" ? (
                  <div className="space-y-1 border-t border-[#071A33]/8 bg-white p-3">
                    {DEPARTMENTS.map((d) => (
                      <Link
                        key={d.slug}
                        href={`/departements#${d.slug}`}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-[#071A33] hover:bg-[#F2F7FC]"
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: d.accentColor }}
                            aria-hidden="true"
                          />
                          {t(d.shortName)}
                        </span>
                        <ChevronRight className="h-3.5 w-3.5 text-[#475569]" aria-hidden="true" />
                      </Link>
                    ))}
                    <Link
                      href="/departements"
                      onClick={() => setMenuOpen(false)}
                      className="mt-2 block rounded-xl bg-[#E8F2FC] px-3 py-2 text-center text-xs font-bold text-[#0A66C2]"
                    >
                      {t({ fr: "Explorer tous les départements →", en: "Explore all departments →" })}
                    </Link>
                  </div>
                ) : null}
              </div>

              {/* Accordion 2: Espace Patient */}
              <div className="overflow-hidden rounded-2xl border border-[#071A33]/10 bg-[#F2F7FC]">
                <button
                  type="button"
                  aria-expanded={mobileAccordion === "patient"}
                  onClick={() =>
                    setMobileAccordion((prev) => (prev === "patient" ? null : "patient"))
                  }
                  className="flex w-full items-center justify-between px-4 py-3.5 text-left text-sm font-bold text-[#071A33]"
                >
                  <span className="flex items-center gap-2.5">
                    <HeartPulse className="h-4 w-4 text-[#0D9488]" aria-hidden="true" />
                    {t({ fr: "Espace Patient & Tarifs", en: "Patient Hub & Fees" })}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${mobileAccordion === "patient" ? "rotate-180" : ""
                      }`}
                    aria-hidden="true"
                  />
                </button>
                {mobileAccordion === "patient" ? (
                  <div className="space-y-1 border-t border-[#071A33]/8 bg-white p-3">
                    {[
                      { href: "/rendez-vous", label: { fr: "Prendre rendez-vous", en: "Book appointment" } },
                      { href: "/#parcours", label: { fr: "Parcours patient (5 étapes)", en: "Patient journey" } },
                      { href: "/#tarifs", label: { fr: "Tarifs indicatifs", en: "Consultation fees" } },
                      { href: "/#infos", label: { fr: "Plan d'accès & horaires", en: "Map & hours" } },
                      { href: "/services/maison-du-patient-medecine-generale", label: { fr: "Maison du Patient", en: "Patient House" } },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-[#071A33] hover:bg-[#F2F7FC]"
                      >
                        <span>{t(item.label)}</span>
                        <ChevronRight className="h-3.5 w-3.5 text-[#475569]" aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>

              {/* Accordion 3: L'Hôpital */}
              <div className="overflow-hidden rounded-2xl border border-[#071A33]/10 bg-[#F2F7FC]">
                <button
                  type="button"
                  aria-expanded={mobileAccordion === "hopital"}
                  onClick={() =>
                    setMobileAccordion((prev) => (prev === "hopital" ? null : "hopital"))
                  }
                  className="flex w-full items-center justify-between px-4 py-3.5 text-left text-sm font-bold text-[#071A33]"
                >
                <span className="flex items-center gap-2.5">
                  <Award className="h-4 w-4 text-[#0D9488]" aria-hidden="true" />
                  {t({ fr: "L'Hôpital · 95 ans", en: "The Hospital · 95 years" })}
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${mobileAccordion === "hopital" ? "rotate-180" : ""
                    }`}
                  aria-hidden="true"
                />
              </button>
              {mobileAccordion === "hopital" ? (
                <div className="space-y-1 border-t border-[#071A33]/8 bg-white p-3">
                  {[
                    { href: "/a-propos", label: { fr: "Histoire & Missions", en: "Heritage & Mission" } },
                    { href: "/#directeur", label: { fr: "Mot du Directeur", en: "Director's Message" } },
                    { href: "/#95ans", label: { fr: "Frise des 95 ans", en: "95th Anniversary Timeline" } },
                    { href: "/a-propos#gouvernance", label: { fr: "Gouvernance & Comités", en: "Governance Boards" } },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-[#071A33] hover:bg-[#F2F7FC]"
                    >
                      <span>{t(item.label)}</span>
                      <ChevronRight className="h-3.5 w-3.5 text-[#475569]" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Direct Links */}
            <div className="grid grid-cols-2 gap-2.5">
              <Link
                href="/medecins"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between rounded-2xl border border-[#071A33]/12 bg-white p-3.5 text-xs font-bold text-[#071A33] shadow-xs"
              >
                <span className="flex items-center gap-2">
                  <Stethoscope className="h-4 w-4 text-[#0A66C2]" aria-hidden="true" />
                  {t({ fr: "Médecins (207)", en: "Doctors (207)" })}
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#475569]" aria-hidden="true" />
              </Link>
              <Link
                href="/actualites"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between rounded-2xl border border-[#071A33]/12 bg-white p-3.5 text-xs font-bold text-[#071A33] shadow-xs"
              >
                <span className="flex items-center gap-2">
                  <Newspaper className="h-4 w-4 text-[#0D9488]" aria-hidden="true" />
                  {t({ fr: "Actualités", en: "News" })}
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#475569]" aria-hidden="true" />
              </Link>
            </div>

              {/* Language Switcher Row */}
              <div className="flex items-center justify-between rounded-2xl border border-[#071A33]/10 bg-[#F2F7FC] px-4 py-3">
                <span className="text-xs font-bold text-[#071A33]">
                  {t({ fr: "Langue d'affichage", en: "Display language" })}
                </span>
                <div className="inline-flex rounded-lg border border-[#071A33]/15 bg-white p-0.5">
                  <button
                    type="button"
                    onClick={() => setLocale("fr")}
                    className={`rounded-md px-3 py-1 text-xs font-bold ${locale === "fr" ? "bg-[#071A33] text-white" : "text-[#475569]"
                      }`}
                  >
                    FR
                  </button>
                  <button
                    type="button"
                    onClick={() => setLocale("en")}
                    className={`rounded-md px-3 py-1 text-xs font-bold ${locale === "en" ? "bg-[#071A33] text-white" : "text-[#475569]"
                      }`}
                  >
                    EN
                  </button>
                </div>
              </div>
            </div>

            {/* Sticky Bottom Drawer CTA */}
            <div className="border-t border-[#071A33]/10 bg-[#F2F7FC] p-4">
              <Link
                href="/rendez-vous"
                onClick={() => setMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0A66C2] px-4 py-3.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-[#071A33]"
              >
                <Calendar className="h-4 w-4" aria-hidden="true" />
                <span>{t({ fr: "Prendre rendez-vous", en: "Book appointment" })}</span>
              </Link>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
