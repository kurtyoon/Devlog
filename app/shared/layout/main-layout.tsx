import type { ReactNode } from "react";
import Footer from "~/widgets/footer/footer.ui";
import { Navbar } from "~/widgets/navbar";
import { Sidebar } from "~/widgets/sidebar";
import { DevlogConfig } from "../config";
import { Banner } from "~/widgets/banner";

interface MainLayoutProps {
  children: ReactNode;
  categories: Map<string, { name: string; posts: any[] }>;
  tags: Map<string, { name: string }>;
  bannerImage?: string;
  title?: string;
  subTitle?: string;
}

export default function MainLayout({
  children,
  categories,
  tags,
  bannerImage,
  title,
  subTitle,
}: MainLayoutProps) {
  return (
    <div className="flex w-full flex-col">
      <Navbar />

      {DevlogConfig.bannerStyle === "LOOP" && (
        <Banner bannerImage={bannerImage} title={title} subTitle={subTitle} />
      )}

      <div className="w-full md:min-w-[80%] md:max-w-[80%] md:mx-auto my-10 lg:min-w-[var(--page-width-lg)] lg:max-w-[var(--page-width-lg)] xl:min-w-[var(--page-width-xl)] xl:max-w-[var(--page-width-xl)]">
        <div className="flex flex-row items-start xl:space-x-4">
          <div className="hidden min-w-[248px] xl:block">
            <Sidebar categories={categories} tags={tags} />
          </div>
          <div className="transition-leaving w-full space-y-8">
            <main className="content onload-animation xl:w-[calc(var(--page-width-xl)-264px)]">
              {children}
            </main>
            <Footer categories={categories} tags={tags} />
          </div>
        </div>
      </div>
    </div>
  );
}
