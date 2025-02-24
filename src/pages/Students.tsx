import { useState } from "react";
import StudentList from "../components/StudentList";
import StudentForm from "../components/StudentForm";

const Students = () => {
  const [refresh, setRefresh] = useState(false);

  const handleStudentAdded = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div>
      <h1>Alunos</h1>
      <StudentForm onStudentAdded={handleStudentAdded} />
      <StudentList refresh={refresh} />
    </div>
  );
};

export default Students;