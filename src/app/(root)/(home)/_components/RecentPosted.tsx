"use client";

import { useState } from "react";

import PostCard from "@/components/ui/PostCard";
import TPagination from "@/components/ui/TPagination";

const RecentPosted = () => {
  const [page, setPage] = useState<number>(0);

  return (
    <section>
      <div className="container space-y-10">
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          <div className="grid grid-cols-1 gap-5 sm:col-span-2 sm:grid-cols-2">
            <div className="col-span-2">
              <div className="inline-flex items-center gap-1">
                <h3 className="title-3 bg-title">Recent</h3>
                <h3 className="title-3">Posted</h3>
              </div>
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
            <div>
              <div className="inline-flex items-center gap-1">
                <h3 className="title-3 bg-title">Top</h3>
                <h3 className="title-3">Authors</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentPosted;
