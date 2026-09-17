"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  const linkClasses = (path: string, active: boolean) =>
    `px-4 py-2 rounded-md font-medium ${
      active
        ? "bg-blue-600 text-white"
        : "text-blue-600 hover:bg-blue-100"
    }`;

  const isHomeActive = pathname === "/";
  const isMeetingsActive =
    pathname === "/meetings" ||
    (pathname.startsWith("/meetings/") &&
      pathname !== "/meetings/current");
  const isCurrentActive = pathname === "/meetings/current";

  return (
    <nav className="flex flex-wrap gap-4 justify-center">
      <Link href="/" className={linkClasses("/", isHomeActive)}>
        Home
      </Link>

      <Link
        href="/meetings"
        className={linkClasses("/meetings", isMeetingsActive)}
      >
        All Meetings
      </Link>

      <Link
        href="/meetings/current"
        className={linkClasses("/meetings/current", isCurrentActive)}
      >
        Current Sunday
      </Link>
    </nav>
  );
}
