import NavLinks from "@/components/NavLinks";

export default function MeetingsLayout({
children,
}: {
children: React.ReactNode;
}) {
return (
<section className="mx-auto w-full max-w-5xl px-4 py-6">
<nav className="mb-6 border-b border-gray-200 pb-4">
<NavLinks />
</nav>

  {children}
</section>


);
}

