/* ================================================================
   CTRL STUDIO — user-theme.js
   Sistema de temas y texturas para el perfil de usuario.
   Persiste en localStorage bajo la clave "ctrl_user_theme".
   ================================================================ */

(function () {

  /* ── PALETA PRINCIPAL ── */
  const ACENTOS = {
    burgundy: { label: 'Burgundy',  hex: '#a50136', dark: '#710632' },
    lavanda:  { label: 'Lavanda',   hex: '#989fcb', dark: '#4e5174' },
    blanco:   { label: 'Blanco',    hex: '#f0effa', dark: '#c0bfe8' },
    negro:    { label: 'Negro',     hex: '#1a1a2e', dark: '#0d0c1a' },
  };

  /* ── TEMAS BASE ── */
  const TEMAS = {
    ctrl:    { label: 'CTRL Dark',  bg: '#0d0c1a', txt: '#f0effa', frost: 'rgba(255,255,255,0.05)' },
    morphex: { label: 'Morphex',    bg: '#f5f0e8', txt: '#1a1a1a', frost: 'rgba(255,255,255,0.65)' },
    void:    { label: 'Void',       bg: '#080808', txt: '#f2f2f2', frost: 'rgba(255,255,255,0.03)' },
  };

  /* ── TEXTURAS ──
     Coloca tus archivos en  web/img/textures/
     Tamaño recomendado: 512×512 px, modo tile (seamless).
     Formatos admitidos: PNG, JPG, WEBP.
  ── */
  const TEXTURAS = {
    none:     { label: 'Ninguna',  file: null },
    grain:    { label: 'Grain',    file: 'img/textures/grain.png' },
    noise:    { label: 'Noise',    file: 'img/textures/noise.png' },
    paper:    { label: 'Paper',    file: 'img/textures/paper.jpg' },
    lunar:    { label: 'Lunar',    file: 'img/textures/lunar.jpg' },
    plastic:  { label: 'Plastic',  file: 'img/textures/plastic.jpg' },
  };

  /* ── DEFAULTS ── */
  const DEFAULTS = { tema: 'ctrl', acento: 'burgundy', textura: 'none' };

  /* ── LEER / GUARDAR ── */
  function load() {
    try { return Object.assign({}, DEFAULTS, JSON.parse(localStorage.getItem('ctrl_user_theme') || '{}')); }
    catch (_) { return Object.assign({}, DEFAULTS); }
  }

  function save(cfg) {
    localStorage.setItem('ctrl_user_theme', JSON.stringify(cfg));
  }

  /* ── DETECTAR SI UN TEMA ES CLARO U OSCURO ── */
  function detectMode(hexBg) {
    // Convertir hex a RGB y calcular luminancia
    const hex = hexBg.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? 'light' : 'dark';
  }

  /* ── APLICAR al DOM ── */
  function apply(cfg) {
    const root = document.documentElement;
    const tema = TEMAS[cfg.tema]    || TEMAS.ctrl;
    const acc  = ACENTOS[cfg.acento] || ACENTOS.burgundy;
    const tex  = TEXTURAS[cfg.textura] || TEXTURAS.none;
    
    /* Detectar automáticamente el modo según el tema */
    const autoMode = detectMode(tema.bg);

    /* Clases de tema en <html> */
    root.classList.remove('ut-ctrl', 'ut-morphex', 'ut-void');
    root.classList.add('ut-' + cfg.tema);
    root.classList.remove('ut-light', 'ut-dark');
    root.classList.add('ut-' + autoMode);

    /* Para modo claro: fondo claro con texto oscuro */
    let bgColor, txtColor, frostColor, frostBorder, txtMuted, txtDim, frostHover;
    
    if (autoMode === 'light') {
      bgColor = tema.bg;
      txtColor = '#1a1a1a';
      frostColor = 'rgba(0,0,0,0.04)';
      frostBorder = 'rgba(0,0,0,0.12)';
      txtMuted = 'rgba(26,26,26,0.55)';
      txtDim = 'rgba(26,26,26,0.3)';
      frostHover = 'rgba(0,0,0,0.07)';
    } else {
      bgColor = tema.bg;
      txtColor = '#f0effa';
      frostColor = 'rgba(255,255,255,0.05)';
      frostBorder = 'rgba(255,255,255,0.09)';
      txtMuted = 'rgba(240,239,250,0.5)';
      txtDim = 'rgba(240,239,250,0.22)';
      frostHover = 'rgba(255,255,255,0.075)';
    }

    /* Variables CSS en :root */
    root.style.setProperty('--ut-bg',          bgColor);
    root.style.setProperty('--ut-txt',         txtColor);
    root.style.setProperty('--ut-frost',       frostColor);
    root.style.setProperty('--ut-frost-hover', frostHover);
    root.style.setProperty('--ut-frost-border', frostBorder);
    root.style.setProperty('--ut-txt-muted',   txtMuted);
    root.style.setProperty('--ut-txt-dim',     txtDim);
    root.style.setProperty('--ut-acento',      acc.hex);
    root.style.setProperty('--ut-acento-dark', acc.dark);
    
    /* Force reflow para asegurar que se aplica */
    void root.offsetHeight;

    /* ── TEXTURA ──
       Se crea/actualiza siempre después de que el body exista.
       Si apply() se llama desde <head> (antes del body), lo difiere
       al DOMContentLoaded; si se llama después (interacción del usuario)
       lo aplica directamente. */
    function applyTexture() {
      let el = document.getElementById('ut-texture-layer');
      if (!el) {
        el = document.createElement('div');
        el.id = 'ut-texture-layer';
        el.style.cssText = [
          'position:fixed', 'inset:0', 'z-index:1', 'pointer-events:none',
          'background-repeat:repeat', 'background-size:256px 256px',
          'transition:background-image 0.3s, opacity 0.3s'
        ].join(';');
        document.body.prepend(el);
      }
      if (tex.file) {
        el.style.backgroundImage = "url('" + tex.file + "')";
        el.style.opacity         = '0.12';
        el.style.mixBlendMode    = 'overlay';
      } else {
        el.style.backgroundImage = 'none';
        el.style.opacity         = '0';
      }
      document.body.style.backgroundColor = tema.bg;
    }

    if (document.body) {
      applyTexture();
    } else {
      document.addEventListener('DOMContentLoaded', applyTexture);
    }
  }

  /* ── API PÚBLICA ── */
  window.UserTheme = {
    TEMAS, ACENTOS, TEXTURAS,
    load, save, apply,
    get()          { return load(); },
    set(partial)   { const cfg = Object.assign(load(), partial); save(cfg); apply(cfg); return cfg; },
    reset()        { save(DEFAULTS); apply(DEFAULTS); return DEFAULTS; }
  };

  /* Auto-aplicar al cargar el script */
  apply(load());

})();
