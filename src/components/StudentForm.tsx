import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import api from "../services/api";

const StudentForm = ({ onStudentAdded }: { onStudentAdded: () => void }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name || !email || !dateOfBirth) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const response = await api.post("/students", {
        name,
        email,
        dateOfBirth,
      });
      console.log("Resposta da API:", response.data);
      alert("Aluno cadastrado com sucesso!");
      onStudentAdded();
      setName("");
      setEmail("");
      setDateOfBirth("");
    } catch (error) {
      console.error("Erro ao cadastrar aluno:", error);
      alert("Erro ao cadastrar aluno. Verifique o console para mais detalhes.");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", gap: 2, mb: 2 }}>
      <TextField
        label="Nome do Aluno"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="E-mail"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Data de Nascimento"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Cadastrar Aluno
      </Button>
    </Box>
  );
};

export default StudentForm;