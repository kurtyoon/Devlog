import MainLayout from "~/shared/layout/main-layout";
import {
  getArchivedPostsByCategory,
  getCategories,
  getTags,
} from "~/features/post";
import { pipe } from "fp-ts/lib/function";
import * as E from "fp-ts/lib/Either";
import type { Post } from "~/features/post/model/post.types";
import type { Archive } from "~/features/archive/model/archive.types";
import { ScrollToTopButton } from "~/widgets/scroll-to-top-button";
import { CategoryPage } from "~/pages/category";

interface LoaderData {
  categories: Map<string, { name: string; posts: Post[] }>;
  tags: Map<string, { name: string }>;
  archives: Map<number, Archive[]>;
}

export async function loader({ params }: { params: { category: string } }) {
  const { category } = params;

  const [categoriesRes, tagsRes, archivesRes] = await Promise.all([
    getCategories()(),
    getTags()(),
    getArchivedPostsByCategory(category)(),
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
    archives: pipe(
      archivesRes,
      E.fold(
        (error) => {
          console.error("Error loading archives:", error.message);
          return new Map();
        },
        (archives) => archives
      )
    ),
  };
}

export default function Categories({ loaderData }: { loaderData: LoaderData }) {
  return (
    <div>
      <MainLayout categories={loaderData.categories} tags={loaderData.tags}>
        <CategoryPage archiveMap={loaderData.archives} />
      </MainLayout>
      <ScrollToTopButton />
    </div>
  );
}
