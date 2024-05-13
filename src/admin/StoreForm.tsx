import { ChangeEvent, useEffect, useState } from 'react';
import { Store } from '../stores/store.interface';
import { getStore, createStore, updateStore } from '../utils/api';
import { useParams } from 'react-router-dom';
import PageTitle from '../components/PageTitle';

function StoreFormAdmin() {
  const { storeId } = useParams();
  const [store, setStore] = useState<Store>();

  const handleValueChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setStore((prevStore) => ({ ...prevStore, [field]: e.target.value }));
  };

  const handleSave = async () => {
    if (!store?.name) return;

    if (storeId === 'new') {
      await createStore(store);
    } else {
      await updateStore(store);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const data = await getStore(Number(storeId));
      setStore(data);
    };

    if (storeId === 'new') {
      setStore({ name: '' });
    } else {
      fetch();
    }
  }, [storeId]);

  return (
    <>
      <PageTitle title={storeId === 'new' ? 'New Store' : 'Edit Store'} />
      <label>Name</label>
      <input
        name="name"
        value={store?.name || ''}
        onChange={(e) => handleValueChange(e, 'name')}
      />
      <button onClick={handleSave}>Save</button>
    </>
  );
}

export default StoreFormAdmin;
