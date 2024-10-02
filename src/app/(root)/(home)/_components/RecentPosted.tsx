"use client";

import { useState } from "react";

import PostCard from "@/components/ui/PostCard";
import TPagination from "@/components/ui/TPagination";
import Sidebar from "@/components/modules/sidebar/Sidebar";
import SectionTitle from "@/components/ui/SectionTitle";

const RecentPosted = () => {
  const [page, setPage] = useState<number>(0);

  return (
    <section>
      <div className="container space-y-10">
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          <div className="grid grid-cols-1 gap-5 sm:col-span-2 sm:grid-cols-2">
            <div className="col-span-2">
              <SectionTitle bgText="Recent" planeText="Posted" />
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
            <div className="col-span-2 mt-8 flex justify-center">
              <TPagination page={page} setPage={setPage} totalPage={3} />
            </div>
          </div>
          <div>
            <Sidebar />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentPosted;
