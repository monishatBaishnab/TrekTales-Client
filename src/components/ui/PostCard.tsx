import clsx from "clsx";
import { Calendar, MessageCircleMore, MoveRight } from "lucide-react";
import Link from "next/link";
import moment from "moment";

import { TPostListCardProps } from "@/types/post.types";
const PostCard = ({
  classNames,
  isDescription = true,
  isAction = true,
  isAuthor = true,
  isDate = true,
  isComment = true,
  isImage = true,
  post,
}: TPostListCardProps) => {
  const date = moment(post?.createdAt);
  const formattedDate = date.format("DD MMMM YYYY");
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
  const descriptionClass = clsx("paragraph mt-3", classNames?.description);

  const actionClass = clsx(
    "mt-4 flex items-center gap-2 text-sm text-persian-green-600",
    classNames?.action
  );

  return (
    <div className={baseClass}>
      {/* Image Box */}
      {isImage && (
        <div className={imageWrapperClass}>
          <img alt={post?.title} className={imgClass} src={post?.image} />
        </div>
      )}
      {/* Card Content */}
      <div>
        {/* Tag */}
        <span className={tagClass}>{post?.category}</span>
        {/* Title */}
        <Link className={clsx("title-2 mt-2 block", classNames?.title)} href="/">
          {post?.title}
        </Link>
        {/* Author, Posted Date, Comments */}
        <div className={contentWrapperClass}>
          {/* Author */}
          {isAuthor && (
            <div className={authorClass}>
              <div className="size-[18px] overflow-hidden rounded-full">
                <img
                  alt={post?.author?.name}
                  className="size-full object-cover"
                  src={post?.author?.profilePicture}
                />
              </div>
              <span className="mt-0.5 text-xs text-shark-500">{post?.author?.name}</span>
            </div>
          )}
          {/* Date */}
          {isDate && (
            <div className={dateClass}>
              <Calendar className="size-4 text-shark-600" />
              <span className="mt-0.5 text-xs text-shark-500">{formattedDate}</span>
            </div>
          )}
          {/* Comments */}
          {isComment && (
            <div className={commentClass}>
              <MessageCircleMore className="size-4 text-shark-600" />
              <span className="mt-0.5 text-xs text-shark-500">12 Comments</span>
            </div>
          )}
        </div>
        {/* Description */}
        {isDescription && (
          <p className={descriptionClass}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati, eos.
          </p>
        )}
        {/* See More */}
        {isAction && (
          <Link className={actionClass} href={`/posts/${post?._id}`}>
            <span>Read more</span> <MoveRight className="size-5" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default PostCard;
