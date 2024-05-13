import axios from 'axios';
import { Store } from '../stores/store.interface';
import { Table } from '../tables/table.interface';
import { Reservation } from '../reservations/reservation.interface';

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

export const createStore = async (store: Store) => {
  const response = await axios.post(`${API_URL}/stores`, store);
  return response.data;
};

export const updateStore = async (store: Store) => {
  const response = await axios.patch(`${API_URL}/stores/${store.id}`, store);
  return response.data;
};

export const deleteStore = async (storeId: number) => {
  const response = await axios.delete(`${API_URL}/stores/${storeId}`);
  return response.data;
};
// --

// -- Tables --
export const getTables = async (): Promise<Table[]> => {
  const response = await axios.get(`${API_URL}/tables`);
  return response.data;
};

export const getTable = async (id: number): Promise<Table> => {
  const response = await axios.get(`${API_URL}/tables/${id}`);
  return response.data;
};

export const createTable = async (table: Table) => {
  const response = await axios.post(`${API_URL}/tables`, table);
  return response.data;
};

export const updateTable = async (table: Table) => {
  const response = await axios.patch(`${API_URL}/tables/${table.id}`, table);
  return response.data;
};

export const deleteTable = async (tableId: number) => {
  const response = await axios.delete(`${API_URL}/tables/${tableId}`);
  return response.data;
};
// --

// -- Reservations --
export const getReservations = async (): Promise<Reservation[]> => {
  const response = await axios.get(`${API_URL}/reservations`);
  return response.data;
};

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

export const deleteReservation = async (reservationId: number) => {
  const response = await axios.delete(
    `${API_URL}/reservations/${reservationId}`
  );
  return response.data;
};
// --
