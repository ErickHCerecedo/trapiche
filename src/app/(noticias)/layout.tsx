//import type { Metadata } from "next"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

//import { breeSerif, RobotoSans, BenthamSerif } from "@/styles/fonts"

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <Header />
                {children}
            <Footer />
        </>
    )
}