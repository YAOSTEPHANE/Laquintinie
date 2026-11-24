import type { Metadata } from "next";
import React, { Suspense } from "react";
import { BookingWizard } from "@/components/booking/booking-wizard";

export const metadata: Metadata = {
  title: "Prendre rendez-vous",
  description:
    "Réservez votre consultation en ligne sans création de compte à l'Hôpital Laquintinie de Douala.",
};

export default function RendezVousPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-16 text-sm text-[#475569]">
          Chargement de l&apos;assistant de prise de rendez-vous…
        </div>
      }
    >
      <BookingWizard />
    </Suspense>
  );
}
