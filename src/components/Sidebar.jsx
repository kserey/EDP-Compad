// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/Sidebar.css';

function Sidebar({ isOpen, onClose }) {
  // Función para cerrar el sidebar si estamos en móvil
  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      onClose();
    }
  };

  return (
    <nav className={`sidebar d-flex flex-column p-1 ${isOpen ? 'show' : ''}`}>
      <h5 className="sidebar-title p-2">COMPAD</h5>
      <ul className="nav flex-column">
        {/* DASHBOARD */}
        <li className="nav-item">
          <a className="nav-link collapsed" data-bs-toggle="collapse" href="#submenuDashboard" role="button">
            <i className="bi bi-speedometer2 me-2"></i>Dashboard
          </a>
          <div className="collapse" id="submenuDashboard">
            <ul className="nav flex-column ms-3">
              <li><NavLink className="nav-link" to="/" end onClick={handleLinkClick}>ADC Mandante</NavLink></li>
              <li><NavLink className="nav-link" to="/dashboard-contratista" onClick={handleLinkClick}>ADC Contratista</NavLink></li>
            </ul>
          </div>
        </li>

        {/* ADMINISTRACIÓN */}
        <li className="nav-item">
          <a className="nav-link collapsed" data-bs-toggle="collapse" href="#submenuAdmin" role="button">
            <i className="bi bi-briefcase me-2"></i>Administración
          </a>
          <div className="collapse" id="submenuAdmin">
            <ul className="nav flex-column ms-3">
              <li><NavLink className="nav-link" to="/contratos" onClick={handleLinkClick}>Contratos</NavLink></li>
              <li><a className="nav-link text-muted" href="#" onClick={handleLinkClick}>Empresas</a></li>
            </ul>
          </div>
        </li>

        {/* ESTADOS DE PAGO */}
        <li className="nav-item">
          <a className="nav-link collapsed" data-bs-toggle="collapse" href="#submenuEstados" role="button">
            <i className="bi bi-receipt me-2"></i>Estados de Pago
          </a>
          <div className="collapse" id="submenuEstados">
            <ul className="nav flex-column ms-3">
              <li><NavLink className="nav-link" to="/edp/nuevo" onClick={handleLinkClick}>Nuevo EDP</NavLink></li>
              <li><NavLink className="nav-link" to="/edp/revision" onClick={handleLinkClick}>Revisión</NavLink></li>
              <li><NavLink className="nav-link" to="/edp/historico" onClick={handleLinkClick}>Histórico</NavLink></li>
            </ul>
          </div>
        </li>

        {/* USUARIOS */}
        <li className="nav-item mt-3 border-top">
          <NavLink className="nav-link" to="/usuarios" onClick={handleLinkClick}>
            <i className="bi bi-people me-2"></i>Usuarios
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
