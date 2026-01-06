const Room = ({ room }) => (
  <div className='border p-4'>
    <h3>{room?.name || 'Sample Room'}</h3>
  </div>
);

export default Room;
