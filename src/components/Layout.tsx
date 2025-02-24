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
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import bussIcon from "../assets/buss.png";
import BackButton from "./BackButton"; 

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const showBackButton = location.pathname !== "/";

  const [welcomeOpen, setWelcomeOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setWelcomeOpen(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ width: "100%", overflowX: "hidden" }}>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar>
            <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
              <img
                src={bussIcon}
                alt="Logo"
                width="30"
                height="30"
                style={{ marginRight: 8 }}
              />
              <Typography variant="h6">ScholarHub</Typography>
            </Box>
            <IconButton
              color="inherit"
              aria-label="open menu"
              onClick={handleMenuOpen}
              sx={{
                display: { xs: "block", sm: "none" }, 
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: { xs: "none", sm: "flex" } }}>
              <Button color="inherit" component={NavLink} to="/">
                Cursos
              </Button>
              <Button color="inherit" component={NavLink} to="/students">
                Alunos
              </Button>
              <Button color="inherit" component={NavLink} to="/enrollments">
                Matrículas
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {showBackButton && <BackButton />}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        <MenuItem onClick={() => { navigate("/"); handleMenuClose(); }}>Cursos</MenuItem>
        <MenuItem onClick={() => { navigate("/students"); handleMenuClose(); }}>Alunos</MenuItem>
        <MenuItem onClick={() => { navigate("/enrollments"); handleMenuClose(); }}>Matrículas</MenuItem>
      </Menu>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
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
    </Box>
  );
};

export default Layout;
