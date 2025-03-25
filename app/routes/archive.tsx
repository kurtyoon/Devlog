import MainLayout from "~/shared/layout/main-layout";
import type { Post } from "~/features/post/model/post.types";
import type { Route } from "../+types/root";
import { getArchivedPosts, getTags } from "~/features/post";
import { getCategories } from "~/features/post";
import { pipe } from "fp-ts/lib/function";
import * as E from "fp-ts/lib/Either";
import { ArchivePage } from "~/pages/archive";
import type { Archive } from "~/features/archive/model/archive.types";
import { ScrollToTopButton } from "~/widgets/scroll-to-top-button";

interface LoaderData {
  categories: Map<string, { name: string; posts: Post[] }>;
  tags: Map<string, { name: string }>;
  archives: Map<number, Archive[]>;
}

export async function loader({ request }: Route.LoaderArgs) {
  const [categoriesRes, tagsRes, archivesRes] = await Promise.all([
    getCategories()(),
    getTags()(),
    getArchivedPosts()(),
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

export default function Archive({ loaderData }: { loaderData: LoaderData }) {
  return (
    <div className="flex flex-col">
      <MainLayout categories={loaderData.categories} tags={loaderData.tags}>
        <ArchivePage archiveMap={loaderData.archives} />
      </MainLayout>
      <ScrollToTopButton />
    </div>
  );
}
