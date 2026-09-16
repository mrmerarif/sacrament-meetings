"use client";

import Image from "next/image";
import NavLinks from "@/components/NavLinks";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto p-8 space-y-8">
      {/* Add navigation menu */}
      <NavLinks />

      <Image
        src="/ward-building.webp"
        alt="Ward meetinghouse"
        width={900}
        height={450}
        className="rounded-lg shadow-md"
        priority
        fetchPriority="high"
      />

      <h1 className="text-4xl font-bold mt-8">
        Sacrament Meeting Planner
      </h1>

      <p className="text-lg text-gray-700 mt-4">
        View upcoming sacrament meetings, print agendas, and review weekly speakers.
      </p>
    </main>
  );
}
