"use client";

import Image from "next/image";
import React, { useState } from "react";
import { ExternalLink, MapPin, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { HOSPITAL_CONTACT } from "@/data/hospital-data";

/**
 * Privacy-First Click-to-Load Google Maps Facade
 * Prevents loading 8 third-party Google cookies until the user explicitly requests the live map.
 * Campus photograph renders cleanly without any overlaid text or gradient scrims.
 */
export function VisitMapFacade() {
  const { t } = useLanguage();
  const [mapActive, setMapActive] = useState(false);

  return (
    <div className="overflow-hidden rounded-3xl border border-[#08162B]/12 bg-[#08162B] shadow-premium">
      {mapActive ? (
        <div className="relative aspect-[16/10] w-full bg-slate-100">
          <iframe
            title={t({
              fr: "Carte interactive de l'Hôpital Laquintinie de Douala",
              en: "Interactive map of Laquintinie Hospital Douala",
            })}
            src={HOSPITAL_CONTACT.mapEmbedUrl}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      ) : (
        <div>
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src="/images/campus/pavillon-aerial.webp"
              alt={t({
                fr: "Vue aérienne du campus de l'Hôpital Laquintinie à Ngodi Akwa, Douala",
                en: "Aerial view of Laquintinie Hospital campus in Ngodi Akwa, Douala",
              })}
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover"
            />
          </div>

          <div className="p-6 text-white sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white">
                <MapPin className="h-3.5 w-3.5 text-[#DFB860]" aria-hidden="true" />
                {HOSPITAL_CONTACT.address} · Douala
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-1 text-[11px] font-medium text-emerald-200">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                {t({ fr: "0 cookie tiers au chargement", en: "0 third-party cookies on load" })}
              </span>
            </div>

            <p className="mt-4 text-lg font-bold sm:text-xl">
              Hôpital Laquintinie de Douala
            </p>
            <p className="mt-1 text-xs text-slate-300 sm:text-sm">
              {HOSPITAL_CONTACT.poBox}, {HOSPITAL_CONTACT.address} · {HOSPITAL_CONTACT.region}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setMapActive(true)}
                className="inline-flex items-center gap-2 rounded-full bg-[#DFB860] px-5 py-2.5 text-xs font-bold text-[#08162B] shadow-lg transition-colors hover:bg-white sm:text-sm"
              >
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {t({
                  fr: "Afficher la carte interactive",
                  en: "Load interactive map",
                })}
              </button>

              <a
                href={HOSPITAL_CONTACT.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-white/20 sm:text-sm"
              >
                <span>
                  {t({ fr: "Ouvrir l'itinéraire", en: "Get directions" })}
                </span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
