/**
 * Legacy Grading - Certified Population Database & Seed Dataset
 * Contains both Onsite Vault Lab Slabs and Mobile AI QuickGrades.
 */

const INITIAL_REGISTRY_DATABASE = [
    {
        id: "lcg-08174563",
        certNumber: "LCG-08174563",
        title: "1881-S Morgan Silver Dollar",
        year: 1881,
        mintMark: "S",
        denomination: "$1 Silver Dollar",
        composition: "90% Silver, 10% Copper",
        grade: "MS 66+",
        sheldonScore: 66.5,
        gradeType: "Mint State",
        source: "onsite", // "onsite" or "mobile_ai"
        sourceLabel: "Onsite Vault Certified",
        badgeColor: "gold",
        slabImage: "./assets/images/morgan_dollar_slab.jpg",
        obverseImage: "./assets/images/raw_morgan_obverse.jpg",
        reverseImage: "./assets/images/raw_morgan_reverse.jpg",
        marketValue: 850,
        pedigree: "The Silver Peak Collection",
        certifiedDate: "2026-04-12",
        population: 48,
        populationHigher: 6,
        subgrades: {
            strike: 9.7,
            luster: 9.8,
            surfaces: 9.5,
            eyeAppeal: 9.9
        },
        aiConfidence: 99.4,
        strikeDetails: "Razor-sharp ear lobe and breast feathers with full die clash marks",
        lusterType: "Blazing Cartwheel Satin",
        description: "An extraordinary gem specimen displaying intense satiny luster with dynamic cartwheel rotation. Flawless cheek with virtually no contact bagmarks. Certified in tamper-proof sonic-welded acrylic with optical hologram security.",
        verificationHash: "7b4c91a03e68df45c91b827e48d3f112bc90fa960e31853bc9c8f0012e12e841",
        submitter: "Legacy Prime Member #409"
    },
    {
        id: "lcg-09043219",
        certNumber: "LCG-09043219",
        title: "1907 $20 Saint-Gaudens Double Eagle",
        year: 1907,
        mintMark: "P",
        denomination: "$20 Double Eagle",
        composition: "90% Gold, 10% Copper",
        grade: "MS 67",
        sheldonScore: 67.0,
        gradeType: "Superb Gem Uncirculated",
        source: "onsite",
        sourceLabel: "Onsite Vault Certified",
        badgeColor: "gold",
        slabImage: "./assets/images/gold_double_eagle_slab.jpg",
        obverseImage: "./assets/images/gold_double_eagle_slab.jpg",
        reverseImage: "./assets/images/gold_double_eagle_slab.jpg",
        marketValue: 12500,
        pedigree: "Augustus Heritage Trust",
        certifiedDate: "2026-05-18",
        population: 14,
        populationHigher: 2,
        subgrades: {
            strike: 9.9,
            luster: 9.9,
            surfaces: 9.8,
            eyeAppeal: 9.9
        },
        aiConfidence: 99.8,
        strikeDetails: "Extreme high-relief definition on Capitol Dome and torch rays",
        lusterType: "Deep Velvet Roman Gold",
        description: "A monumental numismatic masterpiece conceived by Augustus Saint-Gaudens upon commission by President Theodore Roosevelt. Radiant fiery golden hue with full relief star border.",
        verificationHash: "fa9280d85ec01b659c23984be859341c592bb8214f5298a44ec1c8f185c19aa8",
        submitter: "Prestige Numismatics LLC"
    },
    {
        id: "lcg-84739210",
        certNumber: "LCG-84739210",
        title: "1921 High Relief Peace Silver Dollar",
        year: 1921,
        mintMark: "P",
        denomination: "$1 Silver Dollar",
        composition: "90% Silver, 10% Copper",
        grade: "MS 64",
        sheldonScore: 64.0,
        gradeType: "Choice Uncirculated",
        source: "onsite",
        sourceLabel: "Onsite Vault Certified",
        badgeColor: "gold",
        slabImage: "./assets/images/peace_dollar_slab.jpg",
        obverseImage: "./assets/images/peace_dollar_slab.jpg",
        reverseImage: "./assets/images/peace_dollar_slab.jpg",
        marketValue: 920,
        pedigree: "WWI Armistice Commemorative Vault",
        certifiedDate: "2026-06-02",
        population: 86,
        populationHigher: 19,
        subgrades: {
            strike: 9.4,
            luster: 9.5,
            surfaces: 9.3,
            eyeAppeal: 9.6
        },
        aiConfidence: 98.9,
        strikeDetails: "Sculpted Anthony de Francisci high relief with sharp radiate crown",
        lusterType: "Frosty White Luster",
        description: "The first year of issue for the iconic Peace Dollar, struck in high relief to celebrate world peace following the end of the Great War. Heavy frosty texture and clean devices.",
        verificationHash: "3d820bfa184050cc12497eb81f8f309a47890ecb18361048f0293db94a817cc3",
        submitter: "Midwest Coin Exchange"
    },
    {
        id: "lcg-77291048",
        certNumber: "LCG-77291048",
        title: "1941 Walking Liberty Half Dollar",
        year: 1941,
        mintMark: "P",
        denomination: "50¢ Half Dollar",
        composition: "90% Silver, 10% Copper",
        grade: "Proof 66 (W)",
        sheldonScore: 66.0,
        gradeType: "Proof",
        source: "onsite",
        sourceLabel: "Onsite Vault Certified",
        badgeColor: "gold",
        slabImage: "./assets/images/walking_liberty_slab.jpg",
        obverseImage: "./assets/images/walking_liberty_slab.jpg",
        reverseImage: "./assets/images/walking_liberty_slab.jpg",
        marketValue: 1450,
        pedigree: "Philadelphia Mint Archives",
        certifiedDate: "2026-07-20",
        population: 32,
        populationHigher: 5,
        subgrades: {
            strike: 9.8,
            luster: 9.7,
            surfaces: 9.6,
            eyeAppeal: 9.8
        },
        aiConfidence: 99.2,
        strikeDetails: "Deep mirror fields with vivid multi-color peripheral toning",
        lusterType: "Mirror Proof Reflectance",
        description: "Striking Adolph A. Weinman artistry preserved in near-perfect pre-war proof status. Features mesmerizing iridescent rim toning in amber, sapphire, and champagne hues.",
        verificationHash: "8c12f45811c76ba097d413158e2a1f8db15984422cb0d0e74f19bca080338ab5",
        submitter: "Apex Rarities Group"
    },
    {
        id: "lcg-10045678",
        certNumber: "LCG-10045678",
        title: "1909-S V.D.B. Lincoln Cent",
        year: 1909,
        mintMark: "S",
        denomination: "1¢ Small Cent",
        composition: "95% Copper, 5% Tin & Zinc",
        grade: "MS 66 RD",
        sheldonScore: 66.0,
        gradeType: "Full Red Gem",
        source: "onsite",
        sourceLabel: "Onsite Vault Certified",
        badgeColor: "gold",
        slabImage: "./assets/images/lincoln_cent_slab.jpg",
        obverseImage: "./assets/images/lincoln_cent_slab.jpg",
        reverseImage: "./assets/images/lincoln_cent_slab.jpg",
        marketValue: 4800,
        pedigree: "San Francisco Key Date Hoard",
        certifiedDate: "2026-08-11",
        population: 29,
        populationHigher: 4,
        subgrades: {
            strike: 9.6,
            luster: 9.8,
            surfaces: 9.6,
            eyeAppeal: 9.7
        },
        aiConfidence: 99.1,
        strikeDetails: "Sharp coat lapel and prominent designer initials V.D.B. on reverse",
        lusterType: "Fiery Blazing Red",
        description: "The most famous key date in the Lincoln cent series. This specimen retains full original fiery mint red (RD) color without spots or oxidation, a true condition census survivor.",
        verificationHash: "29e84710db44917ccb9183478e58129a0e44b910ca843217983ea4081c746da9",
        submitter: "Heritage West Registry"
    },
    {
        id: "lcg-ai-4491028",
        certNumber: "LCG-AI-4491028",
        title: "1881-S Morgan Silver Dollar",
        year: 1881,
        mintMark: "S",
        denomination: "$1 Silver Dollar",
        composition: "90% Silver, 10% Copper",
        grade: "MS 65",
        sheldonScore: 65.0,
        gradeType: "Gem Uncirculated",
        source: "mobile_ai",
        sourceLabel: "AI Mobile QuickGrade",
        badgeColor: "cyan",
        slabImage: "./assets/images/mobile_coin_scan.jpg",
        obverseImage: "./assets/images/raw_morgan_obverse.jpg",
        reverseImage: "./assets/images/raw_morgan_reverse.jpg",
        marketValue: 340,
        pedigree: "Mobile QuickScan #4491",
        certifiedDate: "2026-09-29",
        population: 312,
        populationHigher: 84,
        subgrades: {
            strike: 9.4,
            luster: 9.4,
            surfaces: 9.1,
            eyeAppeal: 9.3
        },
        aiConfidence: 97.8,
        strikeDetails: "Well centered strike with subtle cheek friction contact tick",
        lusterType: "Vibrant Radial Luster",
        description: "Quick-graded via smartphone camera live feed utilizing the LCG Neural Model v4.2. Instant multi-frame surface photogrammetry determined sharp luster preservation with minor bag friction.",
        verificationHash: "9b3c4821a48e71884bc00192e4726bf9412ecba77291a03980183cbfa8910412",
        submitter: "Collector @DanCoins_CO"
    },
    {
        id: "lcg-ai-8291034",
        certNumber: "LCG-AI-8291034",
        title: "1922 Peace Silver Dollar",
        year: 1922,
        mintMark: "P",
        denomination: "$1 Silver Dollar",
        composition: "90% Silver, 10% Copper",
        grade: "AU 58",
        sheldonScore: 58.0,
        gradeType: "About Uncirculated",
        source: "mobile_ai",
        sourceLabel: "AI Mobile QuickGrade",
        badgeColor: "cyan",
        slabImage: "./assets/images/peace_dollar_slab.jpg",
        obverseImage: "./assets/images/peace_dollar_slab.jpg",
        reverseImage: "./assets/images/peace_dollar_slab.jpg",
        marketValue: 45,
        pedigree: "Mobile QuickScan #8291",
        certifiedDate: "2026-10-01",
        population: 520,
        populationHigher: 310,
        subgrades: {
            strike: 8.8,
            luster: 8.7,
            surfaces: 8.5,
            eyeAppeal: 8.9
        },
        aiConfidence: 96.5,
        strikeDetails: "Slight high-point friction on hair above temple and eagle wing",
        lusterType: "Residual Cartwheel",
        description: "Near uncirculated specimen evaluated in seconds from handheld mobile video feed. Retains 90% original mint bloom with only trace wear on the highest focal points.",
        verificationHash: "1a84f9328e104b288a91726ca482910b82736192847101838472910382741982",
        submitter: "Mobile App User #7712"
    },
    {
        id: "lcg-ai-7728190",
        certNumber: "LCG-AI-7728190",
        title: "1964 Kennedy 90% Silver Half Dollar",
        year: 1964,
        mintMark: "D",
        denomination: "50¢ Half Dollar",
        composition: "90% Silver, 10% Copper",
        grade: "MS 64+",
        sheldonScore: 64.5,
        gradeType: "Choice Uncirculated",
        source: "mobile_ai",
        sourceLabel: "AI Mobile QuickGrade",
        badgeColor: "cyan",
        slabImage: "./assets/images/walking_liberty_slab.jpg",
        obverseImage: "./assets/images/walking_liberty_slab.jpg",
        reverseImage: "./assets/images/walking_liberty_slab.jpg",
        marketValue: 32,
        pedigree: "Denver Bank Bag Find",
        certifiedDate: "2026-10-03",
        population: 418,
        populationHigher: 140,
        subgrades: {
            strike: 9.3,
            luster: 9.4,
            surfaces: 9.0,
            eyeAppeal: 9.2
        },
        aiConfidence: 98.2,
        strikeDetails: "Firm hair parting and full eagle breast shield details",
        lusterType: "Bright White Luster",
        description: "Scanned in-situ at a local coin fair using mobile optical telemetry. Verified pure 90% silver planchet profile with zero hairline circulation damage.",
        verificationHash: "4472910382910384729103827192837461928374659281726354819283746519",
        submitter: "NumisScan User #108"
    },
    {
        id: "lcg-ai-9918234",
        certNumber: "LCG-AI-9918234",
        title: "1986 American Silver Eagle 1oz",
        year: 1986,
        mintMark: "P",
        denomination: "$1 Bullion Coin",
        composition: "99.9% Pure Silver (1 Troy Oz)",
        grade: "MS 69",
        sheldonScore: 69.0,
        gradeType: "Near Perfect Mint State",
        source: "mobile_ai",
        sourceLabel: "AI Mobile QuickGrade",
        badgeColor: "cyan",
        slabImage: "./assets/images/walking_liberty_slab.jpg",
        obverseImage: "./assets/images/walking_liberty_slab.jpg",
        reverseImage: "./assets/images/walking_liberty_slab.jpg",
        marketValue: 120,
        pedigree: "Inaugural Bullion Issue",
        certifiedDate: "2026-10-05",
        population: 640,
        populationHigher: 42,
        subgrades: {
            strike: 9.9,
            luster: 9.8,
            surfaces: 9.8,
            eyeAppeal: 9.8
        },
        aiConfidence: 99.0,
        strikeDetails: "Virtually immaculate strike with pin-sharp stars and sun rays",
        lusterType: "Frosted Cameo Satin",
        description: "Key first-year issue of the world-standard American Silver Eagle. Evaluated via AI camera scan showing immaculate planchet quality with single minuscule rim contact.",
        verificationHash: "e58129a0e44b910ca843217983ea4081c746da9fa9280d85ec01b659c23984be",
        submitter: "Collector @StackerWest"
    },
    {
        id: "lcg-ai-1129384",
        certNumber: "LCG-AI-1129384",
        title: "1909 Lincoln Cent (First Year)",
        year: 1909,
        mintMark: "P",
        denomination: "1¢ Small Cent",
        composition: "95% Copper, 5% Tin & Zinc",
        grade: "VF 30",
        sheldonScore: 30.0,
        gradeType: "Very Fine",
        source: "mobile_ai",
        sourceLabel: "AI Mobile QuickGrade",
        badgeColor: "cyan",
        slabImage: "./assets/images/lincoln_cent_slab.jpg",
        obverseImage: "./assets/images/lincoln_cent_slab.jpg",
        reverseImage: "./assets/images/lincoln_cent_slab.jpg",
        marketValue: 18,
        pedigree: "Estate Whitman Album",
        certifiedDate: "2026-10-06",
        population: 1240,
        populationHigher: 980,
        subgrades: {
            strike: 7.8,
            luster: 5.4,
            surfaces: 7.2,
            eyeAppeal: 7.9
        },
        aiConfidence: 95.7,
        strikeDetails: "Even moderate wear on Lincoln cheekbone; wheat stalks clear",
        lusterType: "Even Chocolate Patina",
        description: "Honest circulation wear graded in real-time from mobile device. Demonstrates the AI's ability to accurately assign lower circulated grades without gradeflation.",
        verificationHash: "8827103948571029384756102938475610293847561029384756102938475610",
        submitter: "Mobile App User #8821"
    }
];

class CoinDatabase {
    constructor() {
        this.storageKey = "lcg_registered_coins_v1";
        this.coins = [];
        this.init();
    }

    init() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                const parsed = JSON.parse(stored);
                // Merge with initial DB in case of updates, keeping user-added items
                const userAdded = parsed.filter(c => !INITIAL_REGISTRY_DATABASE.some(init => init.id === c.id));
                this.coins = [...INITIAL_REGISTRY_DATABASE, ...userAdded];
            } else {
                this.coins = [...INITIAL_REGISTRY_DATABASE];
                this.save();
            }
        } catch (e) {
            this.coins = [...INITIAL_REGISTRY_DATABASE];
        }
    }

    save() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.coins));
        } catch (e) {
            console.error("Failed to save to localStorage", e);
        }
    }

    getAll() {
        return this.coins;
    }

    getById(id) {
        return this.coins.find(c => c.id === id || c.certNumber.toLowerCase() === id.toLowerCase());
    }

    getByCert(certNumber) {
        const clean = certNumber.trim().toLowerCase();
        return this.coins.find(c => c.certNumber.toLowerCase() === clean || c.id.toLowerCase() === clean);
    }

    addCoin(coinData) {
        this.coins.unshift(coinData);
        this.save();
        return coinData;
    }

    getStats() {
        const total = this.coins.length;
        const onsiteCount = this.coins.filter(c => c.source === 'onsite').length;
        const mobileCount = this.coins.filter(c => c.source === 'mobile_ai').length;
        const totalValue = this.coins.reduce((acc, curr) => acc + (curr.marketValue || 0), 0);
        return {
            total,
            onsiteCount,
            mobileCount,
            totalValue
        };
    }
}

window.coinDatabase = new CoinDatabase();
