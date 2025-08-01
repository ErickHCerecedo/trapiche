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
                sans: ["var(--font-main)", "Arial", "Helvetica", "sans-serif"],
                serif: ["var(--font-titulos)", "Times New Roman", "serif"],
                bree: ["var(--font-bree-serif)", "serif"],
            },
            screens: {
                xl: "1280px", // Define el punto de quiebre para xl
                "5xl": "1920px", // Define el punto de quiebre para 5xl
            },
            colors: {
                sidebar: {
                    DEFAULT: "hsl(var(--sidebar-background))",
                    foreground: "hsl(var(--sidebar-foreground))",
                    primary: "hsl(var(--sidebar-primary))",
                    "primary-foreground":
                        "hsl(var(--sidebar-primary-foreground))",
                    accent: "hsl(var(--sidebar-accent))",
                    "accent-foreground":
                        "hsl(var(--sidebar-accent-foreground))",
                    border: "hsl(var(--sidebar-border))",
                    ring: "hsl(var(--sidebar-ring))",
                },
            },
        },
    },
    plugins: [require("tailwindcss-animated")],
} satisfies Config
