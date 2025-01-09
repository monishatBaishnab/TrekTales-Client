"use client";

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import moment from "moment";
import { Key, useCallback } from "react";

import UserProfile from "@/app/(root)/user/_components/UserProfile";
import TEmpty from "@/components/ui/TEmpty";
import TTableLoading from "@/components/ui/TTableLoading";
import { useFetchAllPosts } from "@/hooks/post.hooks";
import { TPost } from "@/types/post.types";

const postTableColumns = [
  { key: "author", label: "Author" },
  { key: "title", label: "Title" },
  { key: "date", label: "Date" },
  { key: "premiumStatus", label: "Status" },
];

const DashboardProfile = () => {
  const {
    data: recentBlogsResponse,
    isLoading,
    isFetching,
  } = useFetchAllPosts(
    [
      { name: "limit", value: "3" },
      { name: "page", value: "1" },
    ],
    "recentPosts"
  );

  const renderPostCell = useCallback((item: any, key: Key) => {
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
    if (key === "author") {
      return item?.author?.name;
    }

    return cellValue;
  }, []);

  return (
    <div className="space-y-7">
      <div className="rounded-lg bg-white p-5">
        <UserProfile routerPath="/dashboard/settings" />
      </div>
      <div className="space-y-5 rounded-lg bg-white p-5">
        <h2 className="title-2">Recent Blogs</h2>
        {isLoading || isFetching ? (
          <TTableLoading columns={postTableColumns} rows={3} />
        ) : !recentBlogsResponse?.posts?.length ? (
          <TEmpty />
        ) : (
          <Table
            isStriped
            aria-label="posts"
            classNames={{
              wrapper: "p-0 shadow rounded-lg !overflow-x-auto",
              th: "text-shark-800 text-sm px-[24px] py-5 first:!rounded-s-none last:!rounded-e-none",
              td: "px-[24px] py-5 text-shark-600 text-sm first:before:!rounded-l-none last:before:!rounded-r-none group-data-[odd=true]:before:bg-[#F7F7F8]",
            }}
          >
            <TableHeader columns={postTableColumns}>
              {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>

            <TableBody className="p-5" items={recentBlogsResponse?.posts ?? []}>
              {(item: TPost) => (
                <TableRow key={item?._id}>
                  {(columnKey) => <TableCell>{renderPostCell(item, columnKey)}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default DashboardProfile;
