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
                serif: [ "Times New Roman", "serif"],
                bree: ["var(--font-bree-serif)", "serif"],
            },
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                chart: {
                    "1": "hsl(var(--chart-1))",
                    "2": "hsl(var(--chart-2))",
                    "3": "hsl(var(--chart-3))",
                    "4": "hsl(var(--chart-4))",
                    "5": "hsl(var(--chart-5))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                'slide-in-left': {
                  '0%': { transform: 'translateX(-100%)' },
                  '100%': { transform: 'translateX(0)' },
                },
                'slide-in-right': {
                  '0%': { transform: 'translateX(100%)' },
                  '100%': { transform: 'translateX(0)' },
                },
                'flip-page': {
                  '0%': { transform: 'rotateY(0deg)' },
                  '100%': { transform: 'rotateY(180deg)' },
                },
            },
            animation: {
                'slide-in-left': 'slide-in-left 0.5s ease-out',
                'slide-in-right': 'slide-in-right 0.5s ease-out',
                'flip-page': 'flip-page 0.5s ease-out',
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config
