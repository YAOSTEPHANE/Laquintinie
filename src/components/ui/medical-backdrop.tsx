import React from "react";

export type MedicalBackdropVariant =
  | "hero"
  | "clinical"
  | "campus"
  | "dark-clinical"
  | "emergency";

interface MedicalBackdropProps {
  variant?: MedicalBackdropVariant;
  className?: string;
}

function MedicalCrossSvg({
  className = "",
  gradientId,
  fromColor = "#0EA5E9",
  toColor = "#0D9488",
}: {
  className?: string;
  gradientId?: string;
  fromColor?: string;
  toColor?: string;
}) {
  if (gradientId) {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={fromColor} />
            <stop offset="100%" stopColor={toColor} />
          </linearGradient>
        </defs>
        <path
          fill={`url(#${gradientId})`}
          d="M9 2a1 1 0 0 0-1 1v5H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h5v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-5h5a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-5V3a1 1 0 0 0-1-1H9Z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M9 2a1 1 0 0 0-1 1v5H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h5v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-5h5a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-5V3a1 1 0 0 0-1-1H9Z" />
    </svg>
  );
}

/**
 * MedicalBackdrop
 * Reusable animated & illuminated hospital geometric backdrop layers.
 * Strictly wrapped in `pointer-events-none select-none absolute inset-0 overflow-hidden`
 * so shapes never cause horizontal overflow or block clicks.
 */
export function MedicalBackdrop({
  variant = "clinical",
  className = "",
}: MedicalBackdropProps) {
  if (variant === "hero") {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none select-none absolute inset-0 overflow-hidden ${className}`}
      >
        <div className="bg-arch-grid absolute inset-0 opacity-75" />

        {/* 3 Breathing Aurora Orbs */}
        <div className="animate-aura-breathe absolute -right-24 -top-28 h-[520px] w-[520px] rounded-full bg-[#0EA5E9]/22 blur-3xl" />
        <div className="animate-aura-breathe-delayed absolute left-[24%] -top-24 h-[380px] w-[380px] rounded-full bg-[#0A66C2]/16 blur-3xl" />
        <div className="animate-aura-breathe absolute -left-24 top-40 h-[440px] w-[440px] rounded-full bg-[#14B8A6]/18 blur-3xl" />

        {/* Sweeping Wave Ribbons + Live Animated ECG Heartbeat Laser Trace */}
        <svg
          viewBox="0 0 1440 720"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id="hero-wave-fill" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(186, 230, 253, 0.65)" />
              <stop offset="100%" stopColor="rgba(204, 251, 241, 0.35)" />
            </linearGradient>
            <linearGradient id="hero-pulse-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0A66C2" />
              <stop offset="50%" stopColor="#0EA5E9" />
              <stop offset="100%" stopColor="#14B8A6" />
            </linearGradient>
          </defs>
          <path
            d="M0,490 C320,395 560,590 920,465 C1180,380 1320,445 1440,390 L1440,720 L0,720 Z"
            fill="url(#hero-wave-fill)"
          />
          <path
            d="M-60,340 C260,240 520,450 860,330 C1140,230 1320,310 1500,240"
            fill="none"
            stroke="rgba(10, 102, 194, 0.14)"
            strokeWidth="2"
          />
          <path
            d="M-60,395 C280,295 560,495 900,375 C1170,280 1340,355 1500,295"
            fill="none"
            stroke="rgba(13, 148, 136, 0.14)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
          {/* Live animated ECG heartbeat trace */}
          <path
            d="M0,195 L320,195 L350,195 L370,138 L392,248 L416,105 L438,224 L460,195 L860,195 L890,195 L910,148 L930,236 L952,118 L972,216 L992,195 L1440,195"
            fill="none"
            stroke="rgba(10, 102, 194, 0.14)"
            strokeWidth="1.5"
            pathLength="1200"
          />
          <path
            d="M0,195 L320,195 L350,195 L370,138 L392,248 L416,105 L438,224 L460,195 L860,195 L890,195 L910,148 L930,236 L952,118 L972,216 L992,195 L1440,195"
            fill="none"
            stroke="url(#hero-pulse-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            pathLength="1200"
            className="animate-ecg-trace"
            style={{ filter: "drop-shadow(0 0 8px rgba(14,165,233,0.65))" }}
          />
        </svg>

        {/* 3 Floating Illuminated 3D Glass Capsules (rotation nested inside float) */}
        <div className="animate-float-slow absolute -right-10 top-12 h-72 w-36">
          <div className="glow-capsule-light h-full w-full rotate-[-28deg] rounded-full border border-white/80" />
        </div>
        <div className="animate-float-reverse absolute -left-8 bottom-14 h-56 w-28">
          <div className="glow-capsule-light h-full w-full rotate-[24deg] rounded-full border border-teal-200/70" />
        </div>
        <div className="animate-float-slow hidden md:block absolute left-[28%] top-12 h-28 w-14">
          <div className="glow-capsule-light h-full w-full rotate-[38deg] rounded-full border border-sky-200/80 opacity-85" />
        </div>

        {/* Counter-Rotating Diagnostic Radar Ring with Glowing Satellites */}
        <div className="animate-orbit-spin absolute right-[9%] top-10 hidden h-72 w-72 lg:block">
          <svg viewBox="0 0 320 320" className="h-full w-full text-[#0A66C2]/22" fill="none">
            <circle cx="160" cy="160" r="144" stroke="currentColor" strokeWidth="1.4" strokeDasharray="7 7" />
            <circle cx="160" cy="160" r="106" stroke="rgba(14,165,233,0.28)" strokeWidth="1.2" />
            <circle cx="160" cy="160" r="68" stroke="rgba(20,184,166,0.25)" strokeWidth="1" />
            <circle
              cx="160"
              cy="16"
              r="5.5"
              fill="#0EA5E9"
              style={{ filter: "drop-shadow(0 0 8px rgba(14,165,233,0.9))" }}
            />
            <circle
              cx="266"
              cy="160"
              r="4.5"
              fill="#14B8A6"
              style={{ filter: "drop-shadow(0 0 8px rgba(20,184,166,0.9))" }}
            />
          </svg>
        </div>

        {/* Dot Matrix & 4 Illuminated Floating Medical Crosses */}
        <div className="bg-dot-matrix absolute right-6 top-8 h-36 w-36 opacity-50" />
        <div className="animate-float-slow absolute left-[7%] top-20 opacity-30">
          <MedicalCrossSvg className="glow-cross-light h-10 w-10" gradientId="hero-cross-1" />
        </div>
        <div className="animate-float-reverse absolute right-[25%] top-[24%] opacity-35">
          <MedicalCrossSvg className="glow-cross-light h-12 w-12" gradientId="hero-cross-2" />
        </div>
        <div className="animate-float-slow absolute left-[43%] bottom-24 opacity-25">
          <MedicalCrossSvg className="glow-cross-light h-8 w-8" gradientId="hero-cross-3" />
        </div>
        <div className="animate-float-reverse hidden sm:block absolute right-14 bottom-20 opacity-30">
          <MedicalCrossSvg className="glow-cross-light h-11 w-11" gradientId="hero-cross-4" />
        </div>
      </div>
    );
  }

  if (variant === "campus") {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none select-none absolute inset-0 overflow-hidden ${className}`}
      >
        <div className="bg-arch-grid absolute inset-0 opacity-60" />

        {/* Luminous Architectural Quarter-Arches + Breathing Cyan Halo */}
        <div className="animate-aura-breathe absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gradient-to-bl from-[#BAE6FD]/55 via-[#E0F2FE]/35 to-transparent blur-xl" />
        <div className="animate-aura-breathe-delayed absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-[#99F6E4]/45 via-[#CCFBF1]/25 to-transparent blur-xl" />

        {/* Floating Illuminated Glass Capsule */}
        <div className="animate-float-slow absolute right-10 top-10 h-48 w-24">
          <div className="glow-capsule-light h-full w-full rotate-[18deg] rounded-full border border-sky-200/80" />
        </div>

        {/* Rotating Architectural Compass Ring with Satellite Beacon */}
        <div className="animate-orbit-spin absolute -left-10 top-12 h-56 w-56">
          <svg viewBox="0 0 240 240" className="h-full w-full text-[#0A66C2]/18" fill="none">
            <circle cx="120" cy="120" r="105" stroke="currentColor" strokeWidth="1.3" strokeDasharray="5 5" />
            <circle cx="120" cy="120" r="72" stroke="rgba(13,148,136,0.22)" strokeWidth="1" />
            <circle
              cx="120"
              cy="15"
              r="4.5"
              fill="#0EA5E9"
              style={{ filter: "drop-shadow(0 0 6px rgba(14,165,233,0.8))" }}
            />
          </svg>
        </div>

        <div className="animate-float-reverse absolute right-[8%] top-12 opacity-25">
          <MedicalCrossSvg className="glow-cross-light h-10 w-10" gradientId="campus-cross-1" />
        </div>
        <div className="animate-float-slow absolute left-[14%] bottom-12 opacity-25">
          <MedicalCrossSvg className="glow-cross-light h-8 w-8" gradientId="campus-cross-2" />
        </div>
      </div>
    );
  }

  if (variant === "dark-clinical") {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none select-none absolute inset-0 overflow-hidden ${className}`}
      >
        <div className="bg-arch-grid-dark absolute inset-0 opacity-50" />

        {/* Bioluminescent Cyan & Emerald Breathing Halos */}
        <div className="animate-aura-breathe absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.32),transparent_68%)]" />
        <div className="animate-aura-breathe-delayed absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.24),transparent_70%)]" />

        {/* Floating Neon-Rimmed Glass Capsules */}
        <div className="animate-float-slow absolute right-10 top-8 h-52 w-24">
          <div className="glow-capsule-dark h-full w-full rotate-[-24deg] rounded-full border border-sky-300/30" />
        </div>
        <div className="animate-float-reverse absolute left-8 bottom-8 h-40 w-20">
          <div className="glow-capsule-dark h-full w-full rotate-[22deg] rounded-full border border-teal-300/25" />
        </div>

        {/* Neon Cyan-Emerald Traveling ECG Laser Trace */}
        <svg
          viewBox="0 0 1200 180"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-4 h-24 w-full"
          fill="none"
        >
          <path
            d="M0,110 L260,110 L290,110 L310,60 L330,150 L352,32 L372,132 L392,110 L760,110 L790,110 L810,75 L828,142 L846,45 L864,126 L882,110 L1200,110"
            stroke="rgba(56, 189, 248, 0.16)"
            strokeWidth="1.5"
            pathLength="1200"
          />
          <path
            d="M0,110 L260,110 L290,110 L310,60 L330,150 L352,32 L372,132 L392,110 L760,110 L790,110 L810,75 L828,142 L846,45 L864,126 L882,110 L1200,110"
            stroke="#38BDF8"
            strokeWidth="2.2"
            strokeLinecap="round"
            pathLength="1200"
            className="animate-ecg-trace"
            style={{ filter: "drop-shadow(0 0 10px rgba(56,189,248,0.85))" }}
          />
        </svg>

        {/* Counter-Rotating Glowing Orbital Rings with Beacons */}
        <div className="animate-orbit-spin absolute right-[14%] top-6 h-48 w-48">
          <svg viewBox="0 0 240 240" className="h-full w-full text-sky-300/25" fill="none">
            <circle cx="120" cy="120" r="108" stroke="currentColor" strokeWidth="1.2" strokeDasharray="6 6" />
            <circle
              cx="120"
              cy="12"
              r="4.5"
              fill="#38BDF8"
              style={{ filter: "drop-shadow(0 0 8px rgba(56,189,248,0.95))" }}
            />
          </svg>
        </div>
        <div className="animate-orbit-reverse absolute right-[14%] top-6 h-48 w-48">
          <svg viewBox="0 0 240 240" className="h-full w-full text-teal-300/25" fill="none">
            <circle cx="120" cy="120" r="72" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            <circle
              cx="192"
              cy="120"
              r="3.5"
              fill="#2DD4BF"
              style={{ filter: "drop-shadow(0 0 8px rgba(45,212,191,0.95))" }}
            />
          </svg>
        </div>

        <div className="animate-float-slow absolute left-[10%] top-10">
          <MedicalCrossSvg className="glow-cross-dark h-9 w-9 text-sky-300/25" />
        </div>
        <div className="animate-float-reverse absolute right-[6%] bottom-10">
          <MedicalCrossSvg className="glow-cross-dark h-10 w-10 text-teal-300/25" />
        </div>
      </div>
    );
  }

  if (variant === "emergency") {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none select-none absolute inset-0 overflow-hidden ${className}`}
      >
        <div className="bg-arch-grid-dark absolute inset-0 opacity-40" />

        {/* Breathing Crimson & Clinical Sky Emergency Beacons */}
        <div className="animate-aura-breathe absolute -left-20 top-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(239,68,68,0.30),transparent_68%)]" />
        <div className="animate-aura-breathe-delayed absolute -bottom-20 right-10 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.22),transparent_70%)]" />

        {/* Glowing Red-to-Coral Animated ECG Heartbeat Trace */}
        <svg
          viewBox="0 0 1200 180"
          preserveAspectRatio="none"
          className="absolute inset-x-0 top-1/2 h-28 w-full -translate-y-1/2"
          fill="none"
        >
          <defs>
            <linearGradient id="er-pulse-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="60%" stopColor="#FB7185" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
          </defs>
          <path
            d="M0,100 L180,100 L205,100 L224,48 L244,148 L266,22 L286,128 L306,100 L640,100 L665,100 L682,62 L700,136 L718,36 L736,122 L754,100 L1200,100"
            stroke="rgba(248, 113, 113, 0.18)"
            strokeWidth="1.5"
            pathLength="1200"
          />
          <path
            d="M0,100 L180,100 L205,100 L224,48 L244,148 L266,22 L286,128 L306,100 L640,100 L665,100 L682,62 L700,136 L718,36 L736,122 L754,100 L1200,100"
            stroke="url(#er-pulse-grad)"
            strokeWidth="2.4"
            strokeLinecap="round"
            pathLength="1200"
            className="animate-ecg-trace"
            style={{ filter: "drop-shadow(0 0 10px rgba(239,68,68,0.85))" }}
          />
        </svg>

        {/* Rotating Emergency Triage Radar Rings */}
        <div className="animate-orbit-spin absolute right-[8%] bottom-8 hidden h-48 w-48 lg:block">
          <svg viewBox="0 0 220 220" className="h-full w-full text-red-400/20" fill="none">
            <circle cx="110" cy="110" r="96" stroke="currentColor" strokeWidth="1.2" strokeDasharray="5 5" />
            <circle cx="110" cy="14" r="4" fill="#F87171" style={{ filter: "drop-shadow(0 0 8px rgba(248,113,113,0.95))" }} />
          </svg>
        </div>

        <div className="animate-float-slow absolute right-[12%] top-12">
          <MedicalCrossSvg
            className="h-11 w-11 text-red-400/25"
          />
        </div>
        <div className="animate-float-reverse absolute left-[8%] bottom-12">
          <MedicalCrossSvg className="glow-cross-dark h-8 w-8 text-sky-300/22" />
        </div>
      </div>
    );
  }

  // Default "clinical" variant (for #F4F8FC surfaces & secondary page bodies)
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="bg-arch-grid absolute inset-0 opacity-55" />

      {/* Breathing Sky-Cyan & Emerald-Teal Ambient Orbs */}
      <div className="animate-aura-breathe absolute -right-24 top-10 h-80 w-80 rounded-full bg-[#0EA5E9]/16 blur-3xl" />
      <div className="animate-aura-breathe-delayed absolute -left-20 bottom-10 h-72 w-72 rounded-full bg-[#14B8A6]/15 blur-3xl" />

      {/* 2 Floating Illuminated 3D Glass Capsules */}
      <div className="animate-float-slow absolute right-6 top-8 h-52 w-24">
        <div className="glow-capsule-light h-full w-full rotate-[-26deg] rounded-full border border-sky-200/80" />
      </div>
      <div className="animate-float-reverse absolute left-8 bottom-10 h-44 w-20">
        <div className="glow-capsule-light h-full w-full rotate-[20deg] rounded-full border border-teal-200/75" />
      </div>

      {/* Animated Glowing ECG Vital-Signs Trace */}
      <svg
        viewBox="0 0 1200 140"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-12 h-20 w-full"
        fill="none"
      >
        <path
          d="M0,80 L340,80 L365,80 L382,42 L400,115 L418,24 L436,102 L454,80 L880,80 L905,80 L920,52 L936,105 L952,32 L968,94 L984,80 L1200,80"
          stroke="rgba(10, 102, 194, 0.12)"
          strokeWidth="1.5"
          pathLength="1200"
        />
        <path
          d="M0,80 L340,80 L365,80 L382,42 L400,115 L418,24 L436,102 L454,80 L880,80 L905,80 L920,52 L936,105 L952,32 L968,94 L984,80 L1200,80"
          stroke="#0EA5E9"
          strokeWidth="2.1"
          strokeLinecap="round"
          pathLength="1200"
          className="animate-ecg-trace opacity-65"
          style={{ filter: "drop-shadow(0 0 6px rgba(14,165,233,0.55))" }}
        />
      </svg>

      {/* Slowly Rotating Orbital Ring with Satellite Dot */}
      <div className="animate-orbit-spin absolute -right-8 bottom-10 h-44 w-44">
        <svg viewBox="0 0 220 220" className="h-full w-full text-[#0A66C2]/18" fill="none">
          <circle cx="110" cy="110" r="96" stroke="currentColor" strokeWidth="1.2" strokeDasharray="5 5" />
          <circle cx="110" cy="110" r="64" stroke="rgba(13,148,136,0.20)" strokeWidth="1" />
          <circle
            cx="110"
            cy="14"
            r="4"
            fill="#0EA5E9"
            style={{ filter: "drop-shadow(0 0 6px rgba(14,165,233,0.8))" }}
          />
        </svg>
      </div>

      {/* 3 Floating Illuminated Medical Crosses */}
      <div className="animate-float-slow absolute left-[12%] top-16 opacity-25">
        <MedicalCrossSvg className="glow-cross-light h-8 w-8" gradientId="clin-cross-1" />
      </div>
      <div className="animate-float-reverse absolute right-[16%] bottom-16 opacity-25">
        <MedicalCrossSvg className="glow-cross-light h-9 w-9" gradientId="clin-cross-2" />
      </div>
      <div className="animate-float-slow hidden md:block absolute left-[48%] bottom-10 opacity-20">
        <MedicalCrossSvg className="glow-cross-light h-7 w-7" gradientId="clin-cross-3" />
      </div>
    </div>
  );
}
