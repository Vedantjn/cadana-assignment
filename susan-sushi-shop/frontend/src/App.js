import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PlaceOrder from './components/PlaceOrder';
import OrderedSushi from './components/OrderedSushi'; 
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlaceOrder />} />
        <Route path="/ordered-sushi" element={<OrderedSushi />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
