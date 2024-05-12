import axios from 'axios';
import { Store } from '../stores/store.interface';

const API_URL = process.env.REACT_APP_API_URL ?? '';

// -- Restaurants (Stores) --
export const getStores = async (): Promise<Store[]> => {
  const response = await axios.get(`${API_URL}/stores`);
  return response.data;
};

export const getStore = async (id: number): Promise<Store> => {
  const response = await axios.get(`${API_URL}/stores/${id}`);
  return response.data;
};

// -- Reservations --
export const createReservation = async (
  date: String,
  customers: number,
  store: Store
) => {
  const { id } = store;
  const response = await axios.post(`${API_URL}/reservations`, {
    date,
    customers,
    store: { id },
  });
  return response.data;
};
