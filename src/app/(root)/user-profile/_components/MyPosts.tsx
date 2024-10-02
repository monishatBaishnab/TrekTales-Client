"use client";
import { useState } from "react";
import { BsPlus } from "react-icons/bs";

import PostCard from "@/components/ui/PostCard";
import TPagination from "@/components/ui/TPagination";
import SectionTitle from "@/components/ui/SectionTitle";
import TButton from "@/components/ui/TButton";

const MyPosts = () => {
  const [page, setPage] = useState(2);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <SectionTitle bgText="My" planeText="Posts" />
        <TButton color="persian-green-gost" endContent={<BsPlus className="text-xl" />} size="sm">
          Create Post
        </TButton>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 4 }).map((_, id) => (
          <PostCard
            key={id}
            classNames={{
              title: "!title-5",
              contentWrapper: "!mb-0 mt-2",
              base: "!bg-transparent !p-3 border border-persian-green-600/200",
            }}
            isAction={false}
            isAuthor={false}
            isDescription={false}
            isImage={false}
          />
        ))}
        <div className="mt-5 flex justify-center md:col-span-2 lg:col-span-3">
          <TPagination page={page} setPage={setPage} totalPage={3} />
        </div>
      </div>
    </div>
  );
};

export default MyPosts;
