// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pg = require('pg');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'apollo_db',
  password: 'mnp',
  port: 1521,
});

// Route to add login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userQuery = await pool.query(
      'SELECT * FROM Customers WHERE email = $1 AND password = $2',
      [email, password]
    );

    if (userQuery.rows.length > 0) {
      const user = userQuery.rows[0];
      // Assume the user with ID 1 is the admin
      const isAdmin = user.id === 1;
      res.json({ ...user, is_admin: isAdmin }); // Add the is_admin property to the response
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to add a new coffee
app.post('/add-coffee', async (req, res) => {
    const { name, size, price } = req.body;
    try {
      const newCoffee = await pool.query(
        'INSERT INTO Coffees (name, size, price) VALUES ($1, $2, $3) RETURNING *',
        [name, size, price]
      );
      res.json(newCoffee.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
  
  // Route to register a new customer
  app.post('/register', async (req, res) => {
    const { name, email, password } = req.body; // Implement proper password handling in production
    try {
      const newUser = await pool.query(
        'INSERT INTO Customers (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [name, email, password]
      );
      res.json(newUser.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
  
  // Route to place an order
  app.post('/place-order', async (req, res) => {
    const { customer_id, coffee_id, quantity } = req.body;
    try {
      const newOrder = await pool.query(
        'INSERT INTO Orders (customer_id, coffee_id, quantity) VALUES ($1, $2, $3) RETURNING *',
        [customer_id, coffee_id, quantity]
      );
      res.json(newOrder.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
  
  // Route to get the most recent 10 orders
  app.get('/recent-orders', async (req, res) => {
    try {
      const recentOrders = await pool.query(
        'SELECT * FROM Orders ORDER BY order_time DESC LIMIT 10'
      );
      res.json(recentOrders.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  // Route to get coffees

  /* 
  -- Coffees Table sql script
    CREATE TABLE Coffees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    size VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);
  */ 

  app.get('/coffees', async (req, res) => {
    try {
      const coffees = await pool.query(
        'SELECT * FROM Coffees ORDER BY id DESC'
      );
      res.json(coffees.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


  