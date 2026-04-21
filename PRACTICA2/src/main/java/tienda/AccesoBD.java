package tienda;

import java.sql.*;
import java.util.ArrayList;

/**
 * AccesoBD - Clase factoría Singleton para acceso a MariaDB.
 * Gestiona la conexión y todas las consultas a la base de datos 'daw'.
 */
public final class AccesoBD {

    // ── Singleton ──────────────────────────────────────────────────────────────
    private static AccesoBD instanciaUnica = null;
    private Connection conexionBD = null;

    public static AccesoBD getInstance() {
        if (instanciaUnica == null) {
            instanciaUnica = new AccesoBD();
        }
        return instanciaUnica;
    }

    private AccesoBD() {
        abrirConexionBD();
    }

    // ── Conexión ───────────────────────────────────────────────────────────────
    public void abrirConexionBD() {
        if (conexionBD == null) {
            String JDBC_DRIVER = "org.mariadb.jdbc.Driver";
            String DB_URL      = "jdbc:mariadb://localhost:3308/ctrlstudio?useSSL=false&serverTimezone=UTC";
            String USER        = "root";
            String PASS        = "DawLab";          // sin contraseña

            try {
                Class.forName(JDBC_DRIVER);
                conexionBD = DriverManager.getConnection(DB_URL, USER, PASS);
            } catch (Exception e) {
                System.err.println("No se ha podido conectar a la base de datos");
                System.err.println(e.getMessage());
                e.printStackTrace();
            }
        }
    }

    /** Comprueba si la conexión es válida (útil para testbd.jsp). */
    public boolean comprobarAcceso() {
        abrirConexionBD();
        return (conexionBD != null);
    }

    // ── Productos ──────────────────────────────────────────────────────────────

    /**
     * Devuelve todos los productos de una categoría.
     * Si categoria <= 0 devuelve TODOS los productos.
     */
    public ArrayList<ProductoBD> obtenerProductosBD(int categoria) {
        abrirConexionBD();
        ArrayList<ProductoBD> productos = new ArrayList<>();

        try {
            String query;
            PreparedStatement s;

            if (categoria > 0) {
                query = "SELECT codigo, nombre, descripcion, precio, existencias, imagen, categoria " +
                        "FROM productos WHERE categoria = ?";
                s = conexionBD.prepareStatement(query);
                s.setInt(1, categoria);
            } else {
                query = "SELECT codigo, nombre, descripcion, precio, existencias, imagen, categoria " +
                        "FROM productos";
                s = conexionBD.prepareStatement(query);
            }

            ResultSet resultado = s.executeQuery();
            while (resultado.next()) {
                ProductoBD producto = new ProductoBD();
                producto.setCodigo(resultado.getInt("codigo"));
                producto.setNombre(resultado.getString("nombre"));
                producto.setDescripcion(resultado.getString("descripcion"));
                producto.setPrecio(resultado.getFloat("precio"));
                producto.setExistencias(resultado.getInt("existencias"));
                producto.setImagen(resultado.getString("imagen"));
                producto.setCategoria(resultado.getInt("categoria"));
                productos.add(producto);
            }
        } catch (Exception e) {
            System.err.println("Error ejecutando la consulta a la base de datos");
            System.err.println(e.getMessage());
        }

        return productos;
    }

    // ── Usuarios ───────────────────────────────────────────────────────────────

    /**
     * Valida usuario y contraseña. Devuelve el registro completo o null.
     */
    public UsuarioBD validarUsuario(String usuario, String clave) {
        abrirConexionBD();
        UsuarioBD user = null;

        try {
            String query = "SELECT * FROM usuarios WHERE usuario = ? AND clave = ? AND activo = 1";
            PreparedStatement s = conexionBD.prepareStatement(query);
            s.setString(1, usuario);
            s.setString(2, clave);

            ResultSet resultado = s.executeQuery();
            if (resultado.next()) {
                user = new UsuarioBD();
                user.setCodigo(resultado.getInt("codigo"));
                user.setUsuario(resultado.getString("usuario"));
                user.setNombre(resultado.getString("nombre"));
                user.setApellidos(resultado.getString("apellidos"));
                user.setAdmin(resultado.getInt("admin"));
                user.setActivo(resultado.getInt("activo"));
                user.setDomicilio(resultado.getString("domicilio"));
                user.setPoblacion(resultado.getString("poblacion"));
                user.setProvincia(resultado.getString("provincia"));
                user.setCp(resultado.getString("cp"));
                user.setTelefono(resultado.getString("telefono"));
            }
        } catch (Exception e) {
            System.err.println("Error validando usuario");
            System.err.println(e.getMessage());
        }

        return user;
    }

    /**
     * Registra un nuevo usuario. Devuelve true si se insertó correctamente.
     */
    public boolean registrarUsuario(String usuario, String clave, String nombre,
                                    String apellidos, String domicilio,
                                    String poblacion, String provincia,
                                    String cp, String telefono) {
        abrirConexionBD();
        try {
            String query = "INSERT INTO usuarios " +
                "(usuario, clave, nombre, apellidos, domicilio, poblacion, provincia, cp, telefono) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            PreparedStatement s = conexionBD.prepareStatement(query);
            s.setString(1, usuario);
            s.setString(2, clave);
            s.setString(3, nombre);
            s.setString(4, apellidos);
            s.setString(5, domicilio);
            s.setString(6, poblacion);
            s.setString(7, provincia);
            s.setString(8, cp);
            s.setString(9, telefono);
            s.executeUpdate();
            return true;
        } catch (Exception e) {
            System.err.println("Error registrando usuario: " + e.getMessage());
            return false;
        }
    }

    /**
     * Comprueba si un nombre de usuario ya existe (para registro).
     */
    public boolean existeUsuario(String usuario) {
        abrirConexionBD();
        try {
            String query = "SELECT codigo FROM usuarios WHERE usuario = ?";
            PreparedStatement s = conexionBD.prepareStatement(query);
            s.setString(1, usuario);
            ResultSet res = s.executeQuery();
            return res.next();
        } catch (Exception e) {
            return false;
        }
    }

    // ── Categorías ─────────────────────────────────────────────────────────────

    /** Devuelve todas las categorías de productos. */
    public ArrayList<CategoriaBD> obtenerCategorias() {
        abrirConexionBD();
        ArrayList<CategoriaBD> categorias = new ArrayList<>();
        try {
            String query = "SELECT codigo, descripcion FROM categorias";
            PreparedStatement s = conexionBD.prepareStatement(query);
            ResultSet resultado = s.executeQuery();
            while (resultado.next()) {
                CategoriaBD cat = new CategoriaBD();
                cat.setCodigo(resultado.getInt("codigo"));
                cat.setDescripcion(resultado.getString("descripcion"));
                categorias.add(cat);
            }
        } catch (Exception e) {
            System.err.println("Error obteniendo categorías: " + e.getMessage());
        }
        return categorias;
    }
}
