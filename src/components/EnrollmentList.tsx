import { useEffect, useState } from "react";
import api from "../services/api";
import {
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
  Container,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface Enrollment {
  id: number;
  studentId: number;
  studentName?: string;
  courseId: number;
  courseName?: string;
}

interface Student {
  id: number;
  name: string;
}

interface Course {
  id: number;
  name: string;
}

interface EnrollmentListProps {
  refresh: boolean;
}

const EnrollmentList = ({ refresh }: EnrollmentListProps) => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.get<Enrollment[]>("/enrollments"),
      api.get<Student[]>("/students"),
      api.get<Course[]>("/courses"),
    ])
      .then(([enrollmentsRes, studentsRes, coursesRes]) => {
        const studentsMap = new Map(
          studentsRes.data.map((s) => [s.id, s.name])
        );
        const coursesMap = new Map(coursesRes.data.map((c) => [c.id, c.name]));
        const enrichedEnrollments = enrollmentsRes.data.map((enrollment) => ({
          ...enrollment,
          studentName:
            studentsMap.get(enrollment.studentId) || "Aluno desconhecido",
          courseName:
            coursesMap.get(enrollment.courseId) || "Curso desconhecido",
        }));

        setEnrollments(enrichedEnrollments);
      })
      .catch((error) => console.error("Erro ao buscar dados:", error))
      .finally(() => setLoading(false));
  }, [refresh]);

  const deleteEnrollment = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja remover esta matrícula?"))
      return;
    try {
      await api.delete(`/enrollments/${id}`);
      setEnrollments(enrollments.filter((enrollment) => enrollment.id !== id));
    } catch (error) {
      console.error("Erro ao remover matrícula", error);
    }
  };

  if (loading) return <CircularProgress />;
  return (
    <Container sx={{ paddingTop: "35px" }}>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Typography variant="h4">Matrículas</Typography>
      </Box>
      <List>
        {enrollments.map((enrollment) => (
          <ListItem key={enrollment.id} divider>
            <ListItemText
              primary={`${enrollment.studentName} - ${enrollment.courseName}`}
            />
            <IconButton
              onClick={() => deleteEnrollment(enrollment.id)}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default EnrollmentList;
