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
  Chip,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttendanceIcon from '@mui/icons-material/Groups';
import { getEvenements, createEvenement, updateEvenement, deleteEvenement, uploadEvenementImage } from '../api/evenements';
import { isAdmin, getUser } from '../utils/auth';

export default function EvenementPage() {
  const [evenements, setEvenements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEvenement, setEditingEvenement] = useState(null);
  const currentUser = getUser();

  const [formData, setFormData] = useState({
    nom_evenement: '',
    date_evenement: '',
    duree_evenement: '02:00:00',
    prix_evenement: '',
    evenement_url: null,
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    loadEvenements();
  }, []);

  const loadEvenements = async () => {
    try {
      setLoading(true);
      const response = await getEvenements();
      setEvenements(response.data);
      setError('');
    } catch (err) {
      setError('Erreur lors du chargement des événements');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (evenement = null) => {
    if (evenement) {
      setEditingEvenement(evenement);
      setFormData({
        nom_evenement: evenement.nom_evenement,
        date_evenement: evenement.date_evenement.split('T')[0],
        duree_evenement: evenement.duree_evenement || '02:00:00',
        prix_evenement: evenement.prix_evenement,
        evenement_url: evenement.evenement_url || null,
      });
    } else {
      setEditingEvenement(null);
      setFormData({
        nom_evenement: '',
        date_evenement: '',
        duree_evenement: '02:00:00',
        prix_evenement: '',
        evenement_url: null,
      });
    }
    setDialogOpen(true);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const res = await uploadEvenementImage(file);
      const imageUrl = res.data.image_url;
      setFormData({ ...formData, evenement_url: imageUrl });
      setError('');
    } catch (err) {
      setError('Erreur lors de l\'upload de l\'image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingEvenement(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveEvenement = async () => {
    try {
      if (editingEvenement) {
        await updateEvenement(editingEvenement.id_evenement, formData);
      } else {
        await createEvenement(formData);
      }
      loadEvenements();
      handleCloseDialog();
    } catch (err) {
      setError('Erreur lors de la sauvegarde de l\'événement');
    }
  };

  const handleDeleteEvenement = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      try {
        await deleteEvenement(id);
        loadEvenements();
      } catch (err) {
        setError('Erreur lors de la suppression de l\'événement');
      }
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
        <Typography variant="h3" component="h1" className="page-title">
          🎉 Événements
        </Typography>
        {isAdmin() && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenDialog()}
          >
            Ajouter un événement
          </Button>
        )}
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Grid container spacing={3}>
        {evenements.map((evenement) => (
          <Grid item xs={12} sm={6} md={4} key={evenement.id_evenement}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {evenement.evenement_url ? (
                <CardMedia
                  component="img"
                  image={evenement.evenement_url}
                  alt={evenement.nom_evenement}
                  sx={{ height: 200, objectFit: 'cover' }}
                />
              ) : (
                <CardMedia
                  sx={{
                    height: 200,
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 60,
                  }}
                >
                  🎊
                </CardMedia>
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {evenement.nom_evenement}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  <Chip
                    icon={<CalendarMonthIcon />}
                    label={new Date(evenement.date_evenement).toLocaleDateString('fr-FR')}
                    size="small"
                    variant="outlined"
                  />
                  {evenement.duree_evenement && (
                    <Chip
                      icon={<AccessTimeIcon />}
                      label={evenement.duree_evenement}
                      size="small"
                      variant="outlined"
                    />
                  )}
                </Box>

                <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold', mb: 2 }}>
                  {evenement.prix_evenement}€
                </Typography>

                <Typography variant="body2" color="textSecondary">
                  Créé le: {new Date(evenement.created_at).toLocaleDateString('fr-FR')}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ flex: 1 }}
                >
                  Réserver
                </Button>
                {isAdmin() && (
                  <>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleOpenDialog(evenement)}
                      sx={{ flex: 1 }}
                    >
                      Modifier
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteEvenement(evenement.id_evenement)}
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

      {/* Dialog Ajouter/Modifier Événement */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingEvenement ? 'Modifier l\'événement' : 'Ajouter un nouvel événement'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            name="nom_evenement"
            label="Nom de l'événement"
            fullWidth
            value={formData.nom_evenement}
            onChange={handleFormChange}
          />
          <TextField
            name="date_evenement"
            label="Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={formData.date_evenement}
            onChange={handleFormChange}
          />
          <TextField
            name="duree_evenement"
            label="Durée (HH:MM:SS)"
            fullWidth
            value={formData.duree_evenement}
            onChange={handleFormChange}
            placeholder="02:00:00"
          />
          <TextField
            name="prix_evenement"
            label="Prix"
            type="number"
            inputProps={{ step: '0.01' }}
            fullWidth
            value={formData.prix_evenement}
            onChange={handleFormChange}
          />
          <Box>
            <input
              accept="image/*"
              id="evenement-image-input"
              type="file"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <label htmlFor="evenement-image-input">
              <Button component="span" variant="outlined" size="small">
                {uploadingImage ? 'Uploading...' : 'Téléverser une image'}
              </Button>
            </label>
            {formData.evenement_url && (
              <Box sx={{ mt: 1 }}>
                <img src={formData.evenement_url} alt="preview" style={{ width: '100%', maxHeight: 200, objectFit: 'cover' }} />
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button onClick={handleSaveEvenement} variant="contained" color="primary">
            {editingEvenement ? 'Modifier' : 'Ajouter'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
