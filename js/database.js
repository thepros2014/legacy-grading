/**
 * Legacy Grading - Public Database & Registry Browser
 * Renders filterable, searchable coin catalog with 3D tilt slabs,
 * flip previews, and population stats.
 */

class DatabaseViewer {
    constructor() {
        this.container = null;
        this.statsContainer = null;
        this.activeSourceFilter = 'all'; // 'all', 'onsite', 'mobile_ai'
        this.activeCategoryFilter = 'all';
        this.activeGradeTier = 'all';
        this.activeSort = 'newest';
        this.searchQuery = '';
        this.flippedCards = new Set();
    }

    init() {
        this.container = document.getElementById("registryGrid");
        this.statsContainer = document.getElementById("registryStatsBar");

        this.setupControls();
        this.render();
    }

    setupControls() {
        // Source filter buttons (All, Onsite, Mobile AI)
        const sourceButtons = document.querySelectorAll(".filter-source-btn");
        sourceButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                sourceButtons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                this.activeSourceFilter = btn.dataset.source;
                if (window.soundEngine) window.soundEngine.playPip(800, 0.04);
                this.render();
            });
        });

        // Search input
        const searchInput = document.getElementById("registrySearchInput");
        if (searchInput) {
            searchInput.addEventListener("input", (e) => {
                this.searchQuery = e.target.value.toLowerCase().trim();
                this.render();
            });
        }

        // Header quick cert verify search
        const certVerifyInput = document.getElementById("headerCertInput");
        const certVerifyBtn = document.getElementById("headerCertBtn");
        if (certVerifyBtn && certVerifyInput) {
            const doSearch = () => {
                const val = certVerifyInput.value.trim();
                if (!val) return;
                const coin = window.coinDatabase.getByCert(val);
                if (coin) {
                    if (window.soundEngine) window.soundEngine.playGradeSuccess();
                    window.slabModal.open(coin);
                } else {
                    if (window.quickGradeScanner) {
                        window.quickGradeScanner.showToast(`Certificate "${val}" not found in registry.`);
                    }
                }
            };
            certVerifyBtn.addEventListener("click", doSearch);
            certVerifyInput.addEventListener("keydown", (e) => {
                if (e.key === "Enter") doSearch();
            });
        }

        // Category dropdown
        const categorySelect = document.getElementById("filterCategorySelect");
        if (categorySelect) {
            categorySelect.addEventListener("change", (e) => {
                this.activeCategoryFilter = e.target.value;
                this.render();
            });
        }

        // Grade tier dropdown
        const gradeTierSelect = document.getElementById("filterGradeTierSelect");
        if (gradeTierSelect) {
            gradeTierSelect.addEventListener("change", (e) => {
                this.activeGradeTier = e.target.value;
                this.render();
            });
        }

        // Sort dropdown
        const sortSelect = document.getElementById("sortRegistrySelect");
        if (sortSelect) {
            sortSelect.addEventListener("change", (e) => {
                this.activeSort = e.target.value;
                this.render();
            });
        }
    }

    getFilteredCoins() {
        let coins = window.coinDatabase ? window.coinDatabase.getAll() : [];

        // Filter by source (onsite vs mobile_ai)
        if (this.activeSourceFilter !== 'all') {
            coins = coins.filter(c => c.source === this.activeSourceFilter);
        }

        // Filter by category
        if (this.activeCategoryFilter !== 'all') {
            coins = coins.filter(c => {
                const title = c.title.toLowerCase();
                const denom = (c.denomination || '').toLowerCase();
                if (this.activeCategoryFilter === 'dollar') return title.includes('dollar') || denom.includes('dollar');
                if (this.activeCategoryFilter === 'gold') return title.includes('gold') || denom.includes('gold') || title.includes('eagle');
                if (this.activeCategoryFilter === 'half') return title.includes('half');
                if (this.activeCategoryFilter === 'cent') return title.includes('cent') || title.includes('penny');
                return true;
            });
        }

        // Filter by grade tier
        if (this.activeGradeTier !== 'all') {
            coins = coins.filter(c => {
                const s = c.sheldonScore || 0;
                if (this.activeGradeTier === 'gem') return s >= 65;
                if (this.activeGradeTier === 'mint') return s >= 60 && s < 65;
                if (this.activeGradeTier === 'au') return s >= 50 && s < 60;
                if (this.activeGradeTier === 'circ') return s < 50;
                return true;
            });
        }

        // Filter by search query
        if (this.searchQuery) {
            coins = coins.filter(c => {
                return (
                    c.title.toLowerCase().includes(this.searchQuery) ||
                    c.certNumber.toLowerCase().includes(this.searchQuery) ||
                    (c.pedigree && c.pedigree.toLowerCase().includes(this.searchQuery)) ||
                    (c.grade && c.grade.toLowerCase().includes(this.searchQuery)) ||
                    (c.submitter && c.submitter.toLowerCase().includes(this.searchQuery)) ||
                    c.year.toString().includes(this.searchQuery)
                );
            });
        }

        // Sorting
        coins.sort((a, b) => {
            if (this.activeSort === 'newest') {
                return new Date(b.certifiedDate || 0) - new Date(a.certifiedDate || 0);
            }
            if (this.activeSort === 'grade_desc') {
                return (b.sheldonScore || 0) - (a.sheldonScore || 0);
            }
            if (this.activeSort === 'grade_asc') {
                return (a.sheldonScore || 0) - (b.sheldonScore || 0);
            }
            if (this.activeSort === 'value_desc') {
                return (b.marketValue || 0) - (a.marketValue || 0);
            }
            if (this.activeSort === 'year_asc') {
                return (a.year || 0) - (b.year || 0);
            }
            return 0;
        });

        return coins;
    }

    renderStats() {
        if (!this.statsContainer || !window.coinDatabase) return;
        const stats = window.coinDatabase.getStats();

        this.statsContainer.innerHTML = `
            <div class="stat-pill">
                <span class="stat-pill-label">Total Verified</span>
                <span class="stat-pill-val">${stats.total}</span>
            </div>
            <div class="stat-pill gold">
                <span class="stat-pill-label">🏛️ Onsite Slabs</span>
                <span class="stat-pill-val">${stats.onsiteCount}</span>
            </div>
            <div class="stat-pill cyan">
                <span class="stat-pill-label">📱 Mobile QuickGrades</span>
                <span class="stat-pill-val">${stats.mobileCount}</span>
            </div>
            <div class="stat-pill value">
                <span class="stat-pill-label">Total Registry Value</span>
                <span class="stat-pill-val">$${stats.totalValue.toLocaleString()}</span>
            </div>
        `;
    }

    render() {
        if (!this.container) return;
        this.renderStats();

        const coins = this.getFilteredCoins();

        if (coins.length === 0) {
            this.container.innerHTML = `
                <div class="registry-empty-state">
                    <div class="empty-icon">🔍</div>
                    <h3>No Certified Coins Found</h3>
                    <p>No coins matched your search criteria. Try adjusting your filters or use the camera to quick-grade a new coin!</p>
                    <button class="btn btn-primary" onclick="document.getElementById('scannerSection').scrollIntoView({behavior:'smooth'})">
                        Grading with Mobile Camera
                    </button>
                </div>
            `;
            return;
        }

        this.container.innerHTML = coins.map(coin => this.generateCardHtml(coin)).join('');

        this.attachCardInteractions();
    }

    generateCardHtml(coin) {
        const isFlipped = this.flippedCards.has(coin.id);
        const isOnsite = coin.source === 'onsite';
        const sourceBadgeClass = isOnsite ? 'badge-onsite' : 'badge-quickgrade';
        const sourceIcon = isOnsite ? '🏛️' : '📱';
        const displayImage = isFlipped ? (coin.reverseImage || coin.slabImage) : (coin.slabImage || coin.obverseImage);

        return `
            <div class="coin-card-wrapper" data-id="${coin.id}">
                <div class="coin-card ${isOnsite ? 'card-onsite' : 'card-quickgrade'}">
                    <!-- Hologram Top Header Label -->
                    <div class="card-slab-header">
                        <div class="slab-hologram-strip"></div>
                        <div class="slab-header-inner">
                            <div class="slab-brand">
                                <span class="slab-logo-text">LEGACY GRADING</span>
                                <span class="slab-cert-id">${coin.certNumber}</span>
                            </div>
                            <div class="slab-source-tag ${sourceBadgeClass}">
                                ${sourceIcon} ${coin.sourceLabel}
                            </div>
                        </div>
                    </div>

                    <!-- Coin Media Display Area with 3D Tilt container -->
                    <div class="card-media-viewport">
                        <img 
                            src="${displayImage}" 
                            alt="${coin.title}" 
                            class="card-coin-img ${isFlipped ? 'flipped' : ''}"
                            loading="lazy"
                        />
                        <div class="card-glare-overlay"></div>
                        
                        <!-- Flip View Button -->
                        <button class="btn-flip-coin" data-flip-id="${coin.id}" title="Flip to Reverse Side">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                            </svg>
                            ${isFlipped ? 'Obverse' : 'Reverse'}
                        </button>

                        <!-- Confidence or Security seal -->
                        <div class="card-security-badge">
                            ${isOnsite ? '🔒 Sonic Sealed' : `⚡ AI ${coin.aiConfidence}% Conf.`}
                        </div>
                    </div>

                    <!-- Coin Info Body -->
                    <div class="card-body">
                        <div class="card-grade-banner">
                            <div class="grade-main">
                                <span class="grade-code">${coin.grade}</span>
                                <span class="grade-type">${coin.gradeType}</span>
                            </div>
                            <div class="grade-market-val">
                                <span class="val-label">Est. Value</span>
                                <span class="val-amount">$${(coin.marketValue || 0).toLocaleString()}</span>
                            </div>
                        </div>

                        <h3 class="card-coin-title">${coin.title}</h3>
                        
                        <div class="card-meta-row">
                            <span class="meta-item">📅 ${coin.year}</span>
                            <span class="meta-item">⚖️ ${coin.composition.split(',')[0]}</span>
                            <span class="meta-item">🏆 Pop: ${coin.population}</span>
                        </div>

                        <!-- Mini Subgrades Metrics -->
                        <div class="card-subgrades-grid">
                            <div class="sub-col">
                                <span class="sub-title">Strike</span>
                                <span class="sub-score">${coin.subgrades?.strike || 9.5}</span>
                            </div>
                            <div class="sub-col">
                                <span class="sub-title">Luster</span>
                                <span class="sub-score">${coin.subgrades?.luster || 9.6}</span>
                            </div>
                            <div class="sub-col">
                                <span class="sub-title">Surfaces</span>
                                <span class="sub-score">${coin.subgrades?.surfaces || 9.3}</span>
                            </div>
                            <div class="sub-col">
                                <span class="sub-title">Eye Appeal</span>
                                <span class="sub-score">${coin.subgrades?.eyeAppeal || 9.7}</span>
                            </div>
                        </div>

                        <!-- Actions -->
                        <div class="card-footer-actions">
                            <button class="btn btn-sm btn-inspect" data-inspect-id="${coin.id}">
                                🔍 Inspect Slab & Cert
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    attachCardInteractions() {
        // Inspect Buttons
        const inspectBtns = this.container.querySelectorAll(".btn-inspect");
        inspectBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                const coinId = btn.dataset.inspectId;
                const coin = window.coinDatabase.getById(coinId);
                if (coin && window.slabModal) {
                    if (window.soundEngine) window.soundEngine.playPip(1100, 0.05);
                    window.slabModal.open(coin);
                }
            });
        });

        // Flip Buttons
        const flipBtns = this.container.querySelectorAll(".btn-flip-coin");
        flipBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                const coinId = btn.dataset.flipId;
                if (this.flippedCards.has(coinId)) {
                    this.flippedCards.delete(coinId);
                } else {
                    this.flippedCards.add(coinId);
                }
                if (window.soundEngine) window.soundEngine.playPip(850, 0.04);
                this.render();
            });
        });

        // 3D Perspective Tilt on MouseMove
        const wrappers = this.container.querySelectorAll(".coin-card-wrapper");
        wrappers.forEach(wrapper => {
            const card = wrapper.querySelector(".coin-card");
            const glare = wrapper.querySelector(".card-glare-overlay");

            wrapper.addEventListener("mousemove", (e) => {
                const rect = wrapper.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -9;
                const rotateY = ((x - centerX) / centerX) * 9;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

                if (glare) {
                    const glareX = (x / rect.width) * 100;
                    const glareY = (y / rect.height) * 100;
                    glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 60%)`;
                }
            });

            wrapper.addEventListener("mouseleave", () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                if (glare) {
                    glare.style.background = "none";
                }
            });
        });
    }
}

window.databaseViewer = new DatabaseViewer();
