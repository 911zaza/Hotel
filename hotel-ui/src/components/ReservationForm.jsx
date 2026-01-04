import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Grid,
  Alert,
  MenuItem,
} from "@mui/material";
import { createReservation, checkAvailability } from "../api/reservations";
import { getClients } from "../api/clients";
import { getRooms } from "../api/rooms";

export default function ReservationForm({ onSuccess, onCancel }) {
  const [form, setForm] = useState({
    client_id: "",
    room_id: "",
    check_in: "",
    check_out: "",
  });
  const [clients, setClients] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [availabilityMessage, setAvailabilityMessage] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [clientsRes, roomsRes] = await Promise.all([getClients(), getRooms()]);
        setClients(clientsRes.data);
        setRooms(roomsRes.data.filter((r) => r.is_available));
      } catch (err) {
        setError("Erreur lors du chargement des données");
      }
    };
    loadData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setAvailabilityMessage("");
  };

  const handleCheckAvailability = async () => {
    if (!form.room_id || !form.check_in || !form.check_out) {
      setAvailabilityMessage("Veuillez remplir tous les champs pour vérifier la disponibilité");
      return;
    }

    try {
      const res = await checkAvailability(form.room_id, form.check_in, form.check_out);
      setAvailabilityMessage(
        res.data.available
          ? "✓ Chambre disponible pour ces dates"
          : "✗ Chambre non disponible pour ces dates"
      );
    } catch (err) {
      setAvailabilityMessage("Erreur lors de la vérification de disponibilité");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Convert datetime-local format (YYYY-MM-DDTHH:mm) to ISO format
      const formatToISO = (datetimeLocal) => {
        if (!datetimeLocal) return "";
        // Add seconds and timezone if not present
        return datetimeLocal.includes(":") && datetimeLocal.split(":").length === 2
          ? `${datetimeLocal}:00`
          : datetimeLocal;
      };

      const data = {
        client_id: parseInt(form.client_id),
        room_id: parseInt(form.room_id),
        check_in: formatToISO(form.check_in),
        check_out: formatToISO(form.check_out),
      };

      await createReservation(data);
      setForm({ client_id: "", room_id: "", check_in: "", check_out: "" });
      onSuccess();
    } catch (err) {
      setError(
        err.response?.data?.detail
          ? Array.isArray(err.response.data.detail)
            ? err.response.data.detail.map((e) => e.msg).join(", ")
            : err.response.data.detail
          : err.message || "Erreur lors de la création de la réservation"
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

      {availabilityMessage && (
        <Alert
          severity={availabilityMessage.includes("✓") ? "success" : "warning"}
          sx={{ mb: 2 }}
        >
          {availabilityMessage}
        </Alert>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            label="Client"
            name="client_id"
            value={form.client_id}
            onChange={handleChange}
            required
          >
            {clients.map((client) => (
              <MenuItem key={client.id} value={client.id}>
                {client.name} - {client.email}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            label="Chambre"
            name="room_id"
            value={form.room_id}
            onChange={handleChange}
            required
          >
            {rooms.map((room) => (
              <MenuItem key={room.id} value={room.id}>
                Chambre {room.room_number} ({room.room_type}) - {room.price_per_night.toFixed(2)}€/nuit
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Date d'arrivée"
            name="check_in"
            type="datetime-local"
            value={form.check_in}
            onChange={handleChange}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Date de départ"
            name="check_out"
            type="datetime-local"
            value={form.check_out}
            onChange={handleChange}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="outlined"
            onClick={handleCheckAvailability}
            disabled={!form.room_id || !form.check_in || !form.check_out}
            fullWidth
          >
            Vérifier la disponibilité
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}>
            {onCancel && (
              <Button variant="outlined" onClick={onCancel}>
                Annuler
              </Button>
            )}
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? "Création..." : "Créer la réservation"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

