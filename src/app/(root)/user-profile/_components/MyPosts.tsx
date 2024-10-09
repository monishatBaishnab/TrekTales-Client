"use client";
import { Key, useCallback, useEffect, useState } from "react";
import { Dot, EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import moment from "moment";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { useDisclosure } from "@nextui-org/modal";

import CreatePost from "./CreatePost";

import SectionTitle from "@/components/ui/SectionTitle";
import { useUserInfo } from "@/context/UserInfoProvider";
import useFetchAllPosts, { useDeletePost } from "@/hooks/post.hooks";
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
  const [selectedPost, setSelectedPost] = useState<TPost>();
  const [action, setAction] = useState<"create" | "edit" | "delete">("create");
  const { onOpen, isOpen, onClose, onOpenChange } = useDisclosure();
  const { mutate: deletePost } = useDeletePost();
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
    `myPosts`,
    page,
    !!userInfo?._id
  );

  useEffect(() => {
    if (isSuccess) {
      setTotalPage(userPosts?.meta?.totalPage);
    }
  }, [isSuccess]);

  const handleAction = (action: "edit" | "delete", post: TPost) => {
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
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <button className="flex w-full items-center justify-end pr-1">
              <EllipsisVertical />
            </button>
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" variant="flat">
            <DropdownItem
              key="edit"
              startContent={<Pencil className="size-4" />}
              onPress={() => handleAction("edit", item)}
            >
              Edit
            </DropdownItem>
            <DropdownItem
              key="delete"
              startContent={<Trash2 className="size-4" />}
              onPress={() => handleAction("delete", item)}
            >
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    }

    return cellValue;
  }, []);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <SectionTitle bgText="My" classNames={{ base: "!mb-0" }} planeText="Posts" />
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
        {
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

            {userPostsLoading || userPostsFetching || !userInfo || !userPosts?.posts ? (
              <TableBody className="p-5" items={[]}>
                <TableRow>
                  {Array.from({ length: 4 })?.map((_, id) => (
                    <TableCell key={id}>
                      <div className="h-8 w-full animate-pulse bg-gray-200" />
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  {Array.from({ length: 4 })?.map((_, id) => (
                    <TableCell key={id}>
                      <div className="h-8 w-full animate-pulse bg-gray-200" />
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  {Array.from({ length: 4 })?.map((_, id) => (
                    <TableCell key={id}>
                      <div className="h-8 w-full animate-pulse bg-gray-200" />
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  {Array.from({ length: 4 })?.map((_, id) => (
                    <TableCell key={id}>
                      <div className="h-8 w-full animate-pulse bg-gray-200" />
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            ) : (
              <TableBody className="p-5" items={userPosts?.posts ?? []}>
                {(item: TPost) => (
                  <TableRow key={item?._id}>
                    {(columnKey) => <TableCell>{renderPostCell(item, columnKey)}</TableCell>}
                  </TableRow>
                )}
              </TableBody>
            )}
          </Table>
        }
      </div>
    </div>
  );
};

export default MyPosts;
