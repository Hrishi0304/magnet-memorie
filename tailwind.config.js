/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-tertiary-fixed-variant": "#614000",
        "secondary-container": "#da3433",
        "on-tertiary-fixed": "#291800",
        "tertiary-fixed": "#ffddb0",
        "tertiary": "#000000",
        "magnet-red": "#D32F2F",
        "on-error": "#ffffff",
        "surface-bright": "#fcf9f3",
        "inverse-on-surface": "#f3f0ea",
        "on-surface-variant": "#444748",
        "secondary-fixed": "#ffdad6",
        "tertiary-fixed-dim": "#fdba4e",
        "tertiary-container": "#291800",
        "on-secondary-fixed-variant": "#930010",
        "outline": "#747878",
        "secondary-fixed-dim": "#ffb3ac",
        "surface-container-low": "#f6f3ed",
        "on-primary-container": "#858383",
        "on-error-container": "#93000a",
        "surface-variant": "#e5e2dc",
        "surface-container-high": "#ebe8e2",
        "on-surface": "#1c1c18",
        "inverse-primary": "#c8c6c5",
        "primary": "#000000",
        "on-secondary": "#ffffff",
        "background": "#fcf9f3",
        "surface-container": "#f0eee8",
        "off-white-cream": "#F9F6F0",
        "on-secondary-fixed": "#410003",
        "surface-container-lowest": "#ffffff",
        "outline-variant": "#c4c7c7",
        "inverse-surface": "#31312d",
        "deep-onyx": "#1A1A1A",
        "surface-tint": "#5f5e5e",
        "on-tertiary": "#ffffff",
        "surface-dim": "#dcdad4",
        "on-primary-fixed": "#1c1b1b",
        "primary-fixed-dim": "#c8c6c5",
        "on-primary": "#ffffff",
        "error": "#ba1a1a",
        "surface": "#fcf9f3",
        "on-secondary-container": "#fffbff",
        "secondary": "#b6171e",
        "on-tertiary-container": "#b17907",
        "on-background": "#1c1c18",
        "memory-gold": "#C2871C",
        "primary-container": "#1c1b1b",
        "surface-container-highest": "#e5e2dc",
        "primary-fixed": "#e5e2e1",
        "error-container": "#ffdad6",
        "on-primary-fixed-variant": "#474746"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "margin-desktop": "2.5rem",
        "container-max": "1280px",
        "gutter": "1.5rem",
        "stack-sm": "0.5rem",
        "stack-md": "1rem",
        "stack-lg": "2rem",
        "margin-mobile": "1rem"
      },
      fontFamily: {
        "body-md": ["Hanken Grotesk"],
        "label-sm": ["Hanken Grotesk"],
        "body-lg": ["Hanken Grotesk"],
        "headline-lg-mobile": ["Outfit"],
        "headline-md": ["Outfit"],
        "headline-lg": ["Outfit"],
        "label-md": ["Hanken Grotesk"],
        "display-lg": ["Outfit"]
      },
      fontSize: {
        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
        "label-sm": ["12px", { "lineHeight": "16px", "fontWeight": "500" }],
        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
        "headline-lg-mobile": ["28px", { "lineHeight": "36px", "fontWeight": "700" }],
        "headline-md": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
        "headline-lg": ["32px", { "lineHeight": "40px", "fontWeight": "700" }],
        "label-md": ["14px", { "lineHeight": "20px", "letterSpacing": "0.05em", "fontWeight": "600" }],
        "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }]
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    },
  ],
}
