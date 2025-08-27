"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { usePathname } from "next/navigation"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'

// Configuración de rutas para breadcrumbs
const routeConfig: Record<string, { title: string; parent: string | null }> = {
    '/admin': {
        title: 'Dashboard Principal',
        parent: null
    },
    '/admin/gestionar-publicaciones': {
        title: 'Gestionar Artículos',
        parent: '/admin'
    },
    '/admin/nueva-publicacion': {
        title: 'Nuevo Artículo',
        parent: '/admin'
    },
    '/admin/editar-publicacion': {
        title: 'Editar Contenido',
        parent: '/admin'
    }
}

// Función para generar breadcrumbs
function generateBreadcrumbs(pathname: string | null) {
    if (!pathname) return []
    
    const breadcrumbs: Array<{ title: string; href: string; isBase: boolean }> = []
    let currentPath: string | null = pathname

    // Siempre agregar "Trapiche Digital" como base
    breadcrumbs.unshift({
        title: 'Trapiche Digital',
        href: '#',
        isBase: true
    })

    // Generar breadcrumbs desde la ruta actual hacia arriba
    while (currentPath && routeConfig[currentPath]) {
        const config: { title: string; parent: string | null } = routeConfig[currentPath]
        breadcrumbs.push({
            title: config.title,
            href: currentPath,
            isBase: false
        })
        currentPath = config.parent
    }

    return breadcrumbs
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname()
    const breadcrumbs = generateBreadcrumbs(pathname)

    return (
        <>
            <SidebarProvider className="">
                <AppSidebar />
                <main className="w-full h-auto overflow-hidden">
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                        <SidebarTrigger className="!h-5 !w-5"/>
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                {breadcrumbs.map((crumb, index) => (
                                    <div key={crumb.href} className="flex items-center">
                                        {index > 0 && <BreadcrumbSeparator />}
                                        <BreadcrumbItem>
                                            {index === breadcrumbs.length - 1 ? (
                                                <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
                                            ) : (
                                                <BreadcrumbLink href={crumb.href}>
                                                    {crumb.title}
                                                </BreadcrumbLink>
                                            )}
                                        </BreadcrumbItem>
                                    </div>
                                ))}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </header>
                    
                    <div className="max-w-[80rem] 3xl:max-w-[95rem] p-4 mx-auto">{children}</div>
                </main>
            </SidebarProvider>  
        </>
    )
}
