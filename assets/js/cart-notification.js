// Cart Notification & Badge Handler
// This script handles cart count badge and product added notifications across all pages

const CART_API_BASE = 'helloworldbackend-production-ed49.up.railway.app';

// Get or create session ID
function getCartSessionId() {
    let sessionId = localStorage.getItem('fravega_session');
    if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('fravega_session', sessionId);
    }
    return sessionId;
}

// Add badge styles if not present
function addBadgeStyles() {
    if (!document.getElementById('cart-badge-styles')) {
        const styles = document.createElement('style');
        styles.id = 'cart-badge-styles';
        styles.textContent = `
            .user-cart-btn-container {
                position: relative;
            }
            .cart-badge {
                position: absolute;
                top: -4px;
                right: -4px;
                background: #ff4081;
                color: #fff;
                font-size: 11px;
                font-weight: 600;
                min-width: 18px;
                height: 18px;
                border-radius: 10px;
                display: none;
                align-items: center;
                justify-content: center;
                padding: 0 5px;
                z-index: 10;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            }
            .cart-badge.show {
                display: flex;
            }
        `;
        document.head.appendChild(styles);
    }
}

// Add badge element to cart button if not present
function ensureCartBadge() {
    addBadgeStyles();
    
    // Check for existing .cart-count badges (index.html style)
    const existingBadges = document.querySelectorAll('.cart-count');
    if (existingBadges.length > 0) {
        return; // Already has badges
    }
    
    // Add badge to cart button container (product pages style)
    const cartContainers = document.querySelectorAll('.user-cart-btn-container');
    cartContainers.forEach(container => {
        if (!container.querySelector('.cart-badge')) {
            const badge = document.createElement('span');
            badge.className = 'cart-badge cart-count';
            badge.textContent = '0';
            container.appendChild(badge);
        }
    });
    
    // Also make cart button clickable (navigate to Cart.html)
    const cartButtons = document.querySelectorAll('[data-test-id="button-cart"]');
    cartButtons.forEach(btn => {
        btn.style.cursor = 'pointer';
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'Cart.html';
        });
    });
}

// Fetch cart and update badge count
async function updateCartBadge() {
    try {
        const sessionId = getCartSessionId();
        const response = await fetch(`${CART_API_BASE}/cart/${sessionId}`);
        const cart = await response.json();
        
        const totalItems = cart.items ? cart.items.reduce((sum, item) => sum + item.quantity, 0) : 0;
        
        // Update all cart count badges on the page
        document.querySelectorAll('.cart-count, .cart-badge').forEach(badge => {
            badge.textContent = totalItems;
            if (badge.classList.contains('cart-badge')) {
                badge.classList.toggle('show', totalItems > 0);
            } else {
                badge.style.display = totalItems > 0 ? 'flex' : 'none';
            }
        });
        
        return totalItems;
    } catch (error) {
        console.error('Error updating cart badge:', error);
        return 0;
    }
}

// Format price in Argentine Peso format
function formatPriceARS(price) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}

// Show product added notification (like original Frávega site)
function showProductAddedNotification(product) {
    // Remove existing notification
    const existing = document.querySelector('.product-added-notification');
    if (existing) {
        existing.remove();
    }

    // Fix image path
    let imagePath = product.image || '';
    if (imagePath.startsWith('/')) {
        imagePath = imagePath.substring(1);
    }

    // Format price
    const formattedPrice = formatPriceARS(product.price);

    const notification = document.createElement('div');
    notification.className = 'product-added-notification';
    notification.innerHTML = `
        <div class="pan-container">
            <div class="pan-progress-track">
                <div class="pan-progress-fill"></div>
            </div>
            <div class="pan-main">
                <div class="pan-left">
                    <div class="pan-check-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="12" fill="#00a650"/>
                            <path d="M7 12.5l3 3 7-7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="pan-image-wrap">
                        <img src="${imagePath}" alt="${product.name}" onerror="this.src='assets/images/Iphone/product.jpg'">
                    </div>
                </div>
                <div class="pan-right">
                    <div class="pan-top-row">
                        <span class="pan-added-text">Agregaste a tu carrito</span>
                        <button class="pan-close-btn" onclick="this.closest('.product-added-notification').remove()">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 6L6 18M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                    <p class="pan-name">${product.name}</p>
                    <p class="pan-price">${formattedPrice}</p>
                    <a href="Cart.html" class="pan-cart-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
                        </svg>
                        Ver carrito
                    </a>
                </div>
            </div>
        </div>
    `;

    // Add styles if not already added
    if (!document.getElementById('product-notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'product-notification-styles';
        styles.textContent = `
            .product-added-notification {
                position: fixed;
                top: 90px;
                right: 24px;
                z-index: 10000;
                animation: panFadeSlide 0.35s cubic-bezier(0.4, 0, 0.2, 1);
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }

            @keyframes panFadeSlide {
                from {
                    transform: translateY(-20px) translateX(30px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0) translateX(0);
                    opacity: 1;
                }
            }

            @keyframes panFadeOut {
                from {
                    transform: translateY(0) translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateY(-10px) translateX(30px);
                    opacity: 0;
                }
            }

            .pan-container {
                background: #ffffff;
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
                width: 380px;
                overflow: hidden;
            }

            .pan-progress-track {
                height: 4px;
                background: #e8f5e9;
                position: relative;
                overflow: hidden;
            }

            .pan-progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #00a650 0%, #00c853 50%, #00a650 100%);
                background-size: 200% 100%;
                animation: panProgressMove 4s linear forwards, panProgressShimmer 1s ease-in-out infinite;
                transform-origin: right;
            }

            @keyframes panProgressMove {
                from { transform: scaleX(1); }
                to { transform: scaleX(0); }
            }

            @keyframes panProgressShimmer {
                0%, 100% { background-position: 0% 0%; }
                50% { background-position: 100% 0%; }
            }

            .pan-main {
                display: flex;
                padding: 16px;
                gap: 14px;
            }

            .pan-left {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
            }

            .pan-check-icon {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .pan-image-wrap {
                width: 72px;
                height: 72px;
                border: 1px solid #f0f0f0;
                border-radius: 8px;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #fafafa;
            }

            .pan-image-wrap img {
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
            }

            .pan-right {
                flex: 1;
                min-width: 0;
                display: flex;
                flex-direction: column;
            }

            .pan-top-row {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 4px;
            }

            .pan-added-text {
                font-size: 13px;
                font-weight: 600;
                color: #00a650;
                display: flex;
                align-items: center;
                gap: 6px;
            }

            .pan-close-btn {
                background: none;
                border: none;
                padding: 4px;
                cursor: pointer;
                color: #999;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
            }

            .pan-close-btn:hover {
                background: #f5f5f5;
                color: #333;
            }

            .pan-name {
                font-size: 14px;
                color: #333;
                margin: 0 0 6px;
                line-height: 1.3;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }

            .pan-price {
                font-size: 20px;
                font-weight: 700;
                color: #333;
                margin: 0 0 12px;
            }

            .pan-cart-link {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                padding: 10px 20px;
                background: #440099;
                color: #fff;
                text-decoration: none;
                border-radius: 6px;
                font-size: 14px;
                font-weight: 600;
                transition: all 0.2s;
                align-self: flex-start;
            }

            .pan-cart-link:hover {
                background: #5a00cc;
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(68, 0, 153, 0.3);
            }

            .pan-cart-link svg {
                flex-shrink: 0;
            }

            @media (max-width: 480px) {
                .product-added-notification {
                    right: 12px;
                    left: 12px;
                    top: 70px;
                }
                .pan-container {
                    width: auto;
                }
                .pan-main {
                    padding: 12px;
                }
                .pan-image-wrap {
                    width: 60px;
                    height: 60px;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    document.body.appendChild(notification);

    // Update cart badge
    updateCartBadge();

    // Auto-remove after 4 seconds (when progress bar finishes)
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'panFadeOut 0.3s ease-in forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 4000);
}

// Add to cart and show notification
async function addToCartWithNotification(productId, quantity = 1) {
    const sessionId = getCartSessionId();
    
    try {
        // First get product details
        const productResponse = await fetch(`${CART_API_BASE}/products/${productId}`);
        const product = await productResponse.json();
        
        // Add to cart
        const response = await fetch(`${CART_API_BASE}/cart/add`, {
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
        
        if (response.ok) {
            // Show notification with product details
            showProductAddedNotification(product);
            return data;
        } else {
            console.error('Error adding to cart:', data);
            return null;
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        return null;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    ensureCartBadge();
    updateCartBadge();
});

// Export functions globally
window.updateCartBadge = updateCartBadge;
window.showProductAddedNotification = showProductAddedNotification;
window.addToCartWithNotification = addToCartWithNotification;
window.getCartSessionId = getCartSessionId;
window.ensureCartBadge = ensureCartBadge;
