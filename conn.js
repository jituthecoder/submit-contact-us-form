
const mysql = require('mysql2');

// Create a connection pool

// host: 'srv608.hstgr.io',
// host: '193.203.166.175',
const pool = mysql.createPool({
  host: 'srv1439.hstgr.io',
  user: 'u845439951_w3leads',
  password: 'aA@1w3leads',
  database: 'u845439951_w3leads',
  connectionLimit: 10000000, // Adjust this based on your needs
});

// Listen for the 'error' event
pool.on('error', (err) => {
  console.error('Database connection error:', err);
});

module.exports = pool.promise(); // Export the promise-based pool