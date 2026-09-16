"use client";

import NavLinks from "@/components/NavLinks";

export default function MeetingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="p-6 space-y-6">
      <NavLinks />
      {children}
    </section>
  );
}
