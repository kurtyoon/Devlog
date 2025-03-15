import { formatDate } from "~/shared/lib/date";
import { Markdown } from "~/widgets/markdown";
import type { Post } from "~/features/post/model/post.types";
import MainLayout from "~/shared/layout/main-layout";

interface PostProps {
  post: Post;
  categories: Map<string, { name: string; posts: Post[] }>;
  tags: Map<string, { name: string }>;
}

export default function Post({ post, categories, tags }: PostProps) {
  return (
    <MainLayout
      categories={categories}
      tags={tags}
      bannerImage={post.thumbnailImage}
      title={post.title}
      subTitle={post.description}
    >
      <article className="mx-auto px-10 py-10 bg-[var(--card-color)] rounded-2xl">
        <div className="prose prose-lg dark:prose-invert">
          <Markdown>{post.content!}</Markdown>
        </div>
      </article>
    </MainLayout>
  );
}

function BackButton() {
  return (
    <div className="mb-4 flex items-center gap-2">
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-1 rounded-lg bg-gray-50 px-2 py-1 text-sm text-gray-500 transition-colors hover:bg-gray-100 dark:bg-gray-800/50 dark:text-gray-400 dark:hover:bg-gray-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </button>
    </div>
  );
}
