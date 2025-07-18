// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="position-fixed p-3" style={{ width: '250px', height: '100vh', backgroundColor: '#f8f9fa', borderRight: '1px solid #dee2e6' }}>
      <h5 className="mb-4">Gestión de Contratos</h5>
      <ul className="nav flex-column">

        {/* DASHBOARD */}
        <li className="nav-item">
          {/* Este es un Título de Menú, usa <a> para el colapso de Bootstrap */}
          <a className="nav-link" data-bs-toggle="collapse" href="#submenuDashboard" role="button">
            <i className="bi bi-speedometer2 me-2"></i> Dashboard
          </a>
          <div className="collapse" id="submenuDashboard">
            <ul className="nav flex-column ms-3">
              {/* Este es un Link de Navegación, usa <Link> de React Router */}
              <li><NavLink className="nav-link" to="/" end>Admin. Mandante</NavLink></li>
              <li><NavLink className="nav-link" to="/dashboard-contratista">Admin. Contratista</NavLink></li>
            </ul>
          </div>
        </li>

        {/* CONTRATOS */}
        <li className="nav-item">
          <a className="nav-link" data-bs-toggle="collapse" href="#submenuContratos" role="button">
            <i className="bi bi-file-earmark-text me-2"></i> Contratos
          </a>
          <div className="collapse" id="submenuContratos">
            <ul className="nav flex-column ms-3">
              <li><NavLink className="nav-link" to="/contratos" end>Registro</NavLink></li>
            </ul>
          </div>
        </li>

        {/* ESTADOS DE PAGO */}
        <li className="nav-item">
          <a className="nav-link" data-bs-toggle="collapse" href="#submenuEstados" role="button">
            <i className="bi bi-receipt me-2"></i> Estados de Pago
          </a>
          <div className="collapse" id="submenuEstados">
            <ul className="nav flex-column ms-3">
              <li><NavLink className="nav-link" to="/edp/nuevo">Nuevo EDP</NavLink></li>
              <li><NavLink className="nav-link" to="/edp/revision">Revisión</NavLink></li>
              <li><NavLink className="nav-link" to="/edp/historico">Histórico</NavLink></li> 
            </ul>
          </div>
        </li>

        {/* USUARIOS */}
        <li className="nav-item mt-2">
          <NavLink className="nav-link" to="/usuarios">
            <i className="bi bi-people me-2"></i> Usuarios
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;