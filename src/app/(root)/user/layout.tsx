import UserNavigation from "./_components/UserNavigation";

import { TLayout } from "@/types/global.types";

const UserLayout = ({ children }: TLayout) => {
  return (
    <div className="container space-y-7">
      <div className="mb-10 flex items-center justify-center gap-1">
        <h3 className="title-3 bg-title">User</h3>
        <h3 className="title-3">Dashboard</h3>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        <div className="col-span-1">
          <UserNavigation />
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-3">{children}</div>
      </div>
    </div>
  );
};

export default UserLayout;
