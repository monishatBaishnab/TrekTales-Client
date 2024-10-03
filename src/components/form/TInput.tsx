import { Input } from "@nextui-org/input";

import { TFormElementProps } from "@/types/global.types";

const TInput = ({
  name,
  isDisabled = false,
  label,
  placeholder,
  size = "lg",
  type,
}: TFormElementProps) => {
  return (
    <div className="block w-full">
      <div>
        <Input
          fullWidth
          isDisabled={isDisabled}
          label={label}
          labelPlacement="outside"
          name={name}
          placeholder={placeholder}
          radius="sm"
          size={size}
          type={type}
        />
      </div>
    </div>
  );
};

export default TInput;
