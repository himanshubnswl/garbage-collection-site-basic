const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'admin', // Add your MySQL password if needed
  database : 'garbage_collection_db'
});

// Connect
db.connect((err) => {
  if(err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('MySQL Connected...');
  
  // Create tables if they don't exist
  createTables();
});

// Function to set up tables
function createTables() {
  // Create users table
  const userTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(100) NOT NULL UNIQUE,
      email VARCHAR(100) NOT NULL UNIQUE,
      address TEXT NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  
  // Create admin table
  const adminTable = `
    CREATE TABLE IF NOT EXISTS admin (
      id INT AUTO_INCREMENT PRIMARY KEY,
      adminname VARCHAR(100) NOT NULL UNIQUE,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  
  // Create complaints table
  const complaintsTable = `
    CREATE TABLE IF NOT EXISTS complaints (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      reason VARCHAR(100) NOT NULL,
      address TEXT NOT NULL,
      description TEXT NOT NULL,
      status ENUM('pending', 'completed') DEFAULT 'pending',
      submitted_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `;
  
  db.query(userTable, (err) => {
    if(err) throw err;
    console.log('Users table created or exists');
  });
  
  db.query(adminTable, (err) => {
    if(err) throw err;
    console.log('Admin table created or exists');
    
    // Check if there's at least one admin, if not create default admin
    db.query('SELECT * FROM admin LIMIT 1', (err, results) => {
      if(err) throw err;
      
      if(results.length === 0) {
        const bcrypt = require('bcryptjs');
        const hashedPassword = bcrypt.hashSync('admin123', 10);
        
        const defaultAdmin = {
          adminname: 'admin',
          email: 'admin@garbage.com',
          password: hashedPassword
        };
        
        db.query('INSERT INTO admin SET ?', defaultAdmin, (err) => {
          if(err) throw err;
          console.log('Default admin created');
        });
      }
    });
  });
  
  db.query(complaintsTable, (err) => {
    if(err) throw err;
    console.log('Complaints table created or exists');
  });
}

module.exports = db;
