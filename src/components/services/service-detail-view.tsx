"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  FileCheck2,
  MapPin,
  ShieldAlert,
  Stethoscope,
} from "lucide-react";
import { useLanguage } from "@/context/language-context";
import {
  DEPARTMENTS,
  DOCTORS,
  HEALTH_TIPS,
  SERVICES,
  type ServiceItem,
} from "@/data/hospital-data";
import {
  ArchitecturalArchFrame,
  PractitionerPortraitFrame,
} from "@/components/ui/framed-media";
import { PageHero } from "@/components/ui/page-hero";

export function ServiceDetailView({ service }: { service: ServiceItem }) {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number>(0);

  const dept =
    DEPARTMENTS.find((d) => d.slug === service.departmentSlug) ?? DEPARTMENTS[0];
  const headDoc = DOCTORS.find((d) => d.id === service.headDoctorId);
  const deptDoctors = DOCTORS.filter((d) => d.departmentSlug === dept.slug).slice(0, 4);
  const deptSiblings = SERVICES.filter(
    (s) => s.departmentSlug === dept.slug && s.slug !== service.slug
  );
  const matchedTip =
    HEALTH_TIPS.find((tip) => tip.slug === service.relatedTipSlug) ??
    HEALTH_TIPS.find((tip) => tip.departmentSlugs.includes(dept.slug)) ??
    HEALTH_TIPS[0];

  const currentIdx = SERVICES.findIndex((s) => s.slug === service.slug);
  const prevService =
    currentIdx > 0 ? SERVICES[currentIdx - 1] : SERVICES[SERVICES.length - 1];
  const nextService =
    currentIdx >= 0 && currentIdx < SERVICES.length - 1
      ? SERVICES[currentIdx + 1]
      : SERVICES[0];

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: t({ fr: "Accueil", en: "Home" }), href: "/" },
          { label: t({ fr: "Départements", en: "Departments" }), href: `/departements#${dept.slug}` },
          { label: t(service.name) },
        ]}
        eyebrow={t(dept.name)}
        eyebrowTone="cobalt"
        title={t(service.name)}
        description={t(service.longDescription)}
        actions={
          <>
            <Link
              href={`/rendez-vous?service=${service.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-[#0A66C2] px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#08162B]"
            >
              <Calendar className="h-4 w-4" aria-hidden="true" />
              {t({ fr: "Prendre rendez-vous dans ce service", en: "Book in this unit" })}
            </Link>
            <Link
              href="/#urgences"
              className="inline-flex items-center gap-2 rounded-full border border-[#C81E1E]/25 bg-white px-5 py-3 text-sm font-semibold text-[#C81E1E] transition-colors hover:bg-[#C81E1E] hover:text-white"
            >
              <ShieldAlert className="h-4 w-4" aria-hidden="true" />
              {t({ fr: "Urgences 24h/24", en: "24/7 ER" })}
            </Link>
          </>
        }
        stats={[
          {
            value: String(service.doctorCount),
            label: t({ fr: "Médecins", en: "Physicians" }),
          },
          {
            value: service.exams[0]?.price ?? "4 000 FCFA",
            label: t({ fr: "Tarif de base", en: "Starting fee" }),
          },
          {
            value: dept.code,
            label: t({ fr: "Pôle", en: "Dept" }),
          },
          {
            value: service.hours.fr.includes("24h/24") ? "24h/24" : "Lun – Ven",
            label: t({ fr: "Accès", en: "Access" }),
          },
        ]}
        rightContent={
          <ArchitecturalArchFrame
            src={service.image}
            alt={t(service.name)}
            aspectClass="aspect-[4/3]"
            priority
          />
        }
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* Location & Hours Info Strip */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-2xl border border-[#08162B]/10 bg-white p-4 shadow-sm">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F2FC] text-[#0A66C2]">
              <MapPin className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#475569]">
                {t({ fr: "Localisation sur le campus", en: "Campus location" })}
              </p>
              <p className="mt-0.5 text-sm font-bold text-[#08162B]">{t(service.location)}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-[#08162B]/10 bg-white p-4 shadow-sm">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FBF5E8] text-[#B8892E]">
              <Clock className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#475569]">
                {t({ fr: "Horaires d'ouverture", en: "Opening hours" })}
              </p>
              <p className="mt-0.5 text-sm font-bold text-[#08162B]">{t(service.hours)}</p>
            </div>
          </div>
        </div>

        {/* Leadership + Exams & Tariffs Table */}
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="min-w-0 space-y-6 lg:col-span-5">
            <div className="rounded-3xl border border-white bg-white p-6 shadow-premium">
              <h2 className="text-xl font-extrabold text-[#08162B]">
                {t({ fr: "Responsables du service", en: "Service Leadership" })}
              </h2>
              <p className="mt-1 text-xs text-[#475569]">
                {t({
                  fr: "Ils coordonnent l'activité clinique et l'accueil des patients.",
                  en: "Coordinating clinical care and patient support.",
                })}
              </p>

              <div className="mt-5 space-y-4">
                <div className="flex items-center gap-4 rounded-2xl bg-[#F8F7F4] p-4">
                  <PractitionerPortraitFrame
                    src={headDoc?.photo}
                    name={service.headDoctor}
                    accentColor={dept.accentColor}
                    size="sm"
                  />
                  <div>
                    <p className="text-[11px] font-bold uppercase text-[#0A66C2]">
                      {t({ fr: "Chef de service", en: "Head of Service" })}
                    </p>
                    <p className="text-sm font-bold text-[#08162B]">{service.headDoctor}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl bg-[#F8F7F4] p-4">
                  <PractitionerPortraitFrame
                    name={service.majorName}
                    accentColor="#B8892E"
                    size="sm"
                  />
                  <div>
                    <p className="text-[11px] font-bold uppercase text-[#B8892E]">
                      {t({ fr: "Major de service", en: "Head Nurse" })}
                    </p>
                    <p className="text-sm font-bold text-[#08162B]">{service.majorName}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Preparation Checklist Card */}
            <div className="rounded-3xl border border-[#08162B]/10 bg-white p-6 shadow-premium">
              <h2 className="flex items-center gap-2 text-lg font-extrabold text-[#08162B]">
                <FileCheck2 className="h-5 w-5 text-[#0D7A5F]" aria-hidden="true" />
                {t({ fr: "À apporter le jour J", en: "What to bring on visit day" })}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {[
                  {
                    fr: "Pièce d'identité (CNI / Passeport) & référence QR",
                    en: "National ID / Passport & QR booking reference",
                  },
                  {
                    fr: "Carnet médical et ordonnances récentes",
                    en: "Medical booklet and current prescriptions",
                  },
                  {
                    fr: "Anciens résultats de biologie ou d'imagerie",
                    en: "Prior laboratory or diagnostic imaging reports",
                  },
                  {
                    fr: "Carte d'assurance ou bon de prise en charge",
                    en: "Insurance card or corporate coverage voucher",
                  },
                ].map((item) => (
                  <li key={item.fr} className="flex items-start gap-2.5 text-xs font-medium text-[#08162B]">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#0D7A5F]"
                      aria-hidden="true"
                    />
                    <span>{t(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Populated Exams & Tariffs */}
          <div className="min-w-0 rounded-3xl border border-white bg-white p-6 shadow-premium lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-extrabold text-[#08162B]">
                  {t({ fr: "Examens & tarifs indicatifs", en: "Procedures & Indicative Fees" })}
                </h2>
                <p className="mt-1 text-xs text-[#475569]">
                  {t({
                    fr: "Tarifs indicatifs avant prise en charge éventuelle par votre assurance.",
                    en: "Indicative fees prior to applicable health insurance coverage.",
                  })}
                </p>
              </div>
              <Stethoscope className="h-5 w-5 text-[#0A66C2]" aria-hidden="true" />
            </div>

            <div className="mt-5 divide-y divide-[#08162B]/8 rounded-2xl border border-[#08162B]/10 bg-[#F8F7F4] px-4">
              {service.exams.map((ex) => (
                <div
                  key={ex.name.fr}
                  className="flex flex-col justify-between gap-2 py-4 sm:flex-row sm:items-center"
                >
                  <div>
                    <p className="text-sm font-bold text-[#08162B]">{t(ex.name)}</p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-xs text-[#475569]">
                      <Clock className="h-3 w-3 text-[#B8892E]" aria-hidden="true" />
                      {ex.duration}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-white px-3.5 py-1.5 font-mono text-sm font-extrabold text-[#0A66C2] shadow-xs">
                    {ex.price}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#E8F2FC]/60 p-4">
              <div className="flex items-center gap-2 text-xs text-[#08162B]">
                <MapPin className="h-4 w-4 text-[#0A66C2]" aria-hidden="true" />
                <span>
                  <strong>{t({ fr: "Accueil :", en: "Desk:" })}</strong> {t(service.location)}
                </span>
              </div>
              <Link
                href={`/rendez-vous?service=${service.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#0A66C2] px-4 py-2 text-xs font-bold text-white hover:bg-[#08162B]"
              >
                {t({ fr: "Réserver ce service", en: "Book this service" })}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        {/* Department Physicians Section */}
        {deptDoctors.length > 0 ? (
          <section className="mt-12 rounded-3xl border border-white bg-white p-6 shadow-premium sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0A66C2]">
                  {t(dept.name)}
                </p>
                <h2 className="mt-1 text-xl font-extrabold text-[#08162B]">
                  {t({ fr: "Praticiens du département", en: "Department Physicians" })}
                </h2>
              </div>
              <Link
                href="/medecins"
                className="text-xs font-bold text-[#0A66C2] hover:underline"
              >
                {t({ fr: "Voir tous les médecins →", en: "View all doctors →" })}
              </Link>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {deptDoctors.map((doc) => (
                <div
                  key={doc.id}
                  className="flex flex-col justify-between rounded-2xl border border-[#08162B]/10 bg-[#F8F7F4] p-4"
                >
                  <div className="flex items-center gap-3">
                    <PractitionerPortraitFrame
                      src={doc.photo}
                      name={doc.name}
                      accentColor={dept.accentColor}
                      size="sm"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold text-[#08162B]">{doc.name}</p>
                      <p className="mt-0.5 truncate text-[11px] text-[#475569]">
                        {t(doc.specialty)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-[#08162B]/8 pt-3 text-[11px]">
                    <span className="truncate text-[#475569]">{t(doc.schedule)}</span>
                    <Link
                      href={`/rendez-vous?medecin=${doc.id}`}
                      className="shrink-0 font-bold text-[#0A66C2] hover:underline"
                    >
                      {t({ fr: "Consulter", en: "Book" })}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* 4-Step Consultation Flow */}
        <section className="mt-12 rounded-3xl border border-[#08162B]/10 bg-white p-7 shadow-premium">
          <h2 className="text-xl font-extrabold text-[#08162B]">
            {t({ fr: "Votre consultation en 4 étapes", en: "Your Consultation in 4 Steps" })}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                n: "01",
                title: { fr: "Prenez rendez-vous", en: "Book online" },
                desc: {
                  fr: "En ligne sans compte ou par téléphone au +237 659 28 52 53.",
                  en: "Online with no account or via +237 659 28 52 53.",
                },
              },
              {
                n: "02",
                title: { fr: "Présentez-vous à l'accueil", en: "Check in at reception" },
                desc: {
                  fr: "Muni(e) de votre pièce d'identité, référence QR et anciens examens.",
                  en: "With your ID, QR booking reference, and prior medical records.",
                },
              },
              {
                n: "03",
                title: { fr: "Consultation spécialisée", en: "Specialist consultation" },
                desc: {
                  fr: "Examen clinique, explications et prescriptions adaptées.",
                  en: "Clinical assessment, guidance, and tailored prescriptions.",
                },
              },
              {
                n: "04",
                title: { fr: "Suivi & résultats au guichet", en: "Follow-up & lab desk" },
                desc: {
                  fr: "Retrait des résultats au laboratoire et programmation du prochain suivi.",
                  en: "Collect lab results at the hospital desk and schedule follow-ups.",
                },
              },
            ].map((step) => (
              <div key={step.n} className="rounded-2xl bg-[#F8F7F4] p-4">
                <span className="font-mono text-xs font-bold text-[#0A66C2]">{step.n}</span>
                <h3 className="mt-2 text-sm font-bold text-[#08162B]">{t(step.title)}</h3>
                <p className="mt-1 text-xs leading-relaxed text-[#475569]">{t(step.desc)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ + Topic-Matched Health Tip */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <div className="min-w-0 rounded-3xl border border-white bg-white p-6 shadow-premium lg:col-span-7">
            <h2 className="text-xl font-extrabold text-[#08162B]">
              {t({ fr: "Questions fréquentes", en: "Frequently Asked Questions" })}
            </h2>
            <div className="mt-5 space-y-3">
              {service.faqs.map((faq, idx) => {
                const open = openFaq === idx;
                return (
                  <div
                    key={faq.q.fr}
                    className="rounded-2xl border border-[#08162B]/10 bg-[#F8F7F4]"
                  >
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setOpenFaq(open ? -1 : idx)}
                      className="flex w-full items-center justify-between gap-4 p-4 text-left text-sm font-bold text-[#08162B]"
                    >
                      <span>{t(faq.q)}</span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 transition-transform ${
                          open ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {open ? (
                      <p className="border-t border-[#08162B]/8 px-4 py-3 text-xs leading-relaxed text-[#475569] sm:text-sm">
                        {t(faq.a)}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="min-w-0 rounded-3xl border border-white bg-white p-6 shadow-premium lg:col-span-5">
            <h2 className="text-xl font-extrabold text-[#08162B]">
              {t({ fr: "Astuce santé associée", en: "Related Health Tip" })}
            </h2>
            <Link
              href="/actualites#astuces"
              className="mt-4 block rounded-2xl border border-[#08162B]/10 bg-[#F8F7F4] p-4 transition-colors hover:border-[#0A66C2]"
            >
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#0A66C2]">
                {t(matchedTip.category)} · {t(matchedTip.format)}
              </p>
              <p className="mt-2 text-base font-bold text-[#08162B]">{t(matchedTip.title)}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-[#475569]">
                {t(matchedTip.summary)}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#0A66C2]">
                {t({ fr: "Lire le conseil", en: "Read advice" })}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </Link>

            {deptSiblings.length > 0 ? (
              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-wider text-[#475569]">
                  {t({ fr: "Autres unités du département", en: "Other units in department" })}
                </p>
                <ul className="mt-2.5 space-y-2">
                  {deptSiblings.map((sib) => (
                    <li key={sib.slug}>
                      <Link
                        href={`/services/${sib.slug}`}
                        className="flex items-center justify-between rounded-xl bg-[#F8F7F4] px-3.5 py-2.5 text-xs font-bold text-[#08162B] hover:text-[#0A66C2]"
                      >
                        <span>{t(sib.name)}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>

        {/* Prev / Next Clinical Service Navigation */}
        <nav
          aria-label={t({ fr: "Navigation entre services", en: "Service pagination" })}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <Link
            href={`/services/${prevService.slug}`}
            className="group flex min-w-0 items-center justify-between gap-4 rounded-3xl border border-white bg-white p-5 shadow-premium transition-all hover:border-[#0A66C2]/30"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F8F7F4] text-[#08162B] group-hover:bg-[#0A66C2] group-hover:text-white">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#475569]">
                  {t({ fr: "Service précédent", en: "Previous unit" })}
                </span>
                <span className="mt-0.5 block truncate text-sm font-bold text-[#08162B] group-hover:text-[#0A66C2]">
                  {t(prevService.name)}
                </span>
              </div>
            </div>
          </Link>

          <Link
            href={`/services/${nextService.slug}`}
            className="group flex min-w-0 items-center justify-between gap-4 rounded-3xl border border-white bg-white p-5 text-right shadow-premium transition-all hover:border-[#0A66C2]/30"
          >
            <div className="ml-auto flex min-w-0 items-center gap-3">
              <div className="min-w-0">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#475569]">
                  {t({ fr: "Service suivant", en: "Next unit" })}
                </span>
                <span className="mt-0.5 block truncate text-sm font-bold text-[#08162B] group-hover:text-[#0A66C2]">
                  {t(nextService.name)}
                </span>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F8F7F4] text-[#08162B] group-hover:bg-[#0A66C2] group-hover:text-white">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>
          </Link>
        </nav>
      </div>
    </>
  );
}
