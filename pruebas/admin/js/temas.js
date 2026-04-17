const TEMAS = {
    ctrl:    { label: 'CTRL Dark',  class: '' },
    morphex: { label: 'Morphex',    class: 'theme-morphex' },
    void:    { label: 'Void',       class: 'theme-void' }
};

let temaActual = localStorage.getItem('ctrl_admin_theme') || 'ctrl';

function applyTheme(tema) {
    Object.values(TEMAS).forEach(t => {
        if (t.class) document.documentElement.classList.remove(t.class);
    });
    if (TEMAS[tema] && TEMAS[tema].class) {
        document.documentElement.classList.add(TEMAS[tema].class);
    }
}

function selectTheme(tema) {
    temaActual = tema;
    applyTheme(tema);
    localStorage.setItem('ctrl_admin_theme', tema);

    document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('active'));
    const card = document.getElementById('card-' + tema);
    if (card) card.classList.add('active');

    showToast('✓ Tema "' + TEMAS[tema].label + '" aplicado');
}

function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(t => t.style.display = 'none');
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    
    const tab = document.getElementById('tab-' + tabName);
    if (tab) tab.style.display = 'block';
    
    const btn = document.querySelector('[onclick="switchTab(\'' + tabName + '\')"]');
    if (btn) btn.classList.add('active');
}

function showToast(msg) {
    const t = document.getElementById('theme-toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => t.classList.remove('show'), 2600);
}

// Mostrar fecha
document.getElementById("fecha-hoy").textContent = new Date().toLocaleDateString("es-ES", {day:"2-digit", month:"long", year:"numeric"});

// Proteger página
if (sessionStorage.getItem("ctrl_admin") !== "true") {
    window.location.href = "index.html";
}

// Inicializar tema guardado
document.addEventListener('DOMContentLoaded', () => {
    applyTheme(temaActual);
    const activeCard = document.getElementById('card-' + temaActual);
    if (activeCard) activeCard.classList.add('active');
});