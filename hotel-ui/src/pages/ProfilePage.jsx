import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Avatar,
  Grid,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout, updateCurrentUser } from "../api/auth";
import { uploadProfileImage } from "../api/images";
import fallbackAvatar from "../assets/img/hotele-black-logo.png";
import { setAuth } from "../utils/auth";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    url_image_user: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const formatError = (err) => {
    if (!err) return "";
    const detail = err?.response?.data?.detail ?? err?.response?.data ?? err?.message ?? err;
    try {
      if (Array.isArray(detail)) {
        return detail
          .map((d) => {
            if (!d) return "";
            if (typeof d === "string") return d;
            if (d.msg) return d.msg;
            if (d.message) return d.message;
            return JSON.stringify(d);
          })
          .filter(Boolean)
          .join("; ");
      }
      if (typeof detail === "object") {
        if (detail.message) return String(detail.message);
        return JSON.stringify(detail);
      }
      return String(detail);
    } catch (e) {
      return String(detail);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Token manquant. Veuillez vous reconnecter.');
        setLoading(false);
        return;
      }
      const res = await getCurrentUser();
      setUser(res.data);
      setForm({
        username: res.data.username || "",
        name: res.data.name || "",
        email: res.data.email || "",
        address: res.data.address || "",
        phone: res.data.phone || "",
        password: "",
        url_image_user: res.data.url_image_user || "",
      });
    } catch (err) {
      console.error('Erreur loadUser:', err);
      setError(formatError(err) || "Impossible de récupérer les informations utilisateur.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setSuccess("");
    setUploadingImage(true);

    try {
      const res = await uploadProfileImage(file);
      const newImageUrl = res.data.image_url;
      
      // Mettre à jour le formulaire avec la nouvelle URL
      setForm({ ...form, url_image_user: newImageUrl });
      setUser({ ...user, url_image_user: newImageUrl });
      
      setSuccess("Image de profil mise à jour avec succès!");
    } catch (err) {
      setError(formatError(err) || "Erreur lors de l'upload de l'image");
    } finally {
      setUploadingImage(false);
      // Réinitialiser l'input file
      e.target.value = "";
    }
  };

  const handleSave = async () => {
    setError("");
    setSuccess("");
    try {
      // Client-side validation to match backend DTO constraints
      if (!form.name || form.name.length < 2) {
        setError('Le nom doit contenir au moins 2 caractères.');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!form.email || !emailRegex.test(form.email)) {
        setError('Veuillez fournir un email valide.');
        return;
      }
      const phoneToSend = form.phone && form.phone.length > 0 ? form.phone : (user?.phone || '');
      if (!phoneToSend || phoneToSend.length < 8) {
        setError('Le téléphone doit contenir au moins 8 caractères.');
        return;
      }
      if (!form.address || form.address.length < 5) {
        setError('L\'adresse doit contenir au moins 5 caractères.');
        return;
      }

      await updateCurrentUser({
        name: form.name,
        email: form.email,
        phone: phoneToSend,
        address: form.address,
        url_image_user: form.url_image_user || null,
      });

      const refreshed = await getCurrentUser();
      setAuth({ token: localStorage.getItem("token"), user: refreshed.data });
      setUser(refreshed.data);
      setEditing(false);
      setSuccess("Profil mis à jour avec succès.");
    } catch (err) {
      console.error('Erreur handleSave:', err);
      setError(formatError(err) || "Échec de la mise à jour.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <Container sx={{ py: 6 }}>
        <Typography>Chargement...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Mon Profil
      </Typography>

      {success && <Alert severity="success">{success}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar
                sx={{ width: 88, height: 88 }}
                src={form.url_image_user || user?.url_image_user || fallbackAvatar}
                imgProps={{
                  onError: (e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = fallbackAvatar;
                  },
                }}
              >
                {(user?.name || user?.username || "").charAt(0)}
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h6">{user?.name || user?.username}</Typography>
              <Typography color="text.secondary">{user?.email}</Typography>
            </Grid>
            <Grid item>
              {!editing ? (
                <Button variant="contained" onClick={() => setEditing(true)}>Modifier</Button>
              ) : (
                <Button variant="outlined" onClick={() => { setEditing(false); setForm({
                  username: user.username || "",
                  name: user.name || "",
                  email: user.email || "",
                  address: user.address || "",
                  phone: user.phone || "",
                  password: "",
                  url_image_user: user.url_image_user || "",
                }); setError(''); setSuccess(''); }}>
                  Annuler
                </Button>
              )}
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Box component="form" noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Nom d'utilisateur" name="username" value={form.username} disabled />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Nom" name="name" value={form.name} onChange={handleChange} disabled={!editing} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Email" name="email" value={form.email} onChange={handleChange} disabled={!editing} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Téléphone" name="phone" value={form.phone} onChange={handleChange} disabled={!editing} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Adresse" name="address" value={form.address} onChange={handleChange} disabled={!editing} />
              </Grid>
              {editing && (
                <Grid item xs={12}>
                  <Box sx={{ border: "1px solid #ddd", borderRadius: 1, p: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>Photo de profil</Typography>
                    <Button
                      variant="outlined"
                      component="label"
                      disabled={uploadingImage}
                    >
                      {uploadingImage ? <CircularProgress size={24} /> : "Choisir une image"}
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                      />
                    </Button>
                    {form.url_image_user && (
                      <Box sx={{ mt: 2 }}>
                        <Box
                          component="img"
                          src={form.url_image_user}
                          alt="Aperçu profil"
                          sx={{ maxWidth: "100%", height: "auto", maxHeight: 200, borderRadius: 1 }}
                          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallbackAvatar; }}
                        />
                      </Box>
                    )}
                  </Box>
                </Grid>
              )}
              {editing && (
                <>
                  <Grid item xs={12} sm={6}>
                    <Button variant="contained" color="primary" onClick={handleSave}>Enregistrer</Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button variant="outlined" color="secondary" onClick={handleLogout}>Se déconnecter</Button>
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
