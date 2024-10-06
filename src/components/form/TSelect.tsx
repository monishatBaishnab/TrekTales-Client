import { Select, SelectItem } from "@nextui-org/select";
import { useFormContext } from "react-hook-form";

import { TFormElementProps } from "@/types/global.types";
export const animals = [
  { key: "cat", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "elephant", label: "Elephant" },
  { key: "lion", label: "Lion" },
  { key: "tiger", label: "Tiger" },
  { key: "giraffe", label: "Giraffe" },
  { key: "dolphin", label: "Dolphin" },
  { key: "penguin", label: "Penguin" },
  { key: "zebra", label: "Zebra" },
  { key: "shark", label: "Shark" },
  { key: "whale", label: "Whale" },
  { key: "otter", label: "Otter" },
  { key: "crocodile", label: "Crocodile" },
];
const TSelect = ({
  name,
  label,
  placeholder,
  fullWidth = true,
  isDisabled,
  size = "lg",
  selectionMode = "single",
}: TFormElementProps & {
  selectionMode?: "single" | "multiple";
  //   options: { key: string; label: string }[];
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Select
      aria-label={name}
      fullWidth={fullWidth}
      label={label}
      {...register(name)}
      errorMessage={errors[name]?.message as string}
      isDisabled={isDisabled}
      isInvalid={!!errors[name]}
      labelPlacement="outside"
      placeholder={placeholder}
      selectionMode={selectionMode}
      size={size}
    >
      {animals.map((animal) => (
        <SelectItem key={animal.key}>{animal.label}</SelectItem>
      ))}
    </Select>
  );
};

export default TSelect;
