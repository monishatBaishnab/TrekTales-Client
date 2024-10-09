import { Checkbox } from "@nextui-org/checkbox";
import { useFormContext } from "react-hook-form";

import { TFormElementProps } from "@/types/global.types";

const TCheckbox = ({ label, name, isDisabled }: TFormElementProps) => {
  const { register } = useFormContext();

  return (
    <Checkbox {...register(name)} isDisabled={isDisabled} size="lg">
      {label}
    </Checkbox>
  );
};

export default TCheckbox;
