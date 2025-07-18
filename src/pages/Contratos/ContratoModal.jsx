// src/pages/Contratos/ContratoModal.jsx
import React, { useState, useMemo, useEffect } from 'react';

function ContratoModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    numeroContrato: '', nombreContrato: '', mandante: '', proveedor: '', fechaInicio: '',
    fechaTermino: '', moneda: 'CLP', adminMandante: '', adminProveedor: ''
  });
  const [items, setItems] = useState([{ descripcion: '', unidad: '', cantidad: 0, precioUnitario: 0 }]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const list = [...items];
    list[index][name] = value;
    setItems(list);
  };

  const handleAddItem = () => {
    setItems([...items, { descripcion: '', unidad: '', cantidad: 0, precioUnitario: 0 }]);
  };

  const handleRemoveItem = (index) => {
    if (items.length <= 1) return;
    const list = [...items];
    list.splice(index, 1);
    setItems(list);
  };

  const montoTotalCalculado = useMemo(() => {
    return items.reduce((total, item) => total + (item.cantidad * item.precioUnitario), 0);
  }, [items]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullContractData = { ...formData, items, montoTotal: montoTotalCalculado };
    onSave(fullContractData);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
        <div
          className="modal-dialog modal-xl"
          style={{
            maxHeight: '95vh',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            className="modal-content"
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              backgroundColor: '#fff',
              overflow: 'hidden',
              borderRadius: '0.5rem',
            }}
          >
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                overflow: 'hidden',
              }}
            >
              <div className="modal-header">
                <h5 className="modal-title">Nuevo Contrato</h5>
                <button type="button" className="btn-close" onClick={onClose}></button>
              </div>

              {/* Scroll interno */}
              <div
                className="modal-body"
                style={{
                  flex: '1 1 auto',
                  overflowY: 'auto',
                  padding: '1rem',
                }}
              >
                {/* FORM CONTENIDO */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>N° de Contrato</label>
                    <input type="text" name="numeroContrato" className="form-control" onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Nombre del Contrato</label>
                    <input type="text" name="nombreContrato" className="form-control" onChange={handleChange} required />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Mandante</label>
                    <input type="text" name="mandante" className="form-control" onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Proveedor / Contratista</label>
                    <input type="text" name="proveedor" className="form-control" onChange={handleChange} required />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Fecha de Inicio</label>
                    <input type="date" name="fechaInicio" className="form-control" onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Fecha de Término</label>
                    <input type="date" name="fechaTermino" className="form-control" onChange={handleChange} required />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Moneda</label>
                    <select name="moneda" className="form-select" value={formData.moneda} onChange={handleChange}>
                      <option value="CLP">CLP</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Monto Total Contrato</label>
                    <input type="text" className="form-control" readOnly value={`$${montoTotalCalculado.toLocaleString('es-CL')}`} />
                  </div>
                </div>

                <hr />
                <h6 className="mb-3">Itemizado del Contrato</h6>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead className="table-light">
                      <tr>
                        <th>Descripción</th>
                        <th>Unidad</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Total</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => (
                        <tr key={index}>
                          <td><input type="text" name="descripcion" className="form-control form-control-sm" value={item.descripcion} onChange={e => handleItemChange(index, e)} required /></td>
                          <td><input type="text" name="unidad" className="form-control form-control-sm" value={item.unidad} style={{ width: '80px' }} onChange={e => handleItemChange(index, e)} required /></td>
                          <td><input type="number" name="cantidad" className="form-control form-control-sm" value={item.cantidad} style={{ width: '100px' }} onChange={e => handleItemChange(index, e)} required /></td>
                          <td><input type="number" name="precioUnitario" className="form-control form-control-sm" value={item.precioUnitario} style={{ width: '150px' }} onChange={e => handleItemChange(index, e)} required /></td>
                          <td><input type="text" className="form-control form-control-sm" readOnly value={`$${(item.cantidad * item.precioUnitario).toLocaleString('es-CL')}`} /></td>
                          <td>{items.length > 1 && <button type="button" className="btn btn-sm btn-danger" onClick={() => handleRemoveItem(index)}><i className="bi bi-trash"></i></button>}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button type="button" className="btn btn-sm btn-outline-primary" onClick={handleAddItem}>
                  <i className="bi bi-plus-circle"></i> Agregar Ítem
                </button>

                <hr />
                <div className="row mt-3">
                  <div className="col-md-6 mb-3">
                    <label>Administrador Mandante</label>
                    <input type="email" name="adminMandante" className="form-control" onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Administrador Proveedor</label>
                    <input type="email" name="adminProveedor" className="form-control" onChange={handleChange} required />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Guardar Contrato</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContratoModal;
