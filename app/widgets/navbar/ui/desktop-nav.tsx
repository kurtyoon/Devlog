import { Link } from "react-router";
import { DevlogConfig } from "~/shared/config";
import type Key from "~/shared/locale/key";
import { useTranslation } from "~/shared/locale/translation";

export function DesktopNav() {
  return (
    <div className="absolute left-1/2 hidden -translate-x-1/2 items-center justify-between space-x-1 text-lg text-[var(--text-color)] opacity-85 lg:flex">
      {DevlogConfig.navigators.map((nav) => (
        <Link
          key={nav.href}
          to={nav.href}
          className="flex h-[3.25rem] items-center rounded-lg px-6 transition-all hover:bg-[var(--primary-color-hover)] hover:text-[var(--primary-color)] active:scale-95 font-[var(--primary-font)]"
        >
          <p className="font-medium leading-normal">
            {useTranslation(nav.nameKey as Key)}
          </p>
        </Link>
      ))}
    </div>
  );
}

export default DesktopNav;
