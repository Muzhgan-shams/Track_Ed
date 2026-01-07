"use client";
import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import moment from "moment";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";
import { getUniqueRecord } from "@/app/_services/service";

ModuleRegistry.registerModules([AllCommunityModule]);
const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [10, 25, 50, 100];
function AttendanceGrid({ attendanceList, selectedMonth }) {
  const [rowData, setRowData] = useState();
  const [colDefs, setColDefs] = useState([
    { field: "studentId", filter: true },
    { field: "name", filter: true },
  ]);

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const numberOfDays = daysInMonth(
    moment(selectedMonth).format("YYYY"),
    moment(selectedMonth).format("MM") - 1 // ⚠️ moment months are 1-based, JS Date expects 0-based
  );
  const daysArray = Array.from({ length: numberOfDays }, (_, i) => i + 1);

  useEffect(() => {
    // console.log("attendanceList from API:", attendanceList);
    // console.log("selectedMonth:", selectedMonth);

    if (attendanceList) {
      const userList = getUniqueRecord(attendanceList);
      setRowData(userList);
      daysArray.forEach((date) => {
        setColDefs((prevData) => [
          ...prevData,
          { field: date.toString(), width: 50, editable: true },
        ]);
        userList.forEach((obj) => (obj[date] = isPresent(obj.studentId, date)));
      });
    }
  }, [attendanceList]);

  const isPresent = (studentId, day) => {
    const result = attendanceList.find(
      (item) => item.day == day && item.studentId == studentId
    );
    return result ? true : false;
  };

  const onMarkAttendance = (day, studentId, presentStatus) => {
    const date = moment(selectedMonth).format("MM/YYYY");
    if (presentStatus) {
      const data = { day, studentId, present: presentStatus, date: date };
      GlobalApi.MarkAttendance(data).then((res) => {
        toast(`Student ID: ${studentId} marked present for day ${day}`);
      });
    } else {
      GlobalApi.MarkAbsent(studentId, day, date).then((res) => {
        toast(`Student ID: ${studentId} marked absent for day ${day}`);
      });
    }
  };

  // ✅ Return JSX
  return (
    <div>
      <div style={{ height: 500 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          onCellValueChanged={(e) =>
            onMarkAttendance(
              Number(e.colDef.field),
              e.data.studentId,
              e.newValue
            )
          }
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </div>
  );
}

export default AttendanceGrid;
