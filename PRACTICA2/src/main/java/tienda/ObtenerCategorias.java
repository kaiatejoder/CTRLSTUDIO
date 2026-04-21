package tienda;

import java.io.IOException;
import java.util.ArrayList;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;

/**
 * ObtenerCategorias - Servlet que devuelve todas las categorías en JSON.
 *
 * URL: /obtenerCategorias.html
 * Respuesta: application/json → array de CategoriaBD
 */
public class ObtenerCategorias extends HttpServlet {

    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        AccesoBD con = AccesoBD.getInstance();
        ArrayList<CategoriaBD> categorias = con.obtenerCategorias();

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        try (Jsonb jsonb = JsonbBuilder.create()) {
            response.getWriter().print(jsonb.toJson(categorias));
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