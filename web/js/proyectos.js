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
        nombre: 'Alonso Arquitectos',
        cat: 'Identidad de Marca',
        anyo: 2025,
        desc: 'Identidad completa para estudio de arquitectura en Valencia. Logo, papelería, redes y web.',
        img: null,
        color: '#0d0c1a'
    },
    {
        id: 2,
        nombre: 'Kit Social Media',
        cat: 'Social Media',
        anyo: 2025,
        desc: 'Pack de plantillas para Instagram y LinkedIn. 24 piezas adaptadas a la identidad del cliente.',
        img: null,
        color: '#a50136'
    },
    {
        id: 3,
        nombre: 'Branding Cafetería',
        cat: 'Branding',
        anyo: 2024,
        desc: 'Naming, logo, packaging y señalética para cafetería de especialidad.',
        img: null,
        color: '#4e5174'
    },
    {
        id: 4,
        nombre: 'Web CTRL Studio',
        cat: 'Web Design',
        anyo: 2025,
        desc: 'Diseño y desarrollo de la web corporativa de CTRL Studio. HTML, CSS, Bootstrap.',
        img: null,
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
        <div class="proyecto-card reveal" data-id="${p.id}" onclick="abrirEditar(${p.id})">
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
   MODAL — AÑADIR / EDITAR
================================================================ */
let colorSeleccionado = '#e0dbd0';
let imagenBase64 = null;

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
    imagenBase64 = null;
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

    // Imagen
    imagenBase64 = p.img || null;
    const preview = document.getElementById('p-preview');
    if (p.img) { preview.src = p.img; preview.style.display = 'block'; }
    else { preview.style.display = 'none'; }

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
        img:    imagenBase64,
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
        imagenBase64 = e.target.result;
        const img = document.getElementById('p-preview');
        img.src = imagenBase64;
        img.style.display = 'block';
    };
    reader.readAsDataURL(file);
}

/* ── Seleccionar color ── */
function selectColor(el) {
    document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('selected'));
    el.classList.add('selected');
    colorSeleccionado = el.dataset.color;
}

/* ── Drag & drop en upload zone ── */
const uploadZone = document.getElementById('upload-zone');
if (uploadZone) {
    ['dragenter','dragover'].forEach(ev => uploadZone.addEventListener(ev, e => {
        e.preventDefault(); uploadZone.classList.add('drag-over');
    }));
    ['dragleave','drop'].forEach(ev => uploadZone.addEventListener(ev, e => {
        e.preventDefault(); uploadZone.classList.remove('drag-over');
        if (ev === 'drop' && e.dataTransfer.files[0]) {
            document.getElementById('p-imagen').files = e.dataTransfer.files;
            previewImagen(document.getElementById('p-imagen'));
        }
    }));
}

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