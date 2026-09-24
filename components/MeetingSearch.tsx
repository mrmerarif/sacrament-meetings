
"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function MeetingSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const query = searchParams.get("query") ?? "";
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && document.activeElement !== inputRef.current) {
      inputRef.current.value = query;
    }
  }, [query]);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", "1");

    if (term.trim()) {
      params.set("query", term.trim());
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div>
      <label htmlFor="meeting-search" className="sr-only">
        Search meetings
      </label>

      <input
        ref={inputRef}
        id="meeting-search"
        type="search"
        placeholder="Search by speaker, leader, or meeting type..."
        defaultValue={query}
        onChange={(event) => handleSearch(event.target.value)}
        aria-label="Search meetings"
        className="w-full rounded-md border border-gray-300 px-4 py-2"
      />
    </div>
  );
}
