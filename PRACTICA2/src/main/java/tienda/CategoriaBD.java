package tienda;

/**
 * CategoriaBD - JavaBean que representa una categoría de productos.
 */
public class CategoriaBD {

    private int    codigo;
    private String descripcion;

    public CategoriaBD() {}

    public int    getCodigo()      { return codigo; }
    public String getDescripcion() { return descripcion; }

    public void setCodigo(int codigo)            { this.codigo      = codigo; }
    public void setDescripcion(String descripcion){ this.descripcion = descripcion; }
}