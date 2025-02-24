import { useState } from "react";
import StudentList from "../components/StudentList";
import StudentForm from "../components/StudentForm";
import { Box, Typography } from "@mui/material";

const Students = () => {
  const [refresh, setRefresh] = useState(false);

  const handleStudentAdded = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Typography variant="h4">Cadastro de Alunos</Typography>
      </Box>
      <StudentForm onStudentAdded={handleStudentAdded} />
      <StudentList refresh={refresh} />
    </div>
  );
};

export default Students;
