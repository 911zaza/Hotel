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
import { getClients, deleteClient } from "../api/clients";
import ClientForm from "../components/ClientForm";

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  const loadClients = async () => {
    try {
      setLoading(true);
      const res = await getClients();
      setClients(res.data);
      setError("");
    } catch (err) {
      setError("Erreur lors du chargement des clients: " + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce client ?")) {
      try {
        await deleteClient(id);
        loadClients();
      } catch (err) {
        setError("Erreur lors de la suppression: " + (err.response?.data?.detail || err.message));
      }
    }
  };

  const handleEdit = (client) => {
    setEditingClient(client);
    setOpenDialog(true);
  };

  const handleAdd = () => {
    setEditingClient(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingClient(null);
  };

  const handleSuccess = () => {
    handleCloseDialog();
    loadClients();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" component="h1">
          Gestion des Clients
        </Typography>
        <Button
          variant="contained"
          onClick={handleAdd}
          sx={{ mb: 2 }}
        >
          + Ajouter un client
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
                <TableCell>Nom</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Téléphone</TableCell>
                <TableCell>Adresse</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Aucun client trouvé
                  </TableCell>
                </TableRow>
              ) : (
                clients.map((client) => (
                  <TableRow key={client.id} hover>
                    <TableCell>{client.id}</TableCell>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell>{client.address}</TableCell>
                    <TableCell align="right">
                      <Button
                        color="primary"
                        onClick={() => handleEdit(client)}
                        size="small"
                        variant="outlined"
                      >
                        Modifier
                      </Button>
                      <Button
                        color="error"
                        onClick={() => handleDelete(client.id)}
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
        <DialogTitle>{editingClient ? "Modifier le client" : "Ajouter un client"}</DialogTitle>
        <DialogContent>
          <ClientForm client={editingClient} onSuccess={handleSuccess} onCancel={handleCloseDialog} />
        </DialogContent>
      </Dialog>
      </Box>
    </Container>
  );
}
