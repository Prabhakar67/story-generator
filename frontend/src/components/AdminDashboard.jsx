import React from 'react';
import ServiceEntries from './ServiceEntries';
import '../styles/AdminDashboard.css';

const AdminDashboard = ({ adminToken, onLogout }) => (
  <div className="admin-section">
    <div className="admin-header">
      <h2>Admin Dashboard</h2>
      <button onClick={onLogout} className="logout-btn">
        Logout
      </button>
    </div>
    <ServiceEntries/>
  </div>
);

export default AdminDashboard;
