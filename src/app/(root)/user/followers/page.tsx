"use client";

import TUserTable from "../_components/TUserTable";

import { useUserInfo } from "@/context/UserInfoProvider";
import { useFetchSingleUser } from "@/hooks/user.hooks";

const Followers = () => {
  const { userInfo } = useUserInfo() ?? {};
  const { data: userResponse, isLoading, isFetching } = useFetchSingleUser(userInfo?._id as string);
  const user = userResponse?.user ?? {};

  return (
    <div className="space-y-2">
      {/* <h3 className="title-2">Followers</h3> */}
      <TUserTable
        title="My Followers"
        users={user?.followers}
        usersFetching={isFetching}
        usersLoading={isLoading || !userInfo?._id}
      />
      <TUserTable
        title="Authors I Follow"
        users={userResponse?.followedUsers}
        usersFetching={isFetching}
        usersLoading={isLoading || !userInfo?._id}
      />
    </div>
  );
};

export default Followers;
