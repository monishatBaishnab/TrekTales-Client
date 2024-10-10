import { TableBody, TableRow, TableCell, Table, TableColumn, TableHeader } from "@nextui-org/table";
import { ReactNode } from "react";

import { tableClasses } from "@/constants/global.constats";

const TTableLoading = ({
  columns,
  rows,
}: {
  columns: { key: string; label: string | ReactNode }[];
  rows: number;
}) => {
  return (
    <Table isStriped aria-label="loading" classNames={tableClasses}>
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
