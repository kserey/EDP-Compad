// src/pages/Contratos/DetalleContrato.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';

// NOTA: Para este prototipo, duplicaremos la lista de contratos aquí.
// En una aplicación real, esta información vendría de una llamada a la API
// o de un Contexto global.
const contratosData = [
    { numeroContrato: "001-A", nombreContrato: "Mantenimiento Planta Quellón", mandante: "Marine Farm", proveedor: "Servicios Técnicos Sur Ltda.", fechaInicio: "2024-01-01", fechaTermino: "2024-12-31", moneda: "CLP", montoTotal: 120000000, adminMandante: "mandante@marine.cl", adminProveedor: "proveedor@servtecsur.cl", items: [ { descripcion: "Mantenimiento preventivo", unidad: "mes", cantidad: 12, precioUnitario: 10000000 } ]},
    { numeroContrato: "002-B", nombreContrato: "Suministro Equipos Informáticos", mandante: "Marine Farm", proveedor: "InnovaTech S.A.", fechaInicio: "2024-03-15", fechaTermino: "2024-09-15", moneda: "USD", montoTotal: 48000, adminMandante: "tecnica@marine.cl", adminProveedor: "ventas@innovatech.com", items: [ { descripcion: "Notebook Dell", unidad: "unidad", cantidad: 10, precioUnitario: 1200 }, { descripcion: "Monitor 27 pulgadas", unidad: "unidad", cantidad: 10, precioUnitario: 600 } ]}
    // ... aquí podrías agregar el resto de los contratos si quieres que todos funcionen en el detalle
];


function DetalleContrato() {
  const { contractId } = useParams(); // Obtiene el ID desde la URL
  const contrato = contratosData.find(c => c.numeroContrato === contractId);

  if (!contrato) {
    return <div><h2>Contrato no encontrado</h2><Link to="/contratos">Volver</Link></div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="mb-3">Detalle del Contrato: {contrato.nombreContrato}</h4>
        <Link to="/contratos" className="btn btn-secondary">Volver al Registro</Link>
      </div>
      
      {/* Tarjeta de Datos Generales */}
      <div className="card shadow-sm mb-4">
        <div className="card-header">Datos Generales</div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6"><p><strong>N° Contrato:</strong> {contrato.numeroContrato}</p></div>
            <div className="col-md-6"><p><strong>Mandante:</strong> {contrato.mandante}</p></div>
            <div className="col-md-6"><p><strong>Proveedor:</strong> {contrato.proveedor}</p></div>
            <div className="col-md-6"><p><strong>Monto Total:</strong> {contrato.moneda} ${contrato.montoTotal.toLocaleString('es-CL')}</p></div>
            <div className="col-md-6"><p><strong>Fecha Inicio:</strong> {contrato.fechaInicio}</p></div>
            <div className="col-md-6"><p><strong>Fecha Término:</strong> {contrato.fechaTermino}</p></div>
          </div>
        </div>
      </div>
      
      {/* Tarjeta con el Itemizado */}
      <div className="card shadow-sm mb-4">
        <div className="card-header">Itemizado</div>
        <div className="card-body">
          <table className="table">
            <thead><tr><th>Descripción</th><th>Unidad</th><th>Cantidad</th><th>P. Unitario</th><th>Total</th></tr></thead>
            <tbody>
              {contrato.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.descripcion}</td>
                  <td>{item.unidad}</td>
                  <td>{item.cantidad}</td>
                  <td>${item.precioUnitario.toLocaleString('es-CL')}</td>
                  <td>${(item.cantidad * item.precioUnitario).toLocaleString('es-CL')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tarjeta de Administradores */}
      <div className="card shadow-sm">
        <div className="card-header">Administradores del Contrato</div>
        <div className="card-body">
            <p><strong>Admin. Mandante:</strong> {contrato.adminMandante}</p>
            <p><strong>Admin. Proveedor:</strong> {contrato.adminProveedor}</p>
        </div>
      </div>
    </div>
  );
}

export default DetalleContrato;