/**
 * productos.js
 * Lógica de la página productos.html.
 * Carga las categorías y los productos desde los Servlets y los dibuja
 * con Bootstrap en el contenedor #contenedor-productos.
 *
 * Se carga como módulo: <script type="module" src="js/productos.js"></script>
 */

import * as LibServlet from './libservlet.js';
import * as LibCarrito from './libcarrito.js';

// Exponer comprar() globalmente para que funcione el onclick del botón
window.comprar = LibCarrito.comprar;

// ── Inicio ─────────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", function () {
    inicio();
});

export function inicio() {
    LibCarrito.actualizarResumenCarrito();
    cargarCategorias();
    obtenerProductos("obtenerProductos.html");   // carga todos al inicio
}

// ── Categorías ─────────────────────────────────────────────────────────────────

async function cargarCategorias() {
    const categorias = await LibServlet.obtenerCategorias("obtenerCategorias.html");
    dibujarFiltros(categorias);
}

function dibujarFiltros(categorias) {
    const nav = document.getElementById("filtros-categoria");
    if (!nav) return;

    let html = `<button class="filter-btn active"
                        onclick="filtrarCategoria(0, this)">TODOS</button>`;
    categorias.forEach(cat => {
        html += `<button class="filter-btn"
                         onclick="filtrarCategoria(${cat.codigo}, this)">
                     ${cat.descripcion.toUpperCase()}
                 </button>`;
    });
    nav.innerHTML = html;
}

// Exponer para onclick en HTML
window.filtrarCategoria = function(catId, btn) {
    // Actualizar botón activo
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const url = catId > 0
        ? `obtenerProductos.html?categoria=${catId}`
        : "obtenerProductos.html";
    obtenerProductos(url);
};

// ── Productos ──────────────────────────────────────────────────────────────────

function obtenerProductos(url) {
    LibServlet.obtenerProductos(url).then(listaProductos => {
        dibujarProductos(listaProductos);
    });
}

function dibujarProductos(lista) {
    const contenedor = document.getElementById("prod-grid");
    contenedor.innerHTML = "";

    if (lista.length === 0) {
        contenedor.innerHTML = `
            <div class="col-12 text-center py-5" style="color:var(--txt-muted)">
                <p>No hay productos en esta categoría.</p>
            </div>`;
        return;
    }

    // Paleta cíclica de fondos para prod-thumb
    const thumbClases = ["pt1", "pt2", "pt3", "pt4", "pt5", "pt6"];

    lista.forEach((producto, i) => {
        const sinStock      = producto.existencias <= 0;
        const btnDisabled   = sinStock ? 'disabled style="opacity:.5;cursor:not-allowed"' : '';
        const textoBoton    = sinStock ? "SIN STOCK" : "AÑADIR ↗";
        const thumbClass    = thumbClases[i % thumbClases.length];
        const categoria     = producto.categoria ?? "Producto";  // ajusta según tu Servlet

        const col = document.createElement("div");
        col.className = "col-md-6 col-lg-4 prod-item";
        col.dataset.cat = categoria.toLowerCase();

        col.innerHTML = `
            <div class="prod-card"
                 id="prod-${producto.codigo}"
                 data-existencias="${producto.existencias}"
                 data-nombre="${producto.nombre}"
                 data-precio="${producto.precio}">
                <div class="prod-thumb ${thumbClass}">${categoria.toUpperCase()}</div>
                <div class="prod-body d-flex flex-column">
                    <div class="prod-categoria">${categoria}</div>
                    <div class="prod-nombre">${producto.nombre}</div>
                    <p class="prod-desc">${producto.descripcion}</p>
                    <div class="prod-footer mt-auto">
                        <div class="prod-precio">
                            ${producto.precio.toFixed(2)}€
                            <small>Proyecto único</small>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            <input type="number" value="1" min="1"
                                   max="${producto.existencias}"
                                   class="form-control form-control-sm cantidad"
                                   style="width:60px;" ${sinStock ? 'disabled' : ''}>
                            <button class="btn-add" ${btnDisabled}
                                    onclick="comprar('${producto.codigo}')">
                                ${textoBoton}
                            </button>
                        </div>
                    </div>
                </div>
            </div>`;

        contenedor.appendChild(col);
    });

}