import { Link } from "react-router";
import { Icon } from "@iconify/react";
import { DevlogConfig } from "~/shared/config";
import type Key from "~/shared/locale/key";
import { useTranslation } from "~/shared/locale/translation";

interface MobileNavProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export function MobileNav({ isMenuOpen, toggleMenu }: MobileNavProps) {
  return (
    <div className="px-3 transition-all">
      <ul
        className={`flex flex-col space-y-6 overflow-hidden text-xl font-medium text-[var(--text-color)] transition-all duration-300
          ${isMenuOpen ? `opacity-100 h-auto pb-4` : "h-0 opacity-0"}`}
      >
        {DevlogConfig.navigators.map((nav) => (
          <li key={nav.href} className="mt-1">
            <Link
              to={nav.href}
              className="flex flex-row items-center justify-between"
              onClick={toggleMenu}
            >
              <div className="flex flex-row items-center space-x-2">
                <span className="text-[var(--primary-color)]">·</span>
                <span>{useTranslation(nav.nameKey as Key)}</span>
              </div>
              <Icon
                icon="cuida:caret-right-outline"
                className="text-[var(--text-color-lighten)]"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MobileNav;
