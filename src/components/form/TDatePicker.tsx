import { DatePicker } from "@nextui-org/date-picker";

import { TFormElementProps } from "@/types/global.types";

const TDatePicker = ({ name, label, size = "lg" }: TFormElementProps) => {
  return (
    <div className="w-full">
      <div>
        <DatePicker
          fullWidth
          dateInputClassNames={{ label: "!text-base !text-shark-800" }}
          label={label}
          labelPlacement="outside"
          name={name}
          radius="sm"
          size={size}
        />
      </div>
    </div>
  );
};

export default TDatePicker;
