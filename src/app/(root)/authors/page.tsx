"use client";
import { useEffect, useState } from "react";

import AuthorCard from "@/components/ui/AuthorCard";
import { useFetchAllAuthors } from "@/hooks/user.hooks";
import { TUser } from "@/types/user.types";
import AuthorCardSkeleton from "@/components/ui/AuthorCardSkeliton";
import TPagination from "@/components/ui/TPagination";

const Authors = () => {
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const { data, isSuccess, isLoading, isFetching } = useFetchAllAuthors(
    [
      { name: "page", value: String(page) },
      { name: "limit", value: "9" },
    ],
    "authors"
  );

  useEffect(() => {
    if (isSuccess) {
      setTotalPage(data?.meta?.totalPage);
    }
  }, [isSuccess]);

  return (
    <section>
      <div className="container">
        <div className="mb-5 inline-flex items-center gap-1">
          <h3 className="title-3 bg-title">Our</h3>
          <h3 className="title-3">Authors</h3>
        </div>
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
        <TPagination page={page} setPage={setPage} totalPage={totalPage} />
      </div>
    </section>
  );
};

export default Authors;
