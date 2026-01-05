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
import { getCurrentUser, logout } from "../api/auth";
import { updateClient } from "../api/clients";
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

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
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
    } catch {
      setError("Impossible de récupérer les informations utilisateur.");
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
      await updateClient(user.id, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
      });

      const refreshed = await getCurrentUser();
      setAuth({ token: localStorage.getItem("token"), user: refreshed.data });
      setUser(refreshed.data);
      setEditing(false);
      setSuccess("Profil mis à jour avec succès.");
    } catch (err) {
      setError(err.response?.data?.detail || "Échec de la mise à jour.");
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

      {/* UI unchanged */}
    </Container>
  );
}
