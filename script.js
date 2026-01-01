// Maxx Sorvetes Bertioga - Script Funcional

document.addEventListener('DOMContentLoaded', function() {
    // Smooth Scroll
    function setupSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.getAttribute('href') === '#') return;
                
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    
                    window.scrollTo({
                        top: targetPosition - headerHeight,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Botões de pedido do WhatsApp
    function setupOrderButtons() {
        const baseMessage = "Oi! Vim pelo site da Maxx Sorvetes Bertioga e gostaria de fazer um pedido 🍨\n\n";
        
        document.querySelectorAll('[data-item]').forEach(button => {
            button.addEventListener('click', function(e) {
                if (this.tagName === 'A' && this.hasAttribute('target')) return;
                
                if (this.tagName === 'BUTTON') {
                    e.preventDefault();
                    
                    const product = this.getAttribute('data-item');
                    let message = baseMessage;
                    
                    if (product) {
                        message += `Gostaria de pedir: ${product}`;
                    }
                    
                    // Adicionar extras específicos
                    if (product === 'Açaí') {
                        message += "\n\nAcompanhamentos que gostaria:";
                        message += "\n- Leite em pó";
                        message += "\n- Leite condensado";
                        message += "\n- Calda";
                    }
                    
                    message += "\n\nPoderia me passar mais informações?";
                    
                    // Animação no botão
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 200);
                    
                    openWhatsApp(message);
                }
            });
        });
    }

    // Abrir WhatsApp
    function openWhatsApp(message) {
        const phoneNumber = "5532986262715";
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
    }

    // Animações ao scroll
    function setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);

        // Observar elementos para animar
        const elementsToAnimate = document.querySelectorAll(
            '.category-card, .mini-category, .delivery-card, .contact-item'
        );
        
        elementsToAnimate.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.6s ease-out';
            observer.observe(el);
        });
    }

    // Efeito 3D na foto do Max
    function setupMax3DEffect() {
        const maxPhoto3d = document.querySelector('.max-photo-3d');
        if (!maxPhoto3d) return;
        
        maxPhoto3d.addEventListener('mousemove', (e) => {
            const rect = maxPhoto3d.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = ((x - centerX) / centerX) * 10;
            const rotateX = ((centerY - y) / centerY) * 10;
            
            maxPhoto3d.style.transform = `
                translateY(-15px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
            `;
        });
        
        maxPhoto3d.addEventListener('mouseleave', () => {
            maxPhoto3d.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        });
    }

    // Header scroll effect
    function setupHeaderScroll() {
        const header = document.querySelector('.header');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.padding = '10px 0';
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = 'var(--shadow-md)';
            } else {
                header.style.padding = '15px 0';
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = 'var(--shadow-sm)';
            }
        });
    }

    // Inicializar tudo
    function init() {
        setupSmoothScroll();
        setupOrderButtons();
        setupScrollAnimations();
        setupMax3DEffect();
        setupHeaderScroll();
        
        console.log('🍦 Maxx Sorvetes Bertioga - Site carregado com sucesso!');
    }

    init();
});