/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./**/*.{html,md,11ty.js,liquid,njk,hbs,mustache,ejs,haml,pug}"],
    theme: {
        extend: {
            animation: {
                marquee: 'marquee 60s linear infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-50%)' }
                },
            },
            colors: {
                brown: {
                    50: '#fdf8f6',
                    100: '#f2e8e5',
                    200: '#eaddd7',
                    300: '#e0cec7',
                    400: '#d2bab0',
                    500: '#bfa094',
                    600: '#a18072',
                    700: '#977669',
                    800: '#846358',
                    900: '#43302b',
                },
                cream: "#faf6ea",
            },
        },
        fontFamily: {
            'space': ['"Space Grotesk"'],
            'serif': ['"PP Editorial New"'],
        },
    },
    plugins: [],
}
