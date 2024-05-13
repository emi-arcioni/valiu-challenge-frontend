import { Table } from "../tables/table.interface";

export interface Reservation {
  id: number;
  date: string;
  customers: number;
  created_at: Date;
  table: Table;
}