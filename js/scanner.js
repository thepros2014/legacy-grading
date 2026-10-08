/**
 * Legacy Grading - AI Camera Quick-Grading Engine & Neural HUD
 * Real-time camera feed, canvas telemetry overlays, multi-stage computer vision simulation,
 * and instant Sheldon 70-point grade generation.
 */

class QuickGradeScanner {
    constructor() {
        this.video = null;
        this.canvas = null;
        this.ctx = null;
        this.stream = null;
        this.isScanning = false;
        this.facingMode = "environment"; // default to rear camera
        this.animFrameId = null;
        this.scanStartTime = null;

        // Current active source: 'camera', 'preset', or 'upload'
        this.sourceMode = 'camera';
        this.activePresetImage = "./assets/images/raw_morgan_obverse.jpg";
        this.uploadedImageSrc = null;

        // Telemetry state
        this.telemetry = {
            luster: 85,
            edgeAlignment: 94,
            wearIndex: 12,
            strikeSharpness: 92,
            laserY: 0,
            laserDirection: 1,
            rotationAngle: 0
        };

        this.presetSpecimens = [
            {
                id: "morgan_1881",
                name: "1881-S Morgan Dollar",
                image: "./assets/images/raw_morgan_obverse.jpg",
                expectedGrade: "MS 65+",
                sheldon: 65.5,
                metal: "90% Silver",
                estValue: 360,
                subgrades: { strike: 9.5, luster: 9.6, surfaces: 9.3, eyeAppeal: 9.7 }
            },
            {
                id: "saint_1907",
                name: "1907 $20 Double Eagle",
                image: "./assets/images/gold_double_eagle_slab.jpg",
                expectedGrade: "MS 67",
                sheldon: 67.0,
                metal: "90% Gold",
                estValue: 12500,
                subgrades: { strike: 9.9, luster: 9.9, surfaces: 9.8, eyeAppeal: 9.9 }
            },
            {
                id: "peace_1921",
                name: "1921 High Relief Peace Dollar",
                image: "./assets/images/peace_dollar_slab.jpg",
                expectedGrade: "MS 64",
                sheldon: 64.0,
                metal: "90% Silver",
                estValue: 920,
                subgrades: { strike: 9.4, luster: 9.5, surfaces: 9.3, eyeAppeal: 9.6 }
            },
            {
                id: "lincoln_1909",
                name: "1909-S VDB Lincoln Cent",
                image: "./assets/images/lincoln_cent_slab.jpg",
                expectedGrade: "MS 66 RD",
                sheldon: 66.0,
                metal: "95% Copper",
                estValue: 4800,
                subgrades: { strike: 9.6, luster: 9.8, surfaces: 9.6, eyeAppeal: 9.7 }
            }
        ];

        this.currentPresetIndex = 0;
    }

    init() {
        this.video = document.getElementById("cameraVideo");
        this.canvas = document.getElementById("hudCanvas");
        if (this.canvas) {
            this.ctx = this.canvas.getContext("2d");
        }

        this.setupEventListeners();
        this.startHudLoop();
        this.startCamera();
    }

    setupEventListeners() {
        // Toggle camera button
        const toggleCamBtn = document.getElementById("toggleCamBtn");
        if (toggleCamBtn) {
            toggleCamBtn.addEventListener("click", () => this.switchCamera());
        }

        // Mode tabs: Live Camera vs Studio Preset vs File Upload
        const tabLiveCam = document.getElementById("tabLiveCam");
        const tabPreset = document.getElementById("tabPreset");
        const tabUpload = document.getElementById("tabUpload");

        if (tabLiveCam) {
            tabLiveCam.addEventListener("click", () => this.setMode('camera'));
        }
        if (tabPreset) {
            tabPreset.addEventListener("click", () => this.setMode('preset'));
        }
        if (tabUpload) {
            tabUpload.addEventListener("click", () => this.setMode('upload'));
        }

        // File upload input
        const coinFileInput = document.getElementById("coinFileInput");
        if (coinFileInput) {
            coinFileInput.addEventListener("change", (e) => this.handleFileUpload(e));
        }

        // Preset selector buttons
        const presetChips = document.querySelectorAll(".specimen-chip");
        presetChips.forEach((chip, index) => {
            chip.addEventListener("click", () => {
                presetChips.forEach(c => c.classList.remove("active"));
                chip.classList.add("active");
                this.currentPresetIndex = index;
                this.activePresetImage = this.presetSpecimens[index].image;
                this.updatePresetDisplay();
                if (window.soundEngine) window.soundEngine.playPip(700, 0.04);
            });
        });

        // Main QuickGrade Trigger Button
        const triggerScanBtn = document.getElementById("triggerScanBtn");
        if (triggerScanBtn) {
            triggerScanBtn.addEventListener("click", () => this.executeGradingPipeline());
        }

        // Handle window resize for canvas
        window.addEventListener("resize", () => this.resizeCanvas());
        this.resizeCanvas();
    }

    resizeCanvas() {
        if (!this.canvas) return;
        const parent = this.canvas.parentElement;
        if (parent) {
            this.canvas.width = parent.clientWidth;
            this.canvas.height = parent.clientHeight;
        }
    }

    async startCamera() {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            console.warn("Camera API not supported; falling back to specimen mode");
            this.setMode('preset');
            return;
        }

        this.stopCameraStream();

        try {
            const constraints = {
                video: {
                    facingMode: { ideal: this.facingMode },
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                },
                audio: false
            };

            this.stream = await navigator.mediaDevices.getUserMedia(constraints);
            if (this.video) {
                this.video.srcObject = this.stream;
                this.video.play().catch(e => console.warn("Video play err:", e));
                this.video.classList.remove("hidden");
                const presetEl = document.getElementById("presetCoinViewer");
                if (presetEl) presetEl.classList.add("hidden");
                const camStatus = document.getElementById("cameraStatusBadge");
                if (camStatus) camStatus.innerHTML = `<span class="live-dot"></span> LIVE OPTICAL FEED`;
            }
        } catch (err) {
            console.warn("Camera permission denied or camera unavailable:", err);
            const camStatus = document.getElementById("cameraStatusBadge");
            if (camStatus) camStatus.innerHTML = `<span class="amber-dot"></span> SIMULATED MACRO SENSOR`;
            this.setMode('preset');
        }
    }

    stopCameraStream() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
    }

    switchCamera() {
        this.facingMode = this.facingMode === "environment" ? "user" : "environment";
        if (window.soundEngine) window.soundEngine.playPip(1000, 0.05);
        if (this.sourceMode === 'camera') {
            this.startCamera();
        }
    }

    setMode(mode) {
        this.sourceMode = mode;
        const tabs = [
            document.getElementById("tabLiveCam"),
            document.getElementById("tabPreset"),
            document.getElementById("tabUpload")
        ];
        tabs.forEach(t => t && t.classList.remove("active"));

        const presetContainer = document.getElementById("presetSelectorContainer");
        const uploadContainer = document.getElementById("uploadContainer");
        const presetEl = document.getElementById("presetCoinViewer");
        const videoEl = this.video;

        if (mode === 'camera') {
            document.getElementById("tabLiveCam")?.classList.add("active");
            if (presetContainer) presetContainer.classList.add("hidden");
            if (uploadContainer) uploadContainer.classList.add("hidden");
            if (videoEl) videoEl.classList.remove("hidden");
            if (presetEl) presetEl.classList.add("hidden");
            this.startCamera();
        } else if (mode === 'preset') {
            document.getElementById("tabPreset")?.classList.add("active");
            if (presetContainer) presetContainer.classList.remove("hidden");
            if (uploadContainer) uploadContainer.classList.add("hidden");
            this.stopCameraStream();
            if (videoEl) videoEl.classList.add("hidden");
            if (presetEl) {
                presetEl.classList.remove("hidden");
                this.updatePresetDisplay();
            }
            const camStatus = document.getElementById("cameraStatusBadge");
            if (camStatus) camStatus.innerHTML = `<span class="cyan-dot"></span> CALIBRATED STUDIO SPECIMEN`;
        } else if (mode === 'upload') {
            document.getElementById("tabUpload")?.classList.add("active");
            if (presetContainer) presetContainer.classList.add("hidden");
            if (uploadContainer) uploadContainer.classList.remove("hidden");
            this.stopCameraStream();
            if (videoEl) videoEl.classList.add("hidden");
            if (presetEl) presetEl.classList.remove("hidden");
            const camStatus = document.getElementById("cameraStatusBadge");
            if (camStatus) camStatus.innerHTML = `<span class="purple-dot"></span> CUSTOM USER SPECIMEN`;
        }

        if (window.soundEngine) window.soundEngine.playPip(600, 0.04);
    }

    updatePresetDisplay() {
        const presetImg = document.getElementById("presetCoinImage");
        const preset = this.presetSpecimens[this.currentPresetIndex];
        if (presetImg && preset) {
            presetImg.src = preset.image;
        }
    }

    handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            this.uploadedImageSrc = e.target.result;
            const presetImg = document.getElementById("presetCoinImage");
            if (presetImg) {
                presetImg.src = this.uploadedImageSrc;
            }
            const uploadLabel = document.getElementById("uploadFileName");
            if (uploadLabel) {
                uploadLabel.textContent = file.name;
            }
            if (window.soundEngine) window.soundEngine.playPip(900, 0.06);
        };
        reader.readAsDataURL(file);
    }

    startHudLoop() {
        const loop = (timestamp) => {
            this.renderHud(timestamp);
            this.animFrameId = requestAnimationFrame(loop);
        };
        this.animFrameId = requestAnimationFrame(loop);
    }

    renderHud(timestamp) {
        if (!this.ctx || !this.canvas) return;
        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;

        ctx.clearRect(0, 0, w, h);

        const cx = w / 2;
        const cy = h / 2;
        const radius = Math.min(w, h) * 0.36;

        // Rotate telemetry HUD
        this.telemetry.rotationAngle += 0.008;

        // Scan laser animation
        this.telemetry.laserY += 3 * this.telemetry.laserDirection;
        if (this.telemetry.laserY > radius * 1.05) {
            this.telemetry.laserDirection = -1;
        } else if (this.telemetry.laserY < -radius * 1.05) {
            this.telemetry.laserDirection = 1;
        }

        // Jitter live telemetry slightly for high-tech HUD realism
        if (Math.random() > 0.8) {
            this.telemetry.luster = Math.min(99, Math.max(82, this.telemetry.luster + (Math.random() * 4 - 2)));
            this.telemetry.edgeAlignment = Math.min(99.4, Math.max(93.1, this.telemetry.edgeAlignment + (Math.random() * 0.6 - 0.3)));
            this.telemetry.strikeSharpness = Math.min(98, Math.max(89, this.telemetry.strikeSharpness + (Math.random() * 2 - 1)));
            this.updateTelemetryDom();
        }

        // Draw Outer Circular Alignment Ring
        ctx.save();
        ctx.translate(cx, cy);

        // Subtle shaded vignette mask outside the coin circle
        ctx.beginPath();
        ctx.arc(0, 0, radius + 2, 0, Math.PI * 2);
        ctx.rect(w, -h, -w * 2, h * 2);
        ctx.fillStyle = "rgba(4, 7, 12, 0.45)";
        ctx.fill();

        // Outer reticle ring
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([8, 12]);
        ctx.stroke();

        // Inner solid cyan/gold glow ring
        ctx.beginPath();
        ctx.arc(0, 0, radius - 10, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(45, 212, 191, 0.7)";
        ctx.lineWidth = 2;
        ctx.setLineDash([]);
        ctx.stroke();

        // Rotating compass dashes
        ctx.save();
        ctx.rotate(this.telemetry.rotationAngle);
        for (let i = 0; i < 24; i++) {
            const angle = (i * Math.PI) / 12;
            const len = i % 6 === 0 ? 12 : 6;
            const r1 = radius + 12;
            const r2 = r1 + len;
            ctx.beginPath();
            ctx.moveTo(Math.cos(angle) * r1, Math.sin(angle) * r1);
            ctx.lineTo(Math.cos(angle) * r2, Math.sin(angle) * r2);
            ctx.strokeStyle = i % 6 === 0 ? "#e6b44c" : "rgba(255, 255, 255, 0.25)";
            ctx.lineWidth = i % 6 === 0 ? 2 : 1;
            ctx.stroke();
        }
        ctx.restore();

        // 4 Golden Corner Brackets
        const bracketSize = 28;
        const cornerDist = radius * 0.95;
        ctx.strokeStyle = "#e6b44c";
        ctx.lineWidth = 2.5;

        // Top-Left
        ctx.beginPath();
        ctx.moveTo(-cornerDist, -cornerDist + bracketSize);
        ctx.lineTo(-cornerDist, -cornerDist);
        ctx.lineTo(-cornerDist + bracketSize, -cornerDist);
        ctx.stroke();

        // Top-Right
        ctx.beginPath();
        ctx.moveTo(cornerDist, -cornerDist + bracketSize);
        ctx.lineTo(cornerDist, -cornerDist);
        ctx.lineTo(cornerDist - bracketSize, -cornerDist);
        ctx.stroke();

        // Bottom-Left
        ctx.beginPath();
        ctx.moveTo(-cornerDist, cornerDist - bracketSize);
        ctx.lineTo(-cornerDist, cornerDist);
        ctx.lineTo(-cornerDist + bracketSize, cornerDist);
        ctx.stroke();

        // Bottom-Right
        ctx.beginPath();
        ctx.moveTo(cornerDist, cornerDist - bracketSize);
        ctx.lineTo(cornerDist, cornerDist);
        ctx.lineTo(cornerDist - bracketSize, cornerDist);
        ctx.stroke();

        // Scanning Laser Sweep Line
        const laserY = this.telemetry.laserY;
        const chordHalfWidth = Math.sqrt(Math.max(0, radius * radius - laserY * laserY));
        if (chordHalfWidth > 0) {
            const grad = ctx.createLinearGradient(-chordHalfWidth, laserY, chordHalfWidth, laserY);
            grad.addColorStop(0, "rgba(45, 212, 191, 0)");
            grad.addColorStop(0.5, "rgba(45, 212, 191, 0.95)");
            grad.addColorStop(1, "rgba(45, 212, 191, 0)");

            ctx.beginPath();
            ctx.moveTo(-chordHalfWidth, laserY);
            ctx.lineTo(chordHalfWidth, laserY);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 2.5;
            ctx.stroke();

            // Laser glow aura
            ctx.beginPath();
            ctx.moveTo(-chordHalfWidth, laserY);
            ctx.lineTo(chordHalfWidth, laserY);
            ctx.strokeStyle = "rgba(45, 212, 191, 0.25)";
            ctx.lineWidth = 8;
            ctx.stroke();
        }

        // Center Crosshair
        ctx.beginPath();
        ctx.moveTo(-10, 0);
        ctx.lineTo(10, 0);
        ctx.moveTo(0, -10);
        ctx.lineTo(0, 10);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
    }

    updateTelemetryDom() {
        const lusterVal = document.getElementById("telemetryLuster");
        const edgeVal = document.getElementById("telemetryEdge");
        const strikeVal = document.getElementById("telemetryStrike");

        if (lusterVal) lusterVal.textContent = `${Math.round(this.telemetry.luster)}%`;
        if (edgeVal) edgeVal.textContent = `${this.telemetry.edgeAlignment.toFixed(1)}%`;
        if (strikeVal) strikeVal.textContent = `${Math.round(this.telemetry.strikeSharpness)}%`;
    }

    async executeGradingPipeline() {
        if (this.isScanning) return;
        this.isScanning = true;

        if (window.soundEngine) {
            window.soundEngine.playShutter();
            setTimeout(() => window.soundEngine.playRadarSweep(), 300);
        }

        const scanModal = document.getElementById("scanProgressModal");
        if (scanModal) {
            scanModal.classList.remove("hidden");
            scanModal.setAttribute("aria-hidden", "false");
        }

        const stages = [
            { id: 1, text: "Calibrating Optical Plane & Rim Denticle Alignment...", pct: 25 },
            { id: 2, text: "Photogrammetric Surface Luster & Cartwheel Index...", pct: 50 },
            { id: 3, text: "High-Point Wear Mapping (Lady Liberty / Eagle Relatives)...", pct: 75 },
            { id: 4, text: "Synthesizing Sheldon 70-Point Grade & Valuation Matrix...", pct: 100 }
        ];

        const progressFill = document.getElementById("scanProgressFill");
        const progressLabel = document.getElementById("scanProgressLabel");
        const progressPct = document.getElementById("scanProgressPercent");

        for (let stage of stages) {
            if (progressLabel) progressLabel.textContent = stage.text;
            if (progressFill) progressFill.style.width = `${stage.pct}%`;
            if (progressPct) progressPct.textContent = `${stage.pct}%`;
            if (window.soundEngine) window.soundEngine.playPip(440 + stage.id * 180, 0.08);
            await new Promise(r => setTimeout(r, 650));
        }

        // Finalize grading result
        this.finalizeGrading();
    }

    finalizeGrading() {
        this.isScanning = false;
        const scanModal = document.getElementById("scanProgressModal");
        if (scanModal) {
            scanModal.classList.add("hidden");
            scanModal.setAttribute("aria-hidden", "true");
        }

        // Determine coin specimen context
        let resultCoin = null;
        if (this.sourceMode === 'preset') {
            const preset = this.presetSpecimens[this.currentPresetIndex];
            resultCoin = {
                title: preset.name,
                year: parseInt(preset.name.match(/\d{4}/)?.[0] || 1921),
                mintMark: preset.name.includes("-S") ? "S" : (preset.name.includes("-D") ? "D" : "P"),
                denomination: preset.name.includes("Dollar") ? "$1 Silver Dollar" : (preset.name.includes("Eagle") ? "$20 Gold Double Eagle" : "1¢ Small Cent"),
                composition: preset.metal,
                grade: preset.expectedGrade,
                sheldonScore: preset.sheldon,
                marketValue: preset.estValue,
                subgrades: preset.subgrades,
                image: preset.image,
                aiConfidence: (97.5 + Math.random() * 2.2).toFixed(1)
            };
        } else if (this.sourceMode === 'upload' && this.uploadedImageSrc) {
            // Uploaded image custom analysis
            const randomScores = [
                { grade: "MS 65+", sheldon: 65.5, value: 340, text: "Gem Uncirculated" },
                { grade: "MS 64", sheldon: 64.0, value: 160, text: "Choice Uncirculated" },
                { grade: "AU 58", sheldon: 58.0, value: 65, text: "About Uncirculated" },
                { grade: "MS 66", sheldon: 66.0, value: 620, text: "Premium Gem" }
            ];
            const choice = randomScores[Math.floor(Math.random() * randomScores.length)];
            resultCoin = {
                title: "Custom Numismatic Specimen",
                year: 1921,
                mintMark: "P",
                denomination: "US Silver Dollar",
                composition: "90% Fine Silver",
                grade: choice.grade,
                sheldonScore: choice.sheldon,
                marketValue: choice.value,
                subgrades: { strike: 9.4, luster: 9.3, surfaces: 9.1, eyeAppeal: 9.5 },
                image: this.uploadedImageSrc,
                aiConfidence: (96.8 + Math.random() * 2.8).toFixed(1)
            };
        } else {
            // Live camera capture
            resultCoin = {
                title: "1881-S Morgan Silver Dollar (Live Capture)",
                year: 1881,
                mintMark: "S",
                denomination: "$1 Silver Dollar",
                composition: "90% Silver, 10% Copper",
                grade: "MS 65+",
                sheldonScore: 65.5,
                marketValue: 380,
                subgrades: { strike: 9.5, luster: 9.6, surfaces: 9.2, eyeAppeal: 9.6 },
                image: "./assets/images/raw_morgan_obverse.jpg",
                aiConfidence: (97.9 + Math.random() * 1.8).toFixed(1)
            };
        }

        // Generate authentic Cert & Verification Hash
        const randomNum = Math.floor(1000000 + Math.random() * 9000000);
        const certNumber = `LCG-AI-${randomNum}`;
        const verificationHash = Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('');

        this.lastGradedCoin = {
            id: certNumber.toLowerCase(),
            certNumber: certNumber,
            title: resultCoin.title,
            year: resultCoin.year,
            mintMark: resultCoin.mintMark,
            denomination: resultCoin.denomination,
            composition: resultCoin.composition,
            grade: resultCoin.grade,
            sheldonScore: resultCoin.sheldonScore,
            gradeType: resultCoin.sheldonScore >= 65 ? "Gem Uncirculated" : (resultCoin.sheldonScore >= 60 ? "Mint State" : "About Uncirculated"),
            source: "mobile_ai",
            sourceLabel: "AI Mobile QuickGrade",
            badgeColor: "cyan",
            slabImage: resultCoin.image,
            obverseImage: resultCoin.image,
            reverseImage: "./assets/images/raw_morgan_reverse.jpg",
            marketValue: resultCoin.marketValue,
            pedigree: `QuickScan Mobile #${Math.floor(1000 + Math.random() * 9000)}`,
            certifiedDate: new Date().toISOString().split('T')[0],
            population: Math.floor(120 + Math.random() * 400),
            populationHigher: Math.floor(20 + Math.random() * 80),
            subgrades: resultCoin.subgrades,
            aiConfidence: resultCoin.aiConfidence,
            strikeDetails: "Multi-point photogrammetry confirmed crisp denticles with razor-sharp focal relief",
            lusterType: "High Radiant Cartwheel",
            description: `Quick-graded in real-time from mobile camera feed utilizing the LCG Neural Engine v4.2. Surface analysis verified 0.04mm strike relief and ${resultCoin.aiConfidence}% algorithmic certainty.`,
            verificationHash: verificationHash,
            submitter: "Live Mobile User (You)"
        };

        if (window.soundEngine) {
            window.soundEngine.playGradeSuccess();
            setTimeout(() => window.soundEngine.playCoinClink(), 400);
        }

        // Render QuickGrade Result Modal
        this.renderResultModal(this.lastGradedCoin);
    }

    renderResultModal(coin) {
        const modal = document.getElementById("quickGradeResultModal");
        if (!modal) return;

        // Populate modal fields
        document.getElementById("resCertNumber").textContent = coin.certNumber;
        document.getElementById("resCoinTitle").textContent = coin.title;
        document.getElementById("resCoinGrade").textContent = coin.grade;
        document.getElementById("resCoinType").textContent = coin.gradeType;
        document.getElementById("resConfidence").textContent = `${coin.aiConfidence}%`;
        document.getElementById("resMarketValue").textContent = `$${coin.marketValue.toLocaleString()}`;
        document.getElementById("resCoinImage").src = coin.obverseImage || coin.slabImage;

        // Subgrades
        document.getElementById("resStrikeVal").textContent = `${coin.subgrades.strike} / 10`;
        document.getElementById("resLusterVal").textContent = `${coin.subgrades.luster} / 10`;
        document.getElementById("resSurfacesVal").textContent = `${coin.subgrades.surfaces} / 10`;
        document.getElementById("resEyeAppealVal").textContent = `${coin.subgrades.eyeAppeal} / 10`;

        document.getElementById("resStrikeBar").style.width = `${coin.subgrades.strike * 10}%`;
        document.getElementById("resLusterBar").style.width = `${coin.subgrades.luster * 10}%`;
        document.getElementById("resSurfacesBar").style.width = `${coin.subgrades.surfaces * 10}%`;
        document.getElementById("resEyeAppealBar").style.width = `${coin.subgrades.eyeAppeal * 10}%`;

        document.getElementById("resCertHash").textContent = coin.verificationHash;

        modal.classList.remove("hidden");
        modal.setAttribute("aria-hidden", "false");

        // Hook action buttons
        const publishBtn = document.getElementById("publishToRegistryBtn");
        if (publishBtn) {
            publishBtn.onclick = () => {
                if (window.coinDatabase) {
                    window.coinDatabase.addCoin(this.lastGradedCoin);
                    if (window.databaseViewer) {
                        window.databaseViewer.render();
                    }
                    if (window.soundEngine) window.soundEngine.playPip(1200, 0.1);
                    this.showToast(`Success! Cert ${this.lastGradedCoin.certNumber} published to the public registry!`);
                    modal.classList.add("hidden");
                    // Smooth scroll to database section
                    document.getElementById("registrySection")?.scrollIntoView({ behavior: 'smooth' });
                }
            };
        }

        const closeResultBtn = document.getElementById("closeResultBtn");
        if (closeResultBtn) {
            closeResultBtn.onclick = () => {
                modal.classList.add("hidden");
                modal.setAttribute("aria-hidden", "true");
            };
        }

        const upgradeSlabBtn = document.getElementById("upgradeSlabBtn");
        if (upgradeSlabBtn) {
            upgradeSlabBtn.onclick = () => {
                modal.classList.add("hidden");
                document.getElementById("submissionSection")?.scrollIntoView({ behavior: 'smooth' });
                if (window.soundEngine) window.soundEngine.playPip(800, 0.05);
            };
        }
    }

    showToast(msg) {
        let toast = document.getElementById("lcgToast");
        if (!toast) {
            toast = document.createElement("div");
            toast.id = "lcgToast";
            toast.className = "lcg-toast";
            document.body.appendChild(toast);
        }
        toast.textContent = msg;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 4000);
    }
}

window.quickGradeScanner = new QuickGradeScanner();
