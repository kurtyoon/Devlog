import { pipe } from "fp-ts/lib/function";
import * as E from "fp-ts/lib/Either";
import { getCategories, getTags } from "~/features/post";
import type { Post } from "~/features/post/model/post.types";
import MainLayout from "~/shared/layout/main-layout";
import type { Route } from "../+types/root";
import { AboutPage } from "~/pages/about";

interface LoaderData {
  categories: Map<string, { name: string; posts: Post[] }>;
  tags: Map<string, { name: string }>;
}

export async function loader({ request }: Route.LoaderArgs) {
  const [categoriesRes, tagsRes] = await Promise.all([
    getCategories()(),
    getTags()(),
  ]);

  return {
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

export default function About({ loaderData }: { loaderData: LoaderData }) {
  return (
    <MainLayout categories={loaderData.categories} tags={loaderData.tags}>
      <AboutPage />
    </MainLayout>
  );
}
