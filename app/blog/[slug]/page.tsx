import fs from "fs";
import path from "path";
import matter from "gray-matter";
import BlogDetailUI from "@/pages/blog-detail/blog-detail.ui";
import Link from "next/link";
import { serialize } from "next-mdx-remote/serialize";

interface BlogPostParams {
  params: {
    slug: string;
  };
}

async function getPostContent(slug: string) {
  const postsDirectory = path.join(process.cwd(), "src/shared/contents/blog");
  const files = fs.readdirSync(postsDirectory);

  const fileName = slug.endsWith(".md") ? slug : `${slug}.md`;
  const filePath = path.join(postsDirectory, fileName);

  if (!fs.existsSync(filePath)) {
    throw new Error("Post not found");
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const mdxSource = await serialize(content);

  return {
    metadata: {
      title: data.title,
      date: data.date,
      categories: data.categories || [],
      tags: data.tags || [],
      article: data.article,
      author: data.author,
      banner: data.banner,
    },
    content: mdxSource,
  };
}

export default async function BlogDetailPage({ params }: BlogPostParams) {
  try {
    const { metadata, content } = await getPostContent(params.slug);
    return <BlogDetailUI metadata={metadata} content={content} />;
  } catch (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">포스트를 찾을 수 없습니다</h1>
        <Link href="/blog" className="text-blue-500 hover:underline">
          블로그 목록으로 돌아가기
        </Link>
      </div>
    );
  }
}
