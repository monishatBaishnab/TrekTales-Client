"use client";
import { Button } from "@nextui-org/button";
import { extendVariants } from "@nextui-org/system";

const TButton = extendVariants(Button, {
  variants: {
    color: {
      "persian-green": [
        "bg-persian-green-600 text-white border-0 !outline-0 !transition-all",
        "data-[hover=true]:bg-persian-green-600/80 data-[hover=true]:opacity-100",
        "data-[pressed=true]:!opacity-100 data-[pressed=true]:!bg-persian-green-700",
        "data-[focus-visible=true]:!outline-0 data-[focus-visible=true]:!outline-none data-[focus-visible=true]:!outline-offset-0",
      ].join(" "),
      "persian-green-gost": [
        "bg-white text-shark-500 border border-[#C4C4C4] !outline-0 !transition-all",
        "data-[hover=true]:bg-persian-green-600 data-[hover=true]:opacity-100 data-[hover=true]:!text-white data-[hover=true]:!border-persian-green-600",
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
