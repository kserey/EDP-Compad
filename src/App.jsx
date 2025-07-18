// src/App.jsx
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Navbar from './components/Navbar.jsx'; // Importamos la Navbar

function App() {
  return (
    <div>
      {/* Los componentes fijos van aquí */}
      <Sidebar />
      <Navbar />

      {/* El contenido principal ahora tiene un margen a la izquierda y un padding superior
          para no quedar oculto detrás del sidebar y la navbar */}
      <main style={{ marginLeft: '250px', paddingTop: '70px' }}>
        <div className="container-fluid px-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default App;