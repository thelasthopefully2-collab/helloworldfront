// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';

class CartService {
    constructor() {
        this.cartKey = 'fravega_cart_v1';
        this.sessionId = this.getSessionId();
        this.cartData = null; // Cache cart data
    }

    // Get or create session ID
    getSessionId() {
        let sessionId = localStorage.getItem('fravega_session');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('fravega_session', sessionId);
        }
        return sessionId;
    }

    // Add to cart via API
    async addToCartAPI(productId, quantity = 1) {
        try {
            const response = await fetch(`${API_BASE_URL}/cart/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sessionId: this.sessionId,
                    productId: productId,
                    quantity: quantity
                })
            });
            const data = await response.json();
            this.cartData = data; // Update cache
            console.log('Product added to cart:', data);
            return data;
        } catch (error) {
            console.error('Error adding to cart:', error);
            // Fallback to localStorage if API fails
            this.addToCartLocal(productId, quantity);
            return null;
        }
    }

    // Add multiple products to cart at once
    async addMultipleToCartAPI(items) {
        // items = [{ productId, quantity }, ...]
        const results = [];
        for (const item of items) {
            const result = await this.addToCartAPI(item.productId, item.quantity || 1);
            results.push(result);
        }
        return results;
    }

    // Get cart from API
    async getCartAPI() {
        try {
            console.log('Fetching cart for session:', this.sessionId);
            const response = await fetch(`${API_BASE_URL}/cart/${this.sessionId}`);
            console.log('Response status:', response.status);
            const data = await response.json();
            console.log('Cart data:', data);
            this.cartData = data; // Update cache
            return data;
        } catch (error) {
            console.error('Error fetching cart:', error);
            return { items: [], total: 0 };
        }
    }

    // Update item quantity via API
    async updateQuantityAPI(productId, quantity) {
        try {
            const response = await fetch(`${API_BASE_URL}/cart/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sessionId: this.sessionId,
                    productId: productId,
                    quantity: quantity
                })
            });
            const data = await response.json();
            this.cartData = data; // Update cache
            return data;
        } catch (error) {
            console.error('Error updating quantity:', error);
            return null;
        }
    }

    // Remove item from cart via API
    async removeFromCartAPI(productId) {
        try {
            const response = await fetch(`${API_BASE_URL}/cart/remove`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sessionId: this.sessionId,
                    productId: productId
                })
            });
            const data = await response.json();
            this.cartData = data; // Update cache
            return data;
        } catch (error) {
            console.error('Error removing item:', error);
            return null;
        }
    }

    // Clear cart via API
    async clearCartAPI() {
        try {
            await fetch(`${API_BASE_URL}/cart/clear/${this.sessionId}`, {
                method: 'DELETE'
            });
            this.cartData = { items: [], total: 0 };
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    }

    // ==================== CALCULATION FUNCTIONS ====================

    // Calculate subtotal for a single item (price * quantity)
    calculateItemSubtotal(item) {
        const product = item.productId || item;
        const price = product.price || 0;
        const quantity = item.quantity || 1;
        return price * quantity;
    }

    // Calculate total for all items in cart
    calculateCartTotal(cartItems) {
        if (!cartItems || !Array.isArray(cartItems)) return 0;

        return cartItems.reduce((total, item) => {
            return total + this.calculateItemSubtotal(item);
        }, 0);
    }

    // Calculate total item count (sum of all quantities)
    calculateItemCount(cartItems) {
        if (!cartItems || !Array.isArray(cartItems)) return 0;

        return cartItems.reduce((count, item) => {
            return count + (item.quantity || 1);
        }, 0);
    }

    // Calculate savings (original price - current price)
    calculateSavings(cartItems) {
        if (!cartItems || !Array.isArray(cartItems)) return 0;

        return cartItems.reduce((savings, item) => {
            const product = item.productId || item;
            const oldPrice = product.oldPrice || product.price || 0;
            const currentPrice = product.price || 0;
            const quantity = item.quantity || 1;
            return savings + ((oldPrice - currentPrice) * quantity);
        }, 0);
    }

    // Calculate installment price (total / months)
    calculateInstallments(total, months = 12) {
        if (!total || total <= 0) return 0;
        return Math.ceil(total / months);
    }

    // Format price to Argentine peso format
    formatPrice(amount) {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    // Get full cart summary with all calculations
    getCartSummary(cartItems) {
        const items = cartItems || (this.cartData ? this.cartData.items : []);

        const subtotal = this.calculateCartTotal(items);
        const itemCount = this.calculateItemCount(items);
        const savings = this.calculateSavings(items);
        const installmentPrice = this.calculateInstallments(subtotal);

        return {
            items: items,
            itemCount: itemCount,
            subtotal: subtotal,
            subtotalFormatted: this.formatPrice(subtotal),
            savings: savings,
            savingsFormatted: this.formatPrice(savings),
            total: subtotal, // Can add shipping/taxes here later
            totalFormatted: this.formatPrice(subtotal),
            installmentPrice: installmentPrice,
            installmentFormatted: this.formatPrice(installmentPrice),
            isEmpty: items.length === 0
        };
    }

    // ==================== LOCAL STORAGE FALLBACK ====================

    // Local storage fallback methods
    addToCartLocal(product) {
        let cart = this.getCartLocal();
        const productId = typeof product === 'string' ? product : product.productId || product._id;
        const existingIndex = cart.findIndex(item =>
            (item.productId === productId) || (item._id === productId)
        );

        if (existingIndex > -1) {
            cart[existingIndex].quantity += 1;
        } else {
            if (typeof product === 'object') {
                cart.push({ ...product, quantity: 1 });
            } else {
                cart.push({ productId: product, quantity: 1 });
            }
        }
        localStorage.setItem(this.cartKey, JSON.stringify(cart));
        console.log('Product added to local cart:', product);
        return cart;
    }

    updateQuantityLocal(productId, quantity) {
        let cart = this.getCartLocal();
        const index = cart.findIndex(item =>
            (item.productId === productId) || (item._id === productId)
        );

        if (index > -1) {
            if (quantity <= 0) {
                cart.splice(index, 1);
            } else {
                cart[index].quantity = quantity;
            }
            localStorage.setItem(this.cartKey, JSON.stringify(cart));
        }
        return cart;
    }

    removeFromCartLocal(productId) {
        let cart = this.getCartLocal();
        cart = cart.filter(item =>
            (item.productId !== productId) && (item._id !== productId)
        );
        localStorage.setItem(this.cartKey, JSON.stringify(cart));
        return cart;
    }

    getCartLocal() {
        const cart = localStorage.getItem(this.cartKey);
        return cart ? JSON.parse(cart) : [];
    }

    clearCartLocal() {
        localStorage.removeItem(this.cartKey);
    }

    // Get all products from API
    async getProductsAPI() {
        try {
            const response = await fetch(`${API_BASE_URL}/products`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    }

    // Get single product from API
    async getProductAPI(productId) {
        try {
            const response = await fetch(`${API_BASE_URL}/products/${productId}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching product:', error);
            return null;
        }
    }
}

// Initialize cart service
const cartService = new CartService();

// ==================== CART PAGE RENDERER ====================
class CartPageRenderer {
    constructor(cartService) {
        this.cartService = cartService;
        this.cartContainer = null;
        this.cartTotalEl = null;
        this.cartSubtotalEl = null;
        this.cartCountEl = null;
        this.cartSavingsEl = null;
        this.cartInstallmentsEl = null;
        this.checkoutBtn = null;
    }

    init() {
        this.cartContainer = document.getElementById('cart-items-container');
        this.cartTotalEl = document.getElementById('cart-total');
        this.cartSubtotalEl = document.getElementById('cart-subtotal');
        this.cartCountEl = document.getElementById('cart-count');
        this.cartSavingsEl = document.getElementById('cart-savings');
        this.cartInstallmentsEl = document.getElementById('cart-installments');
        this.checkoutBtn = document.getElementById('checkout-btn');
    }

    // Render a single cart item
    renderCartItem(item, index) {
        const product = item.productId;
        const itemSubtotal = this.cartService.calculateItemSubtotal(item);
        const subtotalFormatted = this.cartService.formatPrice(itemSubtotal);
        const priceFormatted = this.cartService.formatPrice(product.price);
        const oldPriceFormatted = product.oldPrice ? this.cartService.formatPrice(product.oldPrice) : null;

        // Translate product name
        let displayName = product.name;
        if (window.i18n) {
            if (product.name.includes("iPhone")) displayName = window.i18n.t('prod.iphone');
            else if (product.name.includes("Samsung")) displayName = window.i18n.t('prod.samsung');
            else if (product.name.includes("Macbook")) displayName = window.i18n.t('prod.macbook');
            else if (product.name.includes("iPad")) displayName = window.i18n.t('prod.tablet');
        }

        let imagePath = product.image || '';
        if (imagePath.startsWith('/')) {
            imagePath = imagePath.substring(1);
        }

        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item-row';
        itemEl.dataset.productId = product._id;
        itemEl.dataset.index = index;

        itemEl.innerHTML = `
            <div class="cart-item-image">
                <img src="${imagePath}" alt="${product.name}" 
                    onerror="this.src='assets/images/Iphone/product.jpg'">
            </div>
            <div class="cart-item-info">
                <h3 class="cart-item-name">${displayName}</h3>
                <p class="cart-item-vendor">
                    <span data-i18n="cart.itemVendor">Vendido por:</span> ${product.vendor || 'Frávega'}
                </p>
                ${product.discount ? `<span class="cart-item-discount">${product.discount}% OFF</span>` : ''}
                <div class="cart-item-price-row">
                    ${oldPriceFormatted ? `<span class="cart-item-old-price">${oldPriceFormatted}</span>` : ''}
                    <span class="cart-item-price">${priceFormatted}</span>
                </div>
            </div>
            <div class="cart-item-quantity">
                <label data-i18n="cart.itemQuantity">Cantidad</label>
                <div class="qty-controls">
                    <button class="qty-btn qty-minus" data-product-id="${product._id}" ${item.quantity <= 1 ? 'disabled' : ''}>−</button>
                    <span class="qty-value">${item.quantity}</span>
                    <button class="qty-btn qty-plus" data-product-id="${product._id}">+</button>
                </div>
            </div>
            <div class="cart-item-subtotal">
                <label data-i18n="cart.itemSubtotal">Subtotal</label>
                <p class="item-subtotal">${subtotalFormatted}</p>
            </div>
            <button class="remove-btn" data-product-id="${product._id}" title="Eliminar producto" data-i18n-title="cart.itemRemoveTitle">✕</button>
        `;

        return itemEl;
    }

    // Render empty cart state
    renderEmptyCart() {
        return `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h3 data-i18n="cart.emptyTitle">Tu carrito está vacío</h3>
                <p data-i18n="cart.emptyText">¡Descubrí las mejores ofertas!</p>
                <a href="index.html" data-i18n="cart.emptyBtn">Ver productos</a>
            </div>
        `;
    }

    // Render loading state
    renderLoading() {
        return `
            <div style="padding:40px; text-align:center;">
                <div class="loading-spinner"></div>
                <p style="color:#666;" data-i18n="cart.loading">Cargando tu carrito...</p>
            </div>
        `;
    }

    // Render error state
    renderError() {
        return `
            <div style="padding:40px; text-align:center; color:#666;">
                <div style="font-size:48px; margin-bottom:16px;">⚠️</div>
                <h3 data-i18n="cart.errorTitle">Error al cargar el carrito</h3>
                <p style="margin-bottom:16px;" data-i18n="cart.errorText">Intenta recargar la página</p>
                <button onclick="location.reload()" style="padding:12px 24px; background:#440099; color:white; border:none; border-radius:8px; cursor:pointer; font-size:14px;">
                    <span data-i18n="cart.errorBtn">Recargar</span>
                </button>
            </div>
        `;
    }

    // Update summary section
    updateSummary(summary) {
        if (this.cartTotalEl) {
            this.cartTotalEl.textContent = summary.totalFormatted;
        }
        if (this.cartSubtotalEl) {
            this.cartSubtotalEl.textContent = summary.subtotalFormatted;
        }
        if (this.cartCountEl) {
            this.cartCountEl.textContent = summary.itemCount;
        }
        if (this.cartSavingsEl && summary.savings > 0) {
            this.cartSavingsEl.textContent = `-${summary.savingsFormatted}`;
            this.cartSavingsEl.parentElement.style.display = 'flex';
        }
        if (this.cartInstallmentsEl) {
            const installmentText = window.i18n ? window.i18n.t('products.installments') : "cuotas sin interés de";
            this.cartInstallmentsEl.textContent = `12 ${installmentText} ${summary.installmentFormatted}`;
        }
    }

    // Update single item's subtotal without full reload
    updateItemSubtotal(productId, newQuantity, price) {
        const itemEl = this.cartContainer.querySelector(`[data-product-id="${productId}"]`);
        if (itemEl) {
            const subtotalEl = itemEl.querySelector('.item-subtotal');
            const qtyValueEl = itemEl.querySelector('.qty-value');
            if (subtotalEl) {
                subtotalEl.textContent = this.cartService.formatPrice(price * newQuantity);
            }
            if (qtyValueEl) {
                qtyValueEl.textContent = newQuantity;
            }
        }
    }

    // Setup event handlers for quantity and remove buttons
    setupEventHandlers(cartData) {
        // Quantity minus buttons
        this.cartContainer.querySelectorAll('.qty-minus').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                const productId = btn.dataset.productId;
                const qtyValue = btn.parentElement.querySelector('.qty-value');
                const currentQty = parseInt(qtyValue.textContent);

                if (currentQty > 1) {
                    btn.disabled = true;
                    const result = await this.cartService.updateQuantityAPI(productId, currentQty - 1);
                    if (result) {
                        await this.loadCart(); // Refresh to update totals
                    }
                    btn.disabled = false;
                }
            });
        });

        // Quantity plus buttons
        this.cartContainer.querySelectorAll('.qty-plus').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                const productId = btn.dataset.productId;
                const qtyValue = btn.parentElement.querySelector('.qty-value');
                const currentQty = parseInt(qtyValue.textContent);

                btn.disabled = true;
                const result = await this.cartService.updateQuantityAPI(productId, currentQty + 1);
                if (result) {
                    await this.loadCart(); // Refresh to update totals
                }
                btn.disabled = false;
            });
        });

        // Remove buttons
        this.cartContainer.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                const productId = btn.dataset.productId;
                const itemEl = btn.closest('.cart-item-row');

                // Animate removal
                if (itemEl) {
                    itemEl.style.opacity = '0.5';
                    itemEl.style.transform = 'translateX(20px)';
                }

                const result = await this.cartService.removeFromCartAPI(productId);
                if (result) {
                    await this.loadCart(); // Refresh cart
                }
            });
        });

        // Checkout button
        if (this.checkoutBtn) {
            this.checkoutBtn.onclick = () => {
                if (cartData && cartData.items && cartData.items.length > 0) {
                    window.location.href = 'Email.html';
                } else {
                    alert(window.i18n ? window.i18n.t('js.emptyCartAlert') : 'Tu carrito está vacío');
                }
            };
        }
    }

    // Main load cart function
    async loadCart() {
        if (!this.cartContainer) {
            console.error('Cart container not found');
            return;
        }

        this.cartContainer.innerHTML = this.renderLoading();

        try {
            console.log('Fetching cart for session:', this.cartService.sessionId);
            const cartData = await this.cartService.getCartAPI();
            console.log('Cart data received:', cartData);

            if (cartData && cartData.items && cartData.items.length > 0) {
                this.cartContainer.innerHTML = '';

                // Render each cart item
                cartData.items.forEach((item, index) => {
                    console.log('Rendering item:', item);
                    const itemEl = this.renderCartItem(item, index);
                    this.cartContainer.appendChild(itemEl);
                });

                // Calculate and update summary
                const summary = this.cartService.getCartSummary(cartData.items);
                this.updateSummary(summary);

                // Setup event handlers
                this.setupEventHandlers(cartData);

                // Re-apply translations for dynamic content
                if (window.i18n && typeof window.i18n.apply === 'function') {
                    window.i18n.apply(window.i18n.getCurrentLang());
                }

            } else {
                console.log('Cart is empty or no items');
                this.cartContainer.innerHTML = this.renderEmptyCart();
                this.updateSummary({
                    totalFormatted: '$0',
                    subtotalFormatted: '$0',
                    itemCount: 0,
                    savings: 0,
                    savingsFormatted: '$0',
                    installmentFormatted: '$0'
                });

                // Apply translations for empty state
                if (window.i18n && typeof window.i18n.apply === 'function') {
                    window.i18n.apply(window.i18n.getCurrentLang());
                }
            }
        } catch (error) {
            console.error('Error loading cart:', error);
            this.cartContainer.innerHTML = this.renderError();
        }
    }
}

// Initialize cart renderer
const cartRenderer = new CartPageRenderer(cartService);

document.addEventListener('DOMContentLoaded', async () => {
    // Initialize renderer
    cartRenderer.init();

    // 1. Product Page: Add to Cart Buttons
    const btnAddMain = document.getElementById('btn-add-to-cart-main');
    const btnAddSec = document.getElementById('btn-add-to-cart-secondary');

    if (btnAddMain || btnAddSec) {
        // Get product ID from data attribute or page
        let productId = document.body.dataset.productId;
        let product = {};

        // Attempt to extract product data from JSON-LD
        try {
            const ldJson = document.querySelector('script[type="application/ld+json"]');
            if (ldJson) {
                const data = JSON.parse(ldJson.textContent);
                product = {
                    name: data.name,
                    price: data.offers && data.offers[0] ? data.offers[0].price : 0,
                    image: data.image && data.image[0] && data.image[0][0] ? data.image[0][0] : '',
                    sku: data.sku,
                    productId: productId
                };
            }
        } catch (e) {
            console.warn('Could not parse JSON-LD, falling back to defaults', e);
        }

        // Fallback if no product data found
        if (!product.name) {
            product = {
                name: document.querySelector('h1')?.textContent || "Producto",
                price: 0,
                image: document.querySelector('.product-image img')?.src || "",
                sku: "unknown",
                productId: productId
            };
        }

        const handleAdd = async (e) => {
            e.preventDefault();

            if (productId) {
                // Use API if product ID is available
                await cartService.addToCartAPI(productId);
            } else {
                // Fallback to local storage
                cartService.addToCartLocal(product);
            }

            window.location.href = 'Cart.html';
        };

        if (btnAddMain) btnAddMain.addEventListener('click', handleAdd);
        if (btnAddSec) btnAddSec.addEventListener('click', handleAdd);
    }

    // 2. Global: Cart Icon Redirect
    const cartBtn = document.getElementById('btn-cart-nav') || document.querySelector('button[data-test-id="button-cart"]');
    if (cartBtn) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'Cart.html';
        });
    }

    // 3. Cart Page: Render Items using CartPageRenderer
    const cartContainer = document.getElementById('cart-items-container');

    if (cartContainer) {
        await cartRenderer.loadCart();
    }
});

// Export for use in other scripts
window.CartService = CartService;
window.cartService = cartService;
window.CartPageRenderer = CartPageRenderer;
window.cartRenderer = cartRenderer;
