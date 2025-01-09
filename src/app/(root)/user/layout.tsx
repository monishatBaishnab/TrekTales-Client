"use client";
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from "react";
import { PanelRightClose } from "lucide-react";
import { usePathname } from "next/navigation";

import Sidebar from "./_components/Sidebar";

import { TLayout } from "@/types/global.types";
import PageHeader from "@/components/ui/PageHeader";
import TButton from "@/components/ui/TButton";

const UserLayout = ({ children }: TLayout) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const pathname = usePathname();

  const paths = pathname?.split("/");

  const currentPath = paths?.[paths?.length - 1];
  const currentPage =
    currentPath?.slice(0, 1).toUpperCase() + currentPath?.slice(1, currentPath?.length);

  return (
    <div className="relative">
      <PageHeader
        links={[
          { label: "Home", path: "/" },
          { label: "User", path: "/user" },
        ]}
        page={currentPage === "User" ? "Profile" : currentPage}
        title={
          <div className="flex items-center gap-2">
            <TButton isIconOnly onPress={() => setShowSidebar(true)}>
              <PanelRightClose />
            </TButton>
            <span>My Profile</span>
          </div>
        }
      />
      <div className="container flex gap-10 !pt-10">
        {/* Sidebar for user profile */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        <div className="w-full space-y-10 lg:w-[calc(100%_-_296px)]">{children}</div>
      </div>
      <div
        className={`fixed inset-0 z-10 bg-persian-green-600/10 backdrop-blur-sm transition-all ${showSidebar ? "visible opacity-100" : "invisible opacity-0"}`}
        onClick={() => setShowSidebar(false)}
      />
      <div
        className={`fixed inset-y-0 transition-all ${showSidebar ? "visible left-0 opacity-100" : "invisible -left-4 opacity-0"} z-20 h-screen w-[280px] space-y-7 overflow-hidden bg-white p-5 shadow`}
      >
        <div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
