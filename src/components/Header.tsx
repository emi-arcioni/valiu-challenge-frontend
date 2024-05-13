import React, { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
}

const Header: FC<Props> = ({ children }) => {
  return (
    <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-5">
      {children}
    </div>
  );
};

export default Header;
