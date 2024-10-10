import { HandCoins, LayoutList, MessageCircleMore, UsersRound } from "lucide-react";

import StateCard from "./_components/StateCard";
import PaymentChart from "./_components/PaymentChart";

const Dashboard = () => {
  return (
    <div className="space-y-5">
      <h2 className="title-2">Dashboard</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <StateCard icon={<HandCoins className="size-10" />} subTitle="Total Payments" title="3800$" />
        <StateCard icon={<UsersRound className="size-10" />} subTitle="Total User" title="8" />
        <StateCard icon={<LayoutList className="size-10" />} subTitle="Total Posts" title="12" />
        <StateCard
          icon={<MessageCircleMore className="size-10" />}
          subTitle="Total Comments"
          title="5"
        />
      </div>
      <PaymentChart />
    </div>
  );
};

export default Dashboard;
