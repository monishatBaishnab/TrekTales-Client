"use client";

import { Input } from "@nextui-org/input";
import { Search } from "lucide-react";

import AuthorCard from "@/components/ui/AuthorCard";
import TButton from "@/components/ui/TButton";
import SectionTitle from "@/components/ui/SectionTitle";
import { postCategoryOptions, postsTagsOptions } from "@/constants/pots.constants";
import { useFetchPopularAuthors } from "@/hooks/user.hooks";
import AuthorCardSkeleton from "@/components/ui/AuthorCardSkeliton";
import { TUser } from "@/types/user.types";
import { useFetchStates } from "@/hooks/post.hooks";

const Sidebar = () => {
  const { data: authors, isLoading: authorsLoading } = useFetchPopularAuthors();
  const { data: states, isLoading: statesLoading } = useFetchStates();

  return (
    <div className="space-y-10">
      {/* Search */}
      <div>
        <SectionTitle bgText="Search" planeText="Posts" />
        <div className="space-y-7">
          <div className="space-y-7">
            <Input
              endContent={
                <TButton isIconOnly className="!h-8" color="gray" size="sm">
                  <Search className="size-5 text-lg" />
                </TButton>
              }
              placeholder="Search..."
              radius="sm"
              size="lg"
            />
          </div>
        </div>
      </div>
      {/* Best Authors */}
      <div>
        <SectionTitle bgText="Top" planeText="Authors" />
        <div className="space-y-7">
          <div className="space-y-7">
            {authorsLoading
              ? Array.from({ length: 3 }).map((_, id) => (
                  <AuthorCardSkeleton key={id} className="rounded-lg border border-shark-200 p-4" />
                ))
              : authors?.map((author: TUser) => (
                  <AuthorCard
                    key={author?._id}
                    author={author}
                    className="rounded-lg border border-shark-200 p-4"
                  />
                ))}
          </div>
        </div>
      </div>
      {/* Todays Update */}
      <div>
        <SectionTitle bgText="Sites's" planeText="Update" />
        <div className="grid grid-cols-2 gap-5">
          {statesLoading ? (
            Array.from({ length: 4 }).map((_, id) => (
              <div key={id} className="min-h-28 w-full animate-pulse rounded-md bg-gray-200" />
            ))
          ) : (
            <>
              <div className="flex min-h-28 flex-col items-center justify-center rounded-lg bg-persian-green-600/10">
                <h1 className="title-1 !text-persian-green-600">{states?.todayPosts}</h1>
                <h5 className="title-5 !font-normal !text-shark-600">Today&apos;s Posts</h5>
              </div>
              <div className="flex min-h-28 flex-col items-center justify-center rounded-lg bg-persian-green-600/10">
                <h1 className="title-1 !text-persian-green-600">{states?.totalComments}</h1>
                <h5 className="title-5 !font-normal !text-shark-600">Total Comments</h5>
              </div>
              <div className="flex min-h-28 flex-col items-center justify-center rounded-lg bg-persian-green-600/10">
                <h1 className="title-1 !text-persian-green-600">{states?.totalPosts}</h1>
                <h5 className="title-5 !font-normal !text-shark-600">Total Posts</h5>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Search With Categories */}
      <div>
        <SectionTitle bgText="Search" planeText="With Tag's" />
        <div className="flex flex-wrap items-center gap-2">
          {postsTagsOptions.map((tag) => (
            <TButton key={tag?.key} className="!text-sm" color="persian-green-gost" size="sm">
              {tag?.label}
            </TButton>
          ))}
        </div>
      </div>
      {/* Search With Tags */}
      <div>
        <SectionTitle bgText="Search" planeText="With Categories" />
        <div className="flex flex-wrap items-center gap-2">
          {postCategoryOptions.map((category) => (
            <TButton key={category?.key} className="!text-sm" color="persian-green-gost" size="sm">
              {category?.label}
            </TButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
