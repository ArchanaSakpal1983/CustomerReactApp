import React, { useState } from 'react';
import axios from 'axios';
import AddButton from './AddButton';  // Import the AddButton component

const AddCustomer = () => {
  const [showForm, setShowForm] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const API_KEY = import.meta.env.VITE_API_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newCustomer = { customerName, customerEmail };
      await axios.post('https://demo2-d12f.restdb.io/rest/customers', newCustomer, {
        headers: { 'x-apikey': API_KEY },
      });

      setCustomerName('');
      setCustomerEmail('');
      setSuccessMessage('Customer added successfully!');
      setShowForm(false);
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  return (
    <div>
      {/* Button to toggle form visibility */}
      <AddButton showForm={showForm} toggleForm={() => setShowForm(!showForm)} />

      {/* Form for adding customer */}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="customerName">Name:</label>
            <input
              type="text"
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="customerEmail">Email:</label>
            <input
              type="email"
              id="customerEmail"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      )}

      {/* Success message (shown after the button) */}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default AddCustomer;
