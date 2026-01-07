"use client";
import GlobalApi from "@/app/_services/GlobalApi";
import AddNewStudent from "./_components/AddNewStudent";
import { useState, useEffect } from "react";
import StudentListTable from "./_components/StudentListTable";

const Student = () => {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    GetAllStudents();
  }, []);
  // Get All Students
  const GetAllStudents = () => {
    GlobalApi.GetAllStudents().then((res) => {
      setStudents(res.data);
    });
  };
  return (
    <div className="p-7">
      <h2 className="font-bold text-2xl flex justify-between items-center">
        Student
        <AddNewStudent refreshData={GetAllStudents} />
      </h2>
      <StudentListTable students={students} refreshData={GetAllStudents} />
    </div>
  );
};

export default Student;
