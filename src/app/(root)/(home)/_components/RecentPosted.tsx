"use client";

import { useEffect, useState } from "react";

import PostCard from "@/components/ui/PostCard";
import TPagination from "@/components/ui/TPagination";
import Sidebar from "@/components/modules/sidebar/Sidebar";
import SectionTitle from "@/components/ui/SectionTitle";
import { TPost } from "@/types/post.types";
import PostCardSkeleton from "@/components/ui/PostCardSkeleton";
import TEmpty from "@/components/ui/TEmpty";
import { useFetchAllPosts } from "@/hooks/post.hooks";

const RecentPosted = () => {
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const {
    data: recentPosts,
    isLoading,
    isFetching,
    isSuccess,
  } = useFetchAllPosts(
    [
      { name: "limit", value: "6" },
      { name: "page", value: String(page) },
    ],
    "recentPosts",
    page
  );

  useEffect(() => {
    if (isSuccess) {
      setTotalPage(recentPosts?.meta?.totalPage);
    }
  }, [isSuccess]);

  return (
    <section>
      <div className="container space-y-10">
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          <div className="sm:col-span-2">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="md:col-span-2">
                <SectionTitle bgText="Recent" planeText="Posted" />
              </div>
              {isLoading || isFetching ? (
                Array.from({ length: 6 }).map((_, id) => (
                  <PostCardSkeleton
                    key={id}
                    classNames={{
                      base: "!flex-col !p-0",
                      image: { wrapper: "!h-[250px] !w-full" },
                    }}
                  />
                ))
              ) : recentPosts?.posts?.length ? (
                recentPosts?.posts.map((post: TPost) => (
                  <PostCard
                    key={post?._id}
                    classNames={{
                      base: "!flex-col !p-0",
                      image: { wrapper: "!h-[250px] !w-full" },
                    }}
                    post={post}
                  />
                ))
              ) : (
                <div className="sm:col-span-2"><TEmpty /></div>
              )}
              <div className="mt-8 flex justify-center md:col-span-2">
                <TPagination page={page} setPage={setPage} totalPage={totalPage} />
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <Sidebar />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentPosted;
