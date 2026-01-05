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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout, updateCurrentUser } from "../api/auth";
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
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

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
              <Avatar sx={{ width: 72, height: 72 }}>{(user?.name || user?.username || "").charAt(0)}</Avatar>
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
