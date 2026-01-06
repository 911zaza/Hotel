import React, { createContext, useContext, useState, useEffect } from 'react';
import { roomData } from '../db/data';

const RoomInfo = createContext();

export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState(roomData);
  const [loading, setLoading] = useState(false);
  const [adults, setAdults] = useState('1 Adult');
  const [kids, setKids] = useState('0 Kid');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(+adults[0] + +kids[0]);
  }, [adults, kids]);

  const resetRoomFilterData = () => {
    setAdults('1 Adult');
    setKids('0 Kid');
    setRooms(roomData);
  };

  const handleCheck = (e) => {
    e.preventDefault();
    setLoading(true);

    // filter rooms based on total persons...
    const filterRooms = roomData.filter(room => total <= room.maxPerson);

    setTimeout(() => {
      setLoading(false);
      setRooms(filterRooms);
    }, 3000);
  };

  const shareWithChildren = {
    rooms,
    loading,
    adults,
    setAdults,
    kids,
    setKids,
    handleCheck,
    resetRoomFilterData,
  };

  return (
    <RoomInfo.Provider value={shareWithChildren}>
      {children}
    </RoomInfo.Provider>
  );
};

export const useRoomContext = () => {
  const context = useContext(RoomInfo);
  if (!context) {
    throw new Error('useRoomContext must be used within RoomProvider');
  }
  return context;
};
