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
const data = [
  { name: "A", uv: 400 },
  { name: "B", uv: 300 },
  { name: "C", uv: 200 },
  { name: "D", uv: 278 },
  { name: "E", uv: 1890 },
  { name: "F", uv: 2390 },
  { name: "G", uv: 3490 },
  { name: "H", uv: 2300 },
  { name: "I", uv: 1500 },
  { name: "J", uv: 4000 },
  { name: "K", uv: 3100 },
  { name: "L", uv: 2900 },
  { name: "M", uv: 1800 },
  { name: "N", uv: 4100 },
  { name: "O", uv: 3700 },
  { name: "P", uv: 4200 },
  { name: "Q", uv: 3100 },
  { name: "R", uv: 3200 },
  { name: "S", uv: 2600 },
  { name: "T", uv: 3800 },
  { name: "U", uv: 4500 },
];

const PaymentChart = () => {
  return (
    <div className="space-y-4 rounded-md bg-white p-5 shadow-sm">
      <h2 className="title-4">Payment Chart</h2>
      <ResponsiveContainer minHeight={400} width="100%">
        <LineChart data={data}>
          <Line dataKey="uv" stroke="#00aaa1" type="monotone" />
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
