import React from 'react';
import ReactDOM from 'react-dom/client';
import { SubstackProvider } from '../src/components/SubstackProvider';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SubstackProvider
      apiKey={import.meta.env.VITE_SUBSTACK_API_KEY}
      apiUrl="https://api.substackapi.dev"
      publicationUrl={import.meta.env.VITE_SUBSTACK_PUBLICATION}>
      <App />
    </SubstackProvider>
  </React.StrictMode>
);
