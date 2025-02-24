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
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface Student {
  id: number;
  name: string;
  email: string;
  dateOfBirth: string;
}

interface StudentListProps {
  refresh: boolean;
}

const StudentList = ({ refresh }: StudentListProps) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [editStudent, setEditStudent] = useState<Student | null>(null);

  useEffect(() => {
    setLoading(true);
    api
      .get<Student[]>("/students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => console.error("Erro ao buscar alunos:", error))
      .finally(() => setLoading(false));
  }, [refresh]);

  const deleteStudent = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este aluno?")) return;
    try {
      await api.delete(`/students/${id}`);
      setStudents(students.filter((student) => student.id !== id));
    } catch (error) {
      console.error("Erro ao excluir aluno", error);
    }
  };

  const handleEdit = (student: Student) => {
    setEditStudent(student);
  };

  const handleSave = async () => {
    if (!editStudent) return;
    try {
      await api.put(`/students/${editStudent.id}`, editStudent);
      setStudents(students.map((s) => (s.id === editStudent.id ? editStudent : s)));
      setEditStudent(null);
    } catch (error) {
      console.error("Erro ao atualizar aluno", error);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Alunos Cadastrados
      </Typography>
      <List>
        {students.map((student) => (
          <ListItem key={student.id} divider>
            <ListItemText
              primary={
                <Link
                  to={`/students/${student.id}/courses`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {student.name}
                </Link>
              }
              secondary={`${student.email} | ${new Date(student.dateOfBirth).toLocaleDateString()}`}
            />
            <IconButton onClick={() => handleEdit(student)} aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => deleteStudent(student.id)} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Dialog open={!!editStudent} onClose={() => setEditStudent(null)}>
        <DialogTitle>Editar Aluno</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome"
            fullWidth
            margin="dense"
            value={editStudent?.name || ""}
            onChange={(e) => setEditStudent({ ...editStudent!, name: e.target.value })}
          />
          <TextField
            label="E-mail"
            fullWidth
            margin="dense"
            type="email"
            value={editStudent?.email || ""}
            onChange={(e) => setEditStudent({ ...editStudent!, email: e.target.value })}
          />
          <TextField
            label="Data de Nascimento"
            fullWidth
            margin="dense"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={editStudent?.dateOfBirth || ""}
            onChange={(e) => setEditStudent({ ...editStudent!, dateOfBirth: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditStudent(null)} color="secondary">
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

export default StudentList;
