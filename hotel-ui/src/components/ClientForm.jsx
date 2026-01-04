import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Grid,
  Alert,
} from "@mui/material";
import { createClient, updateClient } from "../api/clients";

export default function ClientForm({ client, onSuccess, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (client) {
      setForm({
        name: client.name || "",
        email: client.email || "",
        phone: client.phone || "",
        address: client.address || "",
      });
    }
  }, [client]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (client) {
        await updateClient(client.id, form);
      } else {
        await createClient(form);
      }

      setForm({ name: "", email: "", phone: "", address: "" });
      onSuccess();
    } catch (err) {
      setError(
        err.response?.data?.detail
          ? Array.isArray(err.response.data.detail)
            ? err.response.data.detail.map((e) => e.msg).join(", ")
            : err.response.data.detail
          : err.message || "Erreur lors de l'enregistrement"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nom"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            inputProps={{ minLength: 2, maxLength: 50 }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Téléphone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            inputProps={{ minLength: 8, maxLength: 15 }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Adresse"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            multiline
            rows={2}
            inputProps={{ minLength: 5, maxLength: 100 }}
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}>
            {onCancel && (
              <Button variant="outlined" onClick={onCancel}>
                Annuler
              </Button>
            )}
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? "Enregistrement..." : client ? "Modifier" : "Ajouter"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
