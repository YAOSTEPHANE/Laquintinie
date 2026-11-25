"use client";

import Link from "next/link";
import React from "react";
import {
  Building2,
  FileText,
  Lock,
  Mail,
  Phone,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { HOSPITAL_CONTACT } from "@/data/hospital-data";
import { MedicalBackdrop } from "@/components/ui/medical-backdrop";
import { PageHero } from "@/components/ui/page-hero";

export function ConfidentialiteView() {
  const { t } = useLanguage();

  const sections = [
    { id: "objet", label: { fr: "01. Objet et champ d'application", en: "01. Scope & purpose" } },
    { id: "responsable", label: { fr: "02. Responsable du traitement", en: "02. Data controller" } },
    { id: "donnees", label: { fr: "03. Données collectées", en: "03. Data processed" } },
    { id: "cookies", label: { fr: "04. Cookies et traceurs tiers", en: "04. Cookies & trackers" } },
    { id: "droits", label: { fr: "05. Vos droits & conservation", en: "05. Your rights & retention" } },
  ];

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: t({ fr: "Accueil", en: "Home" }), href: "/" },
          { label: t({ fr: "Confidentialité", en: "Privacy Policy" }) },
        ]}
        eyebrow={t({ fr: "Version 2.4 · novembre 2026", en: "Version 2.4 · November 2026" })}
        eyebrowTone="emerald"
        title={t({
          fr: "Politique de confidentialité et protection des données",
          en: "Privacy & Personal Data Protection Policy",
        })}
        description={t({
          fr: "Plateforme Web de prise de rendez-vous en ligne et future application mobile MyLaquintinie.",
          en: "Online appointment scheduling web portal and upcoming MyLaquintinie mobile application.",
        })}
      />

      <div className="relative overflow-x-clip">
        <MedicalBackdrop variant="clinical" />
        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Sticky Sidebar Nav + Zero-Cookie Guarantee */}
          <aside className="min-w-0 space-y-5 lg:sticky lg:top-28 lg:col-span-4">
            <nav
              aria-label={t({ fr: "Sections de la politique", en: "Policy sections" })}
              className="rounded-3xl border border-white bg-white p-6 shadow-premium"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-[#0A66C2]">
                {t({ fr: "Sommaire", en: "Contents" })}
              </p>
              <ul className="mt-4 space-y-2 text-sm font-semibold text-[#475569]">
                {sections.map((sec) => (
                  <li key={sec.id}>
                    <a
                      href={`#${sec.id}`}
                      className="block rounded-xl px-2.5 py-1.5 hover:bg-[#F2F7FC] hover:text-[#0A66C2]"
                    >
                      {t(sec.label)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                {t({ fr: "Garantie vie privée", en: "Privacy guarantee" })}
              </div>
              <p className="mt-2 text-xs leading-relaxed text-emerald-950">
                {t({
                  fr: "Zéro cookie publicitaire et zéro traceur tiers chargé au démarrage. Vous gardez le contrôle de vos données à tout moment.",
                  en: "Zero advertising cookies and zero third-party trackers loaded on initial visit.",
                })}
              </p>
              <Link
                href="/mentions-legales"
                className="mt-4 inline-block text-xs font-bold text-emerald-900 underline"
              >
                {t({ fr: "Consulter les mentions légales →", en: "Read legal notice →" })}
              </Link>
            </div>
          </aside>

          {/* Policy Document */}
          <div className="min-w-0 break-words rounded-3xl border border-white bg-white p-6 shadow-premium sm:p-10 lg:col-span-8">
            <div className="space-y-8 text-sm leading-relaxed text-[#475569]">
              <section id="objet">
                <h2 className="flex items-center gap-2 text-lg font-bold text-[#08162B]">
                  <FileText className="h-5 w-5 text-[#0A66C2]" aria-hidden="true" />
                  {t({
                    fr: "01. Objet et champ d'application",
                    en: "01. Scope and purpose",
                  })}
                </h2>
                <p className="mt-2">
                  {t({
                    fr: "La présente politique informe les usagers sur la collecte, le traitement et la protection des données personnelles dans le cadre de la prise de rendez-vous en ligne et de la demande d'information auprès de l'Hôpital Laquintinie de Douala.",
                    en: "This policy informs visitors how personal data is collected, processed, and safeguarded when booking appointments online or contacting Laquintinie Hospital of Douala.",
                  })}
                </p>
              </section>

              <section id="responsable">
                <h2 className="flex items-center gap-2 text-lg font-bold text-[#08162B]">
                  <Building2 className="h-5 w-5 text-[#0A66C2]" aria-hidden="true" />
                  {t({
                    fr: "02. Responsable du traitement",
                    en: "02. Data controller",
                  })}
                </h2>
                <p className="mt-2">
                  <strong>{HOSPITAL_CONTACT.name}</strong> —{" "}
                  {t({
                    fr: "Établissement public sous tutelle du Ministère de la Santé Publique du Cameroun. Adresse :",
                    en: "Public hospital under the Cameroon Ministry of Public Health. Address:",
                  })}{" "}
                  {HOSPITAL_CONTACT.poBox}, {HOSPITAL_CONTACT.address}, {HOSPITAL_CONTACT.city}.{" "}
                  {t({ fr: "Contact :", en: "Contact:" })}{" "}
                  <a
                    href={`mailto:${HOSPITAL_CONTACT.email}`}
                    className="font-semibold text-[#0A66C2] underline"
                  >
                    {HOSPITAL_CONTACT.email}
                  </a>
                  .
                </p>
              </section>

              <section id="donnees">
                <h2 className="flex items-center gap-2 text-lg font-bold text-[#08162B]">
                  <Lock className="h-5 w-5 text-[#0A66C2]" aria-hidden="true" />
                  {t({
                    fr: "03. Données susceptibles d'être traitées",
                    en: "03. Personal data processed",
                  })}
                </h2>
                <ul className="mt-2 list-disc space-y-1.5 pl-5">
                  <li>
                    {t({
                      fr: "Données d'identification du patient ou du proche (nom, téléphone, adresse e-mail).",
                      en: "Patient or family contact details (full name, phone number, email address).",
                    })}
                  </li>
                  <li>
                    {t({
                      fr: "Données de rendez-vous (département, service, praticien, date, heure, statut et code QR de présence).",
                      en: "Appointment records (department, unit, physician, date, time slot, and QR check-in code).",
                    })}
                  </li>
                  <li>
                    {t({
                      fr: "Données de paiement (montant, référence de transaction et mode de règlement).",
                      en: "Payment confirmation metadata (amount, transaction reference, and payment method).",
                    })}
                  </li>
                  <li>
                    {t({
                      fr: "La plateforme de prise de rendez-vous ne constitue pas un dossier médical électronique complet et ne réalise ni téléconsultation ni délivrance d'ordonnances ou de résultats d'examens en ligne.",
                      en: "This booking portal does not replace an electronic medical record and does not provide teleconsultation or online delivery of prescriptions or lab results.",
                    })}
                  </li>
                </ul>
              </section>

              <section id="cookies">
                <h2 className="text-lg font-bold text-[#08162B]">
                  {t({
                    fr: "04. Cookies et traceurs tiers",
                    en: "04. Cookies and third-party trackers",
                  })}
                </h2>
                <p className="mt-2">
                  {t({
                    fr: "Ce portail ne dépose aucun cookie publicitaire et n'active la carte interactive Google Maps qu'après une action explicite de l'utilisateur (« Afficher la carte interactive »), garantissant zéro cookie tiers lors de la navigation initiale.",
                    en: "This portal sets no advertising cookies and only loads the interactive Google Maps embed upon explicit user request (“Load interactive map”), ensuring zero third-party cookies on initial page load.",
                  })}
                </p>
              </section>

              <section id="droits">
                <h2 className="text-lg font-bold text-[#08162B]">
                  {t({
                    fr: "05. Vos droits et conservation",
                    en: "05. Your rights and retention",
                  })}
                </h2>
                <p className="mt-2">
                  {t({
                    fr: "Vous pouvez exercer vos droits d'accès, de rectification ou de suppression en écrivant à",
                    en: "You may exercise your rights of access, correction, or deletion by emailing",
                  })}{" "}
                  <a
                    href={`mailto:${HOSPITAL_CONTACT.email}`}
                    className="font-semibold text-[#0A66C2] underline"
                  >
                    {HOSPITAL_CONTACT.email}
                  </a>{" "}
                  {t({
                    fr: "ou en vous présentant à la Maison du Patient (ouverte 24h/24 et 7j/7).",
                    en: "or by visiting our 24/7 Patient House desk on campus.",
                  })}
                </p>
              </section>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

export function MentionsLegalesView() {
  const { t } = useLanguage();

  const sections = [
    { id: "editeur", label: { fr: "01. Éditeur du site", en: "01. Publisher" } },
    { id: "propriete", label: { fr: "02. Propriété intellectuelle", en: "02. Intellectual property" } },
    { id: "avertissement", label: { fr: "03. Avertissement médical", en: "03. Medical disclaimer" } },
  ];

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: t({ fr: "Accueil", en: "Home" }), href: "/" },
          { label: t({ fr: "Mentions légales", en: "Legal Notice" }) },
        ]}
        eyebrow={t({ fr: "Informations réglementaires", en: "Institutional Disclosures" })}
        eyebrowTone="cobalt"
        title={t({ fr: "Mentions légales", en: "Legal Notice" })}
        description={t({
          fr: `Conformément aux obligations d'information du public applicables au portail officiel de l'${HOSPITAL_CONTACT.name}.`,
          en: `Official publisher disclosures and regulatory information for ${HOSPITAL_CONTACT.name}.`,
        })}
      />

      <div className="relative overflow-x-clip">
        <MedicalBackdrop variant="clinical" />
        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-12">
          <aside className="min-w-0 space-y-5 lg:sticky lg:top-28 lg:col-span-4">
            <nav
              aria-label={t({ fr: "Sections légales", en: "Legal sections" })}
              className="rounded-3xl border border-white bg-white p-6 shadow-premium"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-[#0A66C2]">
                {t({ fr: "Sommaire", en: "Contents" })}
              </p>
              <ul className="mt-4 space-y-2 text-sm font-semibold text-[#475569]">
                {sections.map((sec) => (
                  <li key={sec.id}>
                    <a
                      href={`#${sec.id}`}
                      className="block rounded-xl px-2.5 py-1.5 hover:bg-[#F2F7FC] hover:text-[#0A66C2]"
                    >
                      {t(sec.label)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="rounded-3xl border border-[#C81E1E]/20 bg-red-50 p-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C81E1E]">
                <ShieldAlert className="h-4 w-4" aria-hidden="true" />
                {t({ fr: "Avertissement d'urgence", en: "Emergency notice" })}
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#991B1B]">
                {t({
                  fr: "En cas d'urgence vitale, appelez directement le +237 233 42 68 68 ou le SAMU 119 sans attendre une réponse par courriel.",
                  en: "For medical emergencies, call +237 233 42 68 68 or SAMU 119 immediately rather than using email.",
                })}
              </p>
            </div>
          </aside>

          <div className="min-w-0 break-words rounded-3xl border border-white bg-white p-6 shadow-premium sm:p-10 lg:col-span-8">
            <div className="space-y-8 text-sm leading-relaxed text-[#475569]">
              <section id="editeur">
                <h2 className="text-lg font-bold text-[#08162B]">
                  {t({ fr: "01. Éditeur du site", en: "01. Website Publisher" })}
                </h2>
                <p className="mt-2">
                  <strong>{HOSPITAL_CONTACT.name}</strong> —{" "}
                  {t({
                    fr: "Hôpital public de référence de deuxième catégorie placé sous la tutelle du Ministère de la Santé Publique de la République du Cameroun.",
                    en: "Second-category public referral hospital operating under the Ministry of Public Health of the Republic of Cameroon.",
                  })}
                </p>
                <ul className="mt-4 space-y-2 rounded-2xl border border-sky-100 bg-[#F2F7FC] p-5">
                  <li>
                    <strong>{t({ fr: "Adresse :", en: "Address:" })}</strong>{" "}
                    {HOSPITAL_CONTACT.poBox}, {HOSPITAL_CONTACT.address}, {HOSPITAL_CONTACT.city},{" "}
                    {HOSPITAL_CONTACT.region}, {t(HOSPITAL_CONTACT.country)}
                  </li>
                  <li>
                    <strong>{t({ fr: "Directeur de publication :", en: "Publication Director:" })}</strong>{" "}
                    Dr Marie Solange NDOM EBONGUE,{" "}
                    {t({
                      fr: "Directeur de l'Hôpital Laquintinie de Douala",
                      en: "Director of Laquintinie Hospital Douala",
                    })}
                  </li>
                  <li className="flex flex-wrap items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-[#0A66C2]" aria-hidden="true" />
                    <strong>{t({ fr: "Téléphone standard :", en: "Main line:" })}</strong>
                    <a
                      href={`tel:${HOSPITAL_CONTACT.standardPhoneRaw}`}
                      className="font-mono text-[#0A66C2] underline"
                    >
                      {HOSPITAL_CONTACT.standardPhone}
                    </a>
                  </li>
                  <li className="flex flex-wrap items-center gap-1.5">
                    <ShieldAlert className="h-3.5 w-3.5 text-[#C81E1E]" aria-hidden="true" />
                    <strong>{t({ fr: "Urgences 24h/24 :", en: "24/7 Emergency:" })}</strong>
                    <a
                      href={`tel:${HOSPITAL_CONTACT.emergencyPhoneRaw}`}
                      className="font-mono text-[#C81E1E] underline"
                    >
                      {HOSPITAL_CONTACT.emergencyPhone}
                    </a>{" "}
                    / SAMU {HOSPITAL_CONTACT.samuNumber}
                  </li>
                  <li className="flex flex-wrap items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-[#0A66C2]" aria-hidden="true" />
                    <strong>{t({ fr: "Courrier électronique :", en: "Email:" })}</strong>
                    <a
                      href={`mailto:${HOSPITAL_CONTACT.email}`}
                      className="text-[#0A66C2] underline"
                    >
                      {HOSPITAL_CONTACT.email}
                    </a>
                  </li>
                </ul>
              </section>

              <section id="propriete">
                <h2 className="text-lg font-bold text-[#08162B]">
                  {t({ fr: "02. Propriété intellectuelle", en: "02. Intellectual Property" })}
                </h2>
                <p className="mt-2">
                  {t({
                    fr: "L'ensemble des contenus éditoriaux, photographies, emblèmes officiels (« Hôpital Laquintinie de Douala », « 95 ans au service de chaque vie ») et ressources graphiques sont la propriété de l'Hôpital Laquintinie de Douala. Toute reproduction non autorisée est interdite.",
                    en: "All editorial content, photography, official crests (“Hôpital Laquintinie de Douala”, “95 years serving every life”), and graphic assets belong to Laquintinie Hospital of Douala. Unauthorized reproduction is prohibited.",
                  })}
                </p>
              </section>

              <section id="avertissement">
                <h2 className="text-lg font-bold text-[#08162B]">
                  {t({ fr: "03. Avertissement médical", en: "03. Medical Disclaimer" })}
                </h2>
                <p className="mt-2">
                  {t({
                    fr: "Les informations de prévention et fiches de spécialités publiées sur ce site ont une vocation exclusivement informative et ne se substituent en aucun cas à une consultation médicale ou à une prise en charge d'urgence.",
                    en: "Preventive articles and specialty profiles published on this portal are strictly informational and never replace an in-person clinical consultation or emergency medical care.",
                  })}
                </p>
                <div className="mt-5">
                  <Link
                    href="/confidentialite"
                    className="inline-block text-xs font-bold text-[#0A66C2] underline"
                  >
                    {t({
                      fr: "Consulter la Politique de confidentialité →",
                      en: "Read Privacy Policy →",
                    })}
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
