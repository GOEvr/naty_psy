document.addEventListener("DOMContentLoaded", () => {
    
    // ===== 1. GESTÃO DE PERFORMANCE DE SCROLL (requestAnimationFrame) =====
    const readingProgress = document.getElementById("readingProgress");
    const header = document.getElementById("mainHeader");
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateScrollElements() {
        // Alternância do Header
        if (lastScrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        // Progresso de Leitura usando transform: scaleX() otimizado por GPU
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
            const progress = lastScrollY / totalHeight;
            readingProgress.style.transform = `scaleX(${progress})`;
        }
        ticking = false;
    }

    window.addEventListener("scroll", () => {
        lastScrollY = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(updateScrollElements);
            ticking = true;
        }
    });

    // ===== 2. INTERSECTION OBSERVER (CORRIGIDO E SEGURO) =====
    const revealElements = document.querySelectorAll(".reveal");
    
    if ('IntersectionObserver' in window) {
        const ioOptions = { 
            threshold: 0.05, // Mais sensível: basta 5% do elemento aparecer para disparar
            rootMargin: "0px 0px -20px 0px" // Ajustado para evitar travar em telas mobile
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target); // Anima apenas uma vez
                }
            });
        }, ioOptions);

        revealElements.forEach(el => observer.observe(el));
    } else {
        // Fallback de Segurança: Se o navegador falhar ou não suportar, mostra tudo direto
        revealElements.forEach(el => el.classList.add("active"));
    }

    // ===== 3. ACCORDION DO FAQ CONTROLADO VIA CLASSES INTERNAS =====
    document.querySelectorAll(".faq-question").forEach(button => {
        button.addEventListener("click", () => {
            const answer = button.nextElementSibling;
            const isActive = button.classList.contains("active");

            // Reseta estados
            document.querySelectorAll(".faq-question").forEach(q => {
                q.classList.remove("active");
                q.setAttribute("aria-expanded", "false");
            });
            document.querySelectorAll(".faq-answer").forEach(a => a.style.maxHeight = null);

            // Inverte estado se não estava ativo
            if (!isActive) {
                button.classList.add("active");
                button.setAttribute("aria-expanded", "true");
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // ===== 4. CARROSSEL DE DEPOIMENTOS (AUTOPLAY COM HOVER PAUSE) =====
    const testimonials = document.querySelectorAll(".card-testimonial");
    const prevBtn = document.getElementById("prevTestimonial");
    const nextBtn = document.getElementById("nextTestimonial");
    const container = document.getElementById("testimonialContainer");
    let currentIndex = 0;
    let autoPlayTimer;

    function showTestimonial(index) {
        testimonials.forEach(t => t.classList.remove("active"));
        testimonials[index].classList.add("active");
    }

    function nextSlide() {
        currentIndex = (currentIndex === testimonials.length - 1) ? 0 : currentIndex + 1;
        showTestimonial(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex === 0) ? testimonials.length - 1 : currentIndex - 1;
        showTestimonial(currentIndex);
    }

    function startAutoPlay() {
        autoPlayTimer = setInterval(nextSlide, 6000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayTimer);
    }

    if (prevBtn && nextBtn && container) {
        prevBtn.addEventListener("click", prevSlide);
        nextBtn.addEventListener("click", nextSlide);
        container.addEventListener("mouseenter", stopAutoPlay);
        container.addEventListener("mouseleave", startAutoPlay);
        startAutoPlay();
    }

    // ===== 5. GALERIA SLIDER DO CONSULTÓRIO (NATIVA COORDENADA) =====
    const galleryImages = document.querySelectorAll(".gallery-img");
    let galleryIndex = 0;
    if (galleryImages.length > 0) {
        setInterval(() => {
            galleryImages[galleryIndex].classList.remove("active");
            galleryIndex = (galleryIndex + 1) % galleryImages.length;
            galleryImages[galleryIndex].classList.add("active");
        }, 4000);
    }

    // ===== 6. TOOLTIP RETENTIVA (EXPIRA EM 48 HORAS) =====
    const tooltip = document.getElementById("whatsappTooltip");
    const dismissedTime = localStorage.getItem("wp_tooltip_dismiss_time");
    const now = new Date().getTime();

    // 48 horas em milissegundos
    if (!dismissedTime || (now - dismissedTime > 172800000)) {
        setTimeout(() => {
            if (tooltip) tooltip.classList.add("show");
        }, 5000);
    }

    const wpFloatLink = document.querySelector(".whatsapp-float a");
    if (wpFloatLink) {
        wpFloatLink.addEventListener("click", () => {
            if (tooltip) tooltip.classList.remove("show");
            localStorage.setItem("wp_tooltip_dismiss_time", new Date().getTime());
        });
    }

    // ===== 7. MENU HAMBURGER TRANSPARENTE =====
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");
    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            const open = navLinks.classList.toggle("open");
            hamburger.setAttribute("aria-expanded", open);
        });
    }

    // ===== 8. TRACKING DE EVENTOS DE ENGAJAMENTO (GA4 AVANÇADO) =====
    function trackGA(name, cat, label) {
        if (typeof gtag === "function") {
            gtag("event", name, { "event_category": cat, "event_label": label });
        }
    }

    document.querySelectorAll(".track-wp").forEach(el => {
        el.addEventListener("click", (e) => trackGA("click_whatsapp", "Conversão CRO", e.currentTarget.innerText.trim() || "Botão Flutuante"));
    });
    document.querySelectorAll(".track-map").forEach(el => {
        el.addEventListener("click", () => trackGA("click_mapa", "Engajamento Local", "Visualizar Rota"));
    });
    const instaLink = document.querySelector(".track-insta");
    if(instaLink) {
        instaLink.addEventListener("click", () => trackGA("click_instagram", "Redes Sociais", "@nataliaferreira.psi"));
    }

    // Monitoramento inteligente de Profundidade de Rolagem (Scroll Depth)
    let depths = { 25: false, 50: false, 75: false, 100: false };
    window.addEventListener("scroll", () => {
        const sTop = window.scrollY;
        const dHeight = document.documentElement.scrollHeight;
        const wHeight = window.innerHeight;
        const scrollPercent = Math.round((sTop / (dHeight - wHeight)) * 100);

        [25, 50, 75, 100].forEach(depth => {
            if (scrollPercent >= depth && !depths[depth]) {
                depths[depth] = true;
                trackGA(`scroll_depth_${depth}`, "Leitura Conteúdo", `Atingiu ${depth}%`);
            }
        });
    });
});
