"use client";

import { LayoutDashboard, LayoutList, MessagesSquare, UsersRound } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const dashboardRoutes = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard />,
  },
  {
    path: "/dashboard/posts",
    label: "Posts",
    icon: <LayoutList />,
  },
  {
    path: "/dashboard/comments",
    label: "Comments",
    icon: <MessagesSquare />,
  },
  {
    path: "/dashboard/users",
    label: "Users",
    icon: <UsersRound />,
  },
];

const Sidebar = () => {
  const path = usePathname();
  const router = useRouter();

  return (
    <div className="w-14 shrink-0 lg:w-72">
      <div className="fixed bottom-0 left-0 top-[57px] z-50 w-14 border-r border-r-shark-100 bg-white lg:w-72">
        <div className="w-full space-y-2 p-2 lg:p-5">
          {dashboardRoutes?.map((route) => (
            <button
              key={route?.path}
              className={`flex w-full items-center gap-2 rounded-md p-2 text-shark-600 outline-none transition-all hover:bg-persian-green-600/10 hover:text-persian-green-600 lg:!px-4 ${path === route?.path ? "!bg-persian-green-600/10 !text-persian-green-600" : ""}`}
              onClick={() => router.push(route?.path)}
            >
              <span>{route?.icon}</span>
              <span className="hidden lg:block">{route?.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
