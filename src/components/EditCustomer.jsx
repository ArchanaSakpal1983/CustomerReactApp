import React, { useState } from 'react';
import axios from 'axios';

const EditCustomer = ({ customerId, customerName, customerEmail }) => {
  const [name, setName] = useState(customerName);  // Pre-fill with customer name
  const [email, setEmail] = useState(customerEmail);  // Pre-fill with customer email
  const [successMessage, setSuccessMessage] = useState('');
  const API_KEY = import.meta.env.VITE_API_KEY;

  // Handle form submission for updating the customer
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedCustomer = {
        customerName: name,//Alice aaaa
        customerEmail: email, 
      };

      // PUT request to update the customer data on RestDB
      await axios.put(`https://demo2-d12f.restdb.io/rest/customers/${customerId}`, updatedCustomer, {
        headers: { 'x-apikey': API_KEY },
      });

      setSuccessMessage('Customer updated successfully!');
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  return (
    <div>
      <h2>Edit Customer</h2>

      {/* Form for editing customer details */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="customerName">Name:</label>
          <input
            type="text"
            id="customerName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="customerEmail">Email:</label>
          <input
            type="email"
            id="customerEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Customer</button>
      </form>

      {/* Success message */}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default EditCustomer;
