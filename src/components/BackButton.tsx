import { useNavigate } from "react-router-dom";
import { Box, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 2, ml: 2 }}>
      <IconButton
        onClick={() => navigate(-1)}
        sx={{
          fontSize: "2rem",
          color: "#1976d2",
          backgroundColor: "rgba(25, 118, 210, 0.1)",
          borderRadius: "50%",
          padding: "8px",
          "&:hover": {
            backgroundColor: "rgba(25, 118, 210, 0.2)",
          },
        }}
      >
        <ArrowBackIcon />
      </IconButton>
    </Box>
  );
};

export default BackButton;
