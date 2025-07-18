// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar position-fixed p-3">
      <h5 className="mb-4 sidebar-title">Gestión de Contratos</h5>
      <ul className="nav flex-column">

        {/* DASHBOARD */}
        <li className="nav-item">
          <a className="nav-link" data-bs-toggle="collapse" href="#submenuDashboard" role="button">
            <i className="bi bi-speedometer2 me-2"></i> 
            <span className="sidebar-link-text">Dashboard</span>
          </a>
          <div className="collapse" id="submenuDashboard">
            <ul className="nav flex-column ms-3">
              <li><NavLink className="nav-link" to="/" end><span className="sidebar-link-text">Admin. Mandante</span></NavLink></li>
              <li><NavLink className="nav-link" to="/dashboard-contratista"><span className="sidebar-link-text">Admin. Contratista</span></NavLink></li>
            </ul>
          </div>
        </li>

        {/* NUEVO MENÚ DE ADMINISTRACIÓN */}
        <li className="nav-item">
          <a className="nav-link" data-bs-toggle="collapse" href="#submenuAdmin" role="button">
            <i className="bi bi-briefcase me-2"></i> 
            <span className="sidebar-link-text">Administración</span>
          </a>
          <div className="collapse" id="submenuAdmin">
            <ul className="nav flex-column ms-3">
              <li><NavLink className="nav-link" to="/contratos" end><span className="sidebar-link-text">Contratos</span></NavLink></li>
              {/* Dejamos el enlace a Empresas como placeholder por ahora */}
              <li><a className="nav-link text-muted" href="#"><span className="sidebar-link-text">Empresas</span></a></li>
            </ul>
          </div>
        </li>

        {/* ESTADOS DE PAGO */}
        <li className="nav-item">
          <a className="nav-link" data-bs-toggle="collapse" href="#submenuEstados" role="button">
            <i className="bi bi-receipt me-2"></i> 
            <span className="sidebar-link-text">Estados de Pago</span>
          </a>
          <div className="collapse" id="submenuEstados">
            <ul className="nav flex-column ms-3">
              <li><NavLink className="nav-link" to="/edp/nuevo"><span className="sidebar-link-text">Nuevo EDP</span></NavLink></li>
              <li><NavLink className="nav-link" to="/edp/revision"><span className="sidebar-link-text">Revisión</span></NavLink></li>
              <li><NavLink className="nav-link" to="/edp/historico"><span className="sidebar-link-text">Histórico</span></NavLink></li> 
            </ul>
          </div>
        </li>

        {/* USUARIOS */}
        <li className="nav-item mt-2">
          <NavLink className="nav-link" to="/usuarios">
            <i className="bi bi-people me-2"></i> 
            <span className="sidebar-link-text">Usuarios</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;