const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login routes
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

// Signup routes
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);

// Logout route
router.get('/logout', authController.logout);

module.exports = router;