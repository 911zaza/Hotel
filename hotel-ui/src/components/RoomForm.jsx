import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Grid,
  Alert,
  CircularProgress,
  Typography,
} from "@mui/material";
import { createRoom, updateRoom } from "../api/rooms";
import { uploadRoomImage } from "../api/images";

export default function RoomForm({ room, onSuccess, onCancel }) {
  const [form, setForm] = useState({
    room_number: "",
    room_type: "single",
    price_per_night: "",
    image_url: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (room) {
      setForm({
        room_number: room.room_number || "",
        room_type: room.room_type || "single",
        price_per_night: room.price_per_night || "",
        image_url: room.image_url || "",
      });
    }
  }, [room]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploadingImage(true);

    try {
      const res = await uploadRoomImage(file);
      const newImageUrl = res.data.image_url;
      setForm({ ...form, image_url: newImageUrl });
    } catch (err) {
      setError(
        err.response?.data?.detail
          ? Array.isArray(err.response.data.detail)
            ? err.response.data.detail.map((e) => e.msg).join(", ")
            : err.response.data.detail
          : err.message || "Erreur lors de l'upload de l'image"
      );
    } finally {
      setUploadingImage(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = {
        room_number: form.room_number,
        room_type: form.room_type,
        price_per_night: parseFloat(form.price_per_night),
        image_url: form.image_url || null,
      };

      if (room) {
        await updateRoom(room.id, data);
      } else {
        await createRoom(data);
      }

      setForm({ room_number: "", room_type: "single", price_per_night: "", image_url: "" });
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
            label="Numéro de chambre"
            name="room_number"
            value={form.room_number}
            onChange={handleChange}
            required
            inputProps={{ maxLength: 10 }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            label="Type de chambre"
            name="room_type"
            value={form.room_type}
            onChange={handleChange}
            required
          >
            <MenuItem value="single">Simple</MenuItem>
            <MenuItem value="double">Double</MenuItem>
            <MenuItem value="suite">Suite</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Prix par nuit (€)"
            name="price_per_night"
            type="number"
            value={form.price_per_night}
            onChange={handleChange}
            required
            inputProps={{ min: 0, step: 0.01 }}
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ border: "1px solid #ddd", borderRadius: 1, p: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Image de la chambre</Typography>
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
            {form.image_url && (
              <Box sx={{ mt: 2 }}>
                <Box
                  component="img"
                  src={form.image_url}
                  alt="Aperçu chambre"
                  sx={{ maxWidth: "100%", height: "auto", maxHeight: 200, borderRadius: 1 }}
                  onError={(e) => console.error("Image non valide:", e)}
                />
              </Box>
            )}
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}>
            {onCancel && (
              <Button variant="outlined" onClick={onCancel}>
                Annuler
              </Button>
            )}
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? "Enregistrement..." : room ? "Modifier" : "Ajouter"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

