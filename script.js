// Max Sorvetes Ibertioga - Script Final

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

    // Menu mobile - CORRIGIDO E FUNCIONAL
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
        }
    }

    // Botões de pedido do WhatsApp
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

    // ANIMAÇÃO SCROLL REVEAL - NOVA E MELHOR
    function setupScrollAnimations() {
        const revealElements = document.querySelectorAll('.reveal, .reveal-scale');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
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

    // Interatividade com a nova foto do Max
    function setupMaxInteraction() {
        const photoContainer = document.querySelector('.photo-container');
        const scoopFloats = document.querySelectorAll('.scoop-float');
        
        if (!photoContainer) return;
        
        photoContainer.addEventListener('mouseenter', () => {
            scoopFloats.forEach(scoop => {
                scoop.style.animationPlayState = 'paused';
            });
        });
        
        photoContainer.addEventListener('mouseleave', () => {
            scoopFloats.forEach(scoop => {
                scoop.style.animationPlayState = 'running';
            });
        });
    }

    // Atualizar menu ativo durante scroll
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

    // Função para atualizar todos os links do WhatsApp
    function updateWhatsAppLinks() {
        // Atualizar todos os links de WhatsApp no documento
        const whatsappLinks = document.querySelectorAll('a[href*="whatsapp"]');
        
        whatsappLinks.forEach(link => {
            let href = link.getAttribute('href');
            if (href) {
                // Substituir "Maxx%20Sorvetes%20Bertioga" por "Max%20Sorvetes%20Ibertioga"
                href = href.replace(/Maxx%20Sorvetes%20Bertioga/g, 'Max%20Sorvetes%20Ibertioga');
                link.setAttribute('href', href);
            }
        });
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
        updateWhatsAppLinks(); // Atualizar links do WhatsApp
        
        // Adicionar classe para dispositivos touch
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            document.body.classList.add('touch-device');
        }
        
        console.log('🍦 Max Sorvetes Ibertioga - Site carregado com sucesso!');
    }

    // Iniciar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
});

// CORREÇÃO DO MENU MOBILE (Função alternativa)
function setupMobileMenuV2() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!menuToggle || !navMenu) return;
    
    // Inicialmente o menu deve estar visível em desktop
    if (window.innerWidth > 991) {
        navMenu.style.display = 'flex';
        navMenu.style.opacity = '1';
        navMenu.style.transform = 'translateY(0)';
    } else {
        navMenu.style.display = 'none';
    }
    
    // Toggle do menu
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        
        if (navMenu.classList.contains('active')) {
            closeMobileMenuV2();
        } else {
            openMobileMenuV2();
        }
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 991 && 
            !navMenu.contains(e.target) && 
            !menuToggle.contains(e.target) &&
            navMenu.classList.contains('active')) {
            closeMobileMenuV2();
        }
    });
    
    // Fechar menu ao clicar em um link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 991) {
                setTimeout(closeMobileMenuV2, 300);
            }
        });
    });
    
    // Atualizar menu ao redimensionar
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991) {
            // Em desktop, menu sempre visível
            navMenu.classList.remove('active');
            navMenu.style.display = 'flex';
            navMenu.style.opacity = '1';
            navMenu.style.transform = 'translateY(0)';
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            menuToggle.setAttribute('aria-label', 'Abrir menu');
        } else {
            // Em mobile, verificar estado
            if (!navMenu.classList.contains('active')) {
                navMenu.style.display = 'none';
                navMenu.style.opacity = '0';
                navMenu.style.transform = 'translateY(-20px)';
            }
        }
    });
}

function openMobileMenuV2() {
    const navMenu = document.querySelector('.nav-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (navMenu && menuToggle) {
        navMenu.style.display = 'flex';
        setTimeout(() => {
            navMenu.classList.add('active');
        }, 10);
        menuToggle.innerHTML = '<i class="fas fa-times"></i>';
        menuToggle.setAttribute('aria-label', 'Fechar menu');
        
        // Adicionar a classe de prevenção de scroll ao body
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileMenuV2() {
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
        
        // Remover a classe de prevenção de scroll
        document.body.style.overflow = '';
    }
}

// ANIMAÇÃO DOS ELEMENTOS DE FUNDO
function setupBackgroundAnimation() {
    const bgElements = document.querySelectorAll('.bg-icecream');
    
    bgElements.forEach(element => {
        // Adicionar efeito de parallax suave
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 10;
            const y = (e.clientY / window.innerHeight) * 10;
            
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Inicialização completa
(function() {
    console.log('Max Sorvetes Ibertioga - Animações inicializadas!');
    
    // Verificar se há elementos de fundo para animar
    const bgElements = document.querySelectorAll('.bg-icecream');
    if (bgElements.length > 0) {
        setupBackgroundAnimation();
    }
})();