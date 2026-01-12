<p align="center">
  <img src="https://img.shields.io/badge/Created%20by-Owais%20Zakir-blueviolet?style=for-the-badge&labelColor=0d1117" alt="Created by Owais Zakir" />
</p>

<h1 align="center">
  ✨ ECHOES OF LIGHT ✨
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Three.js-r160-000000?style=flat-square&logo=three.js&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/Framer_Motion-11.x-FF0066?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
</p>

<p align="center">
  <strong>🌌 An experimental, Awwwards-level interactive experience where your presence paints the digital canvas with light</strong>
</p>

<p align="center">
  <a href="#-live-demo">Live Demo</a> •
  <a href="#-features">Features</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-interactions">Interactions</a>
</p>

---

## 🎯 About

**ECHOES OF LIGHT** is a concept-level, experimental website that transforms user presence into art. Every cursor movement, scroll, click, and moment of stillness creates unique visual responses—from liquid light trails to particle vortexes, from rippling distortions to aurora-like effects.

This project explores the boundaries between user interface and digital art, creating a mesmerizing experience that feels alive and responds uniquely to each visitor.

> *"Your presence becomes art. Every gesture leaves traces of luminescence."*

---

## ✨ Features

### 🌊 WebGL Shader Effects
- **Liquid Distortion** — Real-time water-like shader that warps the entire page based on cursor movement
- **Chromatic Aberration** — Dynamic RGB splitting that intensifies with movement
- **Ripple Propagation** — Click-triggered waves that expand through the shader

### 🎨 Multi-Layer Visual System
| Layer | Effect | Interaction |
|-------|--------|-------------|
| 0 | Deep Space Gradient | Static ambient |
| 1 | Liquid Metaballs | Mouse attraction |
| 2 | Particle Vortex | Galaxy spiral following cursor |
| 3 | Fluid Wave Lines | Velocity-reactive flow |
| 4 | Aurora Particles | Idle-triggered emergence |
| 5 | Light Trails | Cursor painting |
| 6 | Click Ripples | Tap/click bloom |
| 7 | Liquid Cursor | Multi-layered glow cursor |

### 🖱️ Interaction Modes
- **Movement** — Creates flowing light trails and attracts particles
- **Hover** — Text characters morph and glow individually
- **Click/Tap** — Sends ripples through the visual layers
- **Scroll** — Triggers parallax transformations and wave effects
- **Idle** — Awakens dormant aurora particles

### 🎭 Design Elements
- Organic, grid-free layout philosophy
- Glass morphism cards with depth
- Gradient text animations
- Magnetic interactive buttons
- Ink-reveal scroll animations

---

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/owaiszakir/echoes-of-light.git

# Navigate to project directory
cd echoes-of-light

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🛠️ Tech Stack

### Core Framework
| Technology | Purpose |
|------------|---------|
| **React 18** | UI Component Library |
| **TypeScript** | Type-Safe Development |
| **Vite** | Build Tool & Dev Server |

### Styling & Animation
| Technology | Purpose |
|------------|---------|
| **Tailwind CSS** | Utility-First Styling |
| **Framer Motion** | Declarative Animations |
| **Custom CSS** | Glow Effects & Gradients |

### 3D & WebGL
| Technology | Purpose |
|------------|---------|
| **Three.js** | WebGL Rendering |
| **React Three Fiber** | React Renderer for Three.js |
| **React Three Drei** | Useful Helpers |
| **Custom GLSL Shaders** | Liquid Distortion Effects |

### UI Components
| Technology | Purpose |
|------------|---------|
| **shadcn/ui** | Accessible Components |
| **Radix UI** | Headless Primitives |
| **Lucide React** | Icon System |

---

## 🎮 Interactions

### Mouse/Touch
```
🖱️ Move       → Light trails follow cursor
🖱️ Hover      → Text morphs, buttons attract
🖱️ Click      → Ripples expand outward
🖱️ Fast Move  → Increased trail intensity
```

### Scroll
```
📜 Scroll Down → Parallax transformations
📜 Scroll Up   → Reverse parallax
📜 Into View   → Ink reveal animations
```

### Idle (3+ seconds)
```
⏸️ Stop Moving → Aurora particles emerge
⏸️ Stay Still  → Ambient light breathing
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── AuroraParticles.tsx      # Idle-triggered floating particles
│   ├── BackgroundAurora.tsx     # Ambient background effects
│   ├── FluidDistortion.tsx      # Canvas-based wave lines
│   ├── FloatingElement.tsx      # Generic float animation wrapper
│   ├── GlitchText.tsx          # Subtle text glitch effect
│   ├── GlowingText.tsx         # Stroke-reveal text animation
│   ├── InkReveal.tsx           # Scroll-triggered ink wash reveal
│   ├── LightTrailCanvas.tsx    # Cursor light trail painter
│   ├── LiquidBlobs.tsx         # Organic metaball shapes
│   ├── LiquidCursor.tsx        # Multi-layered custom cursor
│   ├── MagneticButton.tsx      # Cursor-attracted buttons
│   ├── MorphingText.tsx        # Character-level hover effects
│   ├── ParticleVortex.tsx      # Galaxy spiral particles
│   ├── RippleEffect.tsx        # Click bloom effect
│   ├── ScrollWaves.tsx         # Scroll-driven light waves
│   └── WebGLDistortion.tsx     # Shader-based liquid distortion
├── hooks/
│   ├── useMousePosition.ts     # Global mouse tracking
│   └── useIdle.ts             # Idle state detection
├── pages/
│   └── Index.tsx              # Main experience page
└── index.css                  # Design tokens & global styles
```

---

## 🎨 Color Palette

| Color | HSL | Usage |
|-------|-----|-------|
| Midnight Deep | `hsl(250, 40%, 4%)` | Background base |
| Glow Teal | `hsl(170, 70%, 55%)` | Primary accents |
| Glow Rose | `hsl(340, 80%, 70%)` | Secondary accents |
| Glow Violet | `hsl(270, 60%, 60%)` | Tertiary accents |
| Aurora Gold | `hsl(45, 90%, 65%)` | Highlight accents |

---

## 🌟 Inspiration

This project draws inspiration from:
- Bioluminescent ocean phenomena
- Aurora Borealis light shows
- Liquid light art installations
- Award-winning experimental websites on Awwwards & FWA

---

## 📜 License

MIT License — feel free to use, modify, and distribute.

---

<p align="center">
  <strong>Created with 💜 by Owais Zakir</strong>
</p>

<p align="center">
  <em>An experiment in presence • 2024</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Made%20with-Lovable-FF69B4?style=for-the-badge" alt="Made with Lovable" />
</p>
