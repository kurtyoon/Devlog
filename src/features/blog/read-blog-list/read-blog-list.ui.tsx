"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";

/**
 * Public Component
 */

interface IPostCardProps {
  title: string;
  date: string;
  categories: string[];
  tags: string[];
  article: string;
  author: string;
  banner?: string;
  published: boolean;
  fileName: string;
}

interface IReadBlogListProps {
  posts: IPostCardProps[];
  currentPage: number;
  totalPages: number;
}

const ReadBlogList = (props: IReadBlogListProps) => {
  const { posts, currentPage, totalPages } = props;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {posts.map((post, index) => (
          <PostCard key={index} post={post} index={index} />
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

export default ReadBlogList;

/**
 * Private Component
 */

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination = (props: IPaginationProps) => {
  const { currentPage, totalPages } = props;

  const getPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
    let endPage = Math.min(startPage + 4, totalPages);

    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center space-x-4 mt-8">
      <div
        className={`px-4 py-2 rounded ${
          currentPage > 1
            ? "bg-transparent hover:bg-neutral-200 cursor-pointer"
            : "bg-transparent text-neutral-400 cursor-not-allowed"
        }`}
      >
        {currentPage > 1 ? (
          <Link href={`/blog?page=${currentPage - 1}`}>
            <span>&lt;</span>
          </Link>
        ) : (
          <span>&lt;</span>
        )}
      </div>

      {getPageNumbers().map((pageNum, i) => (
        <Link
          key={i}
          href={`/blog?page=${pageNum}`}
          className={`px-4 py-2 rounded ${
            currentPage === pageNum
              ? "bg-neutral-800 text-white"
              : "bg-transparent hover:bg-neutral-200"
          }`}
        >
          {pageNum}
        </Link>
      ))}

      <div
        className={`px-4 py-2 rounded ${
          currentPage < totalPages
            ? "bg-transparent hover:bg-neutral-200 cursor-pointer"
            : "bg-transparent text-neutral-400 cursor-not-allowed"
        }`}
      >
        {currentPage < totalPages ? (
          <Link href={`/blog?page=${currentPage + 1}`}>
            <span>&gt;</span>
          </Link>
        ) : (
          <span>&gt;</span>
        )}
      </div>
    </div>
  );
};

type TPostCardType = {
  post: IPostCardProps;
  index: number;
};

const PostCard = (props: TPostCardType) => {
  const { post, index } = props;

  return (
    <Link href={`/blog/${post.fileName}`} className="block">
      <div className="border rounded-lg overflow-hidden hover:shadow-lg transition">
        {post.banner && <PostImage src={post.banner} alt={post.title} />}
        <div className="p-4">
          <h3 className="text-h4 text-start mb-2 line-clamp-2">{post.title}</h3>
          <p className="text-sub1 text-start text-neutral-700 mb-2 line-clamp-3">
            {post.article}
          </p>
          <div className="flex flex-wrap gap-2 mb-2">
            {post.categories.map((category, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
              >
                {category}
              </span>
            ))}
          </div>
          <div className="flex flex-row justify-between">
            <p className="text-sub3 text-start text-neutral-700">
              {new Date(post.date).toLocaleDateString("ko-KR")}
            </p>
            <p className="text-sub3 text-start text-neutral-700">
              {post.author}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

interface IPostImageProps {
  src: string;
  alt: string;
}

const PostImage = (props: IPostImageProps) => {
  const { src, alt } = props;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-48">
      {isLoading ? (
        <div className="absolute inset-0 bg-neutral-500 animate-pulse rounded-t-lg transition-opacity duration-500 ease-in-out" />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover rounded-t-lg transition-opacity duration-500 ease-in-out"
          unoptimized
        />
      )}
    </div>
  );
};
