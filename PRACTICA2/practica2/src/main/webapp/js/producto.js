/**
 * producto.js
 * Clase que representa un producto dentro del carrito de la compra.
 * Se exporta para ser importada por libcarrito.js.
 */
export class Producto {
    constructor(
        codigo      = -1,
        nombre      = "",
        descripcion = "",
        precio      = 0,
        cantidad    = 0,
        existencias = 0,
        imagen      = ""
    ) {
        this.codigo      = codigo;
        this.nombre      = nombre;
        this.descripcion = descripcion;
        this.precio      = precio;
        this.cantidad    = cantidad;
        this.existencias = existencias;
        this.imagen      = imagen;
    }
}