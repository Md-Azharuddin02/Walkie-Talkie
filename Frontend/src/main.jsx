import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { StoreProvider } from './Store/Store.jsx';
// Create a root for rendering the React app
createRoot(document.getElementById('root')).render(
    <StoreProvider>
      <App />
    </StoreProvider>
);