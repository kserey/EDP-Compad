// src/pages/EDP/HistoricoEDP.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// Datos de ejemplo para el historial
const edpHistoricos = [
  { id: 'EP-003', contrato: 'Mantención Eléctrica (CT-2025-001)', proveedor: 'Contratista X', fecha: '15/05/2025', total: '$2,100,000', status: 'Aprobado' },
  { id: 'EP-004', contrato: 'Instalación CCTV (CT-2025-002)', proveedor: 'Proveedor Y', fecha: '20/05/2025', total: '$950,000', status: 'Rechazado' },
  { id: 'EP-005', contrato: 'Obras Civiles Menores (CT-2025-008)', proveedor: 'Contratista Z', fecha: '25/05/2025', total: '$1,800,000', status: 'Aprobado Parcial' },
];

const getStatusBadge = (status) => {
    switch (status) {
        case 'Aprobado': return 'bg-success';
        case 'Rechazado': return 'bg-danger';
        case 'Aprobado Parcial': return 'bg-warning text-dark';
        default: return 'bg-secondary';
    }
};

function HistoricoEDP() {
  return (
    <div>
      <h4 className="mb-3">Histórico de Estados de Pago</h4>
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr><th>N° EDP</th><th>Contrato</th><th>Proveedor</th><th>Fecha</th><th>Total</th><th>Estado</th><th></th></tr>
              </thead>
              <tbody>
                {edpHistoricos.map(edp => (
                  <tr key={edp.id}>
                    <td>{edp.id}</td>
                    <td>{edp.contrato}</td>
                    <td>{edp.proveedor}</td>
                    <td>{edp.fecha}</td>
                    <td>{edp.total}</td>
                    <td><span className={`badge ${getStatusBadge(edp.status)}`}>{edp.status}</span></td>
                    <td>
                      <Link to={`/edp/detalle/${edp.id}`} className="btn btn-sm btn-outline-primary" title="Ver detalle">
                        <i className="bi bi-eye"></i>
                      </Link>
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

export default HistoricoEDP;