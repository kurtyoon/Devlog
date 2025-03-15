import { Icon } from "@iconify/react";

interface MenuToggleProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export function MenuToggle({ isMenuOpen, toggleMenu }: MenuToggleProps) {
  return (
    <button
      onClick={toggleMenu}
      type="button"
      className="mr-2 flex w-[44px] h-[44px] flex-row items-center rounded-lg text-[var(--text-color)] transition-all hover:bg-[var(--primary-color-hover)] hover:text-[var(--primary-color)]"
    >
      <Icon
        icon={
          isMenuOpen
            ? "line-md:menu-to-close-transition"
            : "line-md:close-to-menu-transition"
        }
        className="mx-auto"
        width={24}
        height={24}
      />
    </button>
  );
}

export default MenuToggle;
