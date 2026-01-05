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
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.text('Confirmation de Commande', 20, 20);
  
  doc.setFontSize(12);
  doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, 20, 35);
  
  doc.autoTable({
    startY: 45,
    head: [['Information', 'Détails']],
    body: [
      ['Client', client.name],
      ['Plat', commande.nom_plat],
      ['Quantité', commande.nb_deplat],
      ['Prix unitaire', `${plat.prix_plat}€`],
      ['Total', `${plat.prix_plat * commande.nb_deplat}€`],
      ['Date de commande', new Date(commande.date_commande).toLocaleDateString('fr-FR')],
      ['Date du repas', new Date(commande.date_a_manger).toLocaleDateString('fr-FR')],
    ],
  });
  
  doc.save(`commande_${commande.id_commande}.pdf`);
};