package prueba;
import java.io.IOException; // Paquete entrada y salida (incluye PrintWriter)
import java.io.PrintWriter; // Paquete base Servlets (incluye ServletException)

import jakarta.servlet.ServletException; // Paquete HTTP Servlets (incluye HttpServlet)
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
public class Hola extends HttpServlet {
// Método que se llama cuando hay una petición GET
protected void doGet(HttpServletRequest request, HttpServletResponse response)
throws ServletException, IOException {
// El objeto "request" se utiliza para leer la
// cabecera HTTP, cookies, datos enviados (GET o POST)
// El objeto "response" para fijar la respuesta
PrintWriter out = response.getWriter();
// out Se utiliza para enviar el contenido al cliente 
out.println("HOLA MUNDO desde un Servlet");
}
// Método que se llama cuando hay una petición POST
protected void doPost(HttpServletRequest request, HttpServletResponse response)
throws ServletException, IOException {
// Al no tener código no se hace nada al recibir la petición
}
}