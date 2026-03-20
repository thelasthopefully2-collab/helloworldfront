/**
 * i18n (Internationalization) Engine
 * - Detects user location via Geolocation API + reverse geocoding
 * - Maps country to language
 * - Applies translations to all [data-i18n] elements
 * - Provides a floating language selector for manual override
 */

(function () {
    'use strict';

    const STORAGE_KEY = 'fravega_lang';
    const DEFAULT_LANG = 'es';

    // Country code → language mapping
    const COUNTRY_LANG_MAP = {
        // Spanish-speaking
        AR: 'es', ES: 'es', MX: 'es', CO: 'es', CL: 'es', PE: 'es',
        VE: 'es', EC: 'es', GT: 'es', CU: 'es', BO: 'es', DO: 'es',
        HN: 'es', PY: 'es', SV: 'es', NI: 'es', CR: 'es', PA: 'es',
        UY: 'es', PR: 'es', GQ: 'es',
        // English-speaking
        US: 'en', GB: 'en', CA: 'en', AU: 'en', NZ: 'en', IE: 'en',
        ZA: 'en', JM: 'en', TT: 'en', IN: 'en', PH: 'en', SG: 'en',
        NG: 'en', KE: 'en', GH: 'en',
        // Portuguese-speaking
        BR: 'pt', PT: 'pt', AO: 'pt', MZ: 'pt',
        // French-speaking
        FR: 'fr', BE: 'fr', CH: 'fr', LU: 'fr', MC: 'fr',
        SN: 'fr', CI: 'fr', CM: 'fr', MG: 'fr', ML: 'fr',
        HT: 'fr', CD: 'fr'
    };

    /**
     * Get user coordinates from Geolocation API
     */
    function getUserCoordinates() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation not supported'));
                return;
            }
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                (error) => {
                    reject(error);
                },
                { timeout: 8000, maximumAge: 300000 }
            );
        });
    }

    /**
     * Reverse geocode coordinates to country code using BigDataCloud (free, no key)
     */
    async function getCountryFromCoords(lat, lng) {
        try {
            const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`;
            const response = await fetch(url);
            const data = await response.json();
            return data.countryCode || null;
        } catch (e) {
            console.warn('[i18n] Reverse geocoding failed:', e);
            return null;
        }
    }

    /**
     * Map country code to language
     */
    function getLanguageFromCountry(countryCode) {
        if (!countryCode) return DEFAULT_LANG;
        return COUNTRY_LANG_MAP[countryCode.toUpperCase()] || DEFAULT_LANG;
    }

    /**
     * Apply translations to all elements with [data-i18n]
     */
    function applyTranslations(lang) {
        if (!TRANSLATIONS || !TRANSLATIONS[lang]) {
            console.warn('[i18n] No translations for language:', lang);
            return;
        }

        const dict = TRANSLATIONS[lang];

        // Translate all data-i18n elements
        document.querySelectorAll('[data-i18n]').forEach((el) => {
            const key = el.getAttribute('data-i18n');
            if (dict[key] !== undefined) {
                el.textContent = dict[key];
            }
        });

        // Translate elements expecting HTML content
        document.querySelectorAll('[data-i18n-html]').forEach((el) => {
            const key = el.getAttribute('data-i18n-html');
            if (dict[key] !== undefined) {
                el.innerHTML = dict[key];
            }
        });

        // Translate placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (dict[key] !== undefined) {
                el.placeholder = dict[key];
            }
        });

        // Translate title attributes
        document.querySelectorAll('[data-i18n-title]').forEach((el) => {
            const key = el.getAttribute('data-i18n-title');
            if (dict[key] !== undefined) {
                el.title = dict[key];
            }
        });

        // Update html lang attribute
        document.documentElement.lang = lang;

        // Update the language selector if it exists
        const selector = document.getElementById('i18n-lang-select');
        if (selector) {
            selector.value = lang;
        }

        // Save preference
        localStorage.setItem(STORAGE_KEY, lang);

        console.log('[i18n] Language set to:', lang);
    }

    /**
     * Create the floating language selector widget
     */
    function createLanguageSelector() {
        // Don't create duplicates
        if (document.getElementById('i18n-lang-widget')) return;

        const widget = document.createElement('div');
        widget.id = 'i18n-lang-widget';
        widget.innerHTML = `
      <button id="i18n-lang-toggle" aria-label="Change language">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
        <span id="i18n-current-lang">ES</span>
      </button>
      <div id="i18n-lang-dropdown" class="i18n-hidden">
        <button class="i18n-lang-option" data-lang="es">
          <span class="i18n-flag">🇦🇷</span> Español
        </button>
        <button class="i18n-lang-option" data-lang="en">
          <span class="i18n-flag">🇬🇧</span> English
        </button>
        <button class="i18n-lang-option" data-lang="pt">
          <span class="i18n-flag">🇧🇷</span> Português
        </button>
        <button class="i18n-lang-option" data-lang="fr">
          <span class="i18n-flag">🇫🇷</span> Français
        </button>
      </div>
    `;

        // Inject styles
        const style = document.createElement('style');
        style.textContent = `
      #i18n-lang-widget {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 99999;
        font-family: 'Work Sans', 'Roboto', -apple-system, sans-serif;
      }

      #i18n-lang-toggle {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 16px;
        background: linear-gradient(135deg, #440099 0%, #871EE3 100%);
        color: #fff;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        box-shadow: 0 4px 16px rgba(68, 0, 153, 0.35);
        transition: transform 0.2s, box-shadow 0.2s;
      }

      #i18n-lang-toggle:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 24px rgba(68, 0, 153, 0.45);
      }

      #i18n-lang-toggle svg {
        flex-shrink: 0;
      }

      #i18n-lang-dropdown {
        position: absolute;
        bottom: calc(100% + 8px);
        right: 0;
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
        overflow: hidden;
        min-width: 180px;
        transition: opacity 0.2s, transform 0.2s;
        transform-origin: bottom right;
      }

      #i18n-lang-dropdown.i18n-hidden {
        opacity: 0;
        pointer-events: none;
        transform: scale(0.9) translateY(8px);
      }

      .i18n-lang-option {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        padding: 12px 16px;
        border: none;
        background: transparent;
        font-size: 14px;
        font-weight: 500;
        color: #333;
        cursor: pointer;
        transition: background 0.15s;
        text-align: left;
        font-family: inherit;
      }

      .i18n-lang-option:hover {
        background: #f3eaff;
        color: #440099;
      }

      .i18n-lang-option.i18n-active {
        background: #ede5ff;
        color: #440099;
        font-weight: 600;
      }

      .i18n-flag {
        font-size: 18px;
        line-height: 1;
      }
    `;

        document.head.appendChild(style);
        document.body.appendChild(widget);

        // Toggle dropdown
        const toggle = document.getElementById('i18n-lang-toggle');
        const dropdown = document.getElementById('i18n-lang-dropdown');

        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('i18n-hidden');
            updateActiveOption();
        });

        // Close on outside click
        document.addEventListener('click', () => {
            dropdown.classList.add('i18n-hidden');
        });

        dropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Language option clicks
        dropdown.querySelectorAll('.i18n-lang-option').forEach((btn) => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                applyTranslations(lang);
                updateCurrentLabel(lang);
                updateActiveOption();
                dropdown.classList.add('i18n-hidden');
            });
        });

        function updateCurrentLabel(lang) {
            const label = document.getElementById('i18n-current-lang');
            if (label) label.textContent = lang.toUpperCase();
        }

        function updateActiveOption() {
            const currentLang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
            dropdown.querySelectorAll('.i18n-lang-option').forEach((btn) => {
                btn.classList.toggle('i18n-active', btn.getAttribute('data-lang') === currentLang);
            });
        }

        // Set initial label
        const currentLang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
        updateCurrentLabel(currentLang);
    }

    /**
     * Main initialization
     */
    async function initI18n() {
        // 1. Check localStorage for saved preference
        const savedLang = localStorage.getItem(STORAGE_KEY);

        if (savedLang && TRANSLATIONS[savedLang]) {
            // Use saved preference right away
            applyTranslations(savedLang);
            createLanguageSelector();
            return;
        }

        // 2. No saved preference — try geolocation
        try {
            const coords = await getUserCoordinates();
            const countryCode = await getCountryFromCoords(coords.lat, coords.lng);
            const lang = getLanguageFromCountry(countryCode);
            console.log('[i18n] Detected country:', countryCode, '→ language:', lang);
            applyTranslations(lang);
        } catch (err) {
            console.log('[i18n] Geolocation unavailable, using default language:', DEFAULT_LANG);
            applyTranslations(DEFAULT_LANG);
        }

        // 3. Always show the selector
        createLanguageSelector();
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initI18n);
    } else {
        initI18n();
    }

    // Expose for use by dynamic content (e.g. cart.js renders HTML dynamically)
    window.i18n = {
        apply: applyTranslations,
        getCurrentLang: function () {
            return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
        },
        t: function (key) {
            const lang = this.getCurrentLang();
            if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
                return TRANSLATIONS[lang][key];
            }
            if (TRANSLATIONS[DEFAULT_LANG] && TRANSLATIONS[DEFAULT_LANG][key]) {
                return TRANSLATIONS[DEFAULT_LANG][key];
            }
            return key;
        }
    };
})();
