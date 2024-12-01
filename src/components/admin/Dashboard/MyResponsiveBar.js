import { ResponsiveBar } from "@nivo/bar";
import { easeCubicInOut } from "d3-ease";
import { ResponsiveContainer } from "recharts";

const MyResponsiveBar = ({ data }) => {
  // Find the maximum ratio value from the data
  const maxValue = Math.max(...data.map((item) => item.ratio));

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveBar
        data={[...data].reverse()}
        keys={["ratio"]} // database에서 가져온 값
        indexBy="name" // database에서 가져온 값
        margin={{ top: 30, right: 50, bottom: 30, left: 100 }}
        padding={0.5}
        layout="horizontal"
        valueScale={{ type: "linear", min: 0, max: maxValue }}
        indexScale={{ type: "band", round: true }}
        colors="#7b9064"
        borderRadius={20}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        theme={{
          textColor: "#020202",
          fontSize: 14,
          axis: {
            ticks: {
              text: {
                fontSize: 14,
                fontFamily: "Pretendard, Montserrat, sans-serif",
              },
            },
          },
          labels: {
            text: {
              fontSize: 14,
              fontFamily: "Pretendard, Montserrat, sans-serif",
            },
          },
        }}
        axisBottom={null}
        axisLeft={{
          tickSize: 0,
          tickPadding: 15,
          tickRotation: 0,
          renderTick: (tick) => (
            <g transform={`translate(0,${tick.y})`}>
              <text
                x={-15}
                y={0}
                textAnchor="end"
                dominantBaseline="middle"
                style={{
                  fontSize: 14,
                  fontFamily: "Pretendard, Montserrat, sans-serif",
                  fontWeight:
                    tick.value && tick.value.startsWith("NO")
                      ? "600"
                      : "normal",
                }}
              >
                {tick.value}
              </text>
            </g>
          ),
        }}
        enableGridX={true}
        gridXValues={[0, 0.25, 0.5, 0.75, 1]}
        enableGridY={false}
        label={(d) => `${(d.value * 100).toFixed(0)}%`}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        labelPosition="end"
        labelOffset={20}
        motionConfig={{
          duration: 800, // Set duration to 800ms
          easing: easeCubicInOut, // Use a similar easing function
        }}
        tooltip={({ id, value, data, color }) => (
          <div
            style={{
              padding: "9px 12px",
              background: "white",
              border: "1px solid #ccc",
              fontSize: 14,
              fontFamily: "Pretendard, Montserrat, sans-serif",
              color: color,
            }}
          >
            <span style={{ color: "black", fontSize: 16 }}>비중: </span>
            {(value * 100).toFixed(2)}%<br />
            <span style={{ color: "black", fontSize: 16 }}>매출: </span>
            {new Intl.NumberFormat("en-US").format(data.value)}원
          </div>
        )}
      />
    </div>
  );
};

export default MyResponsiveBar;
