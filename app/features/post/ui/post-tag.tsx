import { Icon } from "@iconify/react";
import { Link } from "react-router";

interface PostTagProps {
  tags?: string[];
}

export default function PostTag({ tags }: PostTagProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="ml-2 hidden lg:block">
      <ul className="flex flex-row space-x-4">
        <li className="flex flex-row items-center space-x-2">
          <CustomIcon icon="mdi:tag-outline" />
          <ul className="flex flex-row space-x-1">
            {tags.slice(0, 3).map((tag, index) => (
              <li key={tag} className="text-[var(--text-color-lighten)]">
                {index > 0 && <span className="pr-1">/</span>}
                <Link
                  to={`/tags/${tag}`}
                  className="hover:text-[var(--primary-color)]"
                >
                  {tag}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}

function CustomIcon({ icon }: { icon: string }) {
  return (
    <div className="flex items-center rounded-xl p-2 bg-[var(--primary-color-lighten)] text-[var(--primary-color)]">
      <Icon icon={icon} className="text-[var(--primary-color)] text-2xl" />
    </div>
  );
}
