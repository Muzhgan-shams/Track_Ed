"use client";
import { getUniqueRecord } from "@/app/_services/service";
import moment from "moment";
import { useState, useEffect } from "react";
import { PieChart, Pie, ResponsiveContainer, Legend, Cell } from "recharts";

const PieChartComponent = ({ attendanceList }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (attendanceList && attendanceList.length > 0) {
      const totalSt = getUniqueRecord(attendanceList);
      const today = Number(moment().format("D")); // ensure it's a number

      if (totalSt.length > 0 && today > 0) {
        const PresentPerc =
          (attendanceList.length / (totalSt.length * today)) * 100;
        const present = Number(PresentPerc.toFixed(1));
        const absent = Number((100 - present).toFixed(1));

        setData([
          { name: "Total Present", value: present, fill: "#4CAF50" },
          { name: "Total Absent", value: absent, fill: "#F44336" },
        ]);
      }
    }
  }, [attendanceList]);

  return (
    <div className="border p-5 rounded-lg shadow-sm bg-white">
      <h2 className="my-2 font-bold text-lg text-center">Monthly Attendance</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="80%"
            label
            // label={({ name, value }) => `${name}: ${value}%`}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index === 0 ? "#4CAF50" : "#F44336"} // green for present, red for absent
              />
            ))}
          </Pie>
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            formatter={(value, entry) => `${value} (${entry.payload.value}%)`}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
