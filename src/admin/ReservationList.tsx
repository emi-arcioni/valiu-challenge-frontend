import { useCallback, useEffect, useState } from 'react';
import { Reservation as IReservation } from '../reservations/reservation.interface';
import { deleteReservation, getReservations } from '../utils/api';
import Header from '../components/Header';
import { Table, Tbody, Td, Th, Thead, Tr } from '../components/Table';
import Button from '../components/Button';
import { useToast } from '../components/ToastContext';
import { AxiosError } from 'axios';
import Loading from '../components/Loading';

function ReservationListAdmin() {
  const { callToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<number>();
  const [reservations, setReservations] = useState<IReservation[]>();

  const fetchReservations = useCallback(async () => {
    const data = await getReservations();
    setReservations(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const handleDelete = async (reservationId: number) => {
    try {
      /**
       * I've used basic confirmation prompt, maybe an improvement could be using stylized modals
       */
      if (
        reservationId &&
        window.confirm('Are you sure to delete this Reservation?')
      ) {
        setProcessing(reservationId);
        await deleteReservation(reservationId);
        fetchReservations();
        callToast('Reservation successfully deleted');
      }
    } catch (err) {
      const { response } = err as AxiosError;
      const { message } = response?.data as { message: string; status: number };

      callToast(message, 'error');
    }
  };

  return (
    <>
      <Header>
        <h1>Reservations</h1>
      </Header>
      {loading ? (
        <Loading></Loading>
      ) : reservations?.length === 0 ? (
        <p>No reservations were found</p>
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Store</Th>
              <Th>Table</Th>
              <Th>Customers</Th>
              <Th>Date</Th>
              <Th className="w-48">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {reservations?.map((reservation) => (
              <Tr key={reservation.id}>
                <Td>{reservation.id}</Td>
                <Td>{reservation.table?.store?.name}</Td>
                <Td>
                  {reservation.table?.id} (size {reservation.table?.size})
                </Td>
                <Td>{reservation.customers}</Td>
                <Td>{reservation.date}</Td>
                <Td>
                  <Button
                    color="red"
                    onClick={() => handleDelete(reservation.id!)}
                    processing={processing === reservation.id}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </>
  );
}

export default ReservationListAdmin;
