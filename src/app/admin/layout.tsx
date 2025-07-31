"use client";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
        {/* <SessionProvider> */}
            {children}
        {/* </SessionProvider> */}     
        </>
    )
}
