// src/App.jsx
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Navbar from './components/Navbar.jsx';

function App() {
  return (
    <div>
      <Sidebar />
      <Navbar />

      {/* Eliminamos los estilos en línea y usamos una clase */}
      <main className="main-layout">
        <div className="container-fluid px-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default App;