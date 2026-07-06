/* ===== VARIÁVEIS DO SYSTEM DESIGN ===== */
:root {
    --primary-lavender: #4E5E78;
    --primary-light: #F0F4F8;
    --secondary-beige: #D9C5B2;
    --accent-gold: #C5A059;
    --bg-offwhite: #FBFBFA;
    --bg-pure-white: #FFFFFF;
    --text-graphite: #333A42;
    --text-muted: #626E7C;
    --font-titles: 'Cormorant Garamond', serif;
    --font-body: 'Manrope', sans-serif;
    --transition-premium: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease, background-color 0.3s ease;
}

/* ===== ACESSIBILIDADE E SELEÇÃO (MELHORADOS) ===== */
::selection {
    background-color: var(--secondary-beige);
    color: var(--primary-lavender);
}

/* Foco visível via teclado para acessibilidade pura */
*:focus-visible {
    outline: 2px dashed var(--accent-gold);
    outline-offset: 4px;
}

/* Scrollbar Customizada */
::-webkit-scrollbar {
    width: 8px;
}
::-webkit-scrollbar-track {
    background: var(--bg-offwhite);
}
::-webkit-scrollbar-thumb {
    background: var(--secondary-beige);
    border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
    background: var(--primary-lavender);
}

/* ===== TIMING & STRUCTURAL RESET ===== */
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; font-size: 16px; }
body {
    font-family: var(--font-body);
    color: var(--text-graphite);
    background-color: var(--bg-offwhite);
    line-height: 1.8;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
}
.container { max-width: 1200px; margin: 0 auto; padding: 0 32px; }

h1, h2, h3, h4 { font-family: var(--font-titles); color: var(--primary-lavender); font-weight: 600; }
h1 { font-size: 3.4rem; line-height: 1.15; letter-spacing: -0.02em; }
h2.section-title { font-size: 2.8rem; text-align: center; margin-bottom: 64px; }
h2.section-title span { font-style: italic; color: var(--accent-gold); font-weight: 400; }

/* ===== INTERACTION REFINEMENTS (GPU ACCELERATED) ===== */
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 16px 36px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.95rem;
    text-decoration: none;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s, box-shadow 0.3s;
    cursor: pointer;
    will-change: transform;
}
.btn-primary { background-color: var(--primary-lavender); color: var(--bg-pure-white); box-shadow: 0 10px 30px rgba(78,94,120,0.1); }
.btn-primary:hover { background-color: #38455A; transform: translateY(-3px) scale(1.01); box-shadow: 0 15px 35px rgba(78,94,120,0.2); }
.btn-secondary { background-color: transparent; color: var(--primary-lavender); border: 1px solid var(--secondary-beige); }
.btn-secondary:hover { border-color: var(--primary-lavender); transform: translateY(-2px); background-color: rgba(78,94,120,0.02); }
.btn-whatsapp { background-color: #25D366; color: var(--bg-pure-white); }
.btn-whatsapp:hover { background-color: #20ba56; transform: translateY(-3px); }

/* Progress-bar com ScaleX acelerado por GPU */
.progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--secondary-beige), var(--accent-gold));
    width: 100%;
    transform: scaleX(0);
    transform-origin: left;
    z-index: 1010;
    will-change: transform;
}

/* ===== 1. HEADER INTELIGENTE ===== */
header { padding: 24px 0; position: fixed; width: 100%; top: 0; left: 0; z-index: 1000; transition: padding 0.3s, background-color 0.3s; }
header.scrolled { background-color: rgba(255, 255, 255, 0.96); backdrop-filter: blur(10px); padding: 14px 0; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.02); }
.header-content { display: flex; justify-content: space-between; align-items: center; }
.logo { font-family: var(--font-titles); font-size: 1.8rem; font-weight: 700; color: var(--primary-lavender); text-decoration: none; }
.logo span { font-weight: 400; font-style: italic; color: var(--accent-gold); }
.nav-links { display: flex; gap: 36px; list-style: none; align-items: center; }
.nav-links a { text-decoration: none; color: var(--text-graphite); font-weight: 500; font-size: 0.95rem; }
.nav-links a:hover { color: var(--accent-gold); }
.nav-links .nav-cta { padding: 10px 22px; font-size: 0.85rem; color: var(--bg-pure-white); }
.hamburger { display: none; background: none; border: none; font-size: 1.6rem; color: var(--primary-lavender); cursor: pointer; }

/* ===== 2. HERO & CREADIBILITY ===== */
.hero { padding: 180px 0 100px; background: radial-gradient(circle at 80% 20%, rgba(217, 197, 178, 0.1) 0%, rgba(251, 251, 250, 1) 70%); }
.hero-content { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 64px; align-items: center; }
.hero-text .badge { display: inline-block; background-color: var(--primary-light); color: var(--primary-lavender); padding: 6px 16px; border-radius: 4px; font-size: 0.8rem; font-weight: 600; letter-spacing: 0.05em; margin-bottom: 24px; }
.hero-text h1 { margin-bottom: 24px; }
.hero-text .subtitle { margin-bottom: 40px; max-width: 580px; }
.hero-image img { width: 100%; max-width: 400px; border-radius: 16px; box-shadow: 0 30px 70px rgba(78,94,120,0.08); transition: transform 0.5s; will-change: transform; }
.hero-image img:hover { transform: scale(1.02); }
.trust-indicators { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 48px; border-top: 1px solid rgba(0,0,0,0.06); padding-top: 32px; }
.trust-indicators span { display: flex; align-items: center; gap: 10px; font-size: 0.9rem; color: var(--text-muted); }
.trust-indicators i { color: var(--accent-gold); }

/* Faixa de credibilidade adicional */
.credibility-bar { background-color: var(--primary-light); padding: 24px 0; border-top: 1px solid rgba(0,0,0,0.02); border-bottom: 1px solid rgba(0,0,0,0.02); }
.cred-content { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 24px; }
.cred-item { font-size: 0.95rem; font-weight: 500; color: var(--primary-lavender); display: flex; align-items: center; gap: 10px; }
.cred-item .stars { color: var(--accent-gold); }

/* ===== INTERSECTION OBSERVER ANIMATION CONFIG ===== */
.reveal { opacity: 0; transform: translateY(30px); transition: var(--transition-premium); will-change: transform, opacity; }
.reveal.active { opacity: 1; transform: translateY(0); }

/* ===== 3. CARDS DE PROBLEMAS ===== */
.grid-cards-problemas { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.card-problem { background-color: var(--bg-pure-white); padding: 32px 24px; border-radius: 12px; border: 1px solid rgba(0,0,0,0.02); transition: var(--transition-premium); will-change: transform; }
.card-problem:hover { transform: translateY(-6px) scale(1.02); border-color: var(--secondary-beige); box-shadow: 0 20px 40px rgba(0,0,0,0.02); }
.problem-icon { font-size: 1.6rem; color: var(--accent-gold); margin-bottom: 16px; display: block; }
.card-problem h3 { font-size: 1.25rem; margin-bottom: 12px; }
.card-problem p { font-size: 0.9rem; color: var(--text-muted); line-height: 1.6; }

/* ===== 4. BENEFÍCIOS ===== */
.grid-beneficios { display: grid; grid-template-columns: repeat(5, 1fr); gap: 24px; }
.benefit-item { position: relative; padding-top: 24px; }
.benefit-number { font-family: var(--font-titles); font-size: 2.5rem; color: var(--secondary-beige); display: block; margin-bottom: 12px; }
.benefit-item h3 { font-size: 1.25rem; margin-bottom: 12px; }
.benefit-item p { font-size: 0.9rem; color: var(--text-muted); }

/* ===== 5. SOBRE (STORYTELLING) ===== */
.about-grid { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 80px; align-items: center; }
.about-image img { width: 100%; border-radius: 16px; box-shadow: 0 20px 50px rgba(0,0,0,0.04); transition: transform 0.5s; }
.about-image img:hover { transform: scale(1.015); }
.story-paragraph { font-size: 1.15rem; font-family: var(--font-titles); font-style: italic; color: var(--primary-lavender); line-height: 1.7; margin-bottom: 24px; }

/* ===== 6. TIMELINE ===== */
.timeline { position: relative; max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: 40px; }
.timeline::before { content: ''; position: absolute; left: 28px; top: 0; width: 1px; height: 100%; background-color: var(--secondary-beige); }
.timeline-item { position: relative; padding-left: 80px; }
.timeline-step { position: absolute; left: 12px; top: 0; width: 32px; height: 32px; border-radius: 50%; background-color: var(--primary-lavender); color: var(--bg-pure-white); display: flex; align-items: center; justify-content: center; font-size: 0.9rem; font-weight: 700; }

/* ===== 7. SOLUÇÕES / ESPECIALIDADES ===== */
.grid-especialidades { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
.card-especialidade { background-color: var(--bg-pure-white); padding: 48px 32px; border-radius: 16px; text-align: center; border: 1px solid rgba(0,0,0,0.01); transition: var(--transition-premium); }
.card-especialidade:hover { transform: translateY(-5px) scale(1.01); border-color: var(--secondary-beige); }
.esp-icon { font-size: 2.2rem; color: var(--accent-gold); margin-bottom: 24px; }

/* ===== 8. SEÇÃO TCC ===== */
.tcc-container { max-width: 800px; }
.tcc-features { margin-top: 40px; display: flex; flex-direction: column; gap: 28px; }
.tcc-feature-item h4 { font-size: 1.2rem; color: var(--accent-gold); margin-bottom: 6px; font-family: var(--font-body); font-weight: 600; }

/* ===== 9. CONSULTÓRIO DE ALTO PADRÃO ===== */
.consultorio-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
.address-text { margin: 24px 0; font-weight: 500; }
.address-text i { color: var(--accent-gold); margin-right: 8px; }
.gallery-slider { position: relative; border-radius: 16px; overflow: hidden; height: 300px; box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
.gallery-img { position: absolute; top:0; left:0; width:100%; height:100%; object-fit: cover; opacity: 0; transition: opacity 0.8s ease-in-out; }
.gallery-img.active { opacity: 1; }

/* ===== 10. DEPOIMENTOS ===== */
.testimonials-wrapper { max-width: 700px; margin: 0 auto; text-align: center; }
.card-testimonial { display: none; }
.card-testimonial.active { display: block; animation: fadeIn 0.6s ease; }
.stars { color: var(--accent-gold); margin-bottom: 16px; display: block; }
.card-testimonial p { font-family: var(--font-titles); font-size: 1.6rem; font-style: italic; margin-bottom: 24px; }
.card-testimonial .author { font-size: 0.85rem; letter-spacing: 0.05em; text-transform: uppercase; color: var(--text-muted); }
.carousel-controls { display: flex; justify-content: center; gap: 16px; margin-top: 32px; }
.carousel-controls button { background: none; border: 1px solid var(--secondary-beige); width: 40px; height: 40px; border-radius: 50%; color: var(--primary-lavender); cursor: pointer; transition: 0.3s; }
.carousel-controls button:hover { border-color: var(--primary-lavender); background-color: var(--primary-light); }

/* ===== 11. FAQ LÓGICA DE CLASSE SECA ===== */
.faq-list { max-width: 760px; margin: 0 auto; }
.faq-item { border-bottom: 1px solid rgba(0,0,0,0.06); padding: 16px 0; }
.faq-question { width: 100%; background: none; border: none; display: flex; justify-content: space-between; align-items: center; font-size: 1.15rem; font-weight: 600; color: var(--primary-lavender); padding: 16px 0; cursor: pointer; font-family: var(--font-body); }
.faq-question i { font-size: 0.9rem; transition: transform 0.3s ease; color: var(--accent-gold); }
.faq-question.active i { transform: rotate(180deg); }
.faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.faq-answer p { padding-bottom: 24px; color: var(--text-muted); }

/* ===== 12. CTA FINAL & 13. FOOTER ===== */
.cta-final { background-color: var(--primary-lavender); color: var(--bg-pure-white); text-align: center; padding: 120px 0; }
.cta-final h2 { color: var(--bg-pure-white); font-size: 3rem; max-width: 800px; margin: 0 auto 24px; }
.cta-final .subtitle { color: var(--secondary-beige); max-width: 600px; margin: 0 auto 40px; }
.cta-info { display: flex; justify-content: center; gap: 32px; margin-top: 32px; font-size: 0.85rem; color: rgba(255,255,255,0.7); }
footer { background-color: #1A1F26; color: #9CA3AF; padding: 64px 0 32px; font-size: 0.9rem; }
.footer-content { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
.footer-details a { color: #9CA3AF; text-decoration: none; display: block; margin-bottom: 8px; transition: color 0.3s; }
.footer-details a:hover { color: var(--secondary-beige); }
.footer-legal { grid-column: 1 / -1; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 32px; text-align: center; }
.footer-legal a { color: var(--secondary-beige); text-decoration: none; }

/* ===== WHATSAPP FLUTUANTE ===== */
.whatsapp-float { position: fixed; bottom: 32px; right: 32px; z-index: 999; display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
.whatsapp-float .tooltip { background-color: #1A202C; color: #fff; padding: 8px 16px; border-radius: 6px; font-size: 0.85rem; opacity: 0; transform: translateY(10px); transition: opacity 0.3s, transform 0.3s; pointer-events: none; }
.whatsapp-float .tooltip.show { opacity: 1; transform: translateY(0); }
.whatsapp-float a { width: 56px; height: 56px; background-color: #25D366; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; text-decoration: none; box-shadow: 0 10px 25px rgba(37,211,102,0.3); position: relative; }
.badge-count { position: absolute; top: -2px; right: -2px; background-color: #EF4444; width: 18px; height: 18px; border-radius: 50%; font-size: 0.65rem; display: flex; align-items: center; justify-content: center; }

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

/* ===== MEDIA QUERIES ===== */
@media (max-width: 1024px) {
    h1 { font-size: 2.8rem; }
    .grid-cards-problemas { grid-template-columns: repeat(2, 1fr); }
    .grid-beneficios { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 768px) {
    header { background-color: var(--bg-pure-white); }
    .nav-links { display: none; flex-direction: column; position: absolute; top: 100%; left: 0; width: 100%; background-color: var(--bg-pure-white); padding: 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
    .nav-links.open { display: flex; }
    .hamburger { display: block; }
    .hero-content, .about-grid, .consultorio-grid, .grid-especialidades, .footer-content { grid-template-columns: 1fr; text-align: center; }
    .hero-text .btn-group { justify-content: center; }
    .grid-beneficios { grid-template-columns: 1fr; }
    .timeline::before { left: 16px; }
    .timeline-item { padding-left: 48px; text-align: left; }
    .timeline-step { left: 0; }
    .cta-info { flex-direction: column; gap: 12px; }
}
