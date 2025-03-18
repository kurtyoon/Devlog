import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import lozad from "lozad";
import { OverlayScrollbars } from "overlayscrollbars";
import "overlayscrollbars/overlayscrollbars.css";

export default function SiteScript() {
  const location = useLocation();
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Setup Progress Bar
    const setupProgressBar = () => {
      const progressBar = document.createElement("div");
      progressBar.className = "loading-progress-bar";
      document.body.appendChild(progressBar);
      progressBarRef.current = progressBar;
    };

    const startLoading = () => {
      setIsLoading(true);
      if (progressBarRef.current) {
        progressBarRef.current.style.width = "0%";
        progressBarRef.current.style.opacity = "1";
      }
    };

    const updateProgress = (progress: number) => {
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${progress}%`;
      }
    };

    const completeLoading = () => {
      setIsLoading(false);
      if (progressBarRef.current) {
        progressBarRef.current.style.width = "100%";
        setTimeout(() => {
          if (progressBarRef.current) {
            progressBarRef.current.style.opacity = "0";
          }
        }, 200);
      }
    };

    // 페이지 로딩 상태 모니터링
    const monitorLoading = () => {
      startLoading();

      // DOM 콘텐츠 로딩 진행률 체크
      const domContentLoaded = new Promise((resolve) => {
        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", resolve);
        } else {
          resolve(true);
        }
      });

      // 이미지 및 기타 리소스 로딩 체크
      const resourcesLoaded = new Promise((resolve) => {
        if (document.readyState === "complete") {
          resolve(true);
        } else {
          window.addEventListener("load", resolve);
        }
      });

      // 로딩 진행률 업데이트
      Promise.all([
        domContentLoaded.then(() => updateProgress(50)),
        resourcesLoaded.then(() => updateProgress(100)),
      ]).then(() => {
        completeLoading();
      });
    };

    setupProgressBar();
    monitorLoading();

    // Setup URL anchor
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

    // Setup Image lazy loading
    const setupLozad = () => {
      const observer = lozad(".lozad", {
        loaded: (el: HTMLElement) => {
          el.classList.add("loaded");
        },
      });

      observer.observe();
    };

    // Setup Custom Scrollbar
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
      setupProgressBar();
    };

    setup();

    return () => {
      document.body.classList.remove("overflow-y-hidden");

      if (progressBarRef.current) {
        progressBarRef.current.remove();
      }
    };
  }, [location.pathname]);

  return null;
}
