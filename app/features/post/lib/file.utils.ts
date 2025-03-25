import path from "path";
import constants from "~/shared/constants/constants";
import { pipe } from "fp-ts/lib/function";
import * as O from "fp-ts/lib/Option";
import * as A from "fp-ts/lib/Array";
import * as Ord from "fp-ts/lib/Ord";
import type { Ordering } from "fp-ts/lib/Ordering";
import * as TE from "fp-ts/lib/TaskEither";
import matter from "gray-matter";
import fs from "fs";

const postsDirectory = path.join(process.cwd(), constants.directories.posts);

export const parseFilename = (
  filename: string
): O.Option<{ index: number; slug: string; filename: string }> => {
  const match = filename.match(/^(\d+)\.\s(.+)\.md$/);

  return pipe(
    O.fromNullable(match),
    O.map(([_, index, slug]) => ({
      index: parseInt(index, 10),
      slug: slug.trim().replace(/\s+/g, "-"),
      filename,
    }))
  );
};

export const createFileMap = (
  files: string[]
): Record<number | string, string> =>
  pipe(
    files,
    A.map(parseFilename),
    A.compact,
    A.reduce({}, (acc, { index, slug, filename }) => ({
      ...acc,
      [index]: filename,
      [slug]: filename,
    }))
  );

export const getFileByIndexOrSlug = (
  fileMap: Record<number | string, string>,
  key: number | string
) => O.fromNullable(fileMap[key]);

export const readMarkdownFiles: TE.TaskEither<Error, string[]> = TE.tryCatch(
  () => Promise.resolve(fs.readdirSync(postsDirectory)),
  (reason) => new Error(`Failed to read markdown files: ${String(reason)}`)
);

export const filterAndSortMarkdownFiles = (files: string[]): string[] =>
  pipe(
    files,
    A.filter((file) => file.endsWith(".md")),
    A.sort(
      Ord.fromCompare<string>(
        (a, b) => Math.sign(b.localeCompare(a)) as Ordering
      )
    )
  );

export const readFile = (fileName: string): TE.TaskEither<Error, string> =>
  TE.tryCatch(
    () =>
      Promise.resolve(
        fs.readFileSync(path.join(postsDirectory, fileName), "utf8")
      ),
    (reason) => new Error(`Failed to read file: ${String(reason)}`)
  );

export const parseMarkdown = (content: string) =>
  pipe(
    O.tryCatch(() => matter(content)),
    O.map(({ data, content }) => ({ data, content }))
  );
