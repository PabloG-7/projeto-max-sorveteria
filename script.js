// Max Sorvetes Ibertioga - Script Completo Corrigido

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== CONFIGURAÇÃO INICIAL =====
    console.log('Max Sorvetes Ibertioga - Inicializando com melhorias...');
    
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
    
    function toggleMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && navMenu.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
    
    // ===== SISTEMA DE NOTIFICAÇÕES INTELIGENTES =====
    function setupSmartNotifications() {
        console.log('🔄 Configurando sistema de notificações inteligentes...');
        
        // 1. SISTEMA DE RASTREAMENTO DE CLICKS EM PRODUTOS
        const productButtons = document.querySelectorAll('[data-item], .item-btn, .btn-category');
        
        productButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productName = this.getAttribute('data-item') || 
                                   this.textContent.trim() || 
                                   this.closest('.menu-item-card')?.querySelector('h4')?.textContent;
                
                if (productName) {
                    trackProductClick(productName);
                    checkForPopularProduct(productName);
                }
            });
        });
        
        // 2. VERIFICAR HORÁRIO DE PICO QUANDO O USUÁRIO ENTRA
        setTimeout(() => {
            checkPeakHours();
        }, 5000);
    }
    
    function trackProductClick(productName) {
        try {
            let productStats = JSON.parse(sessionStorage.getItem('productStats')) || {};
            
            const twoHoursAgo = Date.now() - (2 * 60 * 60 * 1000);
            Object.keys(productStats).forEach(key => {
                if (productStats[key].timestamp < twoHoursAgo) {
                    delete productStats[key];
                }
            });
            
            if (!productStats[productName]) {
                productStats[productName] = {
                    count: 1,
                    timestamp: Date.now(),
                    firstClick: Date.now()
                };
            } else {
                productStats[productName].count++;
                productStats[productName].lastClick = Date.now();
            }
            
            sessionStorage.setItem('productStats', JSON.stringify(productStats));
            console.log(`📊 Produto rastreado: ${productName} (${productStats[productName].count} cliques)`);
            
        } catch (error) {
            console.error('Erro ao rastrear produto:', error);
        }
    }
    
    function checkForPopularProduct(productName) {
        try {
            const productStats = JSON.parse(sessionStorage.getItem('productStats')) || {};
            const productData = productStats[productName];
            
            if (productData && productData.count >= 1) {
                const shownNotifications = JSON.parse(sessionStorage.getItem('shownNotifications')) || [];
                
                if (!shownNotifications.includes(productName)) {
                    setTimeout(() => {
                        showPopularProductNotification(productName, productData.count);
                        shownNotifications.push(productName);
                        sessionStorage.setItem('shownNotifications', JSON.stringify(shownNotifications));
                    }, 1500);
                }
            }
        } catch (error) {
            console.error('Erro ao verificar produto popular:', error);
        }
    }
    
    function showPopularProductNotification(productName, clickCount) {
        const cleanProductName = productName.split(' - ')[0] || productName;
        
        const messages = [
            `🌟 ${cleanProductName} está bombando! Já foi escolhido ${clickCount} vezes hoje.`,
            `🔥 ${cleanProductName} é um dos mais pedidos! Muitos clientes estão amando.`,
            `👍 Ótima escolha! O ${cleanProductName} é um dos favoritos dos nossos clientes.`,
            `💫 ${cleanProductName} está em alta! Nossos clientes adoram este produto.`
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        showSmartNotification({
            title: 'Produto Popular! 🚀',
            message: randomMessage,
            icon: 'fas fa-fire',
            type: 'popular',
            duration: 4000
        });
    }
    
    function checkPeakHours() {
        const now = new Date();
        const hour = now.getHours();
        const day = now.getDay();
        const minutes = now.getMinutes();
        
        const isWeekend = day === 0 || day === 6;
        let isPeakTime = false;
        let peakMessage = '';
        
        // Fim de semana: 14h às 19h (tarde)
        if (isWeekend && hour >= 14 && hour < 19) {
            isPeakTime = true;
            peakMessage = "Fim de semana à tarde é nosso horário mais movimentado!";
        }
        // Toda semana: 18h às 21h (noite)
        else if (hour >= 18 && hour < 21) {
            isPeakTime = true;
            peakMessage = "Noite é horário de pico para pedidos de sorvete!";
        }
        // Sábado específico: 15h às 17h (tarde de sábado)
        else if (day === 6 && hour >= 15 && hour < 17) {
            isPeakTime = true;
            peakMessage = "Sábado à tarde é super movimentado! Recomendamos pedir com antecedência.";
        }
        
        if (isPeakTime) {
            const today = new Date().toDateString();
            const lastNotification = sessionStorage.getItem('lastPeakNotification');
            
            if (lastNotification !== today) {
                setTimeout(() => {
                    showPeakHourNotification(peakMessage, hour);
                    sessionStorage.setItem('lastPeakNotification', today);
                }, 3000);
            }
        }
    }
    
    function showPeakHourNotification(message, currentHour) {
        const suggestions = [
            "📱 Use o WhatsApp para garantir seu pedido mais rápido!",
            "⏰ Peça com 30 minutos de antecedência para evitar esperas.",
            "✅ Pedidos antecipados garantem seu sorvete na hora que quiser!",
            "🎯 Escolha seu sabor favorito e garanta antes que acabe!"
        ];
        
        const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
        
        showSmartNotification({
            title: 'Horário de Pico! ⏰',
            message: `${message} ${randomSuggestion}`,
            icon: 'fas fa-clock',
            type: 'peak',
            duration: 5000,
            showWhatsApp: true
        });
    }
    
    function showSmartNotification(options) {
        const notification = document.createElement('div');
        notification.className = `smart-notification ${options.type}-notification`;
        
        notification.innerHTML = `
            <div class="notification-header">
                <div class="notification-icon">
                    <i class="${options.icon}"></i>
                </div>
                <h4>${options.title}</h4>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="notification-body">
                <p>${options.message}</p>
                ${options.showWhatsApp ? `
                <div class="notification-actions">
                    <a href="https://wa.me/553284442475?text=Oi!%20Vim%20pelo%20site%20da%20Max%20Sorvetes%20Ibertioga%20e%20gostaria%20de%20fazer%20um%20pedido%20antecipado%20para%20evitar%20o%20horário%20de%20pico" 
                       class="notification-whatsapp-btn" 
                       target="_blank">
                        <i class="fab fa-whatsapp"></i> Pedir Antecipado
                    </a>
                </div>
                ` : ''}
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        });
        
        if (options.duration) {
            setTimeout(() => {
                if (notification.classList.contains('show')) {
                    notification.classList.remove('show');
                    setTimeout(() => {
                        if (notification.parentNode) {
                            notification.parentNode.removeChild(notification);
                        }
                    }, 500);
                }
            }, options.duration);
        }
        
        notification.addEventListener('click', (e) => {
            if (e.target === notification) {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 500);
            }
        });
    }
    
    // ===== BOTÕES DO WHATSAPP ATUALIZADOS =====
    function setupOrderButtons() {
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
                    
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 200);
                    
                    openWhatsApp(message);
                }
            });
        });
        
        const cardapioBtn = document.querySelector('.btn-cardapio-imagem');
        if (cardapioBtn) {
            cardapioBtn.addEventListener('click', function(e) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            });
        }
    }

    function openWhatsApp(message) {
        const phoneNumber = "553284442475";
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
    }

    // ===== OUTRAS FUNÇÕES (MANTIDAS IGUAIS) =====
    function setupMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (!menuToggle || !navMenu) return;
        
        function setupInitialState() {
            if (window.innerWidth > 991) {
                navMenu.style.display = 'flex';
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            } else {
                navMenu.style.display = 'none';
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
        
        setupInitialState();
        
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileMenu();
        });
        
        navLinks.forEach(link => {
            if (link.getAttribute('href').startsWith('#')) {
                link.addEventListener('click', function(e) {
                    if (window.innerWidth <= 991) {
                        setTimeout(closeMobileMenu, 100);
                    }
                });
            }
        });
        
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
        
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth > 991) {
                    navMenu.style.display = 'flex';
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    menuToggle.setAttribute('aria-label', 'Abrir menu');
                } else {
                    if (!navMenu.classList.contains('active')) {
                        navMenu.style.display = 'none';
                    }
                }
            }, 250);
        });
    }
    
    function setupSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.getAttribute('href') === '#') return;
                
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        const headerHeight = document.querySelector('.header').offsetHeight;
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                        
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
        updateHeader();
    }
    
    function setupScrollAnimations() {
        const revealElements = document.querySelectorAll('.reveal, .reveal-scale');
        
        if (revealElements.length === 0) return;
        
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
        updateActiveMenu();
    }
    
    function updateWhatsAppLinks() {
        const whatsappLinks = document.querySelectorAll('a[href*="whatsapp"]');
        
        if (whatsappLinks.length === 0) return;
        
        whatsappLinks.forEach(link => {
            let href = link.getAttribute('href');
            if (href) {
                if (href.includes('5532986262715')) {
                    href = href.replace('5532986262715', '553284442475');
                    link.setAttribute('href', href);
                }
            }
        });
    }
    
    function setupLightboxFix() {
        setTimeout(() => {
            if (typeof lightbox !== 'undefined') {
                lightbox.option({
                    'disableScrolling': false,
                    'albumLabel': "Imagem %1 de %2",
                    'fadeDuration': 300,
                    'resizeDuration': 200
                });
            }
        }, 1000);
        
        document.addEventListener('click', function(e) {
            if (e.target.matches('a[data-lightbox]')) {
                const href = e.target.getAttribute('href');
                if (!href || !href.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
                    e.preventDefault();
                }
            }
        });
    }
    
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
        setupLightboxFix();
        setupSmartNotifications(); // ← NOVO SISTEMA
        
        document.documentElement.classList.remove('no-js');
        document.documentElement.classList.add('js');
        
        console.log('✅ Max Sorvetes Ibertioga - Site inicializado!');
        console.log('📞 WhatsApp: (32) 98444-2475');
        console.log('📍 Endereço: R. Rio de Janeiro, 652 - Ibertioga/MG');
        
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

// ===== FUNÇÕES GLOBAIS =====
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