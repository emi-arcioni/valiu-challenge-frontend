import { Table } from '../tables/table.interface';

export interface Store {
  id: number;
  name: string;
  tables: Table[];
}
