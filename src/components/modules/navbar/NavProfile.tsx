"use client";

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { useRouter } from "next/navigation";
import { LayoutDashboard, LogOut } from "lucide-react";

import { useUserInfo } from "@/context/UserInfoProvider";
import { logoutUser } from "@/services/auth";
const NavProfile = () => {
  const router = useRouter();
  const { setUserInfoLoading } = useUserInfo();

  const handleLogout = () => {
    logoutUser();
    setUserInfoLoading(true);
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          size="sm"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
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
