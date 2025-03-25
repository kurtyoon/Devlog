import { useMemo } from "react";
import { Link } from "react-router";

interface PaginationProps {
  lastPage: number;
  current: number;
  prevUrl?: string;
  nextUrl?: string;
}

export default function Pagination({
  lastPage,
  current,
  prevUrl,
  nextUrl,
}: PaginationProps) {
  const pages = useMemo(() => {
    const maxVisiblePages = 3;
    const result: (number | string)[] = [];

    if (lastPage <= maxVisiblePages) {
      return Array.from({ length: lastPage }, (_, i) => i + 1);
    }

    const startPage = Math.max(1, current - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(lastPage, startPage + maxVisiblePages - 1);

    if (startPage > 1) result.push(1);
    if (startPage > 2) result.push("...");

    result.push(
      ...Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      )
    );

    if (endPage < lastPage) result.push("...");
    if (endPage < lastPage) result.push(lastPage);

    return result;
  }, [lastPage, current]);

  return (
    <div
      className="flex flex-row justify-center space-x-4 onload-animation mt-4"
      style={{
        animationDelay: `calc(var(--onload-animation-delay) + ${current + 1} * var(--onload-animation-interval))`,
      }}
    >
      <Link
        to={prevUrl ?? "#"}
        onClick={(e) => !prevUrl && e.preventDefault()}
        className={`flex h-10 w-10 items-center justify-center rounded-lg p-1 transition-all ${
          prevUrl
            ? "bg-[var(--card-color)] hover:brightness-90 dark:bg-[var(--card-color-lighten)] dark:hover:brightness-125"
            : "cursor-not-allowed bg-[var(--card-color)] dark:bg-[var(--card-color-lighten)] dark:brightness-125"
        }`}
      >
        <span className="text-[var(--primary-color)]">{`<`}</span>
      </Link>

      <div className="flex flex-row space-x-2">
        {pages.map((page, idx) =>
          page === "..." ? (
            <span
              key={`ellipsis-${idx}`}
              className="text-md text-[var(--primary-color)]"
            >
              ...
            </span>
          ) : (
            <Link
              key={page}
              to={`?page=${page}`}
              className={`flex h-10 w-10 items-center justify-center rounded-lg p-1 transition-all ${
                page === current
                  ? "pointer-events-none bg-[var(--primary-color)]"
                  : "bg-[var(--card-color)] hover:brightness-90 dark:bg-[var(--card-color-lighten)] dark:hover:brightness-125"
              }`}
            >
              <span
                className={`text-center ${
                  page === current
                    ? "text-[var(--card-color)] dark:text-white/75"
                    : "text-[var(--primary-color)]"
                }`}
              >
                {page}
              </span>
            </Link>
          )
        )}
      </div>

      <Link
        to={nextUrl ?? "#"}
        onClick={(e) => !nextUrl && e.preventDefault()}
        className={`flex h-10 w-10 items-center justify-center rounded-lg p-1 transition-all ${
          nextUrl
            ? "bg-[var(--card-color)] hover:brightness-90 dark:bg-[var(--card-color-lighten)] dark:hover:brightness-125"
            : "cursor-not-allowed bg-[var(--card-color)] dark:bg-[var(--card-color-lighten)] dark:brightness-50"
        }`}
      >
        <span className="text-[var(--primary-color)]">{`>`}</span>
      </Link>
    </div>
  );
}
