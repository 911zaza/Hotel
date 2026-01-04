import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
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
} from "@mui/material";
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
  const [value, setValue] = React.useState(
    location.pathname === "/" ? 0 : location.pathname === "/clients" ? 0 : location.pathname === "/rooms" ? 1 : 2
  );

  React.useEffect(() => {
    if (location.pathname === "/") setValue(0);
    else if (location.pathname === "/clients") setValue(0);
    else if (location.pathname === "/rooms") setValue(1);
    else if (location.pathname === "/reservations") setValue(2);
  }, [location]);

  return (
    <Tabs
      value={value}
      onChange={(e, newValue) => setValue(newValue)}
      sx={{ borderBottom: 1, borderColor: "divider" }}
    >
      <Tab label="Clients" component={Link} to="/clients" />
      <Tab label="Chambres" component={Link} to="/rooms" />
      <Tab label="Réservations" component={Link} to="/reservations" />
    </Tabs>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                🏨 Gestion d'Hôtel
              </Typography>
            </Toolbar>
          </AppBar>
          <NavigationTabs />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Routes>
              <Route path="/" element={<Navigate to="/clients" replace />} />
              <Route path="/clients" element={<ClientsPage />} />
              <Route path="/rooms" element={<RoomsPage />} />
              <Route path="/reservations" element={<ReservationsPage />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
