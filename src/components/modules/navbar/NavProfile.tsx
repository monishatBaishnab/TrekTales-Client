"use client";

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { usePathname, useRouter } from "next/navigation";
import { Contact, LayoutDashboard, LogOutIcon } from "lucide-react";

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

  const handleAction = (action: string) => {
    if (action === "logout") {
      handleLogout();

      return;
    } else if (action === "user-dashboard") {
      router.push("/user-profile");

      return;
    } else if (action === "dashboard") {
      router.push("/dashboard");

      return;
    }
  };

  const actions = [
    {
      key: "user-dashboard",
      label: "User Dashboard",
      icon: <Contact className="size-4" />,
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LogOutIcon className="size-4" />,
    },
  ];

  if (user?.role === "admin") {
    actions.unshift({
      key: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="size-4" />,
    });
  }

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
            key={action?.key}
            startContent={action?.icon}
            onPress={() => handleAction(action?.key)}
          >
            {action?.label}
          </DropdownItem>
        ))}

        {/* <DropdownItem
          key="logout"
          className="!text-danger"
          color="danger"
          startContent={<LogOut className="size-4 stroke-2" />}
          onPress={handleLogout}
        >
          Log Out
        </DropdownItem> */}
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavProfile;
