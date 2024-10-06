import clsx from "clsx";

import { TPostListCardProps } from "@/types/post.types";

const PostCardSkeleton = ({
  classNames,
  isImage = true,
  isDescription = true,
  isAction = true,
  isAuthor = true,
  isDate = true,
  isComment = true,
}: TPostListCardProps) => {
  const baseClass = clsx(
    "flex w-full animate-pulse flex-col gap-6 rounded-[7px] bg-white p-6 sm:flex-row",
    classNames?.base
  );

  const imageWrapperClass = clsx(
    "size-[250px] shrink-0 overflow-hidden rounded-[7px] bg-gray-200",
    classNames?.image?.wrapper
  );

  const contentWrapperClass = clsx("flex w-full flex-col gap-4", classNames?.contentWrapper);

  const placeholderClass = "h-4 bg-gray-200 w-full rounded";

  return (
    <div className={baseClass}>
      {/* Image Box */}
      {isImage && <div className={imageWrapperClass} />}

      {/* Card Content */}
      <div className={contentWrapperClass}>
        {/* Tag Placeholder */}
        <div className={`${placeholderClass} !w-20`} />

        {/* Title Placeholder */}
        <div className={`${placeholderClass} !h-10 w-full`} />

        {/* Author, Posted Date, Comments Placeholders */}
        <div className="flex w-full flex-wrap items-center gap-2">
          {/* Author Placeholder */}
          {isAuthor && (
            <div className="flex w-full items-center gap-1">
              <div className="size-8 shrink-0 rounded-full bg-gray-200" />
              <div className={`${placeholderClass}`} />
            </div>
          )}

          {/* Date Placeholder */}
          {isDate && (
            <div className={`flex w-full items-center gap-1`}>
              <div className={placeholderClass} />
            </div>
          )}

          {/* Comments Placeholder */}
          {isComment && (
            <div className={`flex w-full items-center gap-1`}>
              <div className={placeholderClass} />
            </div>
          )}
        </div>

        {/* Description Placeholder */}
        {isDescription && (
          <>
            <div className={`${placeholderClass} w-full`} />
          </>
        )}

        {/* See More Placeholder */}
        {isAction && <div className={`${placeholderClass} w-1/4`} />}
      </div>
    </div>
  );
};

export default PostCardSkeleton;
