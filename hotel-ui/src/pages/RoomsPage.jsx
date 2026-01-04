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
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  Alert,
  Container,
} from "@mui/material";
// Icons will be replaced with text for now - install @mui/icons-material to use icons
import { getRooms, deleteRoom } from "../api/rooms";
import RoomForm from "../components/RoomForm";

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  const loadRooms = async () => {
    try {
      setLoading(true);
      const res = await getRooms();
      setRooms(res.data);
      setError("");
    } catch (err) {
      setError("Erreur lors du chargement des chambres: " + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette chambre ?")) {
      try {
        await deleteRoom(id);
        loadRooms();
      } catch (err) {
        setError("Erreur lors de la suppression: " + (err.response?.data?.detail || err.message));
      }
    }
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setOpenDialog(true);
  };

  const handleAdd = () => {
    setEditingRoom(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingRoom(null);
  };

  const handleSuccess = () => {
    handleCloseDialog();
    loadRooms();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" component="h1">
          Gestion des Chambres
        </Typography>
        <Button
          variant="contained"
          onClick={handleAdd}
          sx={{ mb: 2 }}
        >
          + Ajouter une chambre
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
                <TableCell>Numéro</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Prix/Nuit</TableCell>
                <TableCell>Statut</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rooms.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Aucune chambre trouvée
                  </TableCell>
                </TableRow>
              ) : (
                rooms.map((room) => (
                  <TableRow key={room.id} hover>
                    <TableCell>{room.id}</TableCell>
                    <TableCell>{room.room_number}</TableCell>
                    <TableCell>
                      <Chip
                        label={room.room_type}
                        color={room.room_type === "suite" ? "primary" : room.room_type === "double" ? "secondary" : "default"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{room.price_per_night.toFixed(2)} €</TableCell>
                    <TableCell>
                      <Chip
                        label={room.is_available ? "Disponible" : "Occupée"}
                        color={room.is_available ? "success" : "error"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        color="primary"
                        onClick={() => handleEdit(room)}
                        size="small"
                        variant="outlined"
                      >
                        Modifier
                      </Button>
                      <Button
                        color="error"
                        onClick={() => handleDelete(room.id)}
                        size="small"
                        variant="outlined"
                        sx={{ ml: 1 }}
                      >
                        Supprimer
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingRoom ? "Modifier la chambre" : "Ajouter une chambre"}</DialogTitle>
        <DialogContent>
          <RoomForm room={editingRoom} onSuccess={handleSuccess} onCancel={handleCloseDialog} />
        </DialogContent>
      </Dialog>
      </Box>
    </Container>
  );
}

