// src/components/RecentOrders.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { toast } from 'react-toastify';

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Function to fetch orders
    const fetchOrders = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get('http://localhost:3000/recent-orders');
        setOrders(response.data); // Update state with the fetched orders
      } catch (error) {
        console.error('Error fetching orders', error);
        // Notify user of the error
        toast.error('Error fetching recent orders.', {
          position: "top-center",
          autoClose: 5000, 
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }
    };
    // Call the function
    fetchOrders();
  }, []); // The empty array ensures this effect runs once on mount
  return (
    <Container component="main" maxWidth="lg">
      <Paper elevation={6} style={{ margin: '16px', padding: '16px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Recent Orders
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell align="right">Customer ID</TableCell>
                <TableCell align="right">Coffee ID</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Order Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell component="th" scope="row">
                    {order.id}
                  </TableCell>
                  <TableCell align="right">{order.customer_id}</TableCell>
                  <TableCell align="right">{order.coffee_id}</TableCell>
                  <TableCell align="right">{order.quantity}</TableCell>
                  <TableCell align="right">{new Date(order.order_time).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default RecentOrders;
