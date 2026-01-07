"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import MonthSelection from "../_component/MonthSelection";
import GradeSelect from "../_component/GradeSelect";
import GlobalApi from "../_services/GlobalApi";
import moment from "moment";
import StatusList from "./_components/StatusList";
import { BarChartIcon } from "lucide-react";
import BarChartComponent from "./_components/BarChartComponent";
import PieChartComponent from "./_components/PieChartComponent";
function Dashboard() {
  const { setTheme } = useTheme();
  const [selectedMonth, setSelectedMonth] = useState(moment());
  const [selectedGrade, setSelectedGrade] = useState("");
  const [attendanceList, setAttendanceList] = useState([]);
  const [totalPresentData, setTotalPresentData] = useState([]);

  useEffect(() => {
    if (selectedMonth && selectedGrade) {
      getStudentAttendance();
      GetTotalPresentByDay();
    }
  }, [selectedMonth, selectedGrade]);

  const getStudentAttendance = () => {
    if (!selectedGrade || !selectedMonth) return;
    GlobalApi.GetAttendanceList(
      selectedGrade,
      moment(selectedMonth).format("MM/YYYY")
    ).then((res) => setAttendanceList(res.data || []));
  };

  const GetTotalPresentByDay = () => {
    if (!selectedGrade || !selectedMonth) return;
    GlobalApi.TotalPresentByDay(
      moment(selectedMonth).format("MM/YYYY"),
      selectedGrade
    ).then((res) => setTotalPresentData(res.data || []));
  };

  return (
    <div className="p-10">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <div className="flex items-center gap-4">
          <MonthSelection onSelectMonth={setSelectedMonth} />
          <GradeSelect onSelectGrade={setSelectedGrade} />
        </div>
      </div>

      <StatusList attendanceList={attendanceList} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-2">
          <BarChartComponent
            attendanceList={attendanceList}
            totalPresentData={totalPresentData}
          />
        </div>
        <div>
          {/*  */}
          <PieChartComponent attendanceList={attendanceList} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
