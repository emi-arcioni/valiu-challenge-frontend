import { Link, useLocation } from 'react-router-dom';
import NavButton from '../components/NavButton';
import { useCallback, useEffect, useState } from 'react';
import MenuIcon from '../components/MenuIcon/MenuIcon';

function Nav() {
  const [navOpen, setNavOpen] = useState(true);
  const location = useLocation();
  const currentPage = location.pathname.split('/').slice(2, 3)[0];

  const handleNav = useCallback((forceClose: boolean) => {
    if (forceClose) {
      setNavOpen(false);
    } else {
      setNavOpen(n => !n);
    }
  }, []);

  useEffect(() => {
    handleNav(true);
  }, [handleNav, location]);

  return (
    <>
      <MenuIcon onClick={() => handleNav(false)} open={navOpen} />
      <aside
        className={`z-10 bg-gray-200 flex flex-col justify-start p-4 absolute h-screen w-64 left-0 transition duration-300 md:relative md:w-1/4 md:translate-x-0 ${
          !navOpen && '-translate-x-full'
        }`}
      >
        <ul className="space-y-2 mt-12 md:mt-0">
          <li>
            <Link to="/admin/stores">
              <NavButton selected={currentPage === 'stores'}>Stores</NavButton>
            </Link>
          </li>
          <li>
            <Link to="/admin/tables">
              <NavButton selected={currentPage === 'tables'}>Tables</NavButton>
            </Link>
          </li>
          <li>
            <Link to="/admin/reservations">
              <NavButton selected={currentPage === 'reservations'}>
                Reservations
              </NavButton>
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
}

export default Nav;
