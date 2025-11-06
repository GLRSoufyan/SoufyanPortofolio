function createStars() {
            const starsContainer = document.getElementById('stars');
            const starCount = 200;
            
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
                starsContainer.appendChild(star);
            }

            // Create shooting stars
            for (let i = 0; i < 8; i++) {
                const shootingStar = document.createElement('div');
                shootingStar.className = 'shooting-star';
                shootingStar.style.width = Math.random() * 150 + 100 + 'px';
                shootingStar.style.top = Math.random() * 60 + '%';
                shootingStar.style.left = '100%';
                shootingStar.style.animationDuration = (Math.random() * 2 + 1) + 's';
                shootingStar.style.animationDelay = Math.random() * 8 + 's';
                starsContainer.appendChild(shootingStar);
            }
        }

        createStars();

        // Enhanced Custom Cursor - Fixed positioning
        const cursor = document.querySelector('.cursor');
        const follower = document.querySelector('.cursor-trail');
        const glow = document.querySelector('.cursor-glow');
        
        // Initialize positions
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let followerX = mouseX;
        let followerY = mouseY;
        
        // Set initial positions
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        follower.style.left = mouseX + 'px';
        follower.style.top = mouseY + 'px';
        glow.style.left = mouseX + 'px';
        glow.style.top = mouseY + 'px';

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth animation loop
        function animateCursor() {
            // Instant cursor
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
            glow.style.left = mouseX + 'px';
            glow.style.top = mouseY + 'px';
            
            // Smooth follower with easing
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
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });

        // Enhanced scroll animations
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, index * 100);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.card, .project-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(80px) scale(0.9)';
            el.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            observer.observe(el);
        });

        // 3D tilt effect on cards
        document.querySelectorAll('.card, .project-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });

        // Parallax effect for nebulas
        document.addEventListener('mousemove', (e) => {
            const nebulas = document.querySelectorAll('.nebula');
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            nebulas.forEach((nebula, index) => {
                const speed = (index + 1) * 30;
                const x = (mouseX - 0.5) * speed;
                const y = (mouseY - 0.5) * speed;
                nebula.style.transform = `translate(${x}px, ${y}px)`;
            });
        });

        // Add ripple effect on click
        document.addEventListener('click', (e) => {
            const ripple = document.createElement('div');
            ripple.style.position = 'fixed';
            ripple.style.left = e.clientX + 'px';
            ripple.style.top = e.clientY + 'px';
            ripple.style.width = '0px';
            ripple.style.height = '0px';
            ripple.style.borderRadius = '50%';
            ripple.style.border = '2px solid var(--primary)';
            ripple.style.pointerEvents = 'none';
            ripple.style.zIndex = '10000';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.animation = 'ripple-expand 0.6s ease-out';
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