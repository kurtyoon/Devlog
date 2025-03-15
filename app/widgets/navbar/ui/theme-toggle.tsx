import { Icon } from "@iconify/react";
import type { TTheme } from "../type/navbar.type";

interface ThemeToggleProps {
  currentTheme: TTheme;
  toggleTheme: () => void;
}

export function ThemeToggle({ currentTheme, toggleTheme }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex w-11 justify-center rounded-lg py-2 text-[var(--text-color)] transition-all hover:bg-[var(--primary-color-hover)] hover:text-[var(--primary-color)]"
    >
      <Icon
        icon={
          currentTheme === "light"
            ? "line-md:moon-alt-to-sunny-outline-loop-transition"
            : "line-md:sunny-outline-to-moon-alt-loop-transition"
        }
        width={24}
        height={24}
      />
    </button>
  );
}

export default ThemeToggle;
