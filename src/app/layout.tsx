import "@/styles/globals.css";
import { Metadata } from "next";
import { Providers } from "../lib/Providers/Providers";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Trek Tales",
  description: "This is a blogging site for share travel experience.",
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
