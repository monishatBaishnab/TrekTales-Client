"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const userLinks = [
  {
    path: "/user",
    label: "Dashboard",
  },
  {
    path: "/user/update-profile",
    label: "Update Profile",
  },
  {
    path: "/user/my-posts",
    label: "My Posts",
  },
];

const UserNavigation = () => {
  const pathName = usePathname();

  return (
    <div className="space-y-1 rounded-md bg-persian-green-600/10 p-2">
      {userLinks?.map((link) => (
        <Link
          key={link?.path}
          className={`block rounded px-4 py-2 transition-all hover:bg-persian-green-600 hover:text-white ${pathName === link?.path ? "bg-persian-green-600 text-white" : "bg-transparent"}`}
          href={link?.path}
        >
          {link?.label}
        </Link>
      ))}
    </div>
  );
};

export default UserNavigation;
