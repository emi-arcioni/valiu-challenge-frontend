import React, { useEffect, useState } from 'react';
import './App.css';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import StoreList from './stores/StoreList';
import StoreDetail from './stores/StoreDetail';
import StoreListAdmin from './admin/StoreList';
import StoreFormAdmin from './admin/StoreForm';
import TableListAdmin from './admin/TableList';
import TableFormAdmin from './admin/TableForm';
import ReservationListAdmin from './admin/ReservationList';
import Nav from './admin/Nav';
import { ToastContext } from './components/ToastContext';
import { ToastContainer, toast, Slide } from 'react-toastify';

function App() {
  const [inAdmin, setInAdmin] = useState<boolean>();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.indexOf('/admin/') !== -1) {
      setInAdmin(true);
    } else {
      setInAdmin(false);
    }
  }, [location.pathname]);

  const callToast = (message: string, type = 'success') => {
    if (type === 'success') toast.success(message);
    if (type === 'error') toast.error(message);
  };

  return (
    <ToastContext.Provider value={{ callToast }}>
      <div className="flex flex-col h-screen">
        <div className="flex flex-1">
          {inAdmin && <Nav />}
          <main className="flex-1 p-4 mt-12 md:mt-0">
            <Routes>
              <Route path="/" element={<StoreList />} />
              <Route path="/stores/:storeId" element={<StoreDetail />} />

              <Route path="/admin/stores" element={<StoreListAdmin />} />
              <Route
                path="/admin/stores/:storeId"
                element={<StoreFormAdmin />}
              />
              <Route path="/admin/tables" element={<TableListAdmin />} />
              <Route
                path="/admin/tables/:tableId"
                element={<TableFormAdmin />}
              />
              <Route
                path="/admin/reservations"
                element={<ReservationListAdmin />}
              />
            </Routes>
          </main>
        </div>
        <footer className="flex justify-between text-sm text-gray-600 border-t py-2 px-5 border-gray-300">
          <div>
            <Link to="/" className={`text-blue-600 ${!inAdmin && 'font-bold'}`}>
              User
            </Link>{' '}
            |{' '}
            <Link
              to="/admin/stores"
              className={`text-blue-600 ${inAdmin && 'font-bold'}`}
            >
              Admin
            </Link>
          </div>
          <div>Stores Admin v1.0 | Valiu Challenge</div>
        </footer>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Slide}
        />
      </div>
    </ToastContext.Provider>
  );
}

export default App;
