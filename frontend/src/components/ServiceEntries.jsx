import { useState, useEffect } from 'react';

function ServiceEntries({ onEdit }) { // Simplified props
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/service/getAllServiceEntries');
      if (!response.ok) throw new Error('Failed to fetch entries');
      const data = await response.json();
      setEntries(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/service/deleteServiceEntry/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete entry');
      setEntries(entries.filter(entry => entry._id !== id));
    } catch (err) {
      alert('Error deleting entry: ' + err.message);
    }
  };

  if (loading) return <div className="loading">Loading entries...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="service-entries">
      <h3 className="service-bookings-heading">Service Bookings</h3>
      {entries.length === 0 ? (
        <p className="no-entries">No service bookings found.</p>
      ) : (
        <div className="entries-grid">
          {entries.map((entry, index) => (
            <div key={entry._id} className="entry-card">
              <div className="entry-details">
                <p><strong>Sr No:</strong> {index + 1}</p>
                <p><strong>Name:</strong> {entry.customerName || <span>No Name</span>}</p>
                <p><strong>Bike:</strong> {entry.bikeModel || <span>N/A</span>}</p>
                <p><strong>Number:</strong> {entry.bikeNumber || <span>N/A</span>}</p>
                <p><strong>Date:</strong> {entry.serviceDate ? new Date(entry.serviceDate).toLocaleDateString() : <span>N/A</span>}</p>
              </div>
              <div className="entry-actions">
                <button onClick={() => handleDelete(entry._id)} className="delete-btn">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ServiceEntries;
