import { Bree_Serif, Roboto, Baskervville, Kaisei_Opti } from "next/font/google"

export const RobotoSans = Roboto({
    variable: "--font-main",
    weight: ["400"],
    subsets: ["latin"],
})

export const BenthamSerif = Kaisei_Opti({
    variable: "--font-titulos",
    weight: ["400", "500", "700"],
    subsets: ["latin"],
})

export const breeSerif = Bree_Serif({
    variable: "--font-bree-serif",
    subsets: ["latin"],
    weight: ["400"],
})
