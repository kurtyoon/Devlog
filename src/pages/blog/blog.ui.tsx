"use client";

import { ReadBlogList } from "@/features/blog/read-blog-list";

interface IPostCardProps {
  title: string;
  date: string;
  categories: string[];
  tags: string[];
  article: string;
  author: string;
  banner?: string;
  published: boolean;
  fileName: string;
}

interface IReadBlogListProps {
  posts: IPostCardProps[];
  currentPage: number;
  totalPages: number;
}

const BlogUI = (props: IReadBlogListProps) => {
  const { posts, currentPage, totalPages } = props;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <ReadBlogList
        posts={posts}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default BlogUI;
