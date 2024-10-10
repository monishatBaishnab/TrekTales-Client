"use client";

import { Key, useCallback, useEffect, useState } from "react";
import { Dot, ShieldCheck, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";

import TableAction from "@/components/ui/TableAction";
import TTableLoading from "@/components/ui/TTableLoading";
import TEmpty from "@/components/ui/TEmpty";
import TPagination from "@/components/ui/TPagination";
import { useFetchAllUsers, useUpdateProfile } from "@/hooks/user.hooks";
import { TUser } from "@/types/user.types";

const usersTableColumns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  {
    key: "action",
    label: (
      <span className="flex items-center justify-end pr-1">
        <Dot />
      </span>
    ),
  },
];

const AdminUsers = () => {
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const { mutate: updateUser } = useUpdateProfile();
  const {
    data: usersResponse,
    isLoading: usersLoading,
    isFetching: usersFetching,
    isSuccess: usersFetched,
  } = useFetchAllUsers(
    [
      { name: "limit", value: "6" },
      { name: "page", value: String(page) },
      { name: "sort", value: "-updatedAt" },
    ],
    page
  );

  const handleAction = (action: string, item: any) => {
    const formData = new FormData();

    if (action === "create-admin") {
      formData.append("data", JSON.stringify({ role: "admin" }));
    }
    if (action === "delete") {
      formData.append("data", JSON.stringify({ isDeleted: true }));
    }

    updateUser({ id: item?._id as string, userData: formData });
  };

  useEffect(() => {
    if (usersFetched) {
      setTotalPage(usersResponse?.meta?.totalPage);
    }
  }, [usersFetched]);

  const renderUserCell = useCallback((item: any, key: Key) => {
    const cellValue = item?.[key as string];

    if (key === "role") {
      return item?.role === "admin" ? (
        <span className="rounded-md bg-persian-green-600 px-2 py-1 text-white">Admin</span>
      ) : (
        <span className="rounded-md bg-shark-100 px-2 py-1 text-shark-800">User</span>
      );
    }
    if (key === "action") {
      return (
        <TableAction
          actions={[
            {
              key: "create-admin",
              label: "Create Admin",
              icon: <ShieldCheck />,
              isDisabled: item?.role === "admin",
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
    <div className="space-y-5 p-5">
      <h2 className="title-2">All Users</h2>

      {usersFetching || usersLoading ? (
        <TTableLoading columns={usersTableColumns} rows={6} />
      ) : !usersResponse?.users?.length ? (
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
          <TableHeader columns={usersTableColumns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>

          <TableBody className="p-5" items={usersResponse?.users ?? []}>
            {(item: TUser) => (
              <TableRow key={item?._id}>
                {(columnKey) => <TableCell>{renderUserCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AdminUsers;
