import { UserRound, BadgeCheck } from "lucide-react";
import { ReactNode } from "react";

import { TUser } from "@/types/user.types";

const UserProfileView = ({ user, action }: { user: TUser; action: ReactNode }) => {
  const followers = user?.followers?.length;

  return (
    <div className="flex flex-col items-center gap-7 rounded-lg border border-shark-100 bg-shark-50 p-10 sm:flex-row">
      <div className="size-28 shrink-0 overflow-hidden rounded-full">
        {user?.profilePicture ? (
          <img alt={user?.name} className="size-full object-cover" src={user?.profilePicture} />
        ) : (
          <div className="flex size-full items-center justify-center rounded-full border border-shark-50 bg-white">
            <UserRound className="size-8 text-shark-700" />
          </div>
        )}
      </div>
      <div className="w-full space-y-3">
        <div className="flex flex-wrap items-center justify-between border-b border-b-shark-200 pb-3">
          <h2 className="title-2 flex items-center gap-1">
            {user?.isVerified && <BadgeCheck className="size-5 text-persian-green-600" />}
            <span>{user?.name}</span>
          </h2>
          <div className="flex items-center gap-3">
            <h5 className="title-5 !text-shark-600">{followers} Followers</h5>
            <div className="flex items-center gap-2">{action}</div>
          </div>
        </div>
        <p className="paragraph">{user?.bio}</p>
      </div>
    </div>
  );
};

export default UserProfileView;
