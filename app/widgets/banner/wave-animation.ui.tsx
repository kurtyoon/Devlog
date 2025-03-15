import { useEffect } from "react";

export default function WaveAnimation() {
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = `
      @keyframes wave {
        0% { transform: translateX(-90px); }
        100% { transform: translateX(85px); }
      }
    `;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div className="absolute -bottom-[1px] h-[10vh] max-h-[9.375rem] min-h-[3.125rem] w-full md:h-[15vh]">
      <svg
        className="absolute w-full h-full text-[var(--background-color)]"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className="fill-current">
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="0"
            className="opacity-25 animate-[wave_7s_linear_infinite]"
          />
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="3"
            className="opacity-50 animate-[wave_10s_linear_infinite]"
          />
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="5"
            className="opacity-75 animate-[wave_13s_linear_infinite]"
          />
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="7"
            className="animate-[wave_20s_linear_infinite]"
          />
        </g>
      </svg>
    </div>
  );
}
