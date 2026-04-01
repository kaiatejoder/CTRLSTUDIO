package tienda;

import java.io.IOException;
import java.util.ArrayList;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;

/**
 * ObtenerProductos - Servlet que devuelve el listado de productos en JSON.
 *
 * URL: /obtenerProductos.html
 * Parámetro GET opcional: categoria (int) — filtra por categoría.
 * Si no se envía o es 0, devuelve todos los productos.
 *
 * Respuesta: application/json  →  array de ProductoBD
 */
public class ObtenerProductos extends HttpServlet {

    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        AccesoBD con = AccesoBD.getInstance();

        // Leer parámetro opcional de categoría
        int categoria = 0;
        String paramCat = request.getParameter("categoria");
        if (paramCat != null && !paramCat.isEmpty()) {
            try { categoria = Integer.parseInt(paramCat); }
            catch (NumberFormatException ignored) {}
        }

        ArrayList<ProductoBD> productos = con.obtenerProductosBD(categoria);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        try (Jsonb jsonb = JsonbBuilder.create()) {
            String jsonProductos = jsonb.toJson(productos);
            response.getWriter().print(jsonProductos);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }
}