// Optimized star creation with requestAnimationFrame
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = 150; // Reduced for performance
    
    const fragment = document.createDocumentFragment();
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 2 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        star.style.animationDelay = Math.random() * 3 + 's';
        fragment.appendChild(star);
    }

    for (let i = 0; i < 6; i++) { // Reduced shooting stars
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        shootingStar.style.width = Math.random() * 150 + 100 + 'px';
        shootingStar.style.top = Math.random() * 60 + '%';
        shootingStar.style.left = '100%';
        shootingStar.style.animationDuration = (Math.random() * 2 + 1) + 's';
        shootingStar.style.animationDelay = Math.random() * 8 + 's';
        fragment.appendChild(shootingStar);
    }
    
    starsContainer.appendChild(fragment);
}

createStars();

// Optimized cursor with better performance
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-trail');
const glow = document.querySelector('.cursor-glow');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let followerX = mouseX;
let followerY = mouseY;

cursor.style.left = mouseX + 'px';
cursor.style.top = mouseY + 'px';
follower.style.left = mouseX + 'px';
follower.style.top = mouseY + 'px';
glow.style.left = mouseX + 'px';
glow.style.top = mouseY + 'px';

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
}, { passive: true });

// Optimized animation loop
function animateCursor() {
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
    glow.style.left = mouseX + 'px';
    glow.style.top = mouseY + 'px';
    
    const dxFollower = mouseX - followerX;
    const dyFollower = mouseY - followerY;
    followerX += dxFollower * 0.2;
    followerY += dyFollower * 0.2;
    
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor effects on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .card, .project-card, .tech-icon, .cta-button, .contact-item, .social-link');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        follower.style.width = '50px';
        follower.style.height = '50px';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.width = '10px';
        cursor.style.height = '10px';
        follower.style.width = '30px';
        follower.style.height = '30px';
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Optimized scroll animations with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Reduced parallax effect for nebulas (optional, can be removed for more performance)
let ticking = false;
document.addEventListener('mousemove', (e) => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const nebulas = document.querySelectorAll('.nebula');
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            nebulas.forEach((nebula, index) => {
                const speed = (index + 1) * 20; // Reduced movement
                const x = (mouseX - 0.5) * speed;
                const y = (mouseY - 0.5) * speed;
                nebula.style.transform = `translate(${x}px, ${y}px)`;
            });
            
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// Optimized ripple effect
document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    ripple.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 0;
        height: 0;
        border-radius: 50%;
        border: 2px solid var(--primary);
        pointer-events: none;
        z-index: 10000;
        transform: translate(-50%, -50%);
        animation: ripple-expand 0.6s ease-out;
    `;
    document.body.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-expand {
        0% {
            width: 0px;
            height: 0px;
            opacity: 1;
        }
        100% {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Modal functionality
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalCreated = document.getElementById('modalCreated');
const modalDescription = document.getElementById('modalDescription');
const modalLink = document.getElementById('modalLink');
const modalLinkSection = document.getElementById('modalLinkSection');
const modalClose = document.getElementById('modalClose');

// Add click event to all project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function() {
        const projectIndex = parseInt(this.getAttribute('data-project'));
        const project = projectData[projectIndex];
        
        // Populate modal with project data
        modalTitle.textContent = project.name;
        modalCreated.textContent = project.created;
        modalDescription.textContent = project.information;
        
        // Handle site link
        if (project.siteLink && project.siteLink.trim() !== '') {
            modalLink.href = project.siteLink;
            modalLinkSection.style.display = 'block';
        } else {
            modalLinkSection.style.display = 'none';
        }
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close modal when clicking close button
modalClose.addEventListener('click', closeModal);

// Close modal when clicking outside content
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}