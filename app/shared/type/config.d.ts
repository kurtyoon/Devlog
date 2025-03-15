interface Config {
  title: string;
  subTitle: string;
  brandTitle: string;

  description: string;

  site: string;

  locale: "kr" | "en";

  navigators: {
    nameKey: string;
    href: string;
  }[];

  username: string;
  sign: string;
  avatarUrl: string;

  socialLinks: {
    icon: string;
    link: string;
  }[];

  banners: string[];

  slugMode: "hash" | "raw";

  license: {
    name: string;
    url: string;
  };

  bannerStyle: "LOOP" | "SLIDE";
}

export type { Config };
