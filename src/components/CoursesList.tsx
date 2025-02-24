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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface Course {
  id: number;
  name: string;
  description: string;
}

interface CourseListProps {
  refresh: boolean;
}

const CourseList = ({ refresh }: CourseListProps) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [editCourse, setEditCourse] = useState<Course | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    api
      .get<Course[]>("/courses")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => console.error("Erro ao buscar cursos:", error))
      .finally(() => setLoading(false));
  }, [refresh]);

  const deleteCourse = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este curso?")) return;
    try {
      await api.delete(`/courses/${id}`);
      setCourses(courses.filter((course) => course.id !== id));
    } catch (error) {
      console.error("Erro ao excluir curso", error);
    }
  };

  const handleEdit = (course: Course) => {
    setEditCourse(course);
  };

  const handleSave = async () => {
    if (!editCourse) return;
    try {
      await api.put(`/courses/${editCourse.id}`, editCourse);
      setCourses(courses.map((c) => (c.id === editCourse.id ? editCourse : c)));
      setEditCourse(null);
    } catch (error) {
      console.error("Erro ao atualizar curso", error);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Cursos Disponíveis
      </Typography>
      <List>
        {courses.map((course) => (
          <ListItem key={course.id} divider>
            <ListItemText primary={course.name} secondary={course.description} />
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate(`/courses/${course.id}/students`)}
            >
              Ver Alunos
            </Button>
            <IconButton onClick={() => handleEdit(course)} aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => deleteCourse(course.id)} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Dialog open={!!editCourse} onClose={() => setEditCourse(null)}>
        <DialogTitle>Editar Curso</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome"
            fullWidth
            margin="dense"
            value={editCourse?.name || ""}
            onChange={(e) => setEditCourse((prev) => prev && { ...prev, name: e.target.value })}
          />
          <TextField
            label="Descrição"
            fullWidth
            margin="dense"
            value={editCourse?.description || ""}
            onChange={(e) => setEditCourse((prev) => prev && { ...prev, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditCourse(null)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CourseList;
