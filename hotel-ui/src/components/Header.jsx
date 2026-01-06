import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Box, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/img/hotele-black-logo.png';
import { isAuthenticated, logout, isAdmin } from '../utils/auth';

export default function Header() {
  const navigate = useNavigate();
  const [header, setHeader] = useState(false);
  const navColor = header ? '#ffffff' : '#000000';

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
        background: header ? 'rgba(43, 43, 43, 0.9)' : 'transparent',
        backdropFilter: header ? 'blur(8px)' : 'none',
        boxShadow: header ? 2 : 'none',
        transition: 'background 0.35s ease, backdrop-filter 0.35s ease, box-shadow 0.35s ease',
        zIndex: 1000,
        WebkitBackdropFilter: header ? 'blur(8px)' : 'none',
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
              color: navColor,
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
              color: navColor,
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
              color: navColor,
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
                color: navColor,
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
                color: navColor,
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
                  color: navColor,
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
                  color: navColor,
                  backgroundColor: header ? 'transparent' : 'rgba(33, 150, 243, 0.8)',
                  textTransform: 'uppercase',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '8px 16px',
                  borderRadius: '4px',
                  '&:hover': {
                    backgroundColor: header ? 'rgba(255,255,255,0.06)' : '#1976D2',
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
                  color: navColor,
                  backgroundColor: header ? 'transparent' : 'rgba(33, 150, 243, 0.8)',
                  textTransform: 'uppercase',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '8px 16px',
                  borderRadius: '4px',
                  '&:hover': {
                    backgroundColor: header ? 'rgba(255,255,255,0.06)' : '#1976D2',
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
