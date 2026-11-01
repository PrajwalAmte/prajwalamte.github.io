/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        ink: 'var(--ink)',
        body: 'var(--body)',
        muted: 'var(--muted)',
        faint: 'var(--faint)',
        surface: 'var(--surface)',
        chip: 'var(--chip)',
        'chip-ink': 'var(--chip-ink)',
        hover: 'var(--hover)',
        rule: 'var(--rule)',
        'rule-strong': 'var(--rule-strong)',
        accent: 'var(--accent)',
        fill: 'var(--fill)',
        'fill-hover': 'var(--fill-hover)',
        'on-fill': 'var(--on-fill)',
        wash: 'var(--wash)',
        'wash-strong': 'var(--wash-strong)',
      },
    },
  },
  plugins: [],
};
