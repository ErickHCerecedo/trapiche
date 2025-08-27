"use client"

import * as React from "react"

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,  
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Columns3, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Settings } from "lucide-react"
/* import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select" */

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [pageSize, setPageSize] = React.useState(10)
    const [showSlider, setShowSlider] = React.useState(false)

    // Slider values mapping
    const pageSizeOptions = [5, 10, 20, 30, 50]
    const sliderValue = pageSizeOptions.indexOf(pageSize)
    
    const handleSliderChange = (value: number[]) => {
        setPageSize(pageSizeOptions[value[0]])
    }

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        initialState: {
            pagination: {
                pageSize: pageSize,
            },
        },
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    React.useEffect(() => {
        table.setPageSize(pageSize)
    }, [pageSize, table])

    // Close slider when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element
            if (showSlider && !target.closest('.slider-container')) {
                setShowSlider(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [showSlider])

    return (
        <div>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Buscar publicaciones..."
                    value={(table.getColumn("titulo")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("titulo")?.setFilterValue(event.target.value)
                    }
                    className="max-w-md !text-base border border-black focus:ring-transparent"
                />

                <div className="ml-auto flex items-center space-x-2">
                    {/* Botón de Filas por página */}
                    <div className="relative slider-container">
                        <Button 
                            variant="outline" 
                            onClick={() => setShowSlider(!showSlider)}
                            className="w-fit text-base font-light text-black bg-white border border-black hover:bg-red-950 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-950 transition-all duration-300 ease-in-out"
                        >
                            <Settings className="mr-2 h-4 w-4" />
                            Filas: {pageSize}
                        </Button>
                        
                        {/* Ventana flotante del slider */}
                        {showSlider && (
                            <div className="absolute top-full mt-2 left-0 z-50 min-w-[280px] p-4 bg-white border border-gray-200 rounded-lg shadow-lg animate-in slide-in-from-top-2 duration-200">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-gray-700">
                                            Filas por página
                                        </p>
                                        <span className="text-lg font-bold text-red-950">{pageSize}</span>
                                    </div>
                                    
                                    <div className="relative w-full">
                                        <div className="h-3 bg-gray-200 rounded-full">
                                            <div 
                                                className="h-3 bg-red-950 rounded-full transition-all duration-200"
                                                style={{ width: `${(sliderValue / (pageSizeOptions.length - 1)) * 100}%` }}
                                            ></div>
                                        </div>
                                        {/* Marcas de posición */}
                                        <div className="absolute top-0 w-full h-3 flex justify-between items-center">
                                            {pageSizeOptions.map((_, index) => (
                                                <div
                                                    key={index}
                                                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                                        index <= sliderValue ? 'bg-red-950' : 'bg-gray-300'
                                                    }`}
                                                ></div>
                                            ))}
                                        </div>
                                        <input
                                            type="range"
                                            min={0}
                                            max={pageSizeOptions.length - 1}
                                            value={sliderValue}
                                            onChange={(e) => handleSliderChange([parseInt(e.target.value)])}
                                            className="absolute inset-0 w-full h-3 bg-transparent appearance-none cursor-pointer
                                                      [&::-webkit-slider-thumb]:appearance-none 
                                                      [&::-webkit-slider-thumb]:w-4 
                                                      [&::-webkit-slider-thumb]:h-4 
                                                      [&::-webkit-slider-thumb]:rounded-full 
                                                      [&::-webkit-slider-thumb]:bg-black
                                                      [&::-webkit-slider-thumb]:cursor-pointer
                                                      [&::-webkit-slider-thumb]:border-0
                                                      [&::-webkit-slider-track]:bg-transparent
                                                      [&::-webkit-slider-track]:h-full
                                                      [&::-webkit-slider-track]:appearance-none
                                                      [&::-moz-range-thumb]:appearance-none
                                                      [&::-moz-range-thumb]:w-4
                                                      [&::-moz-range-thumb]:h-4
                                                      [&::-moz-range-thumb]:rounded-full
                                                      [&::-moz-range-thumb]:bg-black
                                                      [&::-moz-range-thumb]:border-none
                                                      [&::-moz-range-thumb]:cursor-pointer
                                                      [&::-moz-range-track]:bg-transparent
                                                      [&::-moz-range-track]:h-full
                                                      [&::-moz-range-track]:appearance-none"
                                        />
                                    </div>
                                    
                                    <div className="flex justify-between text-xs text-gray-500">
                                        {pageSizeOptions.map((size) => (
                                            <span key={size}>{size}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Botón de Columnas */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button 
                                variant="outline" 
                                className="w-fit text-base font-light text-black bg-white border border-black hover:bg-red-950 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-950 transition-all duration-300 ease-in-out"
                            >
                                <Columns3 className="mr-2 h-4 w-4" />
                                Columnas
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white shadow-sm border">
                            {table
                            .getAllColumns()
                            .filter(
                                (column) => column.getCanHide()
                            )
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize hover:bg-gray-100 cursor-pointer transition-colors duration-150"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                    >
                                        {column.id === "titulo" ? "Título" :
                                         column.id === "categoria" ? "Categoría" :
                                         column.id === "autor" ? "Autor" :
                                         column.id === "estado" ? "Estado" :
                                         column.id === "visitas" ? "Visitas" :
                                         column.id === "created_at" ? "Fecha" :
                                         column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                        )}
                                </TableHead>
                                )
                            })}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                                ))}
                            </TableRow>
                            ))
                        ) : (
                            <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between space-x-2 py-4">
                <div className="flex items-center space-x-4">
                    <div className="text-sm text-muted-foreground">
                        {table.getFilteredSelectedRowModel().rows.length} de{" "}
                        {table.getFilteredRowModel().rows.length} fila(s) seleccionadas.
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                        Mostrando {table.getRowModel().rows.length} de {table.getFilteredRowModel().rows.length} entradas
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <div className="text-sm text-muted-foreground mr-4">
                        Página {table.getState().pagination.pageIndex + 1} de{" "}
                        {table.getPageCount()}
                    </div>
                    
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                        className="w-fit text-sm font-light text-black bg-white border border-black hover:bg-red-950 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-950 transition-all duration-300 ease-in-out"
                    >
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="w-fit text-sm font-light text-black bg-white border border-black hover:bg-red-950 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-950 transition-all duration-300 ease-in-out"
                    >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Anterior
                    </Button>

                    {/* Page Numbers */}
                    <div className="flex items-center space-x-1">
                        {Array.from({ length: Math.min(5, table.getPageCount()) }, (_, i) => {
                            const pageCount = table.getPageCount()
                            const currentPage = table.getState().pagination.pageIndex
                            
                            let startPage = Math.max(0, currentPage - 2)
                            const endPage = Math.min(pageCount - 1, startPage + 4)
                            
                            if (endPage - startPage < 4) {
                                startPage = Math.max(0, endPage - 4)
                            }
                            
                            const pageIndex = startPage + i
                            
                            if (pageIndex > endPage) return null
                            
                            return (
                                <Button
                                    key={pageIndex}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => table.setPageIndex(pageIndex)}
                                    className={`w-8 h-8 p-0 text-sm font-light border border-black transition-all duration-300 ease-in-out ${
                                        pageIndex === currentPage
                                            ? 'bg-red-950 text-white'
                                            : 'text-black bg-white hover:bg-red-950 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-950'
                                    }`}
                                >
                                    {pageIndex + 1}
                                </Button>
                            )
                        })}
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="w-fit text-sm font-light text-black bg-white border border-black hover:bg-red-950 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-950 transition-all duration-300 ease-in-out"
                    >
                        Siguiente
                        <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                    
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                        className="w-fit text-sm font-light text-black bg-white border border-black hover:bg-red-950 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-950 transition-all duration-300 ease-in-out"
                    >
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
        
    )
}