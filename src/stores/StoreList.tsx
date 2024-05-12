import { useEffect, useState } from 'react';
import { getStores } from '../utils/api';
import { Store as IStore } from './store.interface';
import { Link } from 'react-router-dom';

function StoreList() {
  const [stores, setStores] = useState<IStore[]>();

  useEffect(() => {
    const fetch = async () => {
      const data = await getStores();
      setStores(data);
    };

    fetch();
  }, []);

  return (
    <>
      <h2>Stores</h2>
      {stores?.length === 0 ? (
        <p>No stores were found</p>
      ) : (
        <ul>
          {stores?.map((store) => (
            <li key={store.id}><Link to={`/stores/${store.id}`}>{store.name}</Link></li>
          ))}
        </ul>
      )}
    </>
  );
}

export default StoreList;
