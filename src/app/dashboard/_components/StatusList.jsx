"use Client";
import { getUniqueRecord } from "@/app/_services/service";
import moment from "moment";
import { useEffect, useState } from "react";
import Card from "./Card";
import {
  GraduationCapIcon,
  TrendingDownIcon,
  TrendingUp,
  TrendingUpIcon,
} from "lucide-react";
const StatusList = ({ attendanceList }) => {
  const [totalStudent, setTotalStudent] = useState(0);
  const [presentPrec, setPresentPerc] = useState(0);

  useEffect(() => {
    if (attendanceList && attendanceList.length > 0) {
      const totalSt = getUniqueRecord(attendanceList);
      setTotalStudent(totalSt.length);

      const today = Number(moment().format("D")); // ensure it's a number
      if (totalSt.length > 0 && today > 0) {
        const PresentPerc =
          (attendanceList.length / (totalSt.length * today)) * 100;
        setPresentPerc(PresentPerc);
      } else {
        setPresentPerc(0); // fallback
      }
    }
  }, [attendanceList]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-6">
      <Card
        icon={<GraduationCapIcon />}
        title="Total Students"
        value={totalStudent}
      />
      <Card
        icon={<TrendingUpIcon />}
        title="Total Present"
        value={presentPrec.toFixed(1) + "%"}
      />
      <Card
        icon={<TrendingDownIcon />}
        title="Total Absent"
        value={(100 - presentPrec).toFixed(1) + "%"}
      />
    </div>
  );
};

export default StatusList;
