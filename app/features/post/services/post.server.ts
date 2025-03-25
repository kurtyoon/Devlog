import type { Post } from "../model/post.types";
import { getReadingMetadata } from "~/shared/lib/markdown";
import * as TE from "fp-ts/lib/TaskEither";
import { flow, pipe } from "fp-ts/lib/function";
import * as A from "fp-ts/lib/Array";
import * as O from "fp-ts/lib/Option";
import * as S from "fp-ts/lib/string";

import {
  createFileMap,
  filterAndSortMarkdownFiles,
  getFileByIndexOrSlug,
  parseFilename,
  parseMarkdown,
  readFile,
  readMarkdownFiles,
} from "../lib/file.utils";
import { fromCompare } from "fp-ts/lib/Ord";
import type { Ordering } from "fp-ts/lib/Ordering";
import type { Archive } from "../../archive/model/archive.types";

const generatePost = (
  index: number,
  slug: string,
  data: any,
  content: string
): TE.TaskEither<Error, O.Option<Post>> =>
  pipe(
    getReadingMetadata(content),
    TE.map((readingMetadata) =>
      data.draft
        ? O.none
        : O.some({
            id: index.toString(),
            slug: slug,
            title: data.title || "Untitled",
            published: new Date(data.published),
            category: data.category || "Uncategorized",
            tags: data.tags || [],
            description: data.description || "",
            thumbnailImage: data.thumbnail || "",
            readingMetadata,
          })
    )
  );

const postOrdByIdDesc = fromCompare<Post>(
  (a, b) => Math.sign(Number(b.id) - Number(a.id)) as Ordering
);

export const getAllPosts = (): TE.TaskEither<Error, Post[]> =>
  pipe(
    readMarkdownFiles,
    TE.map(filterAndSortMarkdownFiles),
    TE.chain((fileNames) => {
      const fileMap = createFileMap(fileNames);

      return pipe(
        fileNames,
        A.map(parseFilename),
        A.compact,
        A.map(({ index, slug, filename }) =>
          pipe(
            readFile(filename),
            TE.chain((fileContent) =>
              pipe(
                parseMarkdown(fileContent),
                O.fold(
                  () =>
                    TE.left(
                      new Error(`Failed to parse markdown file: ${filename}`)
                    ),
                  ({ data, content }) =>
                    generatePost(index, slug, data, content)
                )
              )
            )
          )
        ),
        A.sequence(TE.ApplicativePar),
        TE.map(flow(A.compact, A.sort(postOrdByIdDesc)))
      );
    })
  );

export const getPaginatedPosts = (
  page: number,
  size: number
): TE.TaskEither<Error, Post[]> =>
  pipe(
    getAllPosts(),
    TE.map((posts) => {
      const startIndex = (page - 1) * size;
      const endIndex = startIndex + size;

      return posts.slice(startIndex, endIndex);
    })
  );

export const getTotalPosts = (size: number): TE.TaskEither<Error, number> =>
  pipe(
    getAllPosts(),
    TE.map((posts) => Math.ceil(posts.length / size))
  );

export const getPostByIndexOrSlug = (
  key: number | string
): TE.TaskEither<Error, Post> =>
  pipe(
    readMarkdownFiles,
    TE.map(filterAndSortMarkdownFiles),
    TE.chain((fileNames) => {
      const fileMap = createFileMap(fileNames);
      return pipe(
        getFileByIndexOrSlug(fileMap, key),
        O.fold(
          () => TE.left(new Error(`Post not found: ${key}`)),
          (fileName) =>
            pipe(
              readFile(fileName),
              TE.chain((fileContent) =>
                pipe(
                  parseMarkdown(fileContent),
                  O.fold(
                    () =>
                      TE.left(
                        new Error(`Failed to parse markdown file: ${fileName}`)
                      ),
                    ({ data, content }) => {
                      const parsedFile = pipe(
                        parseFilename(fileName),
                        O.getOrElse(() => ({
                          index: -1,
                          slug: "",
                          filename: fileName,
                        }))
                      );

                      return pipe(
                        generatePost(
                          parsedFile.index,
                          parsedFile.slug,
                          data,
                          content
                        ),
                        TE.chain((postOption) =>
                          pipe(
                            postOption,
                            O.fold(
                              () =>
                                TE.left(
                                  new Error(
                                    `Post is draft or invalid: ${fileName}`
                                  )
                                ),
                              (post) => TE.right({ ...post, content })
                            )
                          )
                        )
                      );
                    }
                  )
                )
              )
            )
        )
      );
    })
  );

export const getTags = (): TE.TaskEither<
  Error,
  Map<string, { name: string }>
> =>
  pipe(
    getAllPosts(),
    TE.map((posts) =>
      pipe(
        posts,
        A.chain((post) => post.tags || []),
        // 중복 제거 및 사전순 정렬
        A.uniq(S.Ord),
        A.sort(S.Ord),
        A.map((tag) => [tag, { name: tag }] as const),
        (entries) => new Map(entries)
      )
    )
  );

export const getCategories = (): TE.TaskEither<
  Error,
  Map<string, { name: string; posts: Post[] }>
> =>
  pipe(
    getAllPosts(),
    TE.map((posts) =>
      pipe(
        posts,
        A.reduce(
          new Map<string, { name: string; posts: Post[] }>(),
          (acc, post) => {
            const categoryName = post.category || "Uncategorized";
            const existingCategory = acc.get(categoryName) || {
              name: categoryName,
              posts: [],
            };

            acc.set(categoryName, {
              ...existingCategory,
              posts: [...existingCategory.posts, post].sort((a, b) =>
                a.title.localeCompare(b.title)
              ),
            });

            return acc;
          }
        )
      )
    )
  );

export const getArchivedPosts = (): TE.TaskEither<
  Error,
  Map<number, Archive[]>
> =>
  pipe(
    getAllPosts(),
    TE.map((posts) =>
      pipe(
        posts,
        A.map((post) => ({
          id: post.id,
          slug: post.slug,
          title: post.title,
          publishedAt: post.published,
        })),
        A.sort(
          fromCompare<Archive>(
            (a, b) =>
              Math.sign(
                Number(b.publishedAt) - Number(a.publishedAt)
              ) as Ordering
          )
        ),
        A.reduce(new Map<number, Archive[]>(), (acc, archive) => {
          const year = new Date(archive.publishedAt).getFullYear();
          const existingArchives = acc.get(year) || [];
          acc.set(year, [...existingArchives, archive]);
          return acc;
        })
      )
    )
  );

export const getArchivedPostsByTag = (
  tag: string
): TE.TaskEither<Error, Map<number, Archive[]>> =>
  pipe(
    getAllPosts(),
    TE.map((posts) =>
      pipe(
        posts,
        A.filter((post) => post.tags?.some((t) => t === tag) || false),
        A.map((post) => ({
          id: post.id,
          slug: post.slug,
          title: post.title,
          publishedAt: post.published,
        })),
        A.sort(
          fromCompare<Archive>(
            (a, b) =>
              Math.sign(
                Number(b.publishedAt) - Number(a.publishedAt)
              ) as Ordering
          )
        ),
        A.reduce(new Map<number, Archive[]>(), (acc, archive) => {
          const year = new Date(archive.publishedAt).getFullYear();
          const existingArchives = acc.get(year) || [];
          acc.set(year, [...existingArchives, archive]);
          return acc;
        })
      )
    )
  );

export const getArchivedPostsByCategory = (
  category: string
): TE.TaskEither<Error, Map<number, Archive[]>> =>
  pipe(
    getAllPosts(),
    TE.map((posts) =>
      pipe(
        posts,
        A.filter((post) => post.category === category),
        A.map((post) => ({
          id: post.id,
          slug: post.slug,
          title: post.title,
          publishedAt: post.published,
        })),
        A.sort(
          fromCompare<Archive>(
            (a, b) =>
              Math.sign(
                Number(b.publishedAt) - Number(a.publishedAt)
              ) as Ordering
          )
        ),
        A.reduce(new Map<number, Archive[]>(), (acc, archive) => {
          const year = new Date(archive.publishedAt).getFullYear();
          const existingArchives = acc.get(year) || [];
          acc.set(year, [...existingArchives, archive]);
          return acc;
        })
      )
    )
  );
