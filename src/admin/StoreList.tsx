import { useCallback, useEffect, useState } from 'react';
import { Store as IStore } from '../stores/store.interface';
import { deleteStore, getStores } from '../utils/api';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';
import { Table, Tbody, Td, Th, Thead, Tr } from '../components/Table';
import { useToast } from '../components/ToastContext';
import { AxiosError } from 'axios';
import Loading from '../components/Loading';
import InfiniteScroll from 'react-infinite-scroll-component';

function StoreListAdmin() {
  const { callToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<number>();
  const [stores, setStores] = useState<IStore[]>();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchStores = useCallback(async () => {
    const data = await getStores(page);
    setStores((s) => (s ? [...s, ...data] : data));
    if (!data.length) setHasMore(false);
    setLoading(false);
  }, [page]);

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  const handleDelete = async (storeId: number) => {
    try {
      /**
       * I've used basic confirmation prompt, maybe an improvement could be using stylized modals
       */
      if (storeId && window.confirm('Are you sure to delete this Store?')) {
        setProcessing(storeId);
        await deleteStore(storeId);
        fetchStores();
        callToast('Store successfully deleted');
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
        <h1>Stores</h1>
        <Link to="new">
          <Button>Add new</Button>
        </Link>
      </Header>
      {loading ? (
        <Loading></Loading>
      ) : stores?.length === 0 ? (
        <p>No stores were found</p>
      ) : (
        <>
          <Table>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th className="w-48">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {stores?.map((store) => (
                <Tr key={store.id}>
                  <Td>{store.id}</Td>
                  <Td>{store.name}</Td>
                  <Td>
                    <Link to={store.id + ''}>
                      <Button color="green">Edit</Button>
                    </Link>
                    <Button
                      color="red"
                      onClick={() => handleDelete(store.id!)}
                      processing={processing === store.id}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <InfiniteScroll
            dataLength={stores?.length ?? 0}
            next={() => setPage((p) => p + 1)}
            hasMore={hasMore}
            loader={<Loading></Loading>}
          > </InfiniteScroll>
        </>
      )}
    </>
  );
}

export default StoreListAdmin;
