"use client";
import { Key, useCallback, useEffect, useState } from "react";
import { Dot, Pencil, Trash2 } from "lucide-react";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import moment from "moment";
import { useDisclosure } from "@nextui-org/modal";

import CreatePost from "../_components/CreatePost";

import { useUserInfo } from "@/context/UserInfoProvider";
import { useFetchAllPosts, useDeletePost } from "@/hooks/post.hooks";
import TPagination from "@/components/ui/TPagination";
import { TPost } from "@/types/post.types";
import TTableLoading from "@/components/ui/TTableLoading";
import TEmpty from "@/components/ui/TEmpty";
import TableAction from "@/components/ui/TableAction";

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

const Blogs = () => {
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const { userInfo } = useUserInfo();
  const [selectedPost, setSelectedPost] = useState<TPost>();
  const [action, setAction] = useState<"create" | "edit" | "delete" | string>("create");
  const { onOpen, isOpen, onClose, onOpenChange } = useDisclosure();
  const { mutate: deletePost } = useDeletePost();
  const {
    data: postResponse,
    isLoading: postLoading,
    isFetching: postFetching,
    isSuccess,
  } = useFetchAllPosts(
    [
      { name: "author", value: userInfo?._id as string },
      { name: "limit", value: "5" },
      { name: "page", value: String(page) },
    ],
    `myPosts`,
    page,
    !!userInfo?._id
  );

  useEffect(() => {
    if (isSuccess) {
      setTotalPage(postResponse?.meta?.totalPage);
    }
  }, [isSuccess, postResponse]);

  const handleAction = (action: "edit" | "delete" | string, post: TPost) => {
    setSelectedPost(post);
    setAction(action);
    if (action === "edit") {
      onOpen();
    }
    if (action === "delete") {
      deletePost(post?._id as string);
    }
  };

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

    if (key === "action") {
      return (
        <TableAction
          actions={[
            {
              key: "edit",
              label: "Update",
              icon: <Pencil />,
            },
            {
              key: "delete",
              label: "Delete",
              icon: <Trash2 />,
            },
          ]}
          item={item}
          onChange={handleAction}
        />
      );
    }

    return cellValue;
  }, []);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="title-2">My Blogs</h3>
        <CreatePost
          action={action}
          isOpen={isOpen}
          selectedPost={selectedPost as TPost}
          setAction={setAction}
          setSelectedPost={setSelectedPost}
          onClose={onClose}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
        />
      </div>
      <div>
        {postFetching || postLoading || !userInfo?._id ? (
          <TTableLoading columns={postTableColumns} rows={5} />
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
            classNames={{
              wrapper: "p-0 shadow rounded-lg !overflow-x-auto",
              th: "text-shark-800 text-sm px-[24px] py-5 first:!rounded-s-none last:!rounded-e-none",
              td: "px-[24px] py-5 text-shark-600 text-sm first:before:!rounded-l-none last:before:!rounded-r-none group-data-[odd=true]:before:bg-[#F7F7F8]",
            }}
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
    </div>
  );
};

export default Blogs;
