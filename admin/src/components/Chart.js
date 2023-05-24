import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Chart(props) {
  return (
    <div className="m-8 shadow-lg p-6">
      <h3 className="mb-4 font-semibold text-2xl m-2">{props.title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={props.data}>
          <XAxis dataKey={props.XAxis} stroke="#f28482"></XAxis>
          <Line type="monotone" dataKey={props.dataKey} stroke="#f28482"></Line>
          <Tooltip></Tooltip>
          {props.grid && (
            <CartesianGrid
              stroke="#e0dfdf"
              strokeDasharray="5 5"
            ></CartesianGrid>
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
