package tienda;

/**
 * ProductoBD - JavaBean que representa un producto de la tienda.
 * Campos sincronizados con la tabla 'productos' de la BD.
 */
public class ProductoBD {

    private int    codigo;
    private String nombre;
    private String descripcion;
    private float  precio;
    private int    existencias;
    private String imagen;
    private int    categoria;

    // Constructor sin argumentos (obligatorio en JavaBean)
    public ProductoBD() {}

    // ── Getters ────────────────────────────────────────────────────────────────

    public int getCodigo()        { return codigo; }
    public String getNombre()     { return nombre; }
    public String getDescripcion(){ return descripcion; }
    public float getPrecio()      { return precio; }
    public int getExistencias()   { return existencias; }
    public String getImagen()     { return imagen; }
    public int getCategoria()     { return categoria; }

    // ── Setters ────────────────────────────────────────────────────────────────

    public void setCodigo(int codigo)            { this.codigo      = codigo; }
    public void setNombre(String nombre)         { this.nombre      = nombre; }
    public void setDescripcion(String desc)      { this.descripcion = desc; }
    public void setPrecio(float precio)          { this.precio      = precio; }
    public void setExistencias(int existencias)  { this.existencias = existencias; }
    public void setImagen(String imagen)         { this.imagen      = imagen; }
    public void setCategoria(int categoria)      { this.categoria   = categoria; }
}