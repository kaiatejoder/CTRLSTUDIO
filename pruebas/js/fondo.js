document.addEventListener("DOMContentLoaded", function () {
    const bgDots = document.querySelector(".bg-dots");
    const aboutSection = document.querySelector(".about-section");

    // Efecto de scroll en el fondo
    if (aboutSection) {
        window.addEventListener("scroll", function () {
            const triggerPoint = aboutSection.offsetTop - window.innerHeight / 2;
            if (window.scrollY > triggerPoint) {
                bgDots.classList.add("dense");
            } else {
                bgDots.classList.remove("dense");
            }
        });
    }
});

// Mouse tracking para el fondo
document.addEventListener("mousemove", (e) => {
    const bgDots = document.querySelector(".bg-dots");
    if (!bgDots) return;

    const xPercent = (e.clientX / window.innerWidth) * 100;
    const yPercent = (e.clientY / window.innerHeight) * 100;

    bgDots.style.setProperty("--mouse-x", `${xPercent}%`);
    bgDots.style.setProperty("--mouse-y", `${yPercent}%`);
});

// Actualizar contador del carrito desde localStorage
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("ctrl_cart") || "[]");
    const total = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    const badge = document.getElementById("cart-count");
    if (badge) badge.textContent = total;
}
document.addEventListener("DOMContentLoaded", updateCartCount);
