package tienda;

import java.io.IOException;
import java.util.LinkedHashMap;

import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class RegistrarUsuario extends HttpServlet {

    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doPost(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json; charset=UTF-8");

        String usuario = request.getParameter("usuario");
        String clave = request.getParameter("clave");
        String nombre = request.getParameter("nombre");
        String apellidos = request.getParameter("apellidos");
        String domicilio = request.getParameter("domicilio");
        String poblacion = request.getParameter("poblacion");
        String provincia = request.getParameter("provincia");
        String cp = request.getParameter("cp");
        String telefono = request.getParameter("telefono");

        LinkedHashMap<String, Object> resultado = new LinkedHashMap<>();

        if (usuario == null || usuario.isEmpty() ||
            clave == null || clave.isEmpty() ||
            nombre == null || nombre.isEmpty() ||
            apellidos == null || apellidos.isEmpty()) {

            resultado.put("ok", false);
            resultado.put("mensaje", "Faltan datos obligatorios");

        } else if (AccesoBD.getInstance().existeUsuario(usuario)) {

            resultado.put("ok", false);
            resultado.put("mensaje", "El usuario ya existe");

        } else {

            boolean registrado = AccesoBD.getInstance().registrarUsuario(
                usuario, clave, nombre, apellidos,
                domicilio, poblacion, provincia, cp, telefono
            );

            if (registrado) {
                resultado.put("ok", true);
                resultado.put("mensaje", "Usuario registrado correctamente");
            } else {
                resultado.put("ok", false);
                resultado.put("mensaje", "Error al registrar el usuario");
            }
        }

        try (Jsonb jsonb = JsonbBuilder.create()) {
            response.getWriter().print(jsonb.toJson(resultado));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
