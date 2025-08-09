
import Link from "next/link"
import Image from "next/image"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader
} from "@/components/ui/sidebar"

import { LayoutDashboard, FileStack, FilePlus2, FileX2, FilePenLine } from "lucide-react"

import styles from "@/styles/Sidebar.module.css"

const items = [
{
title: "Ver todas",
url: "/admin/publicaciones",
icon: FileStack,
},
{
title: "Crear",
url: "/admin/nueva-publicacion",
icon: FilePlus2,
},
{
title: "Editar",
url: "#",
icon: FilePenLine,
},
{
title: "Eliminar",
url: "#",
icon: FileX2,
},
]

export function AppSidebar() {
    return (
    <Sidebar className={styles.sidebar}>
        <SidebarHeader className={styles.sidebarHeader} >
            <Image src="/logo-main.png" width={200} height={100} quality={80} alt="Trapiche" className={styles.sidebarLogo} />
        </SidebarHeader>

        <SidebarContent>
            <SidebarGroup >
                <SidebarMenuButton className={styles.sidebarMenuButton} asChild isActive>
                    <Link href="/admin" >
                        <LayoutDashboard />
                        Panel Informativo
                    </Link>
                </SidebarMenuButton>
            </SidebarGroup>

            <SidebarGroup >
                <SidebarGroupLabel className={styles.sidebarGroupLabel}>Publicaciones</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton className={styles.sidebarMenuButton} asChild>
                                    <Link href={item.url} className="flex items-start">
                                        <item.icon />
                                        {item.title}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup >
        </SidebarContent>
        
        <SidebarFooter />
    </Sidebar>
    )
}