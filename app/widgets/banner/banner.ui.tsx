import { useEffect } from "react";
import { DevlogConfig } from "~/shared/config";
import { getCoverImage } from "~/shared/lib/cover";
import WaveAnimation from "./wave-animation.ui";

interface BannerProps {
  title?: string;
  subTitle?: string;
  bannerImage?: string;
  slug?: string;
}

export default function Banner({
  title,
  subTitle,
  bannerImage,
  slug,
}: BannerProps) {
  const hasTitle = title !== undefined || subTitle !== undefined;
  const hasHeaderImg = bannerImage !== undefined;
  const carouselImgsList = DevlogConfig.banners;
  const totalImages = carouselImgsList.length;
  const animationDuration = totalImages * 6;
  const animationStep = animationDuration / totalImages;

  useEffect(() => {
    const styleElement = document.createElement("style");

    const carouselAnimation = `
      @keyframes carousel-animation {
        0% { opacity: 0; transform: scale(1); z-index: 1; }
        10% { opacity: 1; transform: scale(1.05); z-index: 2; }
        45% { opacity: 1; transform: scale(1.05); z-index: 2; }
        55% { opacity: 0.5; transform: scale(1.05); z-index: 2; }
        100% { opacity: 0; transform: scale(1.1); z-index: 1; }
      }
    `;

    styleElement.textContent = carouselAnimation;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div className="relative h-[calc(var(--banner-height)*3/4)] opacity-100 lg:h-[var(--banner-height)] onload-animation-fade-in">
      <div className="h-full w-full">
        {!hasHeaderImg && (
          <div className="absolute left-0 top-0 -z-10 block h-[calc(var(--banner-height)*3/4)] w-full overflow-hidden bg-white lg:h-[var(--banner-height)]">
            <ul id="carousel_imgs">
              {carouselImgsList.map((img, index) => (
                <li
                  key={index}
                  className="absolute left-0 top-0 z-0 h-full w-full bg-cover bg-center bg-no-repeat opacity-0 transition-opacity duration-1000"
                  style={{
                    animation: `carousel-animation ${animationDuration}s infinite`,
                    animationDelay: `${index * animationStep}s`,
                    backgroundImage: `url(${img})`,
                  }}
                />
              ))}
            </ul>
            <div className="absolute inset-0 z-10 bg-black/50" />
          </div>
        )}
        {hasHeaderImg && (
          <div className="absolute left-0 top-0 z-0 block h-[calc(var(--banner-height)*3/4)] w-full overflow-hidden bg-white lg:h-[var(--banner-height)]">
            <img
              className="h-full w-full object-cover transition-opacity duration-1000"
              src={bannerImage ?? getCoverImage(slug ?? "")}
              alt="PostCover"
            />
            <div className="absolute inset-0 z-10 bg-black/50" />
          </div>
        )}
        <div className="relative h-[95%] w-full">
          <div className="absolute left-1/2 top-1/2 w-4/5 -translate-x-1/2 -translate-y-1/2 lg:w-3/4">
            <div className="flex flex-col">
              <h1
                className={`mt-8 text-center font-bold text-[var(--title-color)] drop-shadow-lg lg:mt-1 ${
                  hasTitle
                    ? "mb-1 text-3xl lg:text-5xl"
                    : "mb-0 text-6xl leading-[5rem] lg:mb-1 lg:text-8xl"
                }`}
                style={{ fontFamily: "var(--title-font)" }}
              >
                {title ?? DevlogConfig.title}
              </h1>
              <h2
                className="text-center text-xl text-[var(--subtitle-color)] drop-shadow-md lg:text-3xl"
                style={{ fontFamily: "var(--subtitle-font)" }}
              >
                {subTitle ?? DevlogConfig.subTitle}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Animation */}
      <WaveAnimation />
    </div>
  );
}
