// Event details data
const eventDetails = {
    'LogoRush': {
        title: 'LogoRush',
        date: 'August 14-17, 2025',
        description: 'The event focused on giving the access Logo a new, renovated look but still maintaining it\'s original essence. Participants worked with design tools to create modern, fresh interpretations of the ACCESS brand while preserving its core identity.',
        image: 'Events/LogoRush.webp'
    },
    'Militia': {
        title: 'Militia Battleground Arena',
        date: 'August 31, 2025',
        description: 'This is where our players got ready to fight, we had students from all over the college participating, with all our labs completely full. We mainly had two games Mini Militia and BGMI LAN EVENT. The competition was fierce with multiple rounds leading to an exciting finale!',
        image: 'Events/Militia.webp'
    },
    'DataStructures': {
        title: 'Data Structures Workshop',
        date: 'September 20, 2024',
        description: 'A comprehensive refresher session on Data Structures from linear to non-linear. The workshop covered arrays, linked lists, stacks, queues, trees, graphs, and advanced implementations. Practical examples and coding challenges were included to reinforce learning.',
        image: 'Events/DataStructures.webp'
    },
    'QuizWhiz': {
        title: 'Quiz Whiz Showdown',
        date: 'October 5, 2024',
        description: 'An interesting tech event, with three different rounds in which participants\' intellect were tested based on different criteria and chose the ultimate winner. The competition included technical knowledge, logical reasoning, and quick thinking challenges.',
        image: 'Events/QuizWhizShowdown.webp'
    },
    'AyudhaPooja': {
        title: 'Ayudha Pooja Celebration',
        date: 'October 7, 2024',
        description: 'A beautiful celebration for which whole of the CCE department comes together to pray and thank the almighty for all the blessings we have. The event included traditional rituals, sharing of prasad, and community bonding activities.',
        image: 'Events/GitHubWorkshop.webp'
    },
    'StartupWorkshop': {
        title: 'Navigating Indian Startup Landscape',
        date: 'October 19, 2024',
        description: 'A comprehensive workshop covering the reality of Indian startups. This workshop provided insights into the challenges and opportunities in the Indian startup ecosystem, featuring guest speakers from successful startups and interactive sessions on entrepreneurship.',
        image: 'Events/Startup.webp'
    },
    'GoodVibesGathering': {
        title: 'Good Vibes Gathering',
        date: 'October 30, 2024',
        description: 'A thoughtful attempt to bridge the gap between the juniors and seniors and have a wonderful session filled with experiences to inspire and grow together as a team. The event included team-building activities, sharing sessions, and fun games to foster connections.',
        image: 'Events/GoodVibesGathering.webp'
    },
    'GitHubWorkshop': {
        title: 'GitHub Workshop',
        date: 'November 18, 2024',
        description: 'Seniors taught the juniors the basic steps to use Git and GitHub. The workshop covered essential version control concepts, repository management, branching strategies, and collaborative workflows that are crucial for modern software development.',
        image: 'Events/GitHubWorkshop.webp'
    },
    'TechFusion': {
        title: 'Tech Fusion',
        date: 'January 11, 2025',
        description: 'An online event testing knowledge on CS Fundamentals like DS, OOPS, Data Communication. There were brainbuster riddles and puzzles. A creative interview round followed it to test situation based awareness of participants. Winners received certificates and prizes.',
        image: 'Events/TechFusion.webp'
    },
    'AccessFootball': {
        title: 'ACCESS Football League',
        date: 'January 25, 2025',
        description: 'An intra-branch football tournament which brought together seniors and juniors, fostering teamwork and camaraderie. The tournament featured multiple teams competing in a league format, culminating in an exciting final match and award ceremony.',
        image: 'Events/AccessFootball.webp'
    },
    'QuizOMania': {
        title: 'Quiz-O-Mania',
        date: 'February 1, 2025',
        description: 'An online technical quiz event featuring multiple rounds covering various aspects of computer science, technology trends, programming languages, and industry knowledge. Participants were challenged with increasingly difficult questions as they progressed through the rounds.',
        image: 'Events/Quizomania.webp'
    },
    'BollywoodMania': {
        title: 'Bollywood Mania',
        date: 'February 8, 2025',
        description: 'Bollywood Mania was a lighthearted and entertaining extravaganza that aimed to make lasting memories. With an exciting mix of games, songs, and activities, we laughed, and sang our hearts out. Events included Bollywood trivia, song recognition challenges, and dance competitions.',
        image: 'Events/BollywoodMania.webp'
    },
    'SpinfiniteLogic': {
        title: 'Spinfinite Logic',
        date: 'February 27, 2025',
        description: 'A coding event which included pattern programming with modifiers, a spinning wheel twist that decides an approach and a time bound task. Participants had to adapt their programming strategy based on the random challenges determined by the spinning wheel.',
        image: 'Events/Spin.webp'
    },
    'MemeWar': {
        title: 'Meme War',
        date: 'February 28, 2025',
        description: 'The event unfolded in two exciting rounds. The first round challenged participants to create the funniest meme for a given image, testing their ability to capture humor in a single frame. The second round upped the ante by requiring them to create a meme for a video—an even bigger challenge that demanded both creativity and impeccable timing.',
        image: 'Events/MemeWar.webp'
    },
    'SmokelessBites': {
        title: 'Smokeless Bites',
        date: 'March 7, 2025',
        description: 'A unique and exciting cooking event where creativity took center stage as participants cooked without fire! Teams of up to three members had just 1.5 hours to prepare a delicious spread. Judges evaluated dishes based on taste, presentation, creativity, and adherence to the no-fire cooking challenge.',
        image: 'Events/SmokelessBites.webp'
    },
    'PrepQuest': {
        title: 'PrepQuest',
        date: 'March 22, 2025',
        description: 'PrepQuest was a highly successful online event designed to upskill participants and help them excel in placements. The event featured a comprehensive set of challenges that focused on key areas necessary for career growth, including aptitude tests, coding challenges, and mock interviews.',
        image: 'Events/PrepQuest.webp'
    }
};

// Function to handle event details modal
function viewEventDetails(eventName) {
    const modal = document.getElementById('eventDetailsModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDate = document.querySelector('#modalDate span');
    const modalDescription = document.getElementById('modalDescription');
    
    // Set modal content based on event name
    const details = eventDetails[eventName] || {
        title: eventName,
        date: 'Upcoming',
        description: 'Details coming soon...',
        image: 'images/accesslogo.png'
    };
    
    // Update modal content
    modalImage.src = details.image;
    modalImage.alt = details.title;
    modalTitle.textContent = details.title;
    modalDate.textContent = details.date;
    modalDescription.textContent = details.description;
    
    // Show modal with animation
    modal.style.display = 'block';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

// Function to close event details modal
function closeEventDetails() {
    const modal = document.getElementById('eventDetailsModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('eventDetailsModal');
    if (event.target == modal) {
        closeEventDetails();
    }
};

// On document ready
document.addEventListener('DOMContentLoaded', function() {
    // Animated title effect
    const title = document.querySelector('.animated-title');
    if (title) {
        const text = "ACCESS Events";
        
        title.innerHTML = '';
        
        // Create individual spans for each letter with staggered animation
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i];
            span.style.animationDelay = (0.1 * i) + 's';
            title.appendChild(span);
        }
    }
    
    // ScrollReveal-like functionality for cards using Intersection Observer
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.event-card').forEach((card, index) => {
            card.style.setProperty('--card-order', index + 1);
            card.style.animationPlayState = 'paused';
            observer.observe(card);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        document.querySelectorAll('.event-card').forEach((card, index) => {
            card.style.setProperty('--card-order', index + 1);
            card.style.animationPlayState = 'running';
        });
    }
    
    // Navbar scroll effect
    function handleScroll() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Mobile menu toggle
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const menu = document.querySelector('.menu');
    
    if (hamburgerBtn && menu) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            menu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (hamburgerBtn && menu && !hamburgerBtn.contains(e.target) && !menu.contains(e.target)) {
                hamburgerBtn.classList.remove('active');
                menu.classList.remove('active');
            }
        });
        
        // Close menu when clicking a link
        document.querySelectorAll('.nav a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                menu.classList.remove('active');
            });
        });
    }
    
    // Add parallax effect to the bubbles
    function parallaxBubbles() {
        const bubbles = document.querySelectorAll('.bubble');
        const scrollY = window.scrollY;
        
        bubbles.forEach(bubble => {
            const speed = 0.2 + Math.random() * 0.3;
            const yPos = scrollY * speed;
            bubble.style.transform = `translateY(${-yPos}px)`;
        });
    }
    
    window.addEventListener('scroll', parallaxBubbles);
});
