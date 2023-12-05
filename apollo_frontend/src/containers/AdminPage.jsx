// src/containers/AdminPage.jsx
import React from 'react';
import AdminForm from '../components/AdminForm';
import RecentOrders from '../components/RecentOrders'; // Ensure this import is correct
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ListOfCoffees from '../components/ListOfCoffees';

const AdminPage = () => {
  return (
    <Container maxWidth="lg">
      <Paper elevation={6} style={{ margin: '16px', padding: '16px' }}>
        <Typography variant="h2" align="center" gutterBottom>
          ADMIN DASHBOARD
        </Typography>
        <AdminForm />
        <RecentOrders/> {/* This line includes the RecentOrders component */}
        
      </Paper>
    </Container>
  );
};

export default AdminPage;
