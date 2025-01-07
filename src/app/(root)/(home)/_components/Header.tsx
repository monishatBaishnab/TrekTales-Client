"use client";

import { useRouter } from "next/navigation";
import { MoveRight } from "lucide-react";

import TButton from "@/components/ui/TButton";

const Header = () => {
  const router = useRouter();

  return (
    <div
      style={{
        backgroundImage: `url(https://i.ibb.co.com/0Yv23jX/hero-background-image.png)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left",
        minHeight: "520px",
      }}
    >
      <div className="flex h-[520px] items-center bg-gradient-to-l from-white/0 to-white">
        <div className={`container`}>
          <div className="w-full space-y-7 md:w-1/2 lg:w-1/3">
            <h1 className="text-5xl font-bold">
              <span className="text-persian-green-600">Read Travelers&apos;</span> story about there
              trip!
            </h1>
            <p className="text-[#434343]">
              Read inspiring travel stories from fellow adventurers and discover new destinations!
            </p>
            <TButton
              endContent={<MoveRight className="size-5" />}
              onClick={() => router.push("/blogs")}
            >
              Read Blogs
            </TButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
