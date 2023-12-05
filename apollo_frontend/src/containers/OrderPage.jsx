// src/containers/OrderPage.jsx
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import OrderForm from '../components/OrderForm';


const OrderPage = () => {
    const [coffees, setCoffees] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {

        // Fetch the coffees as soon as the component is mounted
        const fetchCoffees = async () => {
            try {
                const response = await axios.get('http://localhost:3000/coffees');
                setCoffees(response.data);
            } catch (error) {
                console.error('Error fetching coffees', error);
            }
        };
        
        fetchCoffees();

    });
    return (
        <Container component="main" maxWidth="sm">
            <Paper elevation={6} style={{ margin: '16px', padding: '16px' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Place Your Coffee Order
                </Typography>
                <OrderForm coffees={coffees} setTotal={setTotal} />
                <Typography variant="h6">
                    Total: ${total.toFixed(2)}
                </Typography>
            </Paper>
        </Container>
    );
};

export default OrderPage;
