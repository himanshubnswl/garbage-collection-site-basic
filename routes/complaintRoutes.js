const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');
const authController = require('../controllers/authController');

// Apply authentication middleware to all complaint routes
router.use(authController.isAuthenticated);

// View all complaints (for user)
router.get('/', complaintController.getAllComplaints);

// Submit complaint routes
router.get('/submit', complaintController.getSubmitComplaint);
router.post('/submit', complaintController.postSubmitComplaint);

module.exports = router;