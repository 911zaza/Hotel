import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generateReservationPDF = (reservation, client, room) => {
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.text('Confirmation de Réservation', 20, 20);
  
  doc.setFontSize(12);
  doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, 20, 35);
  
  doc.autoTable({
    startY: 45,
    head: [['Information', 'Détails']],
    body: [
      ['Client', client.name],
      ['Email', client.email],
      ['Téléphone', client.phone],
      ['Chambre', `N° ${room.room_number} - ${room.room_type}`],
      ['Prix', `${room.price_per_night}€ / nuit`],
      ['Check-in', new Date(reservation.check_in).toLocaleDateString('fr-FR')],
      ['Check-out', new Date(reservation.check_out).toLocaleDateString('fr-FR')],
    ],
  });
  
  doc.save(`reservation_${reservation.id}.pdf`);
};

export const generateCommandePDF = (commande, plat, client) => {
  const total = (plat.prix_plat * commande.nb_deplat).toFixed(2);
  
  const ticketHtml = `
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Ticket Commande</title>
        <style>
          body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #111827; margin: 0; padding: 0; background: #f3f4f6; }
          .ticket { width: 500px; max-width: 95%; margin: 15px auto; border-radius: 8px; overflow: hidden; box-shadow: 0 8px 24px rgba(2,6,23,0.08); }
          .ticket-header { background: linear-gradient(90deg,#1a1a1a 0%, #2b2b2b 100%); color: #d8b86a; padding: 16px; display:flex; justify-content:space-between; align-items:center; border-bottom: 3px solid #d8b86a; }
          .hotel-name { font-size: 20px; font-weight: 800; letter-spacing: 0.3px; }
          .ticket-subtitle { font-size: 11px; opacity: 0.95; color: #d8b86a; }
          .ticket-id { font-size: 11px; opacity: 0.9; color: #d8b86a; text-align: right; line-height: 1.4; }
          .ticket-body { padding: 20px; background: linear-gradient(180deg, #fff, #fafafa); }
          .plat-name { font-size: 22px; font-weight: 900; color: #1a1a1a; text-align: center; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 2px solid #d8b86a; }
          .section { margin-bottom: 16px; }
          .section-title { font-size: 12px; font-weight: 800; color: #1a1a1a; text-transform: uppercase; letter-spacing: 0.8px; opacity: 0.7; margin-bottom: 8px; }
          .row { display:flex; justify-content:space-between; margin-bottom: 8px; font-size: 13px; }
          .row-label { color:#666; font-weight: 600; }
          .row-value { font-weight: 700; color:#0f172a; }
          .row-separator { height: 1px; background: #e8dfd5; margin: 12px 0; }
          .price-row { display:flex; justify-content:space-between; font-size: 14px; padding: 8px; background: #f9f7f3; border-left: 3px solid #d8b86a; margin-bottom: 8px; }
          .price-label { font-weight: 700; color: #222222; }
          .price-value { font-weight: 800; color: #d8b86a; }
          .total-row { display:flex; justify-content:space-between; font-size: 24px; padding: 12px; background: #1a1a1a; color: #d8b86a; font-weight: 900; border-radius: 6px; margin-top: 12px; }
          .total-label { color: #d8b86a; font-size: 18px; }
          .total-value { color: #ffd700; font-size: 28px; }
          .footer { background:#1a1a1a; padding: 12px 16px; font-size:11px; color:#d8b86a; text-align: center; border-top: 2px solid #d8b86a; }
          .footer-text { margin: 3px 0; }
        </style>
      </head>
      <body>
        <div class="ticket">
          <div class="ticket-header">
            <div>
              <div class="hotel-name">Grand Hotel</div>
              <div class="ticket-subtitle">Commande</div>
            </div>
            <div class="ticket-id">Cmd: ${commande.id_commande || commande.id}<br/>${new Date().toLocaleDateString('fr-FR')}</div>
          </div>
          
          <div class="ticket-body">
            <div class="plat-name">🍽️ ${plat.nom_plat}</div>
            <div style="text-align: center; font-size: 14px; color: #666; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid #e8dfd5;">
              <strong>Type:</strong> ${plat.type_plat}
            </div>

            <div class="section">
              <div class="section-title">Client</div>
              <div class="row">
                <span class="row-label">Nom:</span>
                <span class="row-value">${client.name}</span>
              </div>
            </div>

            <div class="row-separator"></div>

            <div class="section">
              <div class="section-title">Détails</div>
              <div class="row">
                <span class="row-label">Quantité:</span>
                <span class="row-value">${commande.nb_deplat}x</span>
              </div>
              <div class="price-row">
                <span class="price-label">Prix unitaire:</span>
                <span class="price-value">${parseFloat(plat.prix_plat).toFixed(2)}€</span>
              </div>
            </div>

            <div class="row-separator"></div>

            <div class="total-row">
              <span class="total-label">À PAYER:</span>
              <span class="total-value">${total}€</span>
            </div>
          </div>

          <div class="footer">
            <div class="footer-text">Merci!</div>
          </div>
        </div>
      </body>
    </html>`;

  // Open printable window
  const w = window.open('', '_blank');
  if (w) {
    w.document.write(ticketHtml);
    w.document.close();
    setTimeout(() => { w.print(); }, 500);
  }
};