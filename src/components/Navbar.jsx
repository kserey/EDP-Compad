// src/components/Navbar.jsx
import React from 'react';

function Navbar() {
  // Agregamos las clases para que la navbar se posicione correctamente
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top" style={{ marginLeft: '250px' }}>
      <div className="container-fluid">
        <span className="navbar-brand">Panel de Administración</span>
        <div className="d-flex align-items-center ms-auto">
          <button className="btn btn-light me-2" title="Notificaciones">
              <i className="bi bi-bell"></i>
          </button>
          <button className="btn btn-light" title="Perfil">
              <i className="bi bi-person-circle"></i>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;