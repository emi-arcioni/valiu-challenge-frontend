import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Store as IStore } from './store.interface';
import { useCallback, useEffect, useState } from 'react';
import { createReservation, getStore } from '../utils/api';
import dayjs from 'dayjs';

function StoreDetail() {
  const { storeId } = useParams();
  const [storeRaw, setStoreRaw] = useState<IStore>();
  const [store, setStore] = useState<IStore>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [today] = useState(dayjs());
  const [customers, setCustomers] = useState<number>();

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
        tables: storeRaw.tables.map((table) => ({
          ...table,
          reservationForCurrentDate: table.reservations.find(
            (reservation) => reservation.date === date
          ),
        })),
      };
      setStore(store);
    }
  }, [storeRaw, date]);

  const makeReservation = async () => {
    if (!date || !customers || !store) return;

    try {
      await createReservation(date, customers, store);
      fetchStoreData();
    } catch (err) {}
  };

  return (
    <>
      <Link to="/">Back</Link>
      <h2>{store?.name}</h2>
      {store?.tables.length === 0 ? (
        <p>The store has no tables</p>
      ) : (
        <div>
          <ul>
            {dateList.map((dateValue) => (
              <li key={dateValue}>
                {dateValue !== date ? (
                  <Link to={`?date=${dateValue}`}>{dateValue}</Link>
                ) : (
                  dateValue
                )}
              </li>
            ))}
          </ul>
          <ul>
            {store?.tables.map((table) => (
              <li key={table.id}>
                Table #{table.id} - Size {table.size}
                {table.reservationForCurrentDate ? (
                  <div>
                    Reserved for {table.reservationForCurrentDate.customers} on{' '}
                    {dayjs(table.reservationForCurrentDate.created_at).format(
                      'YYYY-MM-DD HH:mm:ss'
                    )}
                  </div>
                ) : (
                  ''
                )}
              </li>
            ))}
          </ul>
          <div>
            <input
              type="number"
              min={1}
              placeholder="Customers"
              onChange={(e) => setCustomers(Number(e.target.value))}
            />
            <button onClick={makeReservation}>Make reservation</button>
          </div>
        </div>
      )}
    </>
  );
}

export default StoreDetail;
