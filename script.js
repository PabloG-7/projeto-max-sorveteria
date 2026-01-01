// Maxx Sorvetes Bertioga - Script Final

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
                    
                    // Fechar menu mobile se aberto
                    closeMobileMenu();
                }
            });
        });
    }

    // Menu mobile - CORREÇÃO PRINCIPAL
    function setupMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!menuToggle || !navMenu) return;
        
        // Inicialmente o menu deve estar visível
        navMenu.classList.remove('active');
        
        // Toggle do menu
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            
            if (navMenu.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                closeMobileMenu();
            }
        });
        
        // Fechar menu ao clicar em um link
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                setTimeout(closeMobileMenu, 300);
            });
        });
        
        // Atualizar menu ao redimensionar
        window.addEventListener('resize', function() {
            if (window.innerWidth > 991) {
                // Em desktop, menu sempre visível
                navMenu.classList.remove('active');
                navMenu.style.display = 'flex';
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                menuToggle.setAttribute('aria-label', 'Abrir menu');
            } else {
                // Em mobile, verificar estado
                if (!navMenu.classList.contains('active')) {
                    navMenu.style.display = 'none';
                }
            }
        });
        
        // Inicializar estado baseado na largura da tela
        if (window.innerWidth <= 991) {
            navMenu.style.display = 'none';
        }
    }
    
    function openMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (navMenu && menuToggle) {
            navMenu.classList.add('active');
            navMenu.style.display = 'flex';
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
            menuToggle.setAttribute('aria-label', 'Fechar menu');
            
            // Animar entrada
            setTimeout(() => {
                navMenu.style.opacity = '1';
                navMenu.style.transform = 'translateY(0)';
            }, 10);
        }
    }
    
    function closeMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (navMenu && menuToggle) {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            menuToggle.setAttribute('aria-label', 'Abrir menu');
            
            // Animar saída
            setTimeout(() => {
                if (!navMenu.classList.contains('active')) {
                    navMenu.style.display = 'none';
                }
            }, 300);
        }
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
                        message += `• ${product}`;
                    }
                    
                    // Adicionar informações específicas por categoria
                    if (product.includes('Açaí')) {
                        message += "\n\nAcompanhamentos que gostaria:";
                        message += "\n- Leite em pó";
                        message += "\n- Leite condensado";
                        message += "\n- Calda";
                    }
                    
                    message += "\n\nPoderia me ajudar com o pedido?";
                    
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

    // Header scroll effect
    function setupHeaderScroll() {
        const header = document.querySelector('.header');
        
        if (!header) return;
        
        function updateHeader() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        window.addEventListener('scroll', updateHeader);
        updateHeader(); // Chamar inicialmente
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
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observar elementos para animar
        const elementsToAnimate = document.querySelectorAll(
            '.menu-category, .delivery-card, .contact-card, .contact-message, .hero-features'
        );
        
        elementsToAnimate.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.6s ease-out';
            observer.observe(el);
        });
    }

    // Efeito de interação na foto do Max
    function setupMaxInteraction() {
        const maxPhotoContainer = document.querySelector('.max-photo-container');
        const orbitingScoops = document.querySelectorAll('.orbiting-scoop');
        
        if (!maxPhotoContainer) return;
        
        maxPhotoContainer.addEventListener('mouseenter', () => {
            orbitingScoops.forEach(scoop => {
                scoop.style.animationPlayState = 'paused';
                scoop.style.transform += ' scale(1.2)';
            });
        });
        
        maxPhotoContainer.addEventListener('mouseleave', () => {
            orbitingScoops.forEach(scoop => {
                scoop.style.animationPlayState = 'running';
                scoop.style.transform = scoop.style.transform.replace(' scale(1.2)', '');
            });
        });
    }

    // Atualizar menu ativo
    function setupActiveMenu() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        function updateActiveMenu() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= (sectionTop - 100)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', updateActiveMenu);
        updateActiveMenu(); // Chamar inicialmente
    }

    // Inicializar tudo
    function init() {
        setupSmoothScroll();
        setupMobileMenu();
        setupOrderButtons();
        setupHeaderScroll();
        setupScrollAnimations();
        setupMaxInteraction();
        setupActiveMenu();
        
        // Adicionar classe para dispositivos touch
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            document.body.classList.add('touch-device');
        }
        
        console.log('🍦 Maxx Sorvetes Bertioga - Site carregado com sucesso!');
    }

    // Iniciar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
});

// Inicializar animações de fundo
(function() {
    const iceElements = document.querySelectorAll('.ice-element');
    iceElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 5}s`;
    });
})();