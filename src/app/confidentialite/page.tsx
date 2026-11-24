import type { Metadata } from "next";
import React from "react";
import { ConfidentialiteView } from "@/components/legal/legal-views";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité et de protection des données personnelles de l'Hôpital Laquintinie de Douala.",
};

export default function ConfidentialitePage() {
  return <ConfidentialiteView />;
}
