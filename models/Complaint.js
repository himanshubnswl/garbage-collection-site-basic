const db = require('../config/database');

class Complaint {
  static getByUserId(userId) {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM complaints WHERE user_id = ? ORDER BY submitted_date DESC', 
        [userId], 
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT c.*, u.username, u.email 
         FROM complaints c 
         JOIN users u ON c.user_id = u.id 
         ORDER BY c.submitted_date DESC`,
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM complaints WHERE id = ?', [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  }

  static create(complaintData) {
    const { userId, reason, address, description } = complaintData;
    
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO complaints (user_id, reason, address, description) VALUES (?, ?, ?, ?)',
        [userId, reason, address, description],
        (err, result) => {
          if (err) return reject(err);
          resolve(result.insertId);
        }
      );
    });
  }

  static updateStatus(id, status) {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE complaints SET status = ? WHERE id = ?',
        [status, id],
        (err, result) => {
          if (err) return reject(err);
          resolve(result.affectedRows > 0);
        }
      );
    });
  }
}

module.exports = Complaint;