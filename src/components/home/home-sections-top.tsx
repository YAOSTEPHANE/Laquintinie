"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Compass,
  FlaskConical,
  GraduationCap,
  HeartPulse,
  MapPin,
  Microscope,
  Phone,
  Play,
  Search,
  ShieldAlert,
  Sparkles,
  Stethoscope,
  Users,
  X,
} from "lucide-react";
import { useLanguage } from "@/context/language-context";
import {
  DEPARTMENTS,
  HOSPITAL_CONTACT,
  HOSPITAL_KPIS,
  INSTITUTIONAL_VALUES,
  SERVICES,
} from "@/data/hospital-data";
import {
  ArchitecturalArchFrame,
  OverlappingImageShowcase,
} from "@/components/ui/framed-media";
import { MedicalBackdrop } from "@/components/ui/medical-backdrop";

export function HomeSectionsTop() {
  const { locale, t } = useLanguage();
  const [selectedDept, setSelectedDept] = useState<string>("all");
  const [serviceQuery, setServiceQuery] = useState<string>("");
  const [directorExpanded, setDirectorExpanded] = useState(false);
  const [filmOpen, setFilmOpen] = useState(false);

  useEffect(() => {
    if (!filmOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFilmOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [filmOpen]);

  const filteredServices = useMemo(() => {
    const q = serviceQuery.trim().toLowerCase();
    return SERVICES.filter((s) => {
      const matchDept = selectedDept === "all" || s.departmentSlug === selectedDept;
      if (!matchDept) return false;
      if (!q) return true;
      return (
        s.name.fr.toLowerCase().includes(q) ||
        s.name.en.toLowerCase().includes(q) ||
        s.description.fr.toLowerCase().includes(q) ||
        s.description.en.toLowerCase().includes(q)
      );
    });
  }, [selectedDept, serviceQuery]);

  return (
    <>
      {/* ================================================================
          1. HERO SECTION — Clinical Split + Medical Backdrop Shapes
          ================================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#E9F3FE] via-[#F3F8FE] to-[#F4F8FC] pb-16 pt-8 sm:pt-12 lg:pb-24 lg:pt-14">
        <MedicalBackdrop variant="hero" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Editorial Column (no overlap with image, CTAs always above the fold) */}
            <div className="min-w-0 lg:col-span-6">
              <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#0A66C2]/25 bg-white/95 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0A66C2] shadow-sm backdrop-blur-md sm:px-4">
                <span className="relative flex h-2.5 w-2.5 shrink-0 items-center justify-center" aria-hidden="true">
                  <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-[#0D9488]" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0D9488]" />
                </span>
                <span className="truncate">
                  {t({
                    fr: "Hôpital public de référence · Douala, Cameroun",
                    en: "Public Referral Hospital · Douala, Cameroon",
                  })}
                </span>
              </div>

              <h1 className="mt-6 break-words text-3xl font-extrabold leading-[1.08] tracking-tight text-[#071A33] sm:text-5xl xl:text-[56px]">
                <span className="bg-gradient-to-r from-[#0A66C2] via-[#0EA5E9] to-[#0D9488] bg-clip-text text-transparent">
                  {t({ fr: "95 ans", en: "95 years" })}
                </span>{" "}
                <span>
                  {t({
                    fr: "au service de chaque vie",
                    en: "serving every life",
                  })}
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#475569] sm:text-lg">
                {t({
                  fr: "Depuis 1931, l'Hôpital Laquintinie de Douala allie excellence hospitalo-universitaire, plateau technique modernisé et humanisation des soins au cœur de la capitale économique.",
                  en: "Since 1931, Laquintinie Hospital of Douala has united university-level clinical excellence, modernized medical technology, and compassionate patient care.",
                })}
              </p>

              {/* Primary CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link
                  href="/rendez-vous"
                  className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#0A66C2] to-[#0284C7] py-3 pl-6 pr-3 text-sm font-semibold text-white shadow-[0_14px_32px_-8px_rgba(10,102,194,0.55)] transition-all hover:from-[#071A33] hover:to-[#0C2547] hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A66C2] sm:text-base"
                >
                  <span>
                    {t({ fr: "Prendre rendez-vous", en: "Book an appointment" })}
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#0A66C2] transition-transform duration-300 group-hover:rotate-45 group-hover:text-[#071A33]">
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>

                <Link
                  href="#services"
                  className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-6 py-3.5 text-sm font-semibold text-[#071A33] shadow-sm transition-all hover:border-[#0A66C2] hover:text-[#0A66C2] sm:text-base"
                >
                  <span>
                    {t({ fr: "Découvrir nos services", en: "Explore services" })}
                  </span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              {/* Trust Badges & Interactive Film Button */}
              <div className="mt-9 flex flex-wrap items-center gap-4 border-t border-sky-200/80 pt-6">
                <div className="flex items-center gap-3 rounded-2xl border border-sky-200/80 bg-white/95 px-4 py-2.5 shadow-sm">
                  <Image
                    src="/images/brand/logo-95-ans.webp"
                    alt="Logo officiel 95 ans Hôpital Laquintinie"
                    width={44}
                    height={44}
                    className="h-11 w-11 shrink-0 object-contain"
                  />
                  <div>
                    <p className="font-mono text-xs font-bold text-[#071A33]">
                      1931 – 2026
                    </p>
                    <p className="text-xs text-[#475569]">
                      {t({ fr: "3 laboratoires certifiés ISO", en: "3 ISO-accredited labs" })}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setFilmOpen(true)}
                  className="group inline-flex items-center gap-3 rounded-2xl border border-sky-200/80 bg-white px-4 py-2.5 text-left shadow-sm transition-all hover:border-[#0A66C2] hover:shadow-md"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#071A33] text-white transition-colors group-hover:bg-[#0A66C2]">
                    <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-[#071A33]">
                      {t({ fr: "Laquintinie aujourd'hui", en: "Laquintinie today" })}
                    </span>
                    <span className="block text-xs text-[#475569]">
                      {t({ fr: "Le film anniversaire · 3 min", en: "Anniversary film · 3 min" })}
                    </span>
                  </span>
                </button>
              </div>
            </div>

            {/* Right Visual Column — Clean Framed Photography */}
            <div className="min-w-0 lg:col-span-6">
              <OverlappingImageShowcase
                primarySrc="/images/campus/hero-hospital.webp"
                primaryAlt={t({
                  fr: "Façade du bâtiment principal de l'Hôpital Laquintinie de Douala",
                  en: "Main entrance facade of Laquintinie Hospital Douala",
                })}
                secondarySrc="/images/campus/pavillon-aerial.webp"
                secondaryAlt={t({
                  fr: "Vue aérienne des pavillons de l'Hôpital Laquintinie",
                  en: "Aerial view of Laquintinie Hospital pavilions",
                })}
                ringColorClass="ring-[#F4F8FC]"
                priority
                align="left"
              />
            </div>
          </div>

          {/* ==============================================================
              QUICK-ACCESS DOCK (5 Cards, including clickable 24/7 Emergency)
              ============================================================== */}
          <nav
            aria-label={t({ fr: "Accès rapides", en: "Quick access" })}
            className="mt-12 grid grid-cols-1 gap-3.5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5"
          >
            <Link
              href="/rendez-vous"
              className="group relative flex h-full min-w-0 flex-col justify-between overflow-hidden rounded-3xl border border-sky-200/80 bg-white/90 p-5 shadow-premium backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#0A66C2]/45 hover:shadow-premium-hover"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-[#0EA5E9]/20 to-transparent blur-md transition-transform duration-500 group-hover:scale-125"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#0A66C2] to-[#0EA5E9] transition-transform duration-300 group-hover:scale-x-100"
              />
              <div className="relative flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E8F2FC] text-[#0A66C2]">
                  <Calendar className="h-5 w-5" aria-hidden="true" />
                </span>
                <ArrowUpRight
                  className="h-4 w-4 text-[#475569] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#0A66C2]"
                  aria-hidden="true"
                />
              </div>
              <p className="relative mt-4 text-sm font-bold text-[#071A33]">
                {t({ fr: "Rendez-vous", en: "Appointments" })}
              </p>
              <p className="relative mt-0.5 text-xs text-[#475569]">
                {t({ fr: "En ligne, sans compte", en: "Online, no account needed" })}
              </p>
            </Link>

            <Link
              href="#services"
              className="group relative overflow-hidden rounded-3xl border border-sky-200/80 bg-white/90 p-5 shadow-premium backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#0D9488]/45 hover:shadow-premium-hover"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-[#14B8A6]/20 to-transparent blur-md transition-transform duration-500 group-hover:scale-125"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#0D9488] to-[#0EA5E9] transition-transform duration-300 group-hover:scale-x-100"
              />
              <div className="relative flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-50 text-[#0D9488]">
                  <Building2 className="h-5 w-5" aria-hidden="true" />
                </span>
                <ArrowUpRight
                  className="h-4 w-4 text-[#475569] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#0A66C2]"
                  aria-hidden="true"
                />
              </div>
              <p className="relative mt-4 text-sm font-bold text-[#071A33]">
                {t({ fr: "Services & Pôles", en: "Services & Units" })}
              </p>
              <p className="relative mt-0.5 text-xs text-[#475569]">
                {t({ fr: "10 départements · 30+ unités", en: "10 departments · 30+ units" })}
              </p>
            </Link>

            <Link
              href="/medecins"
              className="group relative overflow-hidden rounded-3xl border border-sky-200/80 bg-white/90 p-5 shadow-premium backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#0D7A5F]/45 hover:shadow-premium-hover"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-emerald-400/20 to-transparent blur-md transition-transform duration-500 group-hover:scale-125"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#0D7A5F] to-[#14B8A6] transition-transform duration-300 group-hover:scale-x-100"
              />
              <div className="relative flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-[#0D7A5F]">
                  <Stethoscope className="h-5 w-5" aria-hidden="true" />
                </span>
                <ArrowUpRight
                  className="h-4 w-4 text-[#475569] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#0A66C2]"
                  aria-hidden="true"
                />
              </div>
              <p className="relative mt-4 text-sm font-bold text-[#071A33]">
                {t({ fr: "Médecins", en: "Doctors" })}
              </p>
              <p className="relative mt-0.5 text-xs text-[#475569]">
                {t({ fr: "207 praticiens qualifiés", en: "207 qualified physicians" })}
              </p>
            </Link>

            <Link
              href="#infos"
              className="group relative overflow-hidden rounded-3xl border border-sky-200/80 bg-white/90 p-5 shadow-premium backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#0284C7]/45 hover:shadow-premium-hover"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-sky-400/20 to-transparent blur-md transition-transform duration-500 group-hover:scale-125"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#0284C7] to-[#38BDF8] transition-transform duration-300 group-hover:scale-x-100"
              />
              <div className="relative flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-[#0284C7]">
                  <Compass className="h-5 w-5" aria-hidden="true" />
                </span>
                <ArrowUpRight
                  className="h-4 w-4 text-[#475569] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#0A66C2]"
                  aria-hidden="true"
                />
              </div>
              <p className="relative mt-4 text-sm font-bold text-[#071A33]">
                {t({ fr: "Plan & Tarifs", en: "Map & Fees" })}
              </p>
              <p className="relative mt-0.5 text-xs text-[#475569]">
                {t({ fr: "Ngodi Akwa, Douala", en: "Ngodi Akwa, Douala" })}
              </p>
            </Link>

            {/* Real Interactive 24/7 Emergency Call Card */}
            <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-[#C81E1E] to-[#991B1B] p-5 text-white shadow-[0_18px_38px_-12px_rgba(200,30,30,0.55)]">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-md"
              />
              <div className="relative flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider">
                  <span className="relative flex h-2 w-2 items-center justify-center" aria-hidden="true">
                    <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-white" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                  </span>
                  {t({ fr: "Urgences 24h/24", en: "24/7 ER" })}
                </span>
                <a
                  href={`tel:${HOSPITAL_CONTACT.emergencyPhoneRaw}`}
                  aria-label={`Appeler les urgences au ${HOSPITAL_CONTACT.emergencyPhone}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#C81E1E] shadow-md transition-transform hover:scale-105"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
              <div className="mt-3">
                <a
                  href={`tel:${HOSPITAL_CONTACT.emergencyPhoneRaw}`}
                  className="block font-mono text-sm font-bold text-white hover:underline"
                >
                  {HOSPITAL_CONTACT.emergencyPhone}
                </a>
                <div className="mt-0.5 flex items-center justify-between text-xs text-red-100">
                  <span>{t({ fr: "Venir sans rendez-vous", en: "Walk-in anytime" })}</span>
                  <a
                    href={`tel:${HOSPITAL_CONTACT.samuNumber}`}
                    className="font-mono font-bold underline"
                  >
                    SAMU {HOSPITAL_CONTACT.samuNumber}
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </section>

      {/* ================================================================
          2. SERVICES DIRECTORY — Search + Department Filter + Clinical Cards
          ================================================================ */}
      <section id="services" className="relative overflow-hidden bg-[#F4F8FC] py-16 lg:py-24">
        <MedicalBackdrop variant="clinical" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0A66C2]">
                {t({ fr: "Annuaire médical", en: "Medical Directory" })}
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#071A33] sm:text-4xl">
                {t({
                  fr: "Trouvez le service dont vous avez besoin",
                  en: "Find the medical service you need",
                })}
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-[#475569] sm:text-base">
                {t({
                  fr: "Plus de 30 services répartis en 10 départements spécialisés, du diagnostic biologique ISO aux blocs chirurgicaux.",
                  en: "Over 30 services organized across 10 specialized departments, from ISO laboratories to modern surgical suites.",
                })}
              </p>
            </div>

            {/* Search Input */}
            <div className="w-full lg:max-w-sm">
              <label htmlFor="service-search" className="sr-only">
                {t({ fr: "Rechercher un service", en: "Search for a service" })}
              </label>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#475569]"
                  aria-hidden="true"
                />
                <input
                  id="service-search"
                  type="search"
                  value={serviceQuery}
                  onChange={(e) => setServiceQuery(e.target.value)}
                  placeholder={t({
                    fr: "Cardiologie, maternité, scanner...",
                    en: "Cardiology, maternity, CT scan...",
                  })}
                  className="w-full rounded-full border border-[#08162B]/15 bg-white py-3 pl-11 pr-4 text-sm text-[#08162B] shadow-sm transition-colors focus:border-[#0A66C2] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Department Filter Pills */}
          <div
            role="group"
            aria-label={t({ fr: "Filtrer par département", en: "Filter by department" })}
            className="no-scrollbar mt-7 flex items-center gap-2 overflow-x-auto pb-2"
          >
            <button
              type="button"
              aria-pressed={selectedDept === "all"}
              onClick={() => setSelectedDept("all")}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${selectedDept === "all"
                ? "bg-[#08162B] text-white shadow-md"
                : "border border-[#08162B]/12 bg-white text-[#475569] hover:border-[#0A66C2] hover:text-[#0A66C2]"
                }`}
            >
              {t({ fr: "Tous les pôles", en: "All departments" })} ({SERVICES.length})
            </button>
            {DEPARTMENTS.map((dept) => {
              const active = selectedDept === dept.slug;
              return (
                <button
                  key={dept.slug}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedDept(dept.slug)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${active
                    ? "bg-[#0A66C2] text-white shadow-md"
                    : "border border-[#08162B]/12 bg-white text-[#475569] hover:border-[#0A66C2] hover:text-[#0A66C2]"
                    }`}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: active ? "#ffffff" : dept.accentColor }}
                    aria-hidden="true"
                  />
                  {t(dept.shortName)}
                </button>
              );
            })}
          </div>

          {/* Ultra-Premium Service Cards Grid — Left-aligned, zero text-justify rivers */}
          {filteredServices.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-[#08162B]/10 bg-white p-10 text-center shadow-sm">
              <p className="text-base font-semibold text-[#08162B]">
                {t({
                  fr: "Aucun service ne correspond à votre recherche.",
                  en: "No services match your search.",
                })}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedDept("all");
                  setServiceQuery("");
                }}
                className="mt-4 rounded-full bg-[#0A66C2] px-5 py-2 text-xs font-semibold text-white"
              >
                {t({ fr: "Réinitialiser les filtres", en: "Reset filters" })}
              </button>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredServices.map((service) => {
                const dept = DEPARTMENTS.find((d) => d.slug === service.departmentSlug);
                return (
                  <article
                    key={service.slug}
                    className="group relative flex min-w-0 flex-col justify-between overflow-hidden rounded-3xl border border-sky-200/75 bg-white/92 p-5 shadow-premium backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-[#0A66C2]/40 hover:shadow-premium-hover sm:p-6"
                  >
                    {/* Glowing Top Department Accent + Soft Radial Halo */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-1 transition-all duration-300 group-hover:h-1.5"
                      style={{ backgroundColor: dept?.accentColor ?? "#0A66C2" }}
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-[0.16] blur-xl transition-opacity duration-500 group-hover:opacity-30"
                      style={{ backgroundColor: dept?.accentColor ?? "#0A66C2" }}
                    />

                    <div className="relative">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold ${dept?.badgeBg ?? "border-slate-200 bg-slate-50 text-slate-700"
                            }`}
                        >
                          {dept ? t(dept.shortName) : ""}
                        </span>
                        <span className="font-mono text-[11px] font-semibold text-[#0A66C2]">
                          {service.exams[0]?.price ?? "4 000 FCFA"}
                        </span>
                      </div>

                      <h3 className="mt-4 text-left text-lg font-bold leading-snug text-[#071A33] transition-colors group-hover:text-[#0A66C2]">
                        <Link href={`/services/${service.slug}`} className="hover:underline">
                          {t(service.name)}
                        </Link>
                      </h3>

                      <p className="mt-2.5 text-left text-sm leading-relaxed text-[#475569]">
                        {t(service.description)}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] font-medium text-[#475569]">
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#F0F6FC] px-2.5 py-1">
                          <Users className="h-3 w-3 text-[#0A66C2]" aria-hidden="true" />
                          {service.doctorCount} {t({ fr: "médecins", en: "physicians" })}
                        </span>
                        <span className="inline-flex max-w-full items-center gap-1 truncate rounded-full bg-[#F0F6FC] px-2.5 py-1">
                          <MapPin className="h-3 w-3 shrink-0 text-[#0D9488]" aria-hidden="true" />
                          <span className="truncate">{t(service.location)}</span>
                        </span>
                      </div>
                    </div>

                    <div className="relative mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-[#071A33]/8 pt-4">
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#08162B] transition-colors hover:text-[#0A66C2]"
                      >
                        <span>{t({ fr: "Découvrir", en: "Explore" })}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                      <Link
                        href={`/rendez-vous?service=${service.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F2FC] px-3.5 py-1.5 text-xs font-bold text-[#0A66C2] transition-colors hover:bg-[#0A66C2] hover:text-white"
                      >
                        <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{t({ fr: "RDV", en: "Book" })}</span>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          <div className="mt-10 flex justify-center">
            <Link
              href="/departements"
              className="inline-flex items-center gap-2.5 rounded-full border border-[#08162B]/20 bg-white px-7 py-3.5 text-sm font-bold text-[#08162B] shadow-sm transition-all hover:bg-[#08162B] hover:text-white"
            >
              <span>
                {t({
                  fr: "Explorer les 10 départements complets",
                  en: "Explore all 10 departments",
                })}
              </span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================
          3. PATRIMOINE & MODERNITÉ (#hopital) — Campus Backdrop + Missions
          ================================================================ */}
      <section id="hopital" className="relative overflow-hidden bg-white py-16 lg:py-24">
        <MedicalBackdrop variant="campus" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Overlapping Heritage + Clinical Excellence Photography (second on mobile, first on desktop) */}
            <div className="order-2 min-w-0 lg:order-1 lg:col-span-6">
              <OverlappingImageShowcase
                primarySrc="/images/campus/direction-building.webp"
                primaryAlt={t({
                  fr: "Bâtiment historique de la Direction de l'Hôpital Laquintinie de Douala",
                  en: "Historic administration building of Laquintinie Hospital Douala",
                })}
                secondarySrc="/images/gallery/cardio-1.webp"
                secondaryAlt={t({
                  fr: "Équipements modernes de cardiologie et d'imagerie à Laquintinie",
                  en: "Modern cardiology and diagnostic equipment at Laquintinie",
                })}
                ringColorClass="ring-white"
                align="right"
              />
            </div>

            {/* Editorial Narrative & 3 Missions (first on mobile, second on desktop) */}
            <div className="order-1 min-w-0 lg:order-2 lg:col-span-6">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#0D9488]">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                {t({ fr: "Institution publique de 2e catégorie", en: "Public Referral Institution" })}
              </span>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#071A33] sm:text-4xl">
                {t({
                  fr: "L'Hôpital Laquintinie de Douala",
                  en: "Laquintinie Hospital, Douala",
                })}
              </h2>

              <p className="mt-4 text-base leading-relaxed text-[#475569]">
                {t({
                  fr: "Établissement public placé sous la tutelle du Ministère de la Santé Publique, Laquintinie accueille chaque jour des patients venus de Douala, de la région du Littoral et de toute la sous-région d'Afrique centrale.",
                  en: "A public institution under the Ministry of Public Health, Laquintinie welcomes patients daily from Douala, the Littoral region, and across Central Africa.",
                })}
              </p>

              <p className="mt-3 text-base leading-relaxed text-[#475569]">
                {t({
                  fr: "Sa vocation : offrir à tous des soins de qualité, former les professionnels de santé de demain et faire progresser la connaissance médicale.",
                  en: "Its mission: deliver quality care for everyone, train tomorrow's healthcare professionals, and advance clinical research.",
                })}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-sky-100 bg-[#F4F8FC] p-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
                    <HeartPulse className="h-5 w-5 text-[#C81E1E]" aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 text-sm font-bold text-[#071A33]">
                    {t({ fr: "Soins", en: "Care" })}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#475569]">
                    {t({
                      fr: "Consultations, hospitalisation et urgences 24h/24.",
                      en: "Consultations, inpatient wards & 24/7 ER.",
                    })}
                  </p>
                </div>

                <div className="rounded-2xl border border-sky-100 bg-[#F4F8FC] p-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F2FC]">
                    <GraduationCap className="h-5 w-5 text-[#0A66C2]" aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 text-sm font-bold text-[#071A33]">
                    {t({ fr: "Enseignement", en: "Teaching" })}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#475569]">
                    {t({
                      fr: "Formation de 40 enseignants et internes.",
                      en: "Training led by 40 university faculty.",
                    })}
                  </p>
                </div>

                <div className="rounded-2xl border border-sky-100 bg-[#F4F8FC] p-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50">
                    <Microscope className="h-5 w-5 text-[#0D9488]" aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 text-sm font-bold text-[#071A33]">
                    {t({ fr: "Recherche", en: "Research" })}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#475569]">
                    {t({
                      fr: "Études cliniques et innovations médicales.",
                      en: "Clinical studies & medical innovation.",
                    })}
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/a-propos"
                  className="inline-flex items-center gap-2 rounded-full bg-[#071A33] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0A66C2]"
                >
                  <span>
                    {t({
                      fr: "Découvrir l'histoire & la gouvernance",
                      en: "Discover heritage & governance",
                    })}
                  </span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          4. KPI MONUMENT BAND — Clinical Dark Backdrop + Reconciled Figures
          ================================================================ */}
      <section
        aria-labelledby="kpi-heading"
        className="relative overflow-hidden bg-gradient-to-br from-[#071A33] via-[#0B2548] to-[#082F49] py-16 text-white lg:py-20"
      >
        <MedicalBackdrop variant="dark-clinical" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 border-b border-white/15 pb-8 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#38BDF8]">
                {t({ fr: "Chiffres consolidés", en: "Verified Activity Figures" })}
              </p>
              <h2 id="kpi-heading" className="mt-2 text-3xl font-extrabold sm:text-4xl">
                {t({ fr: "L'hôpital en chiffres", en: "The hospital in figures" })}
              </h2>
            </div>
            <p className="max-w-md text-sm text-slate-300">
              {t({
                fr: "Près d'un siècle d'activité, des équipes pluridisciplinaires et plus de 256 000 consultations annuelles.",
                en: "Nearly a century of service, multidisciplinary teams, and over 256,000 annual consultations.",
              })}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {HOSPITAL_KPIS.map((kpi) => (
              <div
                key={kpi.id}
                className="group relative min-w-0 overflow-hidden rounded-3xl border border-sky-300/20 bg-white/[0.07] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#38BDF8]/60 hover:bg-white/[0.11] hover:shadow-[0_20px_44px_-14px_rgba(56,189,248,0.28)]"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#38BDF8]/12 blur-xl transition-opacity group-hover:bg-[#38BDF8]/25"
                />
                <span
                  aria-hidden="true"
                  className="mb-4 block h-1 w-10 rounded-full bg-gradient-to-r from-[#38BDF8] to-[#2DD4BF] shadow-[0_0_12px_rgba(56,189,248,0.7)]"
                />
                <p className="font-mono text-3xl font-bold tracking-tight text-[#38BDF8] sm:text-4xl">
                  {kpi.displayValue}
                  {kpi.suffix ? (
                    <span className="ml-1 text-xl font-semibold text-white">
                      {kpi.suffix}
                    </span>
                  ) : null}
                </p>
                <p className="mt-2 text-base font-bold text-white">{t(kpi.label)}</p>
                <p className="mt-1 text-xs text-slate-300">{t(kpi.sublabel)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          5. DIRECTOR'S MESSAGE & 8 INSTITUTIONAL VALUES (#directeur)
          ================================================================ */}
      <section id="directeur" className="relative overflow-hidden bg-[#F4F8FC] py-16 lg:py-24">
        <MedicalBackdrop variant="clinical" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.25rem] border border-sky-200/80 bg-white/92 p-5 shadow-premium backdrop-blur-xl sm:p-10 lg:p-12">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full bg-gradient-to-br from-[#BAE6FD]/70 to-transparent blur-xl"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-gradient-to-tr from-[#99F6E4]/55 to-transparent blur-xl"
            />
            <div className="relative grid items-start gap-10 lg:grid-cols-12">
              {/* Framed Director Portrait */}
              <div className="min-w-0 lg:col-span-5">
                <ArchitecturalArchFrame
                  src="/images/campus/director-general.webp"
                  alt="Portrait du Dr Marie Solange NDOM EBONGUE, Directeur de l'Hôpital Laquintinie de Douala"
                  aspectClass="aspect-[4/5]"
                  sizes="(min-width: 1024px) 420px, 100vw"
                />
                <div className="mt-5 rounded-2xl border border-sky-100 bg-[#F2F7FC] px-4 py-3.5 text-xs">
                  <p className="text-sm font-extrabold text-[#071A33]">
                    Dr Marie Solange NDOM EBONGUE
                  </p>
                  <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
                    <span className="font-medium text-[#475569]">
                      {t({
                        fr: "Directeur · En fonction depuis le 31 déc. 2024",
                        en: "Hospital Director · Appointed Dec 31, 2024",
                      })}
                    </span>
                    <Link
                      href="/a-propos#gouvernance"
                      className="font-bold text-[#0A66C2] hover:underline"
                    >
                      {t({ fr: "Comité de Direction →", en: "Leadership Board →" })}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Editorial Quote & Clinical Commitments */}
              <div className="min-w-0 lg:col-span-7">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0A66C2]">
                    {t({
                      fr: "Être proche, à l'écoute et compétitif",
                      en: "Close, attentive and competitive",
                    })}
                  </p>

                  <blockquote className="mt-4 border-l-4 border-[#0A66C2] pl-5 font-sans text-xl font-bold leading-snug text-[#071A33] sm:text-2xl">
                    {locale === "fr"
                      ? "« Un hôpital proche, à l'écoute, compétitif et aux standards internationaux. »"
                      : "“A hospital that is close, attentive, competitive, and built to international standards.”"}
                  </blockquote>

                  <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#475569] sm:text-base">
                    <p>
                      {t({
                        fr: "Chers usagers, chers partenaires, depuis ma prise de fonction le 31 décembre 2024, j'assume cette responsabilité avec une seule boussole : vous.",
                        en: "Dear patients and partners, since taking office on December 31, 2024, I have carried this responsibility with a single compass: you.",
                      })}
                    </p>
                    <p>
                      {t({
                        fr: "Mon engagement avec l'ensemble des équipes est clair : faire de Laquintinie un hôpital qui soigne mieux, qui accueille mieux et qui écoute mieux. Ensemble, nous avons engagé une transformation irréversible :",
                        en: "Our collective commitment is clear: making Laquintinie a hospital that treats better, welcomes better, and listens better through four core pillars:",
                      })}
                    </p>
                    <ul className="grid gap-2.5 sm:grid-cols-2">
                      <li className="rounded-2xl border border-sky-100 bg-[#F2F7FC] p-3.5 text-xs sm:text-sm">
                        <strong className="text-[#071A33]">
                          1. {t({ fr: "Remobiliser l'humain :", en: "Empowering staff:" })}
                        </strong>{" "}
                        {t({
                          fr: "renforcer les compétences et les conditions de travail.",
                          en: "strengthening skills and workplace dignity.",
                        })}
                      </li>
                      <li className="rounded-2xl border border-sky-100 bg-[#F2F7FC] p-3.5 text-xs sm:text-sm">
                        <strong className="text-[#071A33]">
                          2. {t({ fr: "Moderniser l'outil :", en: "Modernizing facilities:" })}
                        </strong>{" "}
                        {t({
                          fr: "hisser le plateau technique aux standards internationaux.",
                          en: "upgrading clinical technology to global standards.",
                        })}
                      </li>
                      <li className="rounded-2xl border border-sky-100 bg-[#F2F7FC] p-3.5 text-xs sm:text-sm">
                        <strong className="text-[#071A33]">
                          3. {t({ fr: "Processus qualité :", en: "Quality assurance:" })}
                        </strong>{" "}
                        {t({
                          fr: "trois laboratoires biologiques déjà accrédités ISO.",
                          en: "three clinical biology labs now ISO-accredited.",
                        })}
                      </li>
                      <li className="rounded-2xl border border-sky-100 bg-[#F2F7FC] p-3.5 text-xs sm:text-sm">
                        <strong className="text-[#071A33]">
                          4. {t({ fr: "Humaniser le soin :", en: "Compassionate care:" })}
                        </strong>{" "}
                        {t({
                          fr: "avec la Maison du Patient dédiée 24h/24 et 7j/7.",
                          en: "featuring our 24/7 Patient Support House.",
                        })}
                      </li>
                    </ul>

                    {directorExpanded ? (
                      <div className="space-y-3 rounded-2xl border border-[#0A66C2]/20 bg-[#E8F2FC]/55 p-5 text-sm text-[#071A33]">
                        <p>
                          {t({
                            fr: "Cette dynamique, soutenue par le Gouvernement camerounais et le Ministère de la Santé Publique, confirme le statut de leader sous-régional de notre institution tout en restant l'hôpital du peuple, accessible à tous.",
                            en: "Supported by the Cameroonian Government and the Ministry of Public Health, this transformation strengthens our sub-regional leadership while remaining accessible to every citizen.",
                          })}
                        </p>
                        <p>
                          {t({
                            fr: "Nous resterons fidèles à notre devise : Humanisme, Innovation, Professionnalisme.",
                            en: "We remain faithful to our motto: Humanism, Innovation, Professionalism.",
                          })}
                        </p>
                      </div>
                    ) : null}

                    <button
                      type="button"
                      onClick={() => setDirectorExpanded((prev) => !prev)}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0A66C2] hover:underline"
                    >
                      <span>
                        {directorExpanded
                          ? t({ fr: "Réduire le message", en: "Show less" })
                          : t({ fr: "Lire l'intégralité du mot du Directeur", en: "Read full message" })}
                      </span>
                      {directorExpanded ? (
                        <ChevronUp className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="h-4 w-4" aria-hidden="true" />
                      )}
                    </button>
                  </div>

                  {/* 8 Institutional Engagements */}
                  <div className="mt-8 border-t border-sky-100 pt-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#071A33]">
                      {t({ fr: "Nos 8 engagements", en: "Our 8 Commitments" })}
                    </h3>
                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
                      {INSTITUTIONAL_VALUES.map((val, idx) => (
                        <div
                          key={val.title.fr}
                          className="rounded-2xl border border-sky-200/70 bg-[#F2F7FC] p-3.5 transition-all hover:-translate-y-0.5 hover:border-[#0A66C2]/40 hover:bg-white hover:shadow-sm"
                        >
                          <span className="font-mono text-[10px] font-bold text-[#0EA5E9]">
                            0{idx + 1}
                          </span>
                          <p className="mt-1 text-xs font-bold text-[#071A33]">{t(val.title)}</p>
                          <p className="mt-1 text-[11px] leading-snug text-[#475569]">
                            {t(val.desc)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>

      {/* ================================================================
          ANNIVERSARY FILM MODAL (accessible interactive response)
          ================================================================ */}
      {filmOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="film-modal-title"
          onClick={() => setFilmOpen(false)}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[#071A33]/80 p-4 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="animate-modal-pop relative w-full max-w-2xl overflow-hidden rounded-3xl border border-sky-300/20 bg-[#071A33] text-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/15 px-6 py-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#38BDF8]">
                  1931 – 2026 · 95 ans
                </p>
                <h2 id="film-modal-title" className="text-lg font-bold">
                  {t({
                    fr: "Laquintinie aujourd'hui — Le film anniversaire",
                    en: "Laquintinie Today — 95th Anniversary Film",
                  })}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setFilmOpen(false)}
                aria-label={t({ fr: "Fermer", en: "Close" })}
                autoFocus
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/15"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src="/images/campus/pavillon-aerial.webp"
                alt="Aperçu du documentaire des 95 ans de l'Hôpital Laquintinie"
                fill
                sizes="680px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col items-center border-t border-white/15 bg-[#071A33] p-6 text-center">
              <Award className="h-10 w-10 text-[#38BDF8]" aria-hidden="true" />
              <p className="mt-3 max-w-md text-base font-bold">
                {t({
                  fr: "95 ans d'histoire, 207 médecins et 3 laboratoires accrédités ISO au service des Camerounais.",
                  en: "95 years of care, 207 physicians, and 3 ISO-accredited labs serving Cameroon.",
                })}
              </p>
              <Link
                href="/a-propos"
                onClick={() => setFilmOpen(false)}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#0EA5E9] px-5 py-2.5 text-xs font-bold text-white hover:bg-white hover:text-[#071A33]"
              >
                {t({
                  fr: "Explorer l'histoire complète",
                  en: "Explore our complete story",
                })}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
