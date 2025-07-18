// src/pages/RevisionEDP.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const edpPendientes = [
  { id: 'EP-001', contrato: 'Mantención Eléctrica (CT-2025-001)', proveedor: 'Contratista X', fecha: '01/06/2025', total: '$3.500.000' },
  { id: 'EP-002', contrato: 'Instalación CCTV (CT-2025-002)', proveedor: 'Proveedor Y', fecha: '05/06/2025', total: '$1.200.000' },
];

function RevisionEDP() {
  return (
    <div>
      <h4 className="mb-3">Estados de Pago Pendientes</h4>
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr><th>N° EDP</th><th>Contrato</th><th>Proveedor</th><th>Fecha</th><th>Total</th><th>Acciones</th></tr>
              </thead>
              <tbody>
                {edpPendientes.map(edp => (
                  <tr key={edp.id}>
                    <td>{edp.id}</td>
                    <td>{edp.contrato}</td>
                    <td>{edp.proveedor}</td>
                    <td>{edp.fecha}</td>
                    <td>{edp.total}</td>
                    <td>
                      <div className="btn-group">
                        <Link to={`/edp/detalle/${edp.id}`} className="btn btn-sm btn-outline-primary" title="Ver detalle"><i className="bi bi-eye"></i></Link>
                        <button className="btn btn-sm btn-outline-success"><i className="bi bi-check-circle"></i></button>
                        <button className="btn btn-sm btn-outline-danger"><i className="bi bi-x-circle"></i></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RevisionEDP;