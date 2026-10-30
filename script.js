/**
 * ══════════════════════════════════════════════════════════════════════
 * SCRIPT.JS — LOVE PIZZA
 * Catálogo interactivo, Carrito de Compras con Persistencia y Checkout por WhatsApp
 * ══════════════════════════════════════════════════════════════════════
 */

// 1. CONSTANTE CONFIGURABLE DE WHATSAPP (Guatemala +502)
const WHATSAPP_NUMBER = "50233071482";

// 2. ESTADO GLOBAL DE LA APLICACIÓN
const AppState = {
  categoriaActiva: "todas",
  carrito: [],
  productoEnModal: null,
  tamanoSeleccionado: "personal"
};

// 3. SELECTORES DEL DOM
const DOM = {
  // Header & Menú Móvil
  header: document.getElementById("header"),
  menuToggle: document.getElementById("menu-toggle"),
  mainNav: document.getElementById("main-nav"),
  cartOpenBtn: document.getElementById("cart-open-btn"),
  cartCount: document.getElementById("cart-count"),

  // Hero & Acciones
  heroQuickOrder: document.getElementById("hero-quick-order"),

  // Menú & Filtros
  categoriesContainer: document.getElementById("categories-container"),
  filteredCount: document.getElementById("filtered-count"),
  productsGrid: document.getElementById("products-grid"),

  // Galería
  galleryGrid: document.getElementById("gallery-grid"),

  // Caja de Resumen en Sección Pedido
  orderBoxItemsCount: document.getElementById("order-box-items-count"),
  orderBoxPreview: document.getElementById("order-box-preview"),
  orderBoxTotal: document.getElementById("order-box-total"),
  orderBoxCheckoutBtn: document.getElementById("order-box-checkout-btn"),

  // Drawer de Carrito
  cartBackdrop: document.getElementById("cart-backdrop"),
  cartDrawer: document.getElementById("cart-drawer"),
  cartCloseBtn: document.getElementById("cart-close-btn"),
  cartItemsContainer: document.getElementById("cart-items-container"),
  cartTotalAmount: document.getElementById("cart-total-amount"),
  btnClearCart: document.getElementById("btn-clear-cart"),

  // Formulario Checkout
  checkoutForm: document.getElementById("checkout-form"),
  clientName: document.getElementById("client-name"),
  deliveryTypeRadios: document.getElementsByName("delivery-type"),
  addressGroup: document.getElementById("address-group"),
  clientAddress: document.getElementById("client-address"),
  clientNotes: document.getElementById("client-notes"),
  errorName: document.getElementById("error-name"),
  errorAddress: document.getElementById("error-address"),
  btnSendWhatsapp: document.getElementById("btn-send-whatsapp"),

  // Modal Selector de Tamaño & Personalización
  modalBackdrop: document.getElementById("modal-backdrop"),
  sizeModal: document.getElementById("size-modal"),
  modalCloseBtn: document.getElementById("modal-close-btn"),
  modalProductTitle: document.getElementById("modal-product-title"),
  modalProductDesc: document.getElementById("modal-product-desc"),
  modalSizesContainer: document.getElementById("modal-sizes-container"),
  modalItemNote: document.getElementById("modal-item-note"),
  modalSelectedPrice: document.getElementById("modal-selected-price"),
  modalAddBtn: document.getElementById("modal-add-btn"),

  // Toast
  cartToast: document.getElementById("cart-toast"),
  toastMessage: document.getElementById("toast-message"),

  // Barra Flotante Inferior Móvil
  mobileCartBar: document.getElementById("mobile-cart-bar"),
  mobileCartCount: document.getElementById("mobile-cart-count"),
  mobileCartTotal: document.getElementById("mobile-cart-total"),
  mobileCartBtn: document.getElementById("mobile-cart-btn")
};

// ══════════════ 4. INICIALIZACIÓN ══════════════
document.addEventListener("DOMContentLoaded", () => {
  cargarCarritoDesdeStorage();
  inicializarMenuCategorias();
  renderizarMenuProductos();
  renderizarGaleria();
  actualizarVistaCarrito();
  configurarEventos();
  configurarAnimacionScroll();
});

// ══════════════ 5. PERSISTENCIA EN LOCALSTORAGE ══════════════
function guardarCarritoEnStorage() {
  try {
    localStorage.setItem("love_pizza_cart", JSON.stringify(AppState.carrito));
  } catch (error) {
    console.warn("No se pudo guardar el carrito en localStorage:", error);
  }
}

function cargarCarritoDesdeStorage() {
  try {
    const guardado = localStorage.getItem("love_pizza_cart");
    if (guardado) {
      AppState.carrito = JSON.parse(guardado);
    }
  } catch (error) {
    console.warn("No se pudo recuperar el carrito de localStorage:", error);
    AppState.carrito = [];
  }
}

// ══════════════ 6. RENDERIZADO DEL MENÚ Y FILTROS ══════════════
function inicializarMenuCategorias() {
  if (!DOM.categoriesContainer || typeof CATEGORIAS === "undefined") return;

  DOM.categoriesContainer.innerHTML = "";
  CATEGORIAS.forEach((cat) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `cat-btn ${cat.id === AppState.categoriaActiva ? "active" : ""}`;
    btn.textContent = cat.nombre;
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", cat.id === AppState.categoriaActiva ? "true" : "false");
    btn.dataset.category = cat.id;

    btn.addEventListener("click", () => {
      AppState.categoriaActiva = cat.id;
      document.querySelectorAll(".cat-btn").forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      renderizarMenuProductos();
    });

    DOM.categoriesContainer.appendChild(btn);
  });
}

function renderizarMenuProductos() {
  if (!DOM.productsGrid || typeof PRODUCTOS === "undefined") return;

  const productosFiltrados = AppState.categoriaActiva === "todas"
    ? PRODUCTOS
    : PRODUCTOS.filter((p) => p.categoria === AppState.categoriaActiva);

  if (DOM.filteredCount) {
    DOM.filteredCount.textContent = productosFiltrados.length;
  }

  DOM.productsGrid.innerHTML = "";

  productosFiltrados.forEach((prod) => {
    const card = document.createElement("article");
    card.className = "product-card reveal is-visible";
    card.id = `card-${prod.id}`;

    // Determinar si es pizza con tamaños o producto con precio único
    const tieneTamanos = prod.precios && typeof prod.precios.personal !== "undefined";
    const precioBase = tieneTamanos ? prod.precios.personal : (prod.precios.unico || 0);

    // Badges / Etiquetas sin emojis
    let badgesHtml = "";
    if (prod.etiquetas && prod.etiquetas.length > 0) {
      badgesHtml = `
        <div class="product-badges">
          ${prod.etiquetas.map(tag => {
            const esVeggie = tag.toLowerCase().includes("veggie");
            const esPicante = tag.toLowerCase().includes("picante");
            return `<span class="badge-tag ${esVeggie ? 'tag-veggie' : esPicante ? 'tag-picante' : ''}">${tag}</span>`;
          }).join("")}
        </div>
      `;
    }

    // Selector rápido de tamaño para pizzas en la misma tarjeta
    let tamanosHtml = "";
    if (tieneTamanos) {
      tamanosHtml = `
        <div class="size-pills-row" role="group" aria-label="Seleccionar tamaño">
          <button type="button" class="size-pill selected" data-size="personal" data-price="${prod.precios.personal}" aria-label="Tamaño personal">
            <span class="s-name">Personal</span>
            <span class="s-price">Q${prod.precios.personal}</span>
          </button>
          <button type="button" class="size-pill" data-size="mediana" data-price="${prod.precios.mediana}" aria-label="Tamaño mediana">
            <span class="s-name">Mediana</span>
            <span class="s-price">Q${prod.precios.mediana}</span>
          </button>
          <button type="button" class="size-pill" data-size="familiar" data-price="${prod.precios.familiar}" aria-label="Tamaño familiar">
            <span class="s-name">Familiar</span>
            <span class="s-price">Q${prod.precios.familiar}</span>
          </button>
        </div>
      `;
    }

    const tieneImagen = Boolean(prod.imagen && prod.imagen.trim() !== "");
    const imagenHtml = tieneImagen
      ? `<img src="${prod.imagen}" alt="${prod.nombre}" loading="lazy" onerror="handleImageError(this, '${prod.nombre}')">`
      : `<div class="image-slot-placeholder">
           <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FFD52A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
             <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
             <circle cx="8.5" cy="8.5" r="1.5"></circle>
             <polyline points="21 15 16 10 5 21"></polyline>
           </svg>
           <span class="placeholder-text">${prod.nombre}</span>
           <span class="placeholder-hint">Espacio para imagen</span>
         </div>`;

    card.innerHTML = `
      <div class="image-slot">
        ${badgesHtml}
        ${imagenHtml}
      </div>
      <div class="product-content">
        <h3 class="product-title">${prod.nombre}</h3>
        <p class="product-desc">${prod.descripcion}</p>
        
        ${tamanosHtml}

        <div class="product-footer">
          <div class="price-box">
            <span class="price-label">${tieneTamanos ? 'Desde:' : 'Precio:'}</span>
            <strong class="price-value" id="display-price-${prod.id}">Q${precioBase}</strong>
          </div>
          <button type="button" class="btn btn-primary btn-add-cart" data-id="${prod.id}">
            ${tieneTamanos ? 'Pedir' : 'Agregar'}
          </button>
        </div>
      </div>
    `;

    // Interacción con los pills de tamaño en tarjeta
    if (tieneTamanos) {
      const pills = card.querySelectorAll(".size-pill");
      const priceDisplay = card.querySelector(`#display-price-${prod.id}`);
      let tamanoCardSeleccionado = "personal";

      pills.forEach((pill) => {
        pill.addEventListener("click", () => {
          pills.forEach((p) => p.classList.remove("selected"));
          pill.classList.add("selected");
          tamanoCardSeleccionado = pill.dataset.size;
          priceDisplay.textContent = `Q${pill.dataset.price}`;
        });
      });

      // Botón Pedir Pizza abre modal de personalización
      const addBtn = card.querySelector(".btn-add-cart");
      addBtn.addEventListener("click", () => {
        abrirModalTamano(prod, tamanoCardSeleccionado);
      });
    } else {
      // Producto sin tamaños (bebida, postre, combo, entrada)
      const addBtn = card.querySelector(".btn-add-cart");
      addBtn.addEventListener("click", () => {
        agregarProductoAlCarrito({
          id: prod.id,
          nombre: prod.nombre,
          tamano: null,
          precio: prod.precios.unico || 0,
          nota: "",
          cantidad: 1
        });
      });
    }

    DOM.productsGrid.appendChild(card);
  });
}

// Fallback sin emojis si la imagen falla o está pendiente de colocar
window.handleImageError = function (imgElement, nombre) {
  const slot = imgElement.parentElement;
  if (!slot) return;
  imgElement.style.display = "none";
  if (!slot.querySelector(".image-slot-placeholder")) {
    const fallback = document.createElement("div");
    fallback.className = "image-slot-placeholder";
    fallback.innerHTML = `
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FFD52A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <circle cx="8.5" cy="8.5" r="1.5"></circle>
        <polyline points="21 15 16 10 5 21"></polyline>
      </svg>
      <span class="placeholder-text">${nombre}</span>
      <span class="placeholder-hint">Espacio para imagen</span>
    `;
    slot.appendChild(fallback);
  }
};

// ══════════════ 7. RENDERIZADO DE GALERÍA (Grid Asimétrico 12 col) ══════════════
function renderizarGaleria() {
  if (!DOM.galleryGrid || typeof GALERIA_FOTOS === "undefined") return;

  DOM.galleryGrid.innerHTML = "";
  GALERIA_FOTOS.forEach((foto) => {
    const item = document.createElement("div");
    item.className = `gallery-item ${foto.colSpan} ${foto.rowSpan} reveal`;

    item.innerHTML = `
      <img src="${foto.imagen}" alt="${foto.titulo}" loading="lazy" onerror="handleImageError(this, '${foto.titulo}')">
      <div class="gallery-overlay">
        <span class="gallery-tag">${foto.tag}</span>
        <h3 class="gallery-item-title">${foto.titulo}</h3>
        <p class="gallery-item-sub">${foto.subtitulo}</p>
      </div>
    `;

    DOM.galleryGrid.appendChild(item);
  });
}

// ══════════════ 8. MODAL DE PERSONALIZACIÓN Y TAMAÑO ══════════════
function abrirModalTamano(prod, tamanoPorDefecto = "personal") {
  AppState.productoEnModal = prod;
  AppState.tamanoSeleccionado = tamanoPorDefecto;

  if (DOM.modalProductTitle) DOM.modalProductTitle.textContent = prod.nombre;
  if (DOM.modalProductDesc) DOM.modalProductDesc.textContent = prod.descripcion;
  if (DOM.modalItemNote) DOM.modalItemNote.value = "";

  // Renderizar tarjetas de tamaño
  if (DOM.modalSizesContainer) {
    DOM.modalSizesContainer.innerHTML = "";
    const opciones = [
      { key: "personal", nombre: "Personal", porciones: "4 porciones" },
      { key: "mediana", nombre: "Mediana", porciones: "8 porciones" },
      { key: "familiar", nombre: "Familiar", porciones: "12 porciones" }
    ];

    opciones.forEach((opc) => {
      const precio = prod.precios[opc.key] || 0;
      const card = document.createElement("button");
      card.type = "button";
      card.className = `modal-size-card ${opc.key === AppState.tamanoSeleccionado ? "active" : ""}`;
      card.dataset.size = opc.key;
      card.dataset.price = precio;

      card.innerHTML = `
        <span class="m-size-name">${opc.nombre}</span>
        <span class="m-size-price">Q${precio}</span>
        <small style="font-size:0.75rem; color:#AAA;">${opc.porciones}</small>
      `;

      card.addEventListener("click", () => {
        document.querySelectorAll(".modal-size-card").forEach((c) => c.classList.remove("active"));
        card.classList.add("active");
        AppState.tamanoSeleccionado = opc.key;
        actualizarPrecioModal(precio);
      });

      DOM.modalSizesContainer.appendChild(card);
    });

    const precioActual = prod.precios[AppState.tamanoSeleccionado] || prod.precios.personal;
    actualizarPrecioModal(precioActual);
  }

  // Mostrar Modal y Backdrop
  DOM.modalBackdrop.classList.add("open");
  DOM.modalBackdrop.setAttribute("aria-hidden", "false");
  DOM.sizeModal.classList.add("open");
  DOM.sizeModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function actualizarPrecioModal(precio) {
  if (DOM.modalSelectedPrice) {
    DOM.modalSelectedPrice.textContent = `Q${precio}`;
  }
}

function cerrarModalTamano() {
  DOM.modalBackdrop.classList.remove("open");
  DOM.modalBackdrop.setAttribute("aria-hidden", "true");
  DOM.sizeModal.classList.remove("open");
  DOM.sizeModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  AppState.productoEnModal = null;
}

// ══════════════ 9. LÓGICA DEL CARRITO DE COMPRAS ══════════════
function agregarProductoAlCarrito(itemNuevo) {
  // Buscar si ya existe la misma pizza con el mismo tamaño y la misma nota
  const index = AppState.carrito.findIndex(
    (item) => item.id === itemNuevo.id && item.tamano === itemNuevo.tamano && item.nota === itemNuevo.nota
  );

  if (index > -1) {
    AppState.carrito[index].cantidad += itemNuevo.cantidad;
  } else {
    AppState.carrito.push(itemNuevo);
  }

  guardarCarritoEnStorage();
  actualizarVistaCarrito();
  dispararEfectosAgregado(itemNuevo.nombre);
}

function dispararEfectosAgregado(nombreProducto) {
  // Animación bounce en badge
  if (DOM.cartCount) {
    DOM.cartCount.classList.remove("bounce");
    void DOM.cartCount.offsetWidth; // Forzar reflow
    DOM.cartCount.classList.add("bounce");
  }

  // Toast flotante sin emojis
  mostrarToast(`¡${nombreProducto} agregado con amor!`);
}

function mostrarToast(mensaje) {
  if (!DOM.cartToast || !DOM.toastMessage) return;
  DOM.toastMessage.textContent = mensaje;
  DOM.cartToast.classList.add("show");
  DOM.cartToast.setAttribute("aria-hidden", "false");

  clearTimeout(DOM.cartToast._timeout);
  DOM.cartToast._timeout = setTimeout(() => {
    DOM.cartToast.classList.remove("show");
    DOM.cartToast.setAttribute("aria-hidden", "true");
  }, 3200);
}

function actualizarCantidadItem(index, delta) {
  if (!AppState.carrito[index]) return;

  AppState.carrito[index].cantidad += delta;
  if (AppState.carrito[index].cantidad <= 0) {
    AppState.carrito.splice(index, 1);
  }

  guardarCarritoEnStorage();
  actualizarVistaCarrito();
}

function eliminarItemCarrito(index) {
  if (!AppState.carrito[index]) return;
  AppState.carrito.splice(index, 1);
  guardarCarritoEnStorage();
  actualizarVistaCarrito();
}

function vaciarCarrito() {
  if (AppState.carrito.length === 0) return;
  if (confirm("¿Deseas vaciar todo tu carrito de pizzas?")) {
    AppState.carrito = [];
    guardarCarritoEnStorage();
    actualizarVistaCarrito();
    mostrarToast("Carrito vaciado");
  }
}

// ══════════════ 10. SINCRONIZACIÓN DE LA VISTA DEL CARRITO ══════════════
function actualizarVistaCarrito() {
  const totalItems = AppState.carrito.reduce((acc, it) => acc + it.cantidad, 0);
  const totalDinero = AppState.carrito.reduce((acc, it) => acc + (it.precio * it.cantidad), 0);
  const totalFormateado = `Q${totalDinero.toFixed(2)}`;

  // Actualizar Badge Header
  if (DOM.cartCount) DOM.cartCount.textContent = totalItems;

  // Actualizar Total en Drawer
  if (DOM.cartTotalAmount) DOM.cartTotalAmount.textContent = totalFormateado;

  // Actualizar Caja de Sección Pedido (05)
  if (DOM.orderBoxItemsCount) DOM.orderBoxItemsCount.textContent = `${totalItems} ${totalItems === 1 ? 'producto' : 'productos'}`;
  if (DOM.orderBoxTotal) DOM.orderBoxTotal.textContent = totalFormateado;

  // Actualizar Barra Flotante Inferior Móvil
  if (DOM.mobileCartBar) {
    if (totalItems > 0) {
      DOM.mobileCartBar.classList.add("visible");
      DOM.mobileCartBar.setAttribute("aria-hidden", "false");
      if (DOM.mobileCartCount) DOM.mobileCartCount.textContent = totalItems;
      if (DOM.mobileCartTotal) DOM.mobileCartTotal.textContent = totalFormateado;
    } else {
      DOM.mobileCartBar.classList.remove("visible");
      DOM.mobileCartBar.setAttribute("aria-hidden", "true");
    }
  }

  // Habilitar / deshabilitar botones de checkout
  const carritoVacio = AppState.carrito.length === 0;
  if (DOM.btnSendWhatsapp) {
    DOM.btnSendWhatsapp.disabled = carritoVacio;
    DOM.btnSendWhatsapp.style.opacity = carritoVacio ? "0.55" : "1";
    DOM.btnSendWhatsapp.style.cursor = carritoVacio ? "not-allowed" : "pointer";
  }

  // Renderizar Items dentro del Drawer
  renderizarItemsEnDrawer(carritoVacio);

  // Renderizar Vista Previa en Sección Pedido
  renderizarPreviewEnSeccionPedido(carritoVacio, totalDinero);
}

function renderizarItemsEnDrawer(estaVacio) {
  if (!DOM.cartItemsContainer) return;

  if (estaVacio) {
    DOM.cartItemsContainer.innerHTML = `
      <div class="empty-cart-state">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#FFD52A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="margin: 0 auto 12px; display: block;">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <h3 class="empty-cart-title">¡Tu carrito está hambriento!</h3>
        <p class="empty-cart-desc">Aún no has agregado ninguna pizza. Mira nuestra carta y date un gusto delicioso.</p>
        <button type="button" class="btn btn-secondary btn-sm" onclick="cerrarDrawerCarrito(); location.href='#menu';">
          Explorar Menú ↓
        </button>
      </div>
    `;
    return;
  }

  DOM.cartItemsContainer.innerHTML = "";
  AppState.carrito.forEach((item, index) => {
    const itemEl = document.createElement("div");
    itemEl.className = "cart-item";

    const etiquetaTamano = item.tamano 
      ? `(${item.tamano.charAt(0).toUpperCase() + item.tamano.slice(1)})` 
      : "";

    itemEl.innerHTML = `
      <div class="cart-item-top">
        <div>
          <h4 class="cart-item-name">${item.nombre}</h4>
          ${etiquetaTamano ? `<span class="cart-item-size-tag">${etiquetaTamano} — Q${item.precio} c/u</span>` : `<span class="cart-item-size-tag">Q${item.precio} c/u</span>`}
        </div>
        <button type="button" class="btn-remove-item" data-index="${index}" title="Eliminar este producto" aria-label="Eliminar ${item.nombre}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>

      ${item.nota ? `<p class="cart-item-note">Nota: "${item.nota}"</p>` : ""}

      <div class="cart-item-bottom">
        <div class="quantity-controls" role="group" aria-label="Control de cantidad">
          <button type="button" class="qty-btn" data-action="minus" data-index="${index}" aria-label="Disminuir cantidad">−</button>
          <span class="qty-number" aria-label="${item.cantidad} unidades">${item.cantidad}</span>
          <button type="button" class="qty-btn" data-action="plus" data-index="${index}" aria-label="Aumentar cantidad">+</button>
        </div>
        <strong class="cart-item-subtotal">Q${(item.precio * item.cantidad).toFixed(2)}</strong>
      </div>
    `;

    // Eventos de cantidad y eliminar
    itemEl.querySelector(".btn-remove-item").addEventListener("click", () => eliminarItemCarrito(index));
    itemEl.querySelector('[data-action="minus"]').addEventListener("click", () => actualizarCantidadItem(index, -1));
    itemEl.querySelector('[data-action="plus"]').addEventListener("click", () => actualizarCantidadItem(index, 1));

    DOM.cartItemsContainer.appendChild(itemEl);
  });
}

function renderizarPreviewEnSeccionPedido(estaVacio, totalDinero) {
  if (!DOM.orderBoxPreview) return;

  if (estaVacio) {
    DOM.orderBoxPreview.innerHTML = `
      <div class="empty-state-mini">
        <p>Tu carrito aún está vacío. ¡Explora nuestro menú y agrega tus pizzas favoritas!</p>
        <a href="#menu" class="btn btn-primary btn-sm">Ver Pizzas Disponibles</a>
      </div>
    `;
    return;
  }

  DOM.orderBoxPreview.innerHTML = `
    <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; max-height: 200px; overflow-y: auto; padding-right: 4px;">
      ${AppState.carrito.map(item => `
        <li style="display: flex; justify-content: space-between; font-size: 0.95rem; border-bottom: 1px dashed rgba(255,255,255,0.15); padding-bottom: 6px;">
          <span>
            <strong>${item.cantidad}x</strong> ${item.nombre} 
            ${item.tamano ? `<small style="color:var(--amarillo);">(${item.tamano})</small>` : ''}
          </span>
          <strong style="color:var(--amarillo);">Q${(item.precio * item.cantidad).toFixed(2)}</strong>
        </li>
      `).join('')}
    </ul>
  `;
}

// ══════════════ 11. GESTIÓN DEL DRAWER LATERAL ══════════════
function abrirDrawerCarrito() {
  DOM.cartBackdrop.classList.add("open");
  DOM.cartBackdrop.setAttribute("aria-hidden", "false");
  DOM.cartDrawer.classList.add("open");
  DOM.cartDrawer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function cerrarDrawerCarrito() {
  DOM.cartBackdrop.classList.remove("open");
  DOM.cartBackdrop.setAttribute("aria-hidden", "true");
  DOM.cartDrawer.classList.remove("open");
  DOM.cartDrawer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// ══════════════ 12. ENVÍO DE PEDIDO POR WHATSAPP ══════════════
function manejarEnvioWhatsApp(e) {
  e.preventDefault();

  if (AppState.carrito.length === 0) {
    mostrarToast("¡Agrega al menos una pizza antes de ordenar!");
    return;
  }

  // Limpiar errores previos
  if (DOM.errorName) DOM.errorName.textContent = "";
  if (DOM.errorAddress) DOM.errorAddress.textContent = "";

  const nombre = DOM.clientName ? DOM.clientName.value.trim() : "";
  let tipoEntrega = "domicilio";
  if (DOM.deliveryTypeRadios) {
    for (const radio of DOM.deliveryTypeRadios) {
      if (radio.checked) tipoEntrega = radio.value;
    }
  }

  const direccion = DOM.clientAddress ? DOM.clientAddress.value.trim() : "";
  const notaGeneral = DOM.clientNotes ? DOM.clientNotes.value.trim() : "";

  // Validaciones
  let hayError = false;
  if (!nombre) {
    if (DOM.errorName) DOM.errorName.textContent = "Por favor ingresa tu nombre.";
    DOM.clientName.focus();
    hayError = true;
  }

  if (tipoEntrega === "domicilio" && !direccion) {
    if (DOM.errorAddress) DOM.errorAddress.textContent = "Ingresa tu dirección exacta de entrega.";
    if (!hayError && DOM.clientAddress) DOM.clientAddress.focus();
    hayError = true;
  }

  if (hayError) return;

  // Construcción de la línea de entrega
  const textoEntrega = tipoEntrega === "domicilio" 
    ? `A domicilio - ${direccion}` 
    : "Para recoger en local";

  // Construcción de las líneas de productos
  const lineasProductos = AppState.carrito.map((item) => {
    const tamanoTxt = item.tamano ? ` (${item.tamano.charAt(0).toUpperCase() + item.tamano.slice(1)})` : "";
    const subtotal = item.precio * item.cantidad;
    let linea = `• ${item.cantidad}x ${item.nombre}${tamanoTxt} - Q${subtotal}`;
    if (item.nota) {
      linea += `\n  Nota: ${item.nota}`;
    }
    return linea;
  }).join("\n");

  const totalCalculado = AppState.carrito.reduce((acc, it) => acc + (it.precio * it.cantidad), 0);

  

  // Formato exacto requerido con emojis garantizados:
  let mensaje = `*Nuevo pedido - Love Pizza* \n`;
  mensaje += ` Cliente: ${nombre}\n`;
  mensaje += `Entrega: ${textoEntrega}\n`;
  if (notaGeneral) {
    mensaje += `*Observación: ${notaGeneral}*\n`;
  }
  mensaje += `────────────\n`;
  mensaje += `${lineasProductos}\n`;
  mensaje += `────────────\n`;
  mensaje += `*Total: Q${totalCalculado.toFixed(0)}*\n`;
  mensaje += `¡Gracias!`;

  // Construir URL oficial de WhatsApp con codificación UTF-8
  const urlWhatsApp = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
  
  // Abrir SIEMPRE en una nueva pestaña sin cambiar ni recargar la pestaña actual
  const linkWhatsApp = document.createElement("a");
  linkWhatsApp.href = urlWhatsApp;
  linkWhatsApp.target = "_blank";
  linkWhatsApp.rel = "noopener noreferrer";
  document.body.appendChild(linkWhatsApp);
  linkWhatsApp.click();
  linkWhatsApp.remove();

  // Notificación de confirmación
  mostrarToast("Abriendo WhatsApp para enviar tu pedido...");
}

// ══════════════ 13. CONFIGURACIÓN DE EVENTOS ══════════════
function configurarEventos() {
  // Toggle Menú Hamburguesa Móvil
  if (DOM.menuToggle && DOM.mainNav) {
    DOM.menuToggle.addEventListener("click", () => {
      const estaAbierto = DOM.mainNav.classList.toggle("open");
      DOM.menuToggle.classList.toggle("open", estaAbierto);
      DOM.menuToggle.setAttribute("aria-expanded", estaAbierto ? "true" : "false");
    });

    // Cerrar menú al hacer clic en enlaces
    DOM.mainNav.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        DOM.mainNav.classList.remove("open");
        DOM.menuToggle.classList.remove("open");
        DOM.menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Abrir Carrito desde Header
  if (DOM.cartOpenBtn) {
    DOM.cartOpenBtn.addEventListener("click", abrirDrawerCarrito);
  }

  // Abrir Carrito desde Hero "Ver mi pedido"
  if (DOM.heroQuickOrder) {
    DOM.heroQuickOrder.addEventListener("click", abrirDrawerCarrito);
  }

  // Abrir Carrito desde Barra Flotante Móvil
  if (DOM.mobileCartBtn) {
    DOM.mobileCartBtn.addEventListener("click", abrirDrawerCarrito);
  }
  if (DOM.mobileCartBar) {
    DOM.mobileCartBar.addEventListener("click", (e) => {
      // Si el usuario toca cualquier parte de la barra flotante móvil, abrir carrito
      if (!e.target.closest("button")) {
        abrirDrawerCarrito();
      }
    });
  }

  // Cerrar Carrito
  if (DOM.cartCloseBtn) DOM.cartCloseBtn.addEventListener("click", cerrarDrawerCarrito);
  if (DOM.cartBackdrop) DOM.cartBackdrop.addEventListener("click", cerrarDrawerCarrito);

  // Vaciar Carrito
  if (DOM.btnClearCart) DOM.btnClearCart.addEventListener("click", vaciarCarrito);

  // Modal Tamaño: Cerrar
  if (DOM.modalCloseBtn) DOM.modalCloseBtn.addEventListener("click", cerrarModalTamano);
  if (DOM.modalBackdrop) DOM.modalBackdrop.addEventListener("click", cerrarModalTamano);

  // Modal Tamaño: Botón Agregar al Carrito
  if (DOM.modalAddBtn) {
    DOM.modalAddBtn.addEventListener("click", () => {
      if (!AppState.productoEnModal) return;

      const precio = AppState.productoEnModal.precios[AppState.tamanoSeleccionado];
      const nota = DOM.modalItemNote ? DOM.modalItemNote.value.trim() : "";

      agregarProductoAlCarrito({
        id: AppState.productoEnModal.id,
        nombre: AppState.productoEnModal.nombre,
        tamano: AppState.tamanoSeleccionado,
        precio: precio,
        nota: nota,
        cantidad: 1
      });

      cerrarModalTamano();
    });
  }

  // Toggle campo Dirección según Tipo de Entrega (domicilio vs recoger)
  if (DOM.deliveryTypeRadios) {
    DOM.deliveryTypeRadios.forEach((radio) => {
      radio.addEventListener("change", (e) => {
        if (!DOM.addressGroup) return;
        if (e.target.value === "recoger") {
          DOM.addressGroup.style.display = "none";
          if (DOM.errorAddress) DOM.errorAddress.textContent = "";
        } else {
          DOM.addressGroup.style.display = "flex";
        }
      });
    });
  }

  // Formulario Checkout WhatsApp
  if (DOM.checkoutForm) {
    DOM.checkoutForm.addEventListener("submit", manejarEnvioWhatsApp);
  }

  // Cerrar con tecla Escape (Drawer y Modal)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (DOM.sizeModal && DOM.sizeModal.classList.contains("open")) {
        cerrarModalTamano();
      } else if (DOM.cartDrawer && DOM.cartDrawer.classList.contains("open")) {
        cerrarDrawerCarrito();
      }
    }
  });
}

// ══════════════ 14. ANIMACIONES CON INTERSECTION OBSERVER ══════════════
function configurarAnimacionScroll() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  document.querySelectorAll(".reveal").forEach((elem) => observer.observe(elem));
}
