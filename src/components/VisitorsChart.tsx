"use client"

import { useEffect, useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    /* ChartLegend,
    ChartLegendContent, */
    ChartTooltip,
    /* ChartTooltipContent, */
} from '@/components/ui/chart'
/* import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select' */
import { TrendingUp, Activity, Eye } from "lucide-react"
import { API_ENDPOINTS } from "@/lib/api"
import { VisitData, TopPost } from "@/types/dashboard"

interface VisitorsData {
	daily_visits: VisitData[]
	top_posts: TopPost[]
	summary: {
		total_visits: number
		average_daily: number
		period: string
	}
}

const chartConfig = {
    visits: {
        label: "Visitas",
        color: "hsl(var(--primary))",
    },
} satisfies ChartConfig

export function VisitorsChart() {
	const [visitorsData, setVisitorsData] = useState<VisitorsData | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function fetchVisitorsData() {
			try {
				const response = await fetch(API_ENDPOINTS.visitsData, {
					cache: "no-store",
					credentials: "include",
				})

				if (response.ok) {
					const json = await response.json()
					if (json.status === "success" && json.data) {
						setVisitorsData(json.data)
					}
				}
			} catch (error) {
				console.error("Error fetching visitors data:", error)
			} finally {
				setLoading(false)
			}
		}

		fetchVisitorsData()
	}, [])

	if (loading) {
		return (
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
				<Card className="col-span-4 bg-white">
					<CardHeader>
						<h2>Visitas Diarias</h2>
					</CardHeader>
					<CardContent>
						<div className="h-[200px] flex items-center justify-center text-muted-foreground">
							Cargando datos de visitas...
						</div>
					</CardContent>
				</Card>
				<Card className="col-span-3 bg-white">
					<CardHeader>
						<h2>Publicaciones Populares</h2>
					</CardHeader>
					<CardContent>
						<div className="h-[200px] flex items-center justify-center text-muted-foreground">
							Cargando...
						</div>
					</CardContent>
				</Card>
			</div>
		)
	}

	const data = visitorsData?.daily_visits || []
	const topPosts = visitorsData?.top_posts || []
	const summary = visitorsData?.summary || { total_visits: 0, average_daily: 0, period: "Sin datos" }

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
			<Card className="col-span-4 bg-white">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<TrendingUp className="h-5 w-5" />
						<h2>Visitas Diarias</h2>
					</CardTitle>
					<CardDescription className="text-lg">
						{summary.period} - Promedio: {summary.average_daily} visitas/día
					</CardDescription>
				</CardHeader>
				<CardContent className="pl-2">
					<ChartContainer
                        config={chartConfig}
                        className="aspect-auto h-[250px] w-full"
                    >
						<AreaChart data={data}>
                            <defs>
                                <linearGradient id="fillVisits" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="5%"
                                        stopColor="#991b1b"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#991b1b"
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                            </defs>

							<CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted" />
							<XAxis
								dataKey="day"
								tick={{ fontSize: 12 }}
								className="text-muted-foreground"
							/>
							<YAxis
								domain={[0, 'dataMax']}
								tick={{ fontSize: 12 }}
								className="text-muted-foreground"
							/>
							<ChartTooltip
								content={({ active, payload /* , label */ }) => {
									if (active && payload && payload.length) {
										const data = payload[0].payload as VisitData
										return (
											<div className="rounded-lg border bg-background p-2 shadow-sm bg-zinc-100">
												<div className="grid grid-cols-2 gap-2">
													<div className="flex flex-col">
														<span className="text-[0.70rem] uppercase text-muted-foreground">
															Fecha
														</span>
														<span className="font-bold text-muted-foreground">
															{data.date}
														</span>
													</div>
													<div className="flex flex-col">
														<span className="text-[0.70rem] uppercase text-muted-foreground">
															Visitas
														</span>
														<span className="font-bold">
															{data.visits.toLocaleString()}
														</span>
													</div>
												</div>
											</div>
										)
									}
									return null
								}}
							/>
							<Area
								type="monotone"
								dataKey="visits"
								stroke="#ef4444"
								strokeWidth={2}
								fill="url(#fillVisits)"
								fillOpacity={0.6}
							/>
						</AreaChart>

					</ChartContainer>
				</CardContent>
			</Card>

			<Card className="col-span-3 bg-white">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Eye className="h-5 w-5" />
						<h2>Publicaciones Populares</h2>
					</CardTitle>
					<CardDescription className="text-lg">Top 10 por número de visitas</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-3 max-h-[200px] overflow-y-auto">
						{topPosts.length > 0 ? (
							topPosts.map((post, index) => (
								<div key={index} className="flex items-center justify-between space-x-2">
									<div className="flex-1 min-w-0">
										<p className="text-xl font-medium truncate">
											{post.titulo}
										</p>
										<p className="text-base text-muted-foreground">
											{post.created_at}
										</p>
									</div>
									<div className="flex items-center gap-1 text-sm font-medium">
										<Activity className="h-5 w-5 text-muted-foreground" />
										{post.visitas.toLocaleString()}
									</div>
								</div>
							))
						) : (
							<div className="text-center text-muted-foreground py-8">
								<Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
								<p>No hay datos de publicaciones</p>
							</div>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}