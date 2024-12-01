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

const MyResponsiveLine = ({ data }) => {
  if (!data || !Array.isArray(data)) {
    return <div>Loading...</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 20, bottom: 0, left: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="count_date" // database에서 가져온 값
          tick={false} // Hide the tick labels
          axisLine={false} // Optionally hide the axis line
          tickLine={false} // Optionally hide the tick lines
        />
        <YAxis
          tickFormatter={(value) =>
            `${new Intl.NumberFormat("en-US").format(value)}`
          }
          style={{
            fontSize: 14,
            fontFamily: "Pretendard, Montserrat, sans-serif",
          }}
        />
        <Tooltip
          formatter={(value) =>
            `${new Intl.NumberFormat("en-US").format(value)}원`
          }
          contentStyle={{
            background: "white",
            border: "1px solid #ccc",
            fontSize: 14,
            fontFamily: "Pretendard, Montserrat, sans-serif",
          }}
          itemStyle={{
            color: "#7b9064",
            fontSize: 14,
            fontFamily: "Pretendard, Montserrat, sans-serif",
          }}
          labelStyle={{
            fontSize: 14,
            fontFamily: "Pretendard, Montserrat, sans-serif",
          }}
        />
        <Line
          type="monotone"
          dataKey="value" // database에서 가져온 값
          stroke="#7b9064"
          strokeWidth={2}
          dot={{ r: 5, stroke: "#7b9064", strokeWidth: 2 }}
          isAnimationActive={true} // Enable animation
          animationDuration={800} // Set animation duration to 800ms
          name="매출"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MyResponsiveLine;
