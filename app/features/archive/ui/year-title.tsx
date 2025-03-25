interface Props {
  year: number;
  count: number;
}

export default function YearTitle({ year, count }: Props) {
  return (
    <div className="mb-2 flex w-full flex-row items-center">
      <div className="flex w-[15%] flex-row justify-end md:w-[10%]">
        <p className="year select-none text-2xl font-bold text-[var(--text-color)]">
          {year}
        </p>
      </div>
      <div className="relative flex h-full w-[15%] items-center md:w-[10%]">
        <div className="outline-3 z-50 mx-auto h-3 w-3 rounded-full bg-[var(--card-color)] outline outline-[2px] outline-[var(--primary-color)]"></div>
      </div>
      <div>
        <p className="count select-none text-[var(--text-color-lighten)]">
          {count === 1 ? `${count} post` : `${count} posts`}
        </p>
      </div>
    </div>
  );
}
