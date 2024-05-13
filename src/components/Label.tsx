import { FC } from 'react';

type Props = {
  children: string;
};

const Label: FC<Props> = ({ children }) => {
  return (
    <label className="block text-gray-700 text-sm font-bold mb-2">
      {children}
    </label>
  );
};

export default Label;
