import { useState } from "react";
import CourseForm from "../components/CourseForm";
import CourseList from "../components/CoursesList";
import { Box, Container, Typography } from "@mui/material";

const Courses = () => {
  const [refresh, setRefresh] = useState(false);

  const handleCourseAdded = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <Container maxWidth="lg">
    <div>
    <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Typography variant="h4">Cadastro de Cursos</Typography>
      </Box>
      <CourseForm onCourseAdded={handleCourseAdded} />
      <CourseList refresh={refresh} />
    </div>
    </Container>
  );
};

export default Courses;