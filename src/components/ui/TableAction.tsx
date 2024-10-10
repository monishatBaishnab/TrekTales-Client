import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { EllipsisVertical } from "lucide-react";
import { ReactNode } from "react";

const TableAction = ({
  onChange,
  actions,
  item,
}: {
  onChange: (action: string, item: any) => void;
  actions: { label: string; key: string; icon: ReactNode; isDisabled?: boolean }[];
  item: any;
}) => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <button className="flex w-full items-center justify-end pr-1">
          <EllipsisVertical />
        </button>
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        {actions?.map((action) => (
          <DropdownItem
            key={action?.key}
            isDisabled={action?.isDisabled}
            startContent={action?.icon}
            onPress={() => onChange(action?.key, item)}
          >
            {action?.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default TableAction;
