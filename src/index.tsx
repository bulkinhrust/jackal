import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { IslandProvider } from './context/IslandContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <IslandProvider>
      <App />
    </IslandProvider>
  </React.StrictMode>
);
