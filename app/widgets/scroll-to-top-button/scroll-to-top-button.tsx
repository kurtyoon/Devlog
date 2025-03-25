import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

export function ScrollToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 200);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`transition-opacity duration-300 ${
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fixed bottom-8 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--card-color)] bg-opacity-70 backdrop-blur-md text-[var(--primary-color)] shadow-lg ring-1 ring-black/10 transition-all duration-300 hover:scale-105 hover:brightness-110 dark:bg-[var(--card-color-lighten)] dark:text-white"
      >
        <Icon icon="mdi:arrow-up" className="w-6 h-6" />
      </button>
    </div>
  );
}

export default ScrollToTopButton;
