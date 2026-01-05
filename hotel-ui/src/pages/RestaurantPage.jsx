import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
} from '@mui/material';
import { getPlats, createPlat, updatePlat, deletePlat } from '../api/plats';
import { createCommande, getCommandesByClient } from '../api/commandes';
import { getUser, isAdmin } from '../utils/auth';
import { generateCommandePDF } from '../api/pdfGenerator';

export default function RestaurantPage() {
  const [plats, setPlats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [commandeDialogOpen, setCommandeDialogOpen] = useState(false);
  const [editingPlat, setEditingPlat] = useState(null);
  const [selectedPlat, setSelectedPlat] = useState(null);
  const currentUser = getUser();

  // Form state for plat creation/update
  const [formData, setFormData] = useState({
    nom_plat: '',
    type_plat: '',
    prix_plat: '',
    ingredient_plat: '',
    disponibilite: true,
  });

  // Form state for commande
  const [commandeForm, setCommandeForm] = useState({
    nb_deplat: 1,
    date_a_manger: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    loadPlats();
  }, []);

  const loadPlats = async () => {
    try {
      setLoading(true);
      const response = await getPlats();
      setPlats(response.data);
      setError('');
    } catch (err) {
      setError('Erreur lors du chargement des plats');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (plat = null) => {
    if (plat) {
      setEditingPlat(plat);
      setFormData(plat);
    } else {
      setEditingPlat(null);
      setFormData({
        nom_plat: '',
        type_plat: '',
        prix_plat: '',
        ingredient_plat: '',
        disponibilite: true,
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingPlat(null);
  };

  const handleOpenCommandeDialog = (plat) => {
    setSelectedPlat(plat);
    setCommandeForm({
      nb_deplat: 1,
      date_a_manger: new Date().toISOString().split('T')[0],
    });
    setCommandeDialogOpen(true);
  };

  const handleCloseCommandeDialog = () => {
    setCommandeDialogOpen(false);
    setSelectedPlat(null);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleCommandeFormChange = (e) => {
    const { name, value } = e.target;
    setCommandeForm({
      ...commandeForm,
      [name]: value,
    });
  };

  const handleSavePlat = async () => {
    try {
      if (editingPlat) {
        await updatePlat(editingPlat.id, formData);
      } else {
        await createPlat(formData);
      }
      loadPlats();
      handleCloseDialog();
    } catch (err) {
      setError('Erreur lors de la sauvegarde du plat');
    }
  };

  const handleDeletePlat = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce plat ?')) {
      try {
        await deletePlat(id);
        loadPlats();
      } catch (err) {
        setError('Erreur lors de la suppression du plat');
      }
    }
  };

  const handleCreateCommande = async () => {
    try {
      const commandeData = {
        id_client: currentUser.id,
        id_plat: selectedPlat.id,
        nom_plat: selectedPlat.nom_plat,
        nb_deplat: parseInt(commandeForm.nb_deplat),
        date_commande: new Date().toISOString().split('T')[0],
        date_a_manger: commandeForm.date_a_manger,
      };

      const response = await createCommande(commandeData);
      
      // Générer le PDF
      generateCommandePDF(
        response.data,
        selectedPlat,
        currentUser
      );

      setError('');
      handleCloseCommandeDialog();
      alert('Commande confirmée! PDF généré.');
    } catch (err) {
      setError('Erreur lors de la création de la commande');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
          🍽️ Restaurant
        </Typography>
        {isAdmin() && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenDialog()}
          >
            Ajouter un plat
          </Button>
        )}
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Grid container spacing={3}>
        {plats.map((plat) => (
          <Grid item xs={12} sm={6} md={4} key={plat.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                sx={{
                  height: 200,
                  backgroundColor: '#f5f5f5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 40,
                }}
              >
                🍲
              </CardMedia>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {plat.nom_plat}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  <strong>Type:</strong> {plat.type_plat}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  <strong>Ingrédients:</strong> {plat.ingredient_plat}
                </Typography>
                <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold', mb: 2 }}>
                  {plat.prix_plat}€
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: plat.disponibilite ? 'green' : 'red',
                    fontWeight: 'bold',
                    mb: 2,
                  }}
                >
                  {plat.disponibilite ? '✓ Disponible' : '✗ Non disponible'}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {plat.disponibilite && (
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleOpenCommandeDialog(plat)}
                    sx={{ flex: 1 }}
                  >
                    Commander
                  </Button>
                )}
                {isAdmin() && (
                  <>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleOpenDialog(plat)}
                      sx={{ flex: 1 }}
                    >
                      Modifier
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDeletePlat(plat.id)}
                      sx={{ flex: 1 }}
                    >
                      Supprimer
                    </Button>
                  </>
                )}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog Ajouter/Modifier Plat */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingPlat ? 'Modifier le plat' : 'Ajouter un nouveau plat'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            name="nom_plat"
            label="Nom du plat"
            fullWidth
            value={formData.nom_plat}
            onChange={handleFormChange}
          />
          <TextField
            name="type_plat"
            label="Type de plat"
            fullWidth
            value={formData.type_plat}
            onChange={handleFormChange}
          />
          <TextField
            name="prix_plat"
            label="Prix"
            type="number"
            inputProps={{ step: '0.01' }}
            fullWidth
            value={formData.prix_plat}
            onChange={handleFormChange}
          />
          <TextField
            name="ingredient_plat"
            label="Ingrédients"
            fullWidth
            multiline
            rows={3}
            value={formData.ingredient_plat}
            onChange={handleFormChange}
          />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              name="disponibilite"
              checked={formData.disponibilite}
              onChange={handleFormChange}
              style={{ marginRight: 10 }}
            />
            <Typography>Disponible</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button onClick={handleSavePlat} variant="contained" color="primary">
            {editingPlat ? 'Modifier' : 'Ajouter'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Commande */}
      <Dialog open={commandeDialogOpen} onClose={handleCloseCommandeDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Commander: {selectedPlat?.nom_plat}</DialogTitle>
        <DialogContent sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <Typography variant="body2" color="textSecondary">
              <strong>Prix unitaire:</strong> {selectedPlat?.prix_plat}€
            </Typography>
          </Box>
          <TextField
            name="nb_deplat"
            label="Quantité"
            type="number"
            inputProps={{ min: 1 }}
            fullWidth
            value={commandeForm.nb_deplat}
            onChange={handleCommandeFormChange}
          />
          <Box>
            <Typography variant="body2" color="textSecondary">
              <strong>Total:</strong> {(selectedPlat?.prix_plat * commandeForm.nb_deplat).toFixed(2)}€
            </Typography>
          </Box>
          <TextField
            name="date_a_manger"
            label="Date du repas"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={commandeForm.date_a_manger}
            onChange={handleCommandeFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCommandeDialog}>Annuler</Button>
          <Button onClick={handleCreateCommande} variant="contained" color="primary">
            Confirmer & Télécharger PDF
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
