import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

export default function RoomCard({ room, onReserve }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>{room.name || `Chambre ${room.id}`}</Typography>
        <Typography variant="body2" color="text.secondary">Type: {room.type || 'Standard'}</Typography>
        <Typography variant="h5" sx={{ mt: 1 }}>{room.price ? `${room.price}€ / nuit` : '—'}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onReserve && onReserve(room)}>Réserver</Button>
      </CardActions>
    </Card>
  );
}
