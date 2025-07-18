// src/pages/Usuarios/GestionUsuarios.jsx
import React, { useState, useEffect } from 'react';

// --- Datos de Ejemplo ---
const mockUsers = [
  { id: 1, name: 'Juan Pérez', email: 'jperez@mandante.com', role: 'Administrador Contrato Mandante', contractId: 'CT-2025-001', status: 'Activo' },
  { id: 2, name: 'Ana Gómez', email: 'agomez@contratista.com', role: 'Administrador Contrato Contratista', contractId: 'CT-2025-001', status: 'Activo' },
  { id: 3, name: 'Carlos Díaz', email: 'cdiaz@mandante.com', role: 'Rol Facultado Mandante', contractId: 'CT-2025-001', status: 'Activo' },
  { id: 4, name: 'Laura Soto', email: 'lsoto@mandante.com', role: 'Rol Administrativo', contractId: 'Todos', status: 'Inactivo' },
];

// Lista de roles disponibles para el formulario
const rolesDisponibles = [
  'Administrador Contrato Mandante',
  'Administrador Contrato Contratista',
  'Rol Facultado Mandante',
  'Rol Administrativo',
];

function GestionUsuarios() {
  const [users, setUsers] = useState(mockUsers);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Función para abrir el modal, ya sea para crear o editar
  const handleOpenModal = (user) => {
    setCurrentUser(user);
    setIsEditing(!!user); // Si hay un usuario, estamos editando
    setShowModal(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentUser(null);
  };

  // Función para manejar el guardado (crear o actualizar)
  const handleSave = (userData) => {
    if (isEditing) {
      // Lógica para actualizar un usuario existente
      setUsers(users.map(u => (u.id === userData.id ? userData : u)));
    } else {
      // Lógica para crear un nuevo usuario
      const newUser = { ...userData, id: Date.now(), status: 'Activo' }; // ID simple para el prototipo
      setUsers([...users, newUser]);
    }
    handleCloseModal();
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Gestión de Usuarios</h4>
        <button className="btn btn-primary" onClick={() => handleOpenModal(null)}>
          <i className="bi bi-plus-circle me-1"></i> Nuevo Usuario
        </button>
      </div>
      
      {/* Tabla de Usuarios */}
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr><th>Nombre</th><th>Email</th><th>Rol</th><th>Contrato Asociado</th><th>Estado</th><th>Acciones</th></tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.contractId}</td>
                    <td><span className={`badge ${user.status === 'Activo' ? 'bg-success' : 'bg-secondary'}`}>{user.status}</span></td>
                    <td>
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => handleOpenModal(user)}>
                        <i className="bi bi-pencil"></i> Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal para Crear/Editar Usuario */}
      {showModal && (
        <UserModal 
          user={currentUser} 
          onClose={handleCloseModal} 
          onSave={handleSave}
          roles={rolesDisponibles} 
        />
      )}
    </div>
  );
}

// --- Componente para el Modal ---
function UserModal({ user, onClose, onSave, roles }) {
    
  const [formData, setFormData] = useState({
    id: user ? user.id : null,
    name: user ? user.name : '',
    email: user ? user.email : '',
    role: user ? user.role : roles[0],
    contractId: user ? user.contractId : 'CT-2025-001',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">{user ? 'Editar Usuario' : 'Nuevo Usuario'}</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Nombre</label>
                <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="role" className="form-label">Rol</label>
                <select className="form-select" id="role" name="role" value={formData.role} onChange={handleChange}>
                  {roles.map(role => <option key={role} value={role}>{role}</option>)}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="contractId" className="form-label">Contrato Asociado</label>
                <select className="form-select" id="contractId" name="contractId" value={formData.contractId} onChange={handleChange}>
                  <option value="CT-2025-001">CT-2025-001</option>
                  <option value="CT-2025-002">CT-2025-002</option>
                  <option value="CT-2025-008">CT-2025-008</option>
                  <option value="Todos">Todos</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
              <button type="submit" className="btn btn-primary">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default GestionUsuarios;