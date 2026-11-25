"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Calendar,
  Clock,
  Globe,
  Search,
  Sparkles,
  UserCheck,
  X,
} from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { DEPARTMENTS, DOCTORS, SERVICES, type Doctor } from "@/data/hospital-data";
import { PractitionerPortraitFrame } from "@/components/ui/framed-media";
import { MedicalBackdrop } from "@/components/ui/medical-backdrop";
import { PageHero } from "@/components/ui/page-hero";

export default function MedecinsPage() {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [langFilter, setLangFilter] = useState<"all" | "Français" | "English">("all");
  const [selectedDoc, setSelectedDoc] = useState<Doctor | null>(null);

  // Prefill search query when linked from Command Palette (?q=...)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q) setQuery(q);
  }, []);

  // Escape key closes Practitioner Detail Modal
  useEffect(() => {
    if (!selectedDoc) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedDoc(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedDoc]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DOCTORS.filter((doc) => {
      const matchDept = deptFilter === "all" || doc.departmentSlug === deptFilter;
      const matchRole = roleFilter === "all" || doc.roleFilter === roleFilter;
      const matchLang = langFilter === "all" || doc.languages.includes(langFilter);
      if (!matchDept || !matchRole || !matchLang) return false;
      if (!q) return true;
      return (
        doc.name.toLowerCase().includes(q) ||
        doc.specialty.fr.toLowerCase().includes(q) ||
        doc.specialty.en.toLowerCase().includes(q) ||
        doc.role.fr.toLowerCase().includes(q) ||
        doc.role.en.toLowerCase().includes(q)
      );
    });
  }, [query, deptFilter, roleFilter, langFilter]);

  const hasActiveFilters =
    query.trim() !== "" || deptFilter !== "all" || roleFilter !== "all" || langFilter !== "all";

  const resetFilters = () => {
    setQuery("");
    setDeptFilter("all");
    setRoleFilter("all");
    setLangFilter("all");
  };

  const roleTabs = [
    { key: "all", label: { fr: "Toutes fonctions", en: "All roles" } },
    { key: "direction", label: { fr: "Direction Médicale", en: "Medical Leadership" } },
    { key: "chef-departement", label: { fr: "Chefs de département", en: "Dept Heads" } },
    { key: "chef-service", label: { fr: "Chefs de service", en: "Unit Heads" } },
    { key: "praticien", label: { fr: "Spécialistes", en: "Specialists" } },
  ];

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: t({ fr: "Accueil", en: "Home" }), href: "/" },
          { label: t({ fr: "Médecins", en: "Doctors" }) },
        ]}
        eyebrow={t({
          fr: "Corps médical · 207 praticiens",
          en: "Medical Corps · 207 physicians",
        })}
        eyebrowTone="emerald"
        title={t({ fr: "Annuaire de nos praticiens", en: "Practitioners Directory" })}
        description={t({
          fr: "Retrouvez nos chefs de département, chefs de service et médecins spécialistes. Consultez leurs horaires ou réservez une consultation personnalisée.",
          en: "Browse our department chairs, heads of unit, and specialists. Inspect consultation schedules or book a personalized visit.",
        })}
        stats={[
          { value: "207", label: t({ fr: "Médecins total", en: "Total physicians" }) },
          { value: "123", label: t({ fr: "Spécialistes", en: "Specialists" }) },
          { value: "40", label: t({ fr: "Enseignants univ.", en: "University faculty" }) },
          { value: "44", label: t({ fr: "Généralistes", en: "General practitioners" }) },
        ]}
      />

      <div className="relative overflow-x-clip">
        <MedicalBackdrop variant="clinical" />
        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        {/* Search & Language Filter Row */}
        <div className="rounded-3xl border border-white bg-white p-5 shadow-premium sm:p-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div className="relative flex-1 lg:max-w-md">
              <label htmlFor="doc-search" className="sr-only">
                {t({ fr: "Rechercher un médecin", en: "Search a doctor" })}
              </label>
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#475569]"
                aria-hidden="true"
              />
              <input
                id="doc-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t({
                  fr: "Nom du praticien ou spécialité (Cardiologie, Pédiatrie...)",
                  en: "Doctor name or specialty...",
                })}
                className="w-full rounded-full border border-[#071A33]/15 bg-[#F2F7FC] py-2.5 pl-11 pr-4 text-sm text-[#071A33] focus:border-[#0A66C2] focus:bg-white focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {/* Language Filter */}
              <div
                role="group"
                aria-label={t({ fr: "Langue de consultation", en: "Consultation language" })}
                className="inline-flex flex-wrap items-center gap-1 rounded-2xl border border-[#071A33]/15 bg-[#F2F7FC] p-1 sm:rounded-full"
              >
                <Globe className="ml-2 h-3.5 w-3.5 text-[#0A66C2]" aria-hidden="true" />
                {(["all", "Français", "English"] as const).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    aria-pressed={langFilter === lang}
                    onClick={() => setLangFilter(lang)}
                    className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${
                      langFilter === lang
                        ? "bg-[#08162B] text-white"
                        : "text-[#475569] hover:text-[#08162B]"
                    }`}
                  >
                    {lang === "all" ? t({ fr: "Toutes langues", en: "All languages" }) : lang}
                  </button>
                ))}
              </div>

              {hasActiveFilters ? (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#C81E1E]/25 bg-red-50 px-3.5 py-2 text-xs font-bold text-[#C81E1E] hover:bg-[#C81E1E] hover:text-white"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{t({ fr: "Réinitialiser", en: "Reset" })}</span>
                </button>
              ) : null}
            </div>
          </div>

          {/* Role Filter Pills */}
          <div className="no-scrollbar mt-4 flex items-center gap-2 overflow-x-auto pb-1">
            {roleTabs.map((tab) => {
              const active = roleFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setRoleFilter(tab.key)}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                    active
                      ? "bg-[#0A66C2] text-white shadow-sm"
                      : "border border-[#071A33]/12 bg-[#F2F7FC] text-[#475569] hover:border-[#0A66C2]"
                  }`}
                >
                  {t(tab.label)}
                </button>
              );
            })}
          </div>

          {/* Department Filter Pills */}
          <div className="no-scrollbar mt-3 flex items-center gap-2 overflow-x-auto border-t border-[#08162B]/8 pt-3 pb-1">
            <button
              type="button"
              aria-pressed={deptFilter === "all"}
              onClick={() => setDeptFilter("all")}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                deptFilter === "all"
                  ? "bg-[#08162B] text-white"
                  : "border border-[#08162B]/12 bg-white text-[#475569] hover:border-[#0A66C2]"
              }`}
            >
              {t({ fr: "Tous les pôles", en: "All departments" })}
            </button>
            {DEPARTMENTS.map((dept) => {
              const active = deptFilter === dept.slug;
              return (
                <button
                  key={dept.slug}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setDeptFilter(dept.slug)}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    active
                      ? "bg-[#08162B] text-white shadow-sm"
                      : "border border-[#08162B]/12 bg-white text-[#475569] hover:border-[#0A66C2]"
                  }`}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: dept.accentColor }}
                    aria-hidden="true"
                  />
                  {t(dept.shortName)}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between text-xs font-bold text-[#475569]">
          <span>
            {filtered.length}{" "}
            {t({ fr: "praticien(s) mis en avant", en: "featured physician(s)" })} ·{" "}
            {t({ fr: "effectif total : 207 médecins", en: "total staff: 207 physicians" })}
          </span>
        </div>

        {/* Empty State or Doctors Grid */}
        {filtered.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-[#071A33]/10 bg-white p-12 text-center shadow-premium">
            <Sparkles className="mx-auto h-9 w-9 text-[#0A66C2]" aria-hidden="true" />
            <h2 className="mt-3 text-lg font-bold text-[#08162B]">
              {t({
                fr: "Aucun praticien ne correspond à ces critères",
                en: "No practitioners match these criteria",
              })}
            </h2>
            <p className="mt-1 text-sm text-[#475569]">
              {t({
                fr: "Élargissez votre recherche ou réinitialisez les filtres actifs.",
                en: "Broaden your search or reset active filters.",
              })}
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 rounded-full bg-[#0A66C2] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#08162B]"
            >
              {t({ fr: "Réinitialiser les filtres", en: "Reset all filters" })}
            </button>
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((doc) => {
              const dept = DEPARTMENTS.find((d) => d.slug === doc.departmentSlug);
              return (
                <article
                  key={doc.id}
                  className="group relative flex min-w-0 flex-col justify-between overflow-hidden rounded-3xl border border-white bg-white p-5 shadow-premium transition-all hover:-translate-y-1 hover:shadow-premium-hover sm:p-6"
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1"
                    style={{ backgroundColor: dept?.accentColor ?? "#0A66C2" }}
                  />

                  <div>
                    <div className="flex items-start gap-4">
                      <PractitionerPortraitFrame
                        src={doc.photo}
                        name={doc.name}
                        accentColor={dept?.accentColor}
                        size="md"
                      />
                      <div className="min-w-0 flex-1">
                        <span
                          className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${
                            dept?.badgeBg ?? "border-slate-200 bg-slate-50 text-slate-700"
                          }`}
                        >
                          {t(doc.specialty)}
                        </span>
                        <h2 className="mt-2 text-base font-bold leading-snug text-[#08162B]">
                          {doc.name}
                        </h2>
                        <p className="mt-1 text-xs text-[#475569]">{t(doc.role)}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-[#475569]">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#F2F7FC] px-2.5 py-1 font-medium">
                        <Clock className="h-3 w-3 text-[#0D9488]" aria-hidden="true" />
                        {t(doc.schedule)}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#F2F7FC] px-2.5 py-1 font-medium">
                        <Globe className="h-3 w-3 text-[#0A66C2]" aria-hidden="true" />
                        {doc.languages.join(" · ")}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-[#071A33]/8 pt-4 text-xs">
                    <button
                      type="button"
                      onClick={() => setSelectedDoc(doc)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#071A33]/15 bg-[#F2F7FC] px-3.5 py-1.5 font-bold text-[#071A33] transition-colors hover:border-[#0A66C2] hover:text-[#0A66C2]"
                    >
                      <UserCheck className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{t({ fr: "Profil", en: "Profile" })}</span>
                    </button>

                    <Link
                      href={`/rendez-vous?medecin=${doc.id}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#0A66C2] px-4 py-1.5 font-bold text-white transition-colors hover:bg-[#08162B]"
                    >
                      <span>{t({ fr: "Prendre RDV", en: "Book" })}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
        </div>
      </div>

      {/* ================================================================
          PRACTITIONER DETAIL MODAL
          ================================================================ */}
      {selectedDoc ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="doc-modal-title"
          onClick={() => setSelectedDoc(null)}
          className="fixed inset-0 z-[95] flex items-center justify-center bg-[#08162B]/75 p-4 backdrop-blur-md"
        >
          {(() => {
            const dept = DEPARTMENTS.find((d) => d.slug === selectedDoc.departmentSlug);
            const deptSvc = SERVICES.find((s) => s.departmentSlug === selectedDoc.departmentSlug);
            return (
              <div
                onClick={(e) => e.stopPropagation()}
                className="animate-modal-pop max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[2rem] border border-white/25 bg-white p-6 shadow-2xl sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <PractitionerPortraitFrame
                      src={selectedDoc.photo}
                      name={selectedDoc.name}
                      accentColor={dept?.accentColor}
                      size="md"
                    />
                    <div>
                      <span
                        className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${
                          dept?.badgeBg ?? "border-slate-200 bg-slate-50 text-slate-700"
                        }`}
                      >
                        {t(selectedDoc.specialty)}
                      </span>
                      <h2
                        id="doc-modal-title"
                        className="mt-2 text-xl font-extrabold text-[#08162B]"
                      >
                        {selectedDoc.name}
                      </h2>
                      <p className="mt-0.5 text-xs font-medium text-[#475569]">
                        {t(selectedDoc.role)}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedDoc(null)}
                    aria-label={t({ fr: "Fermer", en: "Close" })}
                    autoFocus
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#071A33]/15 text-[#071A33] hover:bg-[#F2F7FC]"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>

                <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                  {dept ? (
                    <div className="rounded-2xl bg-[#F2F7FC] p-4">
                      <dt className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-[#475569]">
                        <Building2 className="h-3.5 w-3.5 text-[#0A66C2]" aria-hidden="true" />
                        {t({ fr: "Département & Pavillon", en: "Department & Pavilion" })}
                      </dt>
                      <dd className="mt-1 text-xs font-bold text-[#071A33]">
                        {t(dept.name)} · {t(dept.building)}
                      </dd>
                    </div>
                  ) : null}

                  <div className="rounded-2xl bg-[#F2F7FC] p-4">
                    <dt className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-[#475569]">
                      <Clock className="h-3.5 w-3.5 text-[#0D9488]" aria-hidden="true" />
                      {t({ fr: "Horaires habituels", en: "Usual schedule" })}
                    </dt>
                    <dd className="mt-1 text-xs font-bold text-[#071A33]">
                      {t(selectedDoc.schedule)}
                    </dd>
                  </div>

                  <div className="rounded-2xl bg-[#F2F7FC] p-4">
                    <dt className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-[#475569]">
                      <Globe className="h-3.5 w-3.5 text-[#0D7A5F]" aria-hidden="true" />
                      {t({ fr: "Langues parlées", en: "Languages spoken" })}
                    </dt>
                    <dd className="mt-1 text-xs font-bold text-[#071A33]">
                      {selectedDoc.languages.join(" · ")}
                    </dd>
                  </div>

                  <div className="rounded-2xl bg-[#F2F7FC] p-4">
                    <dt className="text-[11px] font-bold uppercase text-[#475569]">
                      {t({ fr: "Tarifs de consultation", en: "Consultation fees" })}
                    </dt>
                    <dd className="mt-1 font-mono text-xs font-bold text-[#0A66C2]">
                      4 000 FCFA ({t({ fr: "Public", en: "Std" })}) · 15 000 FCFA (
                      {t({ fr: "Perso.", en: "Pers." })})
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#08162B]/10 pt-5">
                  {deptSvc ? (
                    <Link
                      href={`/services/${deptSvc.slug}`}
                      onClick={() => setSelectedDoc(null)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#08162B] hover:text-[#0A66C2]"
                    >
                      <span>{t({ fr: "Voir l'unité associée", en: "View related unit" })}</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  ) : (
                    <span />
                  )}

                  <Link
                    href={`/rendez-vous?medecin=${selectedDoc.id}`}
                    onClick={() => setSelectedDoc(null)}
                    className="inline-flex items-center gap-2 rounded-full bg-[#0A66C2] px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-[#08162B]"
                  >
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    <span>{t({ fr: "Réserver avec ce médecin", en: "Book with this doctor" })}</span>
                  </Link>
                </div>
              </div>
            );
          })()}
        </div>
      ) : null}
    </>
  );
}
