"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  CheckCircle2,
  Copy,
  CreditCard,
  MapPin,
  Phone,
  Printer,
  QrCode,
  Search,
  ShieldAlert,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";
import { useLanguage } from "@/context/language-context";
import {
  DEPARTMENTS,
  DOCTORS,
  HOSPITAL_CONTACT,
  SERVICES,
} from "@/data/hospital-data";
import { PractitionerPortraitFrame } from "@/components/ui/framed-media";
import { MedicalBackdrop } from "@/components/ui/medical-backdrop";
import { PageHero } from "@/components/ui/page-hero";

const STEP_LABELS = [
  { num: 1, fr: "Pour qui", en: "For whom" },
  { num: 2, fr: "Spécialité", en: "Department" },
  { num: 3, fr: "Prestation", en: "Consultation" },
  { num: 4, fr: "Médecin", en: "Physician" },
  { num: 5, fr: "Date & heure", en: "Date & time" },
  { num: 6, fr: "Patient", en: "Patient info" },
  { num: 7, fr: "Récapitulatif", en: "Summary" },
  { num: 8, fr: "Confirmation", en: "Confirmation" },
];

const QUICK_DATES = [
  { iso: "2026-11-25", fr: "Mer 25 nov", en: "Wed Nov 25" },
  { iso: "2026-11-26", fr: "Jeu 26 nov", en: "Thu Nov 26" },
  { iso: "2026-11-27", fr: "Ven 27 nov", en: "Fri Nov 27" },
  { iso: "2026-11-30", fr: "Lun 30 nov", en: "Mon Nov 30" },
  { iso: "2026-12-01", fr: "Mar 1 déc", en: "Tue Dec 1" },
];

const MORNING_SLOTS = ["08:00", "09:00", "10:30", "11:30"];
const AFTERNOON_SLOTS = ["13:30", "14:30"];

export function BookingWizard() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();

  const [step, setStep] = useState(1);
  const [beneficiary, setBeneficiary] = useState<"self" | "relative">("self");
  const [departmentSlug, setDepartmentSlug] = useState(DEPARTMENTS[0].slug);
  const [deptQuery, setDeptQuery] = useState("");
  const [serviceSlug, setServiceSlug] = useState(SERVICES[0].slug);
  const [tariffType, setTariffType] = useState<"gp" | "perso" | "prof">("gp");
  const [doctorId, setDoctorId] = useState<string>("any");
  const [selectedDate, setSelectedDate] = useState<string>("2026-11-26");
  const [selectedTime, setSelectedTime] = useState<string>("09:00");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [paymentMode, setPaymentMode] = useState<"mobile" | "onsite" | "insurance">("mobile");
  const [bookingRef, setBookingRef] = useState("HL-2026-9584");
  const [copied, setCopied] = useState(false);

  // Support deep linking via ?service=..., ?medecin=..., or ?dept=...
  useEffect(() => {
    const svcParam = searchParams.get("service");
    const docParam = searchParams.get("medecin");
    const deptParam = searchParams.get("dept");

    if (svcParam) {
      const found = SERVICES.find((s) => s.slug === svcParam);
      if (found) {
        setDepartmentSlug(found.departmentSlug);
        setServiceSlug(found.slug);
        setStep(3);
      }
    } else if (docParam) {
      const doc = DOCTORS.find((d) => d.id === docParam);
      if (doc) {
        setDepartmentSlug(doc.departmentSlug);
        const deptSvc = SERVICES.find((s) => s.departmentSlug === doc.departmentSlug);
        if (deptSvc) setServiceSlug(deptSvc.slug);
        setDoctorId(doc.id);
        setTariffType("perso");
        setStep(5);
      }
    } else if (deptParam) {
      const dept = DEPARTMENTS.find((d) => d.slug === deptParam);
      if (dept) {
        setDepartmentSlug(dept.slug);
        const firstSvc = SERVICES.find((s) => s.departmentSlug === dept.slug);
        if (firstSvc) setServiceSlug(firstSvc.slug);
        setStep(3);
      }
    }
  }, [searchParams]);

  const filteredDepartments = useMemo(() => {
    const q = deptQuery.trim().toLowerCase();
    if (!q) return DEPARTMENTS;
    return DEPARTMENTS.filter(
      (d) =>
        d.name.fr.toLowerCase().includes(q) ||
        d.name.en.toLowerCase().includes(q) ||
        d.building.fr.toLowerCase().includes(q) ||
        d.summary.fr.toLowerCase().includes(q)
    );
  }, [deptQuery]);

  const deptServices = useMemo(() => {
    const matches = SERVICES.filter((s) => s.departmentSlug === departmentSlug);
    return matches.length > 0 ? matches : SERVICES;
  }, [departmentSlug]);

  const deptDoctors = useMemo(() => {
    const matches = DOCTORS.filter((d) => d.departmentSlug === departmentSlug);
    return matches.length > 0 ? matches : DOCTORS.slice(0, 6);
  }, [departmentSlug]);

  const selectedDept = DEPARTMENTS.find((d) => d.slug === departmentSlug) ?? DEPARTMENTS[0];
  const selectedService = SERVICES.find((s) => s.slug === serviceSlug) ?? deptServices[0];
  const selectedDoctor = DOCTORS.find((d) => d.id === doctorId);

  const feeAmount =
    tariffType === "gp" ? "4 000 FCFA" : tariffType === "perso" ? "15 000 FCFA" : "20 000 FCFA";

  const confirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    setBookingRef(`HL-2026-${randomCode}`);
    setStep(8);
  };

  const handleCopyRef = async () => {
    try {
      await navigator.clipboard.writeText(bookingRef);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const progressPercent = Math.round((step / 8) * 100);

  return (
    <>
      <PageHero
        className="no-print"
        breadcrumbs={[
          { label: t({ fr: "Accueil", en: "Home" }), href: "/" },
          { label: t({ fr: "Prendre rendez-vous", en: "Book Appointment" }) },
        ]}
        eyebrow={t({
          fr: "Réservation rapide · Sans création de compte",
          en: "Fast Booking · No Account Required",
        })}
        eyebrowTone="cobalt"
        title={t({ fr: "Prendre rendez-vous", en: "Book an appointment" })}
        description={t({
          fr: "Choisissez votre spécialité, votre formule de consultation et votre créneau horaire. Réglez en ligne ou à l'accueil et obtenez votre laissez-passer QR code.",
          en: "Select your department, consultation tier, and preferred slot. Pay online or on arrival and receive your QR confirmation pass.",
        })}
        actions={
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-emerald-800">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              {t({ fr: "Paiement sécurisé", en: "Secure checkout" })}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0A66C2]/20 bg-[#E8F2FC] px-3.5 py-1.5 text-[#0A66C2]">
              <QrCode className="h-4 w-4" aria-hidden="true" />
              {t({ fr: "Reçu avec QR code", en: "QR code pass" })}
            </span>
          </div>
        }
      />

      <div className="relative overflow-x-clip">
        <MedicalBackdrop variant="clinical" />
        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* 8-Step Horizontal Progress Stepper */}
        <nav
          aria-label={t({ fr: "Progression de la réservation", en: "Booking progress" })}
          className="no-print no-scrollbar flex items-center gap-2 overflow-x-auto pb-2"
        >
          {STEP_LABELS.map((s) => {
            const isCurrent = s.num === step;
            const isCompleted = s.num < step;
            return (
              <button
                key={s.num}
                type="button"
                disabled={s.num > step && step !== 8}
                onClick={() => {
                  if (s.num <= step) setStep(s.num);
                }}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-bold transition-all ${
                  isCurrent
                    ? "border-[#0A66C2] bg-[#08162B] text-white shadow-md"
                    : isCompleted
                      ? "border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                      : "border-[#08162B]/10 bg-white text-[#475569] opacity-60"
                }`}
              >
                <span className="font-mono">{s.num}</span>
                <span>{t({ fr: s.fr, en: s.en })}</span>
              </button>
            );
          })}
        </nav>

        {/* Main Content + Sticky Summary Sidebar */}
        <div className="mt-7 grid items-start gap-8 lg:grid-cols-12">
          <div className="min-w-0 rounded-3xl border border-white bg-white p-5 shadow-premium sm:p-9 lg:col-span-8">
            {/* STEP 1: Pour qui */}
            {step === 1 ? (
              <div>
                <p className="font-mono text-xs font-bold text-[#0A66C2]">
                  {t({ fr: "Étape 1 sur 8", en: "Step 1 of 8" })}
                </p>
                <h2 className="mt-2 text-2xl font-extrabold text-[#08162B]">
                  {t({ fr: "Pour qui est ce rendez-vous ?", en: "Who is this appointment for?" })}
                </h2>
                <p className="mt-1 text-sm text-[#475569]">
                  {t({
                    fr: "Vous pouvez réserver pour vous-même ou pour un proche (enfant, parent).",
                    en: "You may book for yourself or on behalf of a relative.",
                  })}
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <button
                    type="button"
                    aria-pressed={beneficiary === "self"}
                    onClick={() => setBeneficiary("self")}
                    className={`flex flex-col items-start rounded-2xl border-2 p-5 text-left transition-all ${
                      beneficiary === "self"
                        ? "border-[#0A66C2] bg-[#E8F2FC]/45"
                        : "border-[#071A33]/10 bg-[#F2F7FC] hover:border-[#0A66C2]/40"
                    }`}
                  >
                    <User className="h-7 w-7 text-[#0A66C2]" aria-hidden="true" />
                    <span className="mt-4 text-base font-bold text-[#071A33]">
                      {t({ fr: "Pour moi", en: "For myself" })}
                    </span>
                    <span className="mt-1 text-xs text-[#475569]">
                      {t({
                        fr: "Je suis le patient et je prends rendez-vous pour moi-même.",
                        en: "I am the patient booking for myself.",
                      })}
                    </span>
                  </button>

                  <button
                    type="button"
                    aria-pressed={beneficiary === "relative"}
                    onClick={() => setBeneficiary("relative")}
                    className={`flex flex-col items-start rounded-2xl border-2 p-5 text-left transition-all ${
                      beneficiary === "relative"
                        ? "border-[#0A66C2] bg-[#E8F2FC]/45"
                        : "border-[#071A33]/10 bg-[#F2F7FC] hover:border-[#0A66C2]/40"
                    }`}
                  >
                    <Users className="h-7 w-7 text-[#0D9488]" aria-hidden="true" />
                    <span className="mt-4 text-base font-bold text-[#071A33]">
                      {t({ fr: "Pour un proche", en: "For a relative" })}
                    </span>
                    <span className="mt-1 text-xs text-[#475569]">
                      {t({
                        fr: "Je réserve pour un membre de ma famille ou un accompagnant.",
                        en: "I am booking for a family member or dependent.",
                      })}
                    </span>
                  </button>
                </div>

                {/* Privacy Link directly on Step 1 */}
                <div className="mt-6 flex items-start gap-2.5 rounded-2xl border border-[#071A33]/10 bg-[#F2F7FC] p-4 text-xs text-[#475569]">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#0A66C2]" aria-hidden="true" />
                  <span>
                    {t({
                      fr: "Aucune création de compte requise. Consultez notre ",
                      en: "No account required. Read our ",
                    })}
                    <Link href="/confidentialite" className="font-bold text-[#0A66C2] underline">
                      {t({
                        fr: "Politique de confidentialité et protection des données",
                        en: "Privacy & Data Protection Policy",
                      })}
                    </Link>
                    .
                  </span>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-2 rounded-full bg-[#0A66C2] px-6 py-3 text-sm font-semibold text-white hover:bg-[#08162B]"
                  >
                    {t({ fr: "Continuer", en: "Continue" })}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ) : null}

            {/* STEP 2: Spécialité / Département with inline filter */}
            {step === 2 ? (
              <div>
                <p className="font-mono text-xs font-bold text-[#0A66C2]">
                  {t({ fr: "Étape 2 sur 8", en: "Step 2 of 8" })}
                </p>
                <div className="mt-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <h2 className="text-2xl font-extrabold text-[#08162B]">
                    {t({ fr: "Choisissez le département", en: "Select the department" })}
                  </h2>
                  <div className="relative w-full sm:w-64">
                    <label htmlFor="wizard-dept-search" className="sr-only">
                      {t({ fr: "Filtrer les départements", en: "Filter departments" })}
                    </label>
                    <Search
                      className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#475569]"
                      aria-hidden="true"
                    />
                    <input
                      id="wizard-dept-search"
                      type="search"
                      value={deptQuery}
                      onChange={(e) => setDeptQuery(e.target.value)}
                      placeholder={t({ fr: "Filtrer un pôle...", en: "Filter department..." })}
                      className="w-full rounded-full border border-[#071A33]/15 bg-[#F2F7FC] py-2 pl-9 pr-3 text-xs text-[#071A33] focus:border-[#0A66C2] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {filteredDepartments.map((dept) => {
                    const active = dept.slug === departmentSlug;
                    return (
                      <button
                        key={dept.slug}
                        type="button"
                        onClick={() => {
                          setDepartmentSlug(dept.slug);
                          const firstSvc = SERVICES.find((s) => s.departmentSlug === dept.slug);
                          if (firstSvc) setServiceSlug(firstSvc.slug);
                        }}
                        className={`flex items-start gap-3 rounded-2xl border-2 p-4 text-left transition-all ${
                          active
                            ? "border-[#0A66C2] bg-[#E8F2FC]/40"
                            : "border-[#071A33]/10 bg-[#F2F7FC] hover:border-[#0A66C2]/30"
                        }`}
                      >
                        <span
                          className="mt-1 h-3 w-3 shrink-0 rounded-full"
                          style={{ backgroundColor: dept.accentColor }}
                          aria-hidden="true"
                        />
                        <div>
                          <p className="text-sm font-bold text-[#08162B]">{t(dept.name)}</p>
                          <p className="mt-0.5 text-xs text-[#475569]">{t(dept.building)}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#475569] hover:text-[#08162B]"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    {t({ fr: "Retour", en: "Back" })}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="inline-flex items-center gap-2 rounded-full bg-[#0A66C2] px-6 py-3 text-sm font-semibold text-white hover:bg-[#08162B]"
                  >
                    {t({ fr: "Continuer", en: "Continue" })}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ) : null}

            {/* STEP 3: Service & Type de prestation */}
            {step === 3 ? (
              <div>
                <p className="font-mono text-xs font-bold text-[#0A66C2]">
                  {t({ fr: "Étape 3 sur 8", en: "Step 3 of 8" })}
                </p>
                <h2 className="mt-2 text-2xl font-extrabold text-[#08162B]">
                  {t({ fr: "Service et type de consultation", en: "Service & consultation tier" })}
                </h2>

                <div className="mt-5 space-y-2.5">
                  {deptServices.map((svc) => (
                    <button
                      key={svc.slug}
                      type="button"
                      onClick={() => setServiceSlug(svc.slug)}
                      className={`w-full rounded-2xl border-2 p-4 text-left transition-all ${
                        serviceSlug === svc.slug
                          ? "border-[#0A66C2] bg-[#E8F2FC]/40"
                          : "border-[#071A33]/10 bg-[#F2F7FC]"
                      }`}
                    >
                      <p className="text-sm font-bold text-[#08162B]">{t(svc.name)}</p>
                      <p className="mt-1 text-xs text-[#475569]">{t(svc.description)}</p>
                    </button>
                  ))}
                </div>

                <h3 className="mt-7 text-sm font-bold uppercase tracking-wider text-[#08162B]">
                  {t({ fr: "Formule de consultation", en: "Consultation tier" })}
                </h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {[
                    {
                      id: "gp" as const,
                      title: { fr: "Grand public (Dr)", en: "Standard (MD)" },
                      price: "4 000 FCFA",
                      note: {
                        fr: "1er praticien disponible · tarif public",
                        en: "First available doctor · public rate",
                      },
                    },
                    {
                      id: "perso" as const,
                      title: { fr: "Personnalisée (Dr)", en: "Personalized (MD)" },
                      price: "15 000 FCFA",
                      note: {
                        fr: "Choix du spécialiste & créneau dédié",
                        en: "Choice of specialist & dedicated slot",
                      },
                    },
                    {
                      id: "prof" as const,
                      title: { fr: "Personnalisée (Pr)", en: "Personalized (Prof)" },
                      price: "20 000 FCFA",
                      note: {
                        fr: "Consultation Professeur agrégé",
                        en: "Senior university professor visit",
                      },
                    },
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setTariffType(tier.id)}
                      className={`rounded-2xl border-2 p-4 text-left transition-all ${
                        tariffType === tier.id
                          ? "border-[#0A66C2] bg-[#E8F2FC]/40"
                          : "border-[#071A33]/10 bg-[#F2F7FC]"
                      }`}
                    >
                      <p className="text-xs font-bold text-[#08162B]">{t(tier.title)}</p>
                      <p className="mt-1 font-mono text-base font-extrabold text-[#0A66C2]">
                        {tier.price}
                      </p>
                      <p className="mt-1.5 text-[11px] leading-snug text-[#475569]">
                        {t(tier.note)}
                      </p>
                    </button>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#475569]"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    {t({ fr: "Retour", en: "Back" })}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="inline-flex items-center gap-2 rounded-full bg-[#0A66C2] px-6 py-3 text-sm font-semibold text-white hover:bg-[#08162B]"
                  >
                    {t({ fr: "Continuer", en: "Continue" })}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ) : null}

            {/* STEP 4: Médecin */}
            {step === 4 ? (
              <div>
                <p className="font-mono text-xs font-bold text-[#0A66C2]">
                  {t({ fr: "Étape 4 sur 8", en: "Step 4 of 8" })}
                </p>
                <h2 className="mt-2 text-2xl font-extrabold text-[#08162B]">
                  {t({ fr: "Choisissez un praticien", en: "Select a physician" })}
                </h2>

                <div className="mt-5 space-y-3">
                  <button
                    type="button"
                    onClick={() => setDoctorId("any")}
                    className={`w-full rounded-2xl border-2 p-4 text-left ${
                      doctorId === "any"
                        ? "border-[#0A66C2] bg-[#E8F2FC]/40"
                        : "border-[#071A33]/10 bg-[#F2F7FC]"
                    }`}
                  >
                    <p className="text-sm font-bold text-[#071A33]">
                      {t({
                        fr: "Premier praticien disponible dans le service",
                        en: "First available physician in department",
                      })}
                    </p>
                    <p className="mt-0.5 text-xs text-[#475569]">
                      {t({ fr: "Délai optimal garanti", en: "Fastest available slot" })}
                    </p>
                  </button>

                  {deptDoctors.map((doc) => (
                    <button
                      key={doc.id}
                      type="button"
                      onClick={() => setDoctorId(doc.id)}
                      className={`flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left ${
                        doctorId === doc.id
                          ? "border-[#0A66C2] bg-[#E8F2FC]/40"
                          : "border-[#071A33]/10 bg-[#F2F7FC]"
                      }`}
                    >
                      <PractitionerPortraitFrame src={doc.photo} name={doc.name} size="sm" />
                      <div>
                        <p className="text-sm font-bold text-[#08162B]">{doc.name}</p>
                        <p className="text-xs text-[#475569]">
                          {t(doc.specialty)} · {t(doc.schedule)}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#475569]"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    {t({ fr: "Retour", en: "Back" })}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(5)}
                    className="inline-flex items-center gap-2 rounded-full bg-[#0A66C2] px-6 py-3 text-sm font-semibold text-white hover:bg-[#08162B]"
                  >
                    {t({ fr: "Continuer", en: "Continue" })}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ) : null}

            {/* STEP 5: Date & Heure with Quick Date Chips + Matin / Après-midi */}
            {step === 5 ? (
              <div>
                <p className="font-mono text-xs font-bold text-[#0A66C2]">
                  {t({ fr: "Étape 5 sur 8", en: "Step 5 of 8" })}
                </p>
                <h2 className="mt-2 text-2xl font-extrabold text-[#08162B]">
                  {t({ fr: "Date et créneau horaire", en: "Preferred date and time slot" })}
                </h2>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-[#08162B]">
                      {t({ fr: "Prochaines dates disponibles", en: "Next available dates" })}
                    </span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {QUICK_DATES.map((d) => {
                        const active = selectedDate === d.iso;
                        return (
                          <button
                            key={d.iso}
                            type="button"
                            onClick={() => setSelectedDate(d.iso)}
                            className={`rounded-xl border px-3 py-2 text-xs font-bold transition-all ${
                              active
                                ? "border-[#0A66C2] bg-[#071A33] text-white"
                                : "border-[#071A33]/15 bg-[#F2F7FC] text-[#071A33] hover:border-[#0A66C2]"
                            }`}
                          >
                            {t({ fr: d.fr, en: d.en })}
                          </button>
                        );
                      })}
                    </div>

                    <label
                      htmlFor="booking-date"
                      className="mt-4 block text-xs font-bold uppercase tracking-wider text-[#071A33]"
                    >
                      {t({ fr: "Ou choisir une autre date", en: "Or pick a custom date" })}
                    </label>
                    <input
                      id="booking-date"
                      type="date"
                      value={selectedDate}
                      min="2026-11-24"
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-[#071A33]/20 bg-[#F2F7FC] px-4 py-3 font-mono text-sm text-[#071A33]"
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-wider text-[#071A33]">
                        {t({ fr: "Matin", en: "Morning" })}
                      </span>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        {MORNING_SLOTS.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTime(slot)}
                            className={`rounded-xl border py-2.5 font-mono text-xs font-bold transition-colors ${
                              selectedTime === slot
                                ? "border-[#0A66C2] bg-[#0A66C2] text-white"
                                : "border-[#071A33]/15 bg-[#F2F7FC] text-[#071A33] hover:border-[#0A66C2]"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="block text-xs font-bold uppercase tracking-wider text-[#071A33]">
                        {t({ fr: "Après-midi", en: "Afternoon" })}
                      </span>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        {AFTERNOON_SLOTS.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTime(slot)}
                            className={`rounded-xl border py-2.5 font-mono text-xs font-bold transition-colors ${
                              selectedTime === slot
                                ? "border-[#0A66C2] bg-[#0A66C2] text-white"
                                : "border-[#071A33]/15 bg-[#F2F7FC] text-[#071A33] hover:border-[#0A66C2]"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#475569]"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    {t({ fr: "Retour", en: "Back" })}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(6)}
                    className="inline-flex items-center gap-2 rounded-full bg-[#0A66C2] px-6 py-3 text-sm font-semibold text-white hover:bg-[#08162B]"
                  >
                    {t({ fr: "Continuer", en: "Continue" })}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ) : null}

            {/* STEP 6: Patient info */}
            {step === 6 ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep(7);
                }}
              >
                <p className="font-mono text-xs font-bold text-[#0A66C2]">
                  {t({ fr: "Étape 6 sur 8", en: "Step 6 of 8" })}
                </p>
                <h2 className="mt-2 text-2xl font-extrabold text-[#08162B]">
                  {t({ fr: "Identité du patient", en: "Patient details" })}
                </h2>

                <div className="mt-6 space-y-4">
                  <div>
                    <label
                      htmlFor="patient-fullname"
                      className="block text-xs font-bold uppercase tracking-wider text-[#08162B]"
                    >
                      {t({ fr: "Nom et prénoms du patient *", en: "Patient full name *" })}
                    </label>
                    <input
                      id="patient-fullname"
                      type="text"
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="Ex : Aline Ngo Biyong"
                      className="mt-1.5 w-full rounded-xl border border-[#071A33]/20 bg-[#F2F7FC] px-4 py-3 text-sm"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="patient-phone"
                        className="block text-xs font-bold uppercase tracking-wider text-[#071A33]"
                      >
                        {t({ fr: "Téléphone *", en: "Phone number *" })}
                      </label>
                      <input
                        id="patient-phone"
                        type="tel"
                        required
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        placeholder="+237 6XX XX XX XX"
                        className="mt-1.5 w-full rounded-xl border border-[#071A33]/20 bg-[#F2F7FC] px-4 py-3 font-mono text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="patient-email"
                        className="block text-xs font-bold uppercase tracking-wider text-[#071A33]"
                      >
                        {t({ fr: "Adresse e-mail", en: "Email address" })}
                      </label>
                      <input
                        id="patient-email"
                        type="email"
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                        placeholder="patient@exemple.cm"
                        className="mt-1.5 w-full rounded-xl border border-[#071A33]/20 bg-[#F2F7FC] px-4 py-3 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(5)}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#475569]"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    {t({ fr: "Retour", en: "Back" })}
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-[#0A66C2] px-6 py-3 text-sm font-semibold text-white hover:bg-[#08162B]"
                  >
                    {t({ fr: "Vérifier le récapitulatif", en: "Review summary" })}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </form>
            ) : null}

            {/* STEP 7: Récapitulatif & Paiement */}
            {step === 7 ? (
              <form onSubmit={confirmBooking}>
                <p className="font-mono text-xs font-bold text-[#0A66C2]">
                  {t({ fr: "Étape 7 sur 8", en: "Step 7 of 8" })}
                </p>
                <h2 className="mt-2 text-2xl font-extrabold text-[#08162B]">
                  {t({
                    fr: "Récapitulatif et mode de règlement",
                    en: "Summary & payment method",
                  })}
                </h2>

                <dl className="mt-5 space-y-3 rounded-2xl border border-[#071A33]/10 bg-[#F2F7FC] p-5 text-sm">
                  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
                    <dt className="text-[#475569]">{t({ fr: "Patient", en: "Patient" })}</dt>
                    <dd className="break-words font-bold text-[#08162B]">
                      {patientName || t({ fr: "Patient invité", en: "Guest patient" })}
                    </dd>
                  </div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
                    <dt className="text-[#475569]">{t({ fr: "Service", en: "Service" })}</dt>
                    <dd className="break-words font-bold text-[#08162B]">{t(selectedService.name)}</dd>
                  </div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
                    <dt className="text-[#475569]">{t({ fr: "Date & Heure", en: "Date & Time" })}</dt>
                    <dd className="font-mono font-bold text-[#08162B]">
                      {selectedDate} · {selectedTime}
                    </dd>
                  </div>
                  <div className="flex flex-col gap-1 border-t border-[#08162B]/10 pt-3 sm:flex-row sm:justify-between sm:gap-4">
                    <dt className="font-bold text-[#08162B]">
                      {t({ fr: "Montant consultation", en: "Consultation fee" })}
                    </dt>
                    <dd className="font-mono text-base font-extrabold text-[#0A66C2]">
                      {feeAmount}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    {
                      id: "mobile" as const,
                      label: { fr: "Mobile Money (OM / MoMo)", en: "Mobile Money" },
                    },
                    {
                      id: "onsite" as const,
                      label: { fr: "Régler à l'accueil", en: "Pay at hospital desk" },
                    },
                    {
                      id: "insurance" as const,
                      label: { fr: "Prise en charge assurance", en: "Insurance coverage" },
                    },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setPaymentMode(mode.id)}
                      className={`rounded-2xl border-2 p-4 text-left text-xs font-bold ${
                        paymentMode === mode.id
                          ? "border-[#0A66C2] bg-[#E8F2FC]/40 text-[#08162B]"
                          : "border-[#08162B]/10 bg-white text-[#475569]"
                      }`}
                    >
                      <CreditCard className="mb-2 h-4 w-4 text-[#0A66C2]" aria-hidden="true" />
                      {t(mode.label)}
                    </button>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(6)}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#475569]"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    {t({ fr: "Modifier", en: "Edit" })}
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-[#0D7A5F] px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-[#08162B] sm:px-7"
                  >
                    {t({ fr: "Confirmer le rendez-vous", en: "Confirm appointment" })}
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </form>
            ) : null}

            {/* STEP 8: Official Printable Digital Appointment Pass */}
            {step === 8 ? (
              <div className="py-4 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
                </div>
                <h2 className="mt-4 text-2xl font-extrabold text-[#08162B]">
                  {t({
                    fr: "Laissez-passer de rendez-vous confirmé",
                    en: "Official appointment pass confirmed",
                  })}
                </h2>

                <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                  <span className="font-mono text-sm font-bold text-[#0A66C2]">
                    {t({ fr: "Référence :", en: "Reference:" })} {bookingRef}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyRef}
                    className="no-print inline-flex items-center gap-1 rounded-full border border-[#071A33]/15 bg-[#F2F7FC] px-3 py-1 text-[11px] font-bold text-[#071A33] hover:border-[#0A66C2]"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#0D7A5F]" aria-hidden="true" />
                        <span>{t({ fr: "Copié", en: "Copied" })}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{t({ fr: "Copier", en: "Copy" })}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Printable Digital Pass Card */}
                <div className="mx-auto mt-6 max-w-lg overflow-hidden rounded-3xl border border-[#071A33]/15 bg-[#F2F7FC] text-left shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2 bg-[#071A33] px-5 py-3.5 text-white sm:px-6">
                    <div>
                      <p className="text-xs font-bold tracking-wide text-[#38BDF8]">
                        HÔPITAL LAQUINTINIE DE DOUALA
                      </p>
                      <p className="text-[11px] text-slate-300">
                        {t({ fr: "Pass consultation numérique", en: "Digital consultation pass" })}
                      </p>
                    </div>
                    <span className="font-mono text-xs font-bold">{bookingRef}</span>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold uppercase text-[#475569]">
                          {t(selectedDept.name)}
                        </p>
                        <p className="mt-1 break-words text-base font-extrabold text-[#071A33]">
                          {t(selectedService.name)}
                        </p>
                        <p className="mt-1 font-mono text-xs font-bold text-[#0A66C2]">
                          {selectedDate} · {selectedTime}
                        </p>
                        <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-[#475569]">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-[#0D9488]" aria-hidden="true" />
                          <span>{t(selectedService.location)}</span>
                        </p>
                      </div>
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-[#08162B]/15 bg-white text-[#08162B]">
                        <QrCode className="h-12 w-12" aria-hidden="true" />
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-3 border-t border-[#08162B]/10 pt-4 text-xs sm:grid-cols-2">
                      <div>
                        <span className="text-[#475569]">{t({ fr: "Patient", en: "Patient" })}</span>
                        <p className="font-bold text-[#08162B]">
                          {patientName || t({ fr: "Patient invité", en: "Guest patient" })}
                        </p>
                      </div>
                      <div>
                        <span className="text-[#475569]">{t({ fr: "Tarif", en: "Fee" })}</span>
                        <p className="font-mono font-bold text-[#08162B]">{feeAmount}</p>
                      </div>
                    </div>

                    <p className="mt-4 rounded-2xl bg-white p-3.5 text-xs leading-relaxed text-[#475569]">
                      {t({
                        fr: "Présentez cette référence à l'accueil (Hall Central) 15 minutes avant l'heure prévue, muni(e) de votre CNI, de votre carnet médical et de votre carte d'assurance le cas échéant.",
                        en: "Present this reference at the Central Lobby 15 minutes prior with your ID, medical booklet, and insurance card if applicable.",
                      })}
                    </p>
                  </div>
                </div>

                <div className="no-print mt-7 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 rounded-full border border-[#08162B]/20 bg-white px-5 py-2.5 text-xs font-bold text-[#08162B] hover:border-[#0A66C2]"
                  >
                    <Printer className="h-3.5 w-3.5" aria-hidden="true" />
                    {t({ fr: "Imprimer le pass", en: "Print pass" })}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="rounded-full border border-[#08162B]/20 px-5 py-2.5 text-xs font-bold text-[#08162B]"
                  >
                    {t({ fr: "Nouvelle réservation", en: "New booking" })}
                  </button>
                  <Link
                    href="/"
                    className="rounded-full bg-[#08162B] px-5 py-2.5 text-xs font-bold text-white"
                  >
                    {t({ fr: "Retour à l'accueil", en: "Back to home" })}
                  </Link>
                </div>
              </div>
            ) : null}
          </div>

          {/* Sticky Sidebar Summary + Progress Bar + 24/7 Emergency Callout */}
          <aside className="no-print min-w-0 space-y-5 lg:sticky lg:top-28 lg:col-span-4">
            <div className="rounded-3xl border border-[#08162B]/10 bg-white p-6 shadow-premium">
              <div className="flex items-center justify-between gap-2">
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#08162B]">
                  <Calendar className="h-4 w-4 text-[#0A66C2]" aria-hidden="true" />
                  {t({ fr: "Votre sélection", en: "Your selection" })}
                </h3>
                <span className="font-mono text-xs font-bold text-[#0A66C2]">
                  {t({ fr: `Étape ${step}/8`, en: `Step ${step}/8` })}
                </span>
              </div>

              {/* Visual Progress Bar */}
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[#08162B]/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#0A66C2] to-[#0D7A5F] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <dl className="mt-5 space-y-3 text-xs">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <dt className="text-[#475569]">{t({ fr: "Département", en: "Department" })}</dt>
                    <dd className="mt-0.5 font-bold text-[#08162B]">{t(selectedDept.name)}</dd>
                  </div>
                  {step > 2 && step < 8 ? (
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="shrink-0 font-bold text-[#0A66C2] hover:underline"
                    >
                      {t({ fr: "Modifier", en: "Edit" })}
                    </button>
                  ) : null}
                </div>

                <div className="flex items-start justify-between gap-2">
                  <div>
                    <dt className="text-[#475569]">{t({ fr: "Service", en: "Service" })}</dt>
                    <dd className="mt-0.5 font-bold text-[#08162B]">{t(selectedService.name)}</dd>
                  </div>
                  {step > 3 && step < 8 ? (
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="shrink-0 font-bold text-[#0A66C2] hover:underline"
                    >
                      {t({ fr: "Modifier", en: "Edit" })}
                    </button>
                  ) : null}
                </div>

                <div className="flex items-start justify-between gap-2">
                  <div>
                    <dt className="text-[#475569]">{t({ fr: "Praticien", en: "Physician" })}</dt>
                    <dd className="mt-0.5 font-bold text-[#08162B]">
                      {selectedDoctor
                        ? selectedDoctor.name
                        : t({ fr: "Premier disponible", en: "First available" })}
                    </dd>
                  </div>
                  {step > 4 && step < 8 ? (
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="shrink-0 font-bold text-[#0A66C2] hover:underline"
                    >
                      {t({ fr: "Modifier", en: "Edit" })}
                    </button>
                  ) : null}
                </div>

                <div className="flex items-start justify-between gap-2">
                  <div>
                    <dt className="text-[#475569]">{t({ fr: "Créneau", en: "Slot" })}</dt>
                    <dd className="mt-0.5 font-mono font-bold text-[#0A66C2]">
                      {selectedDate} · {selectedTime}
                    </dd>
                  </div>
                  {step > 5 && step < 8 ? (
                    <button
                      type="button"
                      onClick={() => setStep(5)}
                      className="shrink-0 font-bold text-[#0A66C2] hover:underline"
                    >
                      {t({ fr: "Modifier", en: "Edit" })}
                    </button>
                  ) : null}
                </div>

                <div className="border-t border-[#08162B]/10 pt-3">
                  <dt className="text-[#475569]">{t({ fr: "Tarif estimé", en: "Estimated fee" })}</dt>
                  <dd className="mt-0.5 font-mono text-lg font-extrabold text-[#08162B]">
                    {feeAmount}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-[#071A33] p-6 text-white shadow-xl">
              <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#ef4444]">
                <ShieldAlert className="h-4 w-4" aria-hidden="true" />
                {t({ fr: "Urgence médicale ?", en: "Medical emergency?" })}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-slate-300">
                {t({
                  fr: "Ne prenez pas rendez-vous en ligne pour une urgence vitale. Présentez-vous directement aux urgences 24h/24 ou appelez :",
                  en: "Do not book online for urgent emergencies. Walk straight into our 24/7 ER or call:",
                })}
              </p>
              <div className="mt-4 space-y-2">
                <a
                  href={`tel:${HOSPITAL_CONTACT.emergencyPhoneRaw}`}
                  className="flex items-center justify-between rounded-2xl bg-[#C81E1E] px-4 py-2.5 font-mono text-xs font-bold text-white"
                >
                  <span>Urgences : {HOSPITAL_CONTACT.emergencyPhone}</span>
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <a
                  href={`tel:${HOSPITAL_CONTACT.standardPhoneRaw}`}
                  className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/10 px-4 py-2.5 font-mono text-xs font-bold text-white"
                >
                  <span>Standard : {HOSPITAL_CONTACT.standardPhone}</span>
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </aside>
        </div>
        </div>
      </div>
    </>
  );
}
