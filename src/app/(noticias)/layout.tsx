import type { Metadata } from "next"
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