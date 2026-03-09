document.addEventListener("mousemove", (e) => {
    const bg = document.querySelector(".bg-dots");
    if (!bg) return;
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    bg.style.setProperty("--mx", x + "%");
    bg.style.setProperty("--my", y + "%");
});

// Actualizar contador del carrito desde localStorage
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("ctrl_cart") || "[]");
    const total = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    const badge = document.getElementById("cart-count");
    if (badge) badge.textContent = total;
}
document.addEventListener("DOMContentLoaded", updateCartCount);
