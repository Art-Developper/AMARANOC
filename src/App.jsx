import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 


import Home from './pages/HomePage';
// import About from "./pages/AboutPage"

function App() {
  return (
    <BrowserRouter> 

      <Routes>
        <Route path="/AMARANOC.git" element={<Home />} />
        {/* <Route path="/about" element={<AboutPage />} /> */}
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;