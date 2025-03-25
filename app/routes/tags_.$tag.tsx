import MainLayout from "~/shared/layout/main-layout";
import type { Post } from "~/features/post/model/post.types";
import { getArchivedPostsByTag, getCategories, getTags } from "~/features/post";
import { pipe } from "fp-ts/lib/function";
import * as E from "fp-ts/lib/Either";
import type { Archive } from "~/features/archive/model/archive.types";
import { TagPage } from "~/pages/tag";
import { ScrollToTopButton } from "~/widgets/scroll-to-top-button";

interface LoaderData {
  categories: Map<string, { name: string; posts: Post[] }>;
  tags: Map<string, { name: string }>;
  archives: Map<number, Archive[]>;
}

export async function loader({ params }: { params: { tag: string } }) {
  const { tag } = params;

  const [categoriesRes, tagsRes, archivesRes] = await Promise.all([
    getCategories()(),
    getTags()(),
    getArchivedPostsByTag(tag)(),
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

export default function Tags({ loaderData }: { loaderData: LoaderData }) {
  return (
    <div className="flex flex-col">
      <MainLayout categories={loaderData.categories} tags={loaderData.tags}>
        <TagPage archiveMap={loaderData.archives} />
      </MainLayout>
      <ScrollToTopButton />
    </div>
  );
}
