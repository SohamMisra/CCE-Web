// Function to highlight active page in navbar
document.addEventListener('DOMContentLoaded', function() {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop();
    
    // Default highlight for home page or empty path
    if (!currentPage || currentPage === '' || currentPage === 'index.html') {
        document.getElementById('home-nav').style.color = '#ff6200';
    }
    
    // Highlight based on current page
    switch(currentPage) {
        case 'index.html':
            document.getElementById('home-nav').style.color = '#ff6200';
            break;
        case 'faculty.html':
            document.getElementById('faculty-nav').style.color = '#ff6200';
            break;
        case 'committee_members.html':
            document.getElementById('committee-nav').style.color = '#ff6200';
            break;
        case 'placements.html':
            document.getElementById('placements-nav').style.color = '#ff6200';
            break;
        case 'notes.html':
            document.getElementById('notes-nav').style.color = '#ff6200';
            break;
        case 'upcoming_events.html':
            document.getElementById('events-nav').style.color = '#ff6200';
            break;
        case 'about_us.html':
            document.getElementById('about-nav').style.color = '#ff6200';
            break;
    }
    
    // Handle mobile menu toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
    }
    
    // Close navbar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        const isClickInside = navbarToggler.contains(event.target) || 
                             navbarCollapse.contains(event.target);
        
        if (!isClickInside && navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        }
    });
    
    // Close navbar when clicking a nav link on mobile
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 991 && navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    });
}); 
