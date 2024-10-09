"use client";

import { useState, useEffect } from "react";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";

import PostCard from "@/components/ui/PostCard";
import PostCardSkeleton from "@/components/ui/PostCardSkeleton";
import useFetchAllPosts from "@/hooks/post.hooks";
import { TPost } from "@/types/post.types";
import { useFilter } from "@/context/FilterProvider";
import { TQueryParams } from "@/types/global.types";
import TButton from "@/components/ui/TButton";
import TEmpty from "@/components/ui/TEmpty";
import { postCategoryOptions, postsTagsOptions } from "@/constants/pots.constants";

const SearchPage = () => {
  const { search, setSearch, category, setCategory, tag, setTag } = useFilter();

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
  const query: TQueryParams = [];

  if (debouncedSearch) {
    query.push({ name: "searchTerm", value: debouncedSearch });
  }
  if (category) {
    query.push({ name: "category", value: category });
  }
  if (tag) {
    query.push({ name: "tags", value: tag });
  }
  if (!category && !debouncedSearch && !tag) {
    query.push({ name: "searchTerm", value: "asfsdf" });
  }

  // Fetch posts only if there are filters
  const {
    data: searchPosts,
    isLoading,
    isFetching,
    refetch,
  } = useFetchAllPosts(query, "searchPosts");

  useEffect(() => {
    refetch();
  }, [debouncedSearch, category, tag, refetch]);

  const handleClearFilters = () => {
    setSearch("");
    setCategory("");
    setTag("");
  };

  return (
    <div>
      <div className="container space-y-5">
        <div className="space-y-3 border-b border-shark-100 pb-2">
          <div className="flex flex-wrap items-center gap-5 sm:flex-nowrap">
            <div className="w-full">
              <Input
                name="search"
                placeholder="Search here"
                radius="sm"
                size="lg"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-80">
              <Select
                aria-label="tag"
                placeholder="Select Tag"
                radius="sm"
                selectedKeys={tag ? [tag] : []}
                size="lg"
                onChange={(e) => setTag(e?.target?.value)}
              >
                {postsTagsOptions?.map((tag) => (
                  <SelectItem key={tag.key} value={tag?.key}>
                    {tag.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="w-full sm:w-80">
              <Select
                aria-label="category"
                placeholder="Select Category"
                radius="sm"
                selectedKeys={category ? [category] : []}
                size="lg"
                onChange={(e) => setCategory(e?.target?.value)}
              >
                {postCategoryOptions?.map((category) => (
                  <SelectItem key={category.key} value={category?.key}>
                    {category.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="title-2 !text-shark-600">
              Search result for <span className="!text-persian-green-600">{search}</span>
            </h2>
            <TButton onClick={handleClearFilters}>Clear Filter</TButton>
          </div>
        </div>
        <div className="space-y-5">
          {isLoading || isFetching ? (
            Array.from({ length: 6 }).map((_, id) => <PostCardSkeleton key={id} />)
          ) : searchPosts?.posts?.length ? (
            searchPosts?.posts?.map((post: TPost) => (
              <PostCard
                key={post?._id}
                classNames={{
                  title: "!title-5",
                  contentWrapper: "!mb-0 mt-2",
                  base: "!bg-transparent !p-3 border border-persian-green-600/200",
                }}
                post={post}
              />
            ))
          ) : (
            <TEmpty />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
