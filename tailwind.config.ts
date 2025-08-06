import type { Config } from "tailwindcss"
import tailwindcssAnimated from "tailwindcss-animated";

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
				linearGradient: 'linear-gradient(to left, white, black)'
			},
			fontFamily: {
				sans: [
					'var(--font-main)',
					'Arial',
					'Helvetica',
					'sans-serif'
				],
				serif: [
					'var(--font-titulos)',
					'Times New Roman',
					'serif'
				],
				bree: [
					'var(--font-bree-serif)',
					'serif'
				]
			},
			screens: {
                xl: '1280px',       // Extra large (laptops/desktops)
                '2xl': '1536px',    // 2X large (large desktops) - Default Tailwind
                '3xl': '1920px',    // Full HD (1920x1080)
                '4xl': '2560px',    // 2K/QHD (2560x1440)
                '5xl': '3840px',    // 4K/UHD (3840x2160)
                '6xl': '5120px',    // 5K (5120x2880)
                '7xl': '7680px',    // 8K (7680x4320)
            },
			colors: {
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			}
		}
	},
	plugins: [tailwindcssAnimated],
} satisfies Config
