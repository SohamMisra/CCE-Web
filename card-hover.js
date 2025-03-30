// Add this script to your faculty.html for enhanced card interactions

document.addEventListener('DOMContentLoaded', function() {
    // Get all faculty cards
    const cards = document.querySelectorAll('.faculty-card');
    
    // Add mouse move effect to each card
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            // Get card dimensions and position
            const rect = this.getBoundingClientRect();
            
            // Calculate mouse position relative to card center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            // Calculate rotation based on mouse position (limited to small values)
            const rotateX = (centerY - mouseY) / 20;
            const rotateY = (mouseX - centerX) / 20;
            
            // Apply the rotation and slight lift
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            
            // Add a subtle glow effect where the mouse is
            const photo = this.querySelector('.faculty-photo');
            if (photo) {
                const glowX = (mouseX / rect.width) * 100;
                const glowY = (mouseY / rect.height) * 100;
                photo.style.boxShadow = `
                    0 8px 16px rgba(0, 0, 0, 0.2),
                    0 0 30px 5px rgba(79, 79, 255, 0.2),
                    inset 0 0 15px 2px rgba(79, 79, 255, 0.1)
                `;
            }
        });
        
        // Reset transformations when mouse leaves
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            this.style.transition = 'all 0.5s ease';
            
            const photo = this.querySelector('.faculty-photo');
            if (photo) {
                photo.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
                photo.style.transition = 'all 0.5s ease';
            }
        });
        
        // Add quick reset when clicking
        card.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add click effect for read more buttons
    const readMoreButtons = document.querySelectorAll('.read-more');
    readMoreButtons.forEach(button => {
        button.addEventListener('mousedown', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            // Position the ripple where clicked
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size/2}px`;
            ripple.style.top = `${e.clientY - rect.top - size/2}px`;
            
            // Remove the ripple after animation completes
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add the ripple style if not already present
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.innerHTML = `
            .read-more {
                position: relative;
                overflow: hidden;
            }
            
            .ripple {
                position: absolute;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.4);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
});
