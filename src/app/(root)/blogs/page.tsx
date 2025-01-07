"use client";

import { useEffect, useState } from "react";

import Filters from "./_components/Filters";

import { useFetchAllPosts } from "@/hooks/post.hooks";
import PageHeader from "@/components/ui/PageHeader";
import TPagination from "@/components/ui/TPagination";
import PostCard from "@/components/ui/PostCard";
import { TPost } from "@/types/post.types";
import PostCardSkeleton from "@/components/ui/PostCardSkeleton";
import TEmpty from "@/components/ui/TEmpty";
import { useFilter } from "@/context/FilterProvider";
import { TQueryParams } from "@/types/global.types";

const RecentPosted = () => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const { search, category, tag } = useFilter();
  // Local state for debounced search value
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // Effect to update the debounced search value after a delay
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);

    // Cleanup function to clear the timeout
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  // Memoizing query params
  const query: TQueryParams = [
    { name: "limit", value: "6" },
    { name: "page", value: String(page) },
  ];

  if (debouncedSearch) {
    query.push({ name: "searchTerm", value: debouncedSearch });
  }
  if (category) {
    query.push({ name: "category", value: category });
  }
  if (tag) {
    query.push({ name: "tags", value: tag });
  }

  const {
    data: response,
    isLoading,
    isSuccess,
    isFetching,
    refetch,
  } = useFetchAllPosts(query, "posts", page);

  useEffect(() => {
    if (isSuccess) {
      console.log(response?.meta?.totalPage);
      setTotalPage(response?.meta?.totalPage);
    }
  }, [isSuccess, response]);

  useEffect(() => {
    refetch();
  }, [debouncedSearch, category, tag, refetch]);

  const posts = response?.posts;

  return (
    <section>
      <PageHeader links={[{ label: "Home", path: "/" }]} page="Blogs" title="Travelers Stories" />
      <div className="container space-y-10">
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          <div className="sm:col-span-2">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
              ) : posts.length ? (
                posts.map((post: TPost) => (
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

              {posts?.length ? (
                <div className="mt-7 flex justify-center sm:col-span-2">
                  <TPagination page={page} setPage={setPage} totalPage={totalPage} />
                </div>
              ) : null}
            </div>
          </div>
          <div className="hidden lg:block">
            <Filters />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentPosted;
