// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './assets/index.css';

// 1. Asegúrate de que el Provider esté importado
import { ContratosProvider } from './context/ContratosContext.jsx';

// Tus importaciones de páginas
import App from './App.jsx';
import Home from './pages/Home/Home.jsx';
import Dashboard from './pages/Dashboards/Dashboard.jsx';
import RegistroContratos from './pages/Contratos/RegistroContratos.jsx';
import RevisionEDP from './pages/EDP/RevisionEDP.jsx';
import NuevoEDP from './pages/EDP/NuevoEDP.jsx';
import DetalleEDP from './pages/EDP/DetalleEDP.jsx';
import DashboardContratista from './pages/Dashboards/DashboardContratista.jsx';
import HistoricoEDP from './pages/EDP/HistoricoEDP.jsx'; 
import GestionUsuarios from './pages/Usuarios/GestionUsuarios.jsx';
import DetalleContrato from './pages/Contratos/DetalleContrato.jsx'; 
import RegistroEmpresas from './pages/Administracion/RegistroEmpresas.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'contratos', element: <RegistroContratos /> },
      { path: 'edp/revision', element: <RevisionEDP /> },
      { path: 'edp/nuevo', element: <NuevoEDP /> },
      { path: 'edp/detalle/:edpId', element: <DetalleEDP /> },
      { path: 'dashboard-mandante', element: <Dashboard /> },
      { path: 'dashboard-contratista', element: <DashboardContratista /> },
      { path: 'edp/historico', element: <HistoricoEDP /> },
      { path: 'usuarios', element: <GestionUsuarios /> },
      { path: 'contratos/:contractId', element: <DetalleContrato /> },
      { path: 'empresas', element: <RegistroEmpresas /> },
      
    ],
  },
  ],
  {
    basename: "/EDP-Compad/",
  }
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. El Provider DEBE envolver al RouterProvider */}
    <ContratosProvider>
      <RouterProvider router={router} />
    </ContratosProvider>
  </React.StrictMode>
);