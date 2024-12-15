"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

/**
 * Public Component
 */

interface NavItem {
  label: string;
  link?: string;
  onClick?: () => void;
}

const Navbar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const onSideBarClick = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const NavList: NavItem[] = [
    { label: "블로그", link: "/blog" },
    { label: "소개", link: "/about" },
    { label: "이력서", link: "/resume" },
    { label: "프로젝트", link: "/projects" },
    { label: "연락하기", link: "/contact" },
  ];

  return (
    <>
      <div className="fixed z-50 flex h-16 w-full items-center justify-between bg-white px-6 py-4 shadow-sm">
        {/* Logo */}
        <Link href="/" className="flex items-center pr-8 text-xl font-bold">
          Devlog
        </Link>

        {/* --------------------------------------------- */}
        {/* ------------  Desktop Navigation ------------ */}
        {/* --------------------------------------------- */}
        <div className="hidden items-center justify-end space-x-2 desktop:flex">
          {NavList.map((item, index) => (
            <NavButton key={index} label={item.label} link={item.link} />
          ))}
        </div>

        {/* --------------------------------------------- */}
        {/* ------------  Mobile Toggle Icon ------------ */}
        {/* --------------------------------------------- */}
        <button className="p-2 desktop:hidden" onClick={onSideBarClick}>
          <div className={`space-y-1.5 ${isSideBarOpen ? "hidden" : "block"}`}>
            <span className="block h-0.5 w-6 bg-gray-600"></span>
            <span className="block h-0.5 w-6 bg-gray-600"></span>
            <span className="block h-0.5 w-6 bg-gray-600"></span>
          </div>
          <svg
            className={`h-6 w-6 ${isSideBarOpen ? "block" : "hidden"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* --------------------------------------------- */}
      {/* ------------  Sidebar for Mobile ------------ */}
      {/* --------------------------------------------- */}
      {isSideBarOpen && (
        <div className="fixed left-0 top-0 z-40 flex size-full flex-col bg-white p-6 desktop:hidden">
          <div className="mb-8 flex items-center justify-between">
            <Link
              href="/"
              className="text-xl font-bold"
              onClick={onSideBarClick}
            >
              Kurtyoon
            </Link>
            <button onClick={onSideBarClick}>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col space-y-4">
            {NavList.map((item, index) => (
              <NavButton
                key={index}
                label={item.label}
                link={item.link}
                onClick={onSideBarClick}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

/**
 * Private Component
 */

const NavButton: React.FC<NavItem> = ({ label, link, onClick }) => {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <Link
      className={`cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition duration-200 ease-in-out
                ${
                  isActive
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
      href={link || "/"}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};
