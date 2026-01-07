import { BookForm, HeroSlider, Rooms, Room } from '../components';
import ScrollToTop from '../utils/ScrollToTop';
import { useEffect, useState } from 'react';
import { getRooms } from '../api/rooms';

const HomePage = () => {
  return (
    <div className='bg-yellow-50'>
      <ScrollToTop />

      {/* Page Title */}
      <div className='bg-primary text-white py-12 text-center'>
        <h1 className='font-primary text-[45px] uppercase tracking-[2px] mb-3'>
          Bienvenue au Grand Hotel
        </h1>
        <p className='font-secondary text-[15px] tracking-[3px] uppercase text-accent'>
          Your Luxury Hotel For Vacation
        </p>
      </div>

      <HeroSlider />

      {/* Top 3 most expensive rooms from backend */}
      <section className='py-12 container mx-auto'>
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-bold'>Nos chambres les plus prestigieuses </h2>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/** We'll fetch rooms from API and show top 3 */}
          <HomeTopRooms />
        </div>
      </section>
      {/* Section À propos de l’hôtel */}
<section className="py-16 bg-white">
  <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-4">
    
    {/* Image */}
    <div className="rounded-xl overflow-hidden shadow-md">
      <img 
        src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
        alt="Hotel Luxury"
        className="w-full h-[380px] object-cover"
      />
    </div>

    {/* Texte */}
    <div>
      <h2 className="text-4xl font-bold mb-4 text-primary uppercase tracking-wide">
        La Meilleure Place Pour Votre Séjour
      </h2>

      <p className="text-gray-700 leading-relaxed text-lg mb-6">
        Découvrez une expérience exceptionnelle au Grand Hôtel, où confort,
        élégance et service d’excellence se rencontrent. Niché au cœur d’un
        environnement calme, notre établissement propose des chambres modernes,
        des installations luxueuses et un service attentionné pour rendre votre séjour inoubliable.
      </p>

      <ul className="space-y-3 text-gray-700">
        <li className="flex items-center gap-3">
          <span className="text-primary text-xl">✔</span>
          Chambres spacieuses et entièrement équipées
        </li>
        <li className="flex items-center gap-3">
          <span className="text-primary text-xl">✔</span>
          Restaurant gastronomique avec vue panoramique
        </li>
        <li className="flex items-center gap-3">
          <span className="text-primary text-xl">✔</span>
          Piscine, spa et espaces détente haut-de-gamme
        </li>
        <li className="flex items-center gap-3">
          <span className="text-primary text-xl">✔</span>
          Service 24/7 et staff multilingue
        </li>
      </ul>
    </div>

  </div>
  {/* Section Services */}
<section className="py-16 bg-yellow-50">
  <div className="container mx-auto text-center px-4">
    
    <h2 className="text-4xl font-bold text-primary mb-4 uppercase tracking-wide">
      Nos Services Exclusifs
    </h2>

    <p className="text-gray-700 max-w-2xl mx-auto mb-12 text-lg">
      Nous proposons une gamme de services haut de gamme pour offrir à nos clients 
      une expérience exceptionnelle, alliant confort, luxe et raffinement.
    </p>

    {/* Grid Services */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

      {/* Service 1 */}
      <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
  <div className="text-primary text-5xl mb-4">🎉</div>
  <h3 className="text-xl font-bold mb-2">Événements Inoubliables</h3>
  <p className="text-gray-600">
    Organisez vos mariages, conférences, fêtes et célébrations dans nos salles modernes, élégantes et parfaitement équipées.
  </p>
</div>


      {/* Service 2 */}
      <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
        <div className="text-primary text-5xl mb-4">🍽️</div>
        <h3 className="text-xl font-bold mb-2">Restaurant Gourmet</h3>
        <p className="text-gray-600">
          Savourez une cuisine raffinée préparée par nos chefs primés.
        </p>
      </div>

      {/* Service 3 */}
      <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
        <div className="text-primary text-5xl mb-4">🛎️</div>
        <h3 className="text-xl font-bold mb-2">Conciergerie 24/7</h3>
        <p className="text-gray-600">
          Service personnalisé pour répondre à vos besoins à tout moment.
        </p>
      </div>

    </div>

  </div>
</section>

</section>

    </div>
  );
};

export default HomePage;

function HomeTopRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getRooms();
        const data = res.data || [];
        data.sort((a,b) => (b.price_per_night || 0) - (a.price_per_night || 0));
        setRooms(data.slice(0,3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (!rooms.length) return <p className='text-center text-gray-500'>Aucune chambre disponible</p>;

  return rooms.map(r => (
    <div key={r.id}>
      <Room room={r} />
    </div>
  ));
}

