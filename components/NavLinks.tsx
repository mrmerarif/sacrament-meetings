"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  const linkClasses = (path: string) =>
    `px-4 py-2 rounded-md font-medium ${
      pathname === path
        ? "bg-blue-600 text-white"
        : "text-blue-600 hover:bg-blue-100"
    }`;

  return (
    <nav className="flex gap-4 justify-center">
      <Link href="/" className={linkClasses("/")}>
        Home
      </Link>
      <Link href="/meetings" className={linkClasses("/meetings")}>
        All Meetings
      </Link>
      <Link href="/meetings/current" className={linkClasses("/meetings/current")}>
        Current Sunday
      </Link>
    </nav>
  );
}
