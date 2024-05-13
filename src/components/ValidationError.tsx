import { FC } from 'react';

type Props = {
  children: string;
};

const ValidationError: FC<Props> = ({ children }) => {
  return <p className="mt-3 text-red-500 text-xs italic">{children}</p>;
};

export default ValidationError;
