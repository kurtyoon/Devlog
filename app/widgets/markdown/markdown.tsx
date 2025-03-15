import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import gfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import "./style.css";

interface MarkdownWrapperProps {
  children: string;
}

export default function Markdown({ children }: MarkdownWrapperProps) {
  return (
    <div className="prose prose-sm lg:prose-base dark:prose-invert max-w-full rounded-lg">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeKatex]}
        remarkPlugins={[gfm]}
        components={{
          img: ({ src, alt }) => (
            <img src={src} alt={alt} className="rounded-lg w-full mb-8" />
          ),

          a: ({ href, children }) => (
            <a href={href} className="text-[var(--primary-color)] underline">
              {children}
            </a>
          ),

          h1: ({ children }) => (
            <div className="relative mb-8 flex flex-row items-center">
              <span className="absolute left-0 top-1 bottom-1 w-1 bg-[var(--primary-color)] rounded-lg" />
              <h1 className="pl-4 text-3xl font-bold text-[var(--text-color)]">
                {children}
              </h1>
            </div>
          ),

          h2: ({ children }) => (
            <div className="relative mb-7 flex flex-row items-center">
              <span className="absolute left-0 top-1 bottom-1 w-1 bg-[var(--primary-color)] rounded-lg" />
              <h2 className="pl-4 text-2xl font-bold text-[var(--text-color)]">
                {children}
              </h2>
            </div>
          ),

          h3: ({ children }) => (
            <div className="relative mb-6 flex flex-row items-center">
              <span className="absolute left-0 top-1 bottom-1 w-1 bg-[var(--primary-color)] rounded-lg" />
              <h3 className="pl-4 text-xl font-bold text-[var(--text-color)]">
                {children}
              </h3>
            </div>
          ),

          h4: ({ children }) => (
            <div className="relative mb-5 flex flex-row items-center">
              <span className="absolute left-0 top-1 bottom-1 w-1 bg-[var(--primary-color)] rounded-lg" />
              <h4 className="pl-4 text-lg font-bold text-[var(--text-color)]">
                {children}
              </h4>
            </div>
          ),

          h5: ({ children }) => (
            <div className="relative mb-4 flex flex-row items-center">
              <span className="absolute left-0 top-1 bottom-1 w-1 bg-[var(--primary-color)] rounded-lg" />
              <h5 className="pl-4 text-base font-bold text-[var(--text-color)]">
                {children}
              </h5>
            </div>
          ),

          h6: ({ children }) => (
            <div className="relative mb-3 flex flex-row items-center">
              <span className="absolute left-0 top-1 bottom-1 w-1 bg-[var(--primary-color)] rounded-lg" />
              <h6 className="pl-4 text-sm font-bold text-[var(--text-color)]">
                {children}
              </h6>
            </div>
          ),

          p: ({ children }) => (
            <p className="text-base mb-6 text-[var(--text-color)]">
              {children}
            </p>
          ),

          ol: ({ children }) => (
            <ol className="list-decimal pl-5 mb-6 text-[var(--text-color)] marker:!text-[var(--primary-color)]">
              {children}
            </ol>
          ),

          ul: ({ children }) => (
            <ul className="list-disc pl-5 mb-6 text-[var(--text-color)] marker:!text-[var(--primary-color)]">
              {children}
            </ul>
          ),

          li: ({ children }) => (
            <li className="text-base mb-3 text-[var(--text-color)] marker:!text-[var(--primary-color)]">
              {children}
            </li>
          ),

          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[var(--primary-color)] bg-[var(--primary-color-transparent)] text-[var(--text-color)] py-3 pl-4 pr-4 lg:pl-5 rounded-md font-normal my-6">
              <p className="m-0 p-0 first:pt-[0.4rem] last:pb-[0.4rem]">
                {children}
              </p>
            </blockquote>
          ),

          code: ({ children, className, node }) => {
            const isCodeBlock = className?.includes("language-");

            if (isCodeBlock) {
              return <code className={className}>{children}</code>;
            }

            return (
              <code className="bg-[var(--primary-color-lighten)] text-[var(--primary-color)] p-0.5 font-bold rounded-md text-sm">
                {children}
              </code>
            );
          },

          pre: ({ children }) => {
            return (
              <pre className="bg-[var(--dark-primary-color)] p-5 rounded-xl mb-8 text-sm overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800">
                <code className="text-white flex flex-col">{children}</code>
              </pre>
            );
          },

          hr: () => (
            <hr className="my-8 border-t border-[var(--primary-color-lighten)]" />
          ),

          table: ({ children }) => (
            <table className="w-full mb-8">{children}</table>
          ),

          thead: ({ children }) => (
            <thead className="text-[var(--text-color)] text-sm">
              {children}
            </thead>
          ),

          th: ({ children }) => (
            <th className="border-b border-gray-300 dark:border-gray-600 text-sm px-5 py-3 text-left">
              {children}
            </th>
          ),

          tr: ({ children }) => (
            <tr className="border-b border-gray-200 dark:border-gray-600 text-sm text-[var(--text-color)]">
              {children}
            </tr>
          ),

          td: ({ children, className }) => (
            <td
              className={`px-5 py-3 font-normal ${
                className?.includes("text-center")
                  ? "text-center"
                  : className?.includes("text-right")
                    ? "text-right"
                    : "text-left"
              }`}
            >
              {children}
            </td>
          ),

          strong: ({ children }) => (
            <strong className="font-bold">{children}</strong>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
