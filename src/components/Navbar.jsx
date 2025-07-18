// src/components/Navbar.jsx
import React from 'react';

function Navbar({ toggleSidebar }) {
  return (
    <nav className="navbar navbar-expand-lg bg-light px-3">
      <button className="btn btn-outline-secondary d-md-none me-3" onClick={toggleSidebar}>
        <i className="bi bi-list"></i>
      </button>
      <span className="navbar-brand mb-0 h1">Gestión de Estados de Pago</span>
    </nav>
  );
}

export default Navbar;