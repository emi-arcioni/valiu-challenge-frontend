import { useCallback, useEffect, useState } from 'react';
import { Store as IStore } from '../stores/store.interface';
import { deleteStore, getStores } from '../utils/api';
import { Link } from 'react-router-dom';
import Nav from './Nav';

function StoreListAdmin() {
  const [stores, setStores] = useState<IStore[]>();

  const fetchStores = useCallback(async () => {
    const data = await getStores();
    setStores(data);
  }, []);

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  const handleDelete = async (storeId: number) => {
    try {
      await deleteStore(storeId);
      fetchStores();
    } catch (err) {}
  };

  return (
    <>
      <h2>Stores</h2>
      <Nav />
      <Link to="new">
        <button>Add new</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stores?.map((store) => (
            <tr key={store.id}>
              <td>{store.id}</td>
              <td>{store.name}</td>
              <td>
                <Link to={store.id + ''}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(store.id!)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default StoreListAdmin;
