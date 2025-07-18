// src/pages/EDP/DetalleEDP.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';

// -- Datos de Ejemplo Mejorados --
// Ahora incluyen EDPs pendientes e históricos en un solo lugar.
const mockEdpData = {
  // EDPs pendientes (vienen de la lista de revisión)
  'EP-001': { 
    id: 'EP-001', 
    contrato: 'CT-2025-001 - Mantención Eléctrica', 
    proveedor: 'Contratista X', 
    fechaEmision: '01/06/2025', 
    montoSolicitado: 3500000, 
    status: 'Pendiente', 
    observaciones: 'Se adjunta estado de pago correspondiente a los trabajos de mayo 2025.',
    items: [
      { id: '001', descripcion: 'Instalación de luminaria LED', unidad: 'u', cantidad: 50, precioUnitario: 20000, saldoContrato: 3000000 },
      { id: '002', descripcion: 'Mantenimiento de tablero', unidad: 'servicio', cantidad: 2, precioUnitario: 1250000, saldoContrato: 5000000 },
    ],
    adjuntos: [{ nombre: 'respaldo_fotos.zip', url: '#' }] 
  },
  'EP-002': { 
    id: 'EP-002', 
    contrato: 'CT-2025-002 - Instalación CCTV', 
    proveedor: 'Proveedor Y', 
    fechaEmision: '05/06/2025', 
    montoSolicitado: 1200000, 
    status: 'Pendiente', 
    observaciones: 'Trabajos de instalación de cámaras en sector B.',
    items: [
      { id: 'C-01', descripcion: 'Instalación cámara domo', unidad: 'u', cantidad: 10, precioUnitario: 120000, saldoContrato: 4000000 },
    ], 
    adjuntos: [] 
  },
  // EDPs históricos (vienen de la lista de histórico)
  'EP-003': { 
    id: 'EP-003', 
    contrato: 'CT-2025-001 - Mantención Eléctrica', 
    proveedor: 'Contratista X', 
    fechaEmision: '15/05/2025', 
    montoSolicitado: 2100000, 
    status: 'Aprobado',
    observaciones: 'Trabajos realizados en abril.',
    items: [{ id: '001', descripcion: 'Instalación de luminaria LED', unidad: 'u', cantidad: 105, precioUnitario: 20000, saldoContrato: 6000000 }], 
    adjuntos: [],
    approvalInfo: { user: 'Juan Pérez', date: '2025-05-16 10:30:00', comments: 'Aprobado sin observaciones.' }
  },
  'EP-004': {
    id: 'EP-004', 
    contrato: 'CT-2025-002 - Instalación CCTV', 
    proveedor: 'Proveedor Y', 
    fechaEmision: '20/05/2025', 
    montoSolicitado: 950000, 
    status: 'Rechazado',
    observaciones: 'Reparación de cámaras sector A.',
    items: [{ id: 'C-02', descripcion: 'Instalación sensor', unidad: 'u', cantidad: 5, precioUnitario: 190000, saldoContrato: 2000000 }], 
    adjuntos: [],
    approvalInfo: { user: 'Ana Gómez', date: '2025-05-21 15:00:00', comments: 'Se rechaza por falta de respaldos fotográficos. Favor reenviar.' }
  }
};


function DetalleEDP() {
  const { edpId } = useParams();
  const edp = mockEdpData[edpId];

  if (!edp) {
    return (
        <div>
            <h2>Estado de Pago no encontrado</h2>
            <Link to="/edp/revision">Volver a la lista de revisión</Link>
        </div>
    );
  }

  // Variable para saber si el EDP está pendiente o no
  const isPending = edp.status === 'Pendiente';

  return (
    <div>
      <h4 className="mb-3">Detalle Estado de Pago: {edp.id}</h4>

      {/* --- DATOS GENERALES --- */}
      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <div className="row mb-2">
            <div className="col-md-6"><strong>Contrato:</strong> {edp.contrato}</div>
            <div className="col-md-6"><strong>Proveedor:</strong> {edp.proveedor}</div>
          </div>
          <div className="row mb-2">
            <div className="col-md-6"><strong>Fecha de Emisión:</strong> {edp.fechaEmision}</div>
            <div className="col-md-6"><strong>Monto Total Solicitado:</strong> ${edp.montoSolicitado.toLocaleString('es-CL')}</div>
          </div>
          <div><strong>Observaciones del proveedor:</strong><br/>{edp.observaciones}</div>
        </div>
      </div>

      {/* --- TABLA DE ÍTEMS --- */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-light"><strong>Ítems Solicitados</strong></div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-bordered align-middle mb-0">
              <thead className="table-light">
                <tr><th>Ítem</th><th>Descripción</th><th>Unidad</th><th>Cantidad</th><th>Precio Unitario</th><th>Total Solicitado</th><th>Saldo en Contrato</th></tr>
              </thead>
              <tbody>
                {edp.items.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td><td>{item.descripcion}</td><td>{item.unidad}</td><td>{item.cantidad}</td>
                    <td>${item.precioUnitario.toLocaleString('es-CL')}</td>
                    <td>${(item.cantidad * item.precioUnitario).toLocaleString('es-CL')}</td>
                    <td>${item.saldoContrato ? item.saldoContrato.toLocaleString('es-CL') : 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* --- SECCIÓN DE ADJUNTOS --- */}
      <div className="mb-4">
        <strong>Archivos Adjuntos:</strong><br/>
        {edp.adjuntos.length > 0 ? (
          edp.adjuntos.map(adjunto => (
            <a key={adjunto.nombre} href={adjunto.url} className="btn btn-sm btn-outline-secondary me-2 mt-1"><i className="bi bi-paperclip"></i> {adjunto.nombre}</a>
          ))
        ) : ( <span className="text-muted">No hay archivos adjuntos.</span> )}
      </div>

      {/* --- NUEVA SECCIÓN: HISTORIAL DE APROBACIÓN (CONDICIONAL) --- */}
      {!isPending && (
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-light"><strong>Historial de Aprobación</strong></div>
          <div className="card-body">
            <p className="mb-1"><strong>Estado Final:</strong> <span className={`badge ${edp.status === 'Aprobado' ? 'bg-success' : 'bg-danger'}`}>{edp.status}</span></p>
            <p className="mb-1"><strong>Responsable:</strong> {edp.approvalInfo.user}</p>
            <p className="mb-1"><strong>Fecha y Hora:</strong> {edp.approvalInfo.date}</p>
            <p className="mb-1"><strong>Comentarios:</strong></p>
            <p className="text-muted fst-italic">"{edp.approvalInfo.comments}"</p>
          </div>
        </div>
      )}
      
      {/* --- BOTONES DE ACCIÓN (CONDICIONALES) --- */}
      {isPending && (
        <div className="d-flex justify-content-end">
          <button className="btn btn-danger me-2"><i className="bi bi-x-circle"></i> Rechazar</button>
          <button className="btn btn-warning me-2"><i className="bi bi-pencil-square"></i> Aprobar Parcial</button>
          <button className="btn btn-success"><i className="bi bi-check-circle"></i> Aprobar Totalmente</button>
        </div>
      )}
    </div>
  );
}

export default DetalleEDP;