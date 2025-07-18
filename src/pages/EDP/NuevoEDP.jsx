// src/pages/NuevoEDP.jsx
import React, { useState } from 'react';

function NuevoEDP() {
  // Estado para los campos generales del EDP
  const [edpData, setEdpData] = useState({
    contrato: 'CT-2025-001',
    numeroEp: '',
    fechaEp: '',
    observaciones: '',
  });

  // 1. Estado para la lista de ítems. Comienza con una fila vacía.
  const [items, setItems] = useState([
    { descripcion: '', cantidad: 0, precioUnitario: 0 }
  ]);

  // Maneja cambios en los campos generales (contrato, fecha, etc.)
  const handleEdpChange = (e) => {
    const { name, value } = e.target;
    setEdpData(prevData => ({ ...prevData, [name]: value }));
  };

  // 2. Maneja cambios en los inputs DENTRO de la tabla de ítems
  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const list = [...items];
    list[index][name] = value;
    setItems(list);
  };

  // 3. Agrega una nueva fila (un nuevo objeto) a la lista de ítems
  const handleAddItem = () => {
    setItems([...items, { descripcion: '', cantidad: 0, precioUnitario: 0 }]);
  };

  // 4. Elimina una fila de la lista de ítems por su índice
  const handleRemoveItem = (index) => {
    const list = [...items];
    list.splice(index, 1);
    setItems(list);
  };
  
  // Maneja el envío del formulario completo
  const handleSubmit = (e) => {
    e.preventDefault();
    const fullEDP = { ...edpData, items: items };
    console.log("EDP Completo a enviar:", fullEDP);
    alert('EDP enviado a la consola. Revisa con F12.');
  };

  return (
    <div className="container" style={{ maxWidth: '950px' }}>
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Cargar Estado de Pago</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Selección de contrato */}
            <div className="mb-3">
              <label htmlFor="contrato" className="form-label">Contrato Asociado</label>
              <select className="form-select" id="contrato" name="contrato" value={edpData.contrato} onChange={handleEdpChange}>
                <option value="CT-2025-001">CT-2025-001 - Mantención Eléctrica</option>
                <option value="CT-2025-002">CT-2025-002 - Instalación CCTV</option>
              </select>
            </div>

            {/* Número y fecha del estado de pago */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="numeroEp" className="form-label">N° Estado de Pago</label>
                <input type="text" className="form-control" id="numeroEp" name="numeroEp" value={edpData.numeroEp} onChange={handleEdpChange} placeholder="Ej: EP-001" />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="fechaEp" className="form-label">Fecha de Emisión</label>
                <input type="date" className="form-control" id="fechaEp" name="fechaEp" value={edpData.fechaEp} onChange={handleEdpChange} />
              </div>
            </div>

            {/* Tabla de ítems dinámica */}
            <label className="form-label">Ítems a Cobrar</label>
            <div className="table-responsive mb-3">
              <table className="table table-bordered align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Descripción</th>
                    <th style={{width: '120px'}}>Cantidad</th>
                    <th style={{width: '180px'}}>Precio Unitario</th>
                    <th style={{width: '180px'}}>Total</th>
                    <th style={{width: '50px'}}></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td><input type="text" name="descripcion" className="form-control" value={item.descripcion} onChange={e => handleItemChange(index, e)} /></td>
                      <td><input type="number" name="cantidad" className="form-control" value={item.cantidad} onChange={e => handleItemChange(index, e)} /></td>
                      <td><input type="number" name="precioUnitario" className="form-control" value={item.precioUnitario} onChange={e => handleItemChange(index, e)} /></td>
                      <td><input type="text" className="form-control" readOnly value={`$${(item.cantidad * item.precioUnitario).toLocaleString('es-CL')}`} /></td>
                      <td>
                        {items.length > 1 &&
                          <button type="button" className="btn btn-sm btn-danger" onClick={() => handleRemoveItem(index)}><i className="bi bi-x-lg"></i></button>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button type="button" className="btn btn-sm btn-outline-primary" onClick={handleAddItem}>
                <i className="bi bi-plus-circle"></i> Agregar Ítem
              </button>
            </div>

            {/* Adjuntos */}
            <div className="mb-3">
              <label htmlFor="adjunto" className="form-label">Archivos Adjuntos (opcional)</label>
              <input type="file" className="form-control" id="adjunto" multiple />
            </div>

            {/* Observaciones */}
            <div className="mb-3">
              <label htmlFor="observaciones" className="form-label">Observaciones</label>
              <textarea className="form-control" id="observaciones" name="observaciones" value={edpData.observaciones} onChange={handleEdpChange} rows="3"></textarea>
            </div>

            {/* Botón enviar */}
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-success">
                <i className="bi bi-send"></i> Enviar Estado de Pago
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NuevoEDP;