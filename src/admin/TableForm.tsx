import { useParams } from 'react-router-dom';
import { Table } from '../tables/table.interface';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { createTable, getStores, getTable, updateTable } from '../utils/api';
import PageTitle from '../components/PageTitle';
import { Store } from '../stores/store.interface';

function TableFormAdmin() {
  const { tableId } = useParams();
  const [table, setTable] = useState<Table>();
  const [stores, setStores] = useState<Store[]>();

  const handleValueChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string
  ) => {
    let v: Store | string | undefined;
    if (field === 'store') {
      v = stores?.find((s) => s.id === Number(e.target.value));
    } else {
      v = e.target.value;
    }
    setTable((prevTable) => ({ ...prevTable!, [field]: v }));
  };

  const handleSave = async () => {
    if (!table?.size || !table?.store) return;

    if (tableId === 'new') {
      await createTable(table);
    } else {
      await updateTable(table);
    }
  };

  const getStoresData = useCallback(async () => {
    const data = await getStores();
    setStores(data);
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const tableData = await getTable(Number(tableId));
      setTable(tableData);
    };

    if (tableId === 'new') {
      setTable({ size: 1 });
    } else {
      fetch();
    }

    getStoresData();
  }, [tableId, getStoresData]);

  return (
    <>
      <PageTitle title={tableId === 'new' ? 'New Table' : 'Edit Table'} />
      <label>Size</label>
      <input
        name="size"
        value={table?.size ?? 1}
        onChange={(e) => handleValueChange(e, 'size')}
      />
      <select
        value={table?.store?.id}
        onChange={(e) => handleValueChange(e, 'store')}
      >
        <option value="">Select ...</option>
        {stores?.map((store) => (
          <option key={store.id} value={store.id}>
            {store.name}
          </option>
        ))}
      </select>
      <button onClick={handleSave}>Save</button>
    </>
  );
}

export default TableFormAdmin;
