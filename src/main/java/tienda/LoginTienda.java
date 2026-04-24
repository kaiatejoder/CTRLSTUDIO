package tienda;

import java.io.IOException;
import java.util.LinkedHashMap;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;

public class LoginTienda extends HttpServlet {

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
        response.setCharacterEncoding("UTF-8");

        String usuario = request.getParameter("usuario");
        String clave = request.getParameter("clave");

        LinkedHashMap<String, Object> result = new LinkedHashMap<>();

        if (usuario == null || usuario.isEmpty() || clave == null || clave.isEmpty()) {
            result.put("ok", Boolean.FALSE);
            result.put("mensaje", "Datos incompletos");
        } else {
            UsuarioBD usuarioBD = AccesoBD.getInstance().validarUsuario(usuario, clave);
            if (usuarioBD == null) {
                result.put("ok", Boolean.FALSE);
                result.put("mensaje", "Usuario o contraseña incorrectos");
            } else {
                result.put("ok", Boolean.TRUE);
                result.put("usuario", usuarioBD);
            }
        }

        try (Jsonb jsonb = JsonbBuilder.create()) {
            String json = jsonb.toJson(result);
            response.getWriter().print(json);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
