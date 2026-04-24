import * as LibServlet from './libservlet.js';
document.addEventListener("DOMContentLoaded",
function() {
 inicio();
});
document.getElementById('botonLogin').addEventListener('click', loginUsuario);
export function inicio()
{

}
export function loginUsuario()
{
 let url = "loginTienda.html";
 let formulario = document.getElementById("formularioLogin");
 LibServlet.loginTienda(url, formulario).then(respuesta => {
 if (respuesta.error) {
 console.log("Error de login:", respuesta.error);
 formulario.reset();

 } else {
 // Login correcto, redirigir a la página principal
 localStorage.setItem("usuario", JSON.stringify(respuesta.usuario));
 window.location.replace("perfil.html");
 }
});
}