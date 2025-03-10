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
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
      setStudents(
        students.map((s) => (s.id === editStudent.id ? editStudent : s))
      );
      setEditStudent(null);
    } catch (error) {
      console.error("Erro ao atualizar aluno", error);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Container  sx={{
      paddingTop: "35px"
    }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
        Alunos Cadastrados
      </Typography>
      <List>
        {students.map((student) => (
          <ListItem
            key={student.id}
            divider
            sx={{
              "@media (min-width: 320px) and (max-width: 425px)": {
                alignItems: "center",
                textAlign: "center",
                flexDirection: "column",
              },
            }}
          >
            <ListItemText
              primary={student.name}
              secondary={`${student.email} | ${new Date(
                student.dateOfBirth
              ).toLocaleDateString()}`}
            />
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate(`/students/${student.id}/courses`)}
            >
              Ver Cursos
            </Button>
            <Box
              sx={{
                "@media (min-width: 320px) and (max-width: 425px)": {
                  padding: "10%",
                },
              }}
            >
              <IconButton onClick={() => handleEdit(student)} aria-label="edit">
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => deleteStudent(student.id)}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
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
            onChange={(e) =>
              setEditStudent({ ...editStudent!, name: e.target.value })
            }
          />
          <TextField
            label="E-mail"
            fullWidth
            margin="dense"
            type="email"
            value={editStudent?.email || ""}
            onChange={(e) =>
              setEditStudent({ ...editStudent!, email: e.target.value })
            }
          />
          <TextField
            label="Data de Nascimento"
            fullWidth
            margin="dense"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={editStudent?.dateOfBirth || ""}
            onChange={(e) =>
              setEditStudent({ ...editStudent!, dateOfBirth: e.target.value })
            }
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
