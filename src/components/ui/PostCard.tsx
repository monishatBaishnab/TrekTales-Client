/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from "clsx";
import { Calendar, MoveRight, ShieldCheck, ShieldOff } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { TPostListCardProps } from "@/types/post.types";
import { TUser } from "@/types/user.types";
import { useUserInfo } from "@/context/UserInfoProvider";
const PostCard = ({
  classNames,
  isDescription = true,
  isAction = true,
  isAuthor = true,
  isDate = true,
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
  const descriptionClass = clsx("paragraph mt-3", classNames?.description);

  const actionClass = clsx(
    "mt-4 flex !cursor-pointer items-center gap-2 text-sm text-persian-green-600",
    classNames?.action
  );

  const router = useRouter();
  const { userInfo } = useUserInfo();

  const handleClick = () => {
    if (post?.isPremium && (!userInfo || !userInfo?.isVerified)) {
      toast.error("You have no access to premium contents");

      return;
    }
    router.push(`/blogs/${post?._id}`);
  };

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
        <h2
          className={clsx("title-2 mt-2 block !cursor-pointer", classNames?.title)}
          onClick={handleClick}
        >
          {post?.title}
        </h2>
        {/* Author, Posted Date, Comments */}
        <div className={contentWrapperClass}>
          {/* Author */}
          {isAuthor && (
            <div className={authorClass}>
              <div className="size-[18px] overflow-hidden rounded-full">
                <img
                  alt={(post?.author as TUser)?.name}
                  className="size-full object-cover"
                  src={(post?.author as TUser)?.profilePicture}
                />
              </div>
              <span className="mt-0.5 text-xs text-shark-500">{(post?.author as TUser)?.name}</span>
            </div>
          )}
          {/* Date */}
          {isDate && (
            <div className={dateClass}>
              <Calendar className="size-4 text-shark-600" />
              <span className="mt-0.5 text-xs text-shark-500">{formattedDate}</span>
            </div>
          )}
          <div className={dateClass}>
            {post?.isPremium ? (
              <ShieldCheck className="size-4 text-persian-green-600" />
            ) : (
              <ShieldOff className="size-4 text-shark-600" />
            )}
            <span className="mt-0.5 text-xs text-shark-500">
              {post?.isPremium ? <span className="text-persian-green-600">Premium</span> : "Free"}
            </span>
          </div>
        </div>
        {/* Description */}
        {isDescription && <p className={descriptionClass}>{post?.shortDescription}</p>}
        {/* See More */}
        {isAction && (
          <span className={actionClass} onClick={handleClick}>
            <span>Read more</span> <MoveRight className="size-5" />
          </span>
        )}
      </div>
    </div>
  );
};

export default PostCard;
