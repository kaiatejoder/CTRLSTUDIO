/* ================================================================
   DATOS DE PROYECTOS
   ──────────────────────────────────────────────────────────────
   Para añadir un proyecto manualmente aquí, copia un objeto y
   cambia los valores. Si la imagen es externa usa una URL completa;
   si es local pon la ruta relativa: "img/proyectos/miprojecto.jpg"

   Campos:
     id       : número único (no repetir)
     nombre   : nombre visible
     cat      : categoría (texto libre)
     anyo     : año (número)
     desc     : descripción breve
     img      : ruta/url de imagen, o null para usar placeholder
     color    : color del placeholder si no hay imagen
================================================================ */
const PROYECTOS_DEFAULT = [
    {
        id: 1,
        nombre: 'InmoArquitectos',
        cat: 'Identidad de Marca',
        anyo: 2024,
        desc: 'Resideño de marca para una Inmobiliaria-Constructora Valenciana. Logo, papelería, redes y web.',
        descCompleta: 'InmoArquitectos es una inmobiliaria con 7 oficinas a lo largo de la comunidad valenciana.\nCuando comencé a trabajar con ellos, simplemente tenía que ayudar a crear la página web en Wordpress y, ocasionalmente, crear contenido... Lo cual acabó derivando en dos años donde llevé toda la gestión del marketing (Sigo trabajando encargos suyos a día de hoy), un rebranding de la marca, toda la página web y una estrategia en redes sociales que ha dado un vuelco a su presencia online, con un crecimiento de seguidores del 300% en Instagram y una comunidad muy activa.',
        img: "img/proyectos/inmoarquitectos.png",
        img2: "img/proyectos/inmoarquitectosFlyer.png",
        desc2: 'Cuando llegué a la empresa, me encontré con una clara necesidad de actualizar la marca tanto a los nuevos tiempos como a el competitivo ecosistema inmobiliario en Valencia.  Aquí se puede observar el detalle de todo el material que diseñé a una primera vista, con la adición de nuevos contenido de papelería y promocional.\n El estilo visual se adapta al flujo de trabajo del equipo, con un diseño modular y flexible, que se puede adaptar a cualquier formato o canal.',
        img3: "img/proyectos/inmoarquitectosPlantillaPisos.png",
        desc3: 'El kit incluye, además del logo, una paleta de colores, tipografías y un extenso set de elementos gráficos para crear todo tipo de piezas, desde tarjetas de visita hasta vallas publicitarias. El resultado es una identidad visual sólida, coherente y versátil que refleja la profesionalidad y el enfoque innovador de InmoArquitectos.',
        color: '#0d0c1a'
    },
    {
        id: 2,
        nombre: 'Kit Social Media',
        cat: 'Social Media',
        anyo: 2025,
        desc: 'Pack de plantillas para Instagram y LinkedIn. 24 piezas adaptadas a la identidad del cliente.',
        descCompleta: null,
        img: null,
        img2: null,
        desc2: null,
        img3: null,
        desc3: null,
        color: '#a50136'
    },
    {
        id: 3,
        nombre: 'Branding Cafetería',
        cat: 'Branding',
        anyo: 2024,
        desc: 'Naming, logo, packaging y señalética para cafetería de especialidad.',
        descCompleta: null,
        img: null,
        img2: null,
        desc2: null,
        img3: null,
        desc3: null,
        color: '#4e5174'
    },
    {
        id: 4,
        nombre: 'Web CTRL Studio',
        cat: 'Web Design',
        anyo: 2025,
        desc: 'Diseño y desarrollo de la web corporativa de CTRL Studio. HTML, CSS, Bootstrap.',
        descCompleta: 'CTRL Studio es mi marca personal, y esta web es el proyecto más ambicioso que he llevado a cabo hasta la fecha. Diseñada y desarrollada desde cero, la web está construida con HTML, CSS y Bootstrap, sin ningún CMS de por medio, lo que me ha permitido un control total sobre cada aspecto del diseño y la funcionalidad. El resultado es una plataforma elegante, rápida y totalmente personalizada que refleja la esencia de mi trabajo como diseñadora.',
        img: null,
        img2: null,
        desc2: null,
        img3: null,
        desc3: null,
        color: '#2d4a3e'
    },
];

/* ── LEER / GUARDAR proyectos en localStorage ── */
function cargarProyectos() {
    try {
        const raw = localStorage.getItem('ctrl_proyectos');
        return raw ? JSON.parse(raw) : PROYECTOS_DEFAULT;
    } catch(_) { return PROYECTOS_DEFAULT; }
}

function guardarProyectos(arr) {
    localStorage.setItem('ctrl_proyectos', JSON.stringify(arr));
}

/* ── RENDER DE CARRUSEL (homepage) ── */
function renderCarrusel() {
    const proyectos = cargarProyectos();
    const root = document.getElementById('carousel-root');
    if (!root) return; // Si no existe el elemento, salir

    const colores = ['wc1', 'wc2', 'wc3', 'wc4', 'wc5'];
    let html = '';

    // Renderizar cada proyecto
    proyectos.forEach((p, idx) => {
        const colorClass = colores[idx % colores.length];
        html += `<div class="work-card ${colorClass}">${p.nombre} — ${p.cat}</div>`;
    });

    // Duplicar para efecto infinito (necesario para la animación)
    const htmlDuplicado = html;
    root.innerHTML = htmlDuplicado + htmlDuplicado;
}

/* ── RENDER DE GALERÍA ── */
function renderGaleria() {
    const proyectos = cargarProyectos();
    const root = document.getElementById('galeria-root');
    const contador = document.getElementById('proyecto-count');
    contador.textContent = proyectos.length + ' piezas';

    if (!proyectos.length) {
        root.innerHTML = '<div style="text-align:center; padding:5rem 0; color:rgba(0,0,0,0.3); font-size:0.88rem">Aún no hay proyectos. ¡Añade el primero!</div>';
        return;
    }

    /* Distribuir en filas con layouts asimétricos */
    const layouts = ['r-2-1', 'r-1-2', 'r-3', 'r-2-1', 'r-1-2'];
    let html = '';
    let i = 0;
    let layoutIdx = 0;

    while (i < proyectos.length) {
        const layout = layouts[layoutIdx % layouts.length];
        let cols = layout === 'r-3' ? 3 : 2;
        const fila = proyectos.slice(i, i + cols);

        html += `<div class="galeria-row ${layout}">`;
        fila.forEach((p, fi) => {
            const offsetClass = layout === 'r-2-1' && fi === 1 ? 'offset-down'
                              : layout === 'r-1-2' && fi === 0 ? 'offset-down' : '';
            html += renderProyectoCard(p, offsetClass);
        });
        // Si quedaron huecos en la última fila, añadir "add" card
        if (fila.length < cols && i + fila.length >= proyectos.length) {
            html += renderAddCard();
        }
        html += '</div>';

        i += cols;
        layoutIdx++;
    }

    // Añadir botón de añadir en la última fila si todas están completas
    if (proyectos.length % 1 === 0) {
        html += `<div class="galeria-row r-3">
            ${renderAddCard()}
            <div></div><div></div>
        </div>`;
    }

    root.innerHTML = html;

    // Activar parallax en las cards
    initParallax();

    // Reveal
    requestAnimationFrame(() => {
        root.querySelectorAll('.reveal').forEach(el => {
            observer.observe(el);
        });
    });
}

function renderProyectoCard(p, extraClass = '') {
    const initials = p.nombre.split(' ').slice(0,2).map(w => w[0]).join('').toUpperCase();
    const imgHtml = p.img
        ? `<img class="proyecto-img" src="${p.img}" alt="${p.nombre}" loading="lazy">`
        : `<div class="proyecto-placeholder" data-initials="${initials}" style="background:linear-gradient(135deg,${p.color}dd,${p.color}88)"></div>`;

    return `
    <div class="${extraClass}">
        <div class="proyecto-card reveal" data-id="${p.id}" onclick="abrirVer(${p.id})">
            ${imgHtml}
            <div class="proyecto-overlay">
                <div class="proyecto-nombre">${p.nombre}</div>
                <div class="proyecto-cat">${p.cat} · ${p.anyo}</div>
            </div>
            <div class="proyecto-arrow">↗</div>
        </div>
        <div class="proyecto-meta">
            <div>
                <div class="proyecto-meta-nombre">${p.nombre}</div>
                <div class="proyecto-meta-cat">${p.cat}</div>
            </div>
            <div class="proyecto-meta-year">${p.anyo}</div>
        </div>
    </div>`;
}

function renderAddCard() {
    // Solo mostrar botón si el usuario es administrador
    if (sessionStorage.getItem("ctrl_admin") !== "true") {
        return '';
    }
    
    return `
    <div>
        <div class="add-proyecto-card" onclick="abrirNuevo()" title="Añadir proyecto">
            <div class="add-icon">+</div>
            <span>Añadir proyecto</span>
        </div>
    </div>`;
}

/* ================================================================
   PARALLAX
================================================================ */
function initParallax() {
    const cards = document.querySelectorAll('.proyecto-card');
    const handler = () => {
        const scrollY = window.scrollY;
        cards.forEach((card, i) => {
            const rect = card.getBoundingClientRect();
            const centerY = rect.top + rect.height / 2;
            const viewH = window.innerHeight;
            const progress = (centerY - viewH / 2) / viewH; // -0.5 a +0.5
            const speed = (i % 3 === 1) ? 18 : (i % 3 === 2) ? -12 : 8;
            card.style.transform = `translateY(${progress * speed}px)`;
        });
    };
    window.removeEventListener('scroll', window._parallaxHandler || (() => {}));
    window._parallaxHandler = handler;
    window.addEventListener('scroll', handler, { passive: true });
    handler();
}

/* ================================================================
   MODAL — VER PROYECTO (público)
================================================================ */
function abrirVer(id) {
    const proyectos = cargarProyectos();
    const p = proyectos.find(x => x.id === id);
    if (!p) return;

    document.getElementById('ver-proyecto-titulo').textContent = p.nombre;
    document.getElementById('ver-proyecto-nombre').textContent = p.nombre;
    document.getElementById('ver-proyecto-meta').textContent = `${p.cat} · ${p.anyo}`;
    document.getElementById('ver-proyecto-desc').textContent = p.desc || '';

    // Imagen principal
    const imgWrap = document.getElementById('ver-proyecto-img-wrap');
    if (p.img) {
        document.getElementById('ver-proyecto-img').src = p.img;
        document.getElementById('ver-proyecto-img').alt = p.nombre;
        imgWrap.style.display = 'block';
    } else {
        imgWrap.style.display = 'none';
    }

    // Descripción completa (opcional)
    const descCompletaWrap = document.getElementById('ver-proyecto-desc-completa-wrap');
    if (p.descCompleta) {
        document.getElementById('ver-proyecto-desc-completa').textContent = p.descCompleta;
        descCompletaWrap.style.display = 'block';
    } else {
        descCompletaWrap.style.display = 'none';
    }

    // Imágenes adicionales (opcional)
    const imgsWrap = document.getElementById('ver-proyecto-imgs-wrap');
    const imgsContainer = document.getElementById('ver-proyecto-imgs-container');
    imgsContainer.innerHTML = '';
    
    const imgs = [];
    if (p.img2) imgs.push({ src: p.img2, desc: p.desc2 });
    if (p.img3) imgs.push({ src: p.img3, desc: p.desc3 });

    if (imgs.length > 0) {
        imgs.forEach(img => {
            const col = document.createElement('div');
            col.className = 'col-md-6';
            col.innerHTML = `
                <figure class="figure">
                    <img src="${img.src}" alt="${img.desc || 'Galería'}" class="figure-img img-fluid rounded">
                    ${img.desc ? `<figcaption class="figure-caption text-center">${img.desc}</figcaption>` : ''}
                </figure>`;
            imgsContainer.appendChild(col);
        });
        imgsWrap.style.display = 'block';
    } else {
        imgsWrap.style.display = 'none';
    }

    new bootstrap.Modal(document.getElementById('modal-ver-proyecto')).show();
}

/* ================================================================
   MODAL — AÑADIR / EDITAR PROYECTO (solo admin)
================================================================ */
let colorSeleccionado = '#e0dbd0';
let imagenBase64 = null;
let imagenBase642 = null;
let imagenBase643 = null;

function abrirNuevo() {
    // Verificar que el usuario es administrador
    if (sessionStorage.getItem("ctrl_admin") !== "true") {
        showToast('❌ Solo administradores pueden añadir proyectos');
        return;
    }
    
    document.getElementById('modal-titulo').textContent  = 'Añadir proyecto';
    document.getElementById('btn-eliminar-proyecto').style.display = 'none';
    document.getElementById('form-proyecto').reset();
    document.getElementById('p-id').value = '';
    document.getElementById('p-anyo').value = new Date().getFullYear();
    document.getElementById('p-preview').style.display = 'none';
    document.getElementById('p-preview-2').style.display = 'none';
    document.getElementById('p-preview-3').style.display = 'none';
    imagenBase64 = null;
    imagenBase642 = null;
    imagenBase643 = null;
    colorSeleccionado = '#e0dbd0';
    document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('selected'));
    document.querySelector('.color-dot').classList.add('selected');
    new bootstrap.Modal(document.getElementById('modal-proyecto')).show();
}

function abrirEditar(id) {
    // Verificar que el usuario es administrador
    if (sessionStorage.getItem("ctrl_admin") !== "true") {
        showToast('❌ Solo administradores pueden editar proyectos');
        return;
    }
    
    const proyectos = cargarProyectos();
    const p = proyectos.find(x => x.id === id);
    if (!p) return;

    document.getElementById('modal-titulo').textContent  = 'Editar proyecto';
    document.getElementById('btn-eliminar-proyecto').style.display = 'inline-flex';
    document.getElementById('p-id').value        = p.id;
    document.getElementById('p-nombre').value    = p.nombre;
    document.getElementById('p-categoria').value = p.cat;
    document.getElementById('p-anyo').value      = p.anyo;
    document.getElementById('p-desc').value      = p.desc || '';
    document.getElementById('p-desc-completa').value = p.descCompleta || '';

    // Imagen principal
    imagenBase64 = p.img || null;
    const preview = document.getElementById('p-preview');
    if (p.img) { preview.src = p.img; preview.style.display = 'block'; }
    else { preview.style.display = 'none'; }

    // Imagen 2
    imagenBase642 = p.img2 || null;
    const preview2 = document.getElementById('p-preview-2');
    if (p.img2) { preview2.src = p.img2; preview2.style.display = 'block'; }
    else { preview2.style.display = 'none'; }
    document.getElementById('p-desc-img-2').value = p.desc2 || '';

    // Imagen 3
    imagenBase643 = p.img3 || null;
    const preview3 = document.getElementById('p-preview-3');
    if (p.img3) { preview3.src = p.img3; preview3.style.display = 'block'; }
    else { preview3.style.display = 'none'; }
    document.getElementById('p-desc-img-3').value = p.desc3 || '';

    // Color
    colorSeleccionado = p.color || '#e0dbd0';
    document.querySelectorAll('.color-dot').forEach(d => {
        d.classList.toggle('selected', d.dataset.color === colorSeleccionado);
    });

    new bootstrap.Modal(document.getElementById('modal-proyecto')).show();
}

function guardarProyecto() {
    // Verificar que el usuario es administrador
    if (sessionStorage.getItem("ctrl_admin") !== "true") {
        showToast('❌ Acceso denegado: solo administradores');
        return;
    }
    
    const nombre = document.getElementById('p-nombre').value.trim();
    if (!nombre) { showToast('El nombre es obligatorio'); return; }

    const proyectos = cargarProyectos();
    const idRaw = document.getElementById('p-id').value;
    const esNuevo = !idRaw;

    const datos = {
        id:     esNuevo ? Date.now() : parseInt(idRaw),
        nombre: nombre,
        cat:    document.getElementById('p-categoria').value,
        anyo:   parseInt(document.getElementById('p-anyo').value) || 2025,
        desc:   document.getElementById('p-desc').value.trim(),
        descCompleta: document.getElementById('p-desc-completa').value.trim() || null,
        img:    imagenBase64,
        img2:   imagenBase642 || null,
        desc2:  document.getElementById('p-desc-img-2').value.trim() || null,
        img3:   imagenBase643 || null,
        desc3:  document.getElementById('p-desc-img-3').value.trim() || null,
        color:  colorSeleccionado
    };

    if (esNuevo) {
        proyectos.push(datos);
    } else {
        const idx = proyectos.findIndex(x => x.id === datos.id);
        if (idx !== -1) proyectos[idx] = datos;
    }

    guardarProyectos(proyectos);
    bootstrap.Modal.getInstance(document.getElementById('modal-proyecto')).hide();
    renderGaleria();
    showToast(esNuevo ? '✓ Proyecto añadido' : '✓ Proyecto actualizado');
}

function eliminarProyecto() {
    // Verificar que el usuario es administrador
    if (sessionStorage.getItem("ctrl_admin") !== "true") {
        showToast('❌ Acceso denegado: solo administradores pueden eliminar');
        return;
    }
    
    const id = parseInt(document.getElementById('p-id').value);
    if (!confirm('¿Eliminar este proyecto?')) return;
    const proyectos = cargarProyectos().filter(x => x.id !== id);
    guardarProyectos(proyectos);
    bootstrap.Modal.getInstance(document.getElementById('modal-proyecto')).hide();
    renderGaleria();
    showToast('Proyecto eliminado');
}

/* ── PREVIEW imagen ── */
function previewImagen(input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
        const result = e.target.result;
        const inputId = input.id;
        
        if (inputId === 'p-imagen') {
            imagenBase64 = result;
            document.getElementById('p-preview').src = result;
            document.getElementById('p-preview').style.display = 'block';
        } else if (inputId === 'p-imagen-2') {
            imagenBase642 = result;
            document.getElementById('p-preview-2').src = result;
            document.getElementById('p-preview-2').style.display = 'block';
        } else if (inputId === 'p-imagen-3') {
            imagenBase643 = result;
            document.getElementById('p-preview-3').src = result;
            document.getElementById('p-preview-3').style.display = 'block';
        }
    };
    reader.readAsDataURL(file);
}

/* ── Seleccionar color ── */
function selectColor(el) {
    document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('selected'));
    el.classList.add('selected');
    colorSeleccionado = el.dataset.color;
}

/* ── Drag & drop en upload zones ── */
function setupDragDrop(zoneId, inputId) {
    const zone = document.getElementById(zoneId);
    if (!zone) return;
    
    ['dragenter','dragover'].forEach(ev => zone.addEventListener(ev, e => {
        e.preventDefault(); zone.classList.add('drag-over');
    }));
    ['dragleave','drop'].forEach(ev => zone.addEventListener(ev, e => {
        e.preventDefault(); zone.classList.remove('drag-over');
        if (ev === 'drop' && e.dataTransfer.files[0]) {
            document.getElementById(inputId).files = e.dataTransfer.files;
            previewImagen(document.getElementById(inputId));
        }
    }));
}

setupDragDrop('upload-zone', 'p-imagen');
setupDragDrop('upload-zone-2', 'p-imagen-2');
setupDragDrop('upload-zone-3', 'p-imagen-3');

/* ================================================================
   CURSOR PERSONALIZADO
================================================================ */
const cur = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
document.addEventListener('mousemove', e => {
    cur.style.left  = e.clientX + 'px';
    cur.style.top   = e.clientY + 'px';
    ring.style.left = e.clientX + 'px';
    ring.style.top  = e.clientY + 'px';
});
document.querySelectorAll('a, button, .proyecto-card, .add-proyecto-card').forEach(el => {
    el.addEventListener('mouseenter', () => cur.classList.add('big'));
    el.addEventListener('mouseleave', () => cur.classList.remove('big'));
});

/* ================================================================
   SCROLL REVEAL
================================================================ */
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ================================================================
   TOAST
================================================================ */
function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => t.classList.remove('show'), 2500);
}

/* ================================================================
   INIT
================================================================ */
document.addEventListener('DOMContentLoaded', () => {
    renderGaleria();
});