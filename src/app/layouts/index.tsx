import "@/app/styles";

import { Navbar } from "@/widgets/navbar";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ReactNode } from "react";

const pretendardRegular = localFont({
  src: "../../../public/fonts/Pretendard-Regular.woff",
  variable: "--font-pretendard-regular",
  weight: "700",
});

export const metadata: Metadata = {
  title: "Devlog",
  description: "Kurtyoon의 개발 일지입니다.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Devlog",
    siteName: "Devlog",
    description: "Kurtyoon의 개발 일지입니다.",
    locale: "ko_KR",
    type: "website",
    url: "https://blog.kurtyoon.me",
  },
};

export function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body
        className={`${pretendardRegular.variable} mx-auto flex w-full flex-col items-center bg-neutral-50 text-center antialised`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
