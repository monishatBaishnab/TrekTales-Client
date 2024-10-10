"use client";

import { Key, useCallback, useEffect, useState } from "react";
import { TableHeader, TableColumn, TableBody, TableRow, TableCell, Table } from "@nextui-org/table";
import { Dot, Trash2 } from "lucide-react";
import moment from "moment";

import { TPost } from "@/types/post.types";
import useFetchAllPosts, { useDeletePost } from "@/hooks/post.hooks";
import TPagination from "@/components/ui/TPagination";
import TTableLoading from "@/components/ui/TTableLoading";
import { tableClasses } from "@/constants/global.constats";
import TEmpty from "@/components/ui/TEmpty";
import TableAction from "@/components/ui/TableAction";

const postTableColumns = [
  { key: "author", label: "Author" },
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

const postActions = [
  {
    key: "delete",
    label: "Delete",
    icon: <Trash2 />,
  },
];

const AdminPosts = () => {
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const { mutate: deletePost } = useDeletePost();
  const {
    data: postResponse,
    isLoading: postLoading,
    isFetching: postFetching,
    isSuccess: postFetched,
  } = useFetchAllPosts(
    [
      { name: "limit", value: "6" },
      { name: "page", value: String(page) },
      { name: "sort", value: "-updatedAt" },
    ],
    `allPosts`,
    page
  );

  const handleAction = (action: string, item: any) => {
    deletePost(item?._id as string);
  };

  useEffect(() => {
    if (postFetched) {
      setTotalPage(postResponse?.meta?.totalPage);
    }
  }, [postFetched]);

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
    if (key === "action") {
      return <TableAction actions={postActions} item={item} onChange={handleAction} />;
    }

    return cellValue;
  }, []);

  return (
    <div className="space-y-5 p-5">
      <h2 className="title-2">All Posts</h2>
      {postFetching || postLoading ? (
        <TTableLoading columns={postTableColumns} rows={6} />
      ) : !postResponse?.posts?.length ? (
        <TEmpty />
      ) : (
        <Table
          isStriped
          aria-label="posts"
          bottomContent={
            <div className="flex justify-center px-6 py-5 pt-0">
              <TPagination page={page} setPage={setPage} totalPage={totalPage} />
            </div>
          }
          classNames={tableClasses}
        >
          <TableHeader columns={postTableColumns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>

          <TableBody className="p-5" items={postResponse?.posts ?? []}>
            {(item: TPost) => (
              <TableRow key={item?._id}>
                {(columnKey) => <TableCell>{renderPostCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AdminPosts;
