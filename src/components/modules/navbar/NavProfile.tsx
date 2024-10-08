"use client";

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, LogOut } from "lucide-react";

import { useUserInfo } from "@/context/UserInfoProvider";
import { logoutUser } from "@/services/auth";
import { protectedRoutes } from "@/constants/global.constats";
import { useFetchSingleUser } from "@/hooks/user.hooks";
const NavProfile = () => {
  const router = useRouter();
  const { setUserInfoLoading, userInfo } = useUserInfo();
  const pathname = usePathname();
  const handleLogout = () => {
    logoutUser();
    setUserInfoLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  const { data: user } = useFetchSingleUser(userInfo?._id as string);

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
        <DropdownItem
          key="my-profile"
          startContent={<LayoutDashboard className="size-4" />}
          onPress={() => router.push("/user-profile")}
        >
          Dashboard
        </DropdownItem>
        <DropdownItem
          key="logout"
          className="!text-danger"
          color="danger"
          startContent={<LogOut className="size-4 stroke-2" />}
          onPress={handleLogout}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavProfile;
