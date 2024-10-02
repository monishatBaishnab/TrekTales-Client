"use client";

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { useRouter } from "next/navigation";
import { MdDashboard } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
const NavProfile = () => {
  const router = useRouter();

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
          startContent={<MdDashboard />}
          onPress={() => router.push("/user-profile")}
        >
          Dashboard
        </DropdownItem>
        <DropdownItem
          key="logout"
          className="!text-danger"
          color="danger"
          startContent={<FaSignOutAlt />}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavProfile;
