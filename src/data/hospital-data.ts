export type Locale = "fr" | "en";

export interface LocalizedText {
  fr: string;
  en: string;
}

export interface HospitalContact {
  name: string;
  shortName: string;
  tagline: LocalizedText;
  address: string;
  poBox: string;
  city: string;
  region: string;
  country: LocalizedText;
  email: string;
  standardPhone: string;
  standardPhoneRaw: string;
  emergencyPhone: string;
  emergencyPhoneRaw: string;
  samuNumber: string;
  mapLink: string;
  mapEmbedUrl: string;
  social: {
    facebook: string;
    x: string;
    linkedin: string;
  };
}

export const HOSPITAL_CONTACT: HospitalContact = {
  name: "Hôpital Laquintinie de Douala",
  shortName: "Hôpital Laquintinie",
  tagline: {
    fr: "95 ans au service de chaque vie",
    en: "95 years serving every life",
  },
  address: "Ngodi Akwa 2, Rue Dika Mpondo",
  poBox: "BP 4053",
  city: "Douala",
  region: "Région du Littoral",
  country: { fr: "Cameroun", en: "Cameroon" },
  email: "contact@hopitallaquintinie.cm",
  standardPhone: "+237 659 28 52 53",
  standardPhoneRaw: "+237659285253",
  emergencyPhone: "+237 233 42 68 68",
  emergencyPhoneRaw: "+237233426868",
  samuNumber: "119",
  mapLink: "https://www.google.com/maps/dir/?api=1&destination=H%C3%B4pital+Laquintinie+Douala",
  mapEmbedUrl: "https://www.google.com/maps?q=H%C3%B4pital+Laquintinie+Douala&output=embed",
  social: {
    facebook: "https://www.facebook.com/LaquintinieCMR",
    x: "https://x.com/LaquintinieCMR",
    linkedin: "https://www.linkedin.com/company/laquintiniecmr/",
  },
};

/**
 * Reconciled institutional statistics — consistent across Homepage, /a-propos, /medecins, /departements.
 * Exact arithmetic:
 * - Doctors: 123 specialists + 40 university faculty + 44 general practitioners = 207 doctors
 * - Total staff: 207 doctors + 1,145 medico-sanitary staff + 298 support staff = 1,650 staff members
 */
export interface HospitalKPI {
  id: string;
  value: number;
  displayValue: string;
  suffix?: string;
  label: LocalizedText;
  sublabel: LocalizedText;
}

export const HOSPITAL_KPIS: HospitalKPI[] = [
  {
    id: "history",
    value: 95,
    displayValue: "95",
    label: { fr: "ans d’histoire", en: "years of history" },
    sublabel: { fr: "1931 – 2026 au cœur de Douala", en: "1931 – 2026 in the heart of Douala" },
  },
  {
    id: "area",
    value: 9,
    displayValue: "9",
    suffix: " ha",
    label: { fr: "hectares de campus", en: "hectares campus" },
    sublabel: { fr: "Pavillons historiques & contemporains", en: "Historic & modern pavilions" },
  },
  {
    id: "beds",
    value: 600,
    displayValue: "600",
    label: { fr: "lits d’hospitalisation", en: "hospital beds" },
    sublabel: { fr: "Chambres économiques, standards & VIP", en: "Standard, comfort & VIP rooms" },
  },
  {
    id: "staff",
    value: 1650,
    displayValue: "1 650",
    label: { fr: "membres du personnel", en: "staff members" },
    sublabel: {
      fr: "207 médecins, 1 145 soignants, 298 appuis",
      en: "207 physicians, 1,145 care staff, 298 support",
    },
  },
  {
    id: "doctors",
    value: 207,
    displayValue: "207",
    label: { fr: "médecins praticiens", en: "practicing physicians" },
    sublabel: {
      fr: "dont 123 spécialistes & 40 enseignants",
      en: "including 123 specialists & 40 faculty",
    },
  },
  {
    id: "consultations",
    value: 256824,
    displayValue: "256 824",
    label: { fr: "consultations / an", en: "annual consultations" },
    sublabel: { fr: "Données consolidées 2025", en: "2025 consolidated activity" },
  },
];

export interface Department {
  slug: string;
  code: string;
  accentColor: string;
  badgeBg: string;
  name: LocalizedText;
  shortName: LocalizedText;
  summary: LocalizedText;
  chief: string;
  building: LocalizedText;
  image: string;
  secondaryImage: string;
}

export const DEPARTMENTS: Department[] = [
  {
    slug: "gynecologie",
    code: "01",
    accentColor: "#B8477B",
    badgeBg: "bg-rose-50 text-rose-800 border-rose-200",
    name: { fr: "Gynécologie et Obstétrique", en: "Gynecology & Obstetrics" },
    shortName: { fr: "Gynécologie", en: "Gynecology" },
    summary: {
      fr: "Suivi de grossesse, maternité, chirurgie gynécologique, blocs opératoires dédiés et dépistage des cancers féminins.",
      en: "Pregnancy care, maternity, gynecological surgery, dedicated operating theaters, and women's cancer screening.",
    },
    chief: "Dr MOTAH née MINKOS YAB Thérèse",
    building: { fr: "Pavillon Maternité & Blocs Gynéco", en: "Maternity Pavilion & OR Suites" },
    image: "/images/gallery/maternite-1.webp",
    secondaryImage: "/images/gallery/gyneco-hosp-1.webp",
  },
  {
    slug: "biologie-clinique",
    code: "02",
    accentColor: "#0D7A5F",
    badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-200",
    name: { fr: "Biologie Clinique", en: "Clinical Biology & Laboratories" },
    shortName: { fr: "Biologie", en: "Biology" },
    summary: {
      fr: "Trois laboratoires biologiques accrédités aux normes ISO : analyses 24h/24, anatomo-pathologie, virologie et banque de sang.",
      en: "Three ISO-accredited biological laboratories: 24/7 diagnostics, histopathology, virology, and blood bank.",
    },
    chief: "Dr ATEBA Gilbert Roger",
    building: { fr: "Laboratoire Central & Banque de Sang", en: "Central Lab & Blood Bank" },
    image: "/images/campus/stethoscope.webp",
    secondaryImage: "/images/gallery/cardio-1.webp",
  },
  {
    slug: "pharmacie",
    code: "03",
    accentColor: "#0A66C2",
    badgeBg: "bg-sky-50 text-sky-800 border-sky-200",
    name: { fr: "Pharmacie Hospitalière", en: "Hospital Pharmacy" },
    shortName: { fr: "Pharmacie", en: "Pharmacy" },
    summary: {
      fr: "Dispensation sécurisée des médicaments essentiels, préparations hospitalières et permanence pharmaceutique 24h/24.",
      en: "Safe dispensing of essential medicines, hospital compounding, and 24/7 pharmaceutical availability.",
    },
    chief: "Dr HAMZA ABOUBAKAR",
    building: { fr: "Pharmacie Centrale · Ouverte 24h/24", en: "Central Pharmacy · Open 24/7" },
    image: "/images/campus/direction-building.webp",
    secondaryImage: "/images/campus/stethoscope.webp",
  },
  {
    slug: "imagerie-explorations",
    code: "04",
    accentColor: "#4F46E5",
    badgeBg: "bg-indigo-50 text-indigo-800 border-indigo-200",
    name: { fr: "Imagerie et Explorations", en: "Medical Imaging & Diagnostics" },
    shortName: { fr: "Imagerie", en: "Imaging" },
    summary: {
      fr: "Radiologie numérique, scanner, échographie Doppler, mammographie et explorations fonctionnelles de haute précision.",
      en: "Digital radiology, CT scan, Doppler ultrasound, mammography, and high-precision functional diagnostics.",
    },
    chief: "Dr NDAM IBRAHIMA AZIZ",
    building: { fr: "Centre d’Imagerie Médicale", en: "Medical Imaging Center" },
    image: "/images/gallery/cardio-2.webp",
    secondaryImage: "/images/gallery/cardio-1.webp",
  },
  {
    slug: "urgences-reanimation",
    code: "05",
    accentColor: "#C81E1E",
    badgeBg: "bg-red-50 text-red-800 border-red-200",
    name: { fr: "Urgences, Anesthésie & Réanimation", en: "Emergency, Anesthesia & ICU" },
    shortName: { fr: "Urgences & Réa", en: "Emergency & ICU" },
    summary: {
      fr: "Accueil vital sans rendez-vous 24h/24 et 7j/7, déchoquage, soins intensifs polyvalents et coordination SAMU.",
      en: "24/7 walk-in critical care, trauma stabilization, multidisciplinary ICU, and SAMU coordination.",
    },
    chief: "Dr NDOYE NDO Emmanuel",
    building: { fr: "Pavillon des Urgences · 24h/24", en: "Emergency Pavilion · 24/7" },
    image: "/images/campus/emergency-building.webp",
    secondaryImage: "/images/gallery/pediatrie-urgences-1.webp",
  },
  {
    slug: "medecine-interne",
    code: "06",
    accentColor: "#0F766E",
    badgeBg: "bg-teal-50 text-teal-800 border-teal-200",
    name: { fr: "Médecine Interne & Spécialités", en: "Internal Medicine & Specialties" },
    shortName: { fr: "Médecine Interne", en: "Internal Med" },
    summary: {
      fr: "Cardiologie, neurologie, néphrologie, endocrinologie-diabétologie, gastro-entérologie, rhumatologie, oncologie et hématologie.",
      en: "Cardiology, neurology, nephrology, endocrinology, gastroenterology, rheumatology, oncology, and hematology.",
    },
    chief: "Dr MONDOUAGNE ENGKOLO Paulin",
    building: { fr: "Pavillons Médecine A & B", en: "Internal Medicine Pavilions A & B" },
    image: "/images/gallery/cardio-1.webp",
    secondaryImage: "/images/campus/hero-hospital.webp",
  },
  {
    slug: "chirurgie-generale",
    code: "07",
    accentColor: "#08162B",
    badgeBg: "bg-slate-100 text-slate-900 border-slate-300",
    name: { fr: "Chirurgie Générale & Spécialisée", en: "General & Specialized Surgery" },
    shortName: { fr: "Chirurgie", en: "Surgery" },
    summary: {
      fr: "Chirurgie viscérale, traumatologie-orthopédie, urologie, neurochirurgie et blocs opératoires rénovés aux standards internationaux.",
      en: "Visceral surgery, trauma & orthopedics, urology, neurosurgery, and modernized international-grade operating suites.",
    },
    chief: "Dr NDAME KOUM Emmanuel",
    building: { fr: "Bâtiments A, B, C, D & Blocs Opératoires", en: "Buildings A–D & Surgical Suites" },
    image: "/images/gallery/chirurgie-bloc-1.webp",
    secondaryImage: "/images/gallery/chirurgie-batiments.webp",
  },
  {
    slug: "trois-o",
    code: "08",
    accentColor: "#B8892E",
    badgeBg: "bg-amber-50 text-amber-900 border-amber-200",
    name: {
      fr: "3 O (Odonto-Stomatologie, Ophtalmologie, ORL)",
      en: "3 O (Dental, Ophthalmology, ENT)",
    },
    shortName: { fr: "Pôle 3 O", en: "3 O Pole" },
    summary: {
      fr: "Prise en charge spécialisée de la vision, de l'audition, des voies aériennes supérieures et de la santé bucco-dentaire.",
      en: "Specialized care for eye health, hearing, upper airways, and oral & maxillofacial dentistry.",
    },
    chief: "Dr MBASSI NDOCKO KUNTZ",
    building: { fr: "Pavillon des Spécialités 3 O", en: "3 O Specialties Pavilion" },
    image: "/images/gallery/chirurgie-bloc-2.webp",
    secondaryImage: "/images/campus/pavillon-aerial.webp",
  },
  {
    slug: "pediatrie",
    code: "09",
    accentColor: "#0284C7",
    badgeBg: "bg-cyan-50 text-cyan-800 border-cyan-200",
    name: { fr: "Pédiatrie & Néonatologie", en: "Pediatrics & Neonatology" },
    shortName: { fr: "Pédiatrie", en: "Pediatrics" },
    summary: {
      fr: "Pédiatrie générale, urgences pédiatriques au Pavillon Samuel Eto'o Fils, réanimation néonatale et chirurgie pédiatrique.",
      en: "General pediatrics, pediatric emergencies at Samuel Eto'o Fils Pavilion, neonatal ICU, and pediatric surgery.",
    },
    chief: "Dr NGO NJOCK Vera",
    building: { fr: "Pavillon Samuel Eto’o Fils & Néonatologie", en: "Samuel Eto'o Fils Pavilion & NICU" },
    image: "/images/gallery/pediatrie-urgences-1.webp",
    secondaryImage: "/images/gallery/neonatologie-1.webp",
  },
  {
    slug: "soins-pluridisciplinaires",
    code: "10",
    accentColor: "#7C3AED",
    badgeBg: "bg-violet-50 text-violet-800 border-violet-200",
    name: {
      fr: "Soins & Services Pluridisciplinaires",
      en: "Multidisciplinary Care & Support",
    },
    shortName: { fr: "Pluridisciplinaire", en: "Multidisciplinary" },
    summary: {
      fr: "Médecine générale, santé mentale, médecine du travail, Maison du Patient 24h/24 et programmes de santé publique.",
      en: "General medicine, mental health, occupational medicine, 24/7 Patient House, and public health programs.",
    },
    chief: "Dr Nathalie NTAGO KEUMEUGNE",
    building: { fr: "Hall Central & Maison du Patient", en: "Central Hall & Patient House" },
    image: "/images/campus/pavillon-aerial.webp",
    secondaryImage: "/images/gallery/maternite-2.webp",
  },
];

export interface ServiceExam {
  name: LocalizedText;
  price: string;
  duration: string;
}

export interface ServiceItem {
  slug: string;
  departmentSlug: string;
  name: LocalizedText;
  description: LocalizedText;
  longDescription: LocalizedText;
  headDoctor: string;
  headDoctorId: string;
  majorName: string;
  doctorCount: number;
  hours: LocalizedText;
  location: LocalizedText;
  image: string;
  exams: ServiceExam[];
  faqs: { q: LocalizedText; a: LocalizedText }[];
  relatedTipSlug: string;
}

export const SERVICES: ServiceItem[] = [
  {
    slug: "blocs-operatoires-gynecologie",
    departmentSlug: "gynecologie",
    name: { fr: "Blocs Opératoires (Gynécologie)", en: "Gynecological Operating Suites" },
    description: {
      fr: "Salles d'opération dédiées aux césariennes d'urgence ou programmées et aux interventions gynécologiques.",
      en: "Dedicated operating rooms for scheduled or emergency cesarean sections and gynecological procedures.",
    },
    longDescription: {
      fr: "Dotées d'équipements d'anesthésie et de surveillance chirurgicale modernes, nos salles opératoires assurent la sécurité de la mère et de l'enfant 24h/24 en lien direct avec la maternité et la réanimation.",
      en: "Equipped with modern anesthesia and surgical monitoring systems, our operating suites ensure maternal and newborn safety 24/7 in coordination with maternity and ICU teams.",
    },
    headDoctor: "Dr MAAH MI-BAKAI Serge Antoine",
    headDoctorId: "dr-maah",
    majorName: "Mme Merline MOUTONGO",
    doctorCount: 4,
    hours: { fr: "Urgences chirurgicales 24h/24 · Programmées Lun–Ven", en: "24/7 Emergency Surgery · Scheduled Mon–Fri" },
    location: { fr: "Pavillon Maternité — Niveau 1", en: "Maternity Pavilion — Level 1" },
    image: "/images/gallery/chirurgie-bloc-1.webp",
    exams: [
      {
        name: { fr: "Consultation pré-opératoire gynécologique (Dr)", en: "Pre-operative Gynecological Consultation (MD)" },
        price: "4 000 FCFA",
        duration: "30 min",
      },
      {
        name: { fr: "Consultation spécialisée personnalisée", en: "Personalized Specialist Consultation" },
        price: "15 000 FCFA",
        duration: "45 min",
      },
      {
        name: { fr: "Évaluation pré-anesthésique", en: "Pre-anesthetic Evaluation" },
        price: "7 000 FCFA",
        duration: "30 min",
      },
      {
        name: { fr: "Échographie pelvienne de contrôle", en: "Control Pelvic Ultrasound" },
        price: "10 000 FCFA",
        duration: "20 min",
      },
    ],
    faqs: [
      {
        q: {
          fr: "Faut-il une lettre de référence pour consulter en gynécologie chirurgicale ?",
          en: "Do I need a referral letter to consult in gynecological surgery?",
        },
        a: {
          fr: "Non, vous pouvez prendre rendez-vous directement. Si un praticien vous suit déjà, apportez votre dossier et vos résultats d'imagerie.",
          en: "No, you may book directly. If another physician already follows you, bring your medical records and imaging results.",
        },
      },
      {
        q: {
          fr: "Les interventions d'urgence obstétricale sont-elles assurées la nuit ?",
          en: "Are emergency obstetric surgeries performed overnight?",
        },
        a: {
          fr: "Oui. Une équipe complète (gynécologue-obstétricien, anesthésiste-réanimateur, sage-femme et infirmiers de bloc) est de garde 24h/24 et 7j/7.",
          en: "Yes. A full surgical, anesthesia, and midwifery team is on duty 24/7.",
        },
      },
    ],
    relatedTipSlug: "octobre-rose-importance-de-la-mammographie",
  },
  {
    slug: "maternite",
    departmentSlug: "gynecologie",
    name: { fr: "Maternité & Salle de Naissance", en: "Maternity & Delivery Suite" },
    description: {
      fr: "Accouchements accompagnés, salle de préparation à la naissance et soins coordonnés de la mère et du nouveau-né.",
      en: "Supported deliveries, birth preparation classes, and coordinated mother-and-newborn care.",
    },
    longDescription: {
      fr: "Notre maternité allie sécurité obstétricale de référence et humanisation de la naissance, avec une salle dédiée à la préparation à la naissance et un accès immédiat à la néonatologie.",
      en: "Our maternity combines referral-level obstetric safety with compassionate birth support, including dedicated prenatal classes and immediate NICU access.",
    },
    headDoctor: "Dr MOTAH née MINKOS YAB Thérèse",
    headDoctorId: "dr-motah",
    majorName: "Mme Clarisse NGONO",
    doctorCount: 9,
    hours: { fr: "Accouchements 24h/24 · Visites 12h–14h & 17h–19h", en: "24/7 Delivery · Visits 12–2pm & 5–7pm" },
    location: { fr: "Pavillon Maternité — Rez-de-chaussée", en: "Maternity Pavilion — Ground Floor" },
    image: "/images/gallery/maternite-1.webp",
    exams: [
      {
        name: { fr: "Consultation prénatale (Grand public)", en: "Antenatal Consultation (Standard)" },
        price: "4 000 FCFA",
        duration: "30 min",
      },
      {
        name: { fr: "Séance de préparation à la naissance", en: "Birth Preparation Session" },
        price: "5 000 FCFA",
        duration: "60 min",
      },
      {
        name: { fr: "Échographie obstétricale morphologique", en: "Obstetric Morphological Ultrasound" },
        price: "12 000 FCFA",
        duration: "25 min",
      },
    ],
    faqs: [
      {
        q: {
          fr: "Que faut-il apporter pour le jour de l'accouchement ?",
          en: "What should I bring for delivery day?",
        },
        a: {
          fr: "Votre carnet de suivi prénatal, votre pièce d'identité, vos dernières échographies, votre bilan sanguin récent et la valise de maternité.",
          en: "Your prenatal booklet, ID card, recent ultrasounds, recent blood work, and maternity bag.",
        },
      },
    ],
    relatedTipSlug: "octobre-rose-importance-de-la-mammographie",
  },
  {
    slug: "consultations-gynecologie-obstetrique",
    departmentSlug: "gynecologie",
    name: {
      fr: "Consultations Externes Gynécologie / Obstétrique",
      en: "Outpatient Gynecology & Obstetrics",
    },
    description: {
      fr: "Consultations de gynécologie, suivi de grossesse à risque et explorations échographiques spécialisées.",
      en: "Gynecology consultations, high-risk pregnancy follow-up, and specialized ultrasound exams.",
    },
    longDescription: {
      fr: "Prise en charge complète de la santé de la femme à chaque étape de la vie, incluant le dépistage du col de l'utérus et du sein.",
      en: "Comprehensive women's health care at every stage of life, including cervical and breast cancer screening.",
    },
    headDoctor: "Dr MBIA Claude Hector",
    headDoctorId: "dr-mbia",
    majorName: "Mme Solange ETOUNDI",
    doctorCount: 8,
    hours: { fr: "Lun – Ven · 07h30 – 15h30", en: "Mon – Fri · 07:30 – 15:30" },
    location: { fr: "Hall des Consultations — Aile Femme & Enfant", en: "Outpatient Hall — Women & Children Wing" },
    image: "/images/gallery/gyneco-hosp-1.webp",
    exams: [
      {
        name: { fr: "Consultation Gynécologie (Dr · Grand public)", en: "Gynecology Consultation (MD · Standard)" },
        price: "4 000 FCFA",
        duration: "25 min",
      },
      {
        name: { fr: "Consultation Personnalisée (Dr)", en: "Personalized Consultation (MD)" },
        price: "15 000 FCFA",
        duration: "40 min",
      },
      {
        name: { fr: "Consultation Professeur (Pr · Personnalisée)", en: "Professor Consultation (Prof · Personalized)" },
        price: "20 000 FCFA",
        duration: "45 min",
      },
    ],
    faqs: [
      {
        q: { fr: "Puis-je choisir mon médecin lors de la réservation ?", en: "Can I choose my doctor when booking?" },
        a: {
          fr: "Oui, la formule Consultation Personnalisée vous permet de sélectionner directement le praticien et son créneau.",
          en: "Yes, the Personalized Consultation option lets you select your preferred practitioner and time slot.",
        },
      },
    ],
    relatedTipSlug: "octobre-rose-importance-de-la-mammographie",
  },
  {
    slug: "cardiologie",
    departmentSlug: "medecine-interne",
    name: { fr: "Cardiologie & Explorations Vasculaires", en: "Cardiology & Vascular Care" },
    description: {
      fr: "Prise en charge de l'hypertension artérielle, des cardiopathies, ECG, échocardiographie et suivi spécialisé.",
      en: "Management of hypertension, heart disease, ECG, echocardiography, and specialized cardiac follow-up.",
    },
    longDescription: {
      fr: "Sous l'impulsion d'une équipe hospitalo-universitaire reconnue, le service assure le dépistage, l'exploration non invasive et le traitement des affections cardiovasculaires.",
      en: "Led by experienced university hospital cardiologists, the unit provides screening, non-invasive cardiac diagnostics, and ongoing cardiovascular care.",
    },
    headDoctor: "Dr MONDOUAGNE ENGKOLO Paulin",
    headDoctorId: "dr-mondouagne",
    majorName: "M. Alain NJOYA",
    doctorCount: 7,
    hours: { fr: "Lun – Ven · 07h30 – 15h30", en: "Mon – Fri · 07:30 – 15:30" },
    location: { fr: "Pavillon Médecine Interne — Rez-de-chaussée", en: "Internal Medicine Pavilion — Ground Floor" },
    image: "/images/gallery/cardio-1.webp",
    exams: [
      {
        name: { fr: "Consultation Cardiologie (Dr · Personnalisée)", en: "Cardiology Consultation (MD · Personalized)" },
        price: "15 000 FCFA",
        duration: "35 min",
      },
      {
        name: { fr: "Électrocardiogramme (ECG) 12 dérivations", en: "12-Lead Electrocardiogram (ECG)" },
        price: "8 000 FCFA",
        duration: "15 min",
      },
      {
        name: { fr: "Échocardiographie Doppler cardiaque", en: "Cardiac Doppler Echocardiography" },
        price: "25 000 FCFA",
        duration: "30 min",
      },
    ],
    faqs: [
      {
        q: {
          fr: "Comment se préparer à une consultation d'hypertension ?",
          en: "How should I prepare for a hypertension consultation?",
        },
        a: {
          fr: "Apportez votre relevé de tension des derniers jours, vos ordonnances en cours et votre dernier bilan biologique.",
          en: "Bring your recent blood pressure log, current prescriptions, and latest lab results.",
        },
      },
    ],
    relatedTipSlug: "bien-s-hydrater-au-quotidien",
  },
  {
    slug: "urgences-medico-chirurgicales",
    departmentSlug: "urgences-reanimation",
    name: { fr: "Urgences Médico-Chirurgicales", en: "Medical & Surgical Emergencies" },
    description: {
      fr: "Accueil immédiat sans rendez-vous 24h/24 et 7j/7 pour toutes les urgences adultes, traumatologiques et vitales.",
      en: "Immediate 24/7 walk-in triage and stabilization for all adult medical, trauma, and critical emergencies.",
    },
    longDescription: {
      fr: "Organisé autour d'un circuit de triage rapide, d'une salle de déchoquage équipée et d'un laboratoire dédié 24h/24, le service intervient sans délai sur chaque urgence vitale.",
      en: "Structured around rapid triage, a resuscitation bay, and a dedicated 24/7 emergency lab, the department responds immediately to critical cases.",
    },
    headDoctor: "Dr NDOYE NDO Emmanuel",
    headDoctorId: "dr-ndoye",
    majorName: "M. Jean-Paul MBAPPE",
    doctorCount: 14,
    hours: { fr: "Ouvert en continu · 24h/24 · 7j/7", en: "Open continuously · 24/7" },
    location: { fr: "Entrée Urgences — Porte Principale", en: "Emergency Entrance — Main Gate" },
    image: "/images/campus/emergency-building.webp",
    exams: [
      {
        name: { fr: "Accueil & Triage d'urgence", en: "Emergency Triage & Admission" },
        price: "Immédiat (prise en charge prioritaire)",
        duration: "Continu 24h/24",
      },
      {
        name: { fr: "Bilan biologique d'urgence", en: "STAT Emergency Lab Panel" },
        price: "Selon prescription",
        duration: "30 min",
      },
    ],
    faqs: [
      {
        q: { fr: "Faut-il prendre rendez-vous pour venir aux urgences ?", en: "Do I need an appointment for the ER?" },
        a: {
          fr: "Jamais. Présentez-vous directement au service des urgences 24h/24 ou appelez le +237 233 42 68 68 (ou le SAMU 119).",
          en: "Never. Come directly to the Emergency Room 24/7 or call +237 233 42 68 68 (or SAMU 119).",
        },
      },
    ],
    relatedTipSlug: "se-laver-les-mains-correctement",
  },
  {
    slug: "pediatrie-urgences-pediatriques",
    departmentSlug: "pediatrie",
    name: {
      fr: "Pédiatrie Générale & Urgences Pédiatriques",
      en: "General Pediatrics & Pediatric ER",
    },
    description: {
      fr: "Soins des nourrissons et enfants, néonatologie intensive et urgences pédiatriques au Pavillon Samuel Eto'o Fils.",
      en: "Infant and child healthcare, intensive neonatology, and pediatric emergencies at Samuel Eto'o Fils Pavilion.",
    },
    longDescription: {
      fr: "Un pôle pédiatrique dédié combinant consultations spécialisées, suivi vaccinal, réanimation néonatale et accueil d'urgence adapté aux enfants.",
      en: "A dedicated pediatric center combining specialist consultations, immunization monitoring, neonatal ICU, and child-friendly emergency care.",
    },
    headDoctor: "Dr NGO NJOCK Vera",
    headDoctorId: "dr-ngo-njock",
    majorName: "Mme Mireille EKAMBI",
    doctorCount: 11,
    hours: { fr: "Consultations Lun–Ven 07h30–15h30 · Urgences 24h/24", en: "Consultations Mon–Fri · ER 24/7" },
    location: { fr: "Pavillon Samuel Eto’o Fils", en: "Samuel Eto'o Fils Pavilion" },
    image: "/images/gallery/pediatrie-urgences-1.webp",
    exams: [
      {
        name: { fr: "Consultation Pédiatrique (Grand public)", en: "Pediatric Consultation (Standard)" },
        price: "4 000 FCFA",
        duration: "25 min",
      },
      {
        name: { fr: "Consultation Pédiatrique Personnalisée", en: "Personalized Pediatric Consultation" },
        price: "15 000 FCFA",
        duration: "40 min",
      },
      {
        name: { fr: "Suivi néonatal & croissance", en: "Neonatal & Growth Follow-up" },
        price: "7 000 FCFA",
        duration: "30 min",
      },
    ],
    faqs: [
      {
        q: { fr: "Où se situent les urgences pour enfants ?", en: "Where is the pediatric emergency unit located?" },
        a: {
          fr: "Les urgences pédiatriques sont accueillies 24h/24 au Pavillon Samuel Eto'o Fils, directement accessible depuis l'entrée principale.",
          en: "Pediatric emergencies are received 24/7 at the Samuel Eto'o Fils Pavilion, accessible directly from the main gate.",
        },
      },
    ],
    relatedTipSlug: "asthme-bon-usage-de-linhalateur",
  },
  {
    slug: "laboratoire-central-iso",
    departmentSlug: "biologie-clinique",
    name: {
      fr: "Laboratoire Central & Biologie Clinique (ISO)",
      en: "Central Laboratory & Clinical Biology (ISO)",
    },
    description: {
      fr: "Analyses hématologiques, biochimiques, microbiologiques et sérologiques dans trois unités accréditées ISO.",
      en: "Hematology, biochemistry, microbiology, and serology diagnostics across three ISO-accredited laboratory units.",
    },
    longDescription: {
      fr: "Trois laboratoires de biologie de l'Hôpital Laquintinie sont accrédités aux normes ISO internationales, garantissant fiabilité analytique et délais rapides jour et nuit.",
      en: "Three biological laboratories at Laquintinie Hospital hold international ISO accreditation, guaranteeing analytical accuracy and rapid turnaround day and night.",
    },
    headDoctor: "Dr ATEBA Gilbert Roger",
    headDoctorId: "dr-ateba",
    majorName: "M. Samuel TCHOUA",
    doctorCount: 6,
    hours: { fr: "Prélèvements & Analyses 24h/24 · 7j/7", en: "Sampling & Lab Analysis 24/7" },
    location: { fr: "Bâtiment Laboratoire Central", en: "Central Laboratory Building" },
    image: "/images/campus/stethoscope.webp",
    exams: [
      {
        name: { fr: "Numération Formule Sanguine (NFS)", en: "Complete Blood Count (CBC)" },
        price: "5 000 FCFA",
        duration: "Résultat sous 2h",
      },
      {
        name: { fr: "Bilan biochimique complet", en: "Comprehensive Metabolic Panel" },
        price: "15 000 FCFA",
        duration: "Résultat jour même",
      },
      {
        name: { fr: "Examen anatomo-pathologique", en: "Histopathology Examination" },
        price: "25 000 FCFA",
        duration: "5 à 7 jours",
      },
    ],
    faqs: [
      {
        q: { fr: "Le laboratoire fonctionne-t-il le week-end ?", en: "Is the lab open on weekends?" },
        a: {
          fr: "Oui, le laboratoire et la banque de sang fonctionnent 24h/24 et 7j/7 pour les patients hospitalisés, les urgences et les externes.",
          en: "Yes, both the clinical lab and blood bank operate 24/7 for inpatients, emergencies, and outpatients.",
        },
      },
    ],
    relatedTipSlug: "se-laver-les-mains-correctement",
  },
  {
    slug: "chirurgie-viscerale-traumatologie",
    departmentSlug: "chirurgie-generale",
    name: {
      fr: "Chirurgie Viscérale, Traumatologie & Urologie",
      en: "Visceral Surgery, Trauma & Urology",
    },
    description: {
      fr: "Chirurgie digestive, orthopédie-traumatologie et urologie avec prise en charge post-opératoire pluridisciplinaire.",
      en: "Digestive surgery, orthopedic trauma, and urology with multidisciplinary post-operative rehabilitation.",
    },
    longDescription: {
      fr: "Répartis sur les bâtiments A à D et nos blocs opératoires modernisés, nos chirurgiens assurent la chirurgie programmée et les urgences traumatologiques lourdes.",
      en: "Across Buildings A–D and our modernized operating suites, our surgeons manage both scheduled procedures and complex trauma emergencies.",
    },
    headDoctor: "Dr NDAME KOUM Emmanuel",
    headDoctorId: "dr-ndame-koum",
    majorName: "M. Olivier NDOUMBE",
    doctorCount: 15,
    hours: { fr: "Consultations Lun–Ven · Blocs d'urgence 24h/24", en: "Consultations Mon–Fri · 24/7 Emergency OR" },
    location: { fr: "Bâtiments A, B, C, D", en: "Buildings A, B, C, D" },
    image: "/images/gallery/chirurgie-batiments.webp",
    exams: [
      {
        name: { fr: "Consultation Chirurgie (Grand public)", en: "Surgery Consultation (Standard)" },
        price: "4 000 FCFA",
        duration: "25 min",
      },
      {
        name: { fr: "Consultation Spécialiste Personnalisée", en: "Personalized Specialist Consultation" },
        price: "15 000 FCFA",
        duration: "40 min",
      },
    ],
    faqs: [
      {
        q: { fr: "Les assurances d'entreprise sont-elles acceptées ?", en: "Are corporate insurance plans accepted?" },
        a: {
          fr: "Oui, l'Hôpital Laquintinie travaille avec plus de 20 compagnies d'assurance et mutuelles au Cameroun.",
          en: "Yes, Laquintinie Hospital partners with over 20 insurance providers and corporate health plans in Cameroon.",
        },
      },
    ],
    relatedTipSlug: "bien-s-hydrater-au-quotidien",
  },
  {
    slug: "imagerie-radiologie-scanner",
    departmentSlug: "imagerie-explorations",
    name: {
      fr: "Radiologie, Scanner & Mammographie",
      en: "Radiology, CT Scan & Mammography",
    },
    description: {
      fr: "Imagerie diagnostique haute définition, dépistage mammaire et échographies spécialisées.",
      en: "High-definition diagnostic imaging, breast cancer screening, and specialized ultrasound.",
    },
    longDescription: {
      fr: "Des protocoles d'imagerie précis permettant un diagnostic rapide des pathologies traumatiques, oncologiques, vasculaires et maternelles.",
      en: "Precision imaging protocols enabling rapid diagnosis of trauma, oncology, vascular, and maternal conditions.",
    },
    headDoctor: "Dr NDAM IBRAHIMA AZIZ",
    headDoctorId: "dr-ndam-ibrahima",
    majorName: "Mme Béatrice FOUDA",
    doctorCount: 6,
    hours: { fr: "Lun – Sam · 07h30 – 18h00 (Urgences 24h/24)", en: "Mon – Sat · 07:30 – 18:00 (ER 24/7)" },
    location: { fr: "Centre d'Imagerie — Bâtiment Technique", en: "Imaging Center — Technical Wing" },
    image: "/images/gallery/cardio-2.webp",
    exams: [
      {
        name: { fr: "Radiographie standard", en: "Standard X-Ray" },
        price: "10 000 FCFA",
        duration: "15 min",
      },
      {
        name: { fr: "Mammographie bilatérale de dépistage", en: "Bilateral Screening Mammography" },
        price: "20 000 FCFA",
        duration: "25 min",
      },
      {
        name: { fr: "Scanner (Tomodensitométrie)", en: "CT Scan" },
        price: "45 000 – 75 000 FCFA",
        duration: "30 min",
      },
    ],
    faqs: [
      {
        q: { fr: "Faut-il une ordonnance pour passer un scanner ?", en: "Is a prescription required for a CT scan?" },
        a: {
          fr: "Oui, une prescription médicale est recommandée afin d'adapter le protocole d'exploration (avec ou sans injection).",
          en: "Yes, a physician's order is recommended so the imaging protocol can be tailored appropriately.",
        },
      },
    ],
    relatedTipSlug: "octobre-rose-importance-de-la-mammographie",
  },
  {
    slug: "odonto-orl-ophtalmologie",
    departmentSlug: "trois-o",
    name: {
      fr: "Ophtalmologie, ORL & Odonto-Stomatologie",
      en: "Ophthalmology, ENT & Dentistry",
    },
    description: {
      fr: "Soins oculaires et chirurgie de la cataracte, pathologies ORL et soins dentaires complets.",
      en: "Eye care and cataract surgery, ear-nose-throat medicine, and comprehensive dental care.",
    },
    longDescription: {
      fr: "Le pôle des 3 O réunit en un même espace les spécialistes de la vision, de l'audition et de la chirurgie bucco-dentaire.",
      en: "The 3 O department brings together eye, ENT, and oral-maxillofacial specialists under one coordinated roof.",
    },
    headDoctor: "Dr MPESSA EKOBO Maurice",
    headDoctorId: "dr-mpessa-ekobo",
    majorName: "Mme Clarisse MBONO",
    doctorCount: 9,
    hours: { fr: "Lun – Ven · 07h30 – 15h30", en: "Mon – Fri · 07:30 – 15:30" },
    location: { fr: "Pavillon des 3 O", en: "3 O Specialties Pavilion" },
    image: "/images/gallery/chirurgie-bloc-2.webp",
    exams: [
      {
        name: { fr: "Consultation Ophtalmologie / ORL / Dentaire", en: "Ophthalmology / ENT / Dental Visit" },
        price: "4 000 FCFA",
        duration: "25 min",
      },
      {
        name: { fr: "Consultation Personnalisée Spécialiste", en: "Personalized Specialist Visit" },
        price: "15 000 FCFA",
        duration: "35 min",
      },
    ],
    faqs: [
      {
        q: { fr: "Proposez-vous les bilans visuels et détartrages ?", en: "Do you offer vision exams and dental cleanings?" },
        a: {
          fr: "Oui, sur rendez-vous en consultation externe du lundi au vendredi.",
          en: "Yes, by outpatient appointment Monday through Friday.",
        },
      },
    ],
    relatedTipSlug: "se-laver-les-mains-correctement",
  },
  {
    slug: "pharmacie-hospitaliere",
    departmentSlug: "pharmacie",
    name: {
      fr: "Pharmacie Centrale & Unité de Dispensation",
      en: "Central Pharmacy & Dispensing Unit",
    },
    description: {
      fr: "Approvisionnement garanti en médicaments essentiels et suivi pharmaceutique disponible jour et nuit.",
      en: "Guaranteed supply of essential medications and pharmaceutical counseling available day and night.",
    },
    longDescription: {
      fr: "La pharmacie hospitalière assure la traçabilité complète des traitements hospitaliers et externes avec un guichet ouvert en permanence.",
      en: "The hospital pharmacy ensures full traceability of inpatient and outpatient treatments with a round-the-clock counter.",
    },
    headDoctor: "Dr HAMZA ABOUBAKAR",
    headDoctorId: "dr-hamza",
    majorName: "M. Serge NDOUMBE",
    doctorCount: 5,
    hours: { fr: "Ouverte en continu · 24h/24 · 7j/7", en: "Open continuously · 24/7" },
    location: { fr: "Proximité du Hall Principal", en: "Near Main Lobby" },
    image: "/images/campus/direction-building.webp",
    exams: [
      {
        name: { fr: "Dispensation sur ordonnance", en: "Prescription Dispensing" },
        price: "Tarif public réglementé",
        duration: "10 – 15 min",
      },
    ],
    faqs: [
      {
        q: { fr: "Puis-je récupérer mon traitement la nuit ?", en: "Can I fill a prescription at night?" },
        a: {
          fr: "Oui, un guichet de garde pharmaceutique est ouvert 24h/24.",
          en: "Yes, an on-call pharmacy counter operates 24/7.",
        },
      },
    ],
    relatedTipSlug: "asthme-bon-usage-de-linhalateur",
  },
  {
    slug: "maison-du-patient-medecine-generale",
    departmentSlug: "soins-pluridisciplinaires",
    name: {
      fr: "Médecine Générale & Maison du Patient (24h/24)",
      en: "General Medicine & Patient House (24/7)",
    },
    description: {
      fr: "Orientation de premier recours, bilan de santé et cellule d'écoute dédiée aux patients et accompagnants.",
      en: "Primary care orientation, health checkups, and a 24/7 dedicated patient advocacy & support desk.",
    },
    longDescription: {
      fr: "Point d'entrée privilégié pour un premier avis médical, la Médecine Générale travaille main dans la main avec la Maison du Patient ouverte 24h/24 et 7j/7 pour fluidifier votre séjour.",
      en: "As the primary entry point for medical advice, General Medicine works alongside the 24/7 Patient House to ensure a smooth, attentive hospital journey.",
    },
    headDoctor: "Dr Nathalie NTAGO KEUMEUGNE",
    headDoctorId: "dr-ntago",
    majorName: "Mme Clarisse MBONO",
    doctorCount: 12,
    hours: { fr: "Consultations Lun–Ven · Maison du Patient 24h/24", en: "Consultations Mon–Fri · Patient House 24/7" },
    location: { fr: "Portail & Hall Central", en: "Main Gate & Central Lobby" },
    image: "/images/campus/pavillon-aerial.webp",
    exams: [
      {
        name: { fr: "Consultation Médecine Générale", en: "General Medicine Consultation" },
        price: "4 000 FCFA",
        duration: "25 min",
      },
      {
        name: { fr: "Bilan médical annuel complet", en: "Annual Preventive Health Checkup" },
        price: "25 000 FCFA",
        duration: "60 min",
      },
    ],
    faqs: [
      {
        q: { fr: "À quoi sert la Maison du Patient ?", en: "What is the Patient House for?" },
        a: {
          fr: "Ouverte 24h/24 et 7j/7, elle accueille, informe, oriente les usagers et traite toute demande ou réclamation en temps réel.",
          en: "Open 24/7, it welcomes, guides, and assists patients and families while resolving inquiries in real time.",
        },
      },
    ],
    relatedTipSlug: "bien-s-hydrater-au-quotidien",
  },
];

export interface Doctor {
  id: string;
  name: string;
  title: string;
  role: LocalizedText;
  roleFilter: "direction" | "chef-departement" | "chef-service" | "praticien";
  specialty: LocalizedText;
  departmentSlug: string;
  photo: string;
  schedule: LocalizedText;
  languages: string[];
}

export const DOCTORS: Doctor[] = [
  {
    id: "dr-ndom-ebongue",
    name: "Dr NDOM IDJEM EPSE EBONGUE Marie Solange",
    title: "Directeur & Cardiologue",
    role: { fr: "Directeur de l'Hôpital · Cardiologue", en: "Hospital Director · Cardiologist" },
    roleFilter: "direction",
    specialty: { fr: "Cardiologie", en: "Cardiology" },
    departmentSlug: "medecine-interne",
    photo: "/images/campus/director-general.webp",
    schedule: { fr: "Sur rendez-vous", en: "By appointment" },
    languages: ["Français", "English"],
  },
  {
    id: "dr-maah",
    name: "Dr MAAH MI-BAKAI Serge Antoine",
    title: "Chef de service",
    role: { fr: "Chef de service · Blocs Opératoires", en: "Head of Unit · Operating Suites" },
    roleFilter: "chef-service",
    specialty: { fr: "Gynécologie & Obstétrique", en: "Gynecology & Obstetrics" },
    departmentSlug: "gynecologie",
    photo: "/images/doctors/dr-maah.jpg",
    schedule: { fr: "Lun, Mer, Ven · 08h00 – 14h00", en: "Mon, Wed, Fri · 08:00 – 14:00" },
    languages: ["Français"],
  },
  {
    id: "dr-kamdem",
    name: "Dr Josephine KAMDEM Epse WAMBO",
    title: "Conseiller Médical",
    role: { fr: "Conseiller Médical", en: "Medical Advisor" },
    roleFilter: "direction",
    specialty: { fr: "Direction Médicale & Soins", en: "Medical Direction & Care" },
    departmentSlug: "soins-pluridisciplinaires",
    photo: "/images/doctors/dr-kamdem.jpg",
    schedule: { fr: "Lun – Ven · 08h00 – 15h30", en: "Mon – Fri · 08:00 – 15:30" },
    languages: ["Français", "English"],
  },
  {
    id: "dr-balepna",
    name: "Dr BALEPNA Jean-Yves",
    title: "Conseiller Médical Adjoint",
    role: { fr: "Conseiller Médical Adjoint · Néphrologue", en: "Deputy Medical Advisor · Nephrologist" },
    roleFilter: "direction",
    specialty: { fr: "Néphrologie", en: "Nephrology" },
    departmentSlug: "medecine-interne",
    photo: "/images/doctors/dr-balepna.avif",
    schedule: { fr: "Mar, Jeu · 08h30 – 14h30", en: "Tue, Thu · 08:30 – 14:30" },
    languages: ["Français", "English"],
  },
  {
    id: "dr-mondouagne",
    name: "Dr MONDOUAGNE ENGKOLO Paulin",
    title: "Cardiologue",
    role: { fr: "Praticien spécialiste", en: "Specialist Physician" },
    roleFilter: "chef-departement",
    specialty: { fr: "Cardiologie", en: "Cardiology" },
    departmentSlug: "medecine-interne",
    photo: "/images/doctors/dr-mondouagne.jpg",
    schedule: { fr: "Lun, Mar, Jeu · 08h00 – 15h00", en: "Mon, Tue, Thu · 08:00 – 15:00" },
    languages: ["Français"],
  },
  {
    id: "dr-ndame-koum",
    name: "Dr NDAME KOUM Emmanuel",
    title: "Chirurgien Viscéral",
    role: { fr: "Chef de département · Chirurgie", en: "Department Head · Surgery" },
    roleFilter: "chef-departement",
    specialty: { fr: "Chirurgie Viscérale", en: "Visceral Surgery" },
    departmentSlug: "chirurgie-generale",
    photo: "/images/doctors/dr-ndame-koum.jpg",
    schedule: { fr: "Lun, Mer · 08h30 – 14h30", en: "Mon, Wed · 08:30 – 14:30" },
    languages: ["Français"],
  },
  {
    id: "dr-ngo-njock",
    name: "Dr NGO NJOCK Vera",
    title: "Pédiatre",
    role: { fr: "Chef de département · Pédiatrie", en: "Department Head · Pediatrics" },
    roleFilter: "chef-departement",
    specialty: { fr: "Pédiatrie", en: "Pediatrics" },
    departmentSlug: "pediatrie",
    photo: "/images/doctors/dr-ngo-njock.jpg",
    schedule: { fr: "Lun – Ven · 08h00 – 14h00", en: "Mon – Fri · 08:00 – 14:00" },
    languages: ["Français", "English"],
  },
  {
    id: "dr-ndam-ibrahima",
    name: "Dr NDAM IBRAHIMA AZIZ",
    title: "Radiologue",
    role: { fr: "Chef de service · Imagerie", en: "Head of Unit · Medical Imaging" },
    roleFilter: "chef-service",
    specialty: { fr: "Imagerie et Explorations", en: "Medical Imaging" },
    departmentSlug: "imagerie-explorations",
    photo: "/images/doctors/dr-ndam-ibrahima.jpg",
    schedule: { fr: "Lun – Ven · 08h00 – 15h30", en: "Mon – Fri · 08:00 – 15:30" },
    languages: ["Français", "English"],
  },
  {
    id: "dr-ndoye",
    name: "Dr NDOYE NDO Emmanuel",
    title: "Anesthésiste-Réanimateur",
    role: { fr: "Chef de département · Urgences & Réa", en: "Department Head · Emergency & ICU" },
    roleFilter: "chef-departement",
    specialty: { fr: "Anesthésie & Réanimation", en: "Anesthesia & ICU" },
    departmentSlug: "urgences-reanimation",
    photo: "/images/doctors/dr-ndoye.jpg",
    schedule: { fr: "Permanence 24h/24", en: "24/7 Duty" },
    languages: ["Français"],
  },
  {
    id: "dr-hamza",
    name: "Dr HAMZA ABOUBAKAR",
    title: "Pharmacien",
    role: { fr: "Chef de département · Pharmacie", en: "Department Head · Pharmacy" },
    roleFilter: "chef-departement",
    specialty: { fr: "Pharmacie Hospitalière", en: "Hospital Pharmacy" },
    departmentSlug: "pharmacie",
    photo: "/images/doctors/dr-hamza.jpg",
    schedule: { fr: "Lun – Ven · 08h00 – 16h00", en: "Mon – Fri · 08:00 – 16:00" },
    languages: ["Français", "English"],
  },
  {
    id: "dr-motah",
    name: "Dr MOTAH née MINKOS YAB Thérèse",
    title: "Gynécologue-Obstétricienne",
    role: { fr: "Chef de département adjoint · Gynéco", en: "Deputy Dept. Head · Gynecology" },
    roleFilter: "chef-departement",
    specialty: { fr: "Gynécologie et Obstétrique", en: "Gynecology & Obstetrics" },
    departmentSlug: "gynecologie",
    photo: "/images/doctors/dr-motah.jpg",
    schedule: { fr: "Mar, Jeu, Ven · 08h00 – 14h30", en: "Tue, Thu, Fri · 08:00 – 14:30" },
    languages: ["Français"],
  },
  {
    id: "dr-same-bebey",
    name: "Dr SAME BEBEY Francine",
    title: "Rhumatologue",
    role: { fr: "Médecin spécialiste", en: "Specialist Physician" },
    roleFilter: "praticien",
    specialty: { fr: "Rhumatologie", en: "Rheumatology" },
    departmentSlug: "medecine-interne",
    photo: "/images/doctors/dr-same-bebey.jpg",
    schedule: { fr: "Lun, Mer · 09h00 – 15h00", en: "Mon, Wed · 09:00 – 15:00" },
    languages: ["Français", "English"],
  },
  {
    id: "dr-motuom",
    name: "Dr MOTUOM FOTSO EPSE BOGNI Lize",
    title: "Neurologue",
    role: { fr: "Médecin spécialiste", en: "Specialist Physician" },
    roleFilter: "praticien",
    specialty: { fr: "Neurologie", en: "Neurology" },
    departmentSlug: "medecine-interne",
    photo: "/images/doctors/dr-motuom.jpg",
    schedule: { fr: "Mar, Ven · 08h30 – 14h30", en: "Tue, Fri · 08:30 – 14:30" },
    languages: ["Français"],
  },
  {
    id: "dr-mpessa-ekobo",
    name: "Dr MPESSA EKOBO Maurice",
    title: "ORL",
    role: { fr: "Médecin spécialiste", en: "Specialist Physician" },
    roleFilter: "chef-service",
    specialty: { fr: "Oto-Rhino-Laryngologie (ORL)", en: "ENT (Otorhinolaryngology)" },
    departmentSlug: "trois-o",
    photo: "/images/doctors/dr-mpessa-ekobo.jpg",
    schedule: { fr: "Lun, Jeu · 08h30 – 15h00", en: "Mon, Thu · 08:30 – 15:00" },
    languages: ["Français"],
  },
  {
    id: "dr-tonye",
    name: "Dr TONYE Simon Hughes",
    title: "Odonto-Stomatologue",
    role: { fr: "Médecin spécialiste", en: "Specialist Physician" },
    roleFilter: "praticien",
    specialty: { fr: "Odonto-Stomatologie", en: "Dentistry & Stomatology" },
    departmentSlug: "trois-o",
    photo: "/images/doctors/dr-tonye.jpg",
    schedule: { fr: "Mar, Mer, Ven · 08h00 – 14h00", en: "Tue, Wed, Fri · 08:00 – 14:00" },
    languages: ["Français", "English"],
  },
  {
    id: "dr-eyoup-sen",
    name: "Dr EYOUP SEN Gertrude",
    title: "Ophtalmologue",
    role: { fr: "Médecin spécialiste", en: "Specialist Physician" },
    roleFilter: "praticien",
    specialty: { fr: "Ophtalmologie", en: "Ophthalmology" },
    departmentSlug: "trois-o",
    photo: "/images/doctors/dr-eyoup-sen.jpg",
    schedule: { fr: "Lun, Mer, Ven · 08h00 – 14h30", en: "Mon, Wed, Fri · 08:00 – 14:30" },
    languages: ["Français"],
  },
  {
    id: "dr-manga-belibi",
    name: "Dr MANGA BELIBI Jacques",
    title: "Oncologue",
    role: { fr: "Médecin spécialiste", en: "Specialist Physician" },
    roleFilter: "praticien",
    specialty: { fr: "Oncologie Médicale", en: "Medical Oncology" },
    departmentSlug: "medecine-interne",
    photo: "/images/doctors/dr-manga-belibi.jpg",
    schedule: { fr: "Mar, Jeu · 08h30 – 15h00", en: "Tue, Thu · 08:30 – 15:00" },
    languages: ["Français", "English"],
  },
  {
    id: "dr-ngandeu",
    name: "Dr NGANDEU Marcel Jerry",
    title: "Urologue",
    role: { fr: "Médecin spécialiste", en: "Specialist Physician" },
    roleFilter: "praticien",
    specialty: { fr: "Urologie", en: "Urology" },
    departmentSlug: "chirurgie-generale",
    photo: "/images/doctors/dr-ngandeu.jpg",
    schedule: { fr: "Lun, Jeu · 08h00 – 14h00", en: "Mon, Thu · 08:00 – 14:00" },
    languages: ["Français"],
  },
];

export interface TimelineEra {
  year: string;
  tabLabel: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  highlights: LocalizedText[];
  image: string;
  secondaryImage: string;
}

export const TIMELINE_ERAS: TimelineEra[] = [
  {
    year: "1920",
    tabLabel: { fr: "Origines", en: "Origins" },
    title: { fr: "Fondation à Bonamoudourou-Deido", en: "Founded in Bonamoudourou-Deido" },
    subtitle: { fr: "« Hôpital Indigène de Douala »", en: "“Indigenous Hospital of Douala”" },
    description: {
      fr: "Fondé en 1920 à Bonamoudourou-Deido, l'établissement entame son histoire au service des populations locales avant de connaître des déplacements successifs à Bonadibong puis à Bonamikengue (Canton Akwa).",
      en: "Founded in 1920 in Bonamoudourou-Deido, the institution began serving local communities before moving successively to Bonadibong and Bonamikengue (Akwa).",
    },
    highlights: [
      { fr: "Premiers soins dispensés aux populations de Douala", en: "First medical care for Douala's population" },
      { fr: "Ancrage au cœur du Canton Akwa", en: "Rooted in the heart of Akwa" },
    ],
    image: "/images/campus/direction-building.webp",
    secondaryImage: "/images/campus/hero-hospital.webp",
  },
  {
    year: "1931",
    tabLabel: { fr: "Installation", en: "Establishment" },
    title: { fr: "Installation définitive sur le site actuel", en: "Permanent campus established" },
    subtitle: { fr: "9 hectares au cœur de Douala", en: "9 hectares in central Douala" },
    description: {
      fr: "Vers 1931, l'hôpital s'installe définitivement sur son site actuel de 9 hectares à Ngodi Akwa, jetant les bases d'un grand hôpital pavillonnaire ouvert sur la ville.",
      en: "Around 1931, the hospital permanently settled on its 9-hectare Ngodi Akwa campus, laying the foundations of a major pavilion-style hospital.",
    },
    highlights: [
      { fr: "Campus de 9 hectares", en: "9-hectare urban campus" },
      { fr: "Architecture pavillonnaire aérée", en: "Signature pavilion architecture" },
    ],
    image: "/images/campus/hero-hospital.webp",
    secondaryImage: "/images/campus/direction-building.webp",
  },
  {
    year: "1941",
    tabLabel: { fr: "Dénomination", en: "Naming" },
    title: { fr: "Hommage à Jean Auguste Laquintinie", en: "Honoring Jean Auguste Laquintinie" },
    subtitle: { fr: "Hôpital Laquintinie de Douala", en: "Laquintinie Hospital of Douala" },
    description: {
      fr: "En 1941, l'établissement prend officiellement le nom d'Hôpital Laquintinie de Douala en hommage au Médecin-Capitaine Jean Auguste Laquintinie, chirurgien des armées et ancien médecin-chef.",
      en: "In 1941, the hospital was officially named after Captain-Physician Jean Auguste Laquintinie, former Chief Medical Officer.",
    },
    highlights: [
      { fr: "Transmission de l'excellence chirurgicale", en: "Legacy of surgical excellence" },
      { fr: "Rayonnement sur le Littoral", en: "Regional referral institution" },
    ],
    image: "/images/gallery/chirurgie-batiments.webp",
    secondaryImage: "/images/campus/direction-building.webp",
  },
  {
    year: "1950",
    tabLabel: { fr: "Modernisation", en: "Modernization" },
    title: { fr: "Extension architecturale & plateau technique", en: "Architectural expansion & clinical growth" },
    subtitle: { fr: "Entre patrimoine et modernité", en: "Heritage meets modern care" },
    description: {
      fr: "Dès 1950, de nouveaux bâtiments modernes complètent les pavillons historiques, affirmant la triple mission de soins, d'enseignement universitaire et de recherche clinique.",
      en: "From 1950 onward, modern clinical buildings complemented historic pavilions, affirming our triple mission of care, teaching, and research.",
    },
    highlights: [
      { fr: "600 lits d'hospitalisation", en: "600 inpatient beds" },
      { fr: "Centre d'application universitaire", en: "University teaching center" },
    ],
    image: "/images/campus/pavillon-aerial.webp",
    secondaryImage: "/images/gallery/cardio-1.webp",
  },
  {
    year: "2026",
    tabLabel: { fr: "95 ans", en: "95 years" },
    title: { fr: "95 ans au service de chaque vie", en: "95 years serving every life" },
    subtitle: { fr: "ISO · Maison du Patient · Digitalisation", en: "ISO Labs · Patient House · Digital Care" },
    description: {
      fr: "Une année anniversaire rythmée par l'accréditation ISO de trois laboratoires, la Maison du Patient ouverte 24h/24 et la modernisation numérique du parcours patient.",
      en: "A landmark anniversary highlighted by three ISO-accredited laboratories, the 24/7 Patient House, and digital appointment services.",
    },
    highlights: [
      { fr: "3 laboratoires accrédités ISO", en: "3 ISO-accredited laboratories" },
      { fr: "Maison du Patient ouverte 24h/24", en: "24/7 Patient Support House" },
      { fr: "Prise de rendez-vous en ligne", en: "Online appointment booking" },
    ],
    image: "/images/campus/pavillon-aerial.webp",
    secondaryImage: "/images/gallery/pediatrie-urgences-1.webp",
  },
];

export interface NewsArticle {
  slug: string;
  category: LocalizedText;
  categoryKey: string;
  dateISO: string;
  dateLabel: LocalizedText;
  readTime: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  body: LocalizedText[];
  image: string;
  featured?: boolean;
}

/**
 * Strictly sorted descending by dateISO (newest first: 2026-11-02 -> 2026-08-25).
 * Fixes the chronological sorting bug and "1er septembre 2026" French typography bug.
 */
export const NEWS_ARTICLES: NewsArticle[] = [
  {
    slug: "inauguration-unite-imagerie-cardio-2026",
    category: { fr: "Innovations", en: "Innovations" },
    categoryKey: "innovations",
    dateISO: "2026-11-02",
    dateLabel: { fr: "2 novembre 2026", en: "November 2, 2026" },
    readTime: "4 min",
    title: {
      fr: "Renforcement du plateau d'imagerie cardiovasculaire et des blocs",
      en: "Upgraded cardiovascular imaging and operating suite capabilities",
    },
    excerpt: {
      fr: "De nouveaux équipements de diagnostic et d'anesthésie réduisent les délais d'attente et renforcent la lutte contre les évacuations sanitaires.",
      en: "New diagnostic and surgical monitoring systems reduce waiting times and strengthen local referral care.",
    },
    body: [
      {
        fr: "Dans le cadre de la modernisation continue du plateau technique, l'Hôpital Laquintinie de Douala déploie de nouveaux équipements de haute précision en cardiologie interventionnelle et en imagerie diagnostique.",
        en: "As part of ongoing clinical modernization, Laquintinie Hospital has commissioned high-precision diagnostic and surgical monitoring systems.",
      },
      {
        fr: "Cette avancée permet aux équipes pluridisciplinaires d'offrir aux patients du Littoral et de toute la sous-région une prise en charge conforme aux standards internationaux.",
        en: "These upgrades empower multidisciplinary teams to deliver care matching international clinical benchmarks directly in Douala.",
      },
    ],
    image: "/images/gallery/cardio-1.webp",
    featured: true,
  },
  {
    slug: "maison-du-patient-ecoute-24h24",
    category: { fr: "Actualités", en: "News" },
    categoryKey: "actualites",
    dateISO: "2026-11-02",
    dateLabel: { fr: "2 novembre 2026", en: "November 2, 2026" },
    readTime: "3 min",
    title: {
      fr: "Maison du Patient : un accueil et une écoute disponibles 24h/24",
      en: "Patient House: dedicated 24/7 guidance and support",
    },
    excerpt: {
      fr: "Un point d'accueil dédié dès le portail pour orienter les usagers, fluidifier le parcours et traiter les demandes en temps réel.",
      en: "A dedicated support desk right from the main entrance to guide visitors and resolve requests in real time.",
    },
    body: [
      {
        fr: "Parce que l'humanisation des soins commence dès l'accueil, la Maison du Patient accompagne désormais chaque patient et sa famille 24 heures sur 24 et 7 jours sur 7.",
        en: "Because compassionate care begins at arrival, the Patient House welcomes and assists every patient and family 24 hours a day, 7 days a week.",
      },
    ],
    image: "/images/campus/direction-building.webp",
  },
  {
    slug: "accreditation-iso-trois-laboratoires",
    category: { fr: "Communiqués", en: "Press Releases" },
    categoryKey: "communiques",
    dateISO: "2026-11-02",
    dateLabel: { fr: "2 novembre 2026", en: "November 2, 2026" },
    readTime: "4 min",
    title: {
      fr: "Trois laboratoires biologiques accrédités aux normes ISO",
      en: "Three clinical biology laboratories earn ISO accreditation",
    },
    excerpt: {
      fr: "Une reconnaissance majeure de la fiabilité et de la rigueur de nos analyses médicales au service des diagnostics cliniques.",
      en: "A major milestone recognizing the accuracy and quality assurance of our clinical laboratory diagnostics.",
    },
    body: [
      {
        fr: "L'engagement qualité de nos équipes de biologie clinique est consacré par l'accréditation ISO de trois unités clés, renforçant la sécurité des diagnostics pour chaque patient.",
        en: "Our laboratory teams' commitment to clinical rigor has been recognized with international ISO accreditation across three core units.",
      },
    ],
    image: "/images/campus/stethoscope.webp",
  },
  {
    slug: "bilan-journees-portes-ouvertes-pediatrie",
    category: { fr: "Événements", en: "Events" },
    categoryKey: "evenements",
    dateISO: "2026-11-02",
    dateLabel: { fr: "2 novembre 2026", en: "November 2, 2026" },
    readTime: "3 min",
    title: {
      fr: "Journées portes ouvertes au Pavillon Samuel Eto'o Fils",
      en: "Open house days at Samuel Eto'o Fils Pediatric Pavilion",
    },
    excerpt: {
      fr: "Les familles de Douala ont découvert les unités de néonatologie et les urgences pédiatriques lors d'ateliers de prévention.",
      en: "Families in Douala toured the neonatology and pediatric emergency units during preventive health workshops.",
    },
    body: [
      {
        fr: "Parents, jeunes mamans et associations ont visité nos équipes pédiatriques et échangé sur le calendrier vaccinal, la nutrition infantile et les réflexes d'urgence.",
        en: "Parents and community groups met our pediatric teams for workshops on childhood immunization, nutrition, and emergency readiness.",
      },
    ],
    image: "/images/gallery/pediatrie-urgences-1.webp",
  },
  {
    slug: "partenariats-assurances-prise-en-charge",
    category: { fr: "Partenariats", en: "Partnerships" },
    categoryKey: "partenariats",
    dateISO: "2026-11-02",
    dateLabel: { fr: "2 novembre 2026", en: "November 2, 2026" },
    readTime: "3 min",
    title: {
      fr: "Simplification des prises en charge avec nos assureurs partenaires",
      en: "Streamlined billing with partner health insurance networks",
    },
    excerpt: {
      fr: "Plus de 20 compagnies d'assurances et entreprises conventionnées bénéficient d'un guichet fluide dès l'admission.",
      en: "Over 20 partner insurance providers and corporate plans now benefit from streamlined intake processing.",
    },
    body: [
      {
        fr: "Les patients couverts par une assurance ou une convention employeur disposent désormais d'une vérification accélérée dès la prise de rendez-vous.",
        en: "Insured patients and corporate beneficiaries now enjoy streamlined verification during appointment scheduling.",
      },
    ],
    image: "/images/gallery/maternite-1.webp",
  },
  {
    slug: "laquintinie-lance-les-celebrations-de-ses-95-ans",
    category: { fr: "95 ans de Laquintinie", en: "95th Anniversary" },
    categoryKey: "95-ans",
    dateISO: "2026-10-02",
    dateLabel: { fr: "2 octobre 2026", en: "October 2, 2026" },
    readTime: "5 min",
    title: {
      fr: "Laquintinie lance les célébrations de ses 95 ans",
      en: "Laquintinie launches its 95th anniversary celebrations",
    },
    excerpt: {
      fr: "Un programme d'un an pour célébrer près d'un siècle de soins, d'enseignement médical et de recherche à Douala.",
      en: "A year-long program celebrating nearly a century of clinical care, medical education, and research in Douala.",
    },
    body: [
      {
        fr: "Depuis 1931, l'Hôpital Laquintinie accompagne des générations de Camerounais. Cette année anniversaire met à l'honneur nos pionniers, nos équipes soignantes et l'innovation hospitalière.",
        en: "Since 1931, Laquintinie Hospital has served generations across Cameroon. This anniversary celebrates our heritage, care teams, and digital transformation.",
      },
    ],
    image: "/images/campus/pavillon-aerial.webp",
  },
  {
    slug: "depistage-gratuit-hypertension-octobre",
    category: { fr: "Campagnes", en: "Campaigns" },
    categoryKey: "campagnes",
    dateISO: "2026-09-29",
    dateLabel: { fr: "29 septembre 2026", en: "September 29, 2026" },
    readTime: "3 min",
    title: {
      fr: "Dépistage gratuit de l'hypertension tout le mois d'octobre",
      en: "Free hypertension screening throughout October",
    },
    excerpt: {
      fr: "Rendez-vous au hall des consultations du lundi au vendredi pour un contrôle tensionnel encadré par notre pôle de cardiologie.",
      en: "Visit the outpatient lobby Monday to Friday for free blood pressure checks supervised by our cardiology team.",
    },
    body: [
      {
        fr: "Souvent silencieuse, l'hypertension artérielle peut être maîtrisée grâce à un dépistage précoce. Nos équipes vous accueillent chaque matin sans rendez-vous.",
        en: "Often silent, hypertension is easily managed when detected early. Our teams welcome visitors every morning without prior booking.",
      },
    ],
    image: "/images/gallery/cardio-2.webp",
  },
  {
    slug: "rendez-vous-en-ligne-application-mobile",
    category: { fr: "Innovations", en: "Innovations" },
    categoryKey: "innovations",
    dateISO: "2026-09-22",
    dateLabel: { fr: "22 septembre 2026", en: "September 22, 2026" },
    readTime: "4 min",
    title: {
      fr: "Rendez-vous en ligne : l'application mobile arrive bientôt",
      en: "Online booking: the MyLaquintinie mobile app is coming soon",
    },
    excerpt: {
      fr: "Réservation en quelques clics, paiement sécurisé, reçu QR code et orientation au sein du campus.",
      en: "Quick booking, secure payment, QR confirmation receipts, and campus navigation.",
    },
    body: [
      {
        fr: "Déjà disponible sur cette plateforme web sans création de compte, la prise de rendez-vous en ligne sera prochainement complétée par l'application mobile officielle MyLaquintinie.",
        en: "Already live on this web portal without account creation, online booking will soon be complemented by the official MyLaquintinie mobile app.",
      },
    ],
    image: "/images/campus/app-phone-appointment.webp",
  },
  {
    slug: "rentree-academique-internes-2026",
    category: { fr: "Santé", en: "Health" },
    categoryKey: "sante",
    dateISO: "2026-09-01",
    dateLabel: { fr: "1er septembre 2026", en: "September 1, 2026" },
    readTime: "3 min",
    title: {
      fr: "Accueil des nouveaux internes et médecins en spécialisation",
      en: "Welcoming new medical interns and residents",
    },
    excerpt: {
      fr: "Centre d'application universitaire de premier plan, Laquintinie forme chaque année la relève médicale et paramédicale.",
      en: "As a premier university teaching hospital, Laquintinie trains the next generation of physicians and nurses.",
    },
    body: [
      {
        fr: "Nos 40 enseignants hospitalo-universitaires accompagnent cette nouvelle promotion dans les services cliniques, chirurgicaux et biologiques.",
        en: "Our 40 medical school faculty mentors guide this incoming cohort across clinical, surgical, and laboratory units.",
      },
    ],
    image: "/images/gallery/chirurgie-bloc-2.webp",
  },
  {
    slug: "modernisation-blocs-operatoires-chirurgie",
    category: { fr: "Actualités", en: "News" },
    categoryKey: "actualites",
    dateISO: "2026-08-25",
    dateLabel: { fr: "25 août 2026", en: "August 25, 2026" },
    readTime: "4 min",
    title: {
      fr: "Réhabilitation des circuits opératoires et de stérilisation centrale",
      en: "Upgraded surgical pathways and central sterilization",
    },
    excerpt: {
      fr: "Des protocoles normatifs renforcés pour garantir la sécurité des interventions programmées et d'urgence.",
      en: "Enhanced sterilization and safety protocols for both scheduled and emergency surgical care.",
    },
    body: [
      {
        fr: "La sécurité des patients guide chaque investissement au cœur de nos blocs opératoires et de notre unité de stérilisation centrale.",
        en: "Patient safety drives every upgrade across our operating suites and central sterilization unit.",
      },
    ],
    image: "/images/gallery/chirurgie-batiments.webp",
  },
];

export interface HealthTip {
  slug: string;
  category: LocalizedText;
  format: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  departmentSlugs: string[];
  image: string;
}

export const HEALTH_TIPS: HealthTip[] = [
  {
    slug: "octobre-rose-importance-de-la-mammographie",
    category: { fr: "Prévention", en: "Prevention" },
    format: { fr: "Vidéo · 3 min", en: "Video · 3 min" },
    title: {
      fr: "Octobre Rose : l'importance de la mammographie",
      en: "Pink October: why regular mammography matters",
    },
    summary: {
      fr: "Dépister tôt sauve des vies. Découvrez quand réaliser votre bilan mammaire au Centre d'Imagerie de Laquintinie.",
      en: "Early screening saves lives. Learn when to schedule your breast imaging checkup at Laquintinie.",
    },
    departmentSlugs: ["gynecologie", "imagerie-explorations"],
    image: "/images/gallery/maternite-2.webp",
  },
  {
    slug: "bien-s-hydrater-au-quotidien",
    category: { fr: "Prévention", en: "Prevention" },
    format: { fr: "Lecture · 1 min", en: "Read · 1 min" },
    title: {
      fr: "Bien s'hydrater au quotidien sous climat tropical",
      en: "Daily hydration habits in a tropical climate",
    },
    summary: {
      fr: "Boire régulièrement de l'eau protège les reins, soutient le système cardiovasculaire et prévient les coups de chaleur.",
      en: "Consistent hydration protects kidney function, supports heart health, and prevents heat exhaustion.",
    },
    departmentSlugs: ["medecine-interne", "chirurgie-generale", "soins-pluridisciplinaires"],
    image: "/images/gallery/cardio-1.webp",
  },
  {
    slug: "asthme-bon-usage-de-linhalateur",
    category: { fr: "Maladies chroniques", en: "Chronic Care" },
    format: { fr: "Vidéo · 4 min", en: "Video · 4 min" },
    title: {
      fr: "Asthme : bien utiliser son inhalateur",
      en: "Asthma: proper inhaler technique",
    },
    summary: {
      fr: "Danielle BOUNOUNA, infirmière principale, explique les gestes essentiels pour maîtriser efficacement les crises respiratoires.",
      en: "Senior nurse Danielle BOUNOUNA demonstrates essential steps for effective asthma inhaler usage.",
    },
    departmentSlugs: ["pediatrie", "pharmacie", "urgences-reanimation"],
    image: "/images/gallery/pediatrie-urgences-2.webp",
  },
  {
    slug: "se-laver-les-mains-correctement",
    category: { fr: "Hygiène & Prévention", en: "Hygiene" },
    format: { fr: "Lecture · 1 min", en: "Read · 1 min" },
    title: {
      fr: "Se laver les mains correctement en 6 étapes",
      en: "Proper handwashing in 6 simple steps",
    },
    summary: {
      fr: "Le lavage des mains limite la transmission de nombreuses infections hospitalières et familiales.",
      en: "Effective hand hygiene significantly reduces the spread of everyday and hospital infections.",
    },
    departmentSlugs: ["biologie-clinique", "urgences-reanimation", "trois-o"],
    image: "/images/gallery/neonatologie-1.webp",
  },
];

export interface GovernanceMember {
  name: string;
  role: LocalizedText;
  board: "direction" | "gestion";
  subGroup?: LocalizedText;
  photo?: string;
}

export const GOVERNANCE_MEMBERS: GovernanceMember[] = [
  {
    name: "Dr Marie Solange NDOM EBONGUE",
    role: { fr: "Directeur de l’Hôpital", en: "Hospital Director" },
    board: "direction",
    photo: "/images/campus/director-general.webp",
  },
  {
    name: "Dr Josephine KAMDEM Epse WAMBO",
    role: { fr: "Conseiller Médical", en: "Medical Advisor" },
    board: "direction",
    photo: "/images/committees/conseiller-medical.webp",
  },
  {
    name: "Dr BALEPNA Jean-Yves",
    role: { fr: "Conseiller Médical Adjoint", en: "Deputy Medical Advisor" },
    board: "direction",
    photo: "/images/doctors/dr-balepna.avif",
  },
  {
    name: "Mme DIBONDJI née Constance DJENE",
    role: { fr: "Surveillante Générale", en: "Chief Nursing Officer" },
    board: "direction",
    photo: "/images/committees/surveillante-generale.webp",
  },
  {
    name: "M. Georges EKOLLO DICKA",
    role: { fr: "Économe", en: "Hospital Bursar" },
    board: "direction",
    photo: "/images/committees/econome.webp",
  },
  {
    name: "M. OTTO EKWALLA Manfred",
    role: { fr: "Chef de Département de l’Audit", en: "Head of Internal Audit" },
    board: "direction",
    photo: "/images/committees/chef-audit.webp",
  },
  {
    name: "M. Samuel MAKONGO",
    role: {
      fr: "Chef de Département Qualité, Coopération et Contentieux",
      en: "Head of Quality, Cooperation & Legal",
    },
    board: "direction",
    photo: "/images/committees/chef-qualite.webp",
  },
  {
    name: "Dr HAMZA ABOUBAKAR",
    role: { fr: "Chef de Département de la Pharmacie", en: "Head of Pharmacy Department" },
    board: "direction",
    photo: "/images/doctors/dr-hamza.jpg",
  },
  {
    name: "Dr Nathalie NTAGO KEUMEUGNE",
    role: { fr: "Chef de Service de la Médecine du Travail", en: "Head of Occupational Medicine" },
    board: "direction",
    photo: "/images/committees/chef-medecine-travail.webp",
  },
  {
    name: "M. NGUELE NKOLO Siméon Alfred",
    role: { fr: "Chef de la Cellule Informatique", en: "Head of IT Unit" },
    board: "direction",
    photo: "/images/committees/chef-informatique.webp",
  },
  {
    name: "Dr Roger MBASSA NDINE",
    role: {
      fr: "Président du Comité · Maire de la Ville de Douala",
      en: "Board Chair · Mayor of Douala",
    },
    board: "gestion",
    subGroup: { fr: "Bureau Exécutif", en: "Executive Board" },
    photo: "/images/committees/maire-douala.webp",
  },
  {
    name: "Dr Marie Solange NDOM EBONGUE",
    role: {
      fr: "Secrétaire · Directeur de l’Hôpital Laquintinie",
      en: "Secretary · Director of Laquintinie Hospital",
    },
    board: "gestion",
    subGroup: { fr: "Bureau Exécutif", en: "Executive Board" },
    photo: "/images/campus/director-general.webp",
  },
  {
    name: "Dr Jean Didier AFANE FONO",
    role: {
      fr: "Trésorier · Trésorier Payeur Général",
      en: "Treasurer · General Paymaster",
    },
    board: "gestion",
    subGroup: { fr: "Bureau Exécutif", en: "Executive Board" },
    photo: "/images/committees/tresorier-payeur-general.webp",
  },
  {
    name: "M. Charles YOPNDOI",
    role: {
      fr: "Délégué Régional de la Santé Publique pour le Littoral",
      en: "Littoral Regional Delegate of Public Health",
    },
    board: "gestion",
    subGroup: { fr: "Membres du Comité", en: "Committee Members" },
    photo: "/images/committees/delegue-regional.webp",
  },
  {
    name: "Dr Jérémie SOLLE SOLLE",
    role: {
      fr: "Premier Adjoint au Maire de la Ville de Douala",
      en: "First Deputy Mayor of Douala",
    },
    board: "gestion",
    subGroup: { fr: "Membres du Comité", en: "Committee Members" },
    photo: "/images/committees/premier-adjoint-maire.webp",
  },
  {
    name: "M. Jean Jacques LENGUE MALAPA",
    role: {
      fr: "Maire de la Commune d’Arrondissement de Douala 1er",
      en: "Mayor of Douala 1st District",
    },
    board: "gestion",
    subGroup: { fr: "Membres du Comité", en: "Committee Members" },
    photo: "/images/committees/maire-douala-1er.webp",
  },
];

export interface PartnerItem {
  id: string;
  name: string;
  category: "institution" | "assurance";
  logo: string;
}

export const PARTNERS: PartnerItem[] = [
  { id: "01", name: "AGL – Africa Global Logistics", category: "institution", logo: "/images/partners/partner-01.webp" },
  { id: "02", name: "Alubassa", category: "institution", logo: "/images/partners/partner-02.webp" },
  { id: "03", name: "Azur S.A.", category: "institution", logo: "/images/partners/partner-03.webp" },
  { id: "04", name: "BICEC", category: "institution", logo: "/images/partners/partner-04.webp" },
  { id: "05", name: "Camrail", category: "institution", logo: "/images/partners/partner-05.webp" },
  { id: "06", name: "Dangote Cement", category: "institution", logo: "/images/partners/partner-06.webp" },
  { id: "07", name: "Douala Port Security", category: "institution", logo: "/images/partners/partner-07.webp" },
  { id: "08", name: "Port Autonome de Douala", category: "institution", logo: "/images/partners/partner-08.webp" },
  { id: "09", name: "Plantation du Haut Penja", category: "institution", logo: "/images/partners/partner-09.webp" },
  { id: "10", name: "SAFACAM", category: "institution", logo: "/images/partners/partner-10.webp" },
  { id: "11", name: "SONARA", category: "institution", logo: "/images/partners/partner-11.webp" },
  { id: "12", name: "SOCAPALM", category: "institution", logo: "/images/partners/partner-12.webp" },
  { id: "13", name: "SOCADEL", category: "institution", logo: "/images/partners/partner-13.webp" },
  { id: "14", name: "Activa Assurances", category: "assurance", logo: "/images/partners/partner-14.webp" },
  { id: "15", name: "Afri Insurance", category: "assurance", logo: "/images/partners/partner-15.webp" },
  { id: "16", name: "AFG Assurances", category: "assurance", logo: "/images/partners/partner-16.webp" },
  { id: "17", name: "AGC Assurances", category: "assurance", logo: "/images/partners/partner-17.webp" },
  { id: "18", name: "AREA Assurances", category: "assurance", logo: "/images/partners/partner-18.webp" },
  { id: "19", name: "ASCOMA", category: "assurance", logo: "/images/partners/partner-19.webp" },
  { id: "20", name: "AXA Assurances", category: "assurance", logo: "/images/partners/partner-20.webp" },
  { id: "21", name: "Belife Groupe", category: "assurance", logo: "/images/partners/partner-21.webp" },
  { id: "22", name: "EXCA", category: "assurance", logo: "/images/partners/partner-22.webp" },
  { id: "23", name: "Chanas Assurances", category: "assurance", logo: "/images/partners/partner-23.webp" },
  { id: "24", name: "GGA Groupe", category: "assurance", logo: "/images/partners/partner-24.webp" },
];

export const TARIFFS_SUMMARY = [
  {
    id: "dr-gp",
    label: {
      fr: "Consultation avec un Docteur (Dr) · Grand public",
      en: "Doctor Consultation (MD) · Standard",
    },
    price: "4 000 FCFA",
    note: { fr: "Consultations externes", en: "Outpatient clinic" },
  },
  {
    id: "pr-gp",
    label: {
      fr: "Consultation avec un Professeur (Pr) · Grand public",
      en: "Professor Consultation (Prof) · Standard",
    },
    price: "7 000 FCFA",
    note: { fr: "Consultations externes", en: "Outpatient clinic" },
  },
  {
    id: "dr-perso",
    label: {
      fr: "Consultation avec un Docteur (Dr) · Personnalisée",
      en: "Doctor Consultation (MD) · Personalized",
    },
    price: "15 000 FCFA",
    note: { fr: "Choix du praticien & créneau dédié", en: "Preferred doctor & dedicated slot" },
  },
  {
    id: "pr-perso",
    label: {
      fr: "Consultation avec un Professeur (Pr) · Personnalisée",
      en: "Professor Consultation (Prof) · Personalized",
    },
    price: "20 000 FCFA",
    note: { fr: "Choix du professeur & créneau dédié", en: "Preferred professor & dedicated slot" },
  },
  {
    id: "ecg",
    label: { fr: "Électrocardiogramme (ECG) 12 dérivations", en: "12-Lead Electrocardiogram (ECG)" },
    price: "8 000 FCFA",
    note: { fr: "Cardiologie", en: "Cardiology" },
  },
  {
    id: "mammo",
    label: { fr: "Mammographie bilatérale de dépistage", en: "Bilateral Screening Mammography" },
    price: "20 000 FCFA",
    note: { fr: "Imagerie médicale", en: "Medical imaging" },
  },
];

export const JOURNEY_STEPS = [
  {
    number: "01",
    title: { fr: "Avant votre venue", en: "Before your visit" },
    subtitle: {
      fr: "Quelques gestes simples pour que votre visite se passe sans attente inutile.",
      en: "Simple preparation steps for a smooth, wait-free appointment.",
    },
    points: [
      { fr: "Réservez en ligne sans compte ou par téléphone", en: "Book online with no account or by phone" },
      { fr: "Préparez votre CNI, carnet médical, ordonnances & assurance", en: "Bring ID, medical booklet, prescriptions & insurance" },
      { fr: "Repérez votre bâtiment et l'horaire de consultation", en: "Check your pavilion and consultation schedule" },
    ],
  },
  {
    number: "02",
    title: { fr: "À votre arrivée", en: "Upon arrival" },
    subtitle: {
      fr: "Orientation immédiate dès le portail par les équipes d'accueil et la Maison du Patient.",
      en: "Immediate guidance at the entrance by our welcome desk and Patient House.",
    },
    points: [
      { fr: "Présentez votre reçu ou code QR de rendez-vous", en: "Show your booking receipt or QR code" },
      { fr: "Validation rapide de votre prise en charge assurance", en: "Rapid verification of corporate or insurance coverage" },
      { fr: "Accompagnement vers le hall des consultations", en: "Guided escort to the outpatient hall" },
    ],
  },
  {
    number: "03",
    title: { fr: "Pendant la prise en charge", en: "During your consultation" },
    subtitle: {
      fr: "Écoute attentive, examen clinique complet et coordination directe avec les plateaux techniques.",
      en: "Attentive clinical care and seamless coordination with diagnostic units.",
    },
    points: [
      { fr: "Consultation médicale en toute confidentialité", en: "Confidential medical consultation" },
      { fr: "Orientation vers le laboratoire ISO ou l'imagerie si requis", en: "Direct referral to ISO labs or imaging if needed" },
      { fr: "Explication claire des prescriptions et du traitement", en: "Clear explanation of prescriptions and care plan" },
    ],
  },
  {
    number: "04",
    title: { fr: "Après votre passage", en: "After your visit" },
    subtitle: {
      fr: "Continuité des soins entre l'hôpital, la pharmacie 24h/24 et vos visites de contrôle.",
      en: "Continuity of care through our 24/7 pharmacy and scheduled follow-ups.",
    },
    points: [
      { fr: "Retrait des traitements à la Pharmacie Centrale (24h/24)", en: "Collect treatments at the 24/7 Central Pharmacy" },
      { fr: "Retrait sécurisé des résultats d'analyses au guichet dédié", en: "Secure collection of diagnostic results at the lab desk" },
      { fr: "Planification de la visite de suivi", en: "Scheduling of your follow-up consultation" },
    ],
  },
  {
    number: "05",
    title: { fr: "Maison du Patient (24h/24)", en: "Patient House (24/7)" },
    subtitle: {
      fr: "Une cellule d'écoute permanente dédiée au recueil et à la résolution des demandes.",
      en: "A round-the-clock advocacy desk dedicated to resolving questions and feedback.",
    },
    points: [
      { fr: "Permanence physique et téléphonique 24h/24 et 7j/7", en: "24/7 on-site and phone assistance" },
      { fr: "Suivi personnalisé des réclamations et suggestions", en: "Personalized resolution of feedback and requests" },
      { fr: "Médiation bienveillante pour les familles", en: "Compassionate mediation for patients and families" },
    ],
  },
];

export const INSTITUTIONAL_VALUES = [
  {
    title: { fr: "Qualité des soins", en: "Clinical Quality" },
    desc: { fr: "Pratiques médicales normatives et évaluées.", en: "Evaluated, protocol-driven clinical practices." },
  },
  {
    title: { fr: "Sécurité des patients", en: "Patient Safety" },
    desc: { fr: "Prévention des risques à chaque étape.", en: "Rigorous safety checks at every stage." },
  },
  {
    title: { fr: "Accessibilité", en: "Accessibility" },
    desc: { fr: "Des soins ouverts à tous, sans distinction.", en: "Equitable public healthcare open to everyone." },
  },
  {
    title: { fr: "Humanisation", en: "Humanization" },
    desc: { fr: "L'écoute et la dignité au cœur de l'accueil.", en: "Dignity and attentive listening first." },
  },
  {
    title: { fr: "Innovation", en: "Innovation" },
    desc: { fr: "Plateau modernisé et parcours digitalisés.", en: "Modern equipment and streamlined digital care." },
  },
  {
    title: { fr: "Éthique", en: "Medical Ethics" },
    desc: { fr: "Respect, confidentialité et transparence.", en: "Respect, data privacy, and transparency." },
  },
  {
    title: { fr: "Formation", en: "Education" },
    desc: { fr: "Transmission des savoirs aux soignants.", en: "Training future physicians and nurses." },
  },
  {
    title: { fr: "Recherche", en: "Clinical Research" },
    desc: { fr: "Études cliniques et progrès médical.", en: "Advancing regional medical science." },
  },
];
