"use client"

import { useEffect, useState } from "react"
import { adminPostColumns } from "@/components/data-table/columns"
import { DataTable } from "@/components/data-table/data-table"
import { FileText, Plus } from "lucide-react"
import { API_ENDPOINTS } from "@/lib/api"
import { DashboardStats, AdminPost } from "@/types/dashboard"
import Link from "next/link"
import { Toaster } from "@/components/ui/sonner"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

export default function GestionarPublicaciones() {
    const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
    const [adminPosts, setAdminPosts] = useState<AdminPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch dashboard statistics
                const statsResponse = await fetch(API_ENDPOINTS.dashboardStats, {
                    method: 'GET',
                    cache: "no-store",
                    credentials: 'include',
                });

                let stats = null;
                if (statsResponse.ok) {
                    const statsJson = await statsResponse.json();
                    if (statsJson.status === "success" && statsJson.data) {
                        stats = statsJson.data;
                    }
                }

                // Fetch all admin posts using total count or fallback
                const totalPosts = stats?.posts?.total || 1000;
                const adminPostsUrl = `${API_ENDPOINTS.adminPosts}?limit=${totalPosts}`;
                
                const postsResponse = await fetch(adminPostsUrl, {
                    method: 'GET',
                    cache: "no-store",
                    credentials: 'include',
                });

                let posts = [];
                if (postsResponse.ok) {
                    const postsJson = await postsResponse.json();
                    if (postsJson.status === "success" && postsJson.data?.posts) {
                        posts = postsJson.data.posts;
                    }
                }

                setDashboardStats(stats);
                setAdminPosts(posts);

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <section className="w-full h-auto p-6 space-y-6">
                <div className="flex items-center justify-center h-64">
                    <p>Cargando gestión de publicaciones...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full h-auto p-6 space-y-6">
             <Toaster />
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Gestión de Publicaciones</h1>
                    <p className="text-muted-foreground">
                        Administra y controla todas las publicaciones de tu plataforma digital
                    </p>
                </div>
                <Button asChild className="bg-black hover:bg-gray-800 text-white">
                    <Link href="/admin/nueva-publicacion">
                        <Plus className="mr-2 h-4 w-4" />
                        Nueva Publicación
                    </Link>
                </Button>
            </div>

            {/* Stats Summary */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h2 className="">
                            Total de Publicaciones
                        </h2>
                        <FileText className="h-6 w-6 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">{dashboardStats?.posts?.total || 0}</div>
                        {/* <p className="text-xs text-muted-foreground">
                            publicaciones en total
                        </p> */}
                    </CardContent>
                </Card>

                <Card className="bg-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h2 className="">
                            Publicaciones Activas
                        </h2>
                        <FileText className="h-6 w-6 " />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">{dashboardStats?.posts?.active || 0}</div>
                        {/* <p className="text-xs text-muted-foreground">
                            publicaciones visibles
                        </p> */}
                    </CardContent>
                </Card>

                <Card className="bg-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h2 className="">
                            Publicaciones Inactivas
                        </h2>
                        <FileText className="h-6 w-6 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">{dashboardStats?.posts?.inactive || 0}</div>
                        {/* <p className="text-xs text-muted-foreground">
                            publicaciones ocultas
                        </p> */}
                    </CardContent>
                </Card>
            </div>

            {/* Data Table */}
            <Card className="bg-white">
                <CardHeader>
                    <h2 className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Todas las Publicaciones
                    </h2>
                    <CardDescription className="text-lg">
                        Lista completa de publicaciones con herramientas de búsqueda, filtrado y gestión.
                        Mostrando {adminPosts.length} de {dashboardStats?.posts?.total || 0} publicaciones.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable columns={adminPostColumns} data={adminPosts} />
                </CardContent>
            </Card>
        </section>
    )
}