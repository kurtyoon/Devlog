import type { Post } from "../model/post.types";
import { PostCard } from "./post-card";

interface PostListProps {
  posts: Post[];
}

export function PostList({ posts }: PostListProps) {
  return (
    <div className="space-y-8">
      <div className="w-full space-y-4">
        {posts.map((entry, index) => (
          <div
            key={entry.id}
            className="onload-animation"
            style={{
              animationDelay: `calc(val(--onload-animation-delay) + ${index + 1} * var(--onload-animation-interval))`,
            }}
          >
            <PostCard post={entry} />
          </div>
        ))}
      </div>
    </div>
  );
}
