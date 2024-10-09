"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { QueryClient, QueryClientProvider } from "react-query";

import UserInfoProvider from "@/context/UserInfoProvider";
import FilterProvider from "@/context/FilterProvider";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

const queryClient = new QueryClient();

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <UserInfoProvider>
        <FilterProvider>
          <NextUIProvider navigate={router.push}>
            <Toaster />
            <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
          </NextUIProvider>
        </FilterProvider>
      </UserInfoProvider>
    </QueryClientProvider>
  );
}
