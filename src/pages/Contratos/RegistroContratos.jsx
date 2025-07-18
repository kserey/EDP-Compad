// src/pages/Contratos/RegistroContratos.jsx
import React, { useState, useMemo } from 'react';
import ContratoModal from './ContratoModal';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const initialContracts = [
    { numeroContrato: "001-A", nombreContrato: "Mantenimiento Planta Quellón", proveedor: "Servicios Técnicos Sur Ltda.", fechaInicio: "2024-01-01", fechaTermino: "2024-12-31", moneda: "CLP", montoTotal: 120000000, items: [] },
    { numeroContrato: "002-B", nombreContrato: "Suministro Equipos Informáticos", proveedor: "InnovaTech S.A.", fechaInicio: "2025-03-15", fechaTermino: "2025-09-15", moneda: "USD", montoTotal: 48000, items: [] },
    { numeroContrato: "003-C", nombreContrato: "Servicio de Seguridad", proveedor: "Guardianes del Sur", fechaInicio: "2024-02-01", fechaTermino: "2025-08-31", moneda: "CLP", montoTotal: 90000000, items: [] }
];

function RegistroContratos() {
  const [showModal, setShowModal] = useState(false);
  const [contratos, setContratos] = useState(initialContracts);
  
  const [filters, setFilters] = useState({
    numero: '',
    nombre: '',
    proveedor: '',
  });

  const [sortConfig, setSortConfig] = useState({ key: 'fechaTermino', direction: 'ascending' });

  const dashboardData = useMemo(() => {
    const ahora = new Date();
    const anoActual = ahora.getFullYear();
    const dosMeses = new Date();
    dosMeses.setMonth(ahora.getMonth() + 2);

    let activos = 0;
    let inactivos = 0;
    let montoTotalActivosCLP = 0;
    const contratosPorMes = new Array(12).fill(0);
    const proximosAVencer = [];

    for (let mes = 0; mes < 12; mes++) {
      const inicioMes = new Date(anoActual, mes, 1);
      const finMes = new Date(anoActual, mes + 1, 0);
      contratos.forEach(c => {
        const fechaInicioContrato = new Date(c.fechaInicio);
        const fechaTerminoContrato = new Date(c.fechaTermino);
        if (fechaInicioContrato <= finMes && fechaTerminoContrato >= inicioMes) {
          contratosPorMes[mes]++;
        }
      });
    }
    
    contratos.forEach(c => {
      const fechaTermino = new Date(c.fechaTermino);
      if (fechaTermino > ahora) {
        activos++;
        const montoEnCLP = c.moneda === 'USD' ? c.montoTotal * 950 : c.montoTotal;
        montoTotalActivosCLP += montoEnCLP;
        if (fechaTermino <= dosMeses) {
          proximosAVencer.push(c);
        }
      } else {
        inactivos++;
      }
    });

    const saldoRestanteActivosCLP = montoTotalActivosCLP * 0.3;

    return { activos, inactivos, montoTotalActivosCLP, proximosAVencer, contratosPorMes, saldoRestanteActivosCLP };
  }, [contratos]);

  const sortedAndFilteredContratos = useMemo(() => {
    let filtered = contratos.filter(c => 
        c.numeroContrato.toLowerCase().includes(filters.numero.toLowerCase()) &&
        c.nombreContrato.toLowerCase().includes(filters.nombre.toLowerCase()) &&
        c.proveedor.toLowerCase().includes(filters.proveedor.toLowerCase())
    );

    if (sortConfig.key !== null) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return filtered;
  }, [contratos, filters, sortConfig]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleGuardarContrato = (nuevoContrato) => {
    setContratos(prev => [...prev, nuevoContrato]);
    setShowModal(false);
  };

  const anoActual = new Date().getFullYear();
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: `Contratos Vigentes por Mes (${anoActual})`, font: { size: 16 } },
    },
    scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
  };
  const chartData = {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      datasets: [{
          label: `Contratos Vigentes en ${anoActual}`,
          data: dashboardData.contratosPorMes,
          backgroundColor: 'rgba(13, 110, 253, 0.5)',
      }]
  };

  const SortableHeader = ({ label, columnKey }) => {
    const isSorted = sortConfig.key === columnKey;
    const icon = isSorted ? (sortConfig.direction === 'ascending' ? 'bi-sort-up' : 'bi-sort-down') : 'bi-filter';
    return <th onClick={() => handleSort(columnKey)} style={{ cursor: 'pointer' }}>{label} <i className={`bi ${icon}`}></i></th>;
  };

  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col-lg-8">
          <div className="row">
              <div className="col-md-3 mb-2">
                  <div className="card text-white bg-success p-2 h-100">
                      <h6>Contratos Activos</h6>
                      <h4>{dashboardData.activos}</h4>
                  </div>
              </div>
              <div className="col-md-3 mb-2">
                  <div className="card text-white bg-secondary p-2 h-100">
                      <h6>Contratos Inactivos</h6>
                      <h4>{dashboardData.inactivos}</h4>
                  </div>
              </div>
              <div className="col-md-3 mb-2">
                  <div className="card text-white bg-primary p-2 h-100">
                      <h6>Monto Total (Activos)</h6>
                      <h4>${dashboardData.montoTotalActivosCLP.toLocaleString('es-CL')}</h4>
                  </div>
              </div>
              <div className="col-md-3 mb-2">
                  <div className="card text-white bg-info p-2 h-100">
                      <h6>Saldo Restante (Activos)</h6>
                      <h4>${dashboardData.saldoRestanteActivosCLP.toLocaleString('es-CL')}</h4>
                  </div>
              </div>
          </div>
          <div className="row mt-3">
              <div className="col-12"><div className="card"><div className="card-body"><Bar data={chartData} options={chartOptions} /></div></div></div>
          </div>
        </div>
        <div className="col-lg-4">
            <div className="card h-100">
                <div className="card-header">Contratos Próximos a Vencer (60 días)</div>
                <div className="card-body">
                    {dashboardData.proximosAVencer.length > 0 ? (
                        <ul className="list-group list-group-flush">
                            {dashboardData.proximosAVencer.map(c => (
                                <li key={c.numeroContrato} className="list-group-item d-flex justify-content-between align-items-center">
                                    {c.nombreContrato} <span className="badge bg-warning text-dark">{c.fechaTermino}</span>
                                </li>
                            ))}
                        </ul>
                    ) : <p className="text-muted">No hay contratos por vencer pronto.</p>}
                </div>
            </div>
        </div>
      </div>
      <hr />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Registro de Contratos</h4>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}><i className="bi bi-plus-circle"></i> Nuevo Contrato</button>
      </div>
      <div className="card shadow-sm mb-4">
          <div className="card-body">
              <div className="row g-3">
                  <div className="col-md-4"><input type="text" name="numero" className="form-control" placeholder="Filtrar por N° Contrato..." value={filters.numero} onChange={handleFilterChange} /></div>
                  <div className="col-md-4"><input type="text" name="nombre" className="form-control" placeholder="Filtrar por nombre..." value={filters.nombre} onChange={handleFilterChange} /></div>
                  <div className="col-md-4"><input type="text" name="proveedor" className="form-control" placeholder="Filtrar por proveedor..." value={filters.proveedor} onChange={handleFilterChange} /></div>
              </div>
          </div>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <SortableHeader label="N° Contrato" columnKey="numeroContrato" />
              <SortableHeader label="Nombre" columnKey="nombreContrato" />
              <SortableHeader label="Proveedor" columnKey="proveedor" />
              <SortableHeader label="Fecha Inicio" columnKey="fechaInicio" />
              <SortableHeader label="Fecha Término" columnKey="fechaTermino" />
              <SortableHeader label="Monto Total" columnKey="montoTotal" />
              <SortableHeader label="Saldo Restante" columnKey="montoTotal" />
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sortedAndFilteredContratos.map((c) => (
              <tr key={c.numeroContrato}>
                <td>{c.numeroContrato}</td>
                <td>{c.nombreContrato}</td>
                <td>{c.proveedor}</td>
                <td>{c.fechaInicio}</td>
                <td>{c.fechaTermino}</td>
                <td>{`${c.moneda} $${c.montoTotal.toLocaleString('es-CL')}`}</td>
                <td>{`${c.moneda} $${(c.montoTotal * 0.3).toLocaleString('es-CL')}`}</td>
                <td><Link to={`/contratos/${c.numeroContrato}`} className="btn btn-sm btn-outline-primary" title="Ver Detalle"><i className="bi bi-eye"></i></Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (<ContratoModal onClose={() => setShowModal(false)} onSave={handleGuardarContrato} />)}
    </div>
  );
}

export default RegistroContratos;