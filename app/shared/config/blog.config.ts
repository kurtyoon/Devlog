import Key from "../locale/key";
import type { Config } from "../type/config";

const avatarUrl = import.meta.env.VITE_DEVLOG_AVATAR_URL;
const banners = import.meta.env.VITE_DEVLOG_BANNERS
  ? import.meta.env.VITE_DEVLOG_BANNERS.split(",")
  : [];

const DevlogConfig: Config = {
  title: "Devlog",
  subTitle: "Kurtyoon's Devlog",
  brandTitle: "Kurtyoon",

  description: "Kurtyoon's Devlog",

  site: "https://blog.kurtyoon.me",

  locale: "en",

  navigators: [
    {
      nameKey: Key.nav_bar_home,
      href: "/",
    },
    {
      nameKey: Key.nav_bar_archive,
      href: "/archive",
    },
    {
      nameKey: Key.nav_bar_about,
      href: "/about",
    },
    {
      nameKey: Key.nav_bar_github,
      href: "https://github.com/kurtyoon",
    },
  ],

  username: "kurtyoon",
  sign: "Software Engineer",
  avatarUrl: avatarUrl,

  socialLinks: [
    {
      icon: "mingcute:github-line",
      link: "https://github.com/kurtyoon",
    },
    {
      icon: "mingcute:linkedin-line",
      link: "https://www.linkedin.com/in/kurtyoon/",
    },
    {
      icon: "mingcute:mail-line",
      link: "mailto:kr.dev.kurtyoon@gmail.com",
    },
  ],

  banners: banners,

  slugMode: "hash",

  license: {
    name: "MIT",
    url: "https://github.com/kurtyoon/devlog/blob/main/LICENSE",
  },

  bannerStyle: "LOOP",
};

export default DevlogConfig;
