import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

export default function PlatForm({ plat, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(plat || {
    nom_plat: '',
    type_plat: '',
    prix_plat: '',
    ingredient_plat: '',
    disponibilite: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        name="nom_plat"
        label="Nom du plat"
        fullWidth
        required
        value={formData.nom_plat}
        onChange={handleChange}
      />
      <TextField
        name="type_plat"
        label="Type de plat"
        fullWidth
        required
        value={formData.type_plat}
        onChange={handleChange}
      />
      <TextField
        name="prix_plat"
        label="Prix"
        type="number"
        inputProps={{ step: '0.01' }}
        fullWidth
        required
        value={formData.prix_plat}
        onChange={handleChange}
      />
      <TextField
        name="ingredient_plat"
        label="Ingrédients"
        fullWidth
        multiline
        rows={3}
        required
        value={formData.ingredient_plat}
        onChange={handleChange}
      />
      <FormControlLabel
        control={
          <Checkbox
            name="disponibilite"
            checked={formData.disponibilite}
            onChange={handleChange}
          />
        }
        label="Disponible"
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
