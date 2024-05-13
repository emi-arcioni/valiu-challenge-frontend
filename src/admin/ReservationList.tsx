import { useCallback, useEffect, useState } from 'react';
import { Reservation as IReservation } from '../reservations/reservation.interface';
import { deleteReservation, getReservations } from '../utils/api';
import { Link } from 'react-router-dom';
import Nav from './Nav';

function ReservationListAdmin() {
  const [reservations, setReservations] = useState<IReservation[]>();

  const fetchReservations = useCallback(async () => {
    const data = await getReservations();
    setReservations(data);
  }, []);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const handleDelete = async (storeId: number) => {
    try {
      await deleteReservation(storeId);
      fetchReservations();
    } catch (err) {}
  };

  return (
    <>
      <h2>Reservations</h2>
      <Nav />
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Store</th>
            <th>Table</th>
            <th>Customers</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {reservations?.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.id}</td>
              <td>{reservation.table?.store?.name}</td>
              <td>{reservation.table?.id} (size {reservation.table?.size})</td>
              <td>{reservation.customers}</td>
              <td>{reservation.date}</td>
              <td>
                <button onClick={() => handleDelete(reservation.id!)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ReservationListAdmin;
