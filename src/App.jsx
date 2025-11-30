import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import ServicePage from './pages/ServicePage';
import DiscountPage from './pages/DiscountPage';
import ChatPage from './pages/Chat';
import About from "./pages/AboutPage";
import PropertyPage from "./components/PropertyPage";
import Map from "./components/Map.jsx"
import Login from './components/Login';
import Loader from './components/Loader';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer); 
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discounts" element={<DiscountPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/property/:id" element={<PropertyPage />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
