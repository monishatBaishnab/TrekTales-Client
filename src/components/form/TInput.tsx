'use client'

import { extendVariants } from "@nextui-org/system";
import { Input } from "@nextui-org/input";

const TInput = extendVariants(Input, {
  variants: {
    color: {
      "persian-green": {
        label: "!cursor-default !text-base font-medium text-shark-800 !top-2/3",
        innerWrapper: "bg-transparent",
        input: "!text-base",
        base: "justify-start data-[has-label=true]:mt-6",
        inputWrapper: [
          "!bg-white !rounded-lg shadow-none !border !border-shark-200 !transition",
          "hover:bg-white hover:!border-persian-green-600",
          "data-[focus-visible=true]:!outline-none data-[focus-visible=true]:!ring-0 data-[focus-visible=true]:!ring-offset-0",
        ],
        helperWrapper: "!mt-4",
      },
    },
  },
  defaultVariants: {
    size: "md",
    color: "persian-green",
    radius: "sm",
    labelPlacement: "outside",
  },
});

export default TInput;
