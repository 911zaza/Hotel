import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
} from '@mui/material';

export default function EvenementForm({ evenement, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(evenement || {
    nom_evenement: '',
    date_evenement: '',
    duree_evenement: '02:00:00',
    prix_evenement: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        name="nom_evenement"
        label="Nom de l'événement"
        fullWidth
        required
        value={formData.nom_evenement}
        onChange={handleChange}
      />
      <TextField
        name="date_evenement"
        label="Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        fullWidth
        required
        value={formData.date_evenement}
        onChange={handleChange}
      />
      <TextField
        name="duree_evenement"
        label="Durée (HH:MM:SS)"
        fullWidth
        value={formData.duree_evenement}
        onChange={handleChange}
        placeholder="02:00:00"
      />
      <TextField
        name="prix_evenement"
        label="Prix"
        type="number"
        inputProps={{ step: '0.01' }}
        fullWidth
        required
        value={formData.prix_evenement}
        onChange={handleChange}
      />
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
        <Button onClick={onCancel} variant="outlined">
          Annuler
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Enregistrer
        </Button>
      </Box>
    </Box>
  );
}
