/**
 * libcarrito.js
 * Librería de gestión del carrito de la compra.
 * Utiliza localStorage para persistir el carrito entre páginas.
 *
 * Funciones exportadas:
 *  - comprar(id)              → Añade/incrementa un producto en el carrito
 *  - borrarProducto(id)       → Elimina un producto del carrito
 *  - modificarCantidad(id, d) → Cambia la cantidad (+1 / -1)
 *  - crearContenidoCarrito()  → Genera el HTML del carrito (página carrito.html)
 *  - crearTicket()            → Genera el HTML del resumen de compra
 *  - eliminarCarrito()        → Vacía el carrito completamente
 *  - actualizarResumenCarrito()→ Actualiza el badge/contador del icono del carrito
 */

import { Producto } from './producto.js';

const STORAGE_KEY = "ctrl-studio-carrito";
let carrito = null;

// ── Persistencia ───────────────────────────────────────────────────────────────

function cargarCarrito() {
    carrito = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (carrito === null) {
        carrito = [];
    } else {
        actualizarResumenCarrito();
    }
    return carrito;
}

function guardarCarrito() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
}

// ── Resumen / badge ────────────────────────────────────────────────────────────

export function actualizarResumenCarrito() {
    cargarCarrito();
    const badge = document.getElementById("carrito-count");
    if (badge) {
        const total = carrito.reduce((acc, p) => acc + p.cantidad, 0);
        badge.textContent = total > 0 ? total : "";
    }
}

// ── 1. Añadir producto ─────────────────────────────────────────────────────────

/**
 * Añade un producto al carrito o incrementa su cantidad.
 * @param {number} id - código del producto (del atributo data-id del article)
 */
export function comprar(id) {
    cargarCarrito();

    // Buscamos el <article> con el id del producto para leer sus datos
    const articulo = document.getElementById(id);
    if (!articulo) {
        alert("Producto no encontrado.");
        return;
    }

    const existencias = parseInt(articulo.dataset.existencias);
    const inputCantidad = articulo.querySelector(".cantidad");
    const cantidadSolicitada = inputCantidad ? parseInt(inputCantidad.value) : 1;

    // Buscamos si ya está en el carrito
    const idx = carrito.findIndex(p => p.codigo === parseInt(id));

    if (idx >= 0) {
        // Ya existe: incrementar cantidad respetando stock
        const nuevaCantidad = carrito[idx].cantidad + cantidadSolicitada;
        if (nuevaCantidad > existencias) {
            alert(`Solo hay ${existencias} unidades disponibles de "${carrito[idx].nombre}".`);
            return;
        }
        carrito[idx].cantidad = nuevaCantidad;
    } else {
        // Nuevo producto
        if (cantidadSolicitada > existencias) {
            alert(`Solo hay ${existencias} unidades disponibles.`);
            return;
        }
        const producto = new Producto(
            parseInt(id),
            articulo.dataset.nombre,
            articulo.dataset.descripcion,
            parseFloat(articulo.dataset.precio),
            cantidadSolicitada,
            existencias,
            articulo.querySelector("img") ? articulo.querySelector("img").src : ""
        );
        carrito.push(producto);
    }

    guardarCarrito();
    actualizarResumenCarrito();
    alert(`"${articulo.dataset.nombre}" añadido al carrito.`);
}

// ── 2. Eliminar producto ───────────────────────────────────────────────────────

export function borrarProducto(id) {
    cargarCarrito();
    carrito = carrito.filter(p => p.codigo !== parseInt(id));
    guardarCarrito();
    actualizarResumenCarrito();
    location.reload();
}

// ── 3. Modificar cantidad ──────────────────────────────────────────────────────

/**
 * @param {number} id - código del producto
 * @param {number} delta - variación (+1 o -1)
 */
export function modificarCantidad(id, delta) {
    cargarCarrito();
    const idx = carrito.findIndex(p => p.codigo === parseInt(id));
    if (idx < 0) return;

    const nuevaCantidad = carrito[idx].cantidad + delta;

    if (nuevaCantidad <= 0) {
        // Eliminar del carrito si llega a 0
        carrito.splice(idx, 1);
    } else if (nuevaCantidad > carrito[idx].existencias) {
        alert(`Stock máximo: ${carrito[idx].existencias} unidades.`);
        return;
    } else {
        carrito[idx].cantidad = nuevaCantidad;
    }

    guardarCarrito();
    actualizarResumenCarrito();
    location.reload();
}

// ── 4. Generar HTML del carrito ────────────────────────────────────────────────

export function crearContenidoCarrito() {
    cargarCarrito();
    const contenedor = document.getElementById("contenedor-carrito");
    if (!contenedor) return;

    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <div class="alert alert-info text-center" role="alert">
                Tu carrito está vacío. <a href="productos.html" class="alert-link">Ver productos</a>
            </div>`;
        return;
    }

    let html = `
        <div class="table-responsive">
        <table class="table table-striped align-middle">
            <thead class="table-dark">
                <tr>
                    <th>Producto</th>
                    <th>Precio unit.</th>
                    <th class="text-center">Cantidad</th>
                    <th class="text-end">Subtotal</th>
                    <th class="text-center">Eliminar</th>
                </tr>
            </thead>
            <tbody>`;

    let total = 0;
    carrito.forEach(p => {
        const subtotal = p.precio * p.cantidad;
        total += subtotal;
        html += `
            <tr>
                <td>
                    <strong>${p.nombre}</strong><br>
                    <small class="text-muted">${p.descripcion}</small>
                </td>
                <td>${p.precio.toFixed(2)}€</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-secondary"
                            onclick="LibCarrito.modificarCantidad(${p.codigo}, -1)">−</button>
                    <span class="mx-2">${p.cantidad}</span>
                    <button class="btn btn-sm btn-outline-secondary"
                            onclick="LibCarrito.modificarCantidad(${p.codigo}, 1)">+</button>
                </td>
                <td class="text-end">${subtotal.toFixed(2)}€</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-danger"
                            onclick="LibCarrito.borrarProducto(${p.codigo})">Eliminar</button>
                </td>
            </tr>`;
    });

    html += `
            </tbody>
            <tfoot>
                <tr>
                    <th colspan="3" class="text-end">Total:</th>
                    <th class="text-end">${total.toFixed(2)}€</th>
                    <th></th>
                </tr>
            </tfoot>
        </table>
        </div>
        <div class="text-end mt-3">
            <a href="productos.html" class="btn btn-outline-secondary me-2">Seguir comprando</a>
            <a href="compra.html" class="btn btn-primary">Finalizar compra</a>
        </div>`;

    contenedor.innerHTML = html;
}

// ── 5. Generar ticket de compra ────────────────────────────────────────────────

export function crearTicket() {
    cargarCarrito();
    const contenedor = document.getElementById("contenedor-ticket");
    if (!contenedor) return;

    if (carrito.length === 0) {
        contenedor.innerHTML = `<p class="text-center text-muted">No hay productos en el carrito.</p>`;
        return;
    }

    let total = 0;
    let html = `
        <div class="table-responsive">
        <table class="table table-bordered">
            <thead class="table-secondary">
                <tr>
                    <th>Descripción</th>
                    <th class="text-center">Unidades</th>
                    <th class="text-end">Precio unit.</th>
                    <th class="text-end">Subtotal</th>
                </tr>
            </thead>
            <tbody>`;

    carrito.forEach(p => {
        const subtotal = p.precio * p.cantidad;
        total += subtotal;
        html += `
            <tr>
                <td>${p.nombre}</td>
                <td class="text-center">${p.cantidad}</td>
                <td class="text-end">${p.precio.toFixed(2)}€</td>
                <td class="text-end">${subtotal.toFixed(2)}€</td>
            </tr>`;
    });

    html += `
            </tbody>
            <tfoot>
                <tr class="fw-bold">
                    <td colspan="3" class="text-end">Total pedido:</td>
                    <td class="text-end">${total.toFixed(2)}€</td>
                </tr>
            </tfoot>
        </table>
        </div>`;

    contenedor.innerHTML = html;
    return total;
}

// ── 6. Vaciar carrito ──────────────────────────────────────────────────────────

export function eliminarCarrito() {
    carrito = [];
    guardarCarrito();
    actualizarResumenCarrito();
}