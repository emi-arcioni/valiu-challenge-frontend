import { Link, useLocation } from 'react-router-dom';
import NavButton from '../components/NavButton';

function Nav() {
  const location = useLocation();
  const currentPage = location.pathname.split('/').slice(2, 3)[0];

  return (
    <aside className="bg-gray-200 w-1/4 flex flex-col justify-start p-4">
      <ul className="space-y-2">
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
            <NavButton selected={currentPage === 'reservations'}>Reservations</NavButton>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Nav;
