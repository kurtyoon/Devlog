import { Link } from "react-router";
import { getCoverImage } from "~/shared/lib/cover";
import PostMetadata from "./metadata";
import PostTag from "./post-tag";
import { useTranslation } from "~/shared/locale/translation";
import Key from "~/shared/locale/key";
import PostThumbnail from "./thumbnail";
import type { Post } from "../model/post.types";
import { Icon } from "@iconify/react";
import { formatDate } from "~/shared/lib/date";
import { DevlogConfig } from "~/shared/config";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const entryId = post.id;
  const contentUrl = `/posts/${entryId}`;
  const { time, wordCount } = post.readingMetadata;

  const coverImage = getCoverImage(entryId);

  if (!post.thumbnailImage) {
    post.thumbnailImage = coverImage;
  }

  return (
    <div className="mx-3 flex flex-col rounded-3xl bg-[var(--card-color)] lg:mx-0 lg:h-[212px]">
      {/* Mobile */}
      <Link
        to={contentUrl}
        className="relative h-[128px] transition-all hover:brightness-75 lg:hidden"
      >
        <img
          className="absolute left-0 top-0 h-full w-full rounded-t-3xl object-cover lg:hidden"
          src={post.thumbnailImage}
          alt="CoverPost"
        />
        <div className="absolute bottom-2 w-full">
          <div className="mx-2 flex flex-row justify-between">
            <div className="flex flex-row items-center space-x-2 rounded-md bg-black/50 px-1.5 py-0.5 text-[var(--primary-color-lighten)] dark:text-[var(--text-color)]">
              <Icon icon="cuida:calendar-outline" />
              <span className="select-none">
                {formatDate(post.published, DevlogConfig.locale)}
              </span>
            </div>
            {post.category && (
              <div className="flex flex-row items-center space-x-2 rounded-md bg-black/50 px-1.5 py-0.5 text-[var(--primary-color-lighten)] dark:text-[var(--text-color)]">
                <Icon icon="dashicons:category" />
                <span className="max-w-28 select-none truncate">
                  {post.category}
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="flex h-[128px] flex-row lg:h-[212px]">
        <div className="flex flex-col w-full justify-between p-3 lg:w-[calc(var((--page-width-lg)-404px)] lg:py-7 lg:pr-0 xl:w-[calc(var(--page-width-xl)-676px)]">
          {/* 제목 */}
          <div className="flex w-full flex-row items-center">
            <div className="mx-2 hidden h-6 w-1 translate-y-[1px] rounded-lg bg-[var(--primary-color)] lg:block" />
            <Link
              to={contentUrl}
              className="flex items-center text-xl font-semibold text-[var(--text-color)] transition-all hover:text-[var(--primary-color)] lg:text-2xl"
            >
              <p className="truncate">{post.title}</p>
              <Icon
                icon="cuida:caret-right-outline"
                className="translate-y-[0.07rem] text-[var(--primary-color)]"
              />
            </Link>
          </div>

          <PostMetadata
            published={post.published}
            category={post.category}
            tags={post.tags}
          />

          {/* Description */}
          <div className="lg:ml-2">
            <p className="text-[var(--text-color)] line-clamp-1">
              {post.description}
            </p>
          </div>

          {/* Reading Metadata */}
          <div className="select-none lg:ml-2 text-sm text-[var(--text-color-lighten)] space-x-3">
            <span>
              {`${wordCount} `}
              {useTranslation(Key.post_card_words)}
            </span>
            <span>|</span>
            <span>
              {`${time} `}
              {useTranslation(Key.post_card_minutes)}
            </span>
          </div>
        </div>

        {/* Thumbnail */}
        <PostThumbnail
          thumbnailImage={post.thumbnailImage}
          postId={entryId}
          contentUrl={contentUrl}
        />
      </div>
    </div>
  );
}
