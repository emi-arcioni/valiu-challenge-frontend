import { Link } from 'react-router-dom';
import { Table as ITable } from '../tables/table.interface';
import Nav from './Nav';
import { useCallback, useEffect, useState } from 'react';
import { deleteTable, getTables } from '../utils/api';

function TableListAdmin() {
  const [tables, setTables] = useState<ITable[]>();

  const fetchTables = useCallback(async () => {
    const data = await getTables();
    setTables(data);
  }, []);

  useEffect(() => {
    fetchTables();
  }, [fetchTables]);

  const handleDelete = async (tableId: number) => {
    try {
      await deleteTable(tableId);
      fetchTables();
    } catch (err) {}
  };

  return (
    <>
      <h2>Tables</h2>
      <Nav />
      <Link to="new">
        <button>Add new</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Size</th>
            <th>Store</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tables?.map((table) => (
            <tr key={table.id}>
              <td>{table.id}</td>
              <td>{table.size}</td>
              <td>{table.store?.name}</td>
              <td>
                <Link to={table.id + ''}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(table.id!)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TableListAdmin;
