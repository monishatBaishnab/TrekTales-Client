"use client";
import { useEffect, useState } from "react";

import AuthorCard from "@/components/ui/AuthorCard";
import { useFetchAllAuthors } from "@/hooks/user.hooks";
import { TUser } from "@/types/user.types";
import AuthorCardSkeleton from "@/components/ui/AuthorCardSkeliton";
import TPagination from "@/components/ui/TPagination";
import PageHeader from "@/components/ui/PageHeader";

const Authors = () => {
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const { data, isSuccess, isLoading, isFetching } = useFetchAllAuthors(
    [
      { name: "page", value: String(page) },
      { name: "limit", value: "9" },
    ],
    "authors",
    page
  );
  
  useEffect(() => {
    if (isSuccess) {
      setTotalPage(data?.meta?.totalPage);
    }
  }, [isSuccess, data]);

  return (
    <section>
      <PageHeader
        links={[
          { label: "Home", path: "/" },
          { label: "Blogs", path: "/blogs" },
        ]}
        page="Authors"
        title="Our Authors"
      />
      <div className="container">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading || isFetching
            ? Array.from({ length: 9 }).map((_, id) => (
                <AuthorCardSkeleton key={id} className="rounded-lg border border-shark-200 p-4" />
              ))
            : data?.authors?.map((author: TUser) => (
                <AuthorCard
                  key={author?._id}
                  author={author}
                  className="rounded-lg border border-shark-200 p-4"
                />
              ))}
        </div>
        <div className="mt-7 flex justify-center">
          <TPagination page={page} setPage={setPage} totalPage={totalPage} />
        </div>
      </div>
    </section>
  );
};

export default Authors;
