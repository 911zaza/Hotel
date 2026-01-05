import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RoomsPage from './pages/RoomsPage';
import ClientsPage from './pages/ClientsPage';
import ReservationsPage from './pages/ReservationsPage';
import ExplorePage from './pages/ExplorePage';
import ProfilePage from './pages/ProfilePage';
import { isAuthenticated, isAdmin } from './utils/auth';

function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

function AdminRoute({ children }) {
  return isAuthenticated() && isAdmin() ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <Router>
      <Header />
      <Box component="main" sx={{ py: 6 }}>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/rooms" element={<AdminRoute><RoomsPage /></AdminRoute>} />
            <Route path="/clients" element={<AdminRoute><ClientsPage /></AdminRoute>} />
            <Route
              path="/reservations"
              element={<PrivateRoute><ReservationsPage /></PrivateRoute>}
            />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          </Routes>
        </Container>
      </Box>
      <Footer />
    </Router>
  );
}
