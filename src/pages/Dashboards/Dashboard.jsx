// src/pages/Dashboard.jsx
import React, { useState } from 'react'; // 1. Importamos useState para manejar el estado del filtro
import { Line } from 'react-chartjs-2';   // 2. Importamos el componente de gráfico de línea
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// 3. Registramos los componentes de Chart.js que vamos a usar. Es un paso necesario.
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// 4. Datos de ejemplo, los mismos que tenías en tu index.html
const datosContratos = {
  todos: {
    contratosActivos: 3,
    montoSaldo: 8500000,
    edpPendientes: 4,
    montoPendiente: 2100000,
    aprobadosMensuales: [500000, 700000, 650000, 800000, 900000, 600000, 750000, 700000, 680000, 720000, 690000, 740000],
  },
  "CT-2025-001": {
    contratosActivos: 1,
    montoSaldo: 3500000,
    edpPendientes: 2,
    montoPendiente: 1200000,
    aprobadosMensuales: [150000, 200000, 180000, 220000, 250000, 210000, 230000, 220000, 200000, 210000, 190000, 220000],
  },
  "CT-2025-002": {
    contratosActivos: 1,
    montoSaldo: 3000000,
    edpPendientes: 1,
    montoPendiente: 600000,
    aprobadosMensuales: [120000, 130000, 140000, 150000, 160000, 155000, 160000, 165000, 170000, 175000, 180000, 185000],
  },
};

function Dashboard() {
  // 5. Usamos useState para "recordar" qué filtro está seleccionado.
  // Por defecto, será 'todos'.
  const [filtro, setFiltro] = useState('todos');

  // Función que se ejecuta cuando el usuario cambia la selección del filtro
  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
  };

  // Obtenemos los datos que corresponden al filtro seleccionado
  const datosMostrados = datosContratos[filtro];

  // 6. Configuración para el gráfico
  const chartData = {
    labels: ['Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic', 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [{
      label: 'Monto Aprobado',
      data: datosMostrados.aprobadosMensuales,
      backgroundColor: 'rgba(13, 110, 253, 0.2)',
      borderColor: 'rgba(13, 110, 253, 1)',
      fill: true,
      tension: 0.3,
    }]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div>
      <h3 className="mb-4">Dashboard Administrador Mandante</h3>

      {/* Filtro de contrato */}
      <div className="mb-4">
        <label htmlFor="filtroContrato" className="form-label">Filtrar por Contrato:</label>
        <select id="filtroContrato" className="form-select" value={filtro} onChange={handleFiltroChange}>
          <option value="todos">Todos los contratos</option>
          <option value="CT-2025-001">CT-2025-001 - Mantención Eléctrica</option>
          <option value="CT-2025-002">CT-2025-002 - Instalación CCTV</option>
        </select>
      </div>

      {/* Indicadores (KPIs) */}
      <div className="row">
        <div className="col-md-3 mb-3"><div className="card text-white bg-primary p-3"><h5>Contratos Activos</h5><h2>{datosMostrados.contratosActivos}</h2></div></div>
        <div className="col-md-3 mb-3"><div className="card text-white bg-success p-3"><h5>Monto Saldo</h5><h2>${datosMostrados.montoSaldo.toLocaleString('es-CL')}</h2></div></div>
        <div className="col-md-3 mb-3"><div className="card text-black bg-warning p-3"><h5>EDP Pendientes</h5><h2>{datosMostrados.edpPendientes}</h2></div></div>
        <div className="col-md-3 mb-3"><div className="card text-white bg-danger p-3"><h5>Monto Pendiente</h5><h2>${datosMostrados.montoPendiente.toLocaleString('es-CL')}</h2></div></div>
      </div>

      {/* Gráfico */}
      <div className="card mt-4 shadow-sm">
        <div className="card-body">
          <h5 className="mb-3">Histórico de Montos Aprobados (últimos 12 meses)</h5>
          <Line options={chartOptions} data={chartData} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;