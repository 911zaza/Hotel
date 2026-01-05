import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { isAuthenticated, logout, isAdmin } from '../utils/auth';

export default function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
      <Toolbar sx={{ display: 'flex', gap: 2 }}>
        <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src={logo} alt="logo" style={{ height: 40 }} />
        </Box>
        <Box sx={{ flex: 1 }} />
        <Box sx={{ display: 'flex', gap: 1 }}>
          {isAdmin() && <Button component={Link} to="/rooms" color="inherit">Chambres</Button>}
          <Button component={Link} to="/explore" color="inherit">Explorer</Button>
          {isAdmin() && (
            <Button component={Link} to="/clients" color="inherit">Clients</Button>
          )}
        </Box>
        <Box sx={{ ml: 2 }}>
          {isAuthenticated() ? (
            <Button onClick={handleLogout} variant="outlined">Déconnexion</Button>
          ) : (
            <Button component={Link} to="/login" variant="contained">Se connecter</Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
