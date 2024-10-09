"use client";
import Link from "next/link";

import SectionTitle from "@/components/ui/SectionTitle";
import NavProfile from "@/components/modules/navbar/NavProfile";

const Navbar = () => {
  return (
    <header className="h-[56px]">
      <nav className="fixed inset-x-0 top-0 flex items-center justify-between border-b border-b-shark-100 bg-white px-5 py-3">
        <Link href="/dashboard">
          <SectionTitle bgText="Trek" classNames={{ base: "!mb-0" }} planeText="Tales" />
        </Link>
        <NavProfile />
      </nav>
    </header>
  );
};

export default Navbar;
