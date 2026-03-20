// Product Page Handler - Handles Add to Cart and Buy buttons
const API_BASE_URL = 'https://helloworldbackend-production-ed49.up.railway.app';

// Get or create session ID (same as cart.js)
function getSessionId() {
    let sessionId = localStorage.getItem('fravega_session');
    if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('fravega_session', sessionId);
    }
    return sessionId;
}

// Add to cart via API - uses notification system if available
async function addToCart(productId, quantity = 1) {
    // Use the notification system if available
    if (window.addToCartWithNotification) {
        return await window.addToCartWithNotification(productId, quantity);
    }
    
    // Fallback to basic add
    const sessionId = getSessionId();
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
        console.log('Product added to cart:', data);
        
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

// Get all products and find by name match
async function getProductByName(searchTerm) {
    try {
        const response = await fetch(`${API_BASE_URL}/products`);
        const products = await response.json();
        
        // Find product that matches the search term
        const product = products.find(p => 
            p.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        return product;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

// Determine product type from current page URL or title
function getProductTypeFromPage() {
    const path = window.location.pathname.toLowerCase();
    const title = document.title.toLowerCase();
    
    if (path.includes('iphone') || title.includes('iphone')) {
        return 'iphone';
    } else if (path.includes('macbook') || title.includes('macbook')) {
        return 'macbook';
    } else if (path.includes('tablet') || path.includes('ipad') || title.includes('ipad')) {
        return 'ipad';
    } else if (path.includes('samsung') || path.includes('tv') || title.includes('samsung') || title.includes('tv')) {
        return 'samsung tv';
    }
    
    return null;
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
    
    // Add animation style
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Initialize product page
async function initProductPage() {
    const productType = getProductTypeFromPage();
    
    if (!productType) {
        console.warn('Could not determine product type from page');
        return;
    }
    
    console.log('Product type detected:', productType);
    
    // Find the product in database
    const product = await getProductByName(productType);
    
    if (!product) {
        console.error('Product not found in database for:', productType);
        return;
    }
    
    console.log('Product found:', product.name, product._id);
    
    // Find all "Agregar al carrito" buttons
    const addToCartButtons = document.querySelectorAll('.sc-bc83eae6-0.hQfvVh, button:has(.ebtdJm)');
    
    // Also find by text content
    document.querySelectorAll('button').forEach(btn => {
        if (btn.textContent.includes('Agregar al carrito') || btn.textContent.includes('Agregar')) {
            if (!Array.from(addToCartButtons).includes(btn)) {
                addToCartButtons.push ? addToCartButtons.push(btn) : null;
            }
        }
    });
    
    // Find all "Comprar" buttons and their parent links
    const buyButtons = document.querySelectorAll('button[data-test-id="product-buy-button"]');
    const buyLinks = document.querySelectorAll('a[href="Cart.html"]');
    
    // Handle "Agregar al carrito" buttons
    document.querySelectorAll('button').forEach(btn => {
        const text = btn.textContent || btn.innerText;
        if (text.includes('Agregar al carrito') || (text.includes('Agregar') && btn.querySelector('.ebtdJm'))) {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                btn.disabled = true;
                const originalText = btn.querySelector('.ebtdJm')?.textContent || 'Agregar al carrito';
                if (btn.querySelector('.ebtdJm')) {
                    btn.querySelector('.ebtdJm').textContent = 'Agregando...';
                }
                
                const result = await addToCart(product._id);
                
                if (result) {
                    // Notification is shown automatically by addToCartWithNotification
                    if (btn.querySelector('.ebtdJm')) {
                        btn.querySelector('.ebtdJm').textContent = '¡Agregado!';
                        setTimeout(() => {
                            btn.querySelector('.ebtdJm').textContent = originalText;
                        }, 1500);
                    }
                } else {
                    showToast('Error al agregar al carrito', false);
                    if (btn.querySelector('.ebtdJm')) {
                        btn.querySelector('.ebtdJm').textContent = originalText;
                    }
                }
                
                btn.disabled = false;
            });
        }
    });
    
    // Handle "Comprar" buttons - add to cart then go to cart
    buyLinks.forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            
            const btn = link.querySelector('button');
            if (btn) {
                btn.disabled = true;
                btn.textContent = 'Procesando...';
            }
            
            const result = await addToCart(product._id);
            
            if (result) {
                window.location.href = 'Cart.html';
            } else {
                showToast('Error al procesar la compra', false);
                if (btn) {
                    btn.disabled = false;
                    btn.textContent = 'Comprar';
                }
            }
        });
    });
    
    // Also handle standalone buy buttons
    buyButtons.forEach(btn => {
        if (!btn.closest('a[href="Cart.html"]')) {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                
                btn.disabled = true;
                btn.textContent = 'Procesando...';
                
                const result = await addToCart(product._id);
                
                if (result) {
                    window.location.href = 'Cart.html';
                } else {
                    showToast('Error al procesar la compra', false);
                    btn.disabled = false;
                    btn.textContent = 'Comprar';
                }
            });
        }
    });
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProductPage);
} else {
    initProductPage();
}
