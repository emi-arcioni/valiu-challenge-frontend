import { Link } from 'react-router-dom';

function Nav() {
  return (
    <ul>
      <li>
        <Link to="/admin/stores">Stores</Link>
      </li>
      <li>
        <Link to="/admin/tables">Tables</Link>
      </li>
      <li>
        <Link to="/admin/reservations">Reservations</Link>
      </li>
    </ul>
  );
}

export default Nav;
