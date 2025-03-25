import { Markdown } from "~/widgets/markdown";
import type { Post } from "~/features/post/model/post.types";
import MainLayout from "~/shared/layout/main-layout";
import { Comment } from "~/widgets/comment";

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
        <Comment />
      </article>
    </MainLayout>
  );
}
