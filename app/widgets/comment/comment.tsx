import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

export default function Comment() {
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const repo = import.meta.env.VITE_UTTERANCE_REPO;

  useEffect(() => {
    if (!ref.current) return;

    const theme = localStorage.getItem("theme");
    const utterancesTheme = theme === "dark" ? "github-dark" : "github-light";

    const script = document.createElement("script");

    script.src = "https://utteranc.es/client.js";
    script.setAttribute("repo", repo);
    script.setAttribute("issue-term", location.pathname);
    script.setAttribute("theme", utterancesTheme);
    script.setAttribute("crossorigin", "anonymous");

    if (ref.current) {
      ref.current.innerHTML = "";
      ref.current.appendChild(script);
    }
  }, [location.pathname]);

  return <div ref={ref} />;
}
