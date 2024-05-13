import { useEffect, useState } from 'react';
import { getStores } from '../utils/api';
import { Store as IStore } from './store.interface';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

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
      <Header>
        <h1>Stores</h1>
      </Header>
      {stores?.length === 0 ? (
        <p className="mb-5 text-slate-500">No stores were found</p>
      ) : (
        <>
          <p className="mb-5 text-slate-500">
            Please select a store to make a reservation
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {stores?.map((store) => (
              <Link to={`/stores/${store.id}`} key={store.id}>
                <div className="bg-gray-200 p-5 rounded-lg shadow-md">
                  {store.name}
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default StoreList;
