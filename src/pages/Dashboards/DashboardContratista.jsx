// src/pages/Dashboard/DashboardContratista.jsx
import React, { useState } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

// Registramos todos los elementos de ChartJS que usaremos
ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// --- DATOS DE EJEMPLO PARA EL PROTOTIPO ---
const mockDataContratista = [
  {
    id: 'CT-2025-001',
    nombre: 'CT-2025-001 - Mantención Eléctrica',
    montoTotal: 15000000,
    partidas: [
      { nombre: 'Instalación Luminaria', montoGastado: 4500000 },
      { nombre: 'Mantenimiento Tableros', montoGastado: 2000000 },
      { nombre: 'Reparaciones Menores', montoGastado: 500000 },
    ],
    historicoEDP: [1200000, 1500000, 1000000, 1800000, 1500000]
  },
  {
    id: 'CT-2025-008',
    nombre: 'CT-2025-008 - Obras Civiles Menores',
    montoTotal: 8000000,
    partidas: [
      { nombre: 'Radieres', montoGastado: 2500000 },
      { nombre: 'Pintura', montoGastado: 1500000 },
    ],
    historicoEDP: [800000, 1000000, 1200000, 1000000]
  }
];

function DashboardContratista() {
  // Estado para saber qué contrato está seleccionado
  const [contratoSeleccionadoId, setContratoSeleccionadoId] = useState(mockDataContratista[0].id);

  // Buscamos los datos del contrato que está seleccionado
  const contratoActual = mockDataContratista.find(c => c.id === contratoSeleccionadoId);

  // --- Cálculos para las tarjetas ---
  const saldoUtilizado = contratoActual.partidas.reduce((sum, partida) => sum + partida.montoGastado, 0);
  const saldoRestante = contratoActual.montoTotal - saldoUtilizado;

  // --- Configuración para los gráficos ---
  const doughnutData = {
    labels: contratoActual.partidas.map(p => p.nombre),
    datasets: [{
      data: contratoActual.partidas.map(p => p.montoGastado),
      backgroundColor: ['#0d6efd', '#198754', '#ffc107', '#dc3545'],
    }],
  };

  const lineData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [{
      label: 'Monto Aprobado en EDP',
      data: contratoActual.historicoEDP,
      borderColor: '#0d6efd',
      backgroundColor: 'rgba(13, 110, 253, 0.2)',
      fill: true,
      tension: 0.3,
    }],
  };

  return (
    <div>
      <h3 className="mb-4">Dashboard Contratista</h3>

      {/* Filtro para seleccionar el contrato */}
      <div className="mb-4">
        <label htmlFor="filtroContrato" className="form-label"><b>Seleccionar Contrato:</b></label>
        <select 
          id="filtroContrato" 
          className="form-select" 
          value={contratoSeleccionadoId} 
          onChange={e => setContratoSeleccionadoId(e.target.value)}
        >
          {mockDataContratista.map(c => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>
      </div>

      {/* Tarjetas de Resumen (KPIs) */}
      <div className="row">
        <div className="col-lg-4 mb-3"><div className="card text-white bg-secondary p-3"><h5>Monto Total Contrato</h5><h2>${contratoActual.montoTotal.toLocaleString('es-CL')}</h2></div></div>
        <div className="col-lg-4 mb-3"><div className="card text-white bg-success p-3"><h5>Saldo Utilizado</h5><h2>${saldoUtilizado.toLocaleString('es-CL')}</h2></div></div>
        <div className="col-lg-4 mb-3"><div className="card text-white bg-info p-3"><h5>Saldo Restante</h5><h2>${saldoRestante.toLocaleString('es-CL')}</h2></div></div>
      </div>

      {/* Fila para los gráficos */}
      <div className="row mt-4">
        <div className="col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="mb-3">Distribución de Gastos por Partida</h5>
              <Doughnut data={doughnutData} />
            </div>
          </div>
        </div>
        <div className="col-lg-7">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="mb-3">Histórico de Montos Aprobados</h5>
              <Line data={lineData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardContratista;