type TTheme = "light" | "dark";

export const getSavedTheme = (): TTheme => {
  return (localStorage.getItem("theme") as TTheme) || "light";
};

export const setTheme = (
  theme: TTheme,
  setCurrentTheme: (theme: TTheme) => void
) => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  setCurrentTheme(theme);
  document.documentElement.classList.toggle("dark", theme === "dark");
};

export const handleScrollVisibility = (
  setIsNavVisible: (visible: boolean) => void
) => {
  let lastYPos = 0;
  const bannerElement = document.getElementById("banner");
  const bannerHeight = bannerElement?.offsetHeight ?? 0 - 50;

  return () => {
    if (bannerHeight < window.scrollY && window.scrollY > lastYPos) {
      setIsNavVisible(false);
    } else {
      setIsNavVisible(true);
    }

    lastYPos = window.scrollY;
  };
};
