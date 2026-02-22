// Max Sorvetes Ibertioga - Script Completo (LIMPO, SEM DUPLICADOS, SEM EVENTOS EM DOBRO)

(function () {
  // =========================
  // Utils
  // =========================
  const phoneNumber = "553284442475";

  const isAcaiText = (s = "") => /açaí/i.test(String(s));

  const safeJSON = (key, fallback) => {
    try {
      const v = sessionStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch {
      return fallback;
    }
  };

  const setJSON = (key, value) => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch {}
  };

  function openWhatsApp(message) {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  }

  function extractPrice(text) {
    const match = String(text || "").match(/R\$\s*([\d,]+)/);
    if (match) return match[1].replace(",", ".");
    return null;
  }

  // =========================
  // Mobile Menu
  // =========================
  function openMobileMenu() {
    const navMenu = document.querySelector(".nav-menu");
    const menuToggle = document.querySelector(".menu-toggle");

    if (navMenu && menuToggle) {
      navMenu.style.display = "flex";
      setTimeout(() => navMenu.classList.add("active"), 10);

      menuToggle.innerHTML = '<i class="fas fa-times"></i>';
      menuToggle.setAttribute("aria-label", "Fechar menu");
      menuToggle.classList.add("active");
      document.body.classList.add("menu-open");
    }
  }

  function closeMobileMenu() {
    const navMenu = document.querySelector(".nav-menu");
    const menuToggle = document.querySelector(".menu-toggle");

    if (navMenu && menuToggle) {
      navMenu.classList.remove("active");

      menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      menuToggle.setAttribute("aria-label", "Abrir menu");
      menuToggle.classList.remove("active");

      setTimeout(() => {
        if (!navMenu.classList.contains("active")) navMenu.style.display = "none";
      }, 300);

      document.body.classList.remove("menu-open");
    }
  }

  function toggleMobileMenu() {
    const navMenu = document.querySelector(".nav-menu");
    if (navMenu && navMenu.classList.contains("active")) closeMobileMenu();
    else openMobileMenu();
  }

  function setupMobileMenu() {
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (!menuToggle || !navMenu) return;

    const setupInitialState = () => {
      if (window.innerWidth > 991) {
        navMenu.style.display = "flex";
        navMenu.classList.remove("active");
        menuToggle.classList.remove("active");
        document.body.classList.remove("menu-open");
      } else {
        navMenu.style.display = "none";
        navMenu.classList.remove("active");
        menuToggle.classList.remove("active");
      }
    };

    setupInitialState();

    menuToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleMobileMenu();
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      if (href.startsWith("#")) {
        link.addEventListener("click", function () {
          if (window.innerWidth <= 991) setTimeout(closeMobileMenu, 100);
        });
      }
    });

    document.addEventListener("click", function (e) {
      if (
        window.innerWidth <= 991 &&
        navMenu &&
        !navMenu.contains(e.target) &&
        menuToggle &&
        !menuToggle.contains(e.target) &&
        navMenu.classList.contains("active")
      ) {
        closeMobileMenu();
      }
    });

    let resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (window.innerWidth > 991) {
          navMenu.style.display = "flex";
          navMenu.classList.remove("active");
          menuToggle.classList.remove("active");
          document.body.classList.remove("menu-open");
          menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
          menuToggle.setAttribute("aria-label", "Abrir menu");
        } else {
          if (!navMenu.classList.contains("active")) navMenu.style.display = "none";
        }
      }, 250);
    });
  }

  // =========================
  // Smooth scroll + active menu
  // =========================
  function setupLinkPrevention() {
    document.querySelectorAll('a[href="#"]').forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
      });
    });
  }

  function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {
      link.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (!href || href === "#") return;

        if (href.startsWith("#")) {
          e.preventDefault();

          const targetElement = document.querySelector(href);
          if (targetElement) {
            const header = document.querySelector(".header");
            const headerHeight = header ? header.offsetHeight : 0;

            const targetPosition =
              targetElement.getBoundingClientRect().top + window.pageYOffset;

            if (window.innerWidth <= 991) closeMobileMenu();

            window.scrollTo({
              top: targetPosition - headerHeight,
              behavior: "smooth",
            });
          }
        }
      });
    });
  }

  function setupHeaderScroll() {
    const header = document.querySelector(".header");
    if (!header) return;

    const updateHeader = () => {
      if (window.scrollY > 50) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };

    window.addEventListener("scroll", updateHeader);
    updateHeader();
  }

  function setupScrollAnimations() {
    const revealElements = document.querySelectorAll(".reveal, .reveal-scale");
    if (revealElements.length === 0) return;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }

  function setupActiveMenu() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");
    if (sections.length === 0 || navLinks.length === 0) return;

    const updateActiveMenu = () => {
      let current = "";
      const header = document.querySelector(".header");
      const headerHeight = header ? header.offsetHeight : 0;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - headerHeight - 100) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        const href = link.getAttribute("href");
        if (href === `#${current}`) link.classList.add("active");
      });
    };

    window.addEventListener("scroll", updateActiveMenu);
    updateActiveMenu();
  }

  // =========================
  // Lightbox
  // =========================
  function setupLightboxFix() {
    setTimeout(() => {
      if (typeof lightbox !== "undefined") {
        lightbox.option({
          disableScrolling: false,
          albumLabel: "Imagem %1 de %2",
          fadeDuration: 300,
          resizeDuration: 200,
        });
      }
    }, 1000);

    document.addEventListener("click", function (e) {
      const a = e.target.closest('a[data-lightbox]');
      if (!a) return;

      const href = a.getAttribute("href");
      if (!href || !href.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
        e.preventDefault();
      }
    });
  }

  // =========================
  // WhatsApp link fix
  // =========================
  function updateWhatsAppLinks() {
    const whatsappLinks = document.querySelectorAll('a[href*="whatsapp"], a[href*="wa.me"]');
    if (whatsappLinks.length === 0) return;

    whatsappLinks.forEach((link) => {
      let href = link.getAttribute("href");
      if (!href) return;

      // Se tinha número antigo em algum lugar
      if (href.includes("5532986262715")) {
        href = href.replace("5532986262715", phoneNumber);
        link.setAttribute("href", href);
      }
    });
  }

  // =========================
  // Smart notifications
  // =========================
  function setupSmartNotifications() {
    console.log("🔄 Configurando sistema de notificações inteligentes...");

    // Track clicks em qualquer botão com data-item ou botões de categoria
    const productButtons = document.querySelectorAll("[data-item], .btn-category");

    productButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const productName =
          this.getAttribute("data-item") ||
          (this.textContent || "").trim() ||
          this.closest(".menu-item-card")?.querySelector("h4")?.textContent;

        if (productName) {
          trackProductClick(productName);
          checkForPopularProduct(productName);
        }
      });
    });

    setTimeout(checkPeakHours, 5000);
  }

  function trackProductClick(productName) {
    try {
      let productStats = safeJSON("productStats", {});
      const twoHoursAgo = Date.now() - 2 * 60 * 60 * 1000;

      Object.keys(productStats).forEach((key) => {
        if (productStats[key]?.timestamp < twoHoursAgo) delete productStats[key];
      });

      if (!productStats[productName]) {
        productStats[productName] = {
          count: 1,
          timestamp: Date.now(),
          firstClick: Date.now(),
        };
      } else {
        productStats[productName].count++;
        productStats[productName].lastClick = Date.now();
      }

      setJSON("productStats", productStats);
      console.log(`📊 Produto rastreado: ${productName} (${productStats[productName].count} cliques)`);
    } catch (error) {
      console.error("Erro ao rastrear produto:", error);
    }
  }

  function checkForPopularProduct(productName) {
    try {
      const productStats = safeJSON("productStats", {});
      const productData = productStats[productName];

      if (productData && productData.count >= 1) {
        const shown = safeJSON("shownNotifications", []);
        if (!shown.includes(productName)) {
          setTimeout(() => {
            showPopularProductNotification(productName, productData.count);
            shown.push(productName);
            setJSON("shownNotifications", shown);
          }, 1500);
        }
      }
    } catch (error) {
      console.error("Erro ao verificar produto popular:", error);
    }
  }

  function showPopularProductNotification(productName, clickCount) {
    const clean = String(productName).split(" - ")[0] || productName;

    const messages = [
      `🌟 ${clean} está bombando! Já foi escolhido ${clickCount} vezes hoje.`,
      `🔥 ${clean} é um dos mais pedidos! Muitos clientes estão amando.`,
      `👍 Ótima escolha! O ${clean} é um dos favoritos dos nossos clientes.`,
      `💫 ${clean} está em alta! Nossos clientes adoram este produto.`,
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    showSmartNotification({
      title: "Produto Popular! 🚀",
      message: randomMessage,
      icon: "fas fa-fire",
      type: "popular",
      duration: 4000,
    });
  }

  function checkPeakHours() {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();

    const isWeekend = day === 0 || day === 6;
    let isPeakTime = false;
    let peakMessage = "";

    if (isWeekend && hour >= 14 && hour < 19) {
      isPeakTime = true;
      peakMessage = "Fim de semana à tarde é nosso horário mais movimentado!";
    } else if (hour >= 18 && hour < 21) {
      isPeakTime = true;
      peakMessage = "Noite é horário de pico para pedidos de sorvete!";
    } else if (day === 6 && hour >= 15 && hour < 17) {
      isPeakTime = true;
      peakMessage = "Sábado à tarde é super movimentado! Recomendamos pedir com antecedência.";
    }

    if (!isPeakTime) return;

    const today = new Date().toDateString();
    const last = sessionStorage.getItem("lastPeakNotification");

    if (last !== today) {
      setTimeout(() => {
        showPeakHourNotification(peakMessage);
        sessionStorage.setItem("lastPeakNotification", today);
      }, 3000);
    }
  }

  function showPeakHourNotification(message) {
    const suggestions = [
      "📱 Use o WhatsApp para garantir seu pedido mais rápido!",
      "⏰ Peça com 30 minutos de antecedência para evitar esperas.",
      "✅ Pedidos antecipados garantem seu sorvete na hora que quiser!",
      "🎯 Escolha seu sabor favorito e garanta antes que acabe!",
    ];

    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];

    showSmartNotification({
      title: "Horário de Pico! ⏰",
      message: `${message} ${randomSuggestion}`,
      icon: "fas fa-clock",
      type: "peak",
      duration: 5000,
      showWhatsApp: true,
    });
  }

  function showSmartNotification(options) {
    const notification = document.createElement("div");
    notification.className = `smart-notification ${options.type}-notification`;

    notification.innerHTML = `
      <div class="notification-header">
        <div class="notification-icon">
          <i class="${options.icon}"></i>
        </div>
        <h4>${options.title}</h4>
        <button class="notification-close" type="button">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="notification-body">
        <p>${options.message}</p>
        ${
          options.showWhatsApp
            ? `
          <div class="notification-actions">
            <a href="https://wa.me/${phoneNumber}?text=${encodeURIComponent(
              "Oi! Vim pelo site da Max Sorvetes Ibertioga e gostaria de fazer um pedido antecipado para evitar o horário de pico"
            )}"
              class="notification-whatsapp-btn"
              target="_blank" rel="noopener">
              <i class="fab fa-whatsapp"></i> Pedir Antecipado
            </a>
          </div>
        `
            : ""
        }
      </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add("show"), 100);

    const closeBtn = notification.querySelector(".notification-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        notification.classList.remove("show");
        setTimeout(() => notification.remove(), 500);
      });
    }

    if (options.duration) {
      setTimeout(() => {
        if (notification.classList.contains("show")) {
          notification.classList.remove("show");
          setTimeout(() => notification.remove(), 500);
        }
      }, options.duration);
    }

    notification.addEventListener("click", (e) => {
      if (e.target === notification) {
        notification.classList.remove("show");
        setTimeout(() => notification.remove(), 500);
      }
    });
  }

  // =========================
  // Order buttons (WhatsApp)
  // =========================
  function setupOrderButtons() {
    const baseMessage =
      "Olá! Vim pelo site da Max Sorvetes Ibertioga e gostaria de fazer um pedido\n\n";

    // ✅ Delegation: pega clique em qualquer BUTTON com data-item (menos Açaí)
    document.addEventListener("click", function (e) {
      const btn = e.target.closest('button[data-item], .btn-category[data-item]');
      if (!btn) return;

      const product = btn.getAttribute("data-item") || "";
      if (!product) return;

      // Açaí é tratado pelo modal, não por aqui
      if (isAcaiText(product)) return;

      e.preventDefault();

      let message = baseMessage + `• ${product}`;

      if (product.includes("Sorvete")) {
        message += "\n\nSABORES DISPONÍVEIS:";
        message += "\n- Chocolate";
        message += "\n- Morango";
        message += "\n- Creme";
        message += "\n- Flocos";
        message += "\n- Napolitano";
        message += "\n\nPor favor, me informe quais sabores deseja!";
      } else if (product.includes("Picolé")) {
        message += "\n\nTIPOS DE PICOLÉ:";
        message += "\n- Frutas (morango, limão, uva, coco)";
        message += "\n- Ao leite (chocolate, creme, flocos)";
        message += "\n- Trufado (cobertura premium)";
        message += "\n\nPor favor, me informe qual tipo e sabor deseja!";
      } else if (product.includes("Chuchup")) {
        message += "\n\nCHUCHUP:";
        message += "\n- Pequeno (sabores variados)";
        message += "\n- Grande (com mais sabor)";
        message += "\n- Ao leite (chocolate especial)";
        message += "\n\nPor favor, me informe qual tamanho deseja!";
      } else {
        message += "\n\nPoderia me ajudar com o pedido?";
      }

      btn.style.transform = "scale(0.95)";
      setTimeout(() => (btn.style.transform = ""), 200);

      openWhatsApp(message);
    });

    // Só animação do botão do cardápio (se existir)
    const cardapioBtn = document.querySelector(".btn-cardapio-imagem");
    if (cardapioBtn) {
      cardapioBtn.addEventListener("click", function () {
        this.style.transform = "scale(0.95)";
        setTimeout(() => (this.style.transform = ""), 200);
      });
    }
  }

  // =========================
  // Açaí modal cart
  // =========================
  function setupAcaiCart() {
    console.log("🛒 Configurando carrinho de açaí...");

    // ✅ Só botões do AÇAÍ
    const selectorAcai = '.item-btn[data-item*="Açaí"], .item-btn[data-item*="açaí"]';

    // Remove listeners antigos só nos botões de Açaí
    document.querySelectorAll(selectorAcai).forEach((btn) => {
      btn.replaceWith(btn.cloneNode(true));
    });

    // Listener (capture) para garantir que não cai no WhatsApp do setupOrderButtons
    document.addEventListener(
      "click",
      function (e) {
        const btn = e.target.closest(selectorAcai);
        if (!btn) return;

        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        const productName = btn.getAttribute("data-item") || "Açaí";
        const productPrice = extractPrice(productName) || "15.00";

        openAcaiModal(productName, productPrice);
        return false;
      },
      true
    );
  }

  function openAcaiModal(productName, basePrice) {
    const modal = document.getElementById("acai-modal");
    if (!modal) {
      console.warn("⚠️ Modal #acai-modal não encontrado no HTML");
      return;
    }

    const modalContent = modal.querySelector(".modal-content");
    if (!modalContent) {
      console.warn("⚠️ .modal-content não encontrado dentro do modal");
      return;
    }

    const priceNumber = parseFloat(basePrice) || 15;

    const modalHTML = `
      <div class="modal-header">
        <i class="fas fa-glass-whiskey" style="color: var(--roxo-escuro); font-size: 2rem;"></i>
        <h3>${productName}</h3>
        <button class="modal-close" id="modal-close-btn" type="button">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="modal-section">
        <h4><i class="fas fa-gift"></i> ESCOLHA ATÉ 3 ACOMPANHAMENTOS GRÁTIS</h4>
        <div class="checkbox-group" id="acompanhamentos-group">
          <div class="checkbox-item">
            <input type="checkbox" id="acomp1" value="Leite em pó">
            <label for="acomp1">Leite em pó</label>
          </div>
          <div class="checkbox-item">
            <input type="checkbox" id="acomp2" value="Leite condensado">
            <label for="acomp2">Leite condensado</label>
          </div>
          <div class="checkbox-item">
            <input type="checkbox" id="acomp3" value="Calda de chocolate">
            <label for="acomp3">Calda de chocolate</label>
          </div>
          <div class="checkbox-item">
            <input type="checkbox" id="acomp4" value="Calda de morango">
            <label for="acomp4">Calda de morango</label>
          </div>
        </div>
        <small class="counter" id="acomp-counter">0/3 selecionados</small>
      </div>

      <div class="modal-section">
        <h4><i class="fas fa-plus-circle"></i> EXTRAS (OPCIONAIS)</h4>

        <div class="skip-option">
          <input type="radio" name="extras-option" id="skip-extras" value="skip" checked>
          <span>✅ Não quero extras, só os acompanhamentos grátis</span>
        </div>

        <div class="skip-option">
          <input type="radio" name="extras-option" id="add-extras" value="add">
          <span>➕ Quero adicionar extras (valores adicionais)</span>
        </div>

        <div class="extras-list" id="extras-list" style="display: none;">
          <div class="checkbox-group">
            <div class="checkbox-item">
              <input type="checkbox" id="extra1" value="Paçoca" data-price="2.50">
              <label for="extra1">Paçoca</label>
              <span class="price">+ R$ 2,50</span>
            </div>
            <div class="checkbox-item">
              <input type="checkbox" id="extra2" value="Granulado" data-price="2.00">
              <label for="extra2">Granulado</label>
              <span class="price">+ R$ 2,00</span>
            </div>
            <div class="checkbox-item">
              <input type="checkbox" id="extra3" value="Granola" data-price="2.00">
              <label for="extra3">Granola</label>
              <span class="price">+ R$ 2,00</span>
            </div>
            <div class="checkbox-item">
              <input type="checkbox" id="extra4" value="Fini" data-price="3.00">
              <label for="extra4">Fini</label>
              <span class="price">+ R$ 3,00</span>
            </div>
            <div class="checkbox-item">
              <input type="checkbox" id="extra5" value="Morango" data-price="4.00">
              <label for="extra5">Morango</label>
              <span class="price">+ R$ 4,00</span>
            </div>
            <div class="checkbox-item">
              <input type="checkbox" id="extra6" value="Banana" data-price="3.00">
              <label for="extra6">Banana</label>
              <span class="price">+ R$ 3,00</span>
            </div>
            <div class="checkbox-item">
              <input type="checkbox" id="extra7" value="Kiwi" data-price="4.00">
              <label for="extra7">Kiwi</label>
              <span class="price">+ R$ 4,00</span>
            </div>
            <div class="checkbox-item">
              <input type="checkbox" id="extra8" value="Nutella" data-price="5.00">
              <label for="extra8">Nutella</label>
              <span class="price">+ R$ 5,00</span>
            </div>
          </div>
        </div>
      </div>

      <div class="total-section">
        <h4>TOTAL DO PEDIDO</h4>
        <div id="total-price-display">R$ ${priceNumber.toFixed(2).replace(".", ",")}</div>
      </div>

      <div class="modal-buttons">
        <button class="btn-cancel" id="btn-cancel-modal" type="button">
          <i class="fas fa-times"></i> Cancelar
        </button>
        <button class="btn-confirm" id="btn-confirm-modal" type="button">
          <i class="fab fa-whatsapp"></i> Confirmar Pedido
        </button>
      </div>
    `;

    modalContent.innerHTML = modalHTML;
    modal.style.display = "flex";

    const overlay = modal.querySelector(".modal-overlay");
    const btnCancel = document.getElementById("btn-cancel-modal");
    const btnClose = document.getElementById("modal-close-btn");
    const btnConfirm = document.getElementById("btn-confirm-modal");

    const handleClose = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      closeAcaiModal();
    };

    if (btnCancel) btnCancel.addEventListener("click", handleClose);
    if (btnClose) btnClose.addEventListener("click", handleClose);
    if (overlay) overlay.addEventListener("click", handleClose);

    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        closeAcaiModal();
        document.removeEventListener("keydown", handleEscKey);
      }
    };
    document.addEventListener("keydown", handleEscKey);

    // Acompanhamentos limite 3
    const counter = document.getElementById("acomp-counter");
    modal.querySelectorAll('#acompanhamentos-group input[type="checkbox"]').forEach((cb) => {
      cb.addEventListener("change", function () {
        const checked = modal.querySelectorAll(
          '#acompanhamentos-group input[type="checkbox"]:checked'
        );
        if (checked.length > 3) {
          this.checked = false;
          return;
        }
        if (counter) counter.textContent = `${checked.length}/3 selecionados`;
      });
    });

    // Extras toggle + total
    const extrasList = document.getElementById("extras-list");
    const skip = document.getElementById("skip-extras");
    const add = document.getElementById("add-extras");

    const recalc = () => updateTotal(priceNumber);

    if (skip) {
      skip.addEventListener("change", function () {
        if (this.checked) {
          if (extrasList) extrasList.style.display = "none";
          modal.querySelectorAll('#extras-list input[type="checkbox"]').forEach((cb) => (cb.checked = false));
          recalc();
        }
      });
    }

    if (add) {
      add.addEventListener("change", function () {
        if (this.checked) {
          if (extrasList) extrasList.style.display = "block";
          recalc();
        }
      });
    }

    modal.querySelectorAll('#extras-list input[type="checkbox"]').forEach((cb) => {
      cb.addEventListener("change", recalc);
    });

    if (btnConfirm) {
      btnConfirm.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        confirmAcaiOrder(productName, priceNumber);
      });
    }

    updateTotal(priceNumber);
    console.log("🛒 Modal de açaí aberto com sucesso!");
  }

  function updateTotal(basePrice = 15) {
    const modal = document.getElementById("acai-modal");
    if (!modal) return;

    let total = parseFloat(basePrice) || 15;

    const extrasChecked = modal.querySelectorAll('#extras-list input[type="checkbox"]:checked');
    extrasChecked.forEach((extra) => {
      const price = parseFloat(extra.getAttribute("data-price")) || 0;
      total += price;
    });

    const totalElement = document.getElementById("total-price-display");
    if (totalElement) totalElement.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;
  }

  function closeAcaiModal() {
    const modal = document.getElementById("acai-modal");
    if (modal) modal.style.display = "none";
    console.log("🔒 Modal fechado");
  }

  function confirmAcaiOrder(productName, basePrice) {
    const modal = document.getElementById("acai-modal");
    if (!modal) return;

    const acompanhamentos = [];
    modal.querySelectorAll('#acompanhamentos-group input[type="checkbox"]:checked').forEach((cb) => {
      acompanhamentos.push(cb.value);
    });

    const extras = [];
    let extrasTotal = 0;
    modal.querySelectorAll('#extras-list input[type="checkbox"]:checked').forEach((cb) => {
      const extraName = cb.value;
      const extraPrice = parseFloat(cb.getAttribute("data-price")) || 0;
      extras.push(`${extraName} (+ R$ ${extraPrice.toFixed(2).replace(".", ",")})`);
      extrasTotal += extraPrice;
    });

    const total = (parseFloat(basePrice) || 15) + extrasTotal;

    let message = `Olá! Vim pelo site da Max Sorvetes Ibertioga e gostaria de fazer um pedido:\n\n`;
    message += `• ${productName}\n`;

    if (acompanhamentos.length > 0) {
      message += `  Acompanhamentos: ${acompanhamentos.join(", ")}\n`;
    } else {
      message += `  (Sem acompanhamentos)\n`;
    }

    if (extras.length > 0) {
      message += `  Extras: ${extras.join(", ")}\n`;
    } else {
      message += `  (Sem extras adicionais)\n`;
    }

    message += `\n💰 Total: R$ ${total.toFixed(2).replace(".", ",")}\n\n`;
    message += `📍 Endereço para entrega: ___________________\n`;
    message += `💳 Forma de pagamento: ___________________`;

    closeAcaiModal();

    setTimeout(() => openWhatsApp(message), 300);
  }

  // =========================
  // ANIMAÇÃO STAGGER PARA TRUST-CARD
  // =========================
  function setupTrustCardsAnimation() {
    const trustCards = document.querySelectorAll('.trust-card');

    if (trustCards.length > 0) {
      console.log('🎯 Configurando animação stagger para trust-cards...');

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${index * 120}ms`;
            entry.target.classList.add('active');
          }
        });
      }, {
        threshold: 0.2
      });

      trustCards.forEach(card => observer.observe(card));
    }
  }

  // =========================
  // Global functions (compat com HTML)
  // =========================
  window.scrollToCardapio = function scrollToCardapio() {
    const cardapioSection = document.querySelector("#cardapio");
    if (!cardapioSection) return;

    const header = document.querySelector(".header");
    const headerHeight = header ? header.offsetHeight : 0;
    const targetPosition = cardapioSection.getBoundingClientRect().top + window.pageYOffset;

    window.scrollTo({ top: targetPosition - headerHeight, behavior: "smooth" });
  };

  window.openCardapioImage = function openCardapioImage() {
    const cardapioImage = document.querySelector(".btn-cardapio-imagem");
    if (cardapioImage) cardapioImage.click();
  };

  // =========================
  // Init
  // =========================
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
    setupSmartNotifications();
    setupAcaiCart();
    setupTrustCardsAnimation(); // <-- NOVA FUNÇÃO ADICIONADA AQUI

    document.documentElement.classList.remove("no-js");
    document.documentElement.classList.add("js");

    console.log("✅ Max Sorvetes Ibertioga - Site inicializado!");
    console.log("📞 WhatsApp:", phoneNumber);
    console.log("📍 Endereço: R. Rio de Janeiro, 652 - Ibertioga/MG");

    setTimeout(() => {
      const heroTitle = document.querySelector(".hero-title");
      if (heroTitle) {
        heroTitle.style.opacity = "1";
        heroTitle.style.transform = "translateY(0)";
      }
    }, 500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();