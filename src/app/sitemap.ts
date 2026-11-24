import type { MetadataRoute } from "next";
import { NEWS_ARTICLES, SERVICES } from "@/data/hospital-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hopitallaquintinie.cm";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/rendez-vous`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/departements`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/medecins`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/a-propos`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/actualites`, lastModified: now, changeFrequency: "daily", priority: 0.85 },
    { url: `${baseUrl}/confidentialite`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/mentions-legales`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const newsRoutes: MetadataRoute.Sitemap = NEWS_ARTICLES.map((article) => ({
    url: `${baseUrl}/actualites#${article.slug}`,
    lastModified: new Date(article.dateISO),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...newsRoutes];
}
