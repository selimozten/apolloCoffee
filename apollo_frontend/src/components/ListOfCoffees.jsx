// src/components/ListOfCoffees.jsx
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

const ListOfCoffees = () => {
  const [coffees, setCoffees] = useState([]);

  useEffect(() => {
    // Function to fetch coffees
    const fetchCoffees = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get('http://localhost:3000/coffees');
        setCoffees(response.data); // Update state with the fetched coffees
      } catch (error) {
        console.error('Error fetching coffees', error);
        // Notify user of the error
        toast.error('Error fetching coffees.', {
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
    fetchCoffees();
  }, []); // The empty array ensures this effect runs once on mount

  return (
    <Container component="main" maxWidth="lg">
      <Paper elevation={6} style={{ margin: '16px', padding: '16px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          List of Coffees
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Coffee ID</TableCell>
                <TableCell>Coffee Name</TableCell>
                <TableCell align="right">Size</TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coffees.map((coffee) => (
                <TableRow key={coffee.id}>
                  <TableCell component="th" scope="row">
                    {coffee.id}
                  </TableCell>
                  <TableCell>{coffee.name}</TableCell>
                  <TableCell align="right">{coffee.size}</TableCell>
                  <TableCell align="right">${coffee.price.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default ListOfCoffees;
