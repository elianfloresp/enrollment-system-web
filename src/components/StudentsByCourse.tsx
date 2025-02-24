import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { List, ListItem, ListItemText, Typography, Container, CircularProgress } from "@mui/material";

interface Student {
  id: number;
  name: string;
  email: string;
}

const StudentsByCourse = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get<Student[]>(`/enrollments/course/${courseId}`)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => console.error("Erro ao buscar alunos do curso:", error))
      .finally(() => setLoading(false));
  }, [courseId]);

  if (loading) return <CircularProgress />;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Alunos do Curso
      </Typography>
      <List>
        {students.map((student) => (
          <ListItem key={student.id} divider>
            <ListItemText primary={student.name} secondary={student.email} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default StudentsByCourse;