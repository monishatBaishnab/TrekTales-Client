import Navbar from "./_components/navbar/Navbar";
import Sidebar from "./_components/sidebar/Sidebar";

import { TLayout } from "@/types/global.types";

const AdminDashboardLayout = ({ children }: TLayout) => {
  return (
    <main className="mx-auto max-w-screen-2xl">
      <Navbar />
      <div className="flex items-center">
        <Sidebar />

        <div className="min-h-[calc(100vh_-_57px)] w-full bg-[#F5F7FA] p-5">{children}</div>
      </div>
    </main>
  );
};

export default AdminDashboardLayout;
