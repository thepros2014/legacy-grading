# Legacy Grading (LCG) - AI Coin Grading & Certified Numismatic Registry

> **The Next Generation of Numismatic Verification & Instant AI Assessment.**

🌐 **Live Vercel Review Site**: [https://legacy-grading.vercel.app](https://legacy-grading.vercel.app)  
📦 **GitHub Repository**: [https://github.com/thepros2014/legacy-grading](https://github.com/thepros2014/legacy-grading)

Legacy Grading combines cutting-edge computer vision with museum-grade physical encapsulation. Graders and collectors can perform instantaneous Sheldon 70-point assessments directly from their mobile camera live feed, view tamper-proof digital certificates, and explore a public registry tracking both onsite vault slabs and mobile AI quick-grades.

---

## 🌟 Key Features

### 1. 📱 Live Mobile Camera AI QuickGrade
- **Real-Time Video Feed**: Direct mobile & webcam camera integration (`navigator.mediaDevices.getUserMedia`).
- **Holographic Neural HUD**: Canvas-based real-time circular alignment reticle, rotating compass indicators, corner targeting brackets, and vertical scanning laser beam.
- **Live Optical Telemetry**: Real-time readouts of surface luster %, planchet edge alignment %, and strike sharpness.
- **Multiple Modes**:
  - Live Mobile Camera with instant front/rear lens switching.
  - Calibrated Studio Specimens (1881-S Morgan Dollar, 1907 $20 Double Eagle, 1921 Peace Dollar, 1909-S VDB Lincoln Cent).
  - High-resolution user image upload for gallery testing.
- **Multi-Stage AI Pipeline Simulation**:
  1. Optical plane calibration & rim denticle alignment
  2. Photogrammetric luster & cartwheel index mapping
  3. High-point wear classification
  4. Sheldon 70-point grade synthesis + live market valuation
- **Sound Synthesis**: Realistic numismatic sounds (camera shutter, laser radar sweep, grade fanfare, coin clink) powered by the Web Audio API without external audio files.

### 2. 🏛️ Public Registry & Verified Database
- **Comprehensive Catalog**: Showcases both **Onsite Vault Certified Slabs** (sonic-sealed acrylic holders) and **Mobile AI QuickGrades** (mobile camera assessments).
- **Interactive 3D Tilt Slabs**: Real-time perspective transforms and specular glare overlays responding to mouse and touch movement.
- **Obverse / Reverse Flip**: Toggle to inspect both sides of each coin.
- **Search & Filtering**:
  - Live search by Certificate Number (e.g., `LCG-08174563`), Coin Name, Year, or Submitter.
  - Filter pills: All, 🏛️ Onsite Slabs, 📱 Mobile QuickGrades.
  - Category filters: Silver Dollars, Gold $20, Half Dollars, Small Cents.
  - Grade filters: Gem Mint State (65-70), Mint State (60-64), AU (50-58), Circulated (<50).
  - Live sorting: Newest, Grade High-to-Low, Market Value, Year.
- **Instant Cert Verification**: Header verification search bar for instant certificate validation.

### 3. 🔍 Slab Inspector & 3.2x Optical Loupe Zoom
- **Deep Zoom Loupe**: Inspect micro die-flow lines, mint luster frost, and contact bagmarks with a 3.2x tracking loupe magnifier.
- **Subgrade Diagnostics**: Full metric bars for Strike Sharpness, Luster Luminescence, Surfaces & Bagmarks, and Eye Appeal.
- **Cryptographic Provenance**: SHA-256 verification hash, tamper-proof hardware status, and exportable/printable pedigree certificate.

### 4. ⚖️ Onsite vs Mobile Comparison & Submission Portal
- Side-by-side comparison of **Free Instant Mobile AI** vs **$35 Onsite Vault Master Slabs**.
- Interactive fee and turnaround calculator with add-ons (TrueView photography, holographic pedigree labels).

---

## 🛠️ Tech Stack

- **Markup**: Semantic HTML5 with modern OpenGraph and SEO tags
- **Styling**: Vanilla CSS (Custom properties, dark luxury gold/obsidian design system, glassmorphism, 3D CSS transforms)
- **Logic**: Modern Vanilla JavaScript (ES6+ modular architecture)
- **Hardware Integration**: WebRTC `getUserMedia`, HTML5 Canvas 2D, Web Audio API
- **Persistence**: LocalStorage with automatic seed merging

---

## 🚀 Getting Started

To run locally:
```bash
# Using Python
python -m http.server 8085

# Or using Node
npx serve .
```

Open `http://localhost:8085` in any modern web browser or mobile phone on the local network.
