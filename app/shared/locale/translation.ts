import { DevlogConfig } from "../config";
import type Key from "./key";
import { en } from "./languages/en";
import { kr } from "./languages/kr";

export type Translation = {
  [K in Key]: string;
};

const map: { [key: string]: Translation } = {
  en: en,
  kr: kr,
};

export function getTranslation(lang: string): Translation {
  return map[lang.toLowerCase()] ?? en;
}

export function useTranslation(key: Key, ...interpolations: string[]): string {
  const lang = DevlogConfig.locale;
  let translation = getTranslation(lang)[key];

  interpolations.forEach((interpolations) => {
    translation = translation.replace("{{}}", interpolations);
  });

  return translation;
}
