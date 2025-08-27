"use client" 

import { useEffect, useState } from "react"
import { adminPostColumns } from "@/components/data-table/columns"
import { DataTable } from "@/components/data-table/data-table"
import { CalendarDays, Users, FileText, Eye, EyeOff, BookOpen, Bookmark, DollarSign, TrendingUp, Activity } from "lucide-react"
import { API_ENDPOINTS } from "@/lib/api"
import { DashboardStats, AdminPost } from "@/types/dashboard"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { VisitorsChart } from "@/components/VisitorsChart"

export default function Dashboard() {
    const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
    const [adminPosts, setAdminPosts] = useState<AdminPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                
                // Fetch dashboard statistics
                const statsResponse = await fetch(API_ENDPOINTS.dashboardStats, {
                    method: 'GET',
                    cache: "no-store",
                    credentials: 'include',
                });

                let dashboardStats = null;
                if (statsResponse.ok) {
                    const statsJson = await statsResponse.json();
                    if (statsJson.status === "success" && statsJson.data) {
                        dashboardStats = statsJson.data;
                    }
                }

                // Fetch admin posts
                const adminPostsUrl = `${API_ENDPOINTS.adminPosts}?limit=50`;
                const postsResponse = await fetch(adminPostsUrl, {
                    method: 'GET',
                    cache: "no-store",
                    credentials: 'include',
                });

                let adminPosts = [];
                if (postsResponse.ok) {
                    const postsJson = await postsResponse.json();
                    if (postsJson.status === "success" && postsJson.data?.posts) {
                        adminPosts = postsJson.data.posts;
                    }
                }
                
                setDashboardStats(dashboardStats);
                setAdminPosts(adminPosts);
                
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // Fallback values if API fails
    const stats = dashboardStats || {
        posts: { total: 0, active: 0, inactive: 0 },
        visits: { total: 0, average_per_post: 0 },
        activity: { recent_posts_30d: 0, engagement_rate: 0 }
    };

    if (loading) {
        return (
            <section className="w-full h-auto p-6 space-y-8">
                <div className="flex items-center justify-center h-64">
                    <p>Cargando dashboard...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full h-auto p-6 space-y-8">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Publicaciones Card */}
                <Card className="py-4 bg-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h2 className="">
                            Total Publicaciones
                        </h2>
                        <FileText className="h-6 w-6" />
                    </CardHeader>
                    <CardContent>
                        <h2 className="text-4xl">{stats.posts.total}</h2>
                        <div className="flex items-center pt-1 space-x-4 text-muted-foreground">
                            <div className="flex items-center">
                                <Eye className="mr-1 h-5 w-5" />
                                <span className="text-lg">{stats.posts.active} activas</span>
                            </div>
                            <div className="flex items-center">
                                <EyeOff className="mr-1 h-5 w-5" />
                                <span className="text-lg">{stats.posts.inactive} inactivas</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Visitas Card */}
                <Card className="py-4 bg-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h2 className="">
                            Total Visitas
                        </h2>
                        <Activity className="h-6 w-6" />
                    </CardHeader>
                    <CardContent>
                        <h2 className="text-4xl">{stats.visits.total.toLocaleString()}</h2>
                        <div className="flex items-center pt-1 space-x-4 text-muted-foreground">
                            <div className="flex items-center">
                                <TrendingUp className="mr-1 h-5 w-5" />
                                <span className="text-lg">{stats.visits.average_per_post} promedio</span>
                            </div>
                            <div className="flex items-center">
                                <CalendarDays className="mr-1 h-5 w-5" />
                                <span className="text-lg">{stats.activity.recent_posts_30d} este mes</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Revistas Card */}
                <Card className="py-4 bg-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h2 className="">
                            Revistas Digitales
                        </h2>
                        <BookOpen className="h-6 w-6" />
                    </CardHeader>
                    <CardContent>
                        <h2 className="text-4xl">12</h2>
                        <div className="flex items-center pt-1 space-x-4">
                            <div className="flex items-center">
                                <Bookmark className="mr-1 h-5 w-5" />
                                <span className="text-lg">8 publicadas</span>
                            </div>
                            <div className="flex items-center">
                                <CalendarDays className="mr-1 h-5 w-5" />
                                <span className="text-lg">4 en borrador</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Engagement Card */}
                <Card className="py-4 bg-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h2 className="">
                            Engagement
                        </h2>
                        <DollarSign className="h-6 w-6" />
                    </CardHeader>
                    <CardContent>
                        <h2 className="text-4xl">{stats.activity.engagement_rate}%</h2>
                        <div className="flex items-center pt-1 space-x-4">
                            <div className="flex items-center">
                                <TrendingUp className="mr-1 h-5 w-5" />
                                <span className="text-lg">Tasa</span>
                            </div>
                            <div className="flex items-center">
                                <Users className="mr-1 h-5 w-5" />
                                <span className="text-lg">Audiencia activa</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Visitors Chart */}
            <div className="grid gap-4">
                <VisitorsChart />
            </div>

            {/* Data Table */}
            <Card className="bg-white">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <h2>Gestión de Publicaciones</h2>
                    </CardTitle>
                    <CardDescription className="text-lg">
                        Administra y controla todas las publicaciones de tu plataforma digital. 
                        Mostrando {adminPosts.length} publicaciones en total.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable columns={adminPostColumns} data={adminPosts} />
                </CardContent>
            </Card>
        </section>
    )
}