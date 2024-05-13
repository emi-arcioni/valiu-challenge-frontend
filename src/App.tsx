import React from 'react';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import StoreList from './stores/StoreList';
import StoreDetail from './stores/StoreDetail';
import StoreListAdmin from './admin/StoreList';
import StoreFormAdmin from './admin/StoreForm';
import TableListAdmin from './admin/TableList';
import TableFormAdmin from './admin/TableForm';
import ReservationListAdmin from './admin/ReservationList';

function App() {
  return (
    <BrowserRouter>
      <h1>Valiu Challenge</h1>
      <div>
        <Link to="/">User</Link> | <Link to="/admin/stores">Admin</Link>
      </div>
      <Routes>
        <Route path="/" element={<StoreList />} />
        <Route path="/stores/:storeId" element={<StoreDetail />} />

        <Route path="/admin/stores" element={<StoreListAdmin />} />
        <Route path="/admin/stores/:storeId" element={<StoreFormAdmin />} />
        <Route path="/admin/tables" element={<TableListAdmin />} />
        <Route path="/admin/tables/:tableId" element={<TableFormAdmin />} />
        <Route path="/admin/reservations" element={<ReservationListAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
