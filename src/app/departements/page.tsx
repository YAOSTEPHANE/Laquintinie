"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Calendar,
  ChevronDown,
  LayoutGrid,
  List,
  Search,
  Sparkles,
  Stethoscope,
  Users,
} from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { DEPARTMENTS, DOCTORS, SERVICES } from "@/data/hospital-data";
import { OverlappingImageShowcase } from "@/components/ui/framed-media";
import { PageHero } from "@/components/ui/page-hero";

export default function DepartementsPage() {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState<"accordion" | "bento">("accordion");
  const [expandedSlugs, setExpandedSlugs] = useState<string[]>(["gynecologie"]);

  // Hash deep-linking (#gynecologie, #cardiologie/medecine-interne, etc.)
  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (!hash) return;
      const found = DEPARTMENTS.find((d) => d.slug === hash);
      if (!found) return;
      setExpandedSlugs((prev) => (prev.includes(found.slug) ? prev : [...prev, found.slug]));
      window.setTimeout(() => {
        document.getElementById(found.slug)?.scrollIntoView({ behavior: "smooth" });
      }, 80);
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const filteredDepts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DEPARTMENTS;
    return DEPARTMENTS.filter((d) => {
      const matchDept =
        d.name.fr.toLowerCase().includes(q) ||
        d.name.en.toLowerCase().includes(q) ||
        d.shortName.fr.toLowerCase().includes(q) ||
        d.shortName.en.toLowerCase().includes(q) ||
        d.summary.fr.toLowerCase().includes(q) ||
        d.summary.en.toLowerCase().includes(q) ||
        d.chief.toLowerCase().includes(q);
      const matchService = SERVICES.some(
        (s) =>
          s.departmentSlug === d.slug &&
          (s.name.fr.toLowerCase().includes(q) || s.name.en.toLowerCase().includes(q))
      );
      return matchDept || matchService;
    });
  }, [query]);

  const toggleDept = (slug: string) => {
    setExpandedSlugs((prev) =>
      prev.includes(slug) ? prev.filter((item) => item !== slug) : [...prev, slug]
    );
  };

  const allExpanded =
    filteredDepts.length > 0 &&
    filteredDepts.every((d) => expandedSlugs.includes(d.slug));

  const toggleAll = () => {
    if (allExpanded) {
      setExpandedSlugs([]);
    } else {
      setExpandedSlugs(filteredDepts.map((d) => d.slug));
    }
  };

  const jumpToDept = (slug: string) => {
    setExpandedSlugs((prev) => (prev.includes(slug) ? prev : [...prev, slug]));
    window.setTimeout(() => {
      document.getElementById(slug)?.scrollIntoView({ behavior: "smooth" });
    }, 60);
  };

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: t({ fr: "Accueil", en: "Home" }), href: "/" },
          { label: t({ fr: "Départements", en: "Departments" }) },
        ]}
        eyebrow={t({ fr: "Organisation médicale", en: "Clinical Organization" })}
        eyebrowTone="cobalt"
        title={t({ fr: "Nos 10 départements médicaux", en: "Our 10 Medical Departments" })}
        description={t({
          fr: "Explorez nos pôles d'excellence clinique, chirurgicaux, biologiques et pédiatriques. Chaque département regroupe des unités spécialisées et des équipes de garde 24h/24.",
          en: "Explore our medical, surgical, laboratory, and pediatric departments. Each pole brings together specialized units and 24/7 clinical teams.",
        })}
        stats={[
          { value: "10", label: t({ fr: "Départements", en: "Departments" }) },
          { value: "30+", label: t({ fr: "Unités cliniques", en: "Clinical units" }) },
          { value: "207", label: t({ fr: "Médecins", en: "Physicians" }) },
          { value: "3 ISO", label: t({ fr: "Laboratoires", en: "Accredited labs" }) },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        {/* Controls Bar: Search + View Mode + Expand/Collapse */}
        <div className="flex flex-col justify-between gap-4 rounded-3xl border border-white bg-white p-4 shadow-premium sm:p-5 lg:flex-row lg:items-center">
          <div className="relative flex-1 lg:max-w-md">
            <label htmlFor="dept-search" className="sr-only">
              {t({ fr: "Rechercher un département", en: "Search a department" })}
            </label>
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#475569]"
              aria-hidden="true"
            />
            <input
              id="dept-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t({
                fr: "Rechercher un pôle, chef de département ou service...",
                en: "Search department, chair or unit...",
              })}
              className="w-full rounded-full border border-[#08162B]/15 bg-[#F8F7F4] py-2.5 pl-11 pr-4 text-sm text-[#08162B] focus:border-[#0A66C2] focus:bg-white focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {viewMode === "accordion" ? (
              <button
                type="button"
                onClick={toggleAll}
                className="rounded-full border border-[#08162B]/15 bg-[#F8F7F4] px-4 py-2 text-xs font-bold text-[#08162B] transition-colors hover:border-[#0A66C2] hover:text-[#0A66C2]"
              >
                {allExpanded
                  ? t({ fr: "Tout réduire", en: "Collapse all" })
                  : t({ fr: "Tout déplier", en: "Expand all" })}
              </button>
            ) : null}

            <div
              role="group"
              aria-label={t({ fr: "Mode d'affichage", en: "View mode" })}
              className="inline-flex rounded-full border border-[#08162B]/15 bg-[#F8F7F4] p-1"
            >
              <button
                type="button"
                aria-pressed={viewMode === "accordion"}
                onClick={() => setViewMode("accordion")}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                  viewMode === "accordion"
                    ? "bg-[#08162B] text-white shadow-sm"
                    : "text-[#475569] hover:text-[#08162B]"
                }`}
              >
                <List className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{t({ fr: "Accordéon", en: "Accordion" })}</span>
              </button>
              <button
                type="button"
                aria-pressed={viewMode === "bento"}
                onClick={() => setViewMode("bento")}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                  viewMode === "bento"
                    ? "bg-[#08162B] text-white shadow-sm"
                    : "text-[#475569] hover:text-[#08162B]"
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{t({ fr: "Grille panoramique", en: "Panoramic grid" })}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Department Jump Pills */}
        <div
          aria-label={t({ fr: "Accès rapide aux départements", en: "Quick department jump" })}
          className="no-scrollbar mt-5 flex items-center gap-2 overflow-x-auto pb-2"
        >
          {DEPARTMENTS.map((dept) => {
            const active = expandedSlugs.includes(dept.slug);
            return (
              <button
                key={dept.slug}
                type="button"
                onClick={() => jumpToDept(dept.slug)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  active && viewMode === "accordion"
                    ? "border-[#08162B] bg-[#08162B] text-white shadow-sm"
                    : "border-[#08162B]/12 bg-white text-[#08162B] hover:border-[#0A66C2]"
                }`}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: dept.accentColor }}
                  aria-hidden="true"
                />
                <span className="font-mono text-[10px] opacity-75">{dept.code}</span>
                <span>{t(dept.shortName)}</span>
              </button>
            );
          })}
        </div>

        <p className="mt-4 text-xs font-bold uppercase tracking-wider text-[#475569]">
          {filteredDepts.length} {t({ fr: "département(s) affiché(s)", en: "department(s) displayed" })}
        </p>

        {/* Empty State */}
        {filteredDepts.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-[#08162B]/10 bg-white p-12 text-center shadow-premium">
            <Sparkles className="mx-auto h-9 w-9 text-[#B8892E]" aria-hidden="true" />
            <h2 className="mt-3 text-lg font-bold text-[#08162B]">
              {t({
                fr: "Aucun département ne correspond à votre recherche",
                en: "No department matches your search",
              })}
            </h2>
            <p className="mt-1 text-sm text-[#475569]">
              {t({
                fr: "Réinitialisez le filtre pour parcourir l'ensemble des 10 pôles médicaux.",
                en: "Reset the search filter to browse all 10 clinical departments.",
              })}
            </p>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="mt-5 rounded-full bg-[#0A66C2] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#08162B]"
            >
              {t({ fr: "Afficher les 10 départements", en: "Show all 10 departments" })}
            </button>
          </div>
        ) : viewMode === "bento" ? (
          /* PANORAMIC 2-COL BENTO GRID */
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {filteredDepts.map((dept) => {
              const deptServices = SERVICES.filter((s) => s.departmentSlug === dept.slug);
              const deptDoctorsCount =
                deptServices.reduce((sum, s) => sum + s.doctorCount, 0) ||
                DOCTORS.filter((d) => d.departmentSlug === dept.slug).length;

              return (
                <article
                  id={dept.slug}
                  key={dept.slug}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white bg-white shadow-premium transition-all hover:-translate-y-1 hover:shadow-premium-hover"
                >
                  <div
                    aria-hidden="true"
                    className="h-1.5 w-full"
                    style={{ backgroundColor: dept.accentColor }}
                  />
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-2xl bg-[#EFECE6]">
                        <Image
                          src={dept.image}
                          alt={t(dept.name)}
                          fill
                          sizes="120px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${dept.badgeBg}`}
                          >
                            {t({ fr: "Pôle", en: "Dept" })} {dept.code}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#475569]">
                            <Users className="h-3.5 w-3.5 text-[#0A66C2]" aria-hidden="true" />
                            {deptDoctorsCount} {t({ fr: "praticiens", en: "physicians" })}
                          </span>
                        </div>
                        <h2 className="mt-2 text-lg font-extrabold text-[#08162B]">
                          {t(dept.name)}
                        </h2>
                        <p className="mt-0.5 text-xs font-medium text-[#0A66C2]">
                          {dept.chief}
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-[#475569]">
                      {t(dept.summary)}
                    </p>

                    {deptServices.length > 0 ? (
                      <div className="mt-4 space-y-2">
                        {deptServices.map((svc) => (
                          <div
                            key={svc.slug}
                            className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-[#08162B]/8 bg-[#F8F7F4] px-3.5 py-2.5"
                          >
                            <Link
                              href={`/services/${svc.slug}`}
                              className="min-w-0 flex-1 text-xs font-bold text-[#08162B] hover:text-[#0A66C2]"
                            >
                              {t(svc.name)}
                            </Link>
                            <div className="flex shrink-0 items-center gap-2">
                              <span className="font-mono text-[11px] font-bold text-[#0A66C2]">
                                {svc.exams[0]?.price ?? "4 000 FCFA"}
                              </span>
                              <Link
                                href={`/rendez-vous?service=${svc.slug}`}
                                className="rounded-full bg-[#0A66C2] px-2.5 py-1 text-[10px] font-bold text-white hover:bg-[#08162B]"
                              >
                                {t({ fr: "RDV", en: "Book" })}
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#08162B]/8 bg-[#F8F7F4]/70 px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#475569]">
                      <Building2 className="h-3.5 w-3.5 text-[#B8892E]" aria-hidden="true" />
                      {t(dept.building)}
                    </span>
                    <Link
                      href={`/rendez-vous?dept=${dept.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#08162B] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#0A66C2]"
                    >
                      <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{t({ fr: "Prendre rendez-vous", en: "Book appointment" })}</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* DETAILED ACCORDION VIEW */
          <div className="mt-5 space-y-5">
            {filteredDepts.map((dept) => {
              const isOpen =
                expandedSlugs.includes(dept.slug) || query.trim().length > 0;
              const deptServices = SERVICES.filter((s) => s.departmentSlug === dept.slug);
              const deptDoctorsCount =
                deptServices.reduce((sum, s) => sum + s.doctorCount, 0) ||
                DOCTORS.filter((d) => d.departmentSlug === dept.slug).length;

              return (
                <section
                  id={dept.slug}
                  key={dept.slug}
                  className="overflow-hidden rounded-3xl border border-white bg-white shadow-premium transition-shadow hover:shadow-premium-hover"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggleDept(dept.slug)}
                    className="flex w-full items-center justify-between gap-3 p-5 text-left transition-colors hover:bg-[#F8F7F4]/70 sm:gap-4 sm:p-6"
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-3.5 sm:gap-4">
                      <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl font-mono text-sm font-extrabold text-white shadow-sm sm:h-12 sm:w-12"
                        style={{ backgroundColor: dept.accentColor }}
                      >
                        {dept.code}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="break-words text-base font-extrabold text-[#08162B] sm:text-xl">
                            {t(dept.name)}
                          </h2>
                          <span className="rounded-full bg-[#F8F7F4] px-2.5 py-0.5 text-[11px] font-bold text-[#475569]">
                            {deptDoctorsCount} {t({ fr: "médecins", en: "physicians" })}
                          </span>
                        </div>
                        <p className="mt-0.5 truncate text-xs text-[#475569]">
                          {dept.chief} · {t(dept.building)}
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#08162B] transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {isOpen ? (
                    <div className="border-t border-[#08162B]/8 bg-[#F8F7F4]/60 p-5 sm:p-8">
                      <div className="grid items-center gap-8 lg:grid-cols-12">
                        <div className="min-w-0 lg:col-span-5">
                          <OverlappingImageShowcase
                            primarySrc={dept.image}
                            primaryAlt={t(dept.name)}
                            primaryBadge={t(dept.building)}
                            secondarySrc={dept.secondaryImage}
                            secondaryAlt={t(dept.shortName)}
                            secondaryCaption={dept.chief}
                            ringColorClass="ring-[#F8F7F4]"
                            align="left"
                          />
                        </div>

                        <div className="min-w-0 lg:col-span-7">
                          <p className="text-base leading-relaxed text-[#475569]">
                            {t(dept.summary)}
                          </p>

                          <div className="mt-6 grid gap-3 sm:grid-cols-2">
                            {deptServices.length > 0 ? (
                              deptServices.map((svc) => (
                                <article
                                  key={svc.slug}
                                  className="group flex flex-col justify-between rounded-2xl border border-[#08162B]/10 bg-white p-4 shadow-sm transition-all hover:border-[#0A66C2]"
                                >
                                  <div>
                                    <div className="flex items-center justify-between gap-2">
                                      <span className="font-mono text-[11px] font-bold text-[#0A66C2]">
                                        {svc.exams[0]?.price ?? "4 000 FCFA"}
                                      </span>
                                      <span className="text-[11px] font-medium text-[#475569]">
                                        {svc.doctorCount} {t({ fr: "méd.", en: "MD" })}
                                      </span>
                                    </div>
                                    <h3 className="mt-1.5 text-sm font-bold text-[#08162B] group-hover:text-[#0A66C2]">
                                      <Link href={`/services/${svc.slug}`} className="hover:underline">
                                        {t(svc.name)}
                                      </Link>
                                    </h3>
                                    <p className="mt-1 text-xs text-[#475569]">
                                      {t(svc.description)}
                                    </p>
                                  </div>
                                  <div className="mt-4 flex items-center justify-between gap-2 border-t border-[#08162B]/8 pt-3">
                                    <Link
                                      href={`/services/${svc.slug}`}
                                      className="inline-flex items-center gap-1 text-xs font-bold text-[#08162B] hover:text-[#0A66C2]"
                                    >
                                      {t({ fr: "Voir le service", en: "View service" })}
                                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                                    </Link>
                                    <Link
                                      href={`/rendez-vous?service=${svc.slug}`}
                                      className="rounded-full bg-[#E8F2FC] px-3 py-1 text-[11px] font-bold text-[#0A66C2] transition-colors hover:bg-[#0A66C2] hover:text-white"
                                    >
                                      {t({ fr: "Prendre RDV", en: "Book" })}
                                    </Link>
                                  </div>
                                </article>
                              ))
                            ) : (
                              <div className="rounded-2xl border border-[#08162B]/10 bg-white p-5 sm:col-span-2">
                                <p className="text-sm font-semibold text-[#08162B]">
                                  {t({
                                    fr: "Consultations et orientations disponibles sur rendez-vous.",
                                    en: "Consultations and referrals available by appointment.",
                                  })}
                                </p>
                                <Link
                                  href={`/rendez-vous?dept=${dept.slug}`}
                                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#0A66C2] px-4 py-2 text-xs font-semibold text-white"
                                >
                                  <Stethoscope className="h-3.5 w-3.5" aria-hidden="true" />
                                  {t({ fr: "Prendre rendez-vous", en: "Book appointment" })}
                                </Link>
                              </div>
                            )}
                          </div>

                          <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-[#08162B]/10 pt-4">
                            <Link
                              href={`/rendez-vous?dept=${dept.slug}`}
                              className="inline-flex items-center gap-2 rounded-full bg-[#0A66C2] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#08162B]"
                            >
                              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                              {t({
                                fr: "Prendre rendez-vous dans ce pôle",
                                en: "Book in this department",
                              })}
                            </Link>
                            <Link
                              href="/medecins"
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#08162B] hover:text-[#0A66C2]"
                            >
                              <span>{t({ fr: "Voir l'annuaire des médecins", en: "View doctors directory" })}</span>
                              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </section>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
