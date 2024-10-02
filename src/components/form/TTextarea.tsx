import { Textarea } from "@nextui-org/input";

import { TFormElementProps } from "@/types/global.types";

const TTextarea = ({
  name,
  label,
  placeholder,
  size = "lg",
  isDisabled = false,
}: TFormElementProps) => {
  return (
    <div className="w-full">
      <div>
        <Textarea
          fullWidth
          classNames={{ label: "!text-base !text-shark-800" }}
          isDisabled={isDisabled}
          label={label}
          labelPlacement="outside"
          name={name}
          placeholder={placeholder}
          radius="sm"
          size={size}
        />
      </div>
    </div>
  );
};

export default TTextarea;
