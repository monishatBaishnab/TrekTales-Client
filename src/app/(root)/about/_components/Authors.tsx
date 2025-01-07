"use client";

import AuthorCard from "@/components/ui/AuthorCard";
import AuthorCardSkeleton from "@/components/ui/AuthorCardSkeliton";
import SectionTitle from "@/components/ui/SectionTitle";
import { useFetchAllAuthors } from "@/hooks/user.hooks";
import { TUser } from "@/types/user.types";
const Authors = () => {
  const { data, isLoading, isFetching } = useFetchAllAuthors([], "authors");

  return (
    <div>
      <SectionTitle bgText="Meet Our" planeText="Authors" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading || isFetching
          ? Array.from({ length: 9 }).map((_, id) => (
              <AuthorCardSkeleton key={id} className="rounded-lg border border-shark-200 p-4" />
            ))
          : data?.authors?.map((author: TUser) => {
              return (
                <AuthorCard
                  key={author?._id}
                  author={author}
                  className="rounded-lg border border-shark-200 p-4"
                />
              );
            })}
      </div>
    </div>
  );
};

export default Authors;
