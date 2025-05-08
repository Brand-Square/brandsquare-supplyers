"use client";
import React from "react";

import { BestSellingProduct } from "@/app/store/useVendorProductStore";

import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const SalesDonutChart = ({
  data,
  style,
  text,
}: {
  style?: string;
  text: string;
  data: BestSellingProduct[];
}) => {
  const COLORS = ["#E6EDF7", "#8CA8D8", "#1A237E"];


  const renderColorfulLegendText = (value: string) => {
    return <span style={{ color: "#000", fontSize: "14px" }}>{value}</span>;
  };
  return (
    <div className="w-full max-w-md py-3">
      <div>
        <div className="h-[280px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={0}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index]}
                    stroke="none"
                  />
                ))}

                <LabelList
                  dataKey="value"
                  position="outside"
                  formatter={(value: string) => `${value}%`}
                  fill="#333"
                  fontSize={12}
                />
              </Pie>

              <Legend
                verticalAlign="middle"
                align="right"
                layout="vertical"
                iconType="circle"
                formatter={renderColorfulLegendText}
                iconSize={10}
                wrapperStyle={{
                  paddingLeft: "20px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div
            className={`absolute   top-1/2 left-[33%] md:left-[39%]   transform -translate-x-1/2 -translate-y-1/2 text-center ${style}`}
          >
            <div className="text-3xl font-bold">549</div>
            <div className="text-sm text-gray-500">Total {text}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesDonutChart;
