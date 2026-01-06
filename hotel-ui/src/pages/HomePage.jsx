import { BookForm, HeroSlider, Rooms } from '../components';
import ScrollToTop from '../utils/ScrollToTop';

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

      <Rooms />
    </div>
  );
};

export default HomePage;

