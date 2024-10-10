"use client";

import { Key, useCallback, useEffect, useState } from "react";
import { Dot, Trash2 } from "lucide-react";
import moment from "moment";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";

import { useDeleteComment, useFetchAllComments } from "@/hooks/comment.hooks";
import TableAction from "@/components/ui/TableAction";
import TTableLoading from "@/components/ui/TTableLoading";
import TEmpty from "@/components/ui/TEmpty";
import TPagination from "@/components/ui/TPagination";
import { tableClasses } from "@/constants/global.constats";
import { TComment } from "@/types/comment.types";

const commentsTableColumns = [
  { key: "author", label: "Author" },
  { key: "date", label: "Date" },
  {
    key: "action",
    label: (
      <span className="flex items-center justify-end pr-1">
        <Dot />
      </span>
    ),
  },
];

const commentActions = [
  // {
  //   key: "details",
  //   label: "Details",
  //   icon: <Eye />,
  // },
  {
    key: "delete",
    label: "Delete",
    icon: <Trash2 />,
  },
];

const AdminComments = () => {
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const {
    data: commentsResponse,
    isLoading: commentsLoading,
    isFetching: commentsFetching,
    isSuccess: commentsFetched,
  } = useFetchAllComments(
    [
      { name: "limit", value: "6" },
      { name: "page", value: String(page) },
      { name: "sort", value: "-updatedAt" },
    ],
    page
  );
  const { mutate: deleteComment } = useDeleteComment();

  const handleAction = (action: string, item: any) => {
    console.log(item);
    deleteComment(item?._id as string);
  };

  useEffect(() => {
    if (commentsFetched) {
      setTotalPage(commentsResponse?.meta?.totalPage);
    }
  }, [commentsFetched]);

  const renderCommentCell = useCallback((item: any, key: Key) => {
    const cellValue = item?.[key as string];
    const date = moment(item?.createdAt);
    const formattedDate = date.format("DD MMMM YYYY");

    if (key == "date") {
      return formattedDate;
    }
    if (key === "author") {
      return item?.author?.name;
    }
    if (key === "action") {
      return <TableAction actions={commentActions} item={item} onChange={handleAction} />;
    }

    return cellValue;
  }, []);

  return (
    <div className="space-y-5 p-5">
      <h2 className="title-2">All Comments</h2>

      {commentsFetching || commentsLoading ? (
        <TTableLoading columns={commentsTableColumns} rows={6} />
      ) : !commentsResponse?.comments?.length ? (
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
          <TableHeader columns={commentsTableColumns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>

          <TableBody className="p-5" items={commentsResponse?.comments ?? []}>
            {(item: TComment) => (
              <TableRow key={item?._id}>
                {(columnKey) => <TableCell>{renderCommentCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AdminComments;
