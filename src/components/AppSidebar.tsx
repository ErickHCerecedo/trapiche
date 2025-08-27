
"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

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

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
    LayoutDashboard, 
    FileStack, 
    FilePlus2, 
    FilePenLine, 
    MoreHorizontal, 
    User, 
    LogOut 
} from "lucide-react"

import { API_ENDPOINTS } from "@/lib/api"
import { User as UserType } from "@/types/dashboard"
import styles from "@/styles/Sidebar.module.css"

const menuItems = [
    {
        title: "Gestionar Artículos",
        url: "/admin/gestionar-publicaciones",
        icon: FileStack,
    },
    {
        title: "Nuevo Artículo",
        url: "/admin/nueva-publicacion",
        icon: FilePlus2,
    },
    {
        title: "Editar Contenido",
        url: "/admin/editar-publicacion",
        icon: FilePenLine,
    },
    /* {
        title: "Papelera",
        url: "#",
        icon: FileX2,
    }, */
]

export function AppSidebar() {
    const pathname = usePathname()
    const [user, setUser] = useState<UserType | null>(null)
    const [loading, setLoading] = useState(true)
    
    // Check if a route is active
    const isActive = (url: string) => {
        if (!pathname) return false
        
        if (url === "/admin") {
            return pathname === "/admin"
        }
        return pathname === url || pathname.startsWith(url)
    }
    
    // Fetch user data
    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await fetch(API_ENDPOINTS.userProfile, {
                    credentials: 'include',
                    cache: 'no-store'
                })
                
                if (response.ok) {
                    const json = await response.json()
                    if (json.status === 'success' && json.data?.user) {
                        setUser(json.data.user)
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error)
            } finally {
                setLoading(false)
            }
        }
        
        fetchUserData()
    }, [])
    
    // Handle logout
    const handleLogout = async () => {
        try {
            await fetch(API_ENDPOINTS.logout, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ action: 'logout' })
            })
            
            window.location.href = '/login'
        } catch (error) {
            console.error('Error during logout:', error)
        }
    }

    return (
        <Sidebar className={styles.sidebar}>
            <SidebarHeader className={styles.sidebarHeader}>
                <Image 
                    src="/logo-main.png" 
                    width={200} 
                    height={100} 
                    quality={80} 
                    alt="Trapiche" 
                    className={styles.sidebarLogo} 
                />
            </SidebarHeader>

            <SidebarContent>
                {/* Dashboard Principal */}
                <SidebarGroup>
                    <SidebarMenuButton 
                        className={`${styles.sidebarMenuButton} hover:bg-gray-100 hover:text-gray-900 ${
                            isActive("/admin") ? 'bg-black text-white' : ''
                        }`} 
                        asChild 
                        isActive={isActive("/admin")}
                    >
                        <Link href="/admin">
                            <LayoutDashboard />
                            <div>Dashboard Principal</div>
                        </Link>
                    </SidebarMenuButton>
                </SidebarGroup>

                {/* Gestión de Contenido */}
                <SidebarGroup>
                    <SidebarGroupLabel className={styles.sidebarGroupLabel}>
                        Gestión de Contenido
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton 
                                        className={`${styles.sidebarMenuButton}  ${
                                            isActive(item.url) ? 'bg-black text-white' : ''
                                        }`} 
                                        asChild
                                        isActive={isActive(item.url)}
                                    >
                                        <Link href={item.url} className="flex items-start">
                                            <item.icon />
                                            {item.title}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            
            {/* User Footer */}
            <SidebarFooter className="p-4 border-t">
                {loading ? (
                    <div className="flex items-center justify-center p-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900" />
                    </div>
                ) : user ? (
                    <div className={`${styles.sidebarFooter} group`}>
                        <div className="flex items-center min-w-0 flex-1">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback className="text-xs bg-black text-white flex items-center justify-center rounded-full">
                                    {user.nombre.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="ml-3 min-w-0 flex-1">
                                <div className="text-base font-medium text-gray-900 truncate">{user.nombre}</div>
                                <div className="text-xs text-gray-500 truncate">{user.email}</div>
                            </div>
                        </div>
                        
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-8 w-8 p-0 group-hover:bg-neutral-300 transition-opacity duration-200"
                                >
                                    <MoreHorizontal className="h-4 w-4 text-gray-900" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent 
                                align="end" 
                                className="w-56 bg-white shadow-lg border border-gray-200 rounded-lg p-1"
                            >
                                <DropdownMenuItem className="flex items-center px-3 py-2 text-base hover:bg-gray-50 rounded cursor-pointer transition-colors duration-150">
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Mi Cuenta</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                    onClick={handleLogout}
                                    className="flex items-center px-3 py-2 text-base text-red-600 hover:bg-red-50 rounded cursor-pointer transition-colors duration-150"
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Cerrar Sesión</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ) : (
                    <div className="text-center text-xs text-gray-500">
                        Error al cargar usuario
                    </div>
                )}
            </SidebarFooter>
        </Sidebar>
    )
}