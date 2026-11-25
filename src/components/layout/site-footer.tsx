"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  ArrowUp,
  CheckCircle2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
  X,
} from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { HOSPITAL_CONTACT } from "@/data/hospital-data";
import { MedicalBackdrop } from "@/components/ui/medical-backdrop";

export function SiteFooter() {
  const { t } = useLanguage();
  const [contactOpen, setContactOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [subject, setSubject] = useState("orientation");

  useEffect(() => {
    if (!contactOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setContactOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [contactOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <footer className="no-print relative mt-20 overflow-hidden bg-[#071A33] text-white">
        {/* Clinical Sky & Teal Top Accent Hairline */}
        <div
          aria-hidden="true"
          className="h-1 w-full bg-gradient-to-r from-[#0A66C2] via-[#0EA5E9] to-[#0D9488]"
        />
        <MedicalBackdrop variant="dark-clinical" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Brand Column */}
            <div className="min-w-0 lg:col-span-4">
              <Link href="/" className="inline-flex items-center gap-3.5">
                <div className="h-14 w-14 overflow-hidden rounded-full ring-2 ring-sky-400/50">
                  <Image
                    src="/images/brand/logo-hl.webp"
                    alt="Logo Hôpital Laquintinie"
                    width={56}
                    height={56}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-lg font-bold tracking-tight text-white">
                    Hôpital Laquintinie
                  </p>
                  <p className="text-xs font-medium text-[#38BDF8]">
                    {t({ fr: "Douala · depuis 1931", en: "Douala · since 1931" })}
                  </p>
                </div>
              </Link>

              <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-300">
                {t({
                  fr: "Soigner, enseigner, chercher : depuis près d'un siècle, un établissement public d'excellence au cœur de Douala, sous la tutelle du Ministère de la Santé Publique.",
                  en: "Care, teaching, and clinical research: nearly a century of public healthcare excellence in the heart of Douala under the Ministry of Public Health.",
                })}
              </p>

              {/* Emergency Quick Pill inside Footer */}
              <div className="mt-6 rounded-2xl border border-white/15 bg-white/5 p-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#38BDF8]">
                  {t({ fr: "Ligne directe Urgences 24h/24", en: "24/7 Emergency Direct Line" })}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-4">
                  <a
                    href={`tel:${HOSPITAL_CONTACT.emergencyPhoneRaw}`}
                    className="inline-flex items-center gap-2 font-mono text-sm font-bold text-white transition-colors hover:text-[#38BDF8]"
                  >
                    <Phone className="h-4 w-4 text-[#ef4444]" aria-hidden="true" />
                    {HOSPITAL_CONTACT.emergencyPhone}
                  </a>
                  <a
                    href={`tel:${HOSPITAL_CONTACT.samuNumber}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#C81E1E] px-3 py-1 font-mono text-xs font-bold text-white"
                  >
                    SAMU {HOSPITAL_CONTACT.samuNumber}
                  </a>
                </div>
              </div>

              {/* Social Links with accessible "(nouvel onglet)" */}
              <div className="mt-6 flex items-center gap-3">
                <a
                  href={HOSPITAL_CONTACT.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook (nouvel onglet)"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-xs font-bold text-white transition-colors hover:border-[#38BDF8] hover:bg-white/10"
                >
                  f
                </a>
                <a
                  href={HOSPITAL_CONTACT.social.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (nouvel onglet)"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-xs font-bold text-white transition-colors hover:border-[#38BDF8] hover:bg-white/10"
                >
                  𝕏
                </a>
                <a
                  href={HOSPITAL_CONTACT.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn (nouvel onglet)"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-xs font-bold text-white transition-colors hover:border-[#38BDF8] hover:bg-white/10"
                >
                  in
                </a>
              </div>
            </div>

            {/* Footer Columns */}
            <div className="grid min-w-0 grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-8">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#38BDF8]">
                  {t({ fr: "À propos", en: "About" })}
                </h2>
                <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
                  <li>
                    <Link href="/a-propos" className="hover:text-white">
                      {t({ fr: "Présentation & Gouvernance", en: "Overview & Governance" })}
                    </Link>
                  </li>
                  <li>
                    <Link href="/#directeur" className="hover:text-white">
                      {t({ fr: "Mot du Directeur", en: "Director's Message" })}
                    </Link>
                  </li>
                  <li>
                    <Link href="/#95ans" className="hover:text-white">
                      {t({ fr: "95 ans d'histoire", en: "95 Years of History" })}
                    </Link>
                  </li>
                  <li>
                    <Link href="/#hopital" className="hover:text-white">
                      {t({ fr: "Engagements & Missions", en: "Commitments" })}
                    </Link>
                  </li>
                  <li>
                    <Link href="/#partenaires" className="hover:text-white">
                      {t({ fr: "Partenaires & Assurances", en: "Partners & Insurers" })}
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#38BDF8]">
                  {t({ fr: "Patients", en: "Patients" })}
                </h2>
                <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
                  <li>
                    <Link href="/rendez-vous" className="hover:text-white">
                      {t({ fr: "Prendre rendez-vous", en: "Book Appointment" })}
                    </Link>
                  </li>
                  <li>
                    <Link href="/departements" className="hover:text-white">
                      {t({ fr: "Nos 10 départements", en: "Our 10 Departments" })}
                    </Link>
                  </li>
                  <li>
                    <Link href="/medecins" className="hover:text-white">
                      {t({ fr: "Annuaire des médecins", en: "Doctors Directory" })}
                    </Link>
                  </li>
                  <li>
                    <Link href="/#tarifs" className="hover:text-white">
                      {t({ fr: "Tarifs indicatifs", en: "Consultation Fees" })}
                    </Link>
                  </li>
                  <li>
                    <Link href="/#parcours" className="hover:text-white">
                      {t({ fr: "Votre parcours", en: "Patient Journey" })}
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#38BDF8]">
                  {t({ fr: "Médias", en: "Media" })}
                </h2>
                <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
                  <li>
                    <Link href="/actualites" className="hover:text-white">
                      {t({ fr: "Actualités", en: "Hospital News" })}
                    </Link>
                  </li>
                  <li>
                    <Link href="/actualites#astuces" className="hover:text-white">
                      {t({ fr: "Astuces santé", en: "Health Tips" })}
                    </Link>
                  </li>
                  <li>
                    <Link href="/#galerie" className="hover:text-white">
                      {t({ fr: "Visite des pavillons", en: "Campus Showcase" })}
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#38BDF8]">
                  {t({ fr: "Contact", en: "Contact" })}
                </h2>
                <ul className="mt-4 space-y-3 text-sm text-slate-300">
                  <li>
                    <Link href="/#urgences" className="hover:text-white">
                      {t({ fr: "Urgences 24h/24", en: "24/7 Emergencies" })}
                    </Link>
                  </li>
                  <li>
                    <Link href="/#infos" className="hover:text-white">
                      {t({ fr: "Plan & infos pratiques", en: "Map & Practical Info" })}
                    </Link>
                  </li>
                  <li>
                    <a
                      href={`mailto:${HOSPITAL_CONTACT.email}`}
                      className="inline-flex items-center gap-1.5 break-all hover:text-white"
                    >
                      <Mail className="h-3.5 w-3.5 shrink-0 text-[#38BDF8]" aria-hidden="true" />
                      {HOSPITAL_CONTACT.email}
                    </a>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setContactOpen(true);
                      }}
                      className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-400/10 px-3.5 py-2 text-xs font-semibold text-sky-200 transition-colors hover:bg-[#0EA5E9] hover:text-white"
                    >
                      <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
                      {t({ fr: "Laissez-nous un message", en: "Send us a message" })}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Legal Row */}
          <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/15 pt-8 text-xs text-slate-300 sm:flex-row sm:items-center">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <p>
                © 2026 Hôpital Laquintinie de Douala ·{" "}
                {t({
                  fr: "Ministère de la Santé Publique",
                  en: "Ministry of Public Health",
                })}
              </p>
              <span className="text-white/30" aria-hidden="true">
                ·
              </span>
              <span className="inline-flex items-center gap-1 text-slate-300">
                <MapPin className="h-3.5 w-3.5 text-[#38BDF8]" aria-hidden="true" />
                {HOSPITAL_CONTACT.poBox}, {HOSPITAL_CONTACT.address}, {HOSPITAL_CONTACT.city}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <Link
                href="/mentions-legales"
                className="font-medium text-slate-300 underline-offset-4 hover:text-white hover:underline"
              >
                {t({ fr: "Mentions légales", en: "Legal Notice" })}
              </Link>
              <Link
                href="/confidentialite"
                className="font-medium text-slate-300 underline-offset-4 hover:text-white hover:underline"
              >
                {t({ fr: "Confidentialité", en: "Privacy Policy" })}
              </Link>
              <button
                type="button"
                onClick={scrollToTop}
                aria-label={t({ fr: "Revenir en haut de la page", en: "Back to top" })}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-[#0C2547] px-3.5 py-2 text-xs font-semibold text-white shadow-lg transition-colors hover:border-[#38BDF8] hover:bg-[#0A66C2]"
              >
                <span>{t({ fr: "Haut de page", en: "Top" })}</span>
                <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Accessible Contact Modal with Privacy Link */}
      {contactOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-dialog-title"
          onClick={() => setContactOpen(false)}
          className="no-print fixed inset-0 z-[90] flex items-center justify-center bg-[#08162B]/75 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="animate-modal-pop relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-white/20 bg-white p-6 shadow-2xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="contact-dialog-title"
                  className="text-2xl font-bold text-[#08162B]"
                >
                  {t({ fr: "Écrivez-nous", en: "Write to us" })}
                </h2>
                <p className="mt-1 text-sm text-[#475569]">
                  {t({
                    fr: "Une question administrative ou d'orientation ? La Maison du Patient vous répond par e-mail.",
                    en: "Have an inquiry? Our Patient House team replies by email.",
                  })}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setContactOpen(false)}
                aria-label={t({ fr: "Fermer", en: "Close" })}
                autoFocus
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#071A33]/15 text-[#071A33] transition-colors hover:bg-[#E6F0FA]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {submitted ? (
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-700" aria-hidden="true" />
                <p className="mt-3 text-base font-bold text-emerald-950">
                  {t({
                    fr: "Message préparé avec succès",
                    en: "Message prepared successfully",
                  })}
                </p>
                <p className="mt-1.5 text-sm text-emerald-800">
                  {t({
                    fr: "Votre demande a bien été enregistrée dans cette démonstration. Pour une réponse immédiate, appelez le +237 659 28 52 53.",
                    en: "Your inquiry was captured in this preview. For immediate help, call +237 659 28 52 53.",
                  })}
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="modal-name"
                    className="block text-xs font-bold uppercase tracking-wider text-[#08162B]"
                  >
                    {t({ fr: "Votre nom complet", en: "Full name" })}
                  </label>
                  <input
                    id="modal-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Ex : Jean-Paul Mbarga"
                    className="mt-1.5 w-full rounded-xl border border-sky-200 bg-[#F4F8FC] px-4 py-2.5 text-sm text-[#071A33] focus:border-[#0A66C2] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="modal-email"
                    className="block text-xs font-bold uppercase tracking-wider text-[#071A33]"
                  >
                    {t({ fr: "Votre adresse e-mail", en: "Email address" })}
                  </label>
                  <input
                    id="modal-email"
                    name="email"
                    type="email"
                    required
                    placeholder="nom@exemple.cm"
                    className="mt-1.5 w-full rounded-xl border border-sky-200 bg-[#F4F8FC] px-4 py-2.5 text-sm text-[#071A33] focus:border-[#0A66C2] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="modal-subject"
                    className="block text-xs font-bold uppercase tracking-wider text-[#071A33]"
                  >
                    {t({ fr: "Objet de votre demande", en: "Inquiry topic" })}
                  </label>
                  <select
                    id="modal-subject"
                    name="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-sky-200 bg-[#F4F8FC] px-4 py-2.5 text-sm text-[#071A33] focus:border-[#0A66C2] focus:bg-white focus:outline-none"
                  >
                    <option value="orientation">
                      {t({ fr: "Orientation médicale", en: "Medical orientation" })}
                    </option>
                    <option value="rendez-vous">
                      {t({ fr: "Rendez-vous & horaires", en: "Appointments & hours" })}
                    </option>
                    <option value="assurance">
                      {t({ fr: "Assurance / Prise en charge", en: "Insurance coverage" })}
                    </option>
                    <option value="maison-patient">
                      {t({ fr: "Maison du Patient (écoute & réclamation)", en: "Patient House (support & feedback)" })}
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="modal-message"
                    className="block text-xs font-bold uppercase tracking-wider text-[#071A33]"
                  >
                    {t({ fr: "Votre message", en: "Your message" })}
                  </label>
                  <textarea
                    id="modal-message"
                    name="message"
                    rows={4}
                    required
                    className="mt-1.5 w-full rounded-xl border border-sky-200 bg-[#F4F8FC] px-4 py-2.5 text-sm text-[#071A33] focus:border-[#0A66C2] focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="rounded-xl border border-[#C81E1E]/20 bg-[#C81E1E]/5 px-4 py-3 text-xs text-[#991B1B]">
                  {t({
                    fr: "En cas d'urgence médicale, ne nous écrivez pas : appelez le +237 233 42 68 68 / SAMU 119 ou présentez-vous directement aux urgences 24h/24.",
                    en: "For medical emergencies, do not email us: call +237 233 42 68 68 / SAMU 119 or come directly to the 24/7 ER.",
                  })}
                </div>

                <div className="flex items-start gap-2 text-xs text-[#475569]">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#0A66C2]" aria-hidden="true" />
                  <span>
                    {t({
                      fr: "Vos informations sont traitées conformément à notre ",
                      en: "Your data is handled in accordance with our ",
                    })}
                    <Link
                      href="/confidentialite"
                      onClick={() => setContactOpen(false)}
                      className="font-semibold text-[#0A66C2] underline"
                    >
                      {t({ fr: "Politique de confidentialité", en: "Privacy Policy" })}
                    </Link>
                    .
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-[#0A66C2] px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#08162B]"
                >
                  {t({ fr: "Envoyer le message", en: "Send message" })}
                </button>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
