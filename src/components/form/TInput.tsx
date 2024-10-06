
'use client'
import { Input } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";

import { TFormElementProps } from "@/types/global.types";

const TInput = ({
  name,
  isDisabled = false,
  label,
  placeholder,
  size = "lg",
  type='string',
  variant,
}: TFormElementProps & { variant: "flat" | "faded" | "bordered" | "underlined" | undefined }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="block w-full">
      <div>
        <Input
          {...register(name as string)}
          fullWidth
          errorMessage={errors[name as string]?.message as string}
          isDisabled={isDisabled}
          isInvalid={!!errors[name as string]}
          label={label}
          labelPlacement="outside"
          placeholder={placeholder}
          radius="sm"
          size={size}
          type={type}
          variant={variant}
        />
      </div>
    </div>
  );
};

export default TInput;
