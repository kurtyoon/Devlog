import { useEffect } from "react";
import { useLocation } from "react-router";
import lozad from "lozad";
import { OverlayScrollbars } from "overlayscrollbars";
import "overlayscrollbars/overlayscrollbars.css";

export default function SiteScript() {
  const location = useLocation();

  useEffect(() => {
    const setupUrlAnchor = () => {
      const url = window.location.href;
      const urlElement = document.getElementById(
        "post-url"
      ) as HTMLAnchorElement;

      if (urlElement) {
        urlElement.href = url;
        urlElement.innerText = url;
      }
    };

    const setupLozad = () => {
      const observer = lozad(".lozad", {
        loaded: (el: HTMLElement) => {
          el.classList.add("loaded");
        },
      });

      observer.observe();
    };

    const setupScrollBar = () => {
      OverlayScrollbars(
        {
          target: document.body,
          cancel: { nativeScrollbarsOverlaid: true },
        },
        {
          scrollbars: {
            theme: "scrollbar-base scrollbar-auto py-1",
            autoHide: "move",
          },
        }
      );

      document.body.classList.remove("overflow-y-hidden");

      document.querySelectorAll("pre").forEach((ele) => {
        OverlayScrollbars(ele, {
          scrollbars: {
            theme: "scrollbar-base scrollbar-dark px-2",
            autoHide: "leave",
            autoHideDelay: 500,
            autoHideSuspend: false,
          },
        });
      });
    };

    const setup = () => {
      setupUrlAnchor();
      setupLozad();
      setupScrollBar();
    };

    setup();

    return () => {
      document.body.classList.remove("overflow-y-hidden");
    };
  }, [location.pathname]);

  return null;
}
