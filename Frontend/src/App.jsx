import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Auth/Register';
import Layout from './Layout/Layout';
import TokenAuthenticate from './Auth/TokenAuthenticate';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <TokenAuthenticate>
            <Layout />
          </TokenAuthenticate>
        } />
      </Routes>
    </Router>
  );
}

export default App;