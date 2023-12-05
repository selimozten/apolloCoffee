// src/components/OrderForm.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

const OrderForm = ({ coffees, setTotal }) => {
  const { user } = useContext(AuthContext);
  const [order, setOrder] = useState({ coffee_id: '', quantity: 1 });

  const handleCoffeeChange = (event) => {
    const selectedCoffee = coffees.find(coffee => coffee.id === event.target.value);
    setOrder({ ...order, coffee_id: event.target.value });
    if (selectedCoffee) {
      setTotal(selectedCoffee.price * order.quantity);
    }
  };

  const handleQuantityChange = (event) => {
    const quantity = event.target.value;
    setOrder({ ...order, quantity });
    const selectedCoffee = coffees.find(coffee => coffee.id === order.coffee_id);
    if (selectedCoffee) {
      setTotal(selectedCoffee.price * quantity);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const orderToPlace = {
      customer_id: user?.id,
      ...order,
    };
    try {
      const response = await axios.post('http://localhost:3000/place-order', orderToPlace);
      console.log(response.data);
      // Handle additional logic for successful order placement if needed
    } catch (error) {
      console.error('Error placing order', error);
      // Handle order placement error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth margin="normal">
        <InputLabel id="coffee-select-label">Coffee</InputLabel>
        <Select
          labelId="coffee-select-label"
          id="coffee-select"
          value={order.coffee_id}
          label="Coffee"
          onChange={handleCoffeeChange}
        >
          {coffees.map((coffee) => (
            <MenuItem key={coffee.id} value={coffee.id}>
              {`${coffee.name} - $${coffee.price}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel id="quantity-label">Quantity</InputLabel>
        <Select
          labelId="quantity-label"
          id="quantity-select"
          value={order.quantity}
          label="Quantity"
          onChange={handleQuantityChange}
        >
          {[...Array(10).keys()].map((number) => (
            <MenuItem key={number + 1} value={number + 1}>
              {number + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Place Order
      </Button>
    </form>
  );  
};

export default OrderForm;
