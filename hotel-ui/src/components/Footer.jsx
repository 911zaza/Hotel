import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ mt: 6, py: 4, textAlign: 'center', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
      <Typography variant="body2" color="text.secondary">© {new Date().getFullYear()} Grand Hotel — Tous droits réservés</Typography>
    </Box>
  );
}
