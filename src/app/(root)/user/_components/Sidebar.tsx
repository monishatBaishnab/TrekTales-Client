"use client";
import { usePathname } from "next/navigation";
import { LayoutList, ListOrdered, User, UserCog } from "lucide-react";
import Link from "next/link";
import { cn } from "@nextui-org/theme";

import { useUserInfo } from "@/context/UserInfoProvider";
import { useFetchSingleUser } from "@/hooks/user.hooks";

const profile_config = [
  {
    path: "/",
    label: "Profile",
    icon: User,
  },
  {
    path: "/blogs",
    label: "My Blogs",
    icon: ListOrdered,
  },
  {
    path: "/followers",
    label: "Followers",
    icon: LayoutList,
  },
  {
    path: "/settings",
    label: "Settings",
    icon: UserCog,
  },
];

const Sidebar = () => {
  const { userInfo } = useUserInfo();
  const pathname = usePathname();

  const paths = pathname?.split("/");
  const currentPath = paths?.[paths?.length - 1];

  const { data: userResponse, isLoading } = useFetchSingleUser(userInfo?._id as string);
  const user = userResponse?.user;

  return (
    <div className="block shrink-0 space-y-4 lg:w-64">
      {!userInfo?._id || isLoading ? (
        <div className="flex items-center gap-2">
          {/* Skeleton Profile Picture */}
          <div className="size-11 overflow-hidden">
            <div className="size-full animate-pulse rounded-md bg-shark-100" />
          </div>

          {/* Skeleton Text */}
          <div className="space-y-1">
            <div className="h-5 w-24 animate-pulse rounded-md bg-shark-100" />
            <div className="h-4 w-32 animate-pulse rounded-md bg-shark-100" />
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {/* Profile Info */}
          {user?.profilePicture ? (
            <div className="size-11 overflow-hidden">
              <img
                alt={user?.name}
                className={"size-full rounded-md object-cover"}
                src={user?.profilePicture}
              />
            </div>
          ) : null}
          <div>
            <h5 className="text-lg font-bold text-shark-950">{user?.name}</h5>
            <span className="text-shark-600">{user?.email}</span>
          </div>
        </div>
      )}

      {/* Profile Navigation Links */}
      <div className="space-y-2">
        {profile_config
          ?.filter((config) => config.label && config.icon)
          ?.map(({ label, icon: Icon, path }) => {
            return (
              <Link
                key={path}
                className={cn(
                  "group rounded-md px-3 py-2.5 flex items-center gap-2 text-shark-600 transition-all hover:bg-shark-50 active:bg-shark-100/70 hover:text-shark-950",
                  `/${currentPath}` === path || (currentPath === "user" && label === "Profile")
                    ? "bg-shark-50 text-shark-950"
                    : ""
                )}
                href={`/user${path}`}
              >
                {Icon && <Icon className="size-5" />}
                {label}
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Sidebar;
