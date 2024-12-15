import fs from "fs";
import path from "path";
import matter from "gray-matter";
import BlogUI from "@/pages/blog/blog.ui";

interface PostMetadata {
  title: string;
  date: string;
  categories: string[];
  tags: string[];
  article: string;
  author: string;
  banner?: string;
  published: boolean;
}

async function getPostMetadata(
  page: number = 1,
  postsPerPage: number = 6,
): Promise<{
  posts: (PostMetadata & { fileName: string })[];
  totalPages: number;
}> {
  const postsDirectory = path.join(process.cwd(), "src/shared/contents/blog");
  const files = fs.readdirSync(postsDirectory);

  const posts = files
    .filter((file) => file.endsWith(".md"))
    .map((fileName) => {
      const filePath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);

      return {
        title: data.title,
        date: data.date,
        categories: data.categories || [],
        tags: data.tags || [],
        article: data.article,
        author: data.author,
        banner: data.banner,
        published: data.published,
        fileName,
      };
    })
    .filter((post) => post.published !== false)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (page - 1) * postsPerPage;
  const paginatedPosts = posts.slice(startIndex, startIndex + postsPerPage);

  return {
    posts: paginatedPosts,
    totalPages,
  };
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = Number(searchParams.page) || 1;
  const { posts, totalPages } = await getPostMetadata(currentPage);

  return (
    <BlogUI posts={posts} currentPage={currentPage} totalPages={totalPages} />
  );
}
