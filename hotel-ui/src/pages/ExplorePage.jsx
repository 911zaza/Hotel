import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  Alert,
} from "@mui/material";
import ReservationModal from '../components/ReservationModal';
// Using emojis instead of icons
import { getRooms } from "../api/rooms";
// Using public images for better visual testing; replace with local assets if desired
import { useNavigate } from "react-router-dom";

export default function ExplorePage() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);
  const [reservationRoom, setReservationRoom] = useState(null);

  useEffect(() => {
    loadRooms();
  }, []);

  useEffect(() => {
    filterRooms();
  }, [searchTerm, rooms]);

  const loadRooms = async () => {
    try {
      setLoading(true);
      const res = await getRooms();
      setRooms(res.data);
      setFilteredRooms(res.data);
      setError("");
    } catch (err) {
      setError("Erreur lors du chargement des chambres: " + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  };

  const filterRooms = () => {
    if (!searchTerm) {
      setFilteredRooms(rooms);
      return;
    }

    const filtered = rooms.filter(
      (room) =>
        room.room_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.room_type.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRooms(filtered);
  };

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setOpenDialog(true);
  };

  const handleBook = () => {
    // Close detail dialog and open reservation modal on this page
    setOpenDialog(false);
    setReservationRoom(selectedRoom);
    setReservationOpen(true);
  };

  // Returns the image URL for a room (from database)
  const getRoomImage = (room) => {
    // Use image URL from database if available
    if (room?.image_url && room.image_url.trim()) {
      return room.image_url;
    }
    // Fallback to placeholder
    return 'https://via.placeholder.com/400x300?text=Chambre+' + room?.room_number;
  };

  const getRoomTypeLabel = (type) => {
    const labels = {
      single: "Simple",
      double: "Double",
      suite: "Suite",
    };
    return labels[type] || type;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h3" component="h1" gutterBottom className="page-title" sx={{ mb: 2, display: 'inline-block' }}>
          Découvrez nos Chambres
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Choisissez la chambre parfaite pour votre séjour
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Rechercher par numéro ou type de chambre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ maxWidth: 600, mx: "auto" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">🔍</InputAdornment>
            ),
          }}
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Typography align="center" sx={{ py: 8 }}>
          Chargement...
        </Typography>
      ) : filteredRooms.length === 0 ? (
        <Typography align="center" sx={{ py: 8 }} color="text.secondary">
          Aucune chambre trouvée
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {filteredRooms.map((room) => (
            <Grid item xs={12} sm={6} md={4} key={room.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: 3,
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 6,
                  },
                }}
              >
                <Box
                  component="img"
                  src={getRoomImage(room)}
                  alt={`Chambre ${room.room_number}`}
                  sx={{ width: '100%', height: 200, objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                    <Typography variant="h5" component="h2" fontWeight="bold">
                      Chambre {room.room_number}
                    </Typography>
                    <Chip
                      label={getRoomTypeLabel(room.room_type)}
                      color={room.room_type === "suite" ? "primary" : room.room_type === "double" ? "secondary" : "default"}
                      size="small"
                    />
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Typography variant="h6" color="primary.main" fontWeight="bold">
                      💶 {room.price_per_night.toFixed(2)} €
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                      /nuit
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                    <Chip
                      label={room.is_available ? "Disponible" : "Occupée"}
                      color={room.is_available ? "success" : "error"}
                      size="small"
                    />
                  </Box>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleRoomClick(room)}
                    disabled={!room.is_available}
                  >
                    {room.is_available ? "Réserver" : "Non disponible"}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Room Detail Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h5" fontWeight="bold">
            Chambre {selectedRoom?.room_number}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {selectedRoom && (
            <Box>
              <Box
                component="img"
                src={getRoomImage(selectedRoom)}
                alt={`Chambre ${selectedRoom.room_number}`}
                sx={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: 2,
                  mb: 3,
                }}
              />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Type
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {getRoomTypeLabel(selectedRoom.room_type)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Prix par nuit
                  </Typography>
                  <Typography variant="body1" fontWeight="bold" color="primary.main">
                    {selectedRoom.price_per_night.toFixed(2)} €
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={handleBook}
                  >
                    Réserver maintenant
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
      </Dialog>
      {/* Reservation modal opened from this page */}
      <ReservationModal open={reservationOpen} onClose={() => setReservationOpen(false)} room={reservationRoom} />
    </Container>
  );
}

