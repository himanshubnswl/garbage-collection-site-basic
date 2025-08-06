const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');

// Apply admin authentication middleware to all admin routes
router.use(authController.isAuthenticated);
router.use(authController.isAdmin);

// Admin dashboard
router.get('/dashboard', adminController.getDashboard);

// Update complaint status
router.post('/update-status', adminController.updateComplaintStatus);

module.exports = router;