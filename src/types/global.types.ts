import { ReactNode } from "react";

export type TLayout = { children: ReactNode };

export type TFormElementProps = {
  name?: string;
  label?: string;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  isDisabled?: boolean;
  fullWidth?: boolean;
  type?: string;
};
