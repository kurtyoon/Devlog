import type { Post } from "../model/post.types";
import { getReadingMetadata } from "~/shared/lib/markdown";
import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/function";
import * as A from "fp-ts/Array";
import * as O from "fp-ts/Option";
import {
  createFileMap,
  filterAndSortMarkdownFiles,
  getFileByIndexOrSlug,
  parseFilename,
  parseMarkdown,
  readFile,
  readMarkdownFiles,
} from "../lib/file.utils";

const generatePost = (
  index: number,
  slug: string,
  data: any,
  content: string
) =>
  pipe(
    getReadingMetadata(content),
    TE.map((readingMetadata) => ({
      id: index.toString(),
      slug: slug,
      title: data.title || "Untitled",
      published: new Date(data.published),
      category: data.category || "Uncategorized",
      tags: data.tags || [],
      description: data.description || "",
      thumbnailImage: data.thumbnail || "",
      readingMetadata,
    }))
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
        A.sequence(TE.ApplicativePar)
      );
    })
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
                        TE.map((post) => ({
                          ...post,
                          content,
                        }))
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
              posts: [...existingCategory.posts, post],
            });

            return acc;
          }
        )
      )
    )
  );
