import { PostList } from "~/features/post/ui/post-list";
import MainLayout from "~/shared/layout/main-layout";
import type { Post } from "~/features/post/model/post.types";

interface Props {
  posts: Post[];
  categories: Map<string, { name: string; posts: Post[] }>;
  tags: Map<string, { name: string }>;
}

export default function Home({ posts, categories, tags }: Props) {
  return (
    <MainLayout categories={categories} tags={tags}>
      <div className="mx-3">
        <PostList posts={posts} />
      </div>
    </MainLayout>
  );
}
