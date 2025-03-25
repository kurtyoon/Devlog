import type { Post } from "~/features/post/model/post.types";
import { Home } from "~/pages/home";
import type { Route } from "../+types/root";
import {
  getCategories,
  getPaginatedPosts,
  getTags,
  getTotalPosts,
} from "~/features/post";
import * as E from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { constants } from "~/shared/constants";

interface LoaderData {
  posts: Post[];
  currentPage: number;
  totalPages: number;
  prevUrl?: string;
  nextUrl?: string;
  categories: Map<string, { name: string; posts: Post[] }>;
  tags: Map<string, { name: string }>;
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const currentPage = Math.max(1, Number(url.searchParams.get("page") || 1));

  const [postsRes, totalPagesRes, categoriesRes, tagsRes] = await Promise.all([
    getPaginatedPosts(currentPage, constants.pagination.size)(),
    getTotalPosts(constants.pagination.size)(),
    getCategories()(),
    getTags()(),
  ]);

  const makePageUrl = (page: number) => (page === 1 ? "/" : `?page=${page}`);

  const posts = pipe(
    postsRes,
    E.fold(
      (error) => {
        console.error(
          "Error loading posts:",
          error instanceof Error ? error.message : "Unknown error"
        );
        return [];
      },
      (posts) => posts
    )
  );

  const totalPages = pipe(
    totalPagesRes,
    E.getOrElse(() => 1)
  );

  return {
    posts,
    currentPage,
    totalPages,
    prevUrl: currentPage > 1 ? makePageUrl(currentPage - 1) : undefined,
    nextUrl:
      currentPage < totalPages ? makePageUrl(currentPage + 1) : undefined,
    categories: pipe(
      categoriesRes,
      E.getOrElse(() => new Map())
    ),
    tags: pipe(
      tagsRes,
      E.getOrElse(() => new Map())
    ),
  };
}

export default function Index({ loaderData }: { loaderData: LoaderData }) {
  return (
    <Home
      posts={loaderData.posts}
      currentPage={loaderData.currentPage}
      totalPages={loaderData.totalPages}
      prevUrl={loaderData.prevUrl}
      nextUrl={loaderData.nextUrl}
      categories={loaderData.categories}
      tags={loaderData.tags}
    />
  );
}
