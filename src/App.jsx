import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Header from './components/Header';
// import Home from './Home';
// import About from "./pages/AboutPage"

function App() {
  return (
    <BrowserRouter> 
      <Header /> 
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/about" element={<AboutPage />} /> */}
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;