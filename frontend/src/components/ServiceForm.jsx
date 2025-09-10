import React, { useState } from 'react';
import '../styles/ServiceForm.css';

const ServiceForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    bikeModel: '',
    bikeNumber: '',
    serviceDate: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData, setFormData);
    } else {
      try {
        const response = await fetch('http://localhost:5000/api/service/saveServiceEntry', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          alert('Service booking confirmed at Morya Automobiles!');
          setFormData({
            customerName: '',
            bikeModel: '',
            bikeNumber: '',
            serviceDate: ''
          });
        } else {
          alert('Failed to create service entry');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while submitting the form');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="service-form">
      <div className="form-group">
        <label htmlFor="customerName">Customer Name:</label>
        <input
          type="text"
          id="customerName"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="bikeModel">Bike Model:</label>
        <input
          type="text"
          id="bikeModel"
          name="bikeModel"
          value={formData.bikeModel}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="bikeNumber">Bike Number:</label>
        <input
          type="text"
          id="bikeNumber"
          name="bikeNumber"
          value={formData.bikeNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="serviceDate">Service Date:</label>
        <input
          type="date"
          id="serviceDate"
          name="serviceDate"
          value={formData.serviceDate}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Book Service</button>
    </form>
  );
};

export default ServiceForm;
