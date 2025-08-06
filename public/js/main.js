// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Auto-hide alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
      setTimeout(() => {
        alert.style.opacity = '0';
        setTimeout(() => {
          alert.style.display = 'none';
        }, 500);
      }, 5000);
    });
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  });

  const importance_waste_element = document.querySelector('.importance_waste');
  const importance_image_element = document.querySelector('.importance_waste_image');

  const importance_handler = () => {
    if(importance_image_element.classList.contains('visible')) {
      importance_image_element.classList.remove('visible');
    }
    else {
      importance_image_element.classList.add('visible');
    }
  };

  importance_waste_element.addEventListener('click', importance_handler);
  

