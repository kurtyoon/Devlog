import { Link } from "react-router";
import type { Archive } from "../model/archive.types";

interface Props {
  archive: Archive;
}

export default function ArchiveItem({ archive }: Props) {
  return (
    <div className="group relative">
      <Link
        to={`/posts/${archive.id}/${archive.slug}`}
        className="flex w-full select-none flex-row items-center rounded-md py-2 transition-colors hover:bg-[var(--primary-color-lighten)]"
      >
        <div className="flex w-[15%] flex-row justify-end md:w-[10%]">
          <p className="text-sm text-[var(--text-color-lighten)] font-primary">
            {new Date(archive.publishedAt)
              .toLocaleDateString("ko-KR", { month: "2-digit", day: "2-digit" })
              .replace(".", "-")
              .replace(".", "")
              .replace(" ", "")}
          </p>
        </div>

        <div className="relative flex h-full w-[15%] items-center justify-center md:w-[10%]">
          <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--text-color-lighten)] outline outline-4 outline-[var(--card-color)] transition-all group-hover:h-4 group-hover:bg-[var(--primary-color)] group-hover:outline-[var(--primary-color-lighten)]" />
        </div>

        <div className="flex w-[70%] flex-row md:w-[80%]">
          <p className="truncate font-semibold text-[var(--text-color)] font-primary transition-all group-hover:pl-2 group-hover:text-[var(--primary-color)]">
            {archive.title}
          </p>
        </div>
      </Link>
    </div>
  );
}
