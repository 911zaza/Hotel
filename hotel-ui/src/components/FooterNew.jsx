import React from 'react';
import { Box, Container, Typography, Link, Grid, Divider } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: '#1a1a1a',
        color: '#d4af8f',
        py: 6,
        mt: 8,
        borderTop: '2px solid #b8860b',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* À propos */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ffd700', mb: 2 }}>
              À propos
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.8, color: '#d4af8f' }}>
              Grand Hotel est une destination prestigieuse offrant luxe, confort et gastronomie exceptionnelle. 
              Notre équipe s'engage à fournir un service de qualité supérieure.
            </Typography>
          </Grid>

          {/* Créateurs */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ffd700', mb: 2 }}>
              Créateurs
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: '#d4af8f' }}>
              <strong>Zakaria Laribi</strong>
            </Typography>
            <Typography
              variant="body2"
              component="a"
              href="mailto:z.laribi@esisa.ac.ma"
              sx={{
                display: 'block',
                mb: 2,
                color: '#ffd700',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              z.laribi@esisa.ac.ma
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: '#d4af8f' }}>
              <strong>Faycal Ouhannou</strong>
            </Typography>
            <Typography
              variant="body2"
              component="a"
              href="mailto:o.faycal@esisa.ac.ma"
              sx={{
                display: 'block',
                color: '#ffd700',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              o.faycal@esisa.ac.ma
            </Typography>
          </Grid>

          {/* Réseaux sociaux */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ffd700', mb: 2 }}>
              Réseaux sociaux
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', flexWrap: 'wrap' }}>
              <Link
                href="https://www.instagram.com/zakaria_laribi"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  color: '#ffd700',
                  textDecoration: 'none',
                  '&:hover': { color: '#ffed4e' },
                }}
              >
                <InstagramIcon sx={{ fontSize: 32, mb: 0.5 }} />
                <Typography variant="caption" sx={{ textAlign: 'center' }}>zakaria_laribi</Typography>
              </Link>
              <Link
                href="https://www.instagram.com/faycal_ouhannou/?utm_source=ig_web_button_share_sheet"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  color: '#ffd700',
                  textDecoration: 'none',
                  '&:hover': { color: '#ffed4e' },
                }}
              >
                <InstagramIcon sx={{ fontSize: 32, mb: 0.5 }} />
                <Typography variant="caption" sx={{ textAlign: 'center' }}>faycal_ouhannou</Typography>
              </Link>
            </Box>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ffd700', mb: 2 }}>
              Contact
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
              <EmailIcon sx={{ color: '#ffd700' }} />
              <Link
                href="mailto:info@grandhotel.com"
                sx={{
                  color: '#ffd700',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                info@grandhotel.com
              </Link>
            </Box>
            <Typography variant="body2" sx={{ color: '#d4af8f' }}>
              Tél: +212 5XX XXX XXX
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: '#b8860b' }} />

        {/* Copyright */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#d4af8f', mb: 1 }}>
            © 2026 <span style={{ color: '#ffd700', fontWeight: 'bold' }}>Grand Hotel</span> — Tous droits réservés
          </Typography>
          <Typography variant="caption" sx={{ color: '#999' }}>
            Développé avec passion par Zakaria Laribi et Faycal Ouhannou
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
