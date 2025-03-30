// Add this script to your faculty.html page to create subtle floating particles

document.addEventListener('DOMContentLoaded', function() {
    // Create particles
    const particleCount = 40;
    const body = document.querySelector('body');
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        const xPos = Math.random() * window.innerWidth;
        const yPos = Math.random() * window.innerHeight;
        
        // Random size
        const size = Math.random() * 3 + 1;
        
        // Set styles
        particle.style.left = `${xPos}px`;
        particle.style.top = `${yPos}px`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        // Random animation duration
        const animDuration = Math.random() * 15 + 10;
        particle.style.animation = `float ${animDuration}s infinite ease-in-out`;
        
        // Add animation keyframes if not already added
        if (!document.querySelector('#particle-animation')) {
            const style = document.createElement('style');
            style.id = 'particle-animation';
            style.innerHTML = `
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0) translateX(0);
                        opacity: ${Math.random() * 0.5 + 0.1};
                    }
                    25% {
                        transform: translateY(-${Math.random() * 70 + 30}px) translateX(${Math.random() * 40 - 20}px);
                        opacity: ${Math.random() * 0.3 + 0.2};
                    }
                    50% {
                        transform: translateY(-${Math.random() * 50 + 20}px) translateX(${Math.random() * 40 - 20}px);
                        opacity: ${Math.random() * 0.5 + 0.3};
                    }
                    75% {
                        transform: translateY(-${Math.random() * 30 + 10}px) translateX(${Math.random() * 40 - 20}px);
                        opacity: ${Math.random() * 0.3 + 0.2};
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Add to body
        body.appendChild(particle);
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // Remove all particles
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => particle.remove());
        
        // Create new particles
        for (let i = 0; i < particleCount; i++) {
            createParticle();
        }
    });
});
