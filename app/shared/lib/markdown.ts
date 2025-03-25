import { remark } from "remark";
import strip from "strip-markdown";
import * as TE from "fp-ts/lib/TaskEither";
import * as E from "fp-ts/lib/Either";
import * as O from "fp-ts/lib/Option";
import * as A from "fp-ts/lib/Array";
import { pipe } from "fp-ts/lib/function";
import constants from "../constants/constants";

interface ReadingMetadata {
  time: number;
  wordCount: number;
}

type Texts = string;
type Words = number;
type Minutes = number;

const stripMarkdown = (markdown: Texts): TE.TaskEither<Error, Texts> =>
  TE.tryCatch(
    () =>
      remark()
        .use(strip)
        .process(markdown)
        .then((result) => result.toString()),
    E.toError
  );

const charCodeAt =
  (index: number) =>
  (text: Texts): O.Option<number> =>
    pipe(text.charAt(index), (char) =>
      char ? O.some(char.charCodeAt(0)) : O.none
    );

const isInRange =
  (start: number, end: number) =>
  (code: number): boolean =>
    code >= start && code <= end;

const isCJKChar = (char: Texts): boolean =>
  pipe(
    charCodeAt(0)(char),
    O.map(
      (code) =>
        isInRange(0x4e00, 0x9fff)(code) ||
        isInRange(0x3040, 0x309f)(code) ||
        isInRange(0x30a0, 0x30ff)(code) ||
        isInRange(0xac00, 0xd7af)(code)
    ),
    O.getOrElse(() => false)
  );

const analyzeText = (text: Texts) => {
  const chars = [...text];

  return pipe(
    chars,
    A.reduce({ wordCount: 0, cjkCount: 0, prevIsCJK: false }, (acc, char) => {
      const currentIsCJK = isCJKChar(char);
      const isSpace = /\s/.test(char);

      const newWordCount = pipe(
        O.some(acc),
        O.filter(() => !isSpace),
        O.map(({ prevIsCJK }) =>
          (currentIsCJK && !prevIsCJK) || (!currentIsCJK && !prevIsCJK)
            ? acc.wordCount + 1
            : acc.wordCount
        ),
        O.getOrElse(() => acc.wordCount)
      );

      const newCJKCount = currentIsCJK ? acc.cjkCount + 1 : acc.cjkCount;

      return {
        wordCount: newWordCount,
        cjkCount: newCJKCount,
        prevIsCJK: currentIsCJK,
      };
    })
  );
};

const calculateReadingTime = ({
  wordCount,
  cjkCount,
}: {
  wordCount: Words;
  cjkCount: number;
}): Minutes =>
  Math.ceil(
    wordCount / constants.readingMetadata.wordsPerMinute +
      cjkCount / constants.readingMetadata.chineseKoreanCharsPerMinute
  );

const createMetadata = ({
  time,
  wordCount,
}: {
  wordCount: Words;
  time: Minutes;
}): ReadingMetadata => ({
  time,
  wordCount,
});

export const getReadingMetadata = (
  markdown: Texts
): TE.TaskEither<Error, ReadingMetadata> =>
  pipe(
    markdown,
    stripMarkdown,
    TE.map((text) => {
      const analysis = analyzeText(text);
      const time = calculateReadingTime({
        wordCount: analysis.wordCount,
        cjkCount: analysis.cjkCount,
      });

      return createMetadata({
        time,
        wordCount: analysis.wordCount,
      });
    }),
    TE.mapError(E.toError)
  );
