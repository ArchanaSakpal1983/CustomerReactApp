import React from 'react';

const AddButton = ({ showForm, toggleForm }) => {
  return (
    <button onClick={toggleForm}>
      {showForm ? 'Hide Form' : 'Add Customer'}
    </button>
  );
};

export default AddButton;