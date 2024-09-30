"use client";
import { Button } from "@nextui-org/button";
import { extendVariants } from "@nextui-org/system";

const TButton = extendVariants(Button, {
  variants: {
    color: {
      "persian-green": [
        "bg-persian-green-600 text-white border-0 !outline-0 !transition-all",
        "data-[hover=true]:bg-persian-green-600/90 !data-[hover=true]:opacity-100",
        "data-[pressed=true]:!opacity-100 data-[pressed=true]:!bg-persian-green-700",
        "data-[focus-visible=true]:!outline-0 data-[focus-visible=true]:!outline-none data-[focus-visible=true]:!outline-offset-0",
      ].join(" "),
    },
    size: {
      lg: "h-[45px]",
      md: "h-[41px]",
      sm: "h-[35px]",
    },
  },
  defaultVariants: {
    radius: "sm",
    variant: "solid",
    color: "persian-green",
  },
});

export default TButton;
