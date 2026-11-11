import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import authService from './Auth/auth.service';
import App from './App.jsx'

import './shared/assets/styles/main.scss';


const Index = () => {
  authService.useUserAuth();
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

async function startApp() {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Index />
    </StrictMode>,
  )
}

if (import.meta.env.VITE_WITH_SERVER) {
  console.log('Running with api server');
  authService.refreshToken().finally(startApp);
} else {
  console.log('No api server');
  startApp();
}