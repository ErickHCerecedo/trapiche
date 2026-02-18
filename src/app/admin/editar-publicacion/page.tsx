"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CreatePostForm } from '@/components/CreatePostForm';
import { API_ENDPOINTS } from '@/lib/api';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PostData {
    id: number;
    slug: string;
    titulo: string;
    subtitulo: string;
    contenido: string;
    categoria: string;
    portada: string;
    resumen: string;
    tags: string;
    autor: {
        id: number;
        nombre: string;
        email: string;
    };
    created_at: string;
    updated_at: string;
    estado: number;
    visitas: number;
}

// ✅ Componente que contiene la lógica con useSearchParams
function EditarPublicacionContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [slug, setSlug] = useState<string | null>(null);
    const [showDialog, setShowDialog] = useState(false);
    const [inputSlug, setInputSlug] = useState("");
    const [loading, setLoading] = useState(false);
    const [postData, setPostData] = useState<PostData | null>(null);

    useEffect(() => {
        const paramSlug = searchParams ? searchParams.get("slug") : null;
        if (paramSlug) {
            setSlug(paramSlug);
        } else {
            setShowDialog(true);
        }
    }, [searchParams]);

    useEffect(() => {
        if (slug) {
            setLoading(true);
            fetch(API_ENDPOINTS.getPostBySlug(slug), {
                credentials: 'include',
                cache: 'no-store'
            })
            .then(res => res.json())
            .then(data => {
                console.log("Datos de publicación:", data);
                if (data.status === 'success' && data.data) {
                    setPostData(data.data);
                } else {
                    setPostData(null);
                }
            })
            .catch(err => {
                console.error("Error al obtener publicación:", err);
                setPostData(null);
            })
            .finally(() => setLoading(false));
        }
    }, [slug]);

    const handleDialogSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputSlug.trim()) {
            setSlug(inputSlug.trim());
            setShowDialog(false);
        }
    };

    const handleDialogClose = () => {
        setShowDialog(false);
        router.back(); // Regresa a la página anterior
    };

    return (
        <div className='w-full flex justify-center items-center'>
            {showDialog && (
                <Dialog open={showDialog} onOpenChange={handleDialogClose}>
                    <DialogContent className="bg-white">
                        <DialogHeader>
                            <DialogTitle>Ingresa el slug de la publicación a editar</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleDialogSubmit} className="flex flex-col gap-4">
                            <Input
                                placeholder="Ejemplo: feria-san-felipe-orizatlan-2025-03-05"
                                value={inputSlug}
                                onChange={e => setInputSlug(e.target.value)}
                                required
                            />
                            <Button type="submit" className="bg-black text-white">Buscar publicación</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            )}
            {loading ? (
                <div className="w-full flex justify-center items-center h-96">
                    <div className="flex flex-col items-center gap-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                        <span className="text-lg text-gray-500">Cargando publicación...</span>
                    </div>
                </div>
            ) : (
                <CreatePostForm className='w-[70rem]' initialData={postData ?? undefined} />
            )}
        </div>
    );
}

// ✅ Componente de loading para mostrar mientras se resuelve useSearchParams
function EditarPublicacionLoading() {
    return (
        <div className='w-full flex justify-center items-center h-96'>
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
                <span className="text-xl text-gray-500">Inicializando editor...</span>
                <p className="text-sm text-gray-400">Preparando la interfaz de edición</p>
            </div>
        </div>
    );
}

// ✅ Componente principal que envuelve todo en Suspense
export default function EditarPublicacionPage() {
    return (
        <Suspense fallback={<EditarPublicacionLoading />}>
            <EditarPublicacionContent />
        </Suspense>
    );
}