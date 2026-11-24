import type { Metadata } from "next";
import React from "react";
import { MentionsLegalesView } from "@/components/legal/legal-views";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Informations légales, éditeur et coordonnées officielles de l'Hôpital Laquintinie de Douala.",
};

export default function MentionsLegalesPage() {
  return <MentionsLegalesView />;
}
