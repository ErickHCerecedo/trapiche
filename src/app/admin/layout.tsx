"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <>
            <SidebarProvider className="">
                <AppSidebar />
                <main className="w-full">
                    <SidebarTrigger />
                    {children}
                </main>
            </SidebarProvider>  
        </>
    )
}
