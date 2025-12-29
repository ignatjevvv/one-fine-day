import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import UnicornLabelPatch from './UnicornLabelPath.jsx';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <UnicornLabelPatch />
  </StrictMode>,
);
