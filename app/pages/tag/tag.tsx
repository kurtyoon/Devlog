import { ArchiveItem, YearTitle } from "~/features/archive";
import type { Archive } from "~/features/archive/model/archive.types";

interface Props {
  archiveMap: Map<number, Archive[]>;
}

export default function TagPage({ archiveMap }: Props) {
  const sortedYears = Array.from(archiveMap.keys()).sort((a, b) => b - a);

  return (
    <div className="archives mx-3 flex flex-col rounded-2xl bg-[var(--card-color)] px-10 py-5 lg:mx-0 lg:p-10">
      {sortedYears.map((year) => {
        const archives = archiveMap.get(year)!;

        return (
          <div key={year} className="mb-2">
            <YearTitle year={year} count={archives.length} />
            {archives.map((archive) => (
              <ArchiveItem key={archive.id} archive={archive} />
            ))}
          </div>
        );
      })}
    </div>
  );
}
