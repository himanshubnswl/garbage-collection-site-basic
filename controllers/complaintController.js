const Complaint = require('../models/Complaint');

exports.getAllComplaints = async (req, res) => {
  try {
    // If it's a regular user, show only their complaints
    if (req.session.user && !req.session.isAdmin) {
      const complaints = await Complaint.getByUserId(req.session.user.id);
      res.render('complaints', {
        title: 'My Complaints',
        complaints,
        success: req.query.success
      });
    } else {
      // If it's an admin, this should never happen (admins use adminController)
      // but redirecting them to their dashboard just in case
      res.redirect('/admin/dashboard');
    }
  } catch (err) {
    console.error(err);
    res.render('complaints', {
      title: 'My Complaints',
      complaints: [],
      error: 'Failed to fetch complaints'
    });
  }
};

exports.getSubmitComplaint = (req, res) => {
  res.render('submit-complaint', {
    title: 'Submit Complaint',
    error: null
  });
};

exports.postSubmitComplaint = async (req, res) => {
  try {
    const { reason, address, description } = req.body;
    const userId = req.session.user.id;
    
    // Validate input
    if (!reason || !address || !description) {
      return res.render('submit-complaint', {
        title: 'Submit Complaint',
        error: 'All fields are required'
      });
    }
    
    // Create complaint
    await Complaint.create({
      userId,
      reason,
      address,
      description
    });
    
    res.redirect('/complaints?success=Complaint submitted successfully');
  } catch (err) {
    console.error(err);
    res.render('submit-complaint', {
      title: 'Submit Complaint',
      error: 'Failed to submit complaint'
    });
  }
};