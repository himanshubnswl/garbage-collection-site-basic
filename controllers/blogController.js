exports.getHomePage = (req, res) => {
    // Barebones blog content - will be expanded by the user later
    const blogPosts = [
      {
        id: 1,
        title: 'Welcome to Our Garbage Collection System',
        content: 'This is a platform designed to manage garbage collection efficiently. Submit your complaints and we will handle them promptly.',
        date: '2023-01-15'
      },
      {
        id: 2,
        title: 'How to Use Our Complaint System',
        content: 'Login to your account, navigate to the complaints section, and submit your garbage collection complaints. Our team will review and address them as soon as possible.',
        date: '2023-01-20'
      },
      {
        id: 3,
        title: 'About Our Garbage Collection Initiative',
        content: 'Our mission is to keep the community clean and environmentally friendly. We provide timely garbage collection services and address all complaints promptly.',
        date: '2023-01-25'
      }
    ];
    
    res.render('home', { 
      title: 'Home',
      blogPosts
    });
  };