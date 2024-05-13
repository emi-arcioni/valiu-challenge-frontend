import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Store as IStore } from './store.interface';
import { useCallback, useEffect, useState } from 'react';
import { createReservation, getStore } from '../utils/api';
import dayjs from 'dayjs';
import Header from '../components/Header';
import Button from '../components/Button';
import TableSchema from '../components/TableSchema';
import Label from '../components/Label';
import Input from '../components/Input';
import ValidationError from '../components/ValidationError';
import { useToast } from '../components/ToastContext';
import { AxiosError } from 'axios';

function StoreDetail() {
  const { storeId } = useParams();
  const { callToast } = useToast();
  const [storeRaw, setStoreRaw] = useState<IStore>();
  const [store, setStore] = useState<IStore>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [today] = useState(dayjs());
  const [customers, setCustomers] = useState<number>();
  const [validated, setValidated] = useState(false);
  const [processing, setProcessing] = useState(false);

  const date = searchParams.get('date');

  const dateList = Array(5)
    .fill(today)
    .map((value: dayjs.Dayjs, index) =>
      value.add(index, 'day').format('YYYY-MM-DD')
    );

  useEffect(() => {
    if (!date) setSearchParams({ date: today.format('YYYY-MM-DD') });
  }, [date, today, setSearchParams]);

  const fetchStoreData = useCallback(async () => {
    if (!storeId) return;

    const data = await getStore(Number(storeId));
    setStoreRaw(data);
  }, [storeId]);

  useEffect(() => {
    fetchStoreData();
  }, [fetchStoreData]);

  useEffect(() => {
    if (storeRaw && date) {
      const store = {
        ...storeRaw,
        tables: storeRaw.tables?.map((table) => ({
          ...table,
          reservationForCurrentDate: table.reservations?.find(
            (reservation) => reservation.date === date
          ),
        })),
      };
      setStore(store);
    }
  }, [storeRaw, date]);

  const makeReservation = async () => {
    if (!date || !customers || !store) {
      setValidated(true);
      return;
    }

    setProcessing(true);

    try {
      await createReservation(date, customers, store);
      fetchStoreData();
      callToast('Reservation successfully created');
    } catch (err) {
      const { response } = err as AxiosError;
      const { message } = response?.data as { message: string; status: number };

      callToast(message, 'error');
    }

    setValidated(false);
    setCustomers(undefined);
    setProcessing(false);
  };

  return (
    <>
      <Header>
        <h1>{store?.name}</h1>
        <Link to="/">
          <Button color="gray">Back</Button>
        </Link>
      </Header>
      {store?.tables?.length === 0 ? (
        <p>The store has no tables</p>
      ) : (
        <div>
          <div className="grid grid-cols-5 md:grid-cols-12 gap-4">
            {dateList.map((dateValue) => (
              <Link to={`?date=${dateValue}`} key={dateValue}>
                <div
                  className={`rounded ${
                    dateValue === date
                      ? 'bg-cyan-600 text-white'
                      : 'bg-gray-200'
                  } p-2`}
                  key={dateValue}
                >
                  <div className="text-lg font-bold text-center">
                    {dayjs(dateValue).format('DD')}
                  </div>
                  <div className="text-xs text-center">
                    {dayjs(dateValue).format("MMM 'YY")}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="my-4">
            <Label>Number of customers</Label>
            <Input
              className={validated && !customers && 'border-red-500'}
              type="number"
              min={1}
              placeholder="Eg: 2"
              value={customers ?? ''}
              onChange={(e) => setCustomers(Number(e.target.value))}
            />
            {validated && !customers && (
              <ValidationError>Please enter a number</ValidationError>
            )}
          </div>
          <div className="mb-4">
            <Button onClick={makeReservation} processing={processing}>
              Make reservation
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-5">
            {store?.tables?.map((table) => (
              <div
                key={table.id}
                className="bg-gray-100 border-gray-300 border rounded-md text-center overflow-hidden"
              >
                <TableSchema
                  size={table.size}
                  id={table.id!}
                  reservedFor={table.reservationForCurrentDate?.customers}
                />
                {table.reservationForCurrentDate && (
                  <div className="text-sm mt-3 bg-gray-300 text-slate-500 py-1">
                    Reserved {dayjs(table.reservationForCurrentDate.created_at).format(
                      'YYYY-MM-DD HH:mm:ss'
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default StoreDetail;
