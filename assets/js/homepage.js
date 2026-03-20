// Homepage Product Handler - Handles product buttons on the homepage
const API_BASE_URL = 'helloworldbackend-production-ed49.up.railway.app';

// Product mapping (page -> product search term)
const PRODUCT_MAP = {
    'Iphone.html': 'iphone',
    'SamsungTV.html': 'samsung tv',
    'MacBook.html': 'macbook',
    'Tablet.html': 'ipad'
};

// Get or create session ID (same as cart.js)
function getSessionId() {
    let sessionId = localStorage.getItem('fravega_session');
    if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('fravega_session', sessionId);
    }
    return sessionId;
}

// Fetch all products and cache them
let productsCache = null;
async function getProducts() {
    if (productsCache) return productsCache;

    try {
        const response = await fetch(`${API_BASE_URL}/products`);
        productsCache = await response.json();
        return productsCache;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Find product by search term
async function findProduct(searchTerm) {
    const products = await getProducts();
    return products.find(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
}

// Add to cart via API (uses global function if available)
async function addToCart(productId, quantity = 1) {
    // Use the notification system if available
    if (window.addToCartWithNotification) {
        return await window.addToCartWithNotification(productId, quantity);
    }

    // Fallback to basic add
    const sessionId = getSessionId();
    console.log('Adding to cart - Session:', sessionId, 'Product:', productId);
    try {
        const response = await fetch(`${API_BASE_URL}/cart/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sessionId: sessionId,
                productId: productId,
                quantity: quantity
            })
        });
        const data = await response.json();
        console.log('Cart response:', data);

        // Update badge if function exists
        if (window.updateCartBadge) {
            window.updateCartBadge();
        }

        return data;
    } catch (error) {
        console.error('Error adding to cart:', error);
        return null;
    }
}

// Show toast notification
function showToast(message, isSuccess = true) {
    // Remove existing toast
    const existingToast = document.querySelector('.cart-toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'cart-toast';
    toast.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${isSuccess ? '#00a650' : '#dc3545'};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 12px;
            font-family: 'Work Sans', sans-serif;
            font-size: 14px;
            animation: slideIn 0.3s ease;
        ">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                ${isSuccess
            ? '<path d="M20 6L9 17l-5-5"></path>'
            : '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>'
        }
            </svg>
            <span>${message}</span>
        </div>
    `;

    // Add animation style if not exists
    if (!document.querySelector('#toast-animation-style')) {
        const style = document.createElement('style');
        style.id = 'toast-animation-style';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(toast);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Get product link from a product card
function getProductLink(productCard) {
    const link = productCard.querySelector('a[href$=".html"]');
    if (link) {
        const href = link.getAttribute('href');
        // Extract just the filename
        return href.split('/').pop();
    }
    return null;
}

// Initialize homepage buttons
async function initHomepageButtons() {
    console.log('🏠 Initializing homepage product buttons...');
    console.log('📦 Current session ID:', getSessionId());
    console.log('🔔 addToCartWithNotification available:', typeof window.addToCartWithNotification === 'function');

    // Pre-fetch products
    const products = await getProducts();
    console.log('📦 Products loaded:', products.length, products.map(p => p.name));

    // Find all product cards
    const productCards = document.querySelectorAll('.product-card');
    console.log('🃏 Found product cards:', productCards.length);

    productCards.forEach((card, index) => {
        const productLink = getProductLink(card);
        const searchTerm = PRODUCT_MAP[productLink];

        console.log(`Card ${index + 1}: Link=${productLink}, SearchTerm=${searchTerm}`);

        if (!searchTerm) {
            console.warn('❌ No product mapping for:', productLink);
            return;
        }

        // Find "Agregar al carrito" button
        const addToCartBtn = card.querySelector('.btn-cart');
        console.log(`Card ${index + 1}: Found btn-cart:`, !!addToCartBtn);

        // Find "Comprar" button and its link
        const buyLink = card.querySelector('.product-buttons a[href="Cart.html"]');
        const buyBtn = card.querySelector('.btn-buy');

        // Handle "Agregar al carrito" button
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                e.stopPropagation();

                console.log('🛒 Add to cart clicked for:', searchTerm);

                const originalText = addToCartBtn.textContent;
                addToCartBtn.disabled = true;
                addToCartBtn.textContent = window.i18n ? window.i18n.t('js.adding') : 'Agregando...';

                const product = await findProduct(searchTerm);
                console.log('🔍 Found product:', product ? product._id : 'NOT FOUND');

                if (!product) {
                    showToast(window.i18n ? window.i18n.t('js.notFound') : 'Producto no encontrado', false);
                    addToCartBtn.disabled = false;
                    addToCartBtn.textContent = originalText;
                    return;
                }

                console.log('📤 Adding product to cart:', product._id);
                const result = await addToCart(product._id);
                console.log('📥 Add to cart result:', result);

                if (result) {
                    // Notification is shown by addToCartWithNotification
                    addToCartBtn.textContent = window.i18n ? window.i18n.t('js.added') : '¡Agregado!';
                    setTimeout(() => {
                        addToCartBtn.textContent = originalText;
                    }, 1500);
                } else {
                    showToast(window.i18n ? window.i18n.t('js.errorAdd') : 'Error al agregar al carrito', false);
                    addToCartBtn.textContent = originalText;
                }

                addToCartBtn.disabled = false;
            });
        }

        // Handle "Comprar" button - add to cart then go to cart
        if (buyLink) {
            buyLink.addEventListener('click', async (e) => {
                e.preventDefault();

                if (buyBtn) {
                    buyBtn.disabled = true;
                    buyBtn.textContent = window.i18n ? window.i18n.t('js.processing') : 'Procesando...';
                }

                const product = await findProduct(searchTerm);

                if (!product) {
                    showToast(window.i18n ? window.i18n.t('js.notFound') : 'Producto no encontrado', false);
                    if (buyBtn) {
                        buyBtn.disabled = false;
                        buyBtn.textContent = window.i18n ? window.i18n.t('products.buy') : 'Comprar';
                    }
                    return;
                }

                const result = await addToCart(product._id);

                if (result) {
                    window.location.href = 'Cart.html';
                } else {
                    showToast(window.i18n ? window.i18n.t('js.errorProcess') : 'Error al procesar la compra', false);
                    if (buyBtn) {
                        buyBtn.disabled = false;
                        buyBtn.textContent = window.i18n ? window.i18n.t('products.buy') : 'Comprar';
                    }
                }
            });
        }
    });

    console.log('Homepage buttons initialized for', productCards.length, 'products');
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHomepageButtons);
} else {
    initHomepageButtons();
}
