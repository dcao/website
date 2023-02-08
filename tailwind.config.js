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
        }

    },
    plugins: [],
}
