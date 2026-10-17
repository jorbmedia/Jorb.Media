# 🎬 JORB.MEDIA — Portfolio de Motion Design & Edición de Video

Portfolio profesional y minimalista de **Jorge Bustos** (**Jorb.media**), diseñado bajo una estética ligera, clara y efectiva inspirada en Apple, orientado a agencias, empresas, startups y marcas.

---

## ✨ Características Principales

* **Fondo Claro y Espacioso**: Diseñado sobre `--bg: #FBFBFD` con superficies limpias, líneas finas y sombras suaves.
* **Tipografía Satoshi**: Jerarquía tipográfica limpia y directa (peso 600 para títulos, peso 400 para cuerpo).
* **Hero Directo y Breve**: Presentación concisa de Jorge Bustos como motion designer y editor de video, con la mención a *Jeremías 29:11* y acceso directo a proyectos y contacto.
* **4 Proyectos Destacados**:
  1. *The AI Room* (VSL comercial en 16:9).
  2. *Academia Entrenadores Online* (Estudio de tendencias 2026, formato documental).
  3. *Crash Captain · Clon Podcast* (Short vertical 9:16 de alta retención para móviles y SaaS).
  4. *Ferrer Law Firm* (Estrategia y autoridad de marca en formato comercial).
* **Proceso Simple en 3 Pasos**:
  - `01. Dirección y estructura`
  - `02. Motion y diseño`
  - `03. Edición y entrega`
* **Contactos Directos**: WhatsApp, Instagram (@jorb.media) y correo electrónico.

---

## 📁 Arquitectura del Proyecto

```
jorb-media/
├── index.html           # Estructura semántica, limpia y efectiva
├── start-server.bat     # Servidor local en 1 clic (http://localhost:3000)
├── server.ps1           # Script servidor de previsualización sin dependencias
├── assets/
│   ├── logo-dark.png    # Imagotipo oscuro transparente para fondo claro
│   ├── logo-blue.png    # Imagotipo azul de marca transparente
│   └── logo-white.png   # Versión blanca de respaldo
├── css/
│   ├── tokens.css       # Variables de diseño (colores, Satoshi, curvas de easing, radios)
│   ├── reset.css        # Reseteo moderno con soporte para prefers-reduced-motion
│   ├── textures.css     # Líneas sutiles y divisores
│   ├── layout.css       # Grillas, espaciados y contenedor de 1100px
│   └── components.css   # Navegación, tarjetas de trabajo, pills de contacto y modal
└── js/
    └── main.js          # Reveal al scroll, lightbox responsivo para 16:9 y 9:16
```

---

## 🚀 Cómo Probar en Local

### Opción A: Servidor Local (Recomendado)
Haz doble clic en **`start-server.bat`** dentro de la carpeta `jorb-media`.
Abrirá automáticamente tu navegador en `http://localhost:3000/`.

### Opción B: Archivo Directo
Abre directamente `index.html` en tu navegador:
`C:\Users\jorge\.gemini\antigravity\scratch\jorb-media\index.html`
