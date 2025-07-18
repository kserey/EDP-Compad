// src/pages/Administracion/EmpresaModal.jsx
import React, { useState } from 'react';

function EmpresaModal({ empresa, onClose, onSave }) {
  const [formData, setFormData] = useState({
    id: empresa ? empresa.id : null,
    nombre: empresa ? empresa.nombre : '',
    rut: empresa ? empresa.rut : '',
    direccion: empresa ? empresa.direccion : '',
    contacto: empresa ? empresa.contacto : '',
    email: empresa ? empresa.email : '',
    telefono: empresa ? empresa.telefono : '',
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
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">{empresa ? 'Editar Empresa' : 'Nueva Empresa'}</h5>
                <button type="button" className="btn-close" onClick={onClose}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre Empresa</label>
                  <input type="text" className="form-control" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="rut" className="form-label">RUT</label>
                  <input type="text" className="form-control" id="rut" name="rut" value={formData.rut} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="direccion" className="form-label">Dirección</label>
                  <input type="text" className="form-control" id="direccion" name="direccion" value={formData.direccion} onChange={handleChange} />
                </div>
                <hr />
                <h6 className="mb-3">Contacto Principal</h6>
                <div className="mb-3">
                  <label htmlFor="contacto" className="form-label">Nombre Contacto</label>
                  <input type="text" className="form-control" id="contacto" name="contacto" value={formData.contacto} onChange={handleChange} />
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="telefono" className="form-label">Teléfono</label>
                        <input type="text" className="form-control" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} />
                    </div>
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
    </>
  );
}

export default EmpresaModal;