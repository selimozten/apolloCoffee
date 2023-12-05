// src/components/AdminForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box'; // Import Box from MUI

const AdminForm = () => {
  const [coffee, setCoffee] = useState({ name: '', size: '', price: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/add-coffee', coffee);
      console.log(response.data);
      // Handle success - maybe clear form or show a success message
    } catch (error) {
      console.error('Error adding coffee', error);
      // Handle error - show error message
    }
  };

  return (
    <Box
      
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // This aligns items horizontally in the center
        width: '100%', // Ensures the Box takes the full width
        '& > *': { // Applies styles to all direct children
          width: '100%', // Ensures full width for children, like input fields
          margin: '10px', // Adds vertical margin
        },
      }}
      noValidate
      autoComplete="off">
      <form onSubmit={handleSubmit}>
        <label>
          Coffee Name:
          <input
            type="text"
            value={coffee.name}
            onChange={(e) => setCoffee({ ...coffee, name: e.target.value })}
          />
        </label>
        <label>
          Size:
          <input
            type="text"
            value={coffee.size}
            onChange={(e) => setCoffee({ ...coffee, size: e.target.value })}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={coffee.price}
            onChange={(e) => setCoffee({ ...coffee, price: e.target.value })}
          />
        </label>
        <button type="submit">Add New Coffee</button>
      </form>
    </Box>
  );
};

export default AdminForm;
