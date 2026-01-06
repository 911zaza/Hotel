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
          <h2 className='text-3xl font-bold'>Nos chambres les plus chères</h2>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/** We'll fetch rooms from API and show top 3 */}
          <HomeTopRooms />
        </div>
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

