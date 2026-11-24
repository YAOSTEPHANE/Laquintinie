"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Calendar, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import {
  GOVERNANCE_MEMBERS,
  HOSPITAL_KPIS,
  INSTITUTIONAL_VALUES,
} from "@/data/hospital-data";
import {
  OverlappingImageShowcase,
  PractitionerPortraitFrame,
} from "@/components/ui/framed-media";
import { PageHero } from "@/components/ui/page-hero";

export default function AProposPage() {
  const { t } = useLanguage();
  const [boardFilter, setBoardFilter] = useState<"all" | "direction" | "gestion">("all");

  const directionBoard = GOVERNANCE_MEMBERS.filter((m) => m.board === "direction");
  const gestionBoard = GOVERNANCE_MEMBERS.filter((m) => m.board === "gestion");

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: t({ fr: "Accueil", en: "Home" }), href: "/" },
          { label: t({ fr: "L'Hôpital", en: "About" }) },
        ]}
        eyebrow="1920 · 1931 – 2026"
        eyebrowTone="gold"
        title={t({
          fr: "À propos de l’Hôpital Laquintinie",
          en: "About Laquintinie Hospital",
        })}
        description={t({
          fr: "De sa fondation en 1920 à son rayonnement actuel dans toute l'Afrique centrale, découvrez l'histoire, les missions et la gouvernance de l'Hôpital Laquintinie de Douala.",
          en: "From its founding in 1920 to its current regional leadership in Central Africa, discover the history, mission, and governance of Laquintinie Hospital.",
        })}
        stats={[
          { value: "95 ans", label: t({ fr: "D'histoire", en: "Of heritage" }) },
          { value: "9 ha", label: t({ fr: "Campus urbain", en: "Urban campus" }) },
          { value: "600", label: t({ fr: "Lits d'accueil", en: "Inpatient beds" }) },
          { value: "1 650", label: t({ fr: "Personnels", en: "Staff members" }) },
        ]}
        rightContent={
          <OverlappingImageShowcase
            primarySrc="/images/campus/direction-building.webp"
            primaryAlt="Bâtiment de la Direction de l'Hôpital Laquintinie de Douala"
            primaryBadge={t({ fr: "Direction Générale", en: "Administration" })}
            secondarySrc="/images/campus/hero-hospital.webp"
            secondaryAlt="Entrée principale de l'Hôpital Laquintinie"
            secondaryCaption={t({ fr: "Campus de 9 hectares", en: "9-hectare campus" })}
            ringColorClass="ring-[#F8F7F4]"
            align="left"
            priority
          />
        }
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* Chapters + Sticky Summary */}
        <div className="grid gap-10 lg:grid-cols-12">
          <aside className="min-w-0 lg:col-span-4">
            <div className="space-y-5 lg:sticky lg:top-28">
              <nav
                aria-label={t({ fr: "Sommaire", en: "Table of contents" })}
                className="rounded-3xl border border-white bg-white p-6 shadow-premium"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-[#0A66C2]">
                  {t({ fr: "Sommaire", en: "Contents" })}
                </p>
                <ul className="mt-4 space-y-2.5 text-sm font-semibold text-[#475569]">
                  <li>
                    <a href="#chapitre-1" className="block rounded-xl px-2 py-1 hover:bg-[#F8F7F4] hover:text-[#0A66C2]">
                      01 · {t({ fr: "Les origines et l'installation", en: "Origins & establishment" })}
                    </a>
                  </li>
                  <li>
                    <a href="#chapitre-2" className="block rounded-xl px-2 py-1 hover:bg-[#F8F7F4] hover:text-[#0A66C2]">
                      02 · {t({ fr: "Patrimoine architectural", en: "Architectural heritage" })}
                    </a>
                  </li>
                  <li>
                    <a href="#chapitre-3" className="block rounded-xl px-2 py-1 hover:bg-[#F8F7F4] hover:text-[#0A66C2]">
                      03 · {t({ fr: "Hôpital en transformation", en: "Ongoing transformation" })}
                    </a>
                  </li>
                  <li>
                    <a href="#chapitre-4" className="block rounded-xl px-2 py-1 hover:bg-[#F8F7F4] hover:text-[#0A66C2]">
                      04 · {t({ fr: "Proximité et innovation", en: "Proximity & innovation" })}
                    </a>
                  </li>
                  <li>
                    <a href="#gouvernance" className="block rounded-xl px-2 py-1 hover:bg-[#F8F7F4] hover:text-[#0A66C2]">
                      05 · {t({ fr: "Gouvernance & Direction", en: "Governance & Leadership" })}
                    </a>
                  </li>
                  <li>
                    <a href="#engagements" className="block rounded-xl px-2 py-1 hover:bg-[#F8F7F4] hover:text-[#0A66C2]">
                      06 · {t({ fr: "Nos 8 engagements", en: "8 Core Commitments" })}
                    </a>
                  </li>
                  <li>
                    <a href="#donnees" className="block rounded-xl px-2 py-1 hover:bg-[#F8F7F4] hover:text-[#0A66C2]">
                      07 · {t({ fr: "Chiffres consolidés", en: "Verified figures" })}
                    </a>
                  </li>
                </ul>
              </nav>

              <div className="rounded-3xl bg-[#08162B] p-6 text-white shadow-xl">
                <p className="text-xs font-bold uppercase tracking-wider text-[#DFB860]">
                  {t({ fr: "Besoin d'une consultation ?", en: "Need a consultation?" })}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  {t({
                    fr: "Prenez rendez-vous en ligne sans compte auprès de nos 10 départements.",
                    en: "Book online with no account across our 10 departments.",
                  })}
                </p>
                <Link
                  href="/rendez-vous"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0A66C2] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#DFB860] hover:text-[#08162B]"
                >
                  <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{t({ fr: "Prendre rendez-vous", en: "Book appointment" })}</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Editorial Copy */}
          <div className="min-w-0 space-y-8 rounded-3xl border border-white bg-white p-6 shadow-premium sm:p-10 lg:col-span-8">
            <section id="chapitre-1">
              <h2 className="text-2xl font-extrabold text-[#08162B]">
                {t({ fr: "01. Les origines et l’installation", en: "01. Origins and establishment" })}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#475569]">
                {t({
                  fr: "L'Hôpital Laquintinie de Douala a été fondé en 1920 à Bonamoudourou-Deido sous le nom d'« Hôpital Indigène de Douala ». La structure connaîtra des déplacements successifs : à Bonadibong d'abord, puis à Bonamikengue (Canton Akwa), pour s'installer définitivement sur son site actuel vers 1931, sous l'administration française.",
                  en: "Laquintinie Hospital of Douala was founded in 1920 in Bonamoudourou-Deido before moving through Bonadibong and Bonamikengue (Akwa), finally settling on its current campus around 1931.",
                })}
              </p>
              <p className="mt-3 text-base leading-relaxed text-[#475569]">
                {t({
                  fr: "Soumis à l'origine au régime de l'indigénat (alors que l'Hôpital général de Douala, hérité de l'époque allemande, était réservé), l'établissement devient officiellement Hôpital Laquintinie de Douala en 1941, en hommage au Médecin-Capitaine Jean Auguste Laquintinie, chirurgien des armées et ancien médecin-chef mort en campagne militaire la même année.",
                  en: "In 1941, the hospital was officially named Laquintinie Hospital of Douala in tribute to Captain-Physician Jean Auguste Laquintinie, army surgeon and former Chief Medical Officer.",
                })}
              </p>
            </section>

            <section id="chapitre-2">
              <h2 className="text-2xl font-extrabold text-[#08162B]">
                {t({ fr: "02. Un patrimoine architectural en évolution", en: "02. Evolving architectural heritage" })}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#475569]">
                {t({
                  fr: "Dès 1950, la structure s'est agrandie grâce à de nouveaux édifices complétant les pavillons historiques. Étendu sur 9 hectares bâtis, l'Hôpital Laquintinie conjugue patrimoine architectural et bâtiments hospitaliers contemporains.",
                  en: "Since 1950, new clinical buildings have joined our historic pavilions across a 9-hectare urban campus uniting heritage and modern hospital architecture.",
                })}
              </p>
            </section>

            <section id="chapitre-3">
              <h2 className="text-2xl font-extrabold text-[#08162B]">
                {t({ fr: "03. Un hôpital en pleine transformation", en: "03. A hospital in active transformation" })}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#475569]">
                {t({
                  fr: "Sous l'impulsion de la Direction et du Comité de Gestion, le campus offre aujourd'hui des pavillons modernisés, des chambres d'hospitalisation économiques, standards et VIP, une unité de production d'oxygène, un complexe sportif, des lieux d'accueil, une salle de préparation à la naissance et la Maison du Patient ouverte 24h/24.",
                  en: "Guided by the Executive Directorate and Management Board, the campus features modernized wards, standard, comfort, and VIP rooms, an oxygen production unit, prenatal spaces, and the 24/7 Patient House.",
                })}
              </p>
            </section>

            <section id="chapitre-4">
              <h2 className="text-2xl font-extrabold text-[#08162B]">
                {t({ fr: "04. Proximité, humanisation et référence sous-régionale", en: "04. Proximity, compassion & regional leadership" })}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#475569]">
                {t({
                  fr: "Par son approche centrée sur l'humanisation des soins et la qualité clinique, l'Hôpital Laquintinie agit positivement sur des millions de vies à Douala et en Afrique centrale. Établissement de référence et centre d'application universitaire, il remplit une mission de polyclinique publique et participe activement à la lutte contre les évacuations sanitaires.",
                  en: "Through patient-centered care and clinical rigor, Laquintinie positively touches millions of lives across Douala and Central Africa, serving as a premier teaching hospital and regional referral center.",
                })}
              </p>
            </section>
          </div>
        </div>

        {/* Governance Boards with Filter Tabs */}
        <section id="gouvernance" className="mt-16">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0A66C2]">
                {t({ fr: "Gouvernance", en: "Governance" })}
              </p>
              <h2 className="mt-2 text-3xl font-extrabold text-[#08162B]">
                {t({ fr: "Ceux qui dirigent l’hôpital", en: "Hospital Leadership & Boards" })}
              </h2>
            </div>

            <div
              role="group"
              aria-label={t({ fr: "Filtrer les instances", en: "Filter governance boards" })}
              className="inline-flex flex-wrap gap-2"
            >
              {[
                { key: "all" as const, label: { fr: "Tous les membres", en: "All members" } },
                { key: "direction" as const, label: { fr: "Comité de Direction", en: "Executive Committee" } },
                { key: "gestion" as const, label: { fr: "Comité de Gestion", en: "Management Board" } },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  aria-pressed={boardFilter === tab.key}
                  onClick={() => setBoardFilter(tab.key)}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                    boardFilter === tab.key
                      ? "bg-[#08162B] text-white shadow-sm"
                      : "border border-[#08162B]/15 bg-white text-[#475569] hover:border-[#0A66C2]"
                  }`}
                >
                  {t(tab.label)}
                </button>
              ))}
            </div>
          </div>

          {boardFilter === "all" || boardFilter === "direction" ? (
            <>
              <h3 className="mt-8 text-lg font-bold text-[#08162B]">
                {t({ fr: "Comité de Direction", en: "Executive Management Committee" })}
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {directionBoard.map((member) => (
                  <div
                    key={`${member.board}-${member.name}`}
                    className="flex items-center gap-3.5 rounded-2xl border border-white bg-white p-4 shadow-sm"
                  >
                    <PractitionerPortraitFrame src={member.photo} name={member.name} size="sm" />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#08162B]">{member.name}</p>
                      <p className="mt-0.5 text-[11px] text-[#475569]">{t(member.role)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}

          {boardFilter === "all" || boardFilter === "gestion" ? (
            <>
              <h3 className="mt-10 text-lg font-bold text-[#08162B]">
                {t({ fr: "Comité de Gestion", en: "Management Board" })}
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {gestionBoard.map((member) => (
                  <div
                    key={`${member.board}-${member.name}`}
                    className="flex items-center gap-4 rounded-2xl border border-white bg-white p-5 shadow-sm"
                  >
                    <PractitionerPortraitFrame
                      src={member.photo}
                      name={member.name}
                      accentColor="#B8892E"
                      size="sm"
                    />
                    <div>
                      {member.subGroup ? (
                        <span className="inline-block rounded-full bg-[#FBF5E8] px-2.5 py-0.5 text-[10px] font-bold uppercase text-[#8B641A]">
                          {t(member.subGroup)}
                        </span>
                      ) : null}
                      <p className="mt-1 text-sm font-bold text-[#08162B]">{member.name}</p>
                      <p className="text-xs text-[#475569]">{t(member.role)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </section>

        {/* 8 Institutional Commitments */}
        <section id="engagements" className="mt-16 rounded-3xl border border-white bg-white p-7 shadow-premium sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8892E]">
            {t({ fr: "Charte d'établissement", en: "Institutional Charter" })}
          </p>
          <h2 className="mt-2 text-2xl font-extrabold text-[#08162B] sm:text-3xl">
            {t({ fr: "Nos 8 engagements quotidiens", en: "Our 8 Daily Commitments" })}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {INSTITUTIONAL_VALUES.map((val, idx) => (
              <div
                key={val.title.fr}
                className="rounded-2xl border border-[#08162B]/10 bg-[#F8F7F4] p-5"
              >
                <span className="font-mono text-xs font-bold text-[#0A66C2]">
                  0{idx + 1}
                </span>
                <h3 className="mt-2 text-sm font-bold text-[#08162B]">{t(val.title)}</h3>
                <p className="mt-1 text-xs leading-relaxed text-[#475569]">{t(val.desc)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Reconciled Data Block */}
        <section
          id="donnees"
          className="mt-16 rounded-3xl bg-[#08162B] p-8 text-white shadow-xl sm:p-10"
        >
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            {t({ fr: "Données consolidées de l'établissement", en: "Verified Institutional Data" })}
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            {t({
              fr: "Effectifs totaux : 1 650 employés dont 207 médecins (123 spécialistes, 40 enseignants hospitalo-universitaires et 44 médecins généralistes), 1 145 personnels médico-sanitaires et 298 personnels d'appui. Hôpital de 2e catégorie · 70 % de patients à revenus modestes accueillis dans un esprit de solidarité publique.",
              en: "Total workforce: 1,650 staff including 207 physicians (123 specialists, 40 university teaching faculty, 44 general practitioners), 1,145 nursing & allied health staff, and 298 support staff.",
            })}
          </p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {HOSPITAL_KPIS.map((k) => (
              <div key={k.id} className="rounded-2xl border border-white/15 bg-white/5 p-5">
                <p className="font-mono text-2xl font-bold text-[#DFB860]">
                  {k.displayValue}
                  {k.suffix ?? ""}
                </p>
                <p className="mt-1 text-sm font-bold">{t(k.label)}</p>
                <p className="mt-0.5 text-xs text-slate-300">{t(k.sublabel)}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
