import { Select, SelectItem } from "@nextui-org/select";
import { Controller, useFormContext } from "react-hook-form";

import { TFormElementProps } from "@/types/global.types";

const TSelect = ({
  name,
  label,
  placeholder,
  fullWidth = true,
  isDisabled,
  size = "lg",
  selectionMode = "single",
  options,
}: TFormElementProps & {
  selectionMode?: "single" | "multiple";
  options: { key: string; label: string }[];
}) => {
  const { control } = useFormContext();

  return (
    <div className="block w-full">
      <div>
        <Controller
          control={control}
          name={name}
          render={({ field, fieldState: { error } }) => (
            <Select
              aria-label={name}
              classNames={{ label: "!text-base !text-shark-800" }}
              errorMessage={error?.message as string}
              fullWidth={fullWidth}
              isDisabled={isDisabled}
              isInvalid={!!error}
              label={label}
              labelPlacement="outside"
              placeholder={placeholder}
              radius="sm"
              selectedKeys={
                selectionMode === "multiple" ? field?.value : field?.value ? [...field?.value] : []
              }
              selectionMode={selectionMode}
              size={size}
              onSelectionChange={field.onChange}
            >
              {options.map((option) => (
                <SelectItem key={option.key}>{option.label}</SelectItem>
              ))}
            </Select>
          )}
        />
      </div>
    </div>
  );
};

export default TSelect;
