"use client";
import GradeSelect from "@/app/_component/GradeSelect";
import MonthSelection from "@/app/_component/MonthSelection";
import GlobalApi from "@/app/_services/GlobalApi";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { useState } from "react";
import AttendanceGrid from "./_components/AttendanceGrid";

const Attendance = () => {
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade, setSelectedGrade] = useState();
  const [attendanceList, setAttendanceList] = useState([]);
  const onSearchHandler = () => {
    // console.log(selectedMonth, selectedGrade);
    const month = moment(selectedMonth).format("MM/YYYY");
    GlobalApi.GetAttendanceList(selectedGrade, month).then((res) => {
      setAttendanceList(res.data);
    });
  };
  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold my-3">Attendance</h2>
      {/* Search Option */}
      <div className="flex gap-4 items-center border rounded-lg shadow-sm p-5 mb-5">
        <div className="flex items-center gap-2">
          <label>Select Month:</label>
          <MonthSelection onSelectMonth={(value) => setSelectedMonth(value)} />
        </div>
        <div className="flex items-center gap-2">
          <label>Select Grade:</label>
          <GradeSelect onSelectGrade={(value) => setSelectedGrade(value)} />
        </div>
        <Button onClick={() => onSearchHandler()}>Search</Button>
      </div>
      {/* Students Attendance Grid */}
      <AttendanceGrid
        attendanceList={attendanceList}
        selectedMonth={selectedMonth}
      />
    </div>
  );
};

export default Attendance;
