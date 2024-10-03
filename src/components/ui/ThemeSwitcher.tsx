"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";

import TButton from "./TButton";

const ThemeSwitcher = () => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

  return (
    <div className="rounded-md bg-white p-0.5">
      <TButton
        isIconOnly
        className={`text-base transition-all ${themeMode === "light" ? "bg-persian-green-600" : "bg-white !text-persian-green-600 data-[hover=true]:bg-white data-[pressed=true]:!bg-white"}`}
        size="sm"
        onPress={() => setThemeMode("light")}
      >
        <Sun className="size-4" />
      </TButton>
      <TButton
        isIconOnly
        className={`text-base transition-all ${themeMode === "dark" ? "bg-persian-green-600" : "bg-white !text-persian-green-600 data-[hover=true]:bg-white data-[pressed=true]:!bg-white"}`}
        size="sm"
        onPress={() => setThemeMode("dark")}
      >
        <Moon className="size-4" />
      </TButton>
    </div>
  );
};

export default ThemeSwitcher;
