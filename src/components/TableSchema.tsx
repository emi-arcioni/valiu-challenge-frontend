import { FC } from 'react';

type TableSchemaProps = {
  size: number;
  id: number;
  reservedFor?: number;
};

type ChairProps = {
  occupied: boolean;
};

const Chair: FC<ChairProps> = ({ occupied = false }) => {
  return (
    <div
      className={`w-5 h-5 mx-2 my-1 ${
        occupied ? 'border border-red-500 border-4' : 'bg-gray-400'
      }`}
    ></div>
  );
};

const TableSchema: FC<TableSchemaProps> = ({ size, id, reservedFor = 0 }) => {
  let customersLeft = reservedFor;

  const chairs = Array(size)
    .fill(null)
    .reduce((acc, value, index) => [...acc, index + 1], []);
  const mid = Math.ceil(chairs.length / 2);
  const top_chairs = chairs.slice(0, mid);
  const bottom_chairs = chairs.slice(mid);
  return (
    <div className="flex justify-center items-center my-3">
      <div className="grid">
        <div className="flex">
          {top_chairs.map((chair: number) => {
            customersLeft--;
            return <Chair key={chair} occupied={customersLeft >= 0} />;
          })}
        </div>
        <div className="flex justify-center items-center bg-gray-300 h-10">
          {id}
        </div>
        <div className="flex">
          {bottom_chairs.map((chair: number) => {
            customersLeft--;
            return <Chair key={chair} occupied={customersLeft >= 0} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default TableSchema;
