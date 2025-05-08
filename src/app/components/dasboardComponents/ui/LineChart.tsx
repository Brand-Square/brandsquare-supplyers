"use client";
import React from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { SalesOverTime } from "@/app/store/useVendorProductStore";


const SalesChart = ({ data }: { data: SalesOverTime[] }) => {
  return (
    <div className="w-full  overflow-hidden py-3">
      <div>
        <div className=" h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 0, left: 0, bottom: 5 }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                tick={{ fill: "#B0B1BD" }}
                tickLine={false}
                dataKey="name"
                axisLine={{ stroke: "#ccc", strokeWidth: 1 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#B0B1BD" }}
              />
              <Tooltip />
              {/* <Legend /> */}
              <Line
                type="monotone"
                dataKey="val"
                stroke="#A4CAFF"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;
