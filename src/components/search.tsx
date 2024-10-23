"use client";

import { inputStyles } from "@/utils/styles/input";
import { useDebouncedCallback } from "use-debounce";
import { Search as SearchIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import { useEffect, useRef } from "react";

export default function Search({
  className,
  placeholder,
  value,
}: {
  className?: string;
  placeholder?: string;
  value: string;
}) {
  const [search, setSearch] = useQueryState(value);

  const ref = useRef<HTMLInputElement>(null);

  const debounced = useDebouncedCallback((value: string | null) => {
    if (value) void setSearch(value);
    else void setSearch(null);
  }, 500);

  useEffect(() => {
    if (ref.current) ref.current.value = search ?? "";
  }, [search]);

  return (
    <div className={`relative flex ${className}`}>
      <input
        ref={ref}
        type="search"
        name="Search"
        className={inputStyles(
          { size: "sm", variant: "primary" },
          `h-fit pl-10 ${className}`,
        )}
        placeholder={placeholder}
        defaultValue={search ?? ""}
        onChange={(e) => debounced(e.target.value)}
      />
      <div className="absolute left-px top-px flex size-10 items-center justify-center text-quaternary">
        <SearchIcon size={20} />
      </div>
    </div>
  );
}
