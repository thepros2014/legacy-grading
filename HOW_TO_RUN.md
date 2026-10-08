# 🪙 How to Run the Legacy Grading Website at Home

Welcome to **Legacy Grading**! This guide explains how to launch and run the website on your home computer, as well as how to open and test the **Live Mobile Camera AI Scanner** directly on your iPhone or Android smartphone.

---

## 🌐 Instant Review (No Setup Required)

Open the live cloud version directly on any computer, tablet, or smartphone:
👉 **[https://legacy-grading.vercel.app](https://legacy-grading.vercel.app)**

Because this link is secured with HTTPS, your smartphone's camera will work immediately with full hardware acceleration!

---

## ⚡ Method 1: One-Click Launch (Easiest for Windows)

1. Open your project folder: `legacy Grading`
2. **Double-click** the file named:
   ```
   start_website.bat
   ```
3. A terminal window will open, and your web browser will automatically open to:
   ```
   http://localhost:8085
   ```
4. **Keep that terminal window open** while browsing. When you are done, simply close the window.

---

## 💻 Method 2: Manual Launch from Terminal / PowerShell

If you prefer to start the server yourself:

1. Open **Command Prompt** or **PowerShell** in the project folder.
2. Run **either** of the following commands:

   **Using Python (Recommended):**
   ```bash
   python -m http.server 8085
   ```

   **Or using Node.js:**
   ```bash
   npx serve -l 8085 .
   ```

3. Open your browser and navigate to:
   👉 **`http://localhost:8085`**

---

## 📱 How to Run and Test on Your Mobile Phone (Live Camera Feed)

To test the **AI QuickGrade camera scanner** with your real phone camera at home:

### Step 1: Connect to the Same Wi-Fi
Ensure your smartphone (iPhone or Android) is connected to the **same home Wi-Fi network** as your computer.

### Step 2: Find Your Computer's Local IP Address
- The launcher script `start_website.bat` will display your local IP automatically.
- Alternatively, open PowerShell and type `ipconfig`. Look for **IPv4 Address** (for example: `192.168.0.238`).

### Step 3: Open the URL on Your Phone's Browser
Open **Safari** (iPhone) or **Chrome** (Android) and type:
```
http://<YOUR-COMPUTER-IP>:8085
```
*(Example: `http://192.168.0.238:8085`)*

### Step 4: Allow Camera Permissions
1. Scroll down to the **Mobile AI QuickGrade** section or tap **⚡ QuickGrade** in the header.
2. When prompted by your phone browser, tap **"Allow"** to grant camera access.
3. Tap **"Switch Lens"** to toggle between the rear and front camera.
4. Align a coin inside the holographic targeting circle and tap **"QuickGrade with AI"**!

---

## 🔍 Features to Explore

- **⚡ Mobile AI QuickGrade**:
  - Live optical feed with real-time luster and alignment telemetry.
  - If you don't have a coin in front of you, switch to **"Test Specimen"** mode to grade calibrated historic coins (Morgan Dollar, Saint-Gaudens Double Eagle, Peace Dollar, Lincoln Cent).
  - Tap **"Add to Public Registry Database"** to permanently record your graded coin.
- **🏛️ Public Registry Catalog**:
  - Browse both **🏛️ Onsite Vault Slabs** and **📱 Mobile AI QuickGrades**.
  - Tap **"Reverse" / "Obverse"** on any card to flip the coin.
  - Move your mouse or tilt your phone to see realistic 3D holographic sheen reflections.
  - Filter by grade tier, denomination, metal, or search by certificate number.
- **🔍 3.2x Optical Loupe Zoom Inspector**:
  - Click **"Inspect Slab & Cert"** on any coin card.
  - Hover or touch the coin surface to activate the round 3.2x optical magnifying glass to inspect die flow lines and bagmarks.
  - View full subgrade bars (Strike, Luster, Surfaces, Eye Appeal) and tamper-proof cryptographic hashes.
- **🪙 Fee & Turnaround Estimator**:
  - Scroll to the **"Two Paths to Provenance"** section to calculate submission fees for mobile scans vs physical acrylic slabs.

---

## ❓ Frequently Asked Questions & Troubleshooting

### Q: The camera feed shows a black screen or permission error?
- Modern mobile browsers require granting camera permission. In Safari or Chrome, check **Site Settings** and ensure **Camera** is set to **Allow**.
- If camera access is blocked by browser security (since `http://` on local IP may restrict camera on some iOS versions), use the built-in **"Test Specimen"** or **"Upload Photo"** tabs to test the exact same AI grading pipeline!

### Q: How do I verify a certificate number?
- In the top navigation bar, type any Cert Number (e.g. `LCG-08174563` or `LCG-AI-4491028`) into the **"Verify Cert #"** box and click **Verify**. It will instantly open the official slab inspection view.

### Q: How do I turn the sound effects on or off?
- Click the **🔊 SFX Active** button in the header bar to mute or unmute the synthesizer audio.
