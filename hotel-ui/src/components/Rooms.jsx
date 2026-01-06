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
