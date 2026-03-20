// Checkout API Handler for Frávega Clone
const API_BASE = 'https://helloworldbackend-production-ed49.up.railway.app/api';

// Session management
function getSessionId() {
  let sessionId = localStorage.getItem('fravega_session');
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('fravega_session', sessionId);
  }
  return sessionId;
}

// Get or store order ID during checkout
function getOrderId() {
  return localStorage.getItem('fravega_order_id');
}

function setOrderId(orderId) {
  localStorage.setItem('fravega_order_id', orderId);
}

function clearOrderId() {
  localStorage.removeItem('fravega_order_id');
}

// Format price in Argentine format
function formatPrice(price) {
  if (!price || isNaN(price)) return '$ 0';
  return '$ ' + Number(price).toLocaleString('es-AR');
}

// Fix image path (remove leading slash if present)
function fixImagePath(imagePath) {
  if (!imagePath) return 'assets/images/Iphone/product.jpg';
  if (imagePath.startsWith('/')) return imagePath.substring(1);
  return imagePath;
}

// Show loading overlay
function showLoading(message = 'Cargando...') {
  let overlay = document.getElementById('checkout-loading-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'checkout-loading-overlay';
    overlay.innerHTML = `
      <div style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(255,255,255,0.9);z-index:10000;display:flex;flex-direction:column;align-items:center;justify-content:center;">
        <div style="width:40px;height:40px;border:3px solid #f0f0f0;border-top-color:#440099;border-radius:50%;animation:spin 1s linear infinite;"></div>
        <p style="margin-top:16px;color:#333;font-size:14px;" id="loading-message">${message}</p>
      </div>
      <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
    `;
    document.body.appendChild(overlay);
  } else {
    const msgEl = overlay.querySelector('#loading-message');
    if (msgEl) msgEl.textContent = message;
    overlay.style.display = 'block';
  }
}

// Hide loading overlay
function hideLoading() {
  const overlay = document.getElementById('checkout-loading-overlay');
  if (overlay) overlay.style.display = 'none';
}

// Show toast notification
function showToast(message, isError = false) {
  const existing = document.querySelector('.checkout-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'checkout-toast';
  toast.innerHTML = `
    <div style="position:fixed;bottom:20px;right:20px;padding:16px 24px;background:${isError ? '#dc3545' : '#00a650'};color:#fff;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.15);z-index:10001;font-size:14px;animation:fadeIn 0.3s ease;">
      ${message}
    </div>
    <style>@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}</style>
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// Get cart data
async function getCart() {
  try {
    const sessionId = getSessionId();
    const response = await fetch(`${API_BASE}/cart/${sessionId}`);
    if (!response.ok) throw new Error('Failed to fetch cart');
    return await response.json();
  } catch (error) {
    console.error('Error fetching cart:', error);
    return { items: [], total: 0 };
  }
}

// Get pending order
async function getPendingOrder() {
  try {
    const sessionId = getSessionId();
    const response = await fetch(`${API_BASE}/orders/pending/${sessionId}`);
    if (response.ok) {
      const order = await response.json();
      setOrderId(order._id);
      return order;
    }
    return null;
  } catch (error) {
    console.error('Error fetching pending order:', error);
    return null;
  }
}

// Get order by ID
async function getOrder(orderId) {
  try {
    const response = await fetch(`${API_BASE}/orders/${orderId}`);
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error('Error fetching order:', error);
    return null;
  }
}

// Start checkout with email
async function startCheckout(email) {
  try {
    const sessionId = getSessionId();
    const response = await fetch(`${API_BASE}/orders/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, email })
    });

    if (response.ok) {
      const order = await response.json();
      setOrderId(order.orderId);
      return order;
    } else {
      const error = await response.json();
      throw new Error(error.message);
    }
  } catch (error) {
    console.error('Error starting checkout:', error);
    throw error;
  }
}

// Save customer info (Step 1)
async function saveCustomerInfo(customerData) {
  try {
    const orderId = getOrderId();
    if (!orderId) throw new Error('No order found');

    const response = await fetch(`${API_BASE}/orders/customer-info/${orderId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customerData)
    });

    if (response.ok) {
      return await response.json();
    } else {
      const error = await response.json();
      throw new Error(error.message);
    }
  } catch (error) {
    console.error('Error saving customer info:', error);
    throw error;
  }
}

// Save shipping info (Step 2)
async function saveShippingInfo(shippingData) {
  try {
    const orderId = getOrderId();
    if (!orderId) throw new Error('No order found');

    const response = await fetch(`${API_BASE}/orders/shipping/${orderId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(shippingData)
    });

    if (response.ok) {
      return await response.json();
    } else {
      const error = await response.json();
      throw new Error(error.message);
    }
  } catch (error) {
    console.error('Error saving shipping info:', error);
    throw error;
  }
}

// Save payment and complete order (Step 3)
async function completePayment(paymentData) {
  try {
    const orderId = getOrderId();
    if (!orderId) throw new Error('No order found');

    const response = await fetch(`${API_BASE}/orders/payment/${orderId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentData)
    });

    if (response.ok) {
      const order = await response.json();
      // Clear order ID and session after successful payment
      clearOrderId();
      return order;
    } else {
      const error = await response.json();
      throw new Error(error.message);
    }
  } catch (error) {
    console.error('Error completing payment:', error);
    throw error;
  }
}

// Apply coupon
async function applyCoupon(couponCode) {
  try {
    const orderId = getOrderId();
    if (!orderId) throw new Error('No order found');

    const response = await fetch(`${API_BASE}/orders/coupon/${orderId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ couponCode })
    });

    if (response.ok) {
      return await response.json();
    } else {
      const error = await response.json();
      throw new Error(error.message);
    }
  } catch (error) {
    console.error('Error applying coupon:', error);
    throw error;
  }
}

// Get order history by email
async function getOrderHistory(email) {
  try {
    const response = await fetch(`${API_BASE}/orders/history/${encodeURIComponent(email)}`);
    if (response.ok) {
      return await response.json();
    }
    return [];
  } catch (error) {
    console.error('Error fetching order history:', error);
    return [];
  }
}

// Track order by order number
async function trackOrder(orderNumber) {
  try {
    const response = await fetch(`${API_BASE}/orders/track/${orderNumber}`);
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error('Error tracking order:', error);
    return null;
  }
}

// Render product preview in sidebar
function renderProductPreview(items, container) {
  if (!container || !items || items.length === 0) return;

  container.innerHTML = items.map(item => {
    const imageSrc = fixImagePath(item.image || item.productId?.image);
    const name = item.name || item.productId?.name || 'Producto';
    const price = item.price || item.productId?.price || 0;

    return `
    <div class="product-preview" style="display: flex; gap: 15px; align-items: flex-start; margin-bottom: 15px;">
      <div class="product-preview-image" style="width: 70px; height: 70px; flex-shrink: 0; position: relative;">
        <img src="${imageSrc}" 
             alt="${name}" 
             style="width: 100%; height: 100%; object-fit: contain;"
             onerror="this.src='assets/images/Iphone/product.jpg'" />
        <span class="product-qty" style="position: absolute; top: -5px; right: -5px; background: #e91e63; color: #fff; border-radius: 50%; width: 18px; height: 18px; font-size: 11px; display: flex; align-items: center; justify-content: center;">
          ${item.quantity}
        </span>
      </div>
      <div class="product-preview-info">
        <h4 style="font-size: 14px; font-weight: 400; color: #333; line-height: 1.4;">
          ${name}
        </h4>
        <p class="product-preview-price" style="font-size: 16px; font-weight: 600; color: #333; margin-top: 8px;">
          ${formatPrice(price)}
        </p>
      </div>
    </div>
  `}).join('');
}

// Render order summary
function renderOrderSummary(order, container) {
  if (!container || !order) return;

  const itemCount = order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  container.innerHTML = `
    <h3 class="summary-title" style="font-size: 16px; font-weight: 600; margin-bottom: 20px;">Resumen de compra</h3>
    <div class="summary-row" style="display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #eee;">
      <span>Productos (${itemCount})</span>
      <span>${formatPrice(order.subtotal || 0)}</span>
    </div>
    ${order.shippingCost > 0 ? `
    <div class="summary-row" style="display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #eee;">
      <span>Envío</span>
      <span>${formatPrice(order.shippingCost)}</span>
    </div>
    ` : ''}
    ${order.discount > 0 ? `
    <div class="summary-row" style="display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #eee; color: #00a650;">
      <span>Descuento</span>
      <span>-${formatPrice(order.discount)}</span>
    </div>
    ` : ''}
    <div class="summary-total" style="display: flex; justify-content: space-between; font-size: 18px; font-weight: 600; margin-bottom: 20px;">
      <span>Total</span>
      <span>${formatPrice(order.total || order.subtotal || 0)}</span>
    </div>
  `;
}

// --- Payment Validation Helpers ---

// Luhn Algorithm for card validation
function validateLuhn(cardNumber) {
  const digits = cardNumber.replace(/\D/g, '');
  if (digits.length < 13 || digits.length > 19) return false;

  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i), 10);
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isEven = !isEven;
  }

  return (sum % 10) === 0;
}

// Detect card brand based on BIN ranges
function getCardBrand(cardNumber) {
  const digits = cardNumber.replace(/\D/g, '');
  if (/^4/.test(digits)) return 'visa';
  if (/^5[1-5]/.test(digits) || /^2(?:2(?:2[1-9]|[3-9]\d)|[3-6]\d\d|7(?:[01]\d|20))/.test(digits)) return 'mastercard';
  if (/^3[47]/.test(digits)) return 'amex';
  if (/^589562/.test(digits)) return 'cabal'; // Common Cabal prefix
  if (/^589562|377798|377799/.test(digits)) return 'naranja'; // Naranja/Naranja Visa prefixes
  return 'unknown';
}

// Format DNI (max 8 digits, thousands separators for UX if desired, or just raw numbers)
function formatDNI(dni) {
  return dni.replace(/\D/g, '').substring(0, 8);
}

// Format Card Number uniquely based on brand (Amex 4-6-5, others 4-4-4-4)
function formatCardNumber(cardNumber) {
  const digits = cardNumber.replace(/\D/g, '');
  const brand = getCardBrand(digits);

  if (brand === 'amex') {
    // Amex: 4-6-5
    const match = digits.match(/^(\d{0,4})(\d{0,6})(\d{0,5})$/);
    if (match) {
      return !match[2] ? match[1] : `${match[1]} ${match[2]}${match[3] ? ` ${match[3]}` : ''}`;
    }
  } else {
    // Default: 4-4-4-4
    const match = digits.match(/^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,3})$/);
    if (match) {
      let formatted = match[1];
      if (match[2]) formatted += ` ${match[2]}`;
      if (match[3]) formatted += ` ${match[3]}`;
      if (match[4]) formatted += ` ${match[4]}`;
      if (match[5]) formatted += ` ${match[5]}`; // Some cards have 19 digits
      return formatted;
    }
  }
  return digits;
}

// Export functions for use in pages
window.CheckoutAPI = {
  getSessionId,
  getOrderId,
  setOrderId,
  clearOrderId,
  formatPrice,
  fixImagePath,
  showLoading,
  hideLoading,
  showToast,
  getCart,
  getPendingOrder,
  getOrder,
  startCheckout,
  saveCustomerInfo,
  saveShippingInfo,
  completePayment,
  applyCoupon,
  getOrderHistory,
  trackOrder,
  renderProductPreview,
  renderOrderSummary,
  validateLuhn,
  getCardBrand,
  formatDNI,
  formatCardNumber
};
