// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Pages
import AdminPage from './containers/AdminPage';
import CustomerAccountPage from './containers/CustomerAccountPage';
import OrderPage from './containers/OrderPage';
import HomePage from './containers/HomePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext'; // Import the AuthProvider



// Create a theme instance.
const theme = createTheme({
  // You can customize your theme here. For example:
  palette: {
    primary: {
      main: '#eab676',
    },
    // Add additional color settings here
  },
  // Other theme overrides here
});


function App() {
  return (
    <AuthProvider> {/* Wrap your routes within AuthProvider */}
      <ThemeProvider theme={theme}>
        <Router>
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" component={Link} to="/">Home</Button>
              {/* Remove direct links to pages that should be protected */}
            </Toolbar>
          </AppBar>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/account" element={<CustomerAccountPage />} />
            {/* Protect these routes based on authentication state */}
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/order" element={<OrderPage />} />
          </Routes>
        </Router>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;


