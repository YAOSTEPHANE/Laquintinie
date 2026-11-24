import type { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import { SERVICES } from "@/data/hospital-data";
import { ServiceDetailView } from "@/components/services/service-detail-view";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) {
    return { title: "Service introuvable" };
  }
  return {
    title: service.name.fr,
    description: service.description.fr,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) {
    notFound();
  }
  return <ServiceDetailView service={service} />;
}
