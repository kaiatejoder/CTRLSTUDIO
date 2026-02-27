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
        this.innerHTML = `<menu><ul>
                    <li><a href="index.html"> Inicio</a></li>
                    <li><a href="empresa.html"> Empresa</a></li>
                    <li>...</li>
                    </ul>
                    </menu>     
        `
    }
}
window.customElements.define('mi-menu', Menu);
