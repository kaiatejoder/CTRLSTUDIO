class Cabecera extends HTMLElement {
    constructor() {
        super()
        this.innerHTML = `<header><h1>Logo Tienda - CTRL Studio</h1></header>`
    }
}
window.customElements.define('mi-cabecera', Cabecera);

class Pie extends HTMLElement {
    constructor() {
        super()
        this.innerHTML = `<footer>&copy; 2026 - CTRL Studio - @ctrlstudio.co</footer>    
        `
    }
}
window.customElements.define('mi-pie', Pie);

class Menu extends HTMLElement {
    constructor() {
        super()
        this.innerHTML = `
<nav class="navbar navbar-expand-lg cabecera">
<div class="container position-relative d-flex align-items-center justify-content-between">

    <!-- LOGO -->
     <a class="navbar-brand" href="#"> <img src="img/LOGO.min.svg" class="logo-svg" alt="CTRL Studio"></a>

    <!-- MENÚ CENTRADO -->
    <div class="menu-wrapper d-none d-lg-block">
      <ul class="navbar-nav flex-row gap-4 menu-pill px-4 py-2">
        <li class="nav-item"><a class="nav-link active" href="#">HOME</a></li>
        <li class="nav-item"><a class="nav-link" href="#">ABOUT</a></li>
        <li class="nav-item"><a class="nav-link" href="#">SOLUTIONS</a></li>
        <li class="nav-item"><a class="nav-link" href="#">PLANS</a></li>
        <li class="nav-item"><a class="nav-link" href="#">CONTACT</a></li>
      </ul>
    </div>

    <!-- BOTÓN -->
    <a href="#" class="btn btn-login d-none d-lg-inline-block">
      LOG IN / SIGN UP ↗
    </a>

    <!-- TOGGLER -->
    <button class="navbar-toggler border-0" type="button"
      data-bs-toggle="collapse" data-bs-target="#mobileNav">
      <span class="navbar-toggler-icon"></span>
    </button>

  </div>
</nav>
        `
    }
}
window.customElements.define('mi-menu', Menu);

// Efecto de fondo bitmap
