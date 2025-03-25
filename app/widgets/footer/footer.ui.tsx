import { Link } from "react-router";
import { DevlogConfig } from "~/shared/config";
import { Icon } from "@iconify/react";
import { useTranslation } from "~/shared/locale/translation";
import Key from "~/shared/locale/key";

interface FooterProps {
  categories: Map<string, { name: string; posts: any[] }>;
  tags: Map<string, { name: string }>;
}

export default function Footer({ categories, tags }: FooterProps) {
  return (
    <div className="mx-3 space-y-4">
      {/* Owner Info Card */}
      <div className="rounded-3xl bg-[var(--card-color)] transition-all lg:hidden">
        <div className="flex flex-row md:flex-col md:pt-4">
          <Link to="/about" className="relative h-40 w-40 md:hidden">
            <img
              className="lozad absolute left-0 top-0 h-40 rounded-l-3xl"
              src={DevlogConfig.avatarUrl}
              alt="Avatar"
              width={160}
              height={160}
            />
            <div className="absolute right-0 top-0 h-40 w-20 bg-gradient-to-l from-[var(--card-color)]" />
          </Link>
          <Link
            to="/about"
            className="mx-auto hidden h-40 w-40 cursor-pointer rounded-3xl transition-all hover:brightness-75 md:block"
          >
            <img
              className="lozad h-40 rounded-3xl"
              src={DevlogConfig.avatarUrl}
              alt="Avatar"
              width={160}
              height={160}
            />
          </Link>
          <div className="flex grow flex-col justify-center space-y-4 p-4">
            <div className="flex flex-col items-center">
              <Link
                to="/about"
                className="line-clamp-1 text-xl font-semibold text-[var(--text-color)]"
              >
                {DevlogConfig.username}
              </Link>
              <span className="mb-2 mt-1 h-1 w-8 rounded-full bg-[var(--primary-color)]" />
              <p className="line-clamp-1 text-[var(--text-color-lighten)]">
                {DevlogConfig.sign}
              </p>
            </div>
            <ul className="flex flex-row items-center justify-center space-x-6">
              {DevlogConfig.socialLinks.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.link}
                    className="text-[var(--primary-color)] transition-all hover:brightness-110"
                  >
                    <Icon icon={item.icon} width={24} height={24} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Category Card */}
      <div className="rounded-3xl bg-[var(--card-color)] p-4 transition-all lg:hidden">
        <div className="mb-2 flex flex-row items-center space-x-2 pl-1.5">
          <span className="h-6 w-1 rounded-full bg-[var(--primary-color)]" />
          <span className="text-xl font-semibold text-[var(--text-color)]">
            {useTranslation(Key.side_bar_categories)}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1 md:grid-cols-3">
          {Array.from(categories.keys())
            .sort((a, b) => a.localeCompare(b))
            .map((category) => (
              <Link
                key={category}
                to={`/categories/${category}`}
                className="flex flex-row items-center justify-between rounded-lg px-2 py-1.5 transition-all hover:bg-[var(--primary-color-lighten)] font-primary"
              >
                <p className="line-clamp-1 text-[var(--text-color)] transition-all group-hover:pl-2 group-hover:text-[var(--primary-color)]">
                  {categories.get(category)!.name}
                </p>
                <span className="rounded-md bg-[var(--primary-color-lighten)] px-2.5 py-0.5 text-[var(--primary-color)]">
                  {categories.get(category)!.posts.length}
                </span>
              </Link>
            ))}
        </div>
      </div>

      {/* Tag Card */}
      <div className="rounded-3xl bg-[var(--card-color)] p-4 transition-all lg:hidden">
        <div className="mb-2 flex flex-row items-center space-x-2 pl-1.5">
          <span className="h-6 w-1 rounded-full bg-[var(--primary-color)]" />
          <span className="text-xl font-semibold text-[var(--text-color)]">
            {useTranslation(Key.side_bar_tags)}
          </span>
        </div>
        <div className="flex flex-row flex-wrap">
          {Array.from(tags.keys())
            .sort((a, b) => a.localeCompare(b))
            .map((tag) => (
              <Link
                key={tag}
                to={`/tags/${tag}`}
                className="m-1 rounded-md bg-[var(--primary-color-lighten)] px-2 py-1 transition-all hover:brightness-95 font-primary"
              >
                <p className="text-sm text-[var(--primary-color)]">
                  {tags.get(tag)!.name}
                </p>
              </Link>
            ))}
        </div>
      </div>

      {/* Site Footer */}
      <footer>
        <div className="divide-y divide-dashed divide-black/25 py-4 lg:pt-0 dark:divide-white/25">
          <div></div>
          <div></div>
        </div>
        <div className="flex w-full flex-col items-center text-sm text-[var(--text-color-lighten)]">
          <p>
            © {new Date().getFullYear()} {DevlogConfig.username} All Rights
            Reserved.
          </p>
          <p>
            Powered By{" "}
            <a
              className="text-[var(--primary-color)] transition-all hover:brightness-110"
              href="https://github.com/kurtyoon"
            >
              Kurtyoon
            </a>{" "}
            &{" "}
            <a
              className="text-[var(--primary-color)] transition-all hover:brightness-110"
              href="https://reactrouter.com/home"
            >
              React Router 7
            </a>
          </p>
          <p>
            <Link
              className="text-[var(--primary-color)] transition-all hover:brightness-110"
              to="/sitemap-index.xml"
            >
              SiteMap
            </Link>{" "}
            /{" "}
            <Link
              className="text-[var(--primary-color)] transition-all hover:brightness-110"
              to="/rss.xml"
            >
              RSS
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
