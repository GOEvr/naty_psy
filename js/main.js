document.addEventListener("DOMContentLoaded", () => {
    
    // ===== 1. HEADER INTELIGENTE & BARRA DE PROGRESSO =====
    const header = document.getElementById("mainHeader");
    const readingProgress = document.getElementById("readingProgress");

    window.addEventListener("scroll", () => {
        // Encolhimento do Header
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        // Progresso de Leitura
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
            const progress = (window.scrollY / totalHeight) * 100;
            readingProgress.style.width = `${progress}%`;
        }
    });

    // ===== 2. MENU HAMBURGER (RESPONSIVO) =====
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");

    hamburger.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        hamburger.setAttribute("aria-expanded", isOpen);
    });

    // Fecha o menu ao clicar em qualquer link
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            hamburger.setAttribute("aria-expanded", "false");
        });
    });

    // ===== 3. CARROSSEL DE DEPOIMENTOS ELEGANTE =====
    const testimonials = document.querySelectorAll(".card-testimonial");
    const prevBtn = document.getElementById("prevTestimonial");
    const nextBtn = document.getElementById("nextTestimonial");
    let currentIndex = 0;

    function showTestimonial(index) {
        testimonials.forEach(t => t.classList.remove("active"));
        testimonials[index].classList.add("active");
    }

    if(prevBtn && nextBtn) {
        prevBtn.addEventListener("click", () => {
            currentIndex = (currentIndex === 0) ? testimonials.length - 1 : currentIndex - 1;
            showTestimonial(currentIndex);
        });

        nextBtn.addEventListener("click", () => {
            currentIndex = (currentIndex === testimonials.length - 1) ? 0 : currentIndex + 1;
            showTestimonial(currentIndex);
        });
    }

    // ===== 4. FAQ ACCORDION ANIMADO =====
    document.querySelectorAll(".faq-question").forEach(button => {
        button.addEventListener("click", () => {
            const faqItem = button.parentElement;
            const answer = button.nextElementSibling;
            const isActive = button.classList.contains("active");

            // Fecha outros accordions ativos
            document.querySelectorAll(".faq-question").forEach(q => q.classList.remove("active"));
            document.querySelectorAll(".faq-answer").forEach(a => a.style.maxHeight = null);

            if (!isActive) {
                button.classList.add("active");
                button.setAttribute("aria-expanded", "true");
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                button.setAttribute("aria-expanded", "false");
            }
        });
    });

    // ===== 5. WHATSAPP FLUTUANTE & GESTÃO DE TOOLTIP =====
    const tooltip = document.getElementById("whatsappTooltip");
    
    // Exibe o tooltip após 4 segundos se nunca foi fechado
    if (!localStorage.getItem("wp_tooltip_dismissed")) {
        setTimeout(() => {
            if(tooltip) tooltip.classList.add("show");
        }, 4000);
    }

    // Esconde o tooltip ao clicar no botão do WhatsApp
    const wpFloatLink = document.querySelector(".whatsapp-float a");
    if(wpFloatLink) {
        wpFloatLink.addEventListener("click", () => {
            if(tooltip) tooltip.classList.remove("show");
            localStorage.setItem("wp_tooltip_dismissed", "true");
        });
    }

    // ===== 6. DISPARO DE METRICAS E ANALYTICS PERSONALIZADOS (GA4) =====
    function trackEvent(eventName, category, label) {
        if (typeof gtag === "function") {
            gtag("event", eventName, {
                "event_category": category,
                "event_label": label
            });
        }
    }

    // Cliques em botões de WhatsApp
    document.querySelectorAll(".track-wp").forEach(element => {
        element.addEventListener("click", (e) => {
            trackEvent("click_whatsapp", "Conversão", e.currentTarget.innerText.trim() || "Float Button");
        });
    });

    // Cliques para visualizar o mapa
    document.querySelectorAll(".track-map").forEach(element => {
        element.addEventListener("click", () => {
            trackEvent("view_map", "Engajamento", "Ver Rota Local");
        });
    });
});
