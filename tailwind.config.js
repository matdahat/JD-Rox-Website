/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#F0EFF4',
                primary: '#0A0A14',
                accent: '#FF1A1A',
                textDark: '#18181B'
            },
            fontFamily: {
                sans: ['"Sora"', 'sans-serif'],
                impact: ['"Impact"', 'sans-serif'],
                mono: ['"Fira Code"', 'monospace'],
            },
        },
    },
    plugins: [],
}
