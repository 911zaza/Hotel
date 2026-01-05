import React from 'react';
import { Box, Container, Typography, Button, Grid, Paper, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import hero from '../assets/logo.svg';

export default function HomePage() {
  const features = [
    { icon: '🛏️', title: 'Chambres Confortables', description: 'Profitez de nos chambres élégantes et confortables.' },
    { icon: '🍽️', title: 'Restaurant', description: "Cuisine locale et internationale d'exception." },
    { icon: '🏊', title: 'Piscine & Spa', description: 'Détendez-vous après une journée bien remplie.' },
    { icon: '📶', title: 'Wi-Fi Gratuit', description: "Connexion haut débit dans tout l'hôtel." },
  ];

  return (
    <>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              Bienvenue au Grand Hotel
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Découvrez nos chambres élégantes, réservez facilement et profitez d'un séjour inoubliable.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button component={Link} to="/rooms" variant="contained">Voir les chambres</Button>
              <Button component={Link} to="/explore" variant="outlined">Explorer</Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <img src={hero} alt="hero" style={{ maxWidth: '320px', width: '100%' }} />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Container sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 6 }}>
          Nos Services
        </Typography>
        <Grid container spacing={4}>
          {features.map((f, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card sx={{ height: '100%', textAlign: 'center', boxShadow: 3 }}>
                <CardContent>
                  <Box sx={{ mb: 2, fontSize: '2.4rem' }}>{f.icon}</Box>
                  <Typography variant="h6" gutterBottom>{f.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{f.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ bgcolor: '#fafafa', py: 8 }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box component="img" src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800" alt="hotel" sx={{ width: '100%', height: 400, objectFit: 'cover', borderRadius: 2 }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>Un Séjour Inoubliable</Typography>
              <Typography variant="body1" paragraph>
                Notre hôtel allie tradition et modernité pour vous offrir une expérience unique.
              </Typography>
              <Button variant="outlined" size="large" component={Link} to="/explore">En savoir plus</Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

