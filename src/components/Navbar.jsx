// src/components/Navbar.jsx
import React from 'react';

function Navbar({ toggleSidebar }) {
  return (
    <nav className="navbar navbar-expand-lg bg-light px-3">
      {/* Botón Hamburguesa para móvil */}
      <button className="btn btn-outline-secondary d-md-none me-3" onClick={toggleSidebar}>
        <i className="bi bi-list"></i>
      </button>
      
      {/* Título */}
      <span className="navbar-brand mb-0 h1">Gestión de Estados de Pago</span>

      {/* --- CAMBIO AQUÍ: Contenedor para los botones de la derecha --- */}
      <div className="ms-auto d-flex align-items-center">
        <button className="btn btn-light" title="Notificaciones">
          <i className="bi bi-bell fs-5"></i>
        </button>
        {/* Aquí podrías agregar más botones en el futuro, como el perfil de usuario */}
      </div>
    </nav>
  );
}

export default Navbar;