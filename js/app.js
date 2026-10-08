/**
 * Legacy Grading - Main Application Controller
 * Handles navigation, audio toggle, interactive fee calculator,
 * and Sheldon scale educational tool.
 */

document.addEventListener("DOMContentLoaded", () => {
    // Initialize sub-systems
    if (window.quickGradeScanner) window.quickGradeScanner.init();
    if (window.databaseViewer) window.databaseViewer.init();
    if (window.slabModal) window.slabModal.init();

    setupAudioToggle();
    setupMobileNav();
    setupSubmissionCalculator();
    setupSheldonExploration();
    setupSmoothScrolling();
});

function setupAudioToggle() {
    const audioBtn = document.getElementById("toggleAudioBtn");
    if (!audioBtn) return;

    const updateIcon = (isMuted) => {
        audioBtn.innerHTML = isMuted 
            ? `<span class="icon">🔇</span> <span class="btn-text">Audio Muted</span>`
            : `<span class="icon">🔊</span> <span class="btn-text">SFX Active</span>`;
        if (isMuted) {
            audioBtn.classList.add("muted");
        } else {
            audioBtn.classList.remove("muted");
        }
    };

    updateIcon(window.soundEngine.isMuted);

    audioBtn.addEventListener("click", () => {
        const isMuted = window.soundEngine.toggleMute();
        updateIcon(isMuted);
    });
}

function setupMobileNav() {
    const toggleBtn = document.getElementById("mobileMenuToggle");
    const navMenu = document.getElementById("mainNavLinks");

    if (toggleBtn && navMenu) {
        toggleBtn.addEventListener("click", () => {
            navMenu.classList.toggle("open");
            toggleBtn.classList.toggle("active");
            if (window.soundEngine) window.soundEngine.playPip(900, 0.04);
        });

        // Close on link click
        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("open");
                toggleBtn.classList.remove("active");
            });
        });
    }
}

function setupSubmissionCalculator() {
    const countInput = document.getElementById("calcCoinCount");
    const tierRadios = document.querySelectorAll('input[name="serviceTier"]');
    const addonTrueview = document.getElementById("addonTrueview");
    const addonHolo = document.getElementById("addonHolo");

    const totalEl = document.getElementById("calcTotalCost");
    const turnaroundEl = document.getElementById("calcTurnaround");
    const submitOrderBtn = document.getElementById("submitOrderBtn");

    const calculate = () => {
        const count = Math.max(1, parseInt(countInput?.value || 1));
        let tierRate = 35; // default onsite
        let turnaround = "5 Business Days";

        tierRadios.forEach(r => {
            if (r.checked) {
                if (r.value === "quick") {
                    tierRate = 0;
                    turnaround = "Instant (Mobile Camera)";
                } else if (r.value === "onsite_standard") {
                    tierRate = 35;
                    turnaround = "5-7 Business Days";
                } else if (r.value === "onsite_express") {
                    tierRate = 65;
                    turnaround = "48 Hours Express";
                }
            }
        });

        let addOnRate = 0;
        if (addonTrueview && addonTrueview.checked) addOnRate += 5;
        if (addonHolo && addonHolo.checked) addOnRate += 4;

        const total = count * (tierRate + addOnRate);

        if (totalEl) totalEl.textContent = `$${total.toLocaleString()}`;
        if (turnaroundEl) turnaroundEl.textContent = turnaround;
    };

    if (countInput) countInput.addEventListener("input", calculate);
    tierRadios.forEach(r => r.addEventListener("change", calculate));
    if (addonTrueview) addonTrueview.addEventListener("change", calculate);
    if (addonHolo) addonHolo.addEventListener("change", calculate);

    if (submitOrderBtn) {
        submitOrderBtn.addEventListener("click", () => {
            if (window.soundEngine) window.soundEngine.playGradeSuccess();
            if (window.quickGradeScanner) {
                window.quickGradeScanner.showToast("Submission Order Initialized! Shipping label & packing manifest created.");
            }
        });
    }

    calculate();
}

function setupSheldonExploration() {
    const pills = document.querySelectorAll(".sheldon-scale-pill");
    const titleEl = document.getElementById("sheldonDetailTitle");
    const descEl = document.getElementById("sheldonDetailDesc");
    const criteriaEl = document.getElementById("sheldonDetailCriteria");

    const scaleData = {
        "ms70": {
            title: "MS-70 / PR-70 • Perfect Mint State",
            desc: "Flawless coin under 5x magnification with no trace of contact marks, hairlines, or microscopic planchet flaws. Full vibrant mint bloom or mirror cameo fields.",
            criteria: "Zero friction, razor-sharp die strike, pristine virgin luster, immaculate eye appeal."
        },
        "ms65": {
            title: "MS-65 • Gem Uncirculated",
            desc: "High quality uncirculated strike with attractive luster and minor scattered contact bagmarks that do not distract from primary focal areas.",
            criteria: "Full original mint luster, above average strike, minor light bag marks in secondary fields."
        },
        "au58": {
            title: "AU-58 • Choice About Uncirculated",
            desc: "Often dubbed 'The Everyday Slider'. Displays virtually full mint luster with only minuscule friction wear on the absolute highest focal hair points or eagle wingtips.",
            criteria: "95%+ luster present, microscopic high-point cabinet friction, excellent commercial collector appeal."
        },
        "xf45": {
            title: "XF-45 • Choice Extremely Fine",
            desc: "Light overall wear on all high points with approximately 70% of design details intact. Original luster remains only in protected recesses.",
            criteria: "Clear lettering, distinct feather ribs, luster remnants confined to stars and rim legends."
        },
        "vf20": {
            title: "VF-20 • Very Fine",
            desc: "Moderate to considerable wear on elevated design motifs. All major lettering and dates remain bold and legible.",
            criteria: "LIBERTY headband visible, major hair waves delineated, complete rim."
        }
    };

    pills.forEach(pill => {
        pill.addEventListener("click", () => {
            pills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            const gradeKey = pill.dataset.grade;
            const data = scaleData[gradeKey];
            if (data && titleEl && descEl && criteriaEl) {
                titleEl.textContent = data.title;
                descEl.textContent = data.desc;
                criteriaEl.textContent = data.criteria;
                if (window.soundEngine) window.soundEngine.playPip(950, 0.04);
            }
        });
    });
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                    if (window.soundEngine) window.soundEngine.playPip(700, 0.03);
                }
            }
        });
    });
}
