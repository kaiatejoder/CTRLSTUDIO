package tienda;

/**
 * UsuarioBD - JavaBean que representa un usuario registrado.
 * Campos sincronizados con la tabla 'usuarios' de la BD.
 */
public class UsuarioBD {

    private int    codigo;
    private int    activo;
    private int    admin;
    private String usuario;
    private String clave;
    private String nombre;
    private String apellidos;
    private String domicilio;
    private String poblacion;
    private String provincia;
    private String cp;
    private String telefono;

    public UsuarioBD() {}

    // ── Getters ────────────────────────────────────────────────────────────────

    public int    getCodigo()    { return codigo; }
    public int    getActivo()    { return activo; }
    public int    getAdmin()     { return admin; }
    public String getUsuario()   { return usuario; }
    public String getClave()     { return clave; }
    public String getNombre()    { return nombre; }
    public String getApellidos() { return apellidos; }
    public String getDomicilio() { return domicilio; }
    public String getPoblacion() { return poblacion; }
    public String getProvincia() { return provincia; }
    public String getCp()        { return cp; }
    public String getTelefono()  { return telefono; }

    // ── Setters ────────────────────────────────────────────────────────────────

    public void setCodigo(int v)       { this.codigo    = v; }
    public void setActivo(int v)       { this.activo    = v; }
    public void setAdmin(int v)        { this.admin     = v; }
    public void setUsuario(String v)   { this.usuario   = v; }
    public void setClave(String v)     { this.clave     = v; }
    public void setNombre(String v)    { this.nombre    = v; }
    public void setApellidos(String v) { this.apellidos = v; }
    public void setDomicilio(String v) { this.domicilio = v; }
    public void setPoblacion(String v) { this.poblacion = v; }
    public void setProvincia(String v) { this.provincia = v; }
    public void setCp(String v)        { this.cp        = v; }
    public void setTelefono(String v)  { this.telefono  = v; }
}