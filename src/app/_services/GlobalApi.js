const { default: axios } = require("axios");

const GetAllGrades = () => {
  return axios.get("/api/grade");
};
const CreateNewStudent = (data) => {
  return axios.post("/api/student", data);
};
const GetAllStudents = () => {
  return axios.get("/api/student");
};
const DeleteStudent = (id) => {
  return axios.delete(`/api/student?id=${id}`);
};
const GetAttendanceList = (grade, month) => {
  return axios.get(`/api/attendance?grade=${grade}&month=${month}`);
};
const MarkAttendance = (data) => {
  return axios.post("/api/attendance", data);
};
const MarkAbsent = (studentId, day, date) => {
  return axios.delete(
    "/api/attendance?studentId=" + studentId + "&date=" + date + "&day=" + day
  );
};
const TotalPresentByDay = (date, grade) => {
  return axios.get(`/api/dashboard?date=${date}&grade=${grade}`);
};
export default {
  GetAllGrades,
  CreateNewStudent,
  GetAllStudents,
  DeleteStudent,
  GetAttendanceList,
  MarkAttendance,
  MarkAbsent,
  TotalPresentByDay,
};
