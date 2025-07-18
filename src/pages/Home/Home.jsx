// src/pages/Home/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// Datos de ejemplo para el panel "Requiere tu Atención"
const attentionItems = [
    { type: 'edp', id: 'EP-001', text: 'EDP de "Contratista X" espera tu aprobación.', status: 'Pendiente' },
    { type: 'edp', id: 'EP-002', text: 'EDP de "InnovaTech S.A." necesita revisión.', status: 'Pendiente' },
    { type: 'contract', id: '001-A', text: 'Contrato "Mantenimiento Planta Quellón" vence en 5 meses.', status: 'Por Vencer' },
];

function Home() {
  return (
    <div className="container-fluid">
      {/* --- SECCIÓN DE BIENVENIDA Y ACCIONES RÁPIDAS --- */}
      <div className="p-4 mb-4 bg-light rounded-3">
        <div className="container-fluid py-3">
          <h1 className="display-6 fw-bold">¡Buenos días, Irina!</h1>
          <p className="col-md-8 fs-5">Aquí tienes un resumen de la actividad reciente y las tareas que requieren tu atención.</p>
          <div className="d-flex gap-2 mt-4">
            <Link to="/edp/revision" className="btn btn-primary btn-lg">
              <i className="bi bi-check2-square me-2"></i>Revisar EDPs Pendientes
            </Link>
            <Link to="/contratos" className="btn btn-outline-secondary btn-lg">
              <i className="bi bi-file-earmark-text me-2"></i>Ver Contratos
            </Link>
          </div>
        </div>
      </div>

      <div className="row align-items-md-stretch">
        {/* --- PANEL "REQUIERE TU ATENCIÓN" --- */}
        <div className="col-md-8 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-header">
              <h5><i className="bi bi-exclamation-triangle-fill text-warning me-2"></i>Requiere tu Atención</h5>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                {attentionItems.map(item => (
                  <Link to={item.type === 'edp' ? `/edp/detalle/${item.id}` : `/contratos/${item.id}`} key={item.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                    {item.text}
                    <span className={`badge ${item.status === 'Pendiente' ? 'bg-primary' : 'bg-warning text-dark'}`}>{item.status}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- PANEL "RESUMEN GENERAL" --- */}
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-header">
              <h5><i className="bi bi-bar-chart-line-fill text-success me-2"></i>Resumen General</h5>
            </div>
            <ul className="list-group list-group-flush p-2">
                <li className="list-group-item d-flex justify-content-between align-items-center fs-5">EDPs en Revisión <span className="badge bg-primary rounded-pill">2</span></li>
                <li className="list-group-item d-flex justify-content-between align-items-center fs-5">Monto en Revisión <span className="badge bg-primary rounded-pill">$4,700,000</span></li>
                <li className="list-group-item d-flex justify-content-between align-items-center fs-5">Contratos Activos <span className="badge bg-success rounded-pill">3</span></li>
                <li className="list-group-item d-flex justify-content-between align-items-center fs-5">Usuarios en Plataforma <span className="badge bg-secondary rounded-pill">4</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;