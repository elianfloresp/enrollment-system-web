import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { List, ListItem, ListItemText, Typography, Container, CircularProgress } from "@mui/material";

interface Course {
  id: number;
  name: string;
  description: string;
}

const CoursesByStudent = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get<Course[]>(`/enrollments/student/${studentId}`)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => console.error("Erro ao buscar cursos do aluno:", error))
      .finally(() => setLoading(false));
  }, [studentId]);

  if (loading) return <CircularProgress />;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Cursos do Aluno
      </Typography>
      <List>
        {courses.map((course) => (
          <ListItem key={course.id} divider>
            <ListItemText primary={course.name} secondary={course.description} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default CoursesByStudent;