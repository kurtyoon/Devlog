"use client";

import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote";
import { useState } from "react";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

interface BlogDetailProps {
  metadata: {
    title: string;
    date: string;
    categories: string[];
    tags: string[];
    article: string;
    author: string;
    banner?: string;
  };
  content: MDXRemoteSerializeResult;
}

function BlogHeader({ metadata }: { metadata: BlogDetailProps["metadata"] }) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <div className="mb-4 sm:mb-6 md:mb-8">
      {metadata.banner && (
        <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] mb-4 sm:mb-5 md:mb-6">
          {imageLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
          )}
          <Image
            src={metadata.banner}
            alt={metadata.title}
            fill
            className={`object-cover rounded-lg ${
              imageLoading
                ? "opacity-0"
                : "opacity-100 transition-opacity duration-300"
            }`}
            priority
            onLoadingComplete={() => setImageLoading(false)}
            unoptimized
          />
        </div>
      )}
      <div className={`${imageLoading ? "animate-pulse" : ""}`}>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
          {metadata.title}
        </h1>
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
          <span>{new Date(metadata.date).toLocaleDateString("ko-KR")}</span>
          <span>•</span>
          <span>{metadata.author}</span>
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {metadata.categories.map((category, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BlogDetailUI({ metadata, content }: BlogDetailProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 py-4 sm:py-6 md:py-8">
      <Link
        href="/blog"
        className="inline-block mb-4 sm:mb-6 md:mb-8 text-gray-600 hover:text-gray-900 text-sm sm:text-base"
      >
        ← 목록으로 돌아가기
      </Link>

      <BlogHeader metadata={metadata} />

      <div>
        <MDXRemote
          {...content}
          components={{
            h1: ({ children }) => (
              <h1 className="my-4 text-h1 font-bold">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="my-4 text-h2 font-bold">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="my-3 text-h3 font-bold">{children}</h3>
            ),
            h4: ({ children }) => (
              <h4 className="my-3 text-h4 font-bold">{children}</h4>
            ),
            h5: ({ children }) => (
              <h5 className="my-2 text-h5 font-bold">{children}</h5>
            ),

            ul: ({ children }) => (
              <ul className="my-2 ml-6 list-disc">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="my-2 ml-6 list-decimal">{children}</ol>
            ),
            li: ({ children }) => (
              <li className="my-1 text-sub2">{children}</li>
            ),
            img: ({ src, alt }) => (
              <div className="relative h-[400px] w-full">
                <Image
                  src={src || ""}
                  alt={alt || ""}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            ),
            code: ({ children, className }) => {
              const match = /language-(\w+)/.exec(className || "");
              const language = match ? match[1] : "";

              return (
                <code
                  className={`${language ? `language-${language}` : ""} text-red-500`}
                >
                  {children}
                </code>
              );
            },
          }}
        />
      </div>
    </article>
  );
}
