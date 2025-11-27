import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import ServicePage from './pages/ServicePage';
import DiscountPage from './pages/DiscountPage';
import ChatPage from './pages/Chat';
import About from "./pages/AboutPage";
import PropertyPage from "./components/PropertyPage";
import Map from "./components/Map.jsx"
import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/AMARANOC.git" element={<Home />} />
        <Route path="/discounts"  element={<DiscountPage />}/>
        <Route path="/about" element={<About />} />
        <Route path='/services' element={<ServicePage />}/>
        <Route path='/chat' element={<ChatPage />}/>
        <Route path='/login' element={<Login />} />
        <Route path="/property/:id" element={<PropertyPage />} />
        <Route path='/map' element={<Map />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;