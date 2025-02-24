import { useState } from "react";
import EnrollmentList from "../components/EnrollmentList";
import EnrollmentForm from "../components/EnrollmentForm";
import { Box, Typography } from "@mui/material";

const Enrollments = () => {
  const [refresh, setRefresh] = useState(false);

  const handleEnrollmentAdded = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Typography variant="h4">Cadastro de Matrículas</Typography>
      </Box>
      <EnrollmentForm onEnrollmentAdded={handleEnrollmentAdded} />
      <EnrollmentList refresh={refresh} />
    </div>
  );
};

export default Enrollments;