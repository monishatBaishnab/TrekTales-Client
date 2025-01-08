import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { Key, useCallback } from "react";

import TEmpty from "@/components/ui/TEmpty";
import TTableLoading from "@/components/ui/TTableLoading";
import { TUser } from "@/types/user.types";

const usersTableColumns = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  { key: "isVerified", label: "Verify Status" },
];
const TUserTable = ({
  usersFetching,
  usersLoading,
  users,
  title,
}: {
  usersFetching: boolean;
  usersLoading: boolean;
  users: TUser[];
  title: string;
}) => {
  const renderUserCell = useCallback((item: any, key: Key) => {
    const cellValue = item?.[key as string];

    if (key === "name") {
      return (
        <div className="flex items-center gap-2">
          <div className="size-10 shrink-0 overflow-hidden rounded-md">
            <img
              alt={item?.name}
              className="size-full object-cover object-center"
              src={item?.profilePicture}
            />
          </div>
          <div>
            <h5 className="title-6">{item?.name}</h5>
            <small>{item?.email}</small>
          </div>
        </div>
      );
    }

    if (key === "role") {
      return item?.role === "admin" ? (
        <span className="rounded-md bg-persian-green-600 px-2 py-1 text-white">Admin</span>
      ) : (
        <span className="rounded-md bg-shark-100 px-2 py-1 text-shark-800">User</span>
      );
    }
    if (key === "isVerified") {
      return item?.isVerified ? (
        <span className="rounded-md bg-persian-green-600 px-2 py-1 text-white">Verified</span>
      ) : (
        <span className="rounded-md bg-shark-100 px-2 py-1 text-shark-800">Non Verified</span>
      );
    }

    return cellValue;
  }, []);

  return (
    <div className="space-y-5">
      <h2 className="title-2">{title} {`(${users?.length})`}</h2>

      {usersFetching || usersLoading ? (
        <TTableLoading columns={usersTableColumns} rows={6} />
      ) : !users?.length ? (
        <TEmpty />
      ) : (
        <Table
          isHeaderSticky
          isStriped
          aria-label="posts"
          classNames={{
            base: "max-h-[300px] overflow-y-auto",
            wrapper: "p-0 shadow rounded-lg !overflow-x-auto",
            th: "text-shark-800 text-sm px-[24px] py-5 first:!rounded-s-none last:!rounded-e-none",
            td: "px-[24px] py-5 text-shark-600 text-sm first:before:!rounded-l-none last:before:!rounded-r-none group-data-[odd=true]:before:bg-[#F7F7F8]",
          }}
        >
          <TableHeader columns={usersTableColumns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>

          <TableBody className="p-5" items={users ?? []}>
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

export default TUserTable;
