import React from 'react';

type Props = {
  children: React.ReactNode;
  selected?: boolean;
}

const NavButton: React.FC<Props> = ({ children, selected = false }) => {
  let className =
    'w-full text-gray-600 border-gray-400 border hover:bg-gray-400 hover:text-white py-4 px-4 rounded text-left';
  if (selected) {
    className =
      'w-full border-gray-400 border bg-gray-400 text-white py-4 px-4 rounded text-left';
  }
  return <button className={className}>{children}</button>;
};

export default NavButton;
