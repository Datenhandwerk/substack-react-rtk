import React from 'react';
import ReactDOM from 'react-dom/client';
import { SubstackProvider } from '../src/components/SubstackProvider';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SubstackProvider apiKey={'sk_live_f2e4f714932b4f2e82f9d8'}>
      <App />
    </SubstackProvider>
  </React.StrictMode>
);
