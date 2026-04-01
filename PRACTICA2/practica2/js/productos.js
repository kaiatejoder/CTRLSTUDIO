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

    let html = `<button class="btn btn-sm btn-dark me-1 mb-1"
                        onclick="filtrarCategoria(0)">Todos</button>`;
    categorias.forEach(cat => {
        html += `<button class="btn btn-sm btn-outline-dark me-1 mb-1"
                         onclick="filtrarCategoria(${cat.codigo})">${cat.descripcion}</button>`;
    });
    nav.innerHTML = html;
}

// Exponer para onclick en HTML
window.filtrarCategoria = function(catId) {
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
    const contenedor = document.getElementById("contenedor-productos");
    contenedor.innerHTML = "";

    if (lista.length === 0) {
        contenedor.innerHTML = `
            <div class="col-12 text-center text-muted py-5">
                <p>No hay productos en esta categoría.</p>
            </div>`;
        return;
    }

    const fila = document.createElement("div");
    fila.classList.add("row", "g-4");

    lista.forEach(producto => {
        const sinStock     = producto.existencias <= 0;
        const botonDisabled = sinStock ? "disabled" : "";
        const textoBoton   = sinStock ? "Sin stock" : "Añadir al carrito";

        // Imagen: si no existe usamos un placeholder
        const imgSrc = producto.imagen
            ? `img/${producto.imagen}`
            : "img/placeholder.png";

        fila.innerHTML += `
            <div class="col-lg-3 col-md-4 col-sm-6">
                <article class="card h-100 shadow-sm"
                         id="${producto.codigo}"
                         data-existencias="${producto.existencias}"
                         data-nombre="${producto.nombre}"
                         data-descripcion="${producto.descripcion}"
                         data-precio="${producto.precio}">
                    <img src="${imgSrc}"
                         class="card-img-top"
                         alt="${producto.nombre}"
                         style="height:180px; object-fit:cover;">
                    <div class="card-body d-flex flex-column">
                        <h6 class="card-title">${producto.nombre}</h6>
                        <p class="card-text text-muted small flex-grow-1">${producto.descripcion}</p>
                        <p class="fw-bold text-primary">${producto.precio.toFixed(2)}€</p>
                        <div class="mb-2">
                            <label class="form-label small mb-1">Cantidad:</label>
                            <input type="number" value="1" min="1"
                                   max="${producto.existencias}"
                                   class="form-control form-control-sm cantidad"
                                   style="width:80px;">
                        </div>
                        <button type="button"
                                class="btn btn-primary btn-sm mt-auto ${botonDisabled}"
                                onclick="comprar('${producto.codigo}')">
                            ${textoBoton}
                        </button>
                    </div>
                </article>
            </div>`;
    });

    contenedor.appendChild(fila);
}