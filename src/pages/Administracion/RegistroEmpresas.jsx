// src/pages/Administracion/RegistroEmpresas.jsx
import React, { useState } from 'react';
import EmpresaModal from './EmpresaModal';

const mockEmpresas = [
  { id: 1, nombre: 'Servicios Técnicos Sur Ltda.', rut: '76.123.456-7', direccion: 'Av. Principal 123, Puerto Montt', contacto: 'Ana Gómez', email: 'agomez@contratista.com', telefono: '+56987654321' },
  { id: 2, nombre: 'InnovaTech S.A.', rut: '77.987.654-K', direccion: 'Calle Falsa 456, Santiago', contacto: 'Carlos Tapia', email: 'ventas@innovatech.com', telefono: '+56221234567' },
];

function RegistroEmpresas() {
  const [empresas, setEmpresas] = useState(mockEmpresas);
  const [showModal, setShowModal] = useState(false);
  const [currentEmpresa, setCurrentEmpresa] = useState(null);

  const handleOpenModal = (empresa) => {
    setCurrentEmpresa(empresa);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentEmpresa(null);
  };

  const handleSave = (empresaData) => {
    if (currentEmpresa) {
      setEmpresas(empresas.map(e => (e.id === empresaData.id ? empresaData : e)));
    } else {
      const newEmpresa = { ...empresaData, id: Date.now() };
      setEmpresas([...empresas, newEmpresa]);
    }
    handleCloseModal();
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Registro de Empresas</h4>
        <button className="btn btn-primary" onClick={() => handleOpenModal(null)}>
          <i className="bi bi-plus-circle me-1"></i> Nueva Empresa
        </button>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr><th>Nombre</th><th>RUT</th><th>Contacto</th><th>Email</th><th>Acciones</th></tr>
              </thead>
              <tbody>
                {empresas.map(empresa => (
                  <tr key={empresa.id}>
                    <td>{empresa.nombre}</td>
                    <td>{empresa.rut}</td>
                    <td>{empresa.contacto}</td>
                    <td>{empresa.email}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => handleOpenModal(empresa)}>
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

      {showModal && (
        <EmpresaModal 
          empresa={currentEmpresa} 
          onClose={handleCloseModal} 
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default RegistroEmpresas;