import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  TextField,
  Button,
  Divider,
  Alert,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../api/auth";
import { getUser, isAuthenticated } from "../utils/auth";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    if (!isAuthenticated()) {
      setLoading(false);
      return;
    }

    try {
      const response = await getCurrentUser();
      const userData = response.data;
      setUser(userData);
      setForm({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        address: userData.address || "",
      });
    } catch (err) {
      console.error("Error loading user:", err);
      // Si erreur, utiliser les données du localStorage
      const localUser = getUser();
      if (localUser) {
        setUser(localUser);
        setForm({
          name: localUser.name || "",
          email: localUser.email || "",
          phone: localUser.phone || "",
          address: localUser.address || "",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    // TODO: Implémenter la mise à jour du profil via API
    setUser({ ...user, ...form });
    setEditing(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleCancel = () => {
    setForm({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
    });
    setEditing(false);
  };

  if (!isAuthenticated()) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Card sx={{ boxShadow: 3, textAlign: "center", p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Vous n'êtes pas connecté
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Connectez-vous pour voir votre profil
          </Typography>
          <Button variant="contained" onClick={() => navigate("/login")}>
            Se connecter
          </Button>
        </Card>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Chargement...</Typography>
      </Container>
    );
  }

  const infoItems = [
    { icon: "👤", label: "Nom complet", field: "name" },
    { icon: "📧", label: "Email", field: "email" },
    { icon: "📞", label: "Téléphone", field: "phone" },
    { icon: "📍", label: "Adresse", field: "address" },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: "bold" }}>
        Mon Profil
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess(false)}>
          Profil mis à jour avec succès !
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Avatar Section */}
        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent sx={{ textAlign: "center", py: 4 }}>
              <Avatar
                sx={{
                  width: 150,
                  height: 150,
                  mx: "auto",
                  mb: 2,
                  bgcolor: "primary.main",
                  fontSize: "3rem",
                }}
              >
                {user?.name?.charAt(0) || user?.username?.charAt(0) || "U"}
              </Avatar>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                {user?.name || user?.username || "Utilisateur"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.email}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Rôle: {user?.role === "admin" ? "Administrateur" : "Client"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Information Section */}
        <Grid item xs={12} md={8}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h5" fontWeight="bold">
                  Informations Personnelles
                </Typography>
                {!editing ? (
                  <Button
                    variant="outlined"
                    onClick={() => setEditing(true)}
                  >
                    Modifier
                  </Button>
                ) : (
                  <Box>
                    <Button
                      variant="outlined"
                      onClick={handleCancel}
                      sx={{ mr: 2 }}
                    >
                      Annuler
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleSave}
                    >
                      Enregistrer
                    </Button>
                  </Box>
                )}
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                {infoItems.map((item) => (
                  <Grid item xs={12} key={item.field}>
                    <Box sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}>
                      <Box sx={{ mr: 2, mt: 1, fontSize: "1.5rem" }}>
                        {item.icon}
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          {item.label}
                        </Typography>
                        {editing ? (
                          <TextField
                            fullWidth
                            name={item.field}
                            value={form[item.field]}
                            onChange={handleChange}
                            variant="standard"
                            sx={{ mt: 0.5 }}
                            disabled={item.field === "email"} // Email ne peut pas être modifié
                          />
                        ) : (
                          <Typography variant="body1" sx={{ mt: 0.5 }}>
                            {user?.[item.field] || "-"}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
