import { useState } from "react";
import { AxiosError } from "axios";
import { TextField, Button, Box, Container } from "@mui/material";
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
      await api.post("/students", {
        name,
        email,
        dateOfBirth,
      });
      alert("Aluno cadastrado com sucesso!");
      onStudentAdded();
      setName("");
      setEmail("");
      setDateOfBirth("");
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        alert(error.response.data);
      } else {
        alert(
          "Erro ao cadastrar aluno. Verifique o console para mais detalhes."
        );
      }
      console.error("Erro ao cadastrar aluno:", error);
    }
  };

  return (
    <Container>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mb: 2,
          "@media (min-width: 320px) and (max-width: 425px)": {
            flexDirection: "column",
          },
          "@media (min-width: 426px)": {
            flexDirection: "row",
            gap: 2,
            "& > *": {
              flex: 1,
            },
          },
        }}
      >
        <TextField
          label="Nome do Aluno"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Data de Nascimento"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          required
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Cadastrar Aluno
        </Button>
      </Box>
    </Container>
  );
};

export default StudentForm;
