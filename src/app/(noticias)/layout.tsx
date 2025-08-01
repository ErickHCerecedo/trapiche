//import type { Metadata } from "next"
import Footer from "@/components/Footer"
import Header from "@/components/Header"

//import { breeSerif, RobotoSans, BenthamSerif } from "@/styles/fonts"

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            {/* <html lang="en">
            <body className={`${RobotoSans.variable} ${BenthamSerif.variable} ${breeSerif.variable} antialiased`}> */}
            <Header />
            {children}
            <Footer />
            {/*  </body>
        </html> */}
        </>
    )
}
