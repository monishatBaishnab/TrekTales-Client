"use client";

import { LineChart, Line, CartesianGrid, XAxis, ResponsiveContainer, Tooltip, YAxis } from "recharts";
const data = [
  { name: "A", uv: 400, pv: 2400, amt: 2400 },
  { name: "B", uv: 300, pv: 1398, amt: 2210 },
  { name: "C", uv: 200, pv: 9800, amt: 2290 },
  { name: "D", uv: 278, pv: 3908, amt: 2000 },
  { name: "E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "G", uv: 3490, pv: 4300, amt: 2100 },
  { name: "H", uv: 2300, pv: 5400, amt: 1600 },
  { name: "I", uv: 1500, pv: 4700, amt: 3000 },
  { name: "J", uv: 4000, pv: 3200, amt: 2100 },
  { name: "K", uv: 3100, pv: 4100, amt: 2700 },
  { name: "L", uv: 2900, pv: 2300, amt: 1900 },
  { name: "M", uv: 1800, pv: 1600, amt: 2700 },
  { name: "N", uv: 4100, pv: 3500, amt: 2800 },
  { name: "O", uv: 3700, pv: 4300, amt: 3300 },
  { name: "P", uv: 4200, pv: 4800, amt: 2600 },
  { name: "Q", uv: 3100, pv: 2100, amt: 2300 },
  { name: "R", uv: 3200, pv: 3300, amt: 2400 },
  { name: "S", uv: 2600, pv: 2900, amt: 2500 },
  { name: "T", uv: 3800, pv: 3700, amt: 2200 },
  { name: "U", uv: 4500, pv: 4800, amt: 3000 },
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
          <YAxis tickFormatter={tick => {
            return `$${tick}`
          }} />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PaymentChart;
