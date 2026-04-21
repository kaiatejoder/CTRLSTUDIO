
/**
 * libservlet.js
 * Librería de comunicación asíncrona con los Servlets del servidor.
 * Se importa como módulo en los .js de cada página.
 *
 * Funciones exportadas:
 *  - obtenerProductos(url)          → GET → array de ProductoBD
 *  - obtenerCategorias(url)         → GET → array de CategoriaBD
 *  - enviarUsuarioServlet(url, form) → POST → respuesta JSON del servidor
 */

// ── Obtener productos (con o sin filtro de categoría) ──────────────────────────

export async function obtenerProductos(url) {
    const options = { method: "GET" };
    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error("Fallo en el servidor");
        const listaProductos = await response.json();
        return listaProductos;
    } catch (error) {
        console.error("Error obteniendo productos:", error);
        return [];
    }
}

// ── Obtener categorías ─────────────────────────────────────────────────────────

export async function obtenerCategorias(url) {
    const options = { method: "GET" };
    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error("Fallo en el servidor");
        return await response.json();
    } catch (error) {
        console.error("Error obteniendo categorías:", error);
        return [];
    }
}

// ── Enviar formulario a un Servlet (POST) ──────────────────────────────────────

export async function enviarUsuarioServlet(url, formulario) {
    const formularioDatos = new FormData(formulario);
    const parametros      = new URLSearchParams(formularioDatos);

    try {
        const response = await fetch(url, {
            method: "POST",
            body:   parametros
        });
        if (!response.ok) throw new Error("Fallo en el servidor");

        const respuesta = await response.json();
        console.log("Respuesta del servlet:", respuesta);
        return respuesta;
    } catch (error) {
        console.error("Hubo un error:", error);
        return { error: "Error en el servidor" };
    }
}