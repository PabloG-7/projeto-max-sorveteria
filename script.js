// Max Sorvetes Ibertioga - Script Completo e Otimizado

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== CONFIGURAÇÃO INICIAL =====
    console.log('Max Sorvetes Ibertioga - Inicializando...');
    
    // ===== FUNÇÕES AUXILIARES =====
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
            menuToggle.classList.add('active');
            
            // Prevenir scroll do body quando menu está aberto
            document.body.classList.add('menu-open');
        }
    }
    
    function closeMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (navMenu && menuToggle) {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            menuToggle.setAttribute('aria-label', 'Abrir menu');
            menuToggle.classList.remove('active');
            
            // Esperar pela transição antes de esconder
            setTimeout(() => {
                if (!navMenu.classList.contains('active')) {
                    navMenu.style.display = 'none';
                }
            }, 300);
            
            // Restaurar scroll do body
            document.body.classList.remove('menu-open');
        }
    }
    
    function toggleMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && navMenu.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
    
    // ===== SMOOTH SCROLL COM FECHAMENTO DO MENU =====
    function setupSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.getAttribute('href') === '#') return;
                
                // Verificar se é um link interno (não externo)
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        const headerHeight = document.querySelector('.header').offsetHeight;
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                        
                        // Fechar menu mobile se estiver aberto
                        if (window.innerWidth <= 991) {
                            closeMobileMenu();
                        }
                        
                        window.scrollTo({
                            top: targetPosition - headerHeight,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    // ===== MENU MOBILE ATUALIZADO =====
    function setupMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (!menuToggle || !navMenu) return;
        
        // Configuração inicial baseada no tamanho da tela
        function setupInitialState() {
            if (window.innerWidth > 991) {
                // Desktop - menu sempre visível
                navMenu.style.display = 'flex';
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            } else {
                // Mobile - menu inicialmente oculto
                navMenu.style.display = 'none';
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
        
        // Chamar inicialmente
        setupInitialState();
        
        // Toggle do menu
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileMenu();
        });
        
        // Fechar menu ao clicar em um link (exceto o botão do WhatsApp)
        navLinks.forEach(link => {
            // Verificar se é um link interno (começa com #)
            if (link.getAttribute('href').startsWith('#')) {
                link.addEventListener('click', function(e) {
                    if (window.innerWidth <= 991) {
                        // Adicionar pequeno delay para a animação de scroll
                        setTimeout(closeMobileMenu, 100);
                    }
                });
            }
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 991 && 
                navMenu && 
                !navMenu.contains(e.target) && 
                menuToggle && 
                !menuToggle.contains(e.target) &&
                navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Atualizar ao redimensionar
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth > 991) {
                    // Desktop - resetar tudo
                    navMenu.style.display = 'flex';
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    menuToggle.setAttribute('aria-label', 'Abrir menu');
                } else {
                    // Mobile - se estava aberto, manter aberto
                    if (!navMenu.classList.contains('active')) {
                        navMenu.style.display = 'none';
                    }
                }
            }, 250);
        });
    }

    // ===== BOTÕES DO WHATSAPP ATUALIZADOS =====
    function setupOrderButtons() {
        // Base message sem emoji
        const baseMessage = "Olá! Vim pelo site da Max Sorvetes Ibertioga e gostaria de fazer um pedido\n\n";
        
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
                        message += "\n\nACOMPANHAMENTOS GRÁTIS (ESCOLHA ATÉ 3):";
                        message += "\n- Leite em pó";
                        message += "\n- Leite condensado";
                        message += "\n- Calda (chocolate ou morango)";
                        message += "\n\nEXTRAS ADICIONAIS:";
                        message += "\n- Paçoca + R$2,50";
                        message += "\n- Granulado + R$2,00";
                        message += "\n- Granola + R$2,00";
                        message += "\n- Fini + R$3,00";
                        message += "\n- Morango + R$4,00";
                        message += "\n- Banana + R$3,00";
                        message += "\n- Kiwi + R$4,00";
                        message += "\n- Nutella + R$5,00";
                        message += "\n\nPor favor, me informe quais acompanhamentos e extras deseja!";
                    } 
                    else if (product.includes('Sorvete')) {
                        message += "\n\nSABORES DISPONÍVEIS:";
                        message += "\n- Chocolate";
                        message += "\n- Morango";
                        message += "\n- Creme";
                        message += "\n- Flocos";
                        message += "\n- Napolitano";
                        message += "\n\nPor favor, me informe quais sabores deseja!";
                    }
                    else if (product.includes('Picolé')) {
                        message += "\n\nTIPOS DE PICOLÉ:";
                        message += "\n- Frutas (morango, limão, uva, coco)";
                        message += "\n- Ao leite (chocolate, creme, flocos)";
                        message += "\n- Trufado (cobertura premium)";
                        message += "\n\nPor favor, me informe qual tipo e sabor deseja!";
                    }
                    else if (product.includes('Chuchup')) {
                        message += "\n\nCHUCHUP:";
                        message += "\n- Pequeno (sabores variados)";
                        message += "\n- Grande (com mais sabor)";
                        message += "\n- Ao leite (chocolate especial)";
                        message += "\n\nPor favor, me informe qual tamanho deseja!";
                    }
                    else {
                        message += "\n\nPoderia me ajudar com o pedido?";
                    }
                    
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
                
                console.log('Cardápio visual aberto pelo usuário');
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
        console.log('WhatsApp aberto para pedido');
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
        
        // Mensagens personalizadas para cada link (sem emojis)
        const categoryMessages = {
            'Açaí Completo': `Olá! Vim pelo site da Max Sorvetes Ibertioga e gostaria de pedir Açaí

ACOMPANHAMENTOS GRÁTIS (ESCOLHA ATÉ 3):
- Leite em pó
- Leite condensado
- Calda (chocolate ou morango)

EXTRAS ADICIONAIS:
- Paçoca + R$2,50
- Granulado + R$2,00
- Granola + R$2,00
- Fini + R$3,00
- Morango + R$4,00
- Banana + R$3,00
- Kiwi + R$4,00
- Nutella + R$5,00

Tamanhos disponíveis:
• 300ml - R$15,00
• 400ml - R$18,00
• 500ml - R$21,00

Por favor, me informe qual tamanho, acompanhamentos e extras deseja!`,
            
            'Sorvete Artesanal': `Olá! Vim pelo site da Max Sorvetes Ibertioga e gostaria de pedir Sorvete

OPÇÕES DISPONÍVEIS:
• Copinho (2 sabores) - R$6,00
• Pote 500ml (4 sabores) - R$8,00
• 3 Bolas na casquinha - R$12,00

SABORES DISPONÍVEIS:
- Chocolate
- Morango
- Creme
- Flocos
- Napolitano

Por favor, me informe qual opção e sabores deseja!`,
            
            'Picolé': `Olá! Vim pelo site da Max Sorvetes Ibertioga e gostaria de pedir Picolé

TIPOS DE PICOLÉ:
• Picolé de Frutas - R$2,50
  (morango, limão, uva, coco)
• Picolé ao Leite - R$5,50
  (chocolate, creme, flocos)
• Picolé Trufado - R$7,00
  (com cobertura premium)

Por favor, me informe qual tipo e sabor deseja!`,
            
            'Chuchup': `Olá! Vim pelo site da Max Sorvetes Ibertioga e gostaria de pedir Chuchup

OPÇÕES DISPONÍVEIS:
• Chuchup Pequeno - R$0,50
• Chuchup Grande - R$1,50
• Chuchup ao Leite - R$3,50

Por favor, me informe qual tamanho deseja!`
        };
        
        whatsappLinks.forEach(link => {
            let href = link.getAttribute('href');
            if (href) {
                // Verificar se é um link com mensagem padrão
                if (href.includes('text=')) {
                    // Verificar qual categoria é pelo texto do botão
                    const buttonText = link.textContent.trim();
                    let newMessage = "Olá! Vim pelo site da Max Sorvetes Ibertioga e gostaria de fazer um pedido";
                    
                    if (buttonText.includes('Açaí')) {
                        newMessage = categoryMessages['Açaí Completo'];
                    } else if (buttonText.includes('Sorvete')) {
                        newMessage = categoryMessages['Sorvete Artesanal'];
                    } else if (buttonText.includes('Picolé') || buttonText.includes('Picolé')) {
                        newMessage = categoryMessages['Picolé'];
                    } else if (buttonText.includes('Chuchup')) {
                        newMessage = categoryMessages['Chuchup'];
                    }
                    
                    // Atualizar o link com a nova mensagem
                    const encodedMessage = encodeURIComponent(newMessage);
                    const newHref = `https://wa.me/553284442475?text=${encodedMessage}`;
                    link.setAttribute('href', newHref);
                }
                
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
            // console.log(`Visualizações do site: ${views}`);
        }
    }

    // ===== PREVENIR COMPORTAMENTO PADRÃO DE LINKS # =====
    function setupLinkPrevention() {
        document.querySelectorAll('a[href="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
            });
        });
    }

    // ===== INICIALIZAR TUDO =====
    function init() {
        setupLinkPrevention();
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
        
        // Animar título do hero após inicialização
        setTimeout(() => {
            const heroTitle = document.querySelector('.hero-title');
            if (heroTitle) {
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            }
        }, 500);
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

// ===== FUNÇÕES DE MENU GLOBAIS =====
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
        menuToggle.classList.add('active');
        document.body.classList.add('menu-open');
    }
}

function closeMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (navMenu && menuToggle) {
        navMenu.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        menuToggle.setAttribute('aria-label', 'Abrir menu');
        menuToggle.classList.remove('active');
        
        setTimeout(() => {
            if (!navMenu.classList.contains('active')) {
                navMenu.style.display = 'none';
            }
        }, 300);
        
        document.body.classList.remove('menu-open');
    }
}