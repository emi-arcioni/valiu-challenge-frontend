import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StoreList from './stores/StoreList';
import StoreDetail from './stores/StoreDetail';

function App() {
  return (
    <BrowserRouter>
      <h1>
        Valiu Challenge
      </h1>
      <Routes>
        <Route path='/' element={<StoreList />} />
        <Route path='/stores/:storeId' element={<StoreDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
