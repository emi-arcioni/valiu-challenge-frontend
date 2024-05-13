import { ChangeEvent, useEffect, useState } from 'react';
import { Store } from '../stores/store.interface';
import { getStore, createStore, updateStore } from '../utils/api';
import { Link, useParams } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import Header from '../components/Header';
import Button from '../components/Button';
import Label from '../components/Label';
import Input from '../components/Input';
import ValidationError from '../components/ValidationError';
import { useToast } from '../components/ToastContext';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

function StoreFormAdmin() {
  const { storeId } = useParams();
  const { callToast } = useToast();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [store, setStore] = useState<Store>();

  const handleValueChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setStore((prevStore) => ({ ...prevStore, [field]: e.target.value }));
  };

  const handleSave = async () => {
    if (!store?.name) {
      setValidated(true);
      return;
    }

    setProcessing(true);
    
    if (storeId === 'new') {
      await createStore(store);
      callToast('Store successfully created');
    } else {
      await updateStore(store);
      callToast('Store successfully updated');
    }

    navigate('/admin/stores');
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
      <Header>
        <PageTitle title={storeId === 'new' ? 'New Store' : 'Edit Store'} />
        <Link to="/admin/stores">
          <Button color="gray">Cancel</Button>
        </Link>
      </Header>
      {!store ? (
        <Loading></Loading>
      ) : (
        <>
          <div className="mb-4">
            <Label>Name</Label>
            <Input
              className={validated && !store?.name && 'border-red-500'}
              type="text"
              value={store?.name ?? ''}
              onChange={(e) => handleValueChange(e, 'name')}
            />
            {validated && !store?.name && (
              <ValidationError>Please enter a name</ValidationError>
            )}
          </div>
          <div className="flex items-center justify-between">
            <Button onClick={handleSave} processing={processing}>Save</Button>
          </div>
        </>
      )}
    </>
  );
}

export default StoreFormAdmin;
