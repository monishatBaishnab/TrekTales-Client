"use client";

import { HandCoins, LayoutList, MessageCircleMore, UsersRound } from "lucide-react";

import StateCard from "./_components/StateCard";
import PaymentChart from "./_components/PaymentChart";

import { useFetchPaymentStates } from "@/hooks/user.hooks";

const Dashboard = () => {
  const { data, isLoading } = useFetchPaymentStates();

  return (
    <div className="space-y-5">
      <h2 className="title-2">Dashboard</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <StateCard
          icon={<HandCoins className="size-10" />}
          isLoading={isLoading}
          subTitle="Total Payments"
          title={`${data?.totalPayments}Tk`}
        />
        <StateCard
          icon={<UsersRound className="size-10" />}
          isLoading={isLoading}
          subTitle="Total User"
          title={data?.totalUsers}
        />
        <StateCard
          icon={<LayoutList className="size-10" />}
          isLoading={isLoading}
          subTitle="Total Posts"
          title={data?.totalPosts}
        />
        <StateCard
          icon={<MessageCircleMore className="size-10" />}
          isLoading={isLoading}
          subTitle="Total Comments"
          title={data?.totalComments}
        />
      </div>
      <PaymentChart states={data?.states} />
    </div>
  );
};

export default Dashboard;
