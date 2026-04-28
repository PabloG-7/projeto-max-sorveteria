(function () {
  const phone = "553284442475";
  const menu = document.querySelector(".nav-menu");
  const menuToggle = document.querySelector(".menu-toggle");
  const modal = document.getElementById("acai-modal");
  const cardapioModal = document.getElementById("cardapio-modal");
  const openCardapioBtn = document.getElementById("openCardapioModal");
  const galleryModal = document.getElementById("gallery-modal");
  const galleryImage = document.getElementById("galleryImage");
  const galleryCaption = document.getElementById("galleryCaption");
  const galleryPrev = document.getElementById("galleryPrev");
  const galleryNext = document.getElementById("galleryNext");

  let currentImageIndex = 0;
  let galleryImages = [];

  // Fallback para imagens quebradas
  document.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", () => {
      const fallback = document.createElement("div");
      fallback.className = "image-fallback";
      fallback.textContent = image.alt || "Imagem da Max Sorvetes";
      image.replaceWith(fallback);
    }, { once: true });
  });

  function whatsApp(message) {
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  }

  function setMenu(open) {
    if (!menu || !menuToggle) return;
    menu.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    document.body.classList.toggle("menu-open", open);
  }

  menuToggle?.addEventListener("click", () => setMenu(!menu?.classList.contains("open")));

  // Scroll suave nos links âncora
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      setMenu(false);
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Atualizar link ativo no scroll
  const sections = [...document.querySelectorAll("main section[id]")];
  const navLinks = [...document.querySelectorAll(".nav-link")];

  function updateActiveLink() {
    const current = sections.reduce((active, section) => {
      return window.scrollY >= section.offsetTop - 130 ? section.id : active;
    }, "home");

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  }

  window.addEventListener("scroll", updateActiveLink, { passive: true });
  updateActiveLink();

  function priceFrom(text) {
    const match = String(text).match(/R\$\s*([\d,.]+)/);
    return match ? Number(match[1].replace(".", "").replace(",", ".")) : 0;
  }

  // ========== MODAL CARDÁPIO ==========
  function openCardapioModal() {
    if (!cardapioModal) return;
    cardapioModal.classList.add("open");
    cardapioModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");
  }

  function closeCardapioModal() {
    if (!cardapioModal) return;
    cardapioModal.classList.remove("open");
    cardapioModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");
  }

  if (openCardapioBtn) {
    openCardapioBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openCardapioModal();
    });
  }

  // ========== MODAL GALERIA ==========
  function initGallery() {
    const items = document.querySelectorAll(".gallery-item");
    galleryImages = Array.from(items).map(item => ({
      src: item.dataset.image,
      title: item.dataset.title
    }));
    
    items.forEach((item, index) => {
      item.addEventListener("click", () => {
        currentImageIndex = index;
        openGalleryModal();
      });
    });
  }

  function openGalleryModal() {
    if (!galleryModal) return;
    updateGalleryImage();
    galleryModal.classList.add("open");
    galleryModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");
  }

  function closeGalleryModal() {
    if (!galleryModal) return;
    galleryModal.classList.remove("open");
    galleryModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");
  }

  function updateGalleryImage() {
    const image = galleryImages[currentImageIndex];
    if (image && galleryImage) {
      galleryImage.src = image.src;
      galleryImage.alt = image.title;
      if (galleryCaption) galleryCaption.textContent = image.title;
    }
  }

  function nextImage() {
    if (!galleryImages.length) return;
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateGalleryImage();
  }

  function prevImage() {
    if (!galleryImages.length) return;
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateGalleryImage();
  }

  // Eventos da galeria
  galleryPrev?.addEventListener("click", prevImage);
  galleryNext?.addEventListener("click", nextImage);

  // ========== MODAL AÇAÍ ==========
  document.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-item]");
    if (!button) return;

    const item = button.dataset.item || "";
    if (button.dataset.acai === "1" || /açaí/i.test(item)) {
      openAcaiModal(item, priceFrom(item));
      return;
    }

    let message = `Olá! Vim pelo site da Max Sorvetes Ibertioga e gostaria de fazer um pedido.\n\n• ${item}`;

    if (/sorvete/i.test(item)) {
      message += "\n\nPode me informar os sabores disponíveis?";
    }
    if (/picolé/i.test(item)) {
      message += "\n\nQuero escolher o tipo e sabor do picolé.";
    }
    if (/chuchup/i.test(item)) {
      message += "\n\nQuero escolher o tamanho e sabor do chuchup.";
    }

    whatsApp(message);
  });

  function formatMoney(value) {
    return `R$ ${value.toFixed(2).replace(".", ",")}`;
  }

  function openAcaiModal(productName, basePrice) {
    if (!modal) return;
    const price = basePrice || 15;
    const content = modal.querySelector(".modal-content");
    if (!content) return;

    content.innerHTML = `
      <div class="modal-header">
        <div>
          <p class="eyebrow">Monte seu açaí</p>
          <h3>${productName}</h3>
        </div>
        <button class="modal-close" type="button" data-close-modal aria-label="Fechar"><i class="fa-solid fa-xmark"></i></button>
      </div>

      <div class="modal-section">
        <h4>Escolha até 3 acompanhamentos grátis</h4>
        <div class="choice-list" data-free-list>
          ${["Leite em pó", "Leite condensado", "Calda de chocolate", "Calda de morango"].map((item) => `
            <label><span>${item}</span><input type="checkbox" value="${item}"></label>
          `).join("")}
        </div>
      </div>

      <div class="modal-section">
        <h4>Extras opcionais</h4>
        <label class="radio-row"><span>Sem extras</span><input type="radio" name="extras-mode" value="none" checked></label>
        <label class="radio-row"><span>Adicionar extras</span><input type="radio" name="extras-mode" value="add"></label>
        <div class="choice-list" data-extra-list hidden>
          ${[
            ["Paçoca", 2.5],
            ["Granulado", 2],
            ["Granola", 2],
            ["Fini", 3],
            ["Morango", 4],
            ["Banana", 3],
            ["Kiwi", 4],
            ["Nutella", 5]
          ].map(([item, extraPrice]) => `
            <label><span>${item}</span><span>+ ${formatMoney(extraPrice)} <input type="checkbox" value="${item}" data-price="${extraPrice}"></span></label>
          `).join("")}
        </div>
      </div>

      <div class="total-box">
        <span>Total</span>
        <strong data-total>${formatMoney(price)}</strong>
      </div>

      <div class="modal-actions">
        <button class="btn-cancel" type="button" data-close-modal>Cancelar</button>
        <button class="btn-confirm" type="button" data-confirm-acai><i class="fa-brands fa-whatsapp"></i> Confirmar</button>
      </div>
    `;

    modal.dataset.product = productName;
    modal.dataset.basePrice = String(price);
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");
    content.querySelector(".modal-close")?.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");
  }

  function updateTotal() {
    if (!modal) return;
    const basePrice = Number(modal.dataset.basePrice || 0);
    const total = [...modal.querySelectorAll("[data-extra-list] input:checked")]
      .reduce((sum, input) => sum + Number(input.dataset.price || 0), basePrice);
    const totalNode = modal.querySelector("[data-total]");
    if (totalNode) totalNode.textContent = formatMoney(total);
  }

  modal?.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-modal]")) {
      closeModal();
      return;
    }

    if (event.target.matches('input[name="extras-mode"]')) {
      const list = modal.querySelector("[data-extra-list]");
      if (list) {
        list.hidden = event.target.value !== "add";
        if (list.hidden) list.querySelectorAll("input").forEach((input) => (input.checked = false));
      }
      updateTotal();
      return;
    }

    if (event.target.matches("[data-free-list] input")) {
      const checked = modal.querySelectorAll("[data-free-list] input:checked");
      if (checked.length > 3) event.target.checked = false;
      return;
    }

    if (event.target.matches("[data-extra-list] input")) {
      updateTotal();
      return;
    }

    if (event.target.closest("[data-confirm-acai]")) {
      const product = modal.dataset.product || "Açaí";
      const basePrice = Number(modal.dataset.basePrice || 0);
      const free = [...modal.querySelectorAll("[data-free-list] input:checked")].map((input) => input.value);
      const extras = [...modal.querySelectorAll("[data-extra-list] input:checked")];
      const extrasTotal = extras.reduce((sum, input) => sum + Number(input.dataset.price || 0), 0);
      const extrasText = extras.map((input) => `${input.value} (+ ${formatMoney(Number(input.dataset.price || 0))})`);

      let message = `Olá! Vim pelo site da Max Sorvetes Ibertioga e gostaria de fazer um pedido:\n\n`;
      message += `• ${product}\n`;
      message += `Acompanhamentos: ${free.length ? free.join(", ") : "sem acompanhamentos"}\n`;
      message += `Extras: ${extrasText.length ? extrasText.join(", ") : "sem extras"}\n\n`;
      message += `Total: ${formatMoney(basePrice + extrasTotal)}\n\n`;
      message += `Endereço para entrega:\nForma de pagamento:`;

      closeModal();
      whatsApp(message);
    }
  });

  // ========== FECHAR MODAIS COM CLICK NO OVERLAY ==========
  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-cardapio]")) {
      closeCardapioModal();
    }
    if (event.target.closest("[data-close-gallery]")) {
      closeGalleryModal();
    }
  });

  // ========== TECLAS DE NAVEGAÇÃO ==========
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenu(false);
      closeModal();
      closeCardapioModal();
      closeGalleryModal();
    }
    
    if (galleryModal?.classList.contains("open")) {
      if (event.key === "ArrowLeft") {
        prevImage();
      } else if (event.key === "ArrowRight") {
        nextImage();
      }
    }
  });

  // Header scroll effect
const header = document.querySelector('.site-header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ========== SCROLL REVEAL ==========
(function() {
  // Seleciona todos os elementos que terão animação
  const revealElements = document.querySelectorAll(
    '.hero, .trust-grid article, .category, .product-card, .gallery-item, .steps article, .contact-cards article, .map-card'
  );
  
  // Configurações
  const config = {
    threshold: 0.1, // 10% do elemento visível
    rootMargin: '0px 0px -50px 0px' // Dispara um pouco antes
  };
  
  // Adiciona as classes de reveal nos elementos
  revealElements.forEach((element, index) => {
    // Adiciona classe base reveal
    element.classList.add('reveal');
    
    // Define tipo de animação baseado na posição ou tipo do elemento
    if (element.classList.contains('hero')) {
      element.classList.add('reveal-fade-up');
    } 
    else if (element.classList.contains('trust-grid') && element.tagName === 'ARTICLE') {
      element.classList.add('reveal-fade-up');
      element.classList.add(`delay-${(index % 5) + 1}`);
    }
    else if (element.classList.contains('category')) {
      element.classList.add('reveal-fade-left');
    }
    else if (element.classList.contains('product-card')) {
      element.classList.add('reveal-scale');
      element.classList.add(`delay-${(index % 4) + 1}`);
    }
    else if (element.classList.contains('gallery-item')) {
      element.classList.add('reveal-fade-up');
      element.classList.add(`delay-${(index % 4) + 1}`);
    }
    else if (element.classList.contains('steps') && element.tagName === 'ARTICLE') {
      element.classList.add('reveal-fade-right');
      element.classList.add(`delay-${(index % 3) + 1}`);
    }
    else if (element.classList.contains('contact-cards') && element.tagName === 'ARTICLE') {
      element.classList.add('reveal-fade-left');
      element.classList.add(`delay-${(index % 3) + 1}`);
    }
    else if (element.classList.contains('map-card')) {
      element.classList.add('reveal-fade-right');
    }
    else {
      element.classList.add('reveal-fade-up');
    }
  });
  
  // Adiciona animação para os headings das seções
  const sectionHeadings = document.querySelectorAll('.section-heading');
  sectionHeadings.forEach((heading) => {
    heading.classList.add('reveal', 'reveal-fade-down');
  });
  
  // Adiciona animação para o footer
  const footer = document.querySelector('.footer');
  if (footer) {
    footer.classList.add('reveal', 'reveal-fade-up');
  }
  
  // Observer para detectar quando os elementos entram na tela
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Opcional: depois que animar, pode parar de observar (melhora performance)
        observer.unobserve(entry.target);
      }
    });
  }, config);
  
  // Observa cada elemento
  revealElements.forEach(element => {
    observer.observe(element);
  });
  
  // Observa os headings
  sectionHeadings.forEach(heading => {
    observer.observe(heading);
  });
  
  if (footer) {
    observer.observe(footer);
  }
  
  // Suporte para dispositivos que não tem IntersectionObserver
  if (!window.IntersectionObserver) {
    // Fallback: mostra todos os elementos imediatamente
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('active');
    });
  }
})();

  // ========== INICIALIZAR GALERIA ==========
  initGallery();
})();