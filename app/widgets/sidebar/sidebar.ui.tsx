import { Link } from "react-router";
import { DevlogConfig } from "~/shared/config";
import { SocialIcon } from "./social-icon.ui";
import { useTranslation } from "~/shared/locale/translation";
import Key from "~/shared/locale/key";

interface SidebarProps {
  categories: Map<string, { name: string; posts: any[] }>;
  tags: Map<string, { name: string }>;
}

export default function Sidebar({ categories, tags }: SidebarProps) {
  return (
    <div className="flex flex-row w-full justify-center">
      <div className="flex flex-col space-y-3">
        {/* Profile Card */}
        <div
          className="onload-animation rounded-3xl bg-[var(--card-color)] p-3"
          style={{ animationDelay: "var(--onload-animation-delay)" }}
        >
          <Link
            to="/about"
            className="relative group
          "
          >
            <img
              src={DevlogConfig.avatarUrl}
              alt="avatar"
              width={224}
              height={224}
              className={`h-56 w-56 rounded-xl transition-all hover:cursor-pointer lozad select-none object-cover`}
            />
            <span className="absolute left-0 top-0 h-56 w-56 rounded-xl transition-all content-[''] group-hover:bg-black/25 dark:group-hover:bg-black/50" />
          </Link>
          <div className="text-center text-xl font-semibold text-[var(--text-color)] mt-2">
            <p>{DevlogConfig.username}</p>
          </div>
          <p className="slogan mt-2 text-center text-[var(--text-color-lighten)]">
            {DevlogConfig.sign}
          </p>
          {DevlogConfig.socialLinks.length > 0 && (
            <div className="mt-1 flex flex-row justify-center">
              <div className="flex w-[184px] flex-wrap justify-center gap-2">
                {DevlogConfig.socialLinks.map((item, index) => (
                  <SocialIcon key={index} name={item.icon} link={item.link} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Categories */}
        {categories.size !== 0 && (
          <div
            className="onload-animation space-y-2 rounded-3xl bg-[var(--card-color)] p-4"
            style={{
              animationDelay:
                "calc(var(--onload-animation-delay) + 1 * var(--onload-animation-interval))",
            }}
          >
            <div className="flex flex-row items-center relative">
              <span className="absolute left-0 top-1 bottom-1 w-1 bg-[var(--primary-color)] rounded-lg" />
              <p className="pl-4 text-xl font-bold text-[var(--text-color)] font-primary">
                {useTranslation(Key.side_bar_categories)}
              </p>
            </div>
            <div className="flex flex-col">
              {Array.from(categories.keys()).map((category) => (
                <Link
                  key={category}
                  to={`/categories/${category}`}
                  className="flex flex-row items-center justify-between rounded-lg px-3 py-2 transition-all hover:bg-[var(--primary-color-lighten)] font-primary"
                >
                  <p className="text-[var(--text-color)] transition-all group-hover:pl-2 group-hover:text-[var(--primary-color)]">
                    {categories.get(category)!.name}
                  </p>
                  <span className="rounded-md bg-[var(--primary-color-lighten)] px-2.5 py-0.5 text-[var(--primary-color)]">
                    {categories.get(category)!.posts.length}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {tags.size !== 0 && (
          <div
            className="onload-animation space-y-2 rounded-3xl bg-[var(--card-color)] p-4"
            style={{
              animationDelay:
                "calc(var(--onload-animation-delay) + 2 * var(--onload-animation-interval))",
            }}
          >
            <div className="flex flex-row items-center relative">
              <span className="absolute left-0 top-1 bottom-1 w-1 bg-[var(--primary-color)] rounded-lg" />
              <p className="pl-4 text-xl font-bold text-[var(--text-color)] font-primary">
                {useTranslation(Key.side_bar_tags)}
              </p>
            </div>
            <div className="flex max-w-[224px] flex-row flex-wrap">
              {Array.from(tags.keys()).map((tag) => (
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
        )}
      </div>
    </div>
  );
}
