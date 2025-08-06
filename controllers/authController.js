const User = require('../models/User');
const Admin = require('../models/Admin');

exports.getLogin = (req, res) => {
  res.render('login', { 
    title: 'Login',
    error: null
  });
};

exports.getSignup = (req, res) => {
  res.render('signup', { 
    title: 'Sign Up',
    error: null
  });
};

exports.postLogin = async (req, res) => {
  try {
    const { email, password, userType } = req.body;
    
    if (userType === 'admin') {
      // Admin login
      const admin = await Admin.findByEmail(email);
      
      if (!admin || !Admin.comparePassword(password, admin.password)) {
        return res.render('login', {
          title: 'Login',
          error: 'Invalid email or password'
        });
      }
      
      req.session.admin = admin;
      req.session.isAdmin = true;
      return res.redirect('/admin/dashboard');
    } else {
      // User login
      const user = await User.findByEmail(email);
      
      if (!user || !User.comparePassword(password, user.password)) {
        return res.render('login', {
          title: 'Login',
          error: 'Invalid email or password'
        });
      }
      
      req.session.user = user;
      return res.redirect('/complaints');
    }
  } catch (err) {
    console.error(err);
    res.render('login', {
      title: 'Login',
      error: 'Something went wrong, please try again'
    });
  }
};

exports.postSignup = async (req, res) => {
  try {
    const { username, email, address, password, confirmPassword } = req.body;
    
    // Validate input
    if (!username || !email || !address || !password) {
      return res.render('signup', {
        title: 'Sign Up',
        error: 'All fields are required'
      });
    }
    
    if (password !== confirmPassword) {
      return res.render('signup', {
        title: 'Sign Up',
        error: 'Passwords do not match'
      });
    }
    
    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    
    if (existingUser) {
      return res.render('signup', {
        title: 'Sign Up',
        error: 'Email already in use'
      });
    }
    
    // Create user
    const userId = await User.create({
      username,
      email,
      address,
      password
    });
    
    // Auto-login after signup
    const newUser = await User.findById(userId);
    req.session.user = newUser;
    
    res.redirect('/complaints');
  } catch (err) {
    console.error(err);
    res.render('signup', {
      title: 'Sign Up',
      error: 'Something went wrong, please try again'
    });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) console.error(err);
    res.redirect('/');
  });
};

// Middleware to protect routes
exports.isAuthenticated = (req, res, next) => {
  if (req.session.user || req.session.admin) {
    return next();
  }
  res.redirect('/auth/login');
};

exports.isAdmin = (req, res, next) => {
  if (req.session.isAdmin) {
    return next();
  }
  res.status(403).render('403', { title: 'Access Denied' });
};