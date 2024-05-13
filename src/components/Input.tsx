import { FC } from 'react';

type Props = {
  name?: string;
  className?: string | false;
  type?: string;
  value?: string | number;
  onChange?: (e: any) => void;
  min?: number;
  placeholder?: string;
};

const Input: FC<Props> = ({
  name,
  className,
  type = 'text',
  value,
  onChange,
  min,
  placeholder,
}) => {
  return (
    <input
      name={name}
      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
      type={type}
      value={value}
      onChange={onChange}
      min={min}
      placeholder={placeholder}
    />
  );
};

export default Input;
