import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { createReservation } from '../api/reservations';
import { getUser } from '../utils/auth';

export default function ReservationModal({ open, onClose, room }) {
  const user = getUser();
  // Prefill name from profile if available
  const initialFirst = (user?.name ? user.name.split(' ')[0] : '') || '';
  const initialLast = (user?.name ? user.name.split(' ').slice(1).join(' ') : '') || '';

  const [firstName, setFirstName] = useState(initialFirst);
  const [lastName, setLastName] = useState(initialLast);
  const [numPersons, setNumPersons] = useState(1);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const reset = () => {
    setFirstName(initialFirst); setLastName(initialLast); setNumPersons(1); setCheckIn(''); setCheckOut(''); setPaymentMethod('cash');
    setCardNumber(''); setCardExpiry(''); setCardCvc('');
  };

  const handleSubmit = async () => {
    if (!room) return;
    // Basic validation
    if (!checkIn || !checkOut) {
      alert('Veuillez renseigner les dates d\'arrivée et de départ.');
      return;
    }

    const ci = new Date(checkIn);
    const co = new Date(checkOut);
    if (isNaN(ci.getTime()) || isNaN(co.getTime())) {
      alert('Format de date invalide.');
      return;
    }
    if (co <= ci) {
      alert('La date de départ doit être postérieure à la date d\'arrivée.');
      return;
    }
    const persons = parseInt(numPersons, 10) || 0;
    if (persons <= 0) {
      alert('Le nombre de personnes doit être au moins 1.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        client_id: user?.id || null,
        room_id: room.id,
        check_in: checkIn,
        check_out: checkOut
      };

      await createReservation(payload);

      // Build printable ticket HTML with nicer styling
      const paid = paymentMethod === 'card';
      const clientName = `${firstName || user?.name || ''} ${lastName || ''}`.trim();
      const nights = Math.max(1, Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)));
      const unitPrice = room.price_per_night || 0;
      const totalPrice = (nights * unitPrice).toFixed(2);
      const ticketHtml = `
        <html>
          <head>
            <meta charset="utf-8" />
            <title>Ticket Réservation</title>
            <style>
              body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #111827; margin: 0; padding: 0; background: #f3f4f6; }
              .ticket { width: 820px; max-width: 96%; margin: 20px auto; border-radius: 10px; overflow: hidden; box-shadow: 0 10px 30px rgba(2,6,23,0.08); }
              .ticket-header { background: linear-gradient(90deg,#6366f1 0%, #06b6d4 100%); color: #fff; padding: 22px; display:flex; justify-content:space-between; align-items:center; }
              .hotel-name { font-size: 26px; font-weight: 800; letter-spacing: 0.4px; }
              .ticket-id { font-size: 13px; opacity: 0.95; }
              .ticket-body { padding: 22px; background: linear-gradient(180deg, #fff, #fafafa); }
              .row { display:flex; gap: 18px; margin-bottom: 14px; }
              .col { flex: 1; }
              .label { font-size: 12px; color:#6b7280; margin-bottom:6px; }
              .value { font-size: 16px; font-weight:700; color:#0f172a; }
              .price { font-size: 20px; color:#0ea5e9; font-weight:800; }
              .total { font-size: 22px; color:#0b5cff; font-weight:900; }
              .badge { display:inline-block; padding:8px 12px; border-radius:999px; font-weight:800; color:#fff; font-size:12px; }
              .paid { background: #059669; }
              .unpaid { background: #dc2626; }
              .accent { color: #7c3aed; font-weight:700; }
              .footer { background:#111827; padding: 14px 22px; font-size:13px; color:#e6eef8; display:flex; justify-content:space-between; align-items:center; }
            </style>
          </head>
          <body>
            <div class="ticket">
              <div class="ticket-header">
                <div>
                  <div class="hotel-name">Grand Hotel</div>
                  <div style="font-size:13px; opacity:0.9;">Ticket de réservation</div>
                </div>
                <div class="ticket-id">Réservation: ${new Date().getTime()}</div>
              </div>
              <div class="ticket-body">
                <div class="row">
                  <div class="col">
                    <div class="label">Client</div>
                    <div class="value">${clientName || 'Client non renseigné'}</div>
                  </div>
                  <div class="col">
                    <div class="label">Chambre</div>
                    <div class="value">Chambre ${room.room_number}</div>
                  </div>
                </div>

                <div class="row">
                  <div class="col">
                    <div class="label">Check-in</div>
                    <div class="value">${new Date(checkIn).toLocaleString()}</div>
                  </div>
                  <div class="col">
                    <div class="label">Check-out</div>
                    <div class="value">${new Date(checkOut).toLocaleString()}</div>
                  </div>
                </div>

                <div class="row">
                  <div class="col">
                    <div class="label">Nombre de personnes</div>
                    <div class="value">${numPersons}</div>
                  </div>
                  <div class="col">
                    <div class="label">Prix / nuit</div>
                    <div class="price">${room.price_per_night ? room.price_per_night + ' €' : '—'}</div>
                  </div>
                </div>

                <div style="margin-top:18px;">
                  <div class="label">Paiement</div>
                  <div style="margin-top:6px;">
                    <span class="badge ${paid ? 'paid' : 'unpaid'}">${paid ? 'PAYÉ' : 'NON PAYÉ'}</span>
                    <span style="margin-left:12px; color:#374151; font-weight:600;">Méthode: ${paymentMethod === 'card' ? 'Carte' : 'Espèce'}</span>
                  </div>
                </div>
              </div>
              <div class="footer">
                <div>Merci pour votre réservation — Grand Hotel</div>
                <div style="font-size:12px; color:#6b7280;">Imprimé le ${new Date().toLocaleString()}</div>
              </div>
            </div>
          </body>
        </html>`;

      // Open printable window
      const w = window.open('', '_blank');
      if (w) {
        w.document.write(ticketHtml);
        w.document.close();
        // Give browser a moment to render then trigger print
        setTimeout(() => { w.print(); }, 500);
      } else {
        setErrorMessage("Impossible d'ouvrir une nouvelle fenêtre pour le ticket.");
      }

      reset();
      onClose();
    } catch (err) {
      console.error(err);
      const status = err?.response?.status;
      const detail = err?.response?.data?.detail || err.message || 'Erreur inconnue';
      // Do not surface raw host/status codes to user — show friendly message
      setErrorMessage(detail || `Erreur lors de la création de la réservation (${status || ''})`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={!!open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Réserver la chambre {room?.room_number}</DialogTitle>
      <DialogContent>
        {errorMessage && (
          <div style={{ background: '#fee2e2', color: '#991b1b', padding: 10, borderRadius: 6, marginBottom: 12, fontWeight: 600 }}>
            {errorMessage}
          </div>
        )}
        <div style={{ display: 'grid', gap: 12, marginTop: 6 }}>
          <TextField label="Prénom" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <TextField label="Nom" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <TextField type="number" label="Nombre de personnes" value={numPersons} onChange={(e) => setNumPersons(e.target.value)} />
          <TextField type="datetime-local" label="Check-in" InputLabelProps={{ shrink: true }} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
          <TextField type="datetime-local" label="Check-out" InputLabelProps={{ shrink: true }} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />

          <FormControl>
            <InputLabel id="payment-label">Paiement</InputLabel>
            <Select labelId="payment-label" value={paymentMethod} label="Paiement" onChange={(e) => setPaymentMethod(e.target.value)}>
              <MenuItem value="cash">Espèce</MenuItem>
              <MenuItem value="card">Carte</MenuItem>
            </Select>
          </FormControl>

          {paymentMethod === 'card' && (
            <>
              <TextField label="Numéro de carte" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
              <TextField label="Date d'expiration (MM/AA)" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} />
              <TextField label="CVC" value={cardCvc} onChange={(e) => setCardCvc(e.target.value)} />
            </>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Annuler</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>Confirmer</Button>
      </DialogActions>
    </Dialog>
  );
}
