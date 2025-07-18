// src/context/ContratosContext.jsx
import React, { createContext, useState } from 'react';

// Datos iniciales que cargaremos en la aplicación
const datosIniciales = [
  {
    id: 'CT-2025-001',
    nombre: 'Mantención Eléctrica',
    mandante: 'Empresa A',
    proveedor: 'Contratista X',
    monto: '$15.000.000',
    vigencia: '01/01/2025 - 31/12/2025',
    estado: 'Activo',
  },
  {
    id: 'CT-2025-002',
    nombre: 'Instalación CCTV',
    mandante: 'Empresa B',
    proveedor: 'Proveedor Y',
    monto: '$8.000.000',
    vigencia: '15/02/2025 - 15/08/2025',
    estado: 'Pendiente',
  },
];

// 1. Creamos el Contexto, que es el "pizarrón" en sí.
export const ContratosContext = createContext();

// 2. Creamos el "Proveedor" del Contexto.
// Este es un componente que envuelve a nuestra aplicación y le provee los datos y funciones.
export const ContratosProvider = ({ children }) => {
  const [contratos, setContratos] = useState(datosIniciales);

  // Función para agregar un nuevo contrato a la lista
  const addContrato = (nuevoContrato) => {
    const contratoConId = {
      ...nuevoContrato,
      id: nuevoContrato.numeroContrato || `CT-2025-00${contratos.length + 1}`,
      monto: `$${parseInt(nuevoContrato.montoTotal || 0).toLocaleString('es-CL')}`,
      vigencia: `${nuevoContrato.fechaInicio} - ${nuevoContrato.fechaTermino}`,
      estado: 'Activo',
    };
    setContratos(contratosActuales => [...contratosActuales, contratoConId]);
  };

  // El proveedor "publica" la lista de contratos y la función para agregar uno nuevo.
  return (
    <ContratosContext.Provider value={{ contratos, addContrato }}>
      {children}
    </ContratosContext.Provider>
  );
};