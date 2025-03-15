import type { Post } from "~/features/post/model/post.types";
import { getPostByIndexOrSlug } from "~/features/post";
import { pipe } from "fp-ts/lib/function";
import * as E from "fp-ts/Either";

interface LoaderData {
  post: Post | null;
}

export async function loader({
  params,
}: {
  params: { id: string; slug?: string };
}) {
  const { id, slug } = params;

  const postRes = await getPostByIndexOrSlug(id ?? slug ?? "")();

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
  };
}

export default function Post({ loaderData }: { loaderData: LoaderData }) {
  return (
    <div>
      <h1>{loaderData.post?.title}</h1>
    </div>
  );
}
