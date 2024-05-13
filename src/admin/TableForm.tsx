import { Link, useNavigate, useParams } from 'react-router-dom';
import { Table } from '../tables/table.interface';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { createTable, getStores, getTable, updateTable } from '../utils/api';
import PageTitle from '../components/PageTitle';
import { Store } from '../stores/store.interface';
import { useToast } from '../components/ToastContext';
import Header from '../components/Header';
import Button from '../components/Button';
import Label from '../components/Label';
import Input from '../components/Input';
import Select from '../components/Select';
import Loading from '../components/Loading';

function TableFormAdmin() {
  const { tableId } = useParams();
  const { callToast } = useToast();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
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

    setProcessing(true);

    if (tableId === 'new') {
      await createTable(table);
      callToast('Table successfully created');
    } else {
      await updateTable(table);
      callToast('Table successfully updated');
    }

    navigate('/admin/tables');
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
      <Header>
        <PageTitle title={tableId === 'new' ? 'New Table' : 'Edit Table'} />
        <Link to="/admin/tables">
          <Button color="gray">Cancel</Button>
        </Link>
      </Header>
      {!table ? (
        <Loading></Loading>
      ) : (
        <>
          <div className="mb-4">
            <Label>Size</Label>
            <Input
              name="size"
              type="number"
              value={table?.size ?? 1}
              onChange={(e) => handleValueChange(e, 'size')}
            />
          </div>
          <div className="mb-4">
            <Label>Store</Label>
            <Select
              value={table?.store?.id}
              onChange={(e) => handleValueChange(e, 'store')}
            >
              <option value="">Select ...</option>
              {stores?.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.name}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <Button onClick={handleSave} processing={processing}>
              Save
            </Button>
          </div>
        </>
      )}
    </>
  );
}

export default TableFormAdmin;
