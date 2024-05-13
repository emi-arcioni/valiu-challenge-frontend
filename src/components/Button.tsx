import React, { FC, ReactNode } from 'react';
import Loading from './Loading';

type Props = {
  children: ReactNode;
  color?: 'blue' | 'green' | 'red' | 'gray';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  processing?: boolean;
};

const Button: FC<Props> = ({
  children,
  color = 'blue',
  onClick = () => {},
  processing = false,
}) => {
  // Workaround: comment all the possible dynamic classes in order to Tailwinds compiler includes them in the bundle
  // bg-blue-500 hover:bg-blue-700 border-blue-700
  // bg-green-500 hover:bg-green-700 border-green-700
  // bg-red-500 hover:bg-red-700 border-red-700
  // bg-gray-500 hover:bg-gray-700 border-gray-700
  // bg-gray-400

  let className;
  if (!processing) {
    className = `bg-${color}-500 hover:bg-${color}-700 text-white py-2 px-4 mr-1 rounded border-b-4 border-${color}-700`;
  } else {
    className = `bg-gray-400 text-white py-2 px-4 mr-1 rounded border-b-4 border-gray-400`;
  }
  return (
    <button
      type="button"
      className={className}
      onClick={(e) => onClick(e)}
      disabled={processing === true}
    >
      {children}
      {processing && <Loading></Loading>}
    </button>
  );
};

export default Button;
