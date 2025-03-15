import { Icon } from "@iconify/react";
import { Link } from "react-router";
import { DevlogConfig } from "~/shared/config";
import { formatDate } from "~/shared/lib/date";
import PostTag from "./post-tag";

interface PostMetadataProps {
  published: Date;
  category?: string;
  tags?: string[];
}

export default function PostMetadata({
  published,
  category,
  tags,
}: PostMetadataProps) {
  return (
    <div className="ml-2 hidden lg:block">
      <ul className="flex flex-row space-x-4 text-[var(--text-color-lighten)]">
        <li className="flex items-center flex-row space-x-2">
          <CustomIcon icon="cuida:calendar-outline" />
          <span className="select-none">
            {formatDate(published, DevlogConfig.locale)}
          </span>
        </li>
        {category && (
          <li className="flex flex-row items-center space-x-1.5">
            <CustomIcon icon="dashicons:category" />
            <Link
              to={`/categories/${category}`}
              className="select-none rounded-md px-1.5 py-0.5 text-[var(--text-color-lighten)] transition-all hover:bg-[var(--primary-color-lighten)] hover:text-[var(--primary-color)]"
            >
              {category}
            </Link>
          </li>
        )}
        <li className="flex items-center flex-row space-x-2">
          <PostTag tags={tags} />
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
