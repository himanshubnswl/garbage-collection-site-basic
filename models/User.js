const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  }

  static async create(userData) {
    const { username, email, address, password } = userData;
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO users (username, email, address, password) VALUES (?, ?, ?, ?)',
        [username, email, address, hashedPassword],
        (err, result) => {
          if (err) return reject(err);
          resolve(result.insertId);
        }
      );
    });
  }

  static comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
}

module.exports = User;
