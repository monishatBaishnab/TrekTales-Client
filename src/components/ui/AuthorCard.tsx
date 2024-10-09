import Link from "next/link";
import { UserRound, UserRoundCheck } from "lucide-react";

import { TUser } from "@/types/user.types";

const AuthorCard = ({ className, author }: { className?: string; author?: TUser }) => {
  return (
    <div className={`flex items-center gap-5 ${className}`}>
      <div className="size-20 overflow-hidden rounded-full">
        {author?.profilePicture ? (
          <img alt={author?.name} className="size-full object-cover" src={author?.profilePicture} />
        ) : (
          <div className="flex size-full items-center justify-center rounded-full bg-shark-50">
            <UserRound className="size-8 text-shark-700" />
          </div>
        )}
      </div>
      <div className="space-y-1">
        <Link className="title-4 block" href={`/authors/${author?._id}`}>
          {author?.name}
        </Link>
        <p className="paragraph">
          {Number(author?.bio?.length) > 30 ? author?.bio?.slice(0, 30) : author?.bio}
        </p>
        <div className="flex items-center gap-1.5 text-sm text-shark-600">
          <UserRoundCheck className="size-4" /> <span>{author?.followers?.length} Followers</span>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
