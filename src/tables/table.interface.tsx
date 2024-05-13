import { Reservation } from '../reservations/reservation.interface';
import { Store } from '../stores/store.interface';

export interface Table {
  id?: number;
  size: number;
  reservations?: Reservation[];
  store?: Store;
  reservationForCurrentDate?: Reservation;
}
