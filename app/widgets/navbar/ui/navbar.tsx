import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  getSavedTheme,
  handleScrollVisibility,
  setTheme,
} from "../lib/navbar.util";
import type { TTheme } from "../type/navbar.type";
import MenuToggle from "./menu-toggle";
import DesktopNav from "./desktop-nav";
import ThemeToggle from "./theme-toggle";
import MobileNav from "./mobile-nav";
import { DevlogConfig } from "~/shared/config";
import { Icon } from "@iconify/react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<TTheme>("light");
  const [isNavVisible, setIsNavVisible] = useState(true);

  useEffect(() => {
    setTheme(getSavedTheme(), setCurrentTheme);
    const handleScroll = handleScrollVisibility(setIsNavVisible);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed left-1/2 z-10 flex w-full select-none flex-col justify-end rounded-b-xl bg-[var(--card-color-transparent)] px-2.5 backdrop-blur-md transition-all duration-300 2xl:w-[var(--page-width-xl)] xl:w-[var(--page-width-xl)] lg:w-[var(--page-width-lg)] lg:rounded-b-2xl"
      style={{
        transform: "translateX(-50%)",
        top: isNavVisible ? "0" : "-72px",
      }}
    >
      <div className="relative flex h-[4rem] w-full items-center justify-between lg:h-[4.5rem]">
        <div className="flex w-full flex-row items-center justify-between lg:hidden">
          <MenuToggle
            isMenuOpen={isMenuOpen}
            toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
          />
          <Link
            to="/"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-medium text-[var(--primary-color)]"
          >
            <div className="flex flex-row h-full content-center items-center text-2xl text-[var(--primary-color)] font-[var(--brand-font)]">
              <p>{DevlogConfig.brandTitle}</p>
            </div>
          </Link>
        </div>
        <Link
          to="/"
          className="hidden lg:block text-2xl font-[var(--brand-font)] text-[var(--primary-color)]"
        >
          <div className="flex flex-row h-full content-center items-center text-2xl text-[var(--primary-color)] font-[var(--brand-font)]">
            <Icon
              icon="heroicons:home"
              width={32}
              height={32}
              className="mr-2"
            />
            {DevlogConfig.brandTitle}
          </div>
        </Link>
        <DesktopNav />
        <ThemeToggle
          currentTheme={currentTheme}
          toggleTheme={() =>
            setTheme(
              currentTheme === "light" ? "dark" : "light",
              setCurrentTheme
            )
          }
        />
      </div>
      <MobileNav
        isMenuOpen={isMenuOpen}
        toggleMenu={() => setIsMenuOpen(false)}
      />
    </nav>
  );
}
