import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Box, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { isAuthenticated, logout, isAdmin } from '../utils/auth';

export default function Header() {
  const navigate = useNavigate();
  const [header, setHeader] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const handleScroll = () => {
      setHeader(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        background: header ? 'rgba(255, 255, 255, 0.98)' : 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        boxShadow: header ? 2 : 'none',
        transition: 'all 0.3s ease-in-out',
        zIndex: 1000,
      }}
    >
      <Toolbar sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
        <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src={logo} alt="logo" style={{ height: 40 }} />
        </Box>

        <Box sx={{ display: 'flex', gap: 3, flex: 1, justifyContent: 'center' }}>
          <Button
            component={Link}
            to="/explore"
            sx={{
              color: header ? '#000' : '#fff',
              textTransform: 'uppercase',
              fontSize: '0.875rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              '&:hover': {
                color: '#2196F3',
                backgroundColor: 'transparent',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Chambres
          </Button>
          <Button
            component={Link}
            to="/restaurant"
            sx={{
              color: header ? '#000' : '#fff',
              textTransform: 'uppercase',
              fontSize: '0.875rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              '&:hover': {
                color: '#2196F3',
                backgroundColor: 'transparent',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Restaurant
          </Button>
          <Button
            component={Link}
            to="/evenements"
            sx={{
              color: header ? '#000' : '#fff',
              textTransform: 'uppercase',
              fontSize: '0.875rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              '&:hover': {
                color: '#2196F3',
                backgroundColor: 'transparent',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Événements
          </Button>
          {isAdmin() && (
            <Button
              component={Link}
              to="/rooms"
              sx={{
                color: header ? '#000' : '#fff',
                textTransform: 'uppercase',
                fontSize: '0.875rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                '&:hover': {
                  color: '#2196F3',
                  backgroundColor: 'transparent',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Gestion
            </Button>
          )}
        </Box>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {isAuthenticated() && isAdmin() && (
            <Button
              component={Link}
              to="/reservations"
              sx={{
                color: header ? '#000' : '#fff',
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                fontWeight: 600,
                '&:hover': {
                  color: '#2196F3',
                  backgroundColor: 'transparent',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Réservations
            </Button>
          )}
          {isAuthenticated() && (
            <Button
              component={Link}
              to="/profile"
              sx={{
                color: header ? '#000' : '#fff',
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                fontWeight: 600,
                '&:hover': {
                  color: '#2196F3',
                  backgroundColor: 'transparent',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Profil
            </Button>
          )}
          {isAuthenticated() ? (
            <Button
              onClick={handleLogout}
              sx={{
                color: header ? '#fff' : '#fff',
                backgroundColor: header ? '#2196F3' : 'rgba(33, 150, 243, 0.8)',
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '8px 16px',
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: '#1976D2',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Déconnexion
            </Button>
          ) : (
            <Button
              component={Link}
              to="/login"
              sx={{
                color: '#fff',
                backgroundColor: header ? '#2196F3' : 'rgba(33, 150, 243, 0.8)',
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '8px 16px',
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: '#1976D2',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Se connecter
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
