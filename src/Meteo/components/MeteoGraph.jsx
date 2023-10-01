import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ReferenceLine,
  CartesianGrid,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import date from "date-and-time";

// style
import "../style/meteo-graph.css";

const MeteoGraph = ({
  meteoData,
  syncId,
  dataXKey,
  dataYKey,
  unit,
  titleIcon,
  title,
  color,
}) => {
  const today = date.format(new Date(), "YYYY-MM-DDTHH") + ":00:00+00:00";
  return (
    <ResponsiveContainer className="graph-container">
      <AreaChart
        data={meteoData}
        syncId={syncId}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <ReferenceLine
          xAxisId={"0"}
          x={today}
          stroke="#404aa5"
          strokeWidth={2}
          isFront={true}
        />
        <XAxis
          dataKey={dataXKey}
          xAxisId={"0"}
          tickFormatter={(value) => {
            return value.slice(11, 16);
          }}
          tick={{ fontSize: "11px" }}
          height={20}
          interval={"preserveStart"}
        />
        <XAxis
          dataKey={(value) => {
            return date.transform(
              value.forecast.slice(0, 10),
              "YYYY-MM-DD",
              "DD/MM"
            );
          }}
          xAxisId={"1"}
          allowDuplicatedCategory={false}
          tick={{ fontSize: "12px" }}
          tickLine={false}
          axisLine={false}
          interval={"preserveStart"}
        />
        <YAxis
          tickFormatter={(value) => {
            return value.toLocaleString();
          }}
          unit={unit}
          tick={{ fontSize: "12px" }}
          // domain={[0, (dataMax) => Math.max(1, Math.ceil(dataMax))]}
        />
        <Legend
          verticalAlign="top"
          content={() => {
            return (
              <li className="legende" style={{ color: color }}>
                {titleIcon}
                {title}
              </li>
            );
          }}
        />
        <Tooltip
          labelFormatter={(value) => {
            return date.transform(
              value.slice(0, 16),
              "YYYY-MM-DDTHH:mm",
              "DD/MM-HH:mm"
            );
          }}
          formatter={(value) => {
            return [value.toFixed(1).toLocaleString() + " " + unit];
          }}
          contentStyle={{
            fontSize: "12px",
            backgroundColor: "#ffffff",
          }}
        />
        <Area
          type="monotone"
          dataKey={dataYKey}
          fill={color}
          stroke={color}
          fillOpacity={0.3}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default MeteoGraph;
