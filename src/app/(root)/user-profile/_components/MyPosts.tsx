"use client";
import { Key, useEffect, useState } from "react";
import { Dot, EllipsisVertical } from "lucide-react";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import moment from "moment";

import CreatePost from "./CreatePost";

import SectionTitle from "@/components/ui/SectionTitle";
import { useUserInfo } from "@/context/UserInfoProvider";
import useFetchAllPosts from "@/hooks/post.hooks";
import TPagination from "@/components/ui/TPagination";
import { TPost } from "@/types/post.types";

const postTableColumns = [
  { key: "title", label: "Title" },
  { key: "date", label: "Date" },
  { key: "premiumStatus", label: "Status" },
  {
    key: "action",
    label: (
      <span className="flex items-center justify-end pr-1">
        <Dot />
      </span>
    ),
  },
];

const MyPosts = () => {
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const { userInfo } = useUserInfo();

  const {
    data: userPosts,
    isLoading: userPostsLoading,
    isFetching: userPostsFetching,
    isSuccess,
  } = useFetchAllPosts(
    [
      { name: "author", value: userInfo?._id as string },
      { name: "limit", value: "4" },
      { name: "page", value: String(page) },
      { name: "sort", value: "-updatedAt" },
    ],
    `posts-${userInfo?._id}`,
    page,
    !!userInfo?._id
  );

  useEffect(() => {
    if (isSuccess) {
      setTotalPage(userPosts?.meta?.totalPage);
    }
  }, [isSuccess]);

  

  const renderPostCell = (item: any, key: Key) => {
    const cellValue = item?.[key as string];
    const date = moment(item?.createdAt);
    const formattedDate = date.format("DD MMMM YYYY");

    if (key == "date") {
      return formattedDate;
    }
    if (key == "premiumStatus") {
      return item?.isPremium ? (
        <span className="tag-light">Premium</span>
      ) : (
        <span className="tag-light">Free</span>
      );
    }
    if (key === "action") {
      return (
        <button className="flex w-full items-center justify-end pr-1">
          <EllipsisVertical />
        </button>
      );
    }

    return cellValue;
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <SectionTitle bgText="My" classNames={{ base: "!mb-0" }} planeText="Posts" />
        <CreatePost />
      </div>
      <div>
        <Table
          isStriped
          aria-label="posts"
          bottomContent={
            <div className="flex justify-center px-6 py-5 pt-0">
              <TPagination page={page} setPage={setPage} totalPage={totalPage} />
            </div>
          }
          classNames={{
            wrapper: "p-0 shadow rounded-lg overflow-hidden",
            th: "text-black text-base px-[24px] py-5 first:!rounded-s-none last:!rounded-e-none",
            td: "px-[24px] py-5 text-black text-base first:before:!rounded-l-none last:before:!rounded-r-none group-data-[odd=true]:before:bg-[#F7F7F8]",
            // tr: "border-t border-t-[#EAEAEA]",
          }}
        >
          <TableHeader columns={postTableColumns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>

          <TableBody className="p-5" items={userPosts?.posts}>
            {userPostsLoading || userPostsFetching || !userInfo
              ? Array.from({ length: 4 })?.map((_, id) => (
                  <TableRow key={id}>
                    {Array.from({ length: 4 })?.map((_, id) => (
                      <TableCell key={id}>
                        <div className="h-8 w-full animate-pulse bg-gray-200" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : (item: TPost) => (
                  <TableRow key={item?._id}>
                    {(columnKey) => <TableCell>{renderPostCell(item, columnKey)}</TableCell>}
                  </TableRow>
                )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MyPosts;
