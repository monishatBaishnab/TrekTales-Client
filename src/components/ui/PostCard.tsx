import clsx from "clsx";
import Link from "next/link";
import { FaRegCalendarAlt, FaRegCommentDots } from "react-icons/fa";
import { HiArrowLongRight } from "react-icons/hi2";

type TClassNames = {
  base?: string;
  image?: {
    wrapper?: string;
    img?: string;
  };
  contentWrapper?: string;
  title?: string;
  description?: string;
  tag?: string;
  additional?: {
    author?: string;
    date?: string;
    comment?: string;
  };
  action?: string;
};

type TPostListCardProps = {
  classNames?: TClassNames;
  isDescription?: boolean;
  isAction?: boolean;
  isAuthor?: boolean;
  isDate?: boolean;
  isComment?: boolean;
  isImage?: boolean;
};

const PostCard = ({
  classNames,
  isDescription = true,
  isAction = true,
  isAuthor = true,
  isDate = true,
  isComment = true,
  isImage = true,
}: TPostListCardProps) => {
  const baseClass = clsx(
    "flex w-full flex-col gap-6 rounded-[7px] bg-white p-6 sm:flex-row",
    classNames?.base
  );

  const imageWrapperClass = clsx(
    "h-[250px] w-full shrink-0 overflow-hidden rounded-[7px] sm:h-full sm:w-[300px]",
    classNames?.image?.wrapper
  );

  const imgClass = clsx("size-full object-cover", classNames?.image?.img);
  const tagClass = clsx("tag-light", classNames?.tag);
  const contentWrapperClass = clsx(
    "my-4 flex flex-wrap items-center gap-2",
    classNames?.contentWrapper
  );
  const authorClass = clsx("flex items-center gap-1", classNames?.additional?.author);
  const dateClass = clsx("flex items-center gap-1", classNames?.additional?.date);
  const commentClass = clsx("flex items-center gap-1", classNames?.additional?.comment);
  const descriptionClass = clsx("paragraph mb-2", classNames?.description);

  const actionClass = clsx(
    "flex items-center gap-2 text-sm text-persian-green-600",
    classNames?.action
  );

  return (
    <div className={baseClass}>
      {/* Image Box */}
      {isImage && (
        <div className={imageWrapperClass}>
          <img
            alt="Thumb"
            className={imgClass}
            src="https://images.unsplash.com/photo-1668535453283-4655d213d561?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
      )}
      {/* Card Content */}
      <div>
        {/* Tag */}
        <span className={tagClass}>Travel</span>
        {/* Title */}
        <Link className={clsx("title-2 mt-2 block", classNames?.title)} href="/">
          set video playback speed with javascript
        </Link>
        {/* Author, Posted Date, Comments */}
        <div className={contentWrapperClass}>
          {/* Author */}
          {isAuthor && (
            <div className={authorClass}>
              <div className="size-[18px] overflow-hidden rounded-full">
                <img
                  alt="User"
                  className="size-full object-cover"
                  src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
              </div>
              <span className="mt-0.5 text-xs text-shark-500">Jesica koli</span>
            </div>
          )}
          {/* Date */}
          {isDate && (
            <div className={dateClass}>
              <FaRegCalendarAlt className="text-sm text-shark-600" />
              <span className="mt-0.5 text-xs text-shark-500">02 December 2022</span>
            </div>
          )}
          {/* Comments */}
          {isComment && (
            <div className={commentClass}>
              <FaRegCommentDots className="text-sm text-shark-600" />
              <span className="mt-0.5 text-xs text-shark-500">12 Comments</span>
            </div>
          )}
        </div>
        {/* Description */}
        {isDescription && (
          <p className={descriptionClass}>
            Did you come here for something in particular or just general Riker-bashing?
          </p>
        )}
        {/* See More */}
        {isAction && (
          <Link className={actionClass} href="/">
            <span>Read more</span> <HiArrowLongRight className="text-sm" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default PostCard;
