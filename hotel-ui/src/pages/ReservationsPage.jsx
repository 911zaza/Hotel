import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Alert,
  Container,
} from "@mui/material";
// Icons will be replaced with text for now - install @mui/icons-material to use icons
import { getReservations, cancelReservation } from "../api/reservations";
import { getRooms } from "../api/rooms";
import { getCurrentUser } from "../api/auth";
import ReservationForm from "../components/ReservationForm";
import { generateReservationPDF } from "../api/pdfGenerator";

export default function ReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [rooms, setRooms] = useState({});
  const [currentUser, setCurrentUser] = useState(null);

  const loadReservations = async () => {
    try {
      setLoading(true);
      const res = await getReservations();
      setReservations(res.data);
      setError("");
    } catch (err) {
      setError("Erreur lors du chargement des réservations: " + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReservations();
    loadRooms();
    loadCurrentUser();
  }, []);

  const loadRooms = async () => {
    try {
      const res = await getRooms();
      const roomsMap = {};
      res.data.forEach(room => {
        roomsMap[room.id] = room;
      });
      setRooms(roomsMap);
    } catch (err) {
      console.error("Erreur lors du chargement des chambres");
    }
  };

  const loadCurrentUser = async () => {
    try {
      const res = await getCurrentUser();
      setCurrentUser(res.data);
    } catch (err) {
      console.error("Erreur lors du chargement de l'utilisateur");
    }
  };

  const handleCancel = async (reservationId, clientId) => {
    if (window.confirm("Êtes-vous sûr de vouloir annuler cette réservation ?")) {
      try {
        await cancelReservation(reservationId, clientId);
        loadReservations();
      } catch (err) {
        setError("Erreur lors de l'annulation: " + (err.response?.data?.detail || err.message));
      }
    }
  };

  const handleDownloadPDF = (reservation) => {
    const room = rooms[reservation.room_id];
    if (room && currentUser) {
      generateReservationPDF(reservation, currentUser, room);
    }
  };

  const handleAdd = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSuccess = () => {
    handleCloseDialog();
    loadReservations();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" component="h1">
          Gestion des Réservations
        </Typography>
        <Button
          variant="contained"
          onClick={handleAdd}
          sx={{ mb: 2 }}
        >
          + Nouvelle réservation
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Typography>Chargement...</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>ID Client</TableCell>
                <TableCell>ID Chambre</TableCell>
                <TableCell>Date d'arrivée</TableCell>
                <TableCell>Date de départ</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Aucune réservation trouvée
                  </TableCell>
                </TableRow>
              ) : (
                reservations.map((reservation) => (
                  <TableRow key={reservation.id} hover>
                    <TableCell>{reservation.id}</TableCell>
                    <TableCell>{reservation.client_id}</TableCell>
                    <TableCell>{reservation.room_id}</TableCell>
                    <TableCell>{formatDate(reservation.check_in)}</TableCell>
                    <TableCell>{formatDate(reservation.check_out)}</TableCell>
                    <TableCell align="right">
                      <Button
                        color="primary"
                        onClick={() => handleDownloadPDF(reservation)}
                        size="small"
                        variant="contained"
                        sx={{ mr: 1 }}
                      >
                        PDF
                      </Button>
                      <Button
                        color="error"
                        onClick={() => handleCancel(reservation.id, reservation.client_id)}
                        size="small"
                        variant="outlined"
                      >
                        Annuler
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Nouvelle réservation</DialogTitle>
        <DialogContent>
          <ReservationForm onSuccess={handleSuccess} onCancel={handleCloseDialog} />
        </DialogContent>
      </Dialog>
      </Box>
    </Container>
  );
}

