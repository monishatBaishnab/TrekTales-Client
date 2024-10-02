"use client";

import { ReactNode, useState } from "react";

import Sidebar from "../sidebar/Sidebar";

import PostCard from "@/components/ui/PostCard";
import TPagination from "@/components/ui/TPagination";

type TPostContainerProps = {
  title: ReactNode;
};

const PostContainer = ({ title}: TPostContainerProps) => {
  const [page, setPage] = useState<number>(0);

  return (
    <section>
      <div className="container space-y-10">
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          <div className="grid grid-cols-1 gap-5 sm:col-span-2 sm:grid-cols-2">
            <div className="sm:col-span-2">
             {title}
            </div>
            {Array.from({ length: 8 }).map((_, id) => (
              <PostCard
                key={id}
                classNames={{
                  base: "!flex-col !p-0",
                  image: { wrapper: "!h-[250px] !w-full" },
                }}
              />
            ))}
            <div className="mt-8 flex justify-center sm:col-span-2">
              <TPagination page={page} setPage={setPage} totalPage={3} />
            </div>
          </div>
          <div className="hidden md:block">
            <Sidebar />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostContainer;
