"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  const linkClasses = (active: boolean) =>
    `px-4 py-2 rounded-md font-medium ${
      active
        ? "bg-blue-600 text-white"
        : "text-blue-600 hover:bg-blue-100"
    }`;

  const isHomeActive = pathname === "/";
  const isCreateActive = pathname === "/meetings/new";
  const isCurrentActive = pathname === "/meetings/current";
  const isMeetingsActive =
    pathname === "/meetings" ||
    (pathname.startsWith("/meetings/") &&
      !isCreateActive &&
      !isCurrentActive);

  return (
    <nav
      className="flex flex-wrap justify-center gap-4"
      aria-label="Main navigation"
    >
      <Link href="/" className={linkClasses(isHomeActive)}>
        Home
      </Link>

      <Link
        href="/meetings"
        className={linkClasses(isMeetingsActive)}
      >
        All Meetings
      </Link>

      <Link
        href="/meetings/current"
        className={linkClasses(isCurrentActive)}
      >
        Current Sunday
      </Link>

      <Link
        href="/meetings/new"
        className={linkClasses(isCreateActive)}
      >
        Create Meeting
      </Link>
    </nav>
  );
}