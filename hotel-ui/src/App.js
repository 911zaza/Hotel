import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Tabs,
  Tab,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Button,
  Menu,
  MenuItem,
  Avatar,
  IconButton,
} from "@mui/material";
// Using emoji instead of icon
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ExplorePage from "./pages/ExplorePage";
import ClientsPage from "./pages/ClientsPage";
import RoomsPage from "./pages/RoomsPage";
import ReservationsPage from "./pages/ReservationsPage";
import "./App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

function NavigationTabs() {
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // Récupérer l'utilisateur connecté
  const getUser = () => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  };

  const user = getUser();
  const isAdmin = user?.role === "admin";

  const getTabValue = () => {
    const path = location.pathname;
    if (path === "/" || path === "/home") return 0;
    if (path === "/explore") return 1;
    if (isAdmin) {
      if (path === "/clients") return 2;
      if (path === "/rooms") return 3;
      if (path === "/reservations") return 4;
    } else {
      if (path === "/reservations") return 2;
    }
    return false;
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    handleMenuClose();
    navigate("/login");
  };

  return (
    <Box sx={{ position: "relative", bgcolor: "background.paper" }}>
      <Tabs
        value={getTabValue()}
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tab label="Accueil" component={Link} to="/home" />
        <Tab label="Explorer" component={Link} to="/explore" />
        {isAdmin && <Tab label="Clients" component={Link} to="/clients" />}
        {isAdmin && <Tab label="Chambres" component={Link} to="/rooms" />}
        <Tab label={isAdmin ? "Réservations" : "Mes Réservations"} component={Link} to="/reservations" />
      </Tabs>
      <Box sx={{ position: "absolute", right: 16, top: 12, zIndex: 1 }}>
        <IconButton
          size="large"
          edge="end"
          aria-label="account menu"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          onClick={handleMenuOpen}
          sx={{ fontSize: "1.8rem", color: "text.primary" }}
        >
          👤
        </IconButton>
        <Menu
          id="account-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          MenuListProps={{
            "aria-labelledby": "account-button",
          }}
        >
          <MenuItem onClick={() => handleMenuClick("/profile")}>Mon Profil</MenuItem>
          {user ? (
            <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
          ) : (
            <MenuItem onClick={() => handleMenuClick("/login")}>Connexion</MenuItem>
          )}
        </Menu>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{ bgcolor: "#1a1a1a" }}>
            <Toolbar>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, fontWeight: "bold", cursor: "pointer" }}
                onClick={() => window.location.href = "/home"}
              >
                🏨 Grand Hotel
              </Typography>
            </Toolbar>
          </AppBar>
          <Box sx={{ position: "relative" }}>
            <NavigationTabs />
          </Box>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/reservations" element={<ReservationsPage />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
