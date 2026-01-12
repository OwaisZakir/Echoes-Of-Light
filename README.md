<p align="center">
  <img src="https://img.shields.io/badge/Created%20by-Owais%20Zakir-blueviolet?style=for-the-badge&labelColor=0d1117" alt="Created by Owais Zakir" />
</p>

<h1 align="center">
  ✨ ECHOES OF LIGHT ✨
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Framer_Motion-11.x-FF0066?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Canvas_API-Optimized-FF6B6B?style=flat-square" alt="Canvas API" />
</p>

<p align="center">
  <strong>🌌 An Awwwards-level interactive experience where your presence paints the digital canvas with light</strong>
</p>

<p align="center">
  <a href="https://the-echoes-of-light.vercel.app/-live-demo">Live Demo</a> •
  <a href="#-features">Features</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-performance">Performance</a>
</p>

---

## 🎯 About

**ECHOES OF LIGHT** is an experimental, concept-level website that transforms user presence into art. Every cursor movement, scroll, click, and moment of stillness creates unique visual responses—from liquid light trails to particle vortexes, from rippling distortions to aurora-like effects.

This project explores the boundaries between user interface and digital art, creating a mesmerizing experience that feels alive and responds uniquely to each visitor.

> _"Your presence becomes art. Every gesture leaves traces of luminescence."_

**Created by Owais Zakir** | © 2024-Present

---

## ✨ Features

### 🎨 Multi-Layer Visual System (Optimized)

| Layer | Effect              | Interaction                    |
| ----- | ------------------- | ------------------------------ |
| 0     | Deep Space Gradient | Ambient backdrop               |
| 1     | Liquid Glow Effect  | Mouse-following glow           |
| 2     | Liquid Metaballs    | Organic blob attraction        |
| 3     | Particle Vortex     | Galaxy spiral following cursor |
| 4     | Fluid Wave Lines    | Velocity-reactive flow         |
| 5     | Aurora Particles    | Idle-triggered emergence       |
| 6     | Light Trails        | Cursor painting                |
| 7     | Click Ripples       | Tap/click bloom                |
| 8     | Liquid Cursor       | Multi-layered glow cursor      |

### 🖱️ Interaction Modes

- **Movement** — Creates flowing light trails and attracts particles
- **Hover** — Text characters morph and glow individually
- **Click/Tap** — Sends ripples through the visual layers
- **Scroll** — Triggers parallax transformations and wave effects
- **Idle** — Awakens dormant aurora particles

### ⚡ Performance Optimized

- **No WebGL dependencies** — Pure Canvas 2D API for maximum compatibility
- **Throttled animations** — 24-30fps target for smooth experience without battery drain
- **Device pixel ratio optimization** — Capped at 1.5x for performance
- **Memoized components** — React.memo for all canvas components
- **Passive event listeners** — Non-blocking mouse tracking

### 🔍 Full SEO Implementation

- Semantic HTML5 structure with proper landmarks
- Dynamic meta tags with react-helmet-async
- JSON-LD structured data
- Open Graph & Twitter Card meta
- Accessible ARIA labels
- Dynamic year in copyright

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

# Build for production
npm run build
```

---

## 🛠️ Tech Stack

### Core Framework

| Technology     | Version | Purpose                 |
| -------------- | ------- | ----------------------- |
| **React**      | 18.3.1  | UI Component Library    |
| **TypeScript** | 5.x     | Type-Safe Development   |
| **Vite**       | 5.x     | Build Tool & Dev Server |

### Styling & Animation

| Technology        | Purpose                   |
| ----------------- | ------------------------- |
| **Tailwind CSS**  | Utility-First Styling     |
| **Framer Motion** | Declarative Animations    |
| **Canvas 2D API** | High-Performance Graphics |
| **Custom CSS**    | Glow Effects & Gradients  |

### Performance & SEO

| Technology                | Purpose                  |
| ------------------------- | ------------------------ |
| **react-helmet-async**    | Dynamic Meta Tags        |
| **React.memo**            | Component Memoization    |
| **requestAnimationFrame** | Optimized Animation Loop |

### UI Components

| Technology       | Purpose               |
| ---------------- | --------------------- |
| **shadcn/ui**    | Accessible Components |
| **Radix UI**     | Headless Primitives   |
| **Lucide React** | Icon System           |

---

## ⚡ Performance

### Optimization Techniques Used

```
✅ Canvas 2D instead of WebGL — Better compatibility, no shader overhead
✅ Throttled to 24-30fps — Smooth visuals without battery drain
✅ Device Pixel Ratio capped at 1.5x — Prevents excessive canvas size
✅ Passive event listeners — Non-blocking scroll & mouse events
✅ React.memo on all canvas components — Prevents unnecessary re-renders
✅ useCallback for event handlers — Stable function references
✅ useMemo for static data — Prevents recalculation
✅ Reduced particle counts — Fewer objects, same visual impact
```

### Lighthouse Scores Target

| Metric         | Target |
| -------------- | ------ |
| Performance    | 90+    |
| Accessibility  | 100    |
| Best Practices | 100    |
| SEO            | 100    |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── AuroraParticles.tsx      # Idle-triggered floating particles
│   ├── BackgroundAurora.tsx     # Ambient background effects
│   ├── FluidDistortion.tsx      # Canvas-based wave lines (optimized)
│   ├── FloatingElement.tsx      # Generic float animation wrapper
│   ├── GlitchText.tsx           # Subtle text glitch effect
│   ├── GlowingText.tsx          # Stroke-reveal text animation
│   ├── InkReveal.tsx            # Scroll-triggered ink wash reveal
│   ├── LightTrailCanvas.tsx     # Cursor light trail painter
│   ├── LiquidBlobs.tsx          # Organic metaball shapes (optimized)
│   ├── LiquidCursor.tsx         # Multi-layered custom cursor
│   ├── MagneticButton.tsx       # Cursor-attracted buttons
│   ├── MorphingText.tsx         # Character-level hover effects
│   ├── ParticleVortex.tsx       # Galaxy spiral particles (optimized)
│   ├── RippleEffect.tsx         # Click bloom effect
│   ├── ScrollWaves.tsx          # Scroll-driven light waves
│   └── WebGLDistortion.tsx      # Lightweight liquid glow (optimized)
├── hooks/
│   ├── useMousePosition.ts      # Global mouse tracking
│   └── useIdle.ts               # Idle state detection
├── pages/
│   └── Index.tsx                # Main experience page (SEO optimized)
└── index.css                    # Design tokens & global styles
```

---

## 🎨 Color Palette

| Color         | HSL                  | Usage             |
| ------------- | -------------------- | ----------------- |
| Midnight Deep | `hsl(250, 40%, 4%)`  | Background base   |
| Glow Teal     | `hsl(170, 70%, 55%)` | Primary accents   |
| Glow Rose     | `hsl(340, 80%, 70%)` | Secondary accents |
| Glow Violet   | `hsl(270, 60%, 60%)` | Tertiary accents  |
| Aurora Gold   | `hsl(45, 90%, 65%)`  | Highlight accents |

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
  <em>An experiment in presence • Dynamic Year: Auto-updated</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Made%20with-Eren%20Jeager-FF69B4?style=for-the-badge" alt="Made with Eren Jeager" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Made%20with-Shaikh%20Muhammad%20Raheem-FF69B4?style=for-the-badge" alt="Made with Shaikh Muhammad Raheem" />
</p>
