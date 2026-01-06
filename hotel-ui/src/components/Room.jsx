import { useState } from 'react';

const Room = ({ room, onReserve, nights, totalPrice, errorMessage }) => {
  const [imageError, setImageError] = useState(false);

  // L'image URL est déjà une URL complète depuis le backend
  const imageUrl = room?.image_url || 'https://via.placeholder.com/400x300?text=No+Image';

  return (
    <div className='bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col'>
      {/* Error banner shown at top of card when provided */}
      {errorMessage && (
        <div className='w-full bg-red-100 border-l-4 border-red-500 text-red-700 p-3 text-sm'>
          {errorMessage}
        </div>
      )}
      {/* Image Container - Fixed height 300px */}
      <div className='w-full h-72 overflow-hidden bg-gray-200 flex-shrink-0'>
        <img
          src={imageError ? 'https://via.placeholder.com/400x300?text=No+Image' : imageUrl}
          alt={room?.room_number || 'Chambre'}
          className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
          onError={() => setImageError(true)}
        />
      </div>

      {/* Content Container */}
      <div className='p-6 flex-grow flex flex-col justify-between'>
        {/* Room Number and Type */}
        <div>
          <div className='flex items-center justify-between mb-2'>
            <h3 className='text-2xl font-bold text-gray-800'>
              Chambre {room?.room_number || 'N/A'}
            </h3>
            {room?.room_type && (
              <span className='inline-block bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full'>
                {room.room_type.charAt(0).toUpperCase() + room.room_type.slice(1)}
              </span>
            )}
          </div>
        </div>

        {/* Availability and Price */}
        <div>
          {room?.is_available !== undefined && (
            <p className='text-sm mb-2'>
              <span className={`inline-block font-semibold px-2 py-1 rounded text-white ${room.is_available ? 'bg-green-500' : 'bg-red-500'}`}>
                {room.is_available ? 'Disponible' : 'Indisponible'}
              </span>
            </p>
          )}
          <p className='text-3xl font-bold text-blue-600 mb-2'>
            {room?.price_per_night ? `${room.price_per_night}€` : '—'}
            <span className='text-lg text-gray-600 font-normal'>/nuit</span>
          </p>
          {/* Total price for given nights (if provided) */}
          {typeof nights === 'number' && (
            <p className='text-lg font-semibold text-gray-700 mb-4'>
              Total ({nights} nuit{nights>1? 's':''}): {totalPrice ?? (room?.price_per_night ? (room.price_per_night * nights).toFixed(2) + '€' : '—')}
            </p>
          )}
          <button onClick={() => onReserve && onReserve(room)} className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 text-lg'>
            RÉSERVER
          </button>
        </div>
      </div>
    </div>
  );
};

export default Room;
