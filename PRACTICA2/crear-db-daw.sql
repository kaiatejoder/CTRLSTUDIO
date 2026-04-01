
CREATE DATABASE IF NOT EXISTS daw
    DEFAULT CHARACTER SET utf8mb4
    DEFAULT COLLATE utf8mb4_general_ci;

USE daw;

-- ============================================================
-- TABLA: usuarios
-- ============================================================
CREATE TABLE usuarios (
    codigo     INTEGER      NOT NULL AUTO_INCREMENT,
    activo     INTEGER      DEFAULT 1,
    admin      INTEGER      DEFAULT 0,
    usuario    VARCHAR(32)  NOT NULL UNIQUE,
    clave      VARCHAR(40)  DEFAULT '',
    nombre     VARCHAR(64)  DEFAULT NULL,
    apellidos  VARCHAR(128) DEFAULT NULL,
    domicilio  VARCHAR(128) DEFAULT NULL,
    poblacion  VARCHAR(64)  DEFAULT NULL,
    provincia  VARCHAR(32)  DEFAULT NULL,
    cp         CHAR(5)      DEFAULT NULL,
    telefono   CHAR(9)      DEFAULT NULL,
    PRIMARY KEY (codigo)
);

-- ============================================================
-- TABLA: categorias
-- ============================================================
CREATE TABLE categorias (
    codigo      INTEGER      NOT NULL AUTO_INCREMENT,
    descripcion VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (codigo)
);

-- ============================================================
-- TABLA: productos
-- ============================================================
CREATE TABLE productos (
    codigo      INTEGER      NOT NULL AUTO_INCREMENT,
    nombre      VARCHAR(64)  DEFAULT NULL,
    descripcion VARCHAR(255) DEFAULT NULL,
    precio      DECIMAL(8,2) DEFAULT 0,
    existencias INTEGER      DEFAULT 0,
    imagen      VARCHAR(255) DEFAULT NULL,
    categoria   INTEGER      NOT NULL,
    PRIMARY KEY (codigo),
    FOREIGN KEY pertenecea(categoria) REFERENCES categorias(codigo)
);

-- ============================================================
-- TABLA: estados  (diccionario: Pendiente, Enviado, Entregado, Cancelado)
-- ============================================================
CREATE TABLE estados (
    codigo      INTEGER     NOT NULL AUTO_INCREMENT,
    descripcion VARCHAR(16) DEFAULT NULL,
    PRIMARY KEY (codigo)
);

-- ============================================================
-- TABLA: pedidos
-- ============================================================
CREATE TABLE pedidos (
    codigo   INTEGER      NOT NULL AUTO_INCREMENT,
    persona  INTEGER      NOT NULL,
    fecha    DATE         DEFAULT (CURRENT_DATE),
    importe  DECIMAL(8,2) DEFAULT 0,
    estado   INTEGER      NOT NULL,
    PRIMARY KEY (codigo),
    FOREIGN KEY pedidopor(persona)  REFERENCES usuarios(codigo),
    FOREIGN KEY enestado(estado)    REFERENCES estados(codigo)
);

-- ============================================================
-- TABLA: detalle
-- ============================================================
CREATE TABLE detalle (
    codigo_pedido   INTEGER      NOT NULL,
    codigo_producto INTEGER      NOT NULL,
    unidades        INTEGER      DEFAULT 1,
    precio_unitario DECIMAL(8,2) DEFAULT 0,
    PRIMARY KEY (codigo_pedido, codigo_producto),
    FOREIGN KEY referentea(codigo_pedido)   REFERENCES pedidos(codigo),
    FOREIGN KEY contiene(codigo_producto)   REFERENCES productos(codigo)
);

-- ============================================================
-- DATOS INICIALES
-- ============================================================

-- Estados de pedido (obligatorio según la práctica)
INSERT INTO estados (descripcion) VALUES
    ('Pendiente'),
    ('Enviado'),
    ('Entregado'),
    ('Cancelado');

-- Categorías de ejemplo
INSERT INTO categorias (descripcion) VALUES
    ('Plantillas & Templates'),    -- codigo 1  (o siguiente disponible)
    ('Identidad Corporativa'),     -- codigo 2
    ('Servicios de Diseño'),       -- codigo 3
    ('Recursos Gráficos');         -- codigo 4


-- Usuario administrador de prueba
-- Clave: "admin123" (en producción usar hash, aquí texto plano para pruebas)
INSERT INTO usuarios (activo, admin, usuario, clave, nombre, apellidos) VALUES
    (1, 1, 'admin', 'admin123', 'Administrador', 'Sistema');

-- Usuario cliente de prueba
-- Clave: "cliente123"
INSERT INTO usuarios (activo, admin, usuario, clave, nombre, apellidos, domicilio, poblacion, provincia, cp, telefono) VALUES
    (1, 0, 'cliente', 'cliente123', 'Juan', 'García López', 'Calle Mayor 1', 'Valencia', 'Valencia', '46001', '600000001');
INSERT INTO productos (nombre, descripcion, precio, existencias, imagen, categoria) VALUES

    ('Pack Plantillas Redes Sociales',
     'Pack de 30 plantillas editables para Instagram, Facebook y LinkedIn. Formato PSD + AI.',
     29.99, 9999, 'plantilla-rrss.jpg', 1),

    ('Plantilla Web Portfolio Creativo',
     'Template HTML/CSS para portfolio de diseñador. Responsive, animaciones CSS3 incluidas.',
     49.99, 9999, 'plantilla-portfolio.jpg', 1),

    ('Plantilla Presentación Corporativa',
     'Plantilla PowerPoint + Keynote de 30 diapositivas estilo minimalista profesional.',
     24.99, 9999, 'plantilla-presentacion.jpg', 1),

    ('Pack CV + Carta Motivación Creativo',
     'Currículum vitae y carta de presentación editables en Illustrator y Word. 3 variantes de color.',
     14.99, 9999, 'plantilla-cv.jpg', 1),

    ('Plantilla Newsletter Email Marketing',
     'Diseño de newsletter responsive compatible con Mailchimp y Brevo. Formato HTML + PSD.',
     19.99, 9999, 'plantilla-newsletter.jpg', 1),

    ('Pack Plantillas Stories Instagram',
     '20 plantillas animadas para Stories de Instagram. Formato After Effects y Canva.',
     34.99, 9999, 'plantilla-stories.jpg', 1);

-- ============================================================
-- PRODUCTOS — Identidad Corporativa  (categoria = 2)
-- ============================================================
INSERT INTO productos (nombre, descripcion, precio, existencias, imagen, categoria) VALUES

    ('Pack Branding Básico',
     'Logotipo vectorial + paleta de colores corporativos + tipografías. Entrega en AI, EPS, PNG y PDF.',
     149.99, 9999, 'branding-basico.jpg', 2),

    ('Pack Branding Completo',
     'Todo el branding básico + papelería corporativa (tarjetas, membrete, sobre) + guía de uso.',
     299.99, 9999, 'branding-completo.jpg', 2),

    ('Guía de Estilo Corporativo',
     'Documento PDF de normas de uso de la marca: colores, tipografías, espaciados y aplicaciones.',
     79.99, 9999, 'guia-estilo.jpg', 2),

    ('Pack Papelería Corporativa Digital',
     'Tarjeta de visita, membrete, sobre y firma de email editables. Formato PSD + AI.',
     59.99, 9999, 'papeleria.jpg', 2),

    ('Rediseño de Logotipo',
     'Modernización de logotipo existente. Incluye 3 propuestas y 2 rondas de revisiones.',
     199.99, 9999, 'rediseno-logo.jpg', 2);

-- ============================================================
-- PRODUCTOS — Servicios de Diseño  (categoria = 3)
-- ============================================================
INSERT INTO productos (nombre, descripcion, precio, existencias, imagen, categoria) VALUES

    ('Diseño de Logotipo Profesional',
     'Creación de logotipo desde cero. 3 conceptos iniciales, revisiones ilimitadas, entrega vectorial.',
     249.99, 9999, 'servicio-logo.jpg', 3),

    ('Diseño Web Landing Page',
     'Diseño UI/UX de página de aterrizaje. Prototipo en Figma + exportación de assets.',
     399.99, 9999, 'servicio-web.jpg', 3),

    ('Diseño de Cartelería y Flyers',
     'Diseño de cartel o flyer publicitario. Formato digital y preparado para imprenta.',
     89.99, 9999, 'servicio-cartel.jpg', 3),

    ('Diseño de Packaging',
     'Diseño de envase o embalaje de producto. Dielines incluidos, mockup 3D de presentación.',
     349.99, 9999, 'servicio-packaging.jpg', 3),

    ('Post y Stories para Redes Sociales',
     'Pack mensual de 16 publicaciones (12 posts + 4 stories) diseñadas para tu marca.',
     129.99, 9999, 'servicio-rrss.jpg', 3),

    ('Diseño de Catálogo de Productos',
     'Maquetación de catálogo en InDesign. Hasta 20 páginas, preparado para imprenta y PDF digital.',
     299.99, 9999, 'servicio-catalogo.jpg', 3);

-- ============================================================
-- PRODUCTOS — Recursos Gráficos  (categoria = 4)
-- ============================================================
INSERT INTO productos (nombre, descripcion, precio, existencias, imagen, categoria) VALUES

    ('Pack 500 Iconos Vectoriales',
     '500 iconos en estilo lineal y sólido. Formatos SVG, PNG y AI. Licencia uso comercial.',
     19.99, 9999, 'recursos-iconos.jpg', 4),

    ('Bundle 50 Mockups Premium',
     'Mockups fotorrealistas de dispositivos, papelería y packaging. Formato PSD con Smart Objects.',
     39.99, 9999, 'recursos-mockups.jpg', 4),

    ('Pack 200 Texturas y Fondos',
     'Texturas de papel, grunge, acuarela y degradados. Alta resolución 4K, formato JPG + PNG.',
     14.99, 9999, 'recursos-texturas.jpg', 4),

    ('Bundle Fuentes Tipográficas Premium',
     'Colección de 25 familias tipográficas con licencia web y print. Formatos OTF y WOFF2.',
     24.99, 9999, 'recursos-fuentes.jpg', 4),

    ('Pack Elementos de Diseño Floral',
     'Ilustraciones botánicas vectoriales para decoración. 150 elementos en AI, EPS y PNG transparente.',
     17.99, 9999, 'recursos-floral.jpg', 4),

    ('Pack Paletas de Color Curadas',
     '100 paletas de color con códigos HEX, RGB y CMYK agrupadas por tendencias 2025. PDF + ASE.',
     9.99, 9999, 'recursos-paletas.jpg', 4);
-- ============================================================
-- Verificación final: listar tablas creadas
-- ============================================================
SHOW TABLES;
