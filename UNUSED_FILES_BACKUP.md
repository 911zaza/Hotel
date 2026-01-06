# Backup de tous les fichiers inutilisés
## Sauvegarde créée le 6 Janvier 2026

Cette archive contient le contenu complet de tous les fichiers inutilisés identifiés et supprimés. Vous pouvez les récupérer si nécessaire.

---

## 1. hotel-ui/src/components/BookForm.jsx

```jsx
import { AdultsDropdown, CheckIn, CheckOut, KidsDropdown } from '.';
import { useRoomContext } from '../context/RoomContext';

const BookForm = () => {

  const { handleCheck } = useRoomContext();

  return (
    <form className='h-[300px] lg:h-[70px] w-full'>
      <div className='flex flex-col w-full h-full lg:flex-row'>

        <div className='flex-1 border-r'>
          <CheckIn />
        </div>

        <div className='flex-1 border-r'>
          <CheckOut />
        </div>

        <div className='flex-1 border-r'>
          <AdultsDropdown />
        </div>

        <div className='flex-1 border-r'>
          <KidsDropdown />
        </div>

        <button
          type='submit'
          className='btn btn-primary'
          onClick={(e) => handleCheck(e)}
        >
          Check Now
        </button>

      </div>
    </form>
  );
};

export default BookForm;
```

---

## 2. hotel-ui/src/components/Rooms.jsx

```jsx
import { useRoomContext } from '../context/RoomContext';
import { SpinnerDotted } from 'spinners-react';
import { Room } from '.';

// Props: limit => number of rooms to display (if provided show top N by price)
const Rooms = ({ limit }) => {

  const { rooms, loading } = useRoomContext();

  return (
    <section className='py-24 bg-white'>

      {
        // overlay & spinner effect 
        loading &&
        <div className='h-screen w-full fixed bottom-0 top-0 bg-black/80 z-50 grid place-items-center'>
          <SpinnerDotted />
        </div>
      }


      <div className='container mx-auto px-4 lg:px-0'>

        <div className='text-center mb-12'>
          <p className='font-tertiary uppercase text-[15px] tracking-[6px] text-gray-500'>Hotel & Spa Adina</p>
          <h2 className='font-primary text-[45px] mb-6 text-gray-800'>Room & Suites</h2>
        </div>

        {/* Grid with 3 cards per row, fixed sizes */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {
            // If limit is provided, show top N most expensive rooms
            (limit ? [...rooms].sort((a,b)=> (b.price_per_night || b.price || 0) - (a.price_per_night || a.price || 0)).slice(0, limit) : rooms)
              .map(room =>
                <Room key={room.id} room={room} />
              )
          }
        </div>

        {/* Empty state */}
        {rooms.length === 0 && !loading && (
          <div className='text-center py-12'>
            <p className='text-gray-500 text-lg'>Aucune chambre disponible</p>
          </div>
        )}
      </div>

    </section>
  );
};

export default Rooms;
```

---

## 3. hotel-ui/src/components/RoomCard.jsx

```jsx
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
```

---

## 4. hotel-ui/src/components/PrimaryButton.jsx

```jsx
import React from 'react';
import { Button } from '@mui/material';

export default function PrimaryButton({ children, ...props }) {
  return (
    <Button variant="contained" color="primary" {...props}>
      {children}
    </Button>
  );
}
```

---

## 5. hotel-ui/src/components/AdultsDropdown.jsx

```jsx
const AdultsDropdown = () => <div className='p-2'>Adults</div>;
export default AdultsDropdown;
```

---

## 6. hotel-ui/src/components/KidsDropdown.jsx

```jsx
const KidsDropdown = () => <div className='p-2'>Kids</div>;
export default KidsDropdown;
```

---

## 7. hotel-ui/src/components/CheckIn.jsx

```jsx
const CheckIn = () => <div className='p-2'>Check In</div>;
export default CheckIn;
```

---

## 8. hotel-ui/src/components/CheckOut.jsx

```jsx
const CheckOut = () => <div className='p-2'>Check Out</div>;
export default CheckOut;
```

---

## 9. hotel-ui/src/components/EvenementForm.jsx

```jsx
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
} from '@mui/material';

export default function EvenementForm({ evenement, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(evenement || {
    nom_evenement: '',
    date_evenement: '',
    duree_evenement: '02:00:00',
    prix_evenement: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        name="nom_evenement"
        label="Nom de l'événement"
        fullWidth
        required
        value={formData.nom_evenement}
        onChange={handleChange}
      />
      <TextField
        name="date_evenement"
        label="Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        fullWidth
        required
        value={formData.date_evenement}
        onChange={handleChange}
      />
      <TextField
        name="duree_evenement"
        label="Durée (HH:MM:SS)"
        fullWidth
        value={formData.duree_evenement}
        onChange={handleChange}
        placeholder="02:00:00"
      />
      <TextField
        name="prix_evenement"
        label="Prix"
        type="number"
        inputProps={{ step: '0.01' }}
        fullWidth
        required
        value={formData.prix_evenement}
        onChange={handleChange}
      />
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
        <Button onClick={onCancel} variant="outlined">
          Annuler
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Enregistrer
        </Button>
      </Box>
    </Box>
  );
}
```

---

## 10. hotel-ui/src/components/PlatForm.jsx

```jsx
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

export default function PlatForm({ plat, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(plat || {
    nom_plat: '',
    type_plat: '',
    prix_plat: '',
    ingredient_plat: '',
    disponibilite: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        name="nom_plat"
        label="Nom du plat"
        fullWidth
        required
        value={formData.nom_plat}
        onChange={handleChange}
      />
      <TextField
        name="type_plat"
        label="Type de plat"
        fullWidth
        required
        value={formData.type_plat}
        onChange={handleChange}
      />
      <TextField
        name="prix_plat"
        label="Prix"
        type="number"
        inputProps={{ step: '0.01' }}
        fullWidth
        required
        value={formData.prix_plat}
        onChange={handleChange}
      />
      <TextField
        name="ingredient_plat"
        label="Ingrédients"
        fullWidth
        multiline
        rows={3}
        required
        value={formData.ingredient_plat}
        onChange={handleChange}
      />
      <FormControlLabel
        control={
          <Checkbox
            name="disponibilite"
            checked={formData.disponibilite}
            onChange={handleChange}
          />
        }
        label="Disponible"
      />
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
        <Button onClick={onCancel} variant="outlined">
          Annuler
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Enregistrer
        </Button>
      </Box>
    </Box>
  );
}
```

---

## 11. hotel-ui/src/components/FooterNew.jsx (Ancienne version)

```jsx
import React from 'react';
import { Box, Container, Typography, Link, Grid, Divider } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: '#1a1a1a',
        color: '#d4af8f',
        py: 6,
        mt: 8,
        borderTop: '2px solid #b8860b',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* À propos */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ffd700', mb: 2 }}>
              À propos
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.8, color: '#d4af8f' }}>
              Grand Hotel est une destination prestigieuse offrant luxe, confort et gastronomie exceptionnelle. 
              Notre équipe s'engage à fournir un service de qualité supérieure.
            </Typography>
          </Grid>

          {/* Créateurs */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ffd700', mb: 2 }}>
              Créateurs
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: '#d4af8f' }}>
              <strong>Zakaria Laribi</strong>
            </Typography>
            <Typography
              variant="body2"
              component="a"
              href="mailto:z.laribi@esisa.ac.ma"
              sx={{
                display: 'block',
                mb: 2,
                color: '#ffd700',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              z.laribi@esisa.ac.ma
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: '#d4af8f' }}>
              <strong>Faycal Ouhannou</strong>
            </Typography>
            <Typography
              variant="body2"
              component="a"
              href="mailto:o.faycal@esisa.ac.ma"
              sx={{
                display: 'block',
                color: '#ffd700',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              o.faycal@esisa.ac.ma
            </Typography>
          </Grid>

          {/* Réseaux sociaux */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ffd700', mb: 2 }}>
              Réseaux sociaux
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', flexWrap: 'wrap' }}>
              <Link
                href="https://www.instagram.com/zakaria_laribi"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  color: '#ffd700',
                  textDecoration: 'none',
                  '&:hover': { color: '#ffed4e' },
                }}
              >
                <InstagramIcon sx={{ fontSize: 32, mb: 0.5 }} />
                <Typography variant="caption" sx={{ textAlign: 'center' }}>zakaria_laribi</Typography>
              </Link>
              <Link
                href="https://www.instagram.com/faycal_ouhannou/?utm_source=ig_web_button_share_sheet"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  color: '#ffd700',
                  textDecoration: 'none',
                  '&:hover': { color: '#ffed4e' },
                }}
              >
                <InstagramIcon sx={{ fontSize: 32, mb: 0.5 }} />
                <Typography variant="caption" sx={{ textAlign: 'center' }}>faycal_ouhannou</Typography>
              </Link>
            </Box>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ffd700', mb: 2 }}>
              Contact
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
              <EmailIcon sx={{ color: '#ffd700' }} />
              <Link
                href="mailto:info@grandhotel.com"
                sx={{
                  color: '#ffd700',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                info@grandhotel.com
              </Link>
            </Box>
            <Typography variant="body2" sx={{ color: '#d4af8f' }}>
              Tél: +212 5XX XXX XXX
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: '#b8860b' }} />

        {/* Copyright */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#d4af8f', mb: 1 }}>
            © 2026 <span style={{ color: '#ffd700', fontWeight: 'bold' }}>Grand Hotel</span> — Tous droits réservés
          </Typography>
          <Typography variant="caption" sx={{ color: '#999' }}>
            Développé avec passion par Zakaria Laribi et Faycal Ouhannou
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
```

---

## 12. hotel-ui/src/db/data.js

```javascript
export const roomData = [
  {
    id: 1,
    name: 'Superior Room',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit.Ea placeat eos sed voluptas unde veniam eligendi a. Quaerat molestiae hic omnis temporibus quos consequuntur nam voluptatum ea accusamus, corrupti nostrum eum placeat quibusdam quis beatae quae labore earum architecto aliquid debitis.',
    facilities: [
      { name: 'Wifi' },
      { name: 'Coffee' },
      { name: 'Bath' },
      { name: 'Parking Space' },
      { name: 'Swimming Pool' },
      { name: 'Breakfast' },
      { name: 'GYM' },
      { name: 'Drinks' },
    ],
    size: 30,
    maxPerson: 1,
    price: 115,
    image: 'https://via.placeholder.com/300x200?text=Superior+Room',
    imageLg: 'https://via.placeholder.com/600x400?text=Superior+Room',
  },
  {
    id: 2,
    name: 'Signature Room',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit.Ea placeat eos sed voluptas unde veniam eligendi a. Quaerat molestiae hic omnis temporibus quos consequuntur nam voluptatum ea accusamus, corrupti nostrum eum placeat quibusdam quis beatae quae labore earum architecto aliquid debitis.',
    facilities: [
      { name: 'Wifi' },
      { name: 'Coffee' },
      { name: 'Bath' },
      { name: 'Parking Space' },
      { name: 'Swimming Pool' },
      { name: 'Breakfast' },
      { name: 'GYM' },
      { name: 'Drinks' },
    ],
    size: 70,
    maxPerson: 2,
    price: 220,
    image: 'https://via.placeholder.com/300x200?text=Signature+Room',
    imageLg: 'https://via.placeholder.com/600x400?text=Signature+Room',
  },
  {
    id: 3,
    name: 'Deluxe Room',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit.Ea placeat eos sed voluptas unde veniam eligendi a. Quaerat molestiae hic omnis temporibus quos consequuntur nam voluptatum ea accusamus, corrupti nostrum eum placeat quibusdam quis beatae quae labore earum architecto aliquid debitis.',
    facilities: [
      { name: 'Wifi' },
      { name: 'Coffee' },
      { name: 'Bath' },
      { name: 'Parking Space' },
      { name: 'Swimming Pool' },
      { name: 'Breakfast' },
      { name: 'GYM' },
      { name: 'Drinks' },
    ],
    size: 50,
    maxPerson: 3,
    price: 265,
    image: 'https://via.placeholder.com/300x200?text=Deluxe+Room',
    imageLg: 'https://via.placeholder.com/600x400?text=Deluxe+Room',
  },
  {
    id: 4,
    name: 'Luxury Room',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit.Ea placeat eos sed voluptas unde veniam eligendi a. Quaerat molestiae hic omnis temporibus quos consequuntur nam voluptatum ea accusamus, corrupti nostrum eum placeat quibusdam quis beatae quae labore earum architecto aliquid debitis.',
    facilities: [
      { name: 'Wifi' },
      { name: 'Coffee' },
      { name: 'Bath' },
      { name: 'Parking Space' },
      { name: 'Swimming Pool' },
      { name: 'Breakfast' },
      { name: 'GYM' },
      { name: 'Drinks' },
    ],
    size: 50,
    maxPerson: 4,
    price: 289,
    image: 'https://via.placeholder.com/300x200?text=Luxury+Room',
    imageLg: 'https://via.placeholder.com/600x400?text=Luxury+Room',
  },
  {
    id: 5,
    name: 'Luxury Suite Room',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit.Ea placeat eos sed voluptas unde veniam eligendi a. Quaerat molestiae hic omnis temporibus quos consequuntur nam voluptatum ea accusamus, corrupti nostrum eum placeat quibusdam quis beatae quae labore earum architecto aliquid debitis.',
    facilities: [
      { name: 'Wifi' },
      { name: 'Coffee' },
      { name: 'Bath' },
      { name: 'Parking Space' },
      { name: 'Swimming Pool' },
      { name: 'Breakfast' },
      { name: 'GYM' },
      { name: 'Drinks' },
    ],
    size: 90,
    maxPerson: 5,
    price: 320,
    image: 'https://via.placeholder.com/300x200?text=Luxury+Suite',
    imageLg: 'https://via.placeholder.com/600x400?text=Luxury+Suite',
  },
  {
    id: 6,
    name: 'Deluxe Room',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit.Ea placeat eos sed voluptas unde veniam eligendi a. Quaerat molestiae hic omnis temporibus quos consequuntur nam voluptatum ea accusamus, corrupti nostrum eum placeat quibusdam quis beatae quae labore earum architecto aliquid debitis.',
    facilities: [
      { name: 'Wifi' },
      { name: 'Coffee' },
      { name: 'Bath' },
      { name: 'Parking Space' },
      { name: 'Swimming Pool' },
      { name: 'Breakfast' },
      { name: 'GYM' },
      { name: 'Drinks' },
    ],
    size: 45,
    maxPerson: 6,
    price: 344,
    image: 'https://via.placeholder.com/300x200?text=Deluxe+Room',
    imageLg: 'https://via.placeholder.com/600x400?text=Deluxe+Room',
  },
  {
    id: 7,
    name: 'Luxury Room',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit.Ea placeat eos sed voluptas unde veniam eligendi a. Quaerat molestiae hic omnis temporibus quos consequuntur nam voluptatum ea accusamus, corrupti nostrum eum placeat quibusdam quis beatae quae labore earum architecto aliquid debitis.',
    facilities: [
      { name: 'Wifi' },
      { name: 'Coffee' },
      { name: 'Bath' },
      { name: 'Parking Space' },
      { name: 'Swimming Pool' },
      { name: 'Breakfast' },
      { name: 'GYM' },
      { name: 'Drinks' },
    ],
    size: 84,
    maxPerson: 7,
    price: 389,
    image: 'https://via.placeholder.com/300x200?text=Luxury+Room',
    imageLg: 'https://via.placeholder.com/600x400?text=Luxury+Room',
  },
  {
    id: 8,
    name: 'Deluxe Room',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit.Ea placeat eos sed voluptas unde veniam eligendi a. Quaerat molestiae hic omnis temporibus quos consequuntur nam voluptatum ea accusamus, corrupti nostrum eum placeat quibusdam quis beatae quae labore earum architecto aliquid debitis.',
    facilities: [
      { name: 'Wifi' },
      { name: 'Coffee' },
      { name: 'Bath' },
      { name: 'Parking Space' },
      { name: 'Swimming Pool' },
      { name: 'Breakfast' },
      { name: 'GYM' },
      { name: 'Drinks' },
    ],
    size: 48,
    maxPerson: 8,
    price: 499,
    image: 'https://via.placeholder.com/300x200?text=Deluxe+Room',
    imageLg: 'https://via.placeholder.com/600x400?text=Deluxe+Room',
  },
];
```

---

## 13. hotel-ui/src/App.test.js

```javascript
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

---

## 14. hotel-ui/src/setupTests.js

```javascript
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
```

---

## Résumé

**Total: 14 fichiers sauvegardés**

- Components: BookForm.jsx, Rooms.jsx, RoomCard.jsx, PrimaryButton.jsx, AdultsDropdown.jsx, KidsDropdown.jsx, CheckIn.jsx, CheckOut.jsx, EvenementForm.jsx, PlatForm.jsx, FooterNew.jsx (11 fichiers)
- Data: db/data.js (1 fichier)
- Tests: App.test.js, setupTests.js (2 fichiers)

Tous ces fichiers étaient inutilisés dans le frontend actuel. Vous pouvez consulter ce fichier si vous avez besoin de récupérer du contenu après suppression.
