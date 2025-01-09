"use client";

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, LayoutList, ListOrdered, LogOut, MessagesSquare, Settings, User, UserCog } from "lucide-react";
import { ReactNode } from "react";

import { useUserInfo } from "@/context/UserInfoProvider";
import { logoutUser } from "@/services/auth";
import { protectedRoutes } from "@/constants/global.constats";
import { useFetchSingleUser } from "@/hooks/user.hooks";

type Action = {
  path: string;
  label: string;
  icon?: ReactNode;
};

const NavProfile = () => {
  const router = useRouter();
  const { setUserInfoLoading, userInfo } = useUserInfo();
  const pathname = usePathname();

  const { data: userResponse } = useFetchSingleUser(userInfo?._id as string);
  const user = userResponse?.user;

  const user_actions: Action[] = [
    { path: "/user/", label: "Profile", icon: <User className="size-4" /> },
    {
      path: "/user/blogs",
      label: "My Blogs",
      icon: <ListOrdered className="size-4" />,
    },
    {
      path: "/user/followers",
      label: "Followers",
      icon: <LayoutList className="size-4" />,
    },
    {
      path: "/user/settings",
      label: "Settings",
      icon: <UserCog className="size-4" />,
    },
    {
      path: "logout",
      label: "Logout",
      icon: <LogOut className="size-4" />,
    },
  ];
  const admin_actions: Action[] = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="size-4" />,
    },
    {
      path: "/dashboard/profile",
      label: "Profile",
      icon: <User className="size-4" />,
    },
    {
      path: "/dashboard/posts",
      label: "Blogs",
      icon: <ListOrdered className="size-4" />,
    },
    {
      path: "/dashboard/comments",
      label: "Comments",
      icon: <MessagesSquare className="size-4" />,
    },
    {
      path: "/dashboard/settings",
      label: "Settings",
      icon: <Settings className="size-4" />,
    },
    {
      path: "logout",
      label: "Logout",
      icon: <LogOut className="size-4" />,
    },
  ];

  const actions = userInfo?.role === "admin" ? admin_actions : user_actions;

  const handleAction = (action: string) => {
    if (action === "logout") {
      logoutUser();
      setUserInfoLoading(true);
      if (protectedRoutes.some((route) => pathname.match(route))) {
        router.push("/");
      }

      return;
    } else {
      router.push(action);
    }
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          size="sm"
          src={user?.profilePicture}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        {actions?.map((action) => (
          <DropdownItem
            key={action?.path}
            color={action?.path === "logout" ? "danger" : "default"}
            startContent={action?.icon}
            onPress={() => handleAction(action.path)}
          >
            {action?.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavProfile;
