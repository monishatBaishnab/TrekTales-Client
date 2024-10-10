import { TableBody, TableRow, TableCell, Table, TableColumn, TableHeader } from "@nextui-org/table";
import { ReactNode } from "react";

const TTableLoading = ({
  columns,
  rows,
}: {
  columns: { key: string; label: string | ReactNode }[];
  rows: number;
}) => {
  return (
    <Table
      isStriped
      aria-label="loading"
      classNames={{
        wrapper: "p-0 shadow rounded-lg !overflow-x-auto",
        th: "text-shark-800 text-sm px-[24px] py-5 first:!rounded-s-none last:!rounded-e-none",
        td: "px-[24px] py-5 text-shark-600 text-sm first:before:!rounded-l-none last:before:!rounded-r-none group-data-[odd=true]:before:bg-[#F7F7F8]",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>

      <TableBody className="p-5" items={[]}>
        {Array?.from({ length: rows }).map((_, id) => (
          <TableRow key={id}>
            {Array.from({ length: columns?.length })?.map((_, id) => (
              <TableCell key={id}>
                <div className="h-8 w-full animate-pulse bg-gray-200" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TTableLoading;
