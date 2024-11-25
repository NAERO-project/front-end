import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  RadialBarChart,
  RadialBar,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#fff",
          padding: "10px",
          border: "1px solid #ccc",
        }}
      >
        <p style={{ color: "black", fontSize: 14 }}>비중:</p>
        <p style={{ color: "#7B9064", fontSize: 14 }}>
          {`${(payload[0].value * 100).toFixed(2)}%`}
        </p>
      </div>
    );
  }
  return null;
}

function TopLiked() {
  const { data } = useSelector((state) => state.dashboard.likedStatistics);
  const [chartDataLiked, setChartDataLiked] = useState(null);

  useEffect(() => {
    if (data && data.message === "횡단면 조회 성공") {
      const newChartDataLiked = data.data[0];
      if (
        JSON.stringify(newChartDataLiked) !== JSON.stringify(chartDataLiked)
      ) {
        setChartDataLiked(newChartDataLiked);
      }
    }
  }, [data, chartDataLiked]);

  console.log("chartDataLiked", chartDataLiked);

  return (
    <div>
      <h4>선호도 NO.1</h4>
      {chartDataLiked && chartDataLiked.ratio !== undefined && (
        <ResponsiveContainer width="100%" height={400}>
          <RadialBarChart
            data={[chartDataLiked]}
            innerRadius="50%"
            outerRadius="100%"
            barSize={40}
            startAngle={180}
            endAngle={180 - chartDataLiked.ratio * 360}
          >
            <RadialBar
              minAngle={15}
              background
              clockWise
              dataKey="ratio"
              fill="#7B9064"
            />
            <Tooltip content={<CustomTooltip />} />
          </RadialBarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default TopLiked;