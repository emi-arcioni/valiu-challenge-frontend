import { FC } from 'react';
import './MenuIcon.css';

type Props = {
  onClick?: (e: any) => void;
  open: boolean;
};

const MenuIcon: FC<Props> = ({ onClick, open }) => {
  return (
    <div
      onClick={onClick}
      className={`inline-block absolute p-4 left-0 z-10 md:hidden ${open && 'change'}`}
    >
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
  );
};

export default MenuIcon;
