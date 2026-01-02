// Max Sorvetes Ibertioga - Script Completo e Otimizado

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== CONFIGURAÇÃO INICIAL =====
    console.log('🍦 Max Sorvetes Ibertioga - Inicializando...');
    
    // ===== SMOOTH SCROLL =====
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

    // ===== MENU MOBILE =====
    function setupMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!menuToggle || !navMenu) return;
        
        // Inicialmente o menu deve estar visível em desktop
        if (window.innerWidth > 991) {
            navMenu.style.display = 'flex';
        } else {
            navMenu.style.display = 'none';
        }
        
        // Toggle do menu
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (navMenu.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 991 && 
                !navMenu.contains(e.target) && 
                !menuToggle.contains(e.target) &&
                navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Fechar menu ao clicar em um link
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 991) {
                    setTimeout(closeMobileMenu, 300);
                }
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
    }
    
    function openMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (navMenu && menuToggle) {
            navMenu.style.display = 'flex';
            setTimeout(() => {
                navMenu.classList.add('active');
            }, 10);
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
            menuToggle.setAttribute('aria-label', 'Fechar menu');
            
            // Prevenir scroll do body quando menu está aberto
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (navMenu && menuToggle) {
            navMenu.classList.remove('active');
            setTimeout(() => {
                if (!navMenu.classList.contains('active')) {
                    navMenu.style.display = 'none';
                }
            }, 300);
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            menuToggle.setAttribute('aria-label', 'Abrir menu');
            
            // Restaurar scroll do body
            document.body.style.overflow = '';
        }
    }

    // ===== BOTÕES DO WHATSAPP =====
    function setupOrderButtons() {
        const baseMessage = "Oi! Vim pelo site da Max Sorvetes Ibertioga e gostaria de fazer um pedido 🍨\n\n";
        
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
        
        // Adicionar evento ao botão especial do cardápio
        const cardapioBtn = document.querySelector('.btn-cardapio-imagem');
        if (cardapioBtn) {
            cardapioBtn.addEventListener('click', function(e) {
                // O Lightbox já cuida da abertura da imagem
                // Mas podemos adicionar um tracking ou animação
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
                
                console.log('📋 Cardápio visual aberto pelo usuário');
            });
        }
    }

    // ===== ABRIR WHATSAPP =====
    function openWhatsApp(message) {
        const phoneNumber = "553284442475";
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        // Abrir em nova aba
        window.open(whatsappUrl, '_blank');
        
        // Log para tracking (opcional)
        console.log('📱 WhatsApp aberto para pedido');
    }

    // ===== HEADER SCROLL EFFECT =====
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

    // ===== ANIMAÇÃO SCROLL REVEAL =====
    function setupScrollAnimations() {
        const revealElements = document.querySelectorAll('.reveal, .reveal-scale');
        
        if (revealElements.length === 0) return;
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    // Se for a foto do Max, adicionar animação especial
                    if (entry.target.classList.contains('client-photo')) {
                        entry.target.style.animation = 'fadeInUp 1s ease-out';
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }

    // ===== MENU ATIVO DURANTE SCROLL =====
    function setupActiveMenu() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (sections.length === 0 || navLinks.length === 0) return;
        
        function updateActiveMenu() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const headerHeight = document.querySelector('.header').offsetHeight;
                
                if (window.scrollY >= (sectionTop - headerHeight - 100)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', updateActiveMenu);
        updateActiveMenu(); // Chamar inicialmente
    }

    // ===== ATUALIZAR LINKS DO WHATSAPP =====
    function updateWhatsAppLinks() {
        const whatsappLinks = document.querySelectorAll('a[href*="whatsapp"]');
        
        if (whatsappLinks.length === 0) return;
        
        whatsappLinks.forEach(link => {
            let href = link.getAttribute('href');
            if (href) {
                // Verificar e corrigir número de telefone
                if (href.includes('5532986262715')) {
                    href = href.replace('5532986262715', '553284442475');
                    link.setAttribute('href', href);
                }
            }
        });
    }

    // ===== ANIMAÇÕES EXTRAS =====
    function setupExtraAnimations() {
        // Animar botões quando hover
        const buttons = document.querySelectorAll('.btn, .item-btn, .btn-category, .btn-delivery');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
        
        // Efeito de digitação no título (opcional)
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle && !sessionStorage.getItem('titleAnimated')) {
            setTimeout(() => {
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
                sessionStorage.setItem('titleAnimated', 'true');
            }, 300);
        }
    }

    // ===== DETECTAR DISPOSITIVO =====
    function setupDeviceDetection() {
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            document.body.classList.add('touch-device');
            
            // Otimizações para dispositivos touch
            const hoverElements = document.querySelectorAll('.menu-item-card, .contact-card, .stat-card');
            hoverElements.forEach(el => {
                el.classList.add('touch-optimized');
            });
        } else {
            document.body.classList.add('desktop-device');
        }
    }

    // ===== LAZY LOADING PARA IMAGENS =====
    function setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback para navegadores antigos
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }

    // ===== VALIDAÇÃO DE FORMULÁRIOS (se houver no futuro) =====
    function setupFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                const requiredFields = form.querySelectorAll('[required]');
                let isValid = true;
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.style.borderColor = 'var(--rosa)';
                        
                        // Remover o destaque após 2 segundos
                        setTimeout(() => {
                            field.style.borderColor = '';
                        }, 2000);
                    }
                });
                
                if (!isValid) {
                    e.preventDefault();
                    alert('Por favor, preencha todos os campos obrigatórios.');
                }
            });
        });
    }

    // ===== CONTADOR DE VISUALIZAÇÕES (simples) =====
    function setupViewCounter() {
        if (localStorage) {
            let views = localStorage.getItem('maxSorvetesViews');
            
            if (!views) {
                views = 1;
            } else {
                views = parseInt(views) + 1;
            }
            
            localStorage.setItem('maxSorvetesViews', views);
            
            // Você pode exibir isso em algum lugar se quiser
            // console.log(`👁️ Visualizações do site: ${views}`);
        }
    }

    // ===== INICIALIZAR TUDO =====
    function init() {
        setupSmoothScroll();
        setupMobileMenu();
        setupOrderButtons();
        setupHeaderScroll();
        setupScrollAnimations();
        setupActiveMenu();
        updateWhatsAppLinks();
        setupExtraAnimations();
        setupDeviceDetection();
        setupLazyLoading();
        setupFormValidation();
        setupViewCounter();
        
       // Log de sucesso
console.log('✅ Max Sorvetes Ibertioga - Site totalmente inicializado!');
console.log('📞 WhatsApp: (32) 98444-2475');
console.log('📍 Endereço: R. Rio de Janeiro, 652 - Ibertioga/MG');
    }

    // ===== INICIAR QUANDO O DOM ESTIVER PRONTO =====
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

});

// ===== FUNÇÕES GLOBAIS (se necessário) =====
function scrollToCardapio() {
    const cardapioSection = document.querySelector('#cardapio');
    if (cardapioSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = cardapioSection.getBoundingClientRect().top + window.pageYOffset;
        
        window.scrollTo({
            top: targetPosition - headerHeight,
            behavior: 'smooth'
        });
    }
}

function openCardapioImage() {
    const cardapioImage = document.querySelector('.btn-cardapio-imagem');
    if (cardapioImage) {
        cardapioImage.click();
    }
}

// ===== DETECTAR SAI DA PÁGINA =====
window.addEventListener('beforeunload', function() {
    // Você pode adicionar algum código aqui se necessário
    // Por exemplo, enviar uma métrica de saída
});