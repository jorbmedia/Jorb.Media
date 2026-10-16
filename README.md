# 🎬 JORB.MEDIA — Motion Design & High-Retention Portfolio

High-impact portfolio website for motion designer **Jorge Bustos** (**Jorb.media**), featuring brutalist editorial aesthetics inspired by post-production workflows (*After Effects*, kinetic typography, CRT scanlines, paper grain, and precision speed ramps).

---

## ⚡ Key Highlights

* **Official Branding & Logo**: Integrates Jorge's official geometric **JB / Jorb.media** emblem with transparent PNG assets in both Paper White (`assets/logo-white.png`) and Electric Blue (`assets/logo-blue.png`).
* **Official Contacts**:
  * **WhatsApp / Phone**: `+57 300857325` (pre-configured conversion message)
  * **Email**: `jorbustosvisuals@gmail.com`
* **Bulletproof Video Playback**:
  * Supports native 16:9 widescreen and **9:16 vertical Reels/Shorts** without awkward black bars.
  * Instant **"WATCH ON YOUTUBE ↗"** buttons on each card and inside the player modal.
  * Cross-origin iframe parameters configured for strict compliance.
* **Full English Copy**:
  * Precision-crafted for global creative directors, brands, marketing agencies, and top creators.
* **Local One-Click Server (`start-server.bat`)**:
  * Browsers sometimes restrict YouTube iframes on raw `file:///` protocols. Double-clicking `start-server.bat` runs a lightweight local server on `http://localhost:3000/` and automatically launches your browser so every video plays without restrictions!

---

## 📁 Project Architecture

```
jorb-media/
├── index.html           # Full semantic structure, English copy, project cards
├── start-server.bat     # One-click launcher for local preview with working video embeds
├── server.ps1           # Zero-dependency local preview server
├── assets/
│   ├── logo-white.png   # Transparent emblem for dark navigation & headers
│   ├── logo-blue.png    # Transparent official electric blue logo
│   └── *.jpg            # Originals uploaded by user
├── css/
│   ├── tokens.css       # Brand tokens: #0a192f, #1c64f2, #e2ecff, #f5f7fa
│   ├── reset.css        # Clean baseline reset
│   ├── textures.css     # Grain, paper noise, scanlines, AE keyframes, crop marks
│   ├── components.css   # Navigation, cards, modal, filter tabs, direct buttons
│   └── layout.css       # Responsive grid system
└── js/
    └── main.js          # Lightbox logic, filters, mouse parallax, 60fps timecode
```

---

## 🚀 How to Run & Preview

### Option A: Recommended (Flawless Video Playback)
Double click **`start-server.bat`** inside `jorb-media`.
This starts a lightweight server at `http://localhost:3000/` and automatically opens your browser. All YouTube iframes and modal videos will play smoothly!

### Option B: Direct File Open
You can also open `index.html` directly:
`C:\Users\jorge\.gemini\antigravity\scratch\jorb-media\index.html`
*(Note: If Chrome/Edge blocks video embeds due to local `file:///` restrictions, click the red "YT ↗" / "WATCH ON YOUTUBE" button or use Option A).*

---

## 🌐 Deploy to Web (100% Free in 1 Minute)

1. **Vercel**: Drag and drop the `jorb-media` folder into [vercel.com/new](https://vercel.com/new).
2. **Netlify**: Drag and drop the folder into [app.netlify.com/drop](https://app.netlify.com/drop).
3. **GitHub Pages**: Push this repo to GitHub and enable Pages in repository settings.
