import type { Post as PostType } from "~/features/post/model/post.types";
import { getCategories, getPostByIndexOrSlug, getTags } from "~/features/post";
import { pipe } from "fp-ts/lib/function";
import * as E from "fp-ts/Either";
import PostPage from "~/pages/post/post";

interface LoaderData {
  post: PostType;
  categories: Map<string, { name: string; posts: PostType[] }>;
  tags: Map<string, { name: string }>;
}

export async function loader({ params }: { params: { id: string } }) {
  const { id } = params;

  const [postRes, categoriesRes, tagsRes] = await Promise.all([
    getPostByIndexOrSlug(id ?? "")(),
    getCategories()(),
    getTags()(),
  ]);

  return {
    post: pipe(
      postRes,
      E.fold(
        (error) => {
          console.error("Error loading post:", error.message);
          return null;
        },
        (post) => post
      )
    ),
    categories: pipe(
      categoriesRes,
      E.fold(
        (error) => {
          console.error("Error loading categories:", error.message);
          return new Map();
        },
        (categoryList) => categoryList
      )
    ),
    tags: pipe(
      tagsRes,
      E.fold(
        (error) => {
          console.error("Error loading tags:", error.message);
          return new Map();
        },
        (tagList) => tagList
      )
    ),
  };
}

export default function Post({ loaderData }: { loaderData: LoaderData }) {
  return (
    <div>
      <PostPage
        post={loaderData.post}
        categories={loaderData.categories}
        tags={loaderData.tags}
      />
    </div>
  );
}
