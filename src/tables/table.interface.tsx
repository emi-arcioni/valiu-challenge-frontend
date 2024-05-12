import { Reservation } from '../reservations/reservation.interface';

export interface Table {
  id: number;
  size: number;
  reservations: Reservation[];
  reservationForCurrentDate?: Reservation;
}
