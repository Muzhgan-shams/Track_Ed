"use Client";
import { useEffect, useState } from "react";
import { getUniqueRecord } from "@/app/_services/service";
import {
  BarChart,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
} from "recharts";

// import { RechartsDevtools } from "@recharts/devtools";
const BarChartComponent = ({ attendanceList, totalPresentData }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    formatAttendanceListCount();
  }, [attendanceList, totalPresentData]);
  const formatAttendanceListCount = () => {
    const totalStudent = getUniqueRecord(attendanceList);
    const result = totalPresentData.map((item) => ({
      day: item.day,
      presentCount: item.presentCount,
      absentCount: Number(totalStudent?.length) - Number(item.presentCount),
    }));
    setData(result);
    // console.log(result);
  };
  return (
    <div className="p-5 border rounded-lg shadow-sm">
      <h2 className="my-2 font-bold text-lg"> Attendance</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          {/* Subtle grid */}
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />

          {/* Axis styling */}
          <XAxis
            dataKey="day"
            tick={{ fill: "#555", fontSize: 12 }}
            label={{ value: "Day", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            tick={{ fill: "#555", fontSize: 12 }}
            label={{ value: "Students", angle: -90, position: "insideLeft" }}
          />

          {/* Interactive tooltip */}
          <Tooltip
            contentStyle={{ backgroundColor: "#f9f9f9", borderRadius: "8px" }}
            cursor={{ fill: "rgba(0,0,0,0.05)" }}
          />

          {/* Legend with nicer spacing */}
          <Legend
            verticalAlign="top"
            height={36}
            wrapperStyle={{ fontSize: 12 }}
          />

          {/* Bars with animation and rounded corners */}
          <Bar
            dataKey="presentCount"
            name="Present"
            fill="#4CAF50"
            radius={[4, 4, 0, 0]}
            isAnimationActive={true}
            animationDuration={800}
          />
          <Bar
            dataKey="absentCount"
            name="Absent"
            fill="#F44336"
            radius={[4, 4, 0, 0]}
            isAnimationActive={true}
            animationDuration={800}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
