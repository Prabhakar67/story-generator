
import { useState } from 'react';
import './App.css';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import ServiceForm from './components/ServiceForm';
function App() {
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken'));

  const handleLogin = (data) => {
    if (data.roles && data.roles.includes('admin')) {
      setAdminToken(data.token);
      localStorage.setItem('adminToken', data.token);
    }
  };

  const handleAdminLogout = () => {
    setAdminToken(null);
    localStorage.removeItem('adminToken');
  };

  // Handler to reset to home view
  const handleHomeClick = () => {
    setAdminToken(null);
    localStorage.removeItem('adminToken');
  };

  return (
    <div className="container">
      <h1 onClick={handleHomeClick}>Morya Automobiles</h1>
      {!adminToken ? (
        (
          <>
            <ServiceForm />
            <Login onLogin={handleLogin} />
          </>
        )
      ) : (
        <AdminDashboard onLogout={handleAdminLogout} />
      )}
    </div>
  );
}

export default App;
