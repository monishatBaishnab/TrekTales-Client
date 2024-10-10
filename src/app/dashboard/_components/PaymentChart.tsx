"use client";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
  Tooltip,
  YAxis,
} from "recharts";
const PaymentChart = ({
  states,
}: {
  states: {
    name: string;
    value: number;
  }[];
}) => {

  return (
    <div className="space-y-4 rounded-md bg-white p-5 shadow-sm">
      <h2 className="title-4">Payment Chart</h2>
      <ResponsiveContainer minHeight={400} width="100%">
        <LineChart data={states}>
          <Line dataKey="value" stroke="#00aaa1" type="monotone" />
          <CartesianGrid stroke="#e7e7e7" />
          <XAxis dataKey="name" />
          <YAxis
            tickFormatter={(tick) => {
              return `$${tick}`;
            }}
          />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PaymentChart;
