// src/App.jsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Navbar from './components/Navbar.jsx';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div>
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <Navbar toggleSidebar={toggleSidebar} />

      <main className="main-layout">
        <div className="container-fluid px-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default App;
