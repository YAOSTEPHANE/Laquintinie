"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  HeartPulse,
  Search,
  Sparkles,
  Video,
  X,
} from "lucide-react";
import { useLanguage } from "@/context/language-context";
import {
  DEPARTMENTS,
  HEALTH_TIPS,
  NEWS_ARTICLES,
  type HealthTip,
  type NewsArticle,
} from "@/data/hospital-data";
import { ChamferedEditorialFrame } from "@/components/ui/framed-media";
import { PageHero } from "@/components/ui/page-hero";

export default function ActualitesPage() {
  const { t } = useLanguage();
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [selectedTip, setSelectedTip] = useState<HealthTip | null>(null);

  // Auto-open article when linked via URL hash (#slug)
  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (!hash || hash === "astuces") return;
      const found = NEWS_ARTICLES.find((a) => a.slug === hash);
      if (found) setSelectedArticle(found);
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  // Escape key closes open modal
  useEffect(() => {
    if (!selectedArticle && !selectedTip) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedArticle(null);
        setSelectedTip(null);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedArticle, selectedTip]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return NEWS_ARTICLES.filter((a) => {
      const matchCat = category === "all" || a.categoryKey === category;
      if (!matchCat) return false;
      if (!q) return true;
      return (
        a.title.fr.toLowerCase().includes(q) ||
        a.title.en.toLowerCase().includes(q) ||
        a.excerpt.fr.toLowerCase().includes(q) ||
        a.excerpt.en.toLowerCase().includes(q)
      );
    });
  }, [category, query]);

  const featured = NEWS_ARTICLES[0];

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: t({ fr: "Accueil", en: "Home" }), href: "/" },
          { label: t({ fr: "Actualités & Santé", en: "News & Health" }) },
        ]}
        eyebrow={t({ fr: "Vie de l'établissement", en: "Hospital Updates" })}
        eyebrowTone="cobalt"
        title={t({ fr: "Actualités de Laquintinie", en: "Laquintinie Hospital News" })}
        description={t({
          fr: "Vie de l'hôpital, campagnes de dépistage gratuit, innovations médicales et conseils de prévention rédigés avec nos équipes soignantes.",
          en: "Hospital updates, free screening campaigns, medical innovations, and preventive health guidance authored with our clinical teams.",
        })}
        stats={[
          { value: String(NEWS_ARTICLES.length), label: t({ fr: "Publications", en: "Articles" }) },
          { value: String(HEALTH_TIPS.length), label: t({ fr: "Astuces santé", en: "Health tips" }) },
          { value: "95 ans", label: t({ fr: "Édition 2026", en: "2026 Edition" }) },
          { value: "24h/24", label: t({ fr: "Veille santé", en: "Health alerts" }) },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* Featured Latest Article */}
        <div className="grid items-center gap-8 rounded-3xl border border-white bg-white p-5 shadow-premium sm:p-6 lg:grid-cols-12 lg:p-8">
          <div className="min-w-0 lg:col-span-6">
            <ChamferedEditorialFrame
              src={featured.image}
              alt={t(featured.title)}
              aspectClass="aspect-[16/10]"
              label={t({ fr: "À la une", en: "Featured" })}
            />
          </div>
          <div className="min-w-0 lg:col-span-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0A66C2]">
              {t(featured.category)} · {t(featured.dateLabel)} · {featured.readTime}
            </span>
            <h2 className="mt-3 text-2xl font-extrabold text-[#08162B] sm:text-3xl">
              {t(featured.title)}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#475569]">
              {t(featured.excerpt)}
            </p>
            <button
              type="button"
              onClick={() => setSelectedArticle(featured)}
              className="mt-6 rounded-full bg-[#0A66C2] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#08162B]"
            >
              {t({ fr: "Lire l'article complet", en: "Read full article" })}
            </button>
          </div>
        </div>

        {/* Filters + Search */}
        <div className="mt-10 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { key: "all", label: { fr: "Toutes", en: "All" } },
              { key: "innovations", label: { fr: "Innovations", en: "Innovations" } },
              { key: "actualites", label: { fr: "Actualités", en: "News" } },
              { key: "communiques", label: { fr: "Communiqués", en: "Press" } },
              { key: "evenements", label: { fr: "Événements", en: "Events" } },
              { key: "partenariats", label: { fr: "Partenariats", en: "Partners" } },
              { key: "95-ans", label: { fr: "95 ans", en: "95th Anniv." } },
              { key: "campagnes", label: { fr: "Campagnes", en: "Campaigns" } },
              { key: "sante", label: { fr: "Santé", en: "Health" } },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                aria-pressed={category === tab.key}
                onClick={() => setCategory(tab.key)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  category === tab.key
                    ? "bg-[#08162B] text-white"
                    : "border border-[#08162B]/12 bg-white text-[#475569] hover:border-[#0A66C2]"
                }`}
              >
                {t(tab.label)}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-72">
            <label htmlFor="news-search" className="sr-only">
              {t({ fr: "Rechercher un article", en: "Search articles" })}
            </label>
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#475569]"
              aria-hidden="true"
            />
            <input
              id="news-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t({ fr: "Rechercher un article...", en: "Search articles..." })}
              className="w-full rounded-full border border-[#08162B]/15 bg-white py-2.5 pl-10 pr-4 text-sm text-[#08162B] focus:border-[#0A66C2] focus:outline-none"
            />
          </div>
        </div>

        {/* Articles Grid or Empty State */}
        {filtered.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-[#08162B]/10 bg-white p-12 text-center shadow-premium">
            <Sparkles className="mx-auto h-9 w-9 text-[#B8892E]" aria-hidden="true" />
            <h2 className="mt-3 text-lg font-bold text-[#08162B]">
              {t({
                fr: "Aucun article ne correspond à votre filtre",
                en: "No articles match your filter",
              })}
            </h2>
            <p className="mt-1 text-sm text-[#475569]">
              {t({
                fr: "Réinitialisez les filtres pour consulter toutes les publications récentes.",
                en: "Reset filters to view all recent hospital publications.",
              })}
            </p>
            <button
              type="button"
              onClick={() => {
                setCategory("all");
                setQuery("");
              }}
              className="mt-5 rounded-full bg-[#0A66C2] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#08162B]"
            >
              {t({ fr: "Tout afficher", en: "Show all articles" })}
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((article) => (
              <article
                id={article.slug}
                key={article.slug}
                className="flex min-w-0 flex-col justify-between overflow-hidden rounded-3xl border border-white bg-white p-5 shadow-premium transition-all hover:-translate-y-1 hover:shadow-premium-hover"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#EFECE6]">
                    <Image
                      src={article.image}
                      alt={t(article.title)}
                      fill
                      sizes="400px"
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs text-[#475569]">
                    <Calendar className="h-3.5 w-3.5 text-[#B8892E]" aria-hidden="true" />
                    <time dateTime={article.dateISO}>{t(article.dateLabel)}</time>
                    <span>·</span>
                    <span className="font-bold text-[#0A66C2]">{t(article.category)}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-[#08162B]">{t(article.title)}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#475569]">
                    {t(article.excerpt)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedArticle(article)}
                  className="mt-5 self-start text-xs font-bold text-[#0A66C2] hover:underline"
                >
                  {t({ fr: "Lire l'article →", en: "Read article →" })}
                </button>
              </article>
            ))}
          </div>
        )}

        {/* Astuces Santé Section — Interactive Tip Reader Modal */}
        <section id="astuces" className="mt-16 border-t border-[#08162B]/10 pt-12">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0D7A5F]">
                {t({ fr: "Prévention & éducation thérapeutique", en: "Prevention & Patient Education" })}
              </p>
              <h2 className="mt-1 text-2xl font-extrabold text-[#08162B] sm:text-3xl">
                {t({ fr: "Astuces santé & prévention", en: "Health Tips & Prevention" })}
              </h2>
            </div>
            <p className="text-xs font-medium text-[#475569]">
              {t({
                fr: "Cliquez sur une fiche pour consulter le conseil complet.",
                en: "Select a card to open the full prevention guide.",
              })}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {HEALTH_TIPS.map((tip) => (
              <button
                key={tip.slug}
                type="button"
                onClick={() => setSelectedTip(tip)}
                className="group flex flex-col justify-between rounded-3xl border border-white bg-white p-4 text-left shadow-premium transition-all hover:-translate-y-1 hover:shadow-premium-hover"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#EFECE6]">
                    <Image
                      src={tip.image}
                      alt={t(tip.title)}
                      fill
                      sizes="320px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-3 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase text-[#0A66C2]">
                    <span>{t(tip.category)}</span>
                    <span className="text-[#475569]/40">·</span>
                    <span className="inline-flex items-center gap-1 text-[#08162B]">
                      {tip.format.fr.includes("Vidéo") ? (
                        <Video className="h-3 w-3 text-[#B8892E]" aria-hidden="true" />
                      ) : (
                        <BookOpen className="h-3 w-3 text-[#B8892E]" aria-hidden="true" />
                      )}
                      {t(tip.format)}
                    </span>
                  </p>
                  <h3 className="mt-1 text-sm font-bold text-[#08162B] group-hover:text-[#0A66C2]">
                    {t(tip.title)}
                  </h3>
                  <p className="mt-1.5 text-xs text-[#475569]">{t(tip.summary)}</p>
                </div>

                <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#0A66C2]">
                  {t({ fr: "Lire la fiche", en: "Open guide" })}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Article Reader Modal */}
      {selectedArticle ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-dialog-title"
          onClick={() => setSelectedArticle(null)}
          className="fixed inset-0 z-[95] flex items-center justify-center bg-[#08162B]/75 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="animate-modal-pop max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase text-[#0A66C2]">
                  {t(selectedArticle.category)} · {t(selectedArticle.dateLabel)} · {selectedArticle.readTime}
                </p>
                <h2 id="article-dialog-title" className="mt-1 text-2xl font-extrabold text-[#08162B]">
                  {t(selectedArticle.title)}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                aria-label={t({ fr: "Fermer", en: "Close" })}
                autoFocus
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#08162B]/15 text-[#08162B] hover:bg-[#F8F7F4]"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-2xl">
              <Image
                src={selectedArticle.image}
                alt={t(selectedArticle.title)}
                fill
                sizes="640px"
                className="object-cover"
              />
            </div>
            <div className="mt-5 space-y-3 text-sm leading-relaxed text-[#475569]">
              <p className="font-semibold text-[#08162B]">{t(selectedArticle.excerpt)}</p>
              {selectedArticle.body.map((p, idx) => (
                <p key={idx}>{t(p)}</p>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {/* Health Tip Reader Modal */}
      {selectedTip ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="tip-dialog-title"
          onClick={() => setSelectedTip(null)}
          className="fixed inset-0 z-[95] flex items-center justify-center bg-[#08162B]/75 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="animate-modal-pop max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-[#0D7A5F]">
                  <HeartPulse className="h-3.5 w-3.5" aria-hidden="true" />
                  {t(selectedTip.category)} · {t(selectedTip.format)}
                </span>
                <h2 id="tip-dialog-title" className="mt-3 text-2xl font-extrabold text-[#08162B]">
                  {t(selectedTip.title)}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTip(null)}
                aria-label={t({ fr: "Fermer", en: "Close" })}
                autoFocus
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#08162B]/15 text-[#08162B] hover:bg-[#F8F7F4]"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-2xl">
              <Image
                src={selectedTip.image}
                alt={t(selectedTip.title)}
                fill
                sizes="580px"
                className="object-cover"
              />
            </div>

            <p className="mt-5 text-sm leading-relaxed text-[#475569]">
              {t(selectedTip.summary)}
            </p>

            <div className="mt-5 rounded-2xl border border-[#08162B]/10 bg-[#F8F7F4] p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-[#08162B]">
                {t({ fr: "Départements concernés", en: "Related departments" })}
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {selectedTip.departmentSlugs.map((slug) => {
                  const dept = DEPARTMENTS.find((d) => d.slug === slug);
                  if (!dept) return null;
                  return (
                    <Link
                      key={slug}
                      href={`/departements#${dept.slug}`}
                      onClick={() => setSelectedTip(null)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#08162B]/12 bg-white px-3 py-1.5 text-xs font-bold text-[#08162B] hover:border-[#0A66C2] hover:text-[#0A66C2]"
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: dept.accentColor }}
                        aria-hidden="true"
                      />
                      {t(dept.shortName)}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Link
                href="/rendez-vous"
                onClick={() => setSelectedTip(null)}
                className="inline-flex items-center gap-2 rounded-full bg-[#0A66C2] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#08162B]"
              >
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                {t({ fr: "Prendre rendez-vous", en: "Book appointment" })}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
