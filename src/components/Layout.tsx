import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import bussIcon from "../assets/buss.png";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const showBackButton = location.pathname !== "/";

  const [welcomeOpen, setWelcomeOpen] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setWelcomeOpen(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
            <img src={bussIcon} alt="Logo" width="30" height="30" style={{ marginRight: 8 }} />
            <Typography variant="h6">ScholarHub</Typography>
          </Box>

          {showBackButton && (
            <Button color="inherit" startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
              Voltar
            </Button>
          )}

          <Button color="inherit" component={NavLink} to="/">
            Cursos
          </Button>
          <Button color="inherit" component={NavLink} to="/students">
            Alunos
          </Button>
          <Button color="inherit" component={NavLink} to="/enrollments">
            Matrículas
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Outlet />
      </Container>

      <Dialog open={welcomeOpen} onClose={() => setWelcomeOpen(false)}>
        <DialogTitle>Bem-vindo ao ScholarHub! 🎉</DialogTitle>
        <DialogContent>
          <Typography>
            Explore nossa plataforma para gerenciar cursos, alunos e matrículas de forma simples e eficiente!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setWelcomeOpen(false)} color="primary" variant="contained">
            Começar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Layout;
