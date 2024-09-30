/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";

import TButton from "@/components/ui/TButton";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import { navLinks } from "@/constants/nav.constants";
const Navbar = () => {
  const pathname = usePathname();
  const [showSmallNav, setShowSmallNav] = useState<boolean>(false);

  useEffect(() => {}, []);

  return (
    <>
      <header className="bg-persian-green-600/10 backdrop-blur-sm">
        <div className="container !py-0">
          <nav className="flex min-h-[70px] items-center justify-between">
            <div className="flex items-center gap-10">
              <div className="flex items-end gap-1">
                <h1 className="title-1 bg-persian-green-600 !text-white">Trek</h1>
                <h5 className="title-5">Tales</h5>
              </div>
              <ul className="hidden items-center gap-6 text-[15px] font-medium text-shark-950 md:flex lg:gap-8">
                {navLinks?.map((link) => (
                  <li key={link?.path}>
                    <Link
                      className={`transition-all hover:text-persian-green-600 ${pathname === link?.path ? "text-persian-green-600" : "text-shark-950"}`}
                      href={link?.path}
                    >
                      {link?.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-4 text-[15px] font-medium text-shark-950">
              <ThemeSwitcher />
              <TButton
                isIconOnly
                className="!text-base md:hidden"
                size="sm"
                onPress={() => setShowSmallNav(true)}
              >
                <FaBars />
              </TButton>
              <TButton className="hidden !text-sm sm:flex" size="sm">
                Login
              </TButton>
            </div>
          </nav>
        </div>
      </header>
      <div
        className={`fixed inset-0 z-10 bg-persian-green-600/10 backdrop-blur-sm transition-all ${showSmallNav ? "visible opacity-100" : "invisible opacity-0"}`}
        onClick={() => setShowSmallNav(false)}
      />

      <div
        className={`fixed inset-y-0 transition-all ${showSmallNav ? "visible left-0 opacity-100" : "invisible -left-4 opacity-0"} z-20 h-screen w-[280px] space-y-7 overflow-hidden bg-white p-5 shadow`}
      >
        <Link
          className=" flex items-end justify-center gap-1"
          href={"/"}
          onClick={() => setShowSmallNav(false)}
        >
          <h1 className="title-1 bg-persian-green-600 !text-white">Trek</h1>
          <h5 className="title-5">Tales</h5>
        </Link>
        <div>
          <ul className="flex flex-col items-center gap-4 text-[15px] font-medium text-shark-950">
            {navLinks?.map((link) => (
              <li key={link?.path}>
                <Link
                  className={`transition-all hover:text-persian-green-600 ${pathname === link?.path ? "text-persian-green-600" : "text-shark-950"}`}
                  href={link?.path}
                  onClick={() => setShowSmallNav(false)}
                >
                  {link?.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <TButton fullWidth className="!text-sm sm:hidden" size="sm">
          Login
        </TButton>
      </div>
    </>
  );
};

export default Navbar;
