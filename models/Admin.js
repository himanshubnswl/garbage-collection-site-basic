const db = require('../config/database');
const bcrypt = require('bcryptjs');

class Admin {
  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM admin WHERE email = ?', [email], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM admin WHERE id = ?', [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  }

  static comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
}

module.exports = Admin;