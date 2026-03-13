// ============================================================
// CTRL STUDIO ADMIN — JS COMPARTIDO
// ============================================================

// Marcar enlace activo en sidebar
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".sidebar-link");
    const current = window.location.pathname.split("/").pop();
    links.forEach(link => {
        if (link.getAttribute("href") === current) {
            link.classList.add("active");
        }
    });
});

// Toggle sidebar en móvil
function toggleSidebar() {
    document.querySelector(".admin-sidebar").classList.toggle("open");
}

// Toast admin
function showAdminToast(msg, type = "ok") {
    let toast = document.getElementById("admin-toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "admin-toast";
        toast.style.cssText = `
            position:fixed; bottom:1.5rem; right:1.5rem;
            background:#29274c; color:white;
            padding:0.9rem 1.4rem; border-radius:0.75rem;
            font-size:0.82rem; font-weight:600;
            z-index:9999; opacity:0;
            transform:translateY(0.5rem);
            transition:all 0.25s; pointer-events:none;
            font-family: 'Helvetica Now Display', sans-serif;
        `;
        document.body.appendChild(toast);
    }
    if (type === "error") toast.style.background = "#a50136";
    else toast.style.background = "#29274c";
    toast.textContent = msg;
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(0.5rem)";
    }, 2500);
}

// Búsqueda en tabla
function setupSearch(inputId, tableId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.addEventListener("input", () => {
        const q = input.value.toLowerCase();
        document.querySelectorAll(`#${tableId} tbody tr`).forEach(row => {
            row.style.display = row.textContent.toLowerCase().includes(q) ? "" : "none";
        });
    });
}
