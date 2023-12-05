const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', // database username
  host: 'localhost',      // Database server (e.g., localhost)
  database: 'postgres', // database name
  password: 'mnp',  // database password
  port: 1521,             // database port
});

module.exports = pool;
