import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditCustomer from './EditCustomer';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [showCustomers, setShowCustomers] = useState(false);  // State to toggle customer list visibility
  const [editingCustomer, setEditingCustomer] = useState(null);
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (showCustomers) {  // Only fetch customers if the list should be shown
      const fetchCustomers = async () => {
        try {
          const response = await axios.get('https://demo2-d12f.restdb.io/rest/customers', {
            headers: { 'x-apikey': API_KEY },
          });
          setCustomers(response.data);
        } catch (error) {
          console.error('Error fetching customers:', error);
        }
      };

      fetchCustomers();
    }
  }, [showCustomers, API_KEY]);

  // Handle the Edit button click
  const handleEditClick = (customer) => {
    setEditingCustomer(customer);
  };

  // Handle the Delete button click
  const handleDeleteClick = async (customerId, customerName) => {
    try {
      // Send DELETE request to the RestDB API
      await axios.delete(`https://demo2-d12f.restdb.io/rest/customers/${customerId}`, {
        headers: { 'x-apikey': API_KEY },
      });

      // Remove the deleted customer from the state
      setCustomers(customers.filter((customer) => customer._id !== customerId));

      // Show an alert confirming the deletion
      alert(`Customer ${customerName} has been deleted.`);
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={() => setShowCustomers(!showCustomers)}>
          {showCustomers ? 'Hide Customers' : 'Show All Customers'}
        </button>
      </div>

      {/* Conditionally render the customer list based on showCustomers state */}
      {showCustomers && (
        <div>
          <h1>Customer List</h1>
          <ul>
            {customers.map((customer) => (
              <li key={customer._id}>
                {customer.customerName} - {customer.customerEmail}
                <button onClick={() => handleEditClick(customer)}>Edit</button>
                <button onClick={() => handleDeleteClick(customer._id, customer.customerName)}>Delete</button>
              </li>
            ))}
          </ul>

          {/* Show EditCustomer component if a customer is being edited */}
          {editingCustomer && (
            <EditCustomer
              customerId={editingCustomer._id}
              customerName={editingCustomer.customerName}
              customerEmail={editingCustomer.customerEmail}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerList;
