import { Link } from 'react-router-dom';
import { Table as ITable } from '../tables/table.interface';
import { useCallback, useEffect, useState } from 'react';
import { deleteTable, getTables } from '../utils/api';
import Header from '../components/Header';
import Button from '../components/Button';
import { Table, Tbody, Td, Th, Thead, Tr } from '../components/Table';
import { useToast } from '../components/ToastContext';
import { AxiosError } from 'axios';
import Loading from '../components/Loading';

function TableListAdmin() {
  const { callToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<number>();
  const [tables, setTables] = useState<ITable[]>();

  const fetchTables = useCallback(async () => {
    const data = await getTables();
    setTables(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTables();
  }, [fetchTables]);

  const handleDelete = async (tableId: number) => {
    try {
      /**
       * I've used basic confirmation prompt, maybe an improvement could be using stylized modals
       */
      if (tableId && window.confirm('Are you sure to delete this Table?')) {
        setProcessing(tableId);
        await deleteTable(tableId);
        fetchTables();
        callToast('Table successfully deleted');
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
        <h1>Tables</h1>
        <Link to="new">
          <Button>Add new</Button>
        </Link>
      </Header>
      {loading ? (
        <Loading></Loading>
      ) : tables?.length === 0 ? (
        <p>No tables were found</p>
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Size</Th>
              <Th>Store</Th>
              <Th className="w-48">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tables?.map((table) => (
              <Tr key={table.id}>
                <Td>{table.id}</Td>
                <Td>{table.size}</Td>
                <Td>{table.store?.name}</Td>
                <Td>
                  <Link to={table.id + ''}>
                    <Button color="green">Edit</Button>
                  </Link>
                  <Button
                    color="red"
                    onClick={() => handleDelete(table.id!)}
                    processing={processing === table.id}
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

export default TableListAdmin;
