"use client";
import { useState, useEffect } from "react";
import GlobalApi from "../_services/GlobalApi";

const GradeSelect = ({ onSelectGrade }) => {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    GetAllGradesList();
  }, []);

  const GetAllGradesList = () => {
    GlobalApi.GetAllGrades()
      .then((res) => setGrades(res.data.result))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <select
        className="border border-gray-300 rounded-md p-2"
        defaultValue=""
        onChange={(e) => onSelectGrade(e.target.value)}
      >
        <option value="" disabled>
          Select Grade
        </option>
        {grades.map((item, index) => (
          <option key={index} value={item.grade}>
            {item.grade}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GradeSelect;
