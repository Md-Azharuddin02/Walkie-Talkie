import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Auth/Register';
import Layout from './Layout/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />} />
      </Routes>
    </Router>
  );
}

export default App;