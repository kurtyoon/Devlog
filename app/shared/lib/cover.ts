import { DevlogConfig } from "../config";

let currentIndex = 0;

export function getCoverImage(slug: string): string {
  const bannerLength = DevlogConfig.banners.length;
  const index = currentIndex;
  currentIndex = (currentIndex + 1) % bannerLength;

  return DevlogConfig.banners[index];
}
