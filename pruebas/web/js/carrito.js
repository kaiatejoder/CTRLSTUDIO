// ============================================================
// CTRL STUDIO — GESTIÓN DEL CARRITO
// Almacena en localStorage: ctrl_cart = [{id, nombre, precio, categoria, qty}]
// ============================================================

function getCart() {
    return JSON.parse(localStorage.getItem("ctrl_cart") || "[]");
}

function saveCart(cart) {
    localStorage.setItem("ctrl_cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    const badge = document.getElementById("cart-count");
    if (badge) badge.textContent = total;
}

function addToCart(btn, nombre, precio, categoria) {
    const cart = getCart();
    const existing = cart.find(i => i.nombre === nombre);
    if (existing) {
        existing.qty = (existing.qty || 1) + 1;
    } else {
        cart.push({ nombre, precio, categoria, qty: 1 });
    }
    saveCart(cart);

    // Feedback visual botón
    if (btn) {
        const original = btn.textContent;
        btn.textContent = "✓ AÑADIDO";
        btn.classList.add("added");
        setTimeout(() => {
            btn.textContent = original;
            btn.classList.remove("added");
        }, 1800);
    }

    // Toast
    showToast("✓ " + nombre + " añadido al carrito");
}

function removeFromCart(nombre) {
    const cart = getCart().filter(i => i.nombre !== nombre);
    saveCart(cart);
}

function updateQty(nombre, delta) {
    const cart = getCart();
    const item = cart.find(i => i.nombre === nombre);
    if (!item) return;
    item.qty = Math.max(1, (item.qty || 1) + delta);
    saveCart(cart);
}

function showToast(msg) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500);
}

document.addEventListener("DOMContentLoaded", updateCartCount);
