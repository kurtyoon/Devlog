import { Link } from "react-router";
import { getCoverImage } from "~/shared/lib/cover";
import { Icon } from "@iconify/react";

interface PostThumbnailProps {
  thumbnailImage?: string;
  postId: string;
  contentUrl: string;
}

export default function PostThumbnail({
  thumbnailImage,
  postId,
  contentUrl,
}: PostThumbnailProps) {
  const coverImage = getCoverImage(postId);

  if (!thumbnailImage) {
    thumbnailImage = coverImage;
  }

  return (
    <div
      className="relative ml-2 hidden h-[212px] min-w-[404px] max-w-[404px] select-none lg:block"
      style={{ clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 10% 100%)" }}
    >
      <Link
        to={contentUrl}
        className="relative h-full w-full overflow-hidden rounded-r-3xl group before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:bg-black before:opacity-50 before:transition-all before:duration-300 before:content-[''] group-hover:before:w-full"
      >
        <Icon
          icon="cuida:caret-right-outline"
          className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          width={96}
          height={96}
        />
        <img
          className="h-[212px] w-[404px] select-none rounded-r-3xl object-cover transition-opacity duration-300 group-hover:brightness-75"
          src={thumbnailImage}
          alt="PostCover"
          width={404}
          height={212}
        />
      </Link>
    </div>
  );
}
