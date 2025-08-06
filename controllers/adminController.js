const Complaint = require('../models/Complaint');

exports.getDashboard = async (req, res) => {
  try {
    const complaints = await Complaint.getAll();
    
    // Count pending and completed complaints
    const pendingCount = complaints.filter(c => c.status === 'pending').length;
    const completedCount = complaints.filter(c => c.status === 'completed').length;
    
    res.render('admin/dashboard', {
      title: 'Admin Dashboard',
      complaints,
      pendingCount,
      completedCount,
      success: req.query.success
    });
  } catch (err) {
    console.error(err);
    res.render('admin/dashboard', {
      title: 'Admin Dashboard',
      complaints: [],
      pendingCount: 0,
      completedCount: 0,
      error: 'Failed to fetch complaints'
    });
  }
};

exports.updateComplaintStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    
    if (status !== 'pending' && status !== 'completed') {
      return res.redirect('/admin/dashboard?error=Invalid status');
    }
    
    const success = await Complaint.updateStatus(id, status);
    
    if (success) {
      res.redirect('/admin/dashboard?success=Status updated successfully');
    } else {
      res.redirect('/admin/dashboard?error=Complaint not found');
    }
  } catch (err) {
    console.error(err);
    res.redirect('/admin/dashboard?error=Failed to update status');
  }
};