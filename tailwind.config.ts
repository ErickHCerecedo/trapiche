import type { Config } from "tailwindcss"

export default {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@shadcn/ui/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                heroImage: "url('/bg.png')",
                linearGradient: "linear-gradient(to left, white, black)",
            },
            fontFamily: {
                sans: ["var(--font-main)","Arial","Helvetica","sans-serif"],
                serif: [ "var(--font-titulos)", "Times New Roman", "serif"],
                bree: ["var(--font-bree-serif)", "serif"],
            },
        },
    },
    plugins: [require('tailwindcss-animated')],
} satisfies Config
