import type { Config } from "tailwindcss"
import tailwindcssAnimated from "tailwindcss-animated";

export default {
    //darkMode: ["class"],
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
    			xl: '1280px',
    			'2xl': '1536px',
    			'3xl': '1920px',
    			'4xl': '2560px',
    			'5xl': '3840px',
    			'6xl': '5120px',
    			'7xl': '7680px'
    		},
    		
    	}
    },
	plugins: [tailwindcssAnimated],
} satisfies Config
