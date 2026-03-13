class MiMenu extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
<nav class="navbar navbar-expand-lg ctrl-navbar">
  <div class="container-fluid px-0">
    <a class="navbar-brand ps-3" href="index.html"><img src="img/LOGO.svg" class="logo-svg" alt="CTRL Studio"></a>

    <button class="navbar-toggler border-0 shadow-none me-3" type="button" data-bs-toggle="collapse" data-bs-target="#mobileNav" data-bs-auto-close="false" aria-controls="mobileNav" aria-expanded="false" aria-label="Abrir menú">
      <span class="toggler-bar"></span>
      <span class="toggler-bar"></span>
    </button>

    <div class="collapse navbar-collapse" id="mobileNav">
      <div class="navbar-nav flex-column gap-2 p-3">
        <a class="nav-link" href="index.html">INICIO</a>
        <a class="nav-link" href="empresa.html">EMPRESA</a>
        <a class="nav-link" href="productos.html">PRODUCTOS</a>
        <a class="nav-link" href="contacto.html">CONTACTO</a>
        <a class="nav-link" href="carrito.html">CARRITO</a>
        <a class="nav-link d-flex align-items-center gap-2" href="usuario.html">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" alt="Icono de perfil">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
          USUARIO
        </a>
      </div>
    </div>

    <div class="d-none d-lg-flex align-items-center gap-2 pe-3">
      <div class="menu-pill d-flex align-items-center px-3 py-2">
        <ul class="navbar-nav flex-row gap-3 mb-0">
          <li class="nav-item"><a class="nav-link" href="index.html">INICIO</a></li>
          <li class="nav-item"><a class="nav-link" href="empresa.html">EMPRESA</a></li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">SERVICIOS</a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="productos.html">Todos los servicios</a></li>
              <li><a class="dropdown-item" href="productos.html#branding">Branding</a></li>
              <li><a class="dropdown-item" href="productos.html#plantillas">Plantillas</a></li>
              <li><a class="dropdown-item" href="productos.html#planes">Planes</a></li>
            </ul>
          </li>
          <li class="nav-item"><a class="nav-link" href="contacto.html">CONTACTO</a></li>
        </ul>
      </div>
      <a href="carrito.html" class="btn-carrito" aria-label="Carrito">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 01-8 0"/>
        </svg>
        <span class="carrito-count" id="cart-count">0</span>
      </a>
      <a href="usuario.html" class="btn-carrito" aria-label="Perfil" title="Mi Perfil">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
      </a>
    </div>
  </div>
</nav>`;
        this.connectedCallback();
    }
    
    connectedCallback() {
        setTimeout(() => {
            // Dropdown desktop
            const dropdownMenu = this.querySelector('.dropdown-menu');
            if (dropdownMenu) {
                dropdownMenu.addEventListener('click', (e) => {
                    e.stopPropagation();
                });
            }
            
            // Menú mobile - mantener abierto
            const mobileNav = this.querySelector('#mobileNav');
            const toggler = this.querySelector('.navbar-toggler');
            
            if (mobileNav && toggler) {
                // Evitar que se cierre al hacer click en los enlaces
                mobileNav.addEventListener('click', (e) => {
                    if (e.target.tagName === 'A' && e.target.classList.contains('nav-link')) {
                        // Permitir que se cierre solo si realmente va a otra página
                        const href = e.target.getAttribute('href');
                        if (href && href !== '#') {
                            // Dejar que se cierre de forma natural
                        }
                    }
                });
                
                // Cerrar solo al hacer click en el toggler
                toggler.addEventListener('click', () => {
                    if (mobileNav.classList.contains('show')) {
                        mobileNav.classList.remove('show');
                    } else {
                        mobileNav.classList.add('show');
                    }
                });
                
                // No cerrar al hacer click dentro del menú
                mobileNav.addEventListener('click', (e) => {
                    e.stopPropagation();
                });
            }
        }, 0);
    }
}
window.customElements.define('mi-menu', MiMenu);

class MiPie extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
<footer class="ctrl-footer">
  <div class="container">
    <div class="row gy-4">
      <div class="col-lg-4">
        <img src="img/LOGO.svg" class="logo-svg" alt="CTRL Studio" style="height: 2rem; width: auto; color: var(--azul);">
        <p class="footer-tagline mt-3">Purpose beyond px</p>
        <div class="footer-socials mt-3">
          <a href="https://www.instagram.com" target="_blank" rel="noopener" aria-label="Instagram">IG</a>
          <a href="https://www.behance.net" target="_blank" rel="noopener" aria-label="Behance">BE</a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn">LI</a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener" aria-label="Twitter/X">XX</a>
        </div>
      </div>
      <div class="col-lg-2 col-6">
        <p class="footer-heading">Nosotros</p>
        <ul class="footer-links">
          <li><a href="empresa.html">Nosotros</a></li>
          <li><a href="empresa.html">Equipo</a></li>
          <li><a href="empresa.html">Proceso</a></li>
          <li><a href="contacto.html">Contacto</a></li>
        </ul>
      </div>
      <div class="col-lg-2 col-6">
        <p class="footer-heading">Productos</p>
        <ul class="footer-links">
          <li><a href="productos.html#branding">Branding</a></li>
          <li><a href="productos.html#plantillas">Plantillas</a></li>
          <li><a href="productos.html#planes">Planes</a></li>
        </ul>
      </div>
      <div class="col-lg-4">
        <p class="footer-heading">Horario de atención</p>
        <p class="footer-schedule">Lun – Dom: Activos 24/7</p>
        <p class="footer-contact mt-3">
          <a href="mailto:hi@ctrlstudio.es">hi@ctrlstudio.es</a><br>
          
        </p>
      </div>
    </div>
    <div class="footer-bottom mt-5">
      <span>&copy; 2026 CTRL Studio — Valencia, España</span>
      <span>Todos los derechos reservados</span>
    </div>
  </div>
</footer>`;
    }
}
window.customElements.define('mi-pie', MiPie);
