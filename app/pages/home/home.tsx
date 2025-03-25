import { PostList } from "~/features/post/ui/post-list";
import MainLayout from "~/shared/layout/main-layout";
import type { Post } from "~/features/post/model/post.types";
import { Pagination } from "~/widgets/pagination";

interface Props {
  posts: Post[];
  currentPage: number;
  totalPages: number;
  prevUrl?: string;
  nextUrl?: string;
  categories: Map<string, { name: string; posts: Post[] }>;
  tags: Map<string, { name: string }>;
}

export default function Home({
  posts,
  currentPage,
  totalPages,
  prevUrl,
  nextUrl,
  categories,
  tags,
}: Props) {
  return (
    <MainLayout categories={categories} tags={tags}>
      <div className="mx-3 flex flex-col gap-4">
        <PostList posts={posts} />
        <Pagination
          lastPage={totalPages}
          current={currentPage}
          prevUrl={prevUrl}
          nextUrl={nextUrl}
        />
      </div>
    </MainLayout>
  );
}
