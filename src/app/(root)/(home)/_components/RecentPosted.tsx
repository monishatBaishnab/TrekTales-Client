"use client";

import { useEffect, useState, useMemo } from "react";
import { useInView } from "react-intersection-observer";

import PostCard from "@/components/ui/PostCard";
import Sidebar from "@/components/modules/sidebar/Sidebar";
import SectionTitle from "@/components/ui/SectionTitle";
import { TPost } from "@/types/post.types";
import PostCardSkeleton from "@/components/ui/PostCardSkeleton";
import TEmpty from "@/components/ui/TEmpty";
import { useFetchAllPosts } from "@/hooks/post.hooks";

const RecentPosted = () => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<TPost[]>([]);
  const { ref, inView } = useInView();

  const {
    data: recentPosts,
    isLoading,
    isSuccess,
    isFetching,
  } = useFetchAllPosts(
    [
      { name: "limit", value: "4" },
      { name: "page", value: String(page) },
    ],
    "recentPosts",
    page
  );

  const totalPage = recentPosts?.meta?.totalPage ?? 1;
  const canFetchMore = useMemo(() => posts.length < recentPosts?.meta?.total, [posts, recentPosts]);

  // Update posts when fetch is successful
  useEffect(() => {
    if (isSuccess && recentPosts?.posts?.length) {
      setPosts((prevPosts) => [...prevPosts, ...recentPosts.posts]);
    }
  }, [isSuccess, recentPosts]);

  // Handle pagination when the observer is in view
  useEffect(() => {
    if (inView && page < totalPage) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, page, totalPage]);

  return (
    <section>
      <div className="container space-y-10">
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          <div className="sm:col-span-2">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="md:col-span-2">
                <SectionTitle bgText="Recent" planeText="Posted" />
              </div>

              {isLoading && !posts?.length ? (
                Array.from({ length: 4 }).map((_, id) => (
                  <PostCardSkeleton
                    key={id}
                    classNames={{
                      base: "!flex-col !p-0",
                      image: { wrapper: "!h-[250px] !w-full" },
                    }}
                  />
                ))
              ) : posts.length ? (
                posts.map((post) => (
                  <PostCard
                    key={post._id}
                    classNames={{
                      base: "!flex-col !p-0",
                      image: { wrapper: "!h-[250px] !w-full" },
                    }}
                    post={post}
                  />
                ))
              ) : (
                <div className="sm:col-span-2">
                  <TEmpty />
                </div>
              )}

              {(isFetching || canFetchMore) && posts?.length ? (
                <div ref={ref} className="grid grid-cols-1 gap-5 md:col-span-2 md:grid-cols-2">
                  {Array.from({ length: 2 }).map((_, id) => (
                    <PostCardSkeleton
                      key={id}
                      classNames={{
                        base: "!flex-col !p-0",
                        image: { wrapper: "!h-[250px] !w-full" },
                      }}
                    />
                  ))}
                </div>
              ) : null}
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
