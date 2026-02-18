"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown, Edit, Trash2, Eye, EyeOff, Link } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, /* AvatarImage */ } from "@/components/ui/avatar"
import { toast } from "sonner"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,   
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AdminPost } from "@/types/dashboard"

export const adminPostColumns: ColumnDef<AdminPost>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "titulo",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="h-8 px-2"
                >
                    Título
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const post = row.original
            return (
                <div className="max-w-[300px]">
                    <div className="text-base truncate">{post.titulo}</div>
                    <div className="text-sm text-muted-foreground truncate">{post.subtitulo}</div>
                </div>
            )
        },
    },
    {
        accessorKey: "categoria",
        header: "Categoría",
        cell: ({ row }) => {
            return ( 
                <Badge variant="outline" className="font-normal text-base">
                    {row.getValue("categoria")}
                </Badge>
            )
        },
    },
    {
        accessorKey: "autor",
        header: "Autor",
        cell: ({ row }) => {
            const autor = row.getValue("autor") as AdminPost["autor"]
            return (
                <div className="flex items-center">
                    <Avatar className="h-8 w-8">
                        {/* <AvatarImage src={`https://avatar.vercel.sh/${autor.email}`} /> */}
                        <AvatarFallback className="text-xs bg-black text-white flex items-center justify-center rounded-full">
                            {autor.nombre.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="ml-2">
                        <div className="text-base font-medium">{autor.nombre}</div>
                        <div className="text-sm text-muted-foreground">{autor.email}</div>
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: "estado",
        header: "Estado",
        cell: ({ row }) => {
            const estado = row.getValue("estado") as number
            return (
                <Badge variant={estado === 1 ? "default" : "secondary"} className="font-normal text-base">
                    {estado === 1 ? (
                        <>
                            <Eye className="mr-1 h-4 w-4" />
                            Activa
                        </>
                    ) : (
                        <>
                            <EyeOff className="mr-1 h-4 w-4" />
                            Inactiva
                        </>
                    )}
                </Badge>
            )
        },
    },
    {
        accessorKey: "visitas",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="h-8 px-2"
                >
                    Visitas
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const visitas = row.getValue("visitas") as number
            return (
                <div className="text-center text-base">
                    {visitas.toLocaleString()}
                </div>
            )
        },
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="h-8 px-2"
                >
                    Fecha
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="text-base">
                    {row.getValue("created_at")}
                </div>
            )
        },
    },
    {
        id: "actions",
        header: () => <div className="text-right">Acciones</div>,
        cell: ({ row }) => {
            const post = row.original

            return (
                <div className="text-right">
                    <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-10 w-10 p-0">
                                <span className="sr-only">Abrir menú</span>
                                <MoreHorizontal className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[200px] bg-white shadow-sm">
                            <h2 className="px-2 py-2 text-base font-medium">Acciones</h2>
                            <DropdownMenuItem
                                onClick={() => {
                                    const fullLink = `${window.location.origin}/${post.slug}`;
                                    navigator.clipboard.writeText(fullLink);
                                    toast.success("Enlace copiado correctamente");
                                }}
                                className="hover:bg-gray-100 cursor-pointer transition-colors duration-150"
                            >
                                <Link className="mr-2 h-4 w-4" />
                                Copiar enlace
                            </DropdownMenuItem>
                            
                            <DropdownMenuItem
                                onClick={() => window.open(`/${post.slug}`, '_blank')}
                                className="hover:bg-gray-100 cursor-pointer transition-colors duration-150"
                            >
                                <Eye className="mr-2 h-4 w-4" />
                                Ver publicación
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => {
                                    window.location.href = `/admin/editar-publicacion?slug=${post.slug}`;
                                }}
                                className="hover:bg-gray-100 cursor-pointer transition-colors duration-150"
                            >
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600 hover:bg-red-50 hover:text-red-700 cursor-pointer transition-colors duration-150">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Eliminar
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
]
