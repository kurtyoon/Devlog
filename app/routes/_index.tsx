import type { Post } from "~/features/post/model/post.types";
import { Home } from "~/pages/home";
import type { Route } from "../+types/root";
import { getAllPosts, getCategories, getTags } from "~/features/post";
import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/lib/function";

interface LoaderData {
  posts: Post[];
  categories: Map<string, { name: string; posts: Post[] }>;
  tags: Map<string, { name: string }>;
}

export async function loader({ params }: Route.LoaderArgs) {
  const [postsRes, categoriesRes, tagsRes] = await Promise.all([
    getAllPosts()(),
    getCategories()(),
    getTags()(),
  ]);

  return {
    posts: pipe(
      postsRes,
      E.fold(
        (error) => {
          console.error("Error loading posts:", error.message);
          return [];
        },
        (postList) => postList
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

export default function Index({ loaderData }: { loaderData: LoaderData }) {
  return (
    <Home
      posts={loaderData.posts}
      categories={loaderData.categories}
      tags={loaderData.tags}
    />
  );
}
