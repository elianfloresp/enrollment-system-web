import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import api from "../services/api";

const CourseForm = ({ onCourseAdded }: { onCourseAdded: () => void }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name || !description) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      await api.post("/courses", {
        name,
        description,
      });
      alert("Curso cadastrado com sucesso!");
      onCourseAdded();
      setName("");
      setDescription("");
    } catch (error) {
      console.error("Erro ao cadastrar curso:", error);
      alert("Erro ao cadastrar curso. Verifique o console para mais detalhes.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "row", 
        gap: 2,
        mb: 2,
        "@media (max-width: 425px)": {
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center", 
        },
      }}
    >
      <TextField
        label="Nome do Curso"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        sx={{ width: { xs: "100%", sm: "auto" } }} 
      />
      <TextField
        label="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        sx={{ width: { xs: "100%", sm: "auto" } }} 
      />
      <Button type="submit" variant="contained" color="primary">
        Cadastrar Curso
      </Button>
    </Box>
  );
};

export default CourseForm;
