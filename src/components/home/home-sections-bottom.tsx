"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Banknote,
  BookOpen,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  CreditCard,
  Globe,
  HeartHandshake,
  Phone,
  Search,
  ShieldAlert,
  Smartphone,
  Video,
} from "lucide-react";
import { useLanguage } from "@/context/language-context";
import {
  DEPARTMENTS,
  DOCTORS,
  HEALTH_TIPS,
  HOSPITAL_CONTACT,
  JOURNEY_STEPS,
  NEWS_ARTICLES,
  PARTNERS,
  TARIFFS_SUMMARY,
  TIMELINE_ERAS,
} from "@/data/hospital-data";
import {
  ChamferedEditorialFrame,
  OverlappingImageShowcase,
} from "@/components/ui/framed-media";
import { MedicalBackdrop } from "@/components/ui/medical-backdrop";
import { VisitMapFacade } from "@/components/home/visit-map-facade";

const JOURNEY_STEP_LINKS = [
  { href: "/rendez-vous", label: { fr: "Réserver en ligne", en: "Book online" } },
  { href: "/departements", label: { fr: "Repérer les pavillons", en: "Explore pavilions" } },
  { href: "/services/laboratoire-central-iso", label: { fr: "Laboratoires ISO", en: "ISO Laboratories" } },
  { href: "/services/pharmacie-hospitaliere", label: { fr: "Pharmacie 24h/24", en: "24/7 Pharmacy" } },
  { href: "/services/maison-du-patient-medecine-generale", label: { fr: "Maison du Patient", en: "Patient House" } },
];

const FEATURED_DOCTOR_IDS = [
  "dr-ndom-ebongue",
  "dr-maah",
  "dr-ndame-koum",
  "dr-ngo-njock",
] as const;

export function HomeSectionsBottom() {
  const { t } = useLanguage();
  const [eraIndex, setEraIndex] = useState<number>(TIMELINE_ERAS.length - 1);
  const [doctorQuery, setDoctorQuery] = useState("");
  const [activeDoctorId, setActiveDoctorId] = useState<string>(FEATURED_DOCTOR_IDS[0]);
  const [journeyIndex, setJourneyIndex] = useState(0);
  const [tariffQuery, setTariffQuery] = useState("");
  const [newsCategory, setNewsCategory] = useState("all");
  const [partnerFilter, setPartnerFilter] = useState<"all" | "assurance" | "institution">("all");

  const activeEra = TIMELINE_ERAS[eraIndex] ?? TIMELINE_ERAS[0];
  const activeStep = JOURNEY_STEPS[journeyIndex] ?? JOURNEY_STEPS[0];
  const activeStepLink = JOURNEY_STEP_LINKS[journeyIndex] ?? JOURNEY_STEP_LINKS[0];

  const filteredPartners = useMemo(() => {
    if (partnerFilter === "all") return PARTNERS;
    return PARTNERS.filter((p) => p.category === partnerFilter);
  }, [partnerFilter]);

  const featuredDoctors = useMemo(() => {
    const q = doctorQuery.trim().toLowerCase();
    if (!q) {
      return FEATURED_DOCTOR_IDS.map((id) => DOCTORS.find((d) => d.id === id)).filter(
        (d): d is (typeof DOCTORS)[number] => Boolean(d)
      );
    }
    return DOCTORS.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.specialty.fr.toLowerCase().includes(q) ||
        d.specialty.en.toLowerCase().includes(q) ||
        d.role.fr.toLowerCase().includes(q) ||
        d.role.en.toLowerCase().includes(q)
    ).slice(0, 4);
  }, [doctorQuery]);

  const activeDoctorIndex = Math.max(
    0,
    featuredDoctors.findIndex((d) => d.id === activeDoctorId)
  );
  const activeDoctor = featuredDoctors[activeDoctorIndex] ?? featuredDoctors[0] ?? null;
  const activeDoctorDept = activeDoctor
    ? DEPARTMENTS.find((d) => d.slug === activeDoctor.departmentSlug)
    : undefined;

  const handleCycleDoctor = (delta: -1 | 1) => {
    if (featuredDoctors.length <= 1) return;
    const nextIdx =
      (activeDoctorIndex + delta + featuredDoctors.length) % featuredDoctors.length;
    const nextDoc = featuredDoctors[nextIdx];
    if (nextDoc) {
      setActiveDoctorId(nextDoc.id);
    }
  };

  const filteredTariffs = useMemo(() => {
    const q = tariffQuery.trim().toLowerCase();
    if (!q) return TARIFFS_SUMMARY;
    return TARIFFS_SUMMARY.filter(
      (item) =>
        item.label.fr.toLowerCase().includes(q) ||
        item.label.en.toLowerCase().includes(q) ||
        item.price.toLowerCase().includes(q)
    );
  }, [tariffQuery]);

  const visibleNews = useMemo(() => {
    const list =
      newsCategory === "all"
        ? NEWS_ARTICLES
        : NEWS_ARTICLES.filter((a) => a.categoryKey === newsCategory);
    return list.slice(0, 3);
  }, [newsCategory]);

  return (
    <>
      {/* ================================================================
          6. 95 ANS TIMELINE (#95ans) — Era Switcher + Campus Backdrop
          ================================================================ */}
      <section id="95ans" className="relative overflow-hidden bg-white py-16 lg:py-24">
        <MedicalBackdrop variant="campus" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#0D9488]">
                1920 · 1931 – 2026
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#071A33] sm:text-4xl">
                <span className="bg-gradient-to-r from-[#0A66C2] to-[#0D9488] bg-clip-text text-transparent">
                  {t({ fr: "95 ans", en: "95 years" })}
                </span>{" "}
                <span>
                  {t({
                    fr: "d'histoire, de soins et d'engagement",
                    en: "of heritage, care and commitment",
                  })}
                </span>
              </h2>
            </div>

            {/* Connected Clinical Timeline Bar */}
            <div
              role="group"
              aria-label={t({ fr: "Périodes historiques", en: "Historical eras" })}
              className="no-scrollbar relative flex items-center gap-2 overflow-x-auto pb-2"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-4 top-1/2 hidden h-0.5 -translate-y-1/2 bg-[#0A66C2]/15 sm:block"
              />
              {TIMELINE_ERAS.map((era, idx) => {
                const active = idx === eraIndex;
                return (
                  <button
                    key={era.year}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setEraIndex(idx)}
                    className={`relative z-10 inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all sm:text-sm ${
                      active
                        ? "bg-[#071A33] text-white shadow-md ring-4 ring-white"
                        : "border border-sky-200 bg-[#F4F8FC] text-[#475569] hover:border-[#0A66C2]"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        active ? "bg-[#38BDF8]" : "bg-[#0A66C2]/40"
                      }`}
                      aria-hidden="true"
                    />
                    <span className={`font-mono ${active ? "text-[#38BDF8]" : "text-[#0A66C2]"}`}>
                      {era.year}
                    </span>
                    <span>· {t(era.tabLabel)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-12 grid items-center gap-10 lg:grid-cols-12">
            <div className="order-2 min-w-0 lg:order-1 lg:col-span-6">
              <OverlappingImageShowcase
                primarySrc={activeEra.image}
                primaryAlt={t(activeEra.title)}
                secondarySrc={activeEra.secondaryImage}
                secondaryAlt={t(activeEra.subtitle)}
                ringColorClass="ring-white"
                align="left"
              />
            </div>

            <div className="order-1 min-w-0 lg:order-2 lg:col-span-6">
              <div className="rounded-3xl border border-sky-100 bg-[#F2F7FC] p-6 sm:p-9">
                <span className="inline-block rounded-full bg-[#E8F2FC] px-3 py-1 font-mono text-xs font-bold text-[#0A66C2]">
                  {activeEra.year} · {t(activeEra.subtitle)}
                </span>

                <h3 className="mt-4 text-2xl font-extrabold text-[#071A33] sm:text-3xl">
                  {t(activeEra.title)}
                </h3>

                <p className="mt-4 text-base leading-relaxed text-[#475569]">
                  {t(activeEra.description)}
                </p>

                <ul className="mt-6 space-y-2.5">
                  {activeEra.highlights.map((h) => (
                    <li
                      key={h.fr}
                      className="flex items-center gap-2.5 text-sm font-semibold text-[#071A33]"
                    >
                      <CheckCircle2
                        className="h-4 w-4 shrink-0 text-[#0D9488]"
                        aria-hidden="true"
                      />
                      <span>{t(h)}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap items-center justify-between gap-2 border-t border-sky-200/70 pt-5">
                  <button
                    type="button"
                    onClick={() =>
                      setEraIndex((prev) =>
                        prev === 0 ? TIMELINE_ERAS.length - 1 : prev - 1
                      )
                    }
                    className="rounded-full border border-sky-200 bg-white px-4 py-2 text-xs font-bold text-[#071A33] hover:border-[#0A66C2]"
                  >
                    ← {t({ fr: "Période précédente", en: "Previous era" })}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setEraIndex((prev) => (prev + 1) % TIMELINE_ERAS.length)
                    }
                    className="rounded-full bg-[#0A66C2] px-4 py-2 text-xs font-bold text-white hover:bg-[#071A33]"
                  >
                    {t({ fr: "Période suivante", en: "Next era" })} →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          7. PRACTITIONERS SHOWCASE (#medecins) — Clinical Dark-Glass Stage + Rail
          ================================================================ */}
      <section id="medecins" className="relative overflow-hidden bg-[#F4F8FC] py-16 lg:py-24">
        <MedicalBackdrop variant="clinical" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0A66C2]">
                {t({ fr: "Équipe médicale · 207 médecins", en: "Medical Team · 207 physicians" })}
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#071A33] sm:text-4xl">
                {t({ fr: "Trouver un praticien", en: "Find a practitioner" })}
              </h2>
            </div>

            <div className="flex min-w-0 w-full flex-col gap-3 sm:flex-row lg:w-auto">
              <div className="relative min-w-0 flex-1 sm:w-72">
                <label htmlFor="doctor-search-home" className="sr-only">
                  {t({ fr: "Rechercher un praticien", en: "Search a practitioner" })}
                </label>
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#475569]"
                  aria-hidden="true"
                />
                <input
                  id="doctor-search-home"
                  type="search"
                  value={doctorQuery}
                  onChange={(e) => setDoctorQuery(e.target.value)}
                  placeholder={t({
                    fr: "Nom ou spécialité (Cardiologie...)",
                    en: "Name or specialty...",
                  })}
                  className="w-full rounded-full border border-sky-200 bg-white py-3 pl-11 pr-4 text-sm text-[#071A33] shadow-sm focus:border-[#0A66C2] focus:outline-none"
                />
              </div>

              <Link
                href="/medecins"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#071A33] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0A66C2]"
              >
                <span>{t({ fr: "Tous nos médecins", en: "All doctors" })}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="relative mt-8 overflow-hidden rounded-[2rem] border border-sky-400/35 bg-gradient-to-br from-[#071A33] via-[#0B2447] to-[#082D4A] p-4 shadow-[0_28px_70px_-18px_rgba(7,26,51,0.65)] sm:p-6 lg:p-7">
            <MedicalBackdrop variant="dark-clinical" />

            {!activeDoctor ? (
              <div className="relative flex flex-col items-center justify-center rounded-[1.75rem] border border-sky-300/15 bg-[#0A1F3D]/85 px-6 py-12 text-center backdrop-blur-xl">
                <p className="text-base font-semibold text-white">
                  {t({
                    fr: "Aucun praticien sélectionné ne correspond à cette recherche.",
                    en: "No featured practitioner matches this search query.",
                  })}
                </p>
                <p className="mt-2 max-w-md text-sm text-slate-300">
                  {t({
                    fr: "Réinitialisez le filtre ou consultez l'annuaire complet de nos 207 médecins.",
                    en: "Reset the search filter or browse the full directory of our 207 physicians.",
                  })}
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setDoctorQuery("")}
                    className="inline-flex items-center justify-center rounded-full bg-[#0EA5E9] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#0284C7]"
                  >
                    {t({ fr: "Réinitialiser la recherche", en: "Reset search" })}
                  </button>
                  <Link
                    href="/medecins"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-[#38BDF8]/40 hover:bg-white/10"
                  >
                    <span>{t({ fr: "Voir l'annuaire (207)", en: "View directory (207)" })}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="relative grid items-stretch gap-5 lg:grid-cols-[minmax(0,1fr)_270px] xl:grid-cols-[minmax(0,1fr)_300px]">
                {/* Left Featured Practitioner Card */}
                <div className="min-w-0 rounded-[1.75rem] border border-sky-300/20 bg-[#0A1F3D]/80 p-5 shadow-[inset_0_1px_0_rgba(186,230,253,0.22)] backdrop-blur-2xl sm:p-8 lg:p-9">
                  <div className="grid h-full items-center gap-6 md:grid-cols-12 lg:gap-8">
                    {/* Editorial Info Column */}
                    <div className="flex h-full min-w-0 flex-col justify-between md:col-span-7">
                      <div>
                        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-400/40 bg-sky-400/15 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#38BDF8] shadow-[0_0_18px_-4px_rgba(56,189,248,0.45)]">
                          <span className="relative flex h-2 w-2 items-center justify-center" aria-hidden="true">
                            <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-[#38BDF8]" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#38BDF8]" />
                          </span>
                          {t(activeDoctor.specialty)}
                        </span>

                        <h3 className="mt-5 break-words text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl lg:text-[2.1rem]">
                          {activeDoctor.name}
                        </h3>

                        <p className="mt-2 text-base font-semibold text-slate-200 sm:text-lg">
                          {t(activeDoctor.role)}
                        </p>

                        <div className="mt-4 space-y-2 text-sm text-slate-300/90">
                          {activeDoctorDept ? (
                            <p className="flex items-start gap-2.5">
                              <Building2
                                className="mt-0.5 h-4 w-4 shrink-0 text-[#38BDF8]"
                                aria-hidden="true"
                              />
                              <span className="min-w-0 break-words">
                                {t(activeDoctorDept.name)}
                                {activeDoctorDept.building
                                  ? ` · ${t(activeDoctorDept.building)}`
                                  : ""}
                              </span>
                            </p>
                          ) : null}

                          <p className="flex items-start gap-2.5">
                            <Clock
                              className="mt-0.5 h-4 w-4 shrink-0 text-[#38BDF8]"
                              aria-hidden="true"
                            />
                            <span className="min-w-0 break-words">{t(activeDoctor.schedule)}</span>
                          </p>

                          <p className="flex items-start gap-2.5">
                            <Globe
                              className="mt-0.5 h-4 w-4 shrink-0 text-[#38BDF8]"
                              aria-hidden="true"
                            />
                            <span className="min-w-0 break-words">
                              {activeDoctor.languages.join(" · ")}
                            </span>
                          </p>
                        </div>

                        <div className="mt-6 flex flex-wrap items-center gap-3">
                          <Link
                            href={`/rendez-vous?medecin=${activeDoctor.id}`}
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0EA5E9] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-[#0284C7]"
                          >
                            <Calendar className="h-4 w-4" aria-hidden="true" />
                            <span>{t({ fr: "Prendre rendez-vous", en: "Book appointment" })}</span>
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                          </Link>

                          <Link
                            href="/medecins"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-[#38BDF8]/40 hover:bg-white/10"
                          >
                            <span>{t({ fr: "Voir l'annuaire (207)", en: "View directory (207)" })}</span>
                          </Link>
                        </div>
                      </div>

                      <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                          {featuredDoctors.length}{" "}
                          {t({
                            fr:
                              featuredDoctors.length > 1
                                ? "PROFILS · SÉLECTIONNEZ UN PRATICIEN"
                                : "PROFIL · PRATICIEN SÉLECTIONNÉ",
                            en:
                              featuredDoctors.length > 1
                                ? "PROFILES · SELECT A PHYSICIAN"
                                : "PROFILE · SELECTED PHYSICIAN",
                          })}
                        </p>

                        {featuredDoctors.length > 1 ? (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleCycleDoctor(-1)}
                              aria-label={t({
                                fr: "Praticien précédent",
                                en: "Previous practitioner",
                              })}
                              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-[#38BDF8]/50 hover:bg-white/10"
                            >
                              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleCycleDoctor(1)}
                              aria-label={t({
                                fr: "Praticien suivant",
                                en: "Next practitioner",
                              })}
                              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-[#38BDF8]/50 hover:bg-white/10"
                            >
                              <ChevronRight className="h-4 w-4" aria-hidden="true" />
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </div>

                    {/* Clean Unobstructed Portrait Column */}
                    <div className="min-w-0 md:col-span-5">
                      <div className="relative mx-auto aspect-[4/5] w-full max-w-[300px] overflow-hidden rounded-[1.5rem] border border-sky-300/25 bg-[#0E294E] ring-1 ring-sky-300/30 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.7),0_0_36px_-10px_rgba(56,189,248,0.32)]">
                        <Image
                          key={activeDoctor.id}
                          src={activeDoctor.photo}
                          alt={activeDoctor.name}
                          fill
                          sizes="(min-width: 1024px) 300px, (min-width: 768px) 38vw, 85vw"
                          className="object-cover object-top"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Vertical Profile Selector Rail */}
                <div
                  className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:flex-col lg:justify-center"
                  role="group"
                  aria-label={t({
                    fr: "Sélection des profils médicaux",
                    en: "Medical profile selector",
                  })}
                >
                  {featuredDoctors.map((doc) => {
                    const isActive = doc.id === activeDoctor.id;
                    return (
                      <button
                        key={doc.id}
                        type="button"
                        onClick={() => setActiveDoctorId(doc.id)}
                        aria-pressed={isActive}
                        className={`relative flex min-w-0 items-center gap-3.5 overflow-hidden rounded-2xl border p-3 text-left transition-all duration-200 ${
                          isActive
                            ? "border-sky-400/55 bg-gradient-to-r from-sky-400/20 via-[#102C54]/90 to-[#0B2142]/85 shadow-[0_12px_30px_-10px_rgba(56,189,248,0.28)]"
                            : "border-white/10 bg-white/[0.04] hover:border-sky-400/30 hover:bg-white/[0.08]"
                        }`}
                      >
                        {isActive ? (
                          <span
                            aria-hidden="true"
                            className="absolute inset-y-2.5 left-0 w-[3px] rounded-r-full bg-[#38BDF8] shadow-[0_0_12px_rgba(56,189,248,0.9)]"
                          />
                        ) : null}

                        <div className="relative h-12 w-12 shrink-0 sm:h-14 sm:w-14">
                          <div
                            className={`relative h-full w-full overflow-hidden rounded-full border-2 ${
                              isActive ? "border-[#38BDF8]" : "border-white/20"
                            }`}
                          >
                            <Image
                              src={doc.photo}
                              alt={doc.name}
                              fill
                              sizes="56px"
                              className="object-cover object-top"
                            />
                          </div>
                          <span
                            aria-hidden="true"
                            className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#2DD4BF] ring-2 ring-[#071A33]"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-bold text-white" title={doc.name}>
                            {doc.name}
                          </p>
                          <p className="mt-0.5 truncate text-xs text-slate-300/85">
                            {t(doc.specialty)}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================================================================
          8. PATIENT JOURNEY (#parcours) — Interactive 5-Step Flow + Backdrop
          ================================================================ */}
      <section id="parcours" className="relative overflow-hidden bg-white py-16 lg:py-24">
        <MedicalBackdrop variant="campus" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0A66C2]">
              {t({ fr: "Parcours simplifié", en: "Guided Patient Care" })}
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#071A33] sm:text-4xl">
              {t({ fr: "Votre parcours à Laquintinie", en: "Your journey at Laquintinie" })}
            </h2>
            <p className="mt-2 text-base text-[#475569]">
              {t({
                fr: "Avant, pendant et après votre venue : chaque étape expliquée simplement pour vous et vos proches.",
                en: "Before, during, and after your visit: every step explained clearly for you and your family.",
              })}
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            {/* Step Buttons with vertical progress connector */}
            <div className="relative min-w-0 space-y-2.5 lg:col-span-5">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-7 left-9 top-7 hidden w-0.5 bg-[#0A66C2]/15 sm:block"
              />
              {JOURNEY_STEPS.map((step, idx) => {
                const active = idx === journeyIndex;
                return (
                  <button
                    key={step.number}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setJourneyIndex(idx)}
                    className={`relative z-10 flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all ${
                      active
                        ? "border-[#0A66C2] bg-[#071A33] text-white shadow-lg"
                        : "border-sky-100 bg-[#F2F7FC] text-[#071A33] hover:border-[#0A66C2]/40"
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-mono text-sm font-bold ${
                        active
                          ? "bg-[#38BDF8] text-[#071A33]"
                          : idx < journeyIndex
                            ? "bg-teal-50 text-[#0D9488] ring-1 ring-teal-200"
                            : "bg-white text-[#071A33]"
                      }`}
                    >
                      {step.number}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{t(step.title)}</p>
                      <p
                        className={`truncate text-xs ${
                          active ? "text-slate-300" : "text-[#475569]"
                        }`}
                      >
                        {t(step.subtitle)}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Step Detail Panel */}
            <div className="min-w-0 lg:col-span-7">
              <div className="flex h-full flex-col justify-between rounded-3xl border border-sky-100 bg-[#F2F7FC] p-6 sm:p-10">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#0A66C2]/10 px-3.5 py-1 font-mono text-xs font-bold text-[#0A66C2]">
                    {t({ fr: "Étape", en: "Step" })} {activeStep.number} / 05
                  </span>

                  <h3 className="mt-4 text-2xl font-extrabold text-[#071A33] sm:text-3xl">
                    {t(activeStep.title)}
                  </h3>
                  <p className="mt-2 text-base text-[#475569]">
                    {t(activeStep.subtitle)}
                  </p>

                  <ul className="mt-7 space-y-3.5">
                    {activeStep.points.map((pt) => (
                      <li
                        key={pt.fr}
                        className="flex items-start gap-3 rounded-2xl border border-white bg-white p-4 shadow-sm"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-5 w-5 shrink-0 text-[#0D9488]"
                          aria-hidden="true"
                        />
                        <span className="text-sm font-medium text-[#071A33]">
                          {t(pt)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-sky-200/70 pt-5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Link
                      href="/rendez-vous"
                      className="inline-flex items-center gap-2 rounded-full bg-[#0A66C2] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#071A33]"
                    >
                      <Calendar className="h-4 w-4" aria-hidden="true" />
                      {t({ fr: "Prendre rendez-vous", en: "Book appointment" })}
                    </Link>
                    <Link
                      href={activeStepLink.href}
                      className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-white px-4 py-2.5 text-xs font-bold text-[#071A33] transition-colors hover:border-[#0A66C2] hover:text-[#0A66C2]"
                    >
                      <span>{t(activeStepLink.label)}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setJourneyIndex((prev) =>
                          prev === 0 ? JOURNEY_STEPS.length - 1 : prev - 1
                        )
                      }
                      aria-label={t({ fr: "Étape précédente", en: "Previous step" })}
                      className="rounded-full border border-sky-200 bg-white px-3.5 py-2 text-xs font-bold text-[#071A33] hover:border-[#0A66C2]"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setJourneyIndex((prev) => (prev + 1) % JOURNEY_STEPS.length)
                      }
                      aria-label={t({ fr: "Étape suivante", en: "Next step" })}
                      className="rounded-full border border-sky-200 bg-white px-3.5 py-2 text-xs font-bold text-[#071A33] hover:border-[#0A66C2]"
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          9. URGENCES 24H/24 (#urgences) — Emergency Backdrop + Photography
          ================================================================ */}
      <section
        id="urgences"
        className="relative overflow-hidden bg-gradient-to-br from-[#071A33] via-[#0B2242] to-[#1A0D18] py-16 text-white lg:py-24"
      >
        <MedicalBackdrop variant="emergency" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="min-w-0 lg:col-span-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#ef4444]/40 bg-[#C81E1E]/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-red-200">
                <span className="relative flex h-2.5 w-2.5 items-center justify-center" aria-hidden="true">
                  <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-[#ef4444]" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ef4444]" />
                </span>
                {t({ fr: "Urgences · 24h/24 · 7j/7", en: "Emergencies · 24/7" })}
              </span>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {t({ fr: "Besoin de soins urgents ?", en: "Need urgent medical care?" })}
              </h2>

              <p className="mt-3 text-base leading-relaxed text-slate-300">
                {t({
                  fr: "En cas d'urgence médicale, chirurgicale, pédiatrique ou gynécologique, présentez-vous directement sans rendez-vous ou appelez nos lignes d'urgence.",
                  en: "For any medical, surgical, pediatric, or obstetric emergency, walk straight in without an appointment or call our 24/7 emergency lines.",
                })}
              </p>

              {/* Clickable Emergency Action Buttons */}
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <a
                  href={`tel:${HOSPITAL_CONTACT.emergencyPhoneRaw}`}
                  className="flex items-center justify-between rounded-2xl bg-[#C81E1E] px-5 py-4 text-white shadow-xl transition-colors hover:bg-[#dc2626]"
                >
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-red-100">
                      {t({ fr: "Urgences Laquintinie", en: "Laquintinie ER Line" })}
                    </span>
                    <span className="mt-1 block font-mono text-base font-bold">
                      {HOSPITAL_CONTACT.emergencyPhone}
                    </span>
                  </div>
                  <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
                </a>

                <a
                  href={`tel:${HOSPITAL_CONTACT.samuNumber}`}
                  className="flex items-center justify-between rounded-2xl border border-white/25 bg-white/10 px-5 py-4 text-white backdrop-blur-md transition-colors hover:bg-white/20"
                >
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-[#38BDF8]">
                      {t({ fr: "SAMU · Numéro national", en: "SAMU · National Hotline" })}
                    </span>
                    <span className="mt-1 block font-mono text-lg font-extrabold">
                      {HOSPITAL_CONTACT.samuNumber}
                    </span>
                  </div>
                  <ShieldAlert className="h-5 w-5 shrink-0 text-[#ef4444]" aria-hidden="true" />
                </a>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                  <p className="text-sm font-bold text-white">
                    {t({ fr: "Urgences adultes", en: "Adult Emergency" })}
                  </p>
                  <p className="mt-1 text-xs text-slate-300">
                    {t({ fr: "Urgences médico-chirurgicales", en: "Medical & surgical triage" })}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                  <p className="text-sm font-bold text-white">
                    {t({ fr: "Urgences pédiatriques", en: "Pediatric Emergency" })}
                  </p>
                  <p className="mt-1 text-xs text-slate-300">
                    Pavillon Samuel Eto’o Fils
                  </p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                  <p className="text-sm font-bold text-white">
                    {t({ fr: "Urgences gynécologiques", en: "OB/GYN Emergency" })}
                  </p>
                  <p className="mt-1 text-xs text-slate-300">
                    {t({ fr: "Maternité & blocs obstétricaux", en: "Maternity & OB suites" })}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                  <p className="text-sm font-bold text-white">
                    {t({ fr: "Supervision 24h/24", en: "24/7 Supervision" })}
                  </p>
                  <p className="mt-1 text-xs text-slate-300">
                    {t({
                      fr: "Permanence technico-administrative & Maison du Patient",
                      en: "On-site medical & Patient House coordination",
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Overlapping Emergency & Pediatric ER Photos */}
            <div className="min-w-0 lg:col-span-6">
              <OverlappingImageShowcase
                primarySrc="/images/campus/emergency-building.webp"
                primaryAlt={t({
                  fr: "Entrée du service des urgences de l'Hôpital Laquintinie de Douala",
                  en: "Emergency entrance of Laquintinie Hospital Douala",
                })}
                primaryBadge={t({ fr: "Accueil 24h/24 · Sans rendez-vous", en: "Walk-in 24/7" })}
                secondarySrc="/images/gallery/pediatrie-urgences-1.webp"
                secondaryAlt={t({
                  fr: "Pavillon Samuel Eto'o Fils — Urgences pédiatriques",
                  en: "Samuel Eto'o Fils Pavilion — Pediatric Emergency",
                })}
                secondaryCaption="Pavillon Samuel Eto’o Fils"
                ringColorClass="ring-[#0B1E3B]"
                align="right"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          10. APPLICATION MOBILE — Clinical Card + Geometric Backdrop
          ================================================================ */}
      <section className="relative overflow-hidden bg-[#F4F8FC] py-16 lg:py-24">
        <MedicalBackdrop variant="clinical" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.25rem] border border-sky-200/75 bg-gradient-to-br from-white via-[#F0F7FF] to-[#E0F2FE] p-6 shadow-premium sm:p-12">
            {/* Animated glowing concentric rings behind mobile mockups */}
            <div
              aria-hidden="true"
              className="animate-aura-breathe pointer-events-none absolute right-2 top-1/2 hidden h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.18),rgba(20,184,166,0.08)_50%,transparent_72%)] lg:block"
            />
            <div
              aria-hidden="true"
              className="animate-orbit-spin pointer-events-none absolute -right-12 top-1/2 hidden h-96 w-96 -translate-y-1/2 rounded-full border border-dashed border-[#0A66C2]/25 bg-white/30 lg:block"
            />
            <div
              aria-hidden="true"
              className="animate-orbit-reverse pointer-events-none absolute -right-4 top-1/2 hidden h-72 w-72 -translate-y-1/2 rounded-full border border-[#0D9488]/25 lg:block"
            />
            <div className="relative grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="min-w-0 lg:col-span-6">
                <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#0D9488]">
                  <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
                  {t({ fr: "Bientôt disponible", en: "Coming soon" })}
                </span>

                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#071A33] sm:text-4xl">
                  {t({
                    fr: "Votre hôpital, dans votre poche",
                    en: "Your hospital, in your pocket",
                  })}
                </h2>

                <p className="mt-3 text-base leading-relaxed text-[#475569]">
                  {t({
                    fr: "L'application mobile MyLaquintinie arrive prochainement sur Google Play et l'App Store pour réserver pour vous ou un proche, payer en ligne et présenter votre reçu QR code à l'accueil.",
                    en: "The MyLaquintinie mobile app is launching soon on Google Play and the App Store for seamless booking, mobile payments, and QR check-in receipts.",
                  })}
                </p>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  {[
                    { fr: "Rendez-vous 24h/24", en: "24/7 Booking" },
                    { fr: "Pour un proche", en: "Family Booking" },
                    { fr: "Paiement Mobile Money", en: "Mobile Money" },
                    { fr: "Reçus & QR code", en: "QR Code Receipts" },
                    { fr: "Plan des pavillons", en: "Campus Map" },
                    { fr: "Accès Urgences", en: "ER Directory" },
                  ].map((tag) => (
                    <span
                      key={tag.fr}
                      className="rounded-full border border-sky-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#071A33]"
                    >
                      {t(tag)}
                    </span>
                  ))}
                </div>

                {/* Localized French / English Store Badges */}
                <div className="mt-8 flex flex-wrap items-center gap-3.5">
                  <div className="inline-flex items-center gap-3 rounded-2xl bg-[#071A33] px-5 py-3 text-white shadow-md">
                    <Smartphone className="h-6 w-6 text-[#38BDF8]" aria-hidden="true" />
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-slate-300">
                        {t({ fr: "Bientôt sur", en: "Coming soon on" })}
                      </span>
                      <span className="block text-sm font-bold">Google Play</span>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-3 rounded-2xl border border-sky-200 bg-white px-5 py-3 text-[#071A33] shadow-sm">
                    <Smartphone className="h-6 w-6 text-[#0A66C2]" aria-hidden="true" />
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-[#475569]">
                        {t({ fr: "Bientôt sur", en: "Coming soon on" })}
                      </span>
                      <span className="block text-sm font-bold">App Store</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dual Overlapping Phone Screenshots (strictly contained, zero overflow) */}
              <div className="relative flex min-w-0 items-center justify-center pb-2 lg:col-span-6">
                <div className="relative mx-auto w-full max-w-[230px] pb-6 sm:max-w-[320px] sm:pr-16">
                  <div className="relative mx-auto aspect-[9/19] w-[210px] overflow-hidden rounded-[2.25rem] border-8 border-[#071A33] bg-white shadow-2xl sm:mx-0 sm:w-[230px] sm:rounded-[2.5rem]">
                    <Image
                      src="/images/campus/app-phone-appointment.webp"
                      alt={t({
                        fr: "Écran de prise de rendez-vous de l'application mobile Laquintinie",
                        en: "Laquintinie mobile app appointment booking screen",
                      })}
                      fill
                      sizes="240px"
                      className="object-cover"
                    />
                  </div>

                  {/* Overlapping second phone receipt screen */}
                  <div className="absolute bottom-0 right-0 hidden aspect-[9/19] w-[135px] overflow-hidden rounded-[1.75rem] border-4 border-white bg-[#071A33] shadow-2xl ring-1 ring-sky-200 sm:block sm:w-[150px] sm:rounded-[2rem]">
                    <Image
                      src="/images/campus/app-phone-receipt.webp"
                      alt={t({
                        fr: "Écran du reçu avec QR code dans l'application Laquintinie",
                        en: "QR code appointment receipt screen in Laquintinie app",
                      })}
                      fill
                      sizes="150px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          11. INFOS PRATIQUES, MAP FACADE, HORAIRES & TARIFS (#infos, #contact, #tarifs)
          ================================================================ */}
      <section id="infos" className="relative overflow-hidden bg-white py-16 lg:py-24">
        <MedicalBackdrop variant="campus" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0A66C2]">
              {t({ fr: "Informations pratiques", en: "Practical Information" })}
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#071A33] sm:text-4xl">
              {t({ fr: "Bien préparer sa visite", en: "Plan your hospital visit" })}
            </h2>
            <p className="mt-2 text-base text-[#475569]">
              {t({
                fr: "Adresse, horaires, numéros utiles cliquables et grille tarifaire transparente.",
                en: "Address, opening hours, clickable emergency numbers, and transparent consultation fees.",
              })}
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            {/* Left: Privacy-First Map Facade + Hours */}
            <div className="min-w-0 space-y-6 lg:col-span-6">
              <VisitMapFacade />

              <div className="rounded-3xl border border-sky-100 bg-[#F2F7FC] p-6">
                <h3 className="flex items-center gap-2 text-base font-bold text-[#071A33]">
                  <Clock className="h-5 w-5 text-[#0A66C2]" aria-hidden="true" />
                  {t({ fr: "Horaires d'accueil", en: "Opening Hours" })}
                </h3>
                <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white p-3.5">
                    <dt className="text-xs font-semibold text-[#475569]">
                      {t({ fr: "Consultations externes", en: "Outpatient clinics" })}
                    </dt>
                    <dd className="mt-1 font-mono text-sm font-bold text-[#071A33]">
                      Lun – Ven · 07h30 – 15h30
                    </dd>
                  </div>
                  <div className="rounded-2xl bg-white p-3.5">
                    <dt className="text-xs font-semibold text-[#475569]">
                      {t({ fr: "Services administratifs", en: "Administration" })}
                    </dt>
                    <dd className="mt-1 font-mono text-sm font-bold text-[#071A33]">
                      Lun – Ven · 07h30 – 18h00
                    </dd>
                  </div>
                  <div className="rounded-2xl bg-white p-3.5">
                    <dt className="text-xs font-semibold text-[#475569]">
                      {t({ fr: "Laboratoire & Pharmacie", en: "Lab & Pharmacy" })}
                    </dt>
                    <dd className="mt-1 font-mono text-sm font-bold text-[#0D9488]">
                      24h/24 · 7j/7
                    </dd>
                  </div>
                  <div className="rounded-2xl bg-white p-3.5">
                    <dt className="text-xs font-semibold text-[#475569]">
                      {t({ fr: "Heures de visites", en: "Visiting hours" })}
                    </dt>
                    <dd className="mt-1 font-mono text-sm font-bold text-[#071A33]">
                      12h – 14h · 17h – 19h
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Right: WCAG-Compliant Useful Phones (#contact) + Tariffs (#tarifs) */}
            <div className="min-w-0 space-y-6 lg:col-span-6">
              {/* Numéros utiles */}
              <div id="contact" className="rounded-3xl border border-sky-100 bg-[#F2F7FC] p-5 sm:p-6">
                <h3 className="text-base font-bold text-[#071A33]">
                  {t({ fr: "Numéros utiles", en: "Direct Phone Lines" })}
                </h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <a
                      href={`tel:${HOSPITAL_CONTACT.emergencyPhoneRaw}`}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-[#C81E1E]/25 bg-white p-3.5 transition-colors hover:border-[#C81E1E]"
                    >
                      <span className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#C81E1E] text-white">
                          <Phone className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span className="text-sm font-bold text-[#071A33]">
                          {t({ fr: "Urgences 24h/24", en: "24/7 Emergencies" })}
                        </span>
                      </span>
                      <span className="font-mono text-sm font-bold text-[#C81E1E]">
                        {HOSPITAL_CONTACT.emergencyPhone}
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${HOSPITAL_CONTACT.samuNumber}`}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-sky-200 bg-white p-3.5 transition-colors hover:border-[#C81E1E]"
                    >
                      <span className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#071A33] text-[#38BDF8]">
                          <ShieldAlert className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span className="text-sm font-bold text-[#071A33]">
                          SAMU / Assistance nationale
                        </span>
                      </span>
                      <span className="font-mono text-sm font-bold text-[#071A33]">
                        {HOSPITAL_CONTACT.samuNumber}
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${HOSPITAL_CONTACT.standardPhoneRaw}`}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-sky-200 bg-white p-3.5 transition-colors hover:border-[#0A66C2]"
                    >
                      <span className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F2FC] text-[#0A66C2]">
                          <Phone className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span className="text-sm font-bold text-[#071A33]">
                          {t({
                            fr: "Standard & Rendez-vous",
                            en: "Main Switchboard & Booking",
                          })}
                        </span>
                      </span>
                      <span className="font-mono text-sm font-bold text-[#0A66C2]">
                        {HOSPITAL_CONTACT.standardPhone}
                      </span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Searchable Tarifs */}
              <div id="tarifs" className="rounded-3xl border border-sky-100 bg-[#F2F7FC] p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-base font-bold text-[#071A33]">
                    {t({ fr: "Tarifs indicatifs", en: "Indicative Fees" })}
                  </h3>
                  <div className="relative w-full sm:w-56">
                    <label htmlFor="tariff-search" className="sr-only">
                      {t({ fr: "Rechercher une prestation", en: "Search a fee" })}
                    </label>
                    <input
                      id="tariff-search"
                      type="search"
                      value={tariffQuery}
                      onChange={(e) => setTariffQuery(e.target.value)}
                      placeholder={t({ fr: "Filtrer un tarif...", en: "Filter fees..." })}
                      className="w-full rounded-full border border-sky-200 bg-white px-4 py-2 text-xs text-[#071A33] focus:border-[#0A66C2] focus:outline-none"
                    />
                  </div>
                </div>

                <dl className="mt-4 divide-y divide-sky-100 rounded-2xl border border-white bg-white px-4">
                  {filteredTariffs.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col gap-1 py-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                    >
                      <div className="min-w-0">
                        <dt className="font-semibold text-[#071A33]">{t(item.label)}</dt>
                        <dd className="text-xs text-[#475569]">{t(item.note)}</dd>
                      </div>
                      <dd className="shrink-0 font-mono text-sm font-bold text-[#0A66C2]">
                        {item.price}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[#475569]">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 font-medium">
                    <Banknote className="h-3.5 w-3.5 text-[#0D9488]" aria-hidden="true" />
                    {t({ fr: "Espèces", en: "Cash" })}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 font-medium">
                    <Smartphone className="h-3.5 w-3.5 text-[#0EA5E9]" aria-hidden="true" />
                    Mobile Money
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 font-medium">
                    <CreditCard className="h-3.5 w-3.5 text-[#0A66C2]" aria-hidden="true" />
                    {t({ fr: "Carte bancaire", en: "Card" })}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 font-medium">
                    <HeartHandshake className="h-3.5 w-3.5 text-[#071A33]" aria-hidden="true" />
                    {t({ fr: "Assurance / Employeur", en: "Insurance / Employer" })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          12. ACTUALITÉS (Chronological) & ASTUCES SANTÉ + BACKDROP
          ================================================================ */}
      <section className="relative overflow-hidden bg-[#F4F8FC] py-16 lg:py-24">
        <MedicalBackdrop variant="clinical" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0A66C2]">
                {t({ fr: "Vie de l'établissement", en: "Hospital Updates" })}
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#071A33] sm:text-4xl">
                {t({ fr: "Actualités de Laquintinie", en: "Laquintinie News" })}
              </h2>
            </div>

            <Link
              href="/actualites"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#0A66C2] hover:underline"
            >
              {t({ fr: "Toutes les actualités", en: "All news" })}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="no-scrollbar mt-6 flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { key: "all", label: { fr: "Toutes", en: "All" } },
              { key: "innovations", label: { fr: "Innovations", en: "Innovations" } },
              { key: "actualites", label: { fr: "Actualités", en: "News" } },
              { key: "communiques", label: { fr: "Communiqués", en: "Press Releases" } },
              { key: "95-ans", label: { fr: "95 ans", en: "95th Anniversary" } },
              { key: "campagnes", label: { fr: "Campagnes", en: "Campaigns" } },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                aria-pressed={newsCategory === tab.key}
                onClick={() => setNewsCategory(tab.key)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                  newsCategory === tab.key
                    ? "bg-[#071A33] text-white"
                    : "border border-sky-200 bg-white text-[#475569] hover:border-[#0A66C2]"
                }`}
              >
                {t(tab.label)}
              </button>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleNews.map((article) => (
              <article
                key={article.slug}
                className="group flex flex-col overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-premium transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-hover"
              >
                <div className="p-3 pb-0">
                  <ChamferedEditorialFrame
                    src={article.image}
                    alt={t(article.title)}
                    aspectClass="aspect-[16/10]"
                    label={t(article.category)}
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-[#475569]">
                      <Calendar className="h-3.5 w-3.5 text-[#0D9488]" aria-hidden="true" />
                      <time dateTime={article.dateISO}>{t(article.dateLabel)}</time>
                      <span>·</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold leading-snug text-[#071A33] group-hover:text-[#0A66C2]">
                      <Link href={`/actualites#${article.slug}`}>
                        {t(article.title)}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#475569]">
                      {t(article.excerpt)}
                    </p>
                  </div>
                  <Link
                    href={`/actualites#${article.slug}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#0A66C2] hover:underline"
                  >
                    {t({ fr: "Lire l'article", en: "Read article" })}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Health Tips Row */}
          <div className="mt-16">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-2xl font-extrabold text-[#071A33] sm:text-3xl">
                  {t({ fr: "Astuces santé", en: "Health Tips" })}
                </h2>
                <p className="mt-1 text-sm text-[#475569]">
                  {t({
                    fr: "Des conseils simples rédigés avec nos équipes médicales.",
                    en: "Practical health advice authored with our medical teams.",
                  })}
                </p>
              </div>
              <Link
                href="/actualites#astuces"
                className="text-sm font-bold text-[#0A66C2] hover:underline"
              >
                {t({ fr: "Toutes les astuces →", en: "All tips →" })}
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {HEALTH_TIPS.map((tip) => (
                <Link
                  key={tip.slug}
                  href={`/actualites#astuces`}
                  className="group overflow-hidden rounded-3xl border border-sky-100 bg-white p-4 shadow-premium transition-all hover:-translate-y-1 hover:shadow-premium-hover"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#E6F0FA]">
                    <Image
                      src={tip.image}
                      alt={t(tip.title)}
                      fill
                      sizes="320px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-3.5 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#0A66C2]">
                    <span>{t(tip.category)}</span>
                    <span className="text-[#475569]/40">·</span>
                    <span className="inline-flex items-center gap-1 text-[#071A33]">
                      {tip.format.fr.includes("Vidéo") ? (
                        <Video className="h-3 w-3 text-[#0D9488]" aria-hidden="true" />
                      ) : (
                        <BookOpen className="h-3 w-3 text-[#0D9488]" aria-hidden="true" />
                      )}
                      {t(tip.format)}
                    </span>
                  </p>
                  <h3 className="mt-1 text-sm font-bold leading-snug text-[#071A33] group-hover:text-[#0A66C2]">
                    {t(tip.title)}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#475569]">
                    {t(tip.summary)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          13. GALLERY SHOWCASE (#galerie) & PARTNERS (#partenaires)
          ================================================================ */}
      <section id="galerie" className="relative overflow-hidden bg-white py-16 lg:py-20">
        <MedicalBackdrop variant="campus" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0D9488]">
                {t({ fr: "Visite guidée des pavillons", en: "Campus Showcase" })}
              </p>
              <h2 className="mt-2 text-3xl font-extrabold text-[#071A33]">
                {t({
                  fr: "Visitez Laquintinie, département par département",
                  en: "Tour Laquintinie, department by department",
                })}
              </h2>
            </div>
            <Link
              href="/departements"
              className="text-sm font-bold text-[#0A66C2] hover:underline"
            >
              {t({ fr: "Voir tous les départements →", en: "View all departments →" })}
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                num: "01",
                title: { fr: "Chirurgie générale & Blocs", en: "General Surgery & ORs" },
                sub: { fr: "Cardiologie · Bâtiments A, B, C, D", en: "Cardiology · Buildings A–D" },
                image: "/images/gallery/chirurgie-bloc-1.webp",
                href: "/services/chirurgie-viscerale-traumatologie",
              },
              {
                num: "02",
                title: { fr: "Gynécologie & Maternité", en: "Gynecology & Maternity" },
                sub: { fr: "Maternité · Hospitalisation", en: "Maternity · Inpatient Suites" },
                image: "/images/gallery/maternite-1.webp",
                href: "/services/maternite",
              },
              {
                num: "03",
                title: { fr: "Pédiatrie & Néonatologie", en: "Pediatrics & NICU" },
                sub: { fr: "Pavillon Samuel Eto'o Fils", en: "Samuel Eto'o Fils Pavilion" },
                image: "/images/gallery/neonatologie-2.webp",
                href: "/services/pediatrie-urgences-pediatriques",
              },
            ].map((item) => (
              <Link
                key={item.num}
                href={item.href}
                className="group relative overflow-hidden rounded-t-[2.25rem] rounded-b-3xl border border-sky-200/70 bg-[#071A33] shadow-premium"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={t(item.title)}
                    fill
                    sizes="(min-width: 768px) 400px, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="relative p-6 text-white">
                  <span className="font-mono text-xs font-bold text-[#38BDF8]">
                    {item.num}
                  </span>
                  <h3 className="mt-1 text-lg font-bold">{t(item.title)}</h3>
                  <p className="mt-1 text-xs text-slate-300">{t(item.sub)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partenaires" className="relative overflow-hidden bg-[#F4F8FC] py-14">
        <MedicalBackdrop variant="clinical" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-extrabold text-[#071A33] sm:text-3xl">
              {t({
                fr: "Nos partenaires & assureurs agréés",
                en: "Our Partners & Accredited Insurers",
              })}
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-[#475569]">
              {t({
                fr: "Institutions publiques, grandes entreprises camerounaises et compagnies d'assurance conventionnées.",
                en: "Public institutions, leading corporate employers, and accredited health insurance partners.",
              })}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {[
              { key: "all" as const, label: { fr: `Tous (${PARTNERS.length})`, en: `All (${PARTNERS.length})` } },
              {
                key: "assurance" as const,
                label: {
                  fr: `Assurances agréées (${PARTNERS.filter((p) => p.category === "assurance").length})`,
                  en: `Accredited Insurers (${PARTNERS.filter((p) => p.category === "assurance").length})`,
                },
              },
              {
                key: "institution" as const,
                label: {
                  fr: `Entreprises & Institutions (${PARTNERS.filter((p) => p.category === "institution").length})`,
                  en: `Corporate & Public (${PARTNERS.filter((p) => p.category === "institution").length})`,
                },
              },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                aria-pressed={partnerFilter === tab.key}
                onClick={() => setPartnerFilter(tab.key)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                  partnerFilter === tab.key
                    ? "bg-[#071A33] text-white shadow-sm"
                    : "border border-sky-200 bg-white text-[#475569] hover:border-[#0A66C2]"
                }`}
              >
                {t(tab.label)}
              </button>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
            {filteredPartners.map((partner) => (
              <div
                key={partner.id}
                className="group flex flex-col items-center justify-between rounded-2xl border border-sky-100 bg-white p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#0A66C2]/30 hover:shadow-md"
              >
                <div className="flex h-12 w-full items-center justify-center">
                  <Image
                    src={partner.logo}
                    alt={`Logo ${partner.name}`}
                    width={120}
                    height={56}
                    className="max-h-10 w-auto object-contain"
                  />
                </div>
                <p className="mt-2 line-clamp-1 text-center text-[10px] font-semibold text-[#475569] group-hover:text-[#071A33]">
                  {partner.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
