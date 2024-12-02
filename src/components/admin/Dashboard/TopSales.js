import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  RadialBarChart,
  RadialBar,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaCrown } from "react-icons/fa";
import styles from "./css/Top.module.css";

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

function TopSales() {
  const { data } = useSelector((state) => state.dashboard.salesStatistics);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (data && data.message === "횡단면 조회 성공") {
      const newChartData = data.data[0];
      if (JSON.stringify(newChartData) !== JSON.stringify(chartData)) {
        setChartData(newChartData);
      }
    }
  }, [data, chartData]); // Only update chartData when data changes

  console.log("chartData", chartData);

  return (
    <>
      <h4 className={styles["top-title"]}>매출 NO.1</h4>
      <div className={styles["top-container"]}>
        <FaCrown className={styles["crown-icon"]} />
        <h4>{chartData?.name}</h4>
        <div className={styles["recharts-wrapper"]}>
          {chartData && chartData.ratio !== undefined && (
            <ResponsiveContainer width="100%" height={300}>
              <RadialBarChart
                data={[chartData]} // Use the state data
                innerRadius="50%" // Adjust inner radius for a thinner bar
                outerRadius="100%" // Adjust outer radius to fit the container
                barSize={40} // Adjust bar size for thickness
                startAngle={180} // Start angle for semi-circle
                endAngle={180 - chartData.ratio * 360} // Dynamic end angle
              >
                <RadialBar
                  minAngle={15}
                  background
                  clockWise
                  dataKey="ratio"
                  fill="#7B9064" // Set the bar color to match your theme
                />
                <Tooltip content={<CustomTooltip />} />{" "}
                {/* Use custom tooltip */}
              </RadialBarChart>
            </ResponsiveContainer>
          )}
        </div>
        <p>
          {chartData?.ratio ? `${Math.round(chartData.ratio * 100)}%` : null}
        </p>
      </div>
    </>
  );
}

export default TopSales;
