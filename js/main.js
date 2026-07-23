/**
 * ============================================
 * MAIN.JS - Versão 4.0
 * JavaScript mantido da versão 3.0
 * As mudanças foram focadas em CSS e HTML
 * ============================================
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ============================================
    // 1. SCROLL HANDLER (Performance Otimizada)
    // ============================================
    
    const readingProgress = document.getElementById('readingProgress');
    const header = document.getElementById('mainHeader');
    let lastScrollY = window.scrollY;
    let ticking = false;
    let depthTicking = false;
    
    let depths = { 25: false, 50: false, 75: false, 100: false };
    let allDepthsReached = false;
    
    function trackDepth(depth) {
        if (typeof gtag === 'function') {
            gtag('event', `scroll_depth_${depth}`, {
                'event_category': 'Leitura Conteúdo',
                'event_label': `Atingiu ${depth}%`
            });
        }
        console.log(`📊 Scroll Depth: ${depth}%`);
    }
    
    function updateScrollElements() {
        if (lastScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
            const progress = Math.min(lastScrollY / totalHeight, 1);
            readingProgress.style.transform = `scaleX(${progress})`;
        }
        
        ticking = false;
    }
    
    function handleScrollDepth() {
        if (allDepthsReached) {
            depthTicking = false;
            return;
        }
        
        const sTop = window.scrollY;
        const dHeight = document.documentElement.scrollHeight;
        const wHeight = window.innerHeight;
        const scrollPercent = Math.round((sTop / (dHeight - wHeight)) * 100);
        
        [25, 50, 75, 100].forEach(depth => {
            if (scrollPercent >= depth && !depths[depth]) {
                depths[depth] = true;
                trackDepth(depth);
            }
        });
        
        allDepthsReached = Object.values(depths).every(v => v === true);
        depthTicking = false;
    }
    
    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;
        
        if (!ticking) {
            window.requestAnimationFrame(updateScrollElements);
            ticking = true;
        }
        
        if (!depthTicking && !allDepthsReached) {
            depthTicking = true;
            window.requestAnimationFrame(handleScrollDepth);
        }
    });
    
    // ============================================
    // 2. INTERSECTION OBSERVER
    // ============================================
    
    const revealElements = document.querySelectorAll('.reveal');
    
    if ('IntersectionObserver' in window) {
        const ioOptions = {
            threshold: 0.05,
            rootMargin: '0px 0px -20px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, ioOptions);
        
        revealElements.forEach(el => observer.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('active'));
    }
    
    // ============================================
    // 3. ACCORDION (FAQ)
    // ============================================
    
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const answer = button.nextElementSibling;
            const isActive = button.classList.contains('active');
            
            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('active');
                q.setAttribute('aria-expanded', 'false');
            });
            document.querySelectorAll('.faq-answer').forEach(a => {
                a.style.maxHeight = null;
            });
            
            if (!isActive) {
                button.classList.add('active');
                button.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
    
    // ============================================
    // 4. CARROSSEL DE DEPOIMENTOS
    // ============================================
    
    const testimonials = document.querySelectorAll('.card-testimonial');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    const container = document.getElementById('testimonialContainer');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (testimonials.length > 0) {
        let currentIndex = 0;
        let autoPlayTimer = null;
        let touchStartX = 0;
        let touchEndX = 0;
        
        if (dotsContainer) {
            testimonials.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.className = `dot ${index === 0 ? 'active' : ''}`;
                dot.setAttribute('role', 'tab');
                dot.setAttribute('aria-label', `Depoimento ${index + 1}`);
                dot.setAttribute('aria-selected', index === 0);
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });
        }
        
        function showTestimonial(index) {
            testimonials.forEach(t => t.classList.remove('active'));
            testimonials[index].classList.add('active');
            
            if (dotsContainer) {
                const dots = dotsContainer.querySelectorAll('.dot');
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                    dot.setAttribute('aria-selected', i === index);
                });
            }
        }
        
        function goToSlide(index) {
            if (index < 0) index = testimonials.length - 1;
            if (index >= testimonials.length) index = 0;
            currentIndex = index;
            showTestimonial(currentIndex);
        }
        
        function nextSlide() {
            goToSlide(currentIndex + 1);
        }
        
        function prevSlide() {
            goToSlide(currentIndex - 1);
        }
        
        function startAutoPlay() {
            stopAutoPlay();
            autoPlayTimer = setInterval(nextSlide, 6000);
        }
        
        function stopAutoPlay() {
            if (autoPlayTimer) {
                clearInterval(autoPlayTimer);
                autoPlayTimer = null;
            }
        }
        
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        
        if (container) {
            container.addEventListener('mouseenter', stopAutoPlay);
            container.addEventListener('mouseleave', startAutoPlay);
            
            container.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            container.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                const diff = touchStartX - touchEndX;
                if (Math.abs(diff) > 50) {
                    if (diff > 0) nextSlide();
                    else prevSlide();
                }
            }, { passive: true });
            
            container.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') prevSlide();
                if (e.key === 'ArrowRight') nextSlide();
            });
        }
        
        startAutoPlay();
        
        window.addEventListener('beforeunload', stopAutoPlay);
    }
    
    // ============================================
    // 5. GALERIA DO CONSULTÓRIO
    // ============================================
    
    const galleryImages = document.querySelectorAll('.gallery-img');
    let galleryIndex = 0;
    let galleryInterval = null;
    
    if (galleryImages.length > 0) {
        function nextGalleryImage() {
            galleryImages[galleryIndex].classList.remove('active');
            galleryIndex = (galleryIndex + 1) % galleryImages.length;
            galleryImages[galleryIndex].classList.add('active');
        }
        
        function startGallery() {
            stopGallery();
            galleryInterval = setInterval(nextGalleryImage, 4000);
        }
        
        function stopGallery() {
            if (galleryInterval) {
                clearInterval(galleryInterval);
                galleryInterval = null;
            }
        }
        
        startGallery();
        
        const slider = document.getElementById('gallerySlider');
        if (slider) {
            slider.addEventListener('mouseenter', stopGallery);
            slider.addEventListener('mouseleave', startGallery);
            slider.addEventListener('touchstart', stopGallery);
            slider.addEventListener('touchend', startGallery);
        }
        
        window.addEventListener('beforeunload', stopGallery);
    }
    
    // ============================================
    // 6. MENU MOBILE
    // ============================================
    
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const overlay = document.getElementById('navOverlay');
    
    if (hamburger && navLinks) {
        function toggleMenu() {
            const isOpen = navLinks.classList.toggle('open');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
            
            if (overlay) {
                overlay.classList.toggle('active');
                overlay.setAttribute('aria-hidden', !isOpen);
            }
        }
        
        function closeMenu() {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            if (overlay) {
                overlay.classList.remove('active');
                overlay.setAttribute('aria-hidden', 'true');
            }
        }
        
        hamburger.addEventListener('click', toggleMenu);
        
        if (overlay) {
            overlay.addEventListener('click', closeMenu);
        }
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('open')) {
                closeMenu();
                hamburger.focus();
            }
        });
    }
    
    // ============================================
    // 7. TOOLTIP RETENTIVA
    // ============================================
    
    const tooltip = document.getElementById('whatsappTooltip');
    const dismissedTime = localStorage.getItem('wp_tooltip_dismiss_time');
    const now = new Date().getTime();
    const FORTY_EIGHT_HOURS = 172800000;
    let tooltipTimer = null;
    
    if (!dismissedTime || (now - dismissedTime > FORTY_EIGHT_HOURS)) {
        tooltipTimer = setTimeout(() => {
            const recheck = localStorage.getItem('wp_tooltip_dismiss_time');
            if (!recheck || (now - recheck > FORTY_EIGHT_HOURS)) {
                if (tooltip) tooltip.classList.add('show');
            }
        }, 5000);
    }
    
    const wpLink = document.querySelector('.whatsapp-float a');
    if (wpLink) {
        wpLink.addEventListener('click', () => {
            if (tooltip) {
                tooltip.classList.remove('show');
            }
            localStorage.setItem('wp_tooltip_dismiss_time', String(now));
        });
    }
    
    if (tooltip) {
        tooltip.addEventListener('click', () => {
            tooltip.classList.remove('show');
            localStorage.setItem('wp_tooltip_dismiss_time', String(now));
        });
    }
    
    window.addEventListener('beforeunload', () => {
        if (tooltipTimer) clearTimeout(tooltipTimer);
    });
    
    // ============================================
    // 8. TRACKING (GA4)
    // ============================================
    
    function trackGA(name, cat, label) {
        if (typeof gtag === 'function') {
            gtag('event', name, {
                'event_category': cat,
                'event_label': label
            });
            console.log(`📊 GA4: ${name} - ${cat} - ${label}`);
        }
    }
    
    document.querySelectorAll('.track-wp').forEach(el => {
        el.addEventListener('click', (e) => {
            const text = e.currentTarget.innerText.trim() || 'Botão WhatsApp';
            trackGA('click_whatsapp', 'Conversão CRO', text);
        });
    });
    
    document.querySelectorAll('.track-map').forEach(el => {
        el.addEventListener('click', () => {
            trackGA('click_mapa', 'Engajamento Local', 'Visualizar Rota');
        });
    });
    
    const instaLink = document.querySelector('.track-insta');
    if (instaLink) {
        instaLink.addEventListener('click', () => {
            trackGA('click_instagram', 'Redes Sociais', '@nataliaferreira.psi');
        });
    }
    
    if ('performance' in window && 'getEntriesByType' in performance) {
        const nav = performance.getEntriesByType('navigation')[0];
        if (nav) {
            const loadTime = nav.loadEventEnd - nav.startTime;
            const domReady = nav.domContentLoadedEventEnd - nav.startTime;
            trackGA('page_load_time', 'Performance', `Load: ${Math.round(loadTime)}ms`);
            trackGA('dom_ready_time', 'Performance', `DOM: ${Math.round(domReady)}ms`);
        }
    }
    
    // ============================================
    // 9. PREFERS REDUCED MOTION
    // ============================================
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
        document.documentElement.classList.add('reduced-motion');
    }
    
    prefersReducedMotion.addEventListener('change', (e) => {
        if (e.matches) {
            document.documentElement.classList.add('reduced-motion');
        } else {
            document.documentElement.classList.remove('reduced-motion');
        }
    });
    
    console.log('🌿 Natália Ferreira - Versão 4.0 - Site Humanizado');
    console.log('🎨 Nova identidade visual aplicada com sucesso!');
});
