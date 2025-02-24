import { useState, useEffect } from "react";
import {
  Button,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import api from "../services/api";
import { AxiosError } from "axios";

interface Student {
  id: number;
  name: string;
}

interface Course {
  id: number;
  name: string;
}

const EnrollmentForm = ({
  onEnrollmentAdded,
}: {
  onEnrollmentAdded: () => void;
}) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<number | "">("");
  const [selectedCourse, setSelectedCourse] = useState<number | "">("");

  useEffect(() => {
    api
      .get<Student[]>("/students")
      .then((response) => setStudents(response.data));
    api.get<Course[]>("/courses").then((response) => setCourses(response.data));
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedStudent || !selectedCourse) {
      alert("Selecione um aluno e um curso!");
      return;
    }

    try {
      await api.post("/enrollments", {
        studentId: selectedStudent,
        courseId: selectedCourse,
      });
    
      
      setSelectedStudent("");
      setSelectedCourse("");
      onEnrollmentAdded();
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        alert(error.response.data);
      } else {
        alert(
          "Erro ao matricular aluno. Verifique o console para mais detalhes."
        );
      }
      console.error("Erro ao matricular aluno:", error);
    }
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", gap: 2, mb: 2 }}
    >
      <FormControl fullWidth>
        <InputLabel id="student-label">Aluno</InputLabel>
        <Select
          labelId="student-label"
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value as number)}
          label="Aluno"
          required
        >
          {students.map((student) => (
            <MenuItem key={student.id} value={student.id}>
              {student.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="course-label">Curso</InputLabel>
        <Select
          labelId="course-label"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value as number)}
          label="Curso"
          required
        >
          {courses.map((course) => (
            <MenuItem key={course.id} value={course.id}>
              {course.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button type="submit" variant="contained" color="primary">
        Matricular Aluno
      </Button>
    </Box>
  );
};

export default EnrollmentForm;
