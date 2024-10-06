import { DatePicker } from "@nextui-org/date-picker";
import { Controller, useFormContext } from "react-hook-form";

import { TFormElementProps } from "@/types/global.types";
const TDatePicker = ({ name, label, size = "lg" }: TFormElementProps) => {
  const { control } = useFormContext();

  return (
    <div className="w-full">
      <div>
        <Controller
          control={control}
          name={name}
          render={({ field, fieldState: { error } }) => (
            <DatePicker
              fullWidth
              dateInputClassNames={{ label: "!text-base !text-shark-800" }}
              errorMessage={error?.message}
              isInvalid={!!error}
              label={label}
              labelPlacement="outside"
              radius="sm"
              size={size}
              onChange={(newDate) => {
                if (newDate) {
                  const utcDate = new Date(Date.UTC(newDate.year, newDate.month, newDate.day));

                  field.onChange(utcDate.toISOString());
                } else {
                  field.onChange(null);
                }
              }}
            />
          )}
        />
      </div>
    </div>
  );
};

export default TDatePicker;
