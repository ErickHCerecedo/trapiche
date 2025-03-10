import type { Metadata } from "next"

//import Header from "@/components/Header"
//import Footer from "@/components/Footer"

import { breeSerif, RobotoSans, BenthamSerif } from "@/styles/fonts"

import "@/app/globals.css"

export const metadata: Metadata = {
    title: "Trapiche Digital",
    description: "Esencia Informativa",
    icons: {
        icon: "/icon.png",
        apple: "/apple-icon.png",
    }
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`${RobotoSans.variable} ${BenthamSerif.variable} ${breeSerif.variable} antialiased`}>
                {/* <Header /> */}
                    {children}
                {/* <Footer /> */}
            </body>
        </html>
    )
}
