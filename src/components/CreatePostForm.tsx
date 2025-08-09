"use client"

import { useState } from "react";
//import { useRouter } from "next/navigation";
//import { API_ENDPOINTS } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import styles from "@/styles/LoginForm.module.css";
import Tiptap from '../components/Tiptap'

export function CreatePostForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const [newPost, setNewPost] = useState({
        titulo: "", 
        subtitulo: "",
        portada: "",
        contenido: "",
    });
    //const [error, setError] = useState("");
    //const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPost({
            ...newPost,
            [e.target.id]: e.target.value
        });
    };

    // const handleContentChange = (html: string) => {
    //     setNewPost((prev) => ({ ...prev, contenido: html }));
    // };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí puedes usar newPost.contenido como el HTML del editor
        /* const response = await fetch(API_ENDPOINTS.createPost, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(newPost),
        });

        if (response.ok) {
            router.push('/nueva-publicacion')
        } else {
            const errorData = await response.json();
            setError(errorData.message || "Mensaje de Error");
        } */
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <a
                            href="#"
                            className="flex flex-col items-center gap-2 w-3/4 font-medium"
                        >
                            <div className="flex h-40 w-auto items-center justify-center rounded-md">
                                <Image
                                    src="/logo-main.png"
                                    width={200}
                                    height={100}
                                    quality={80}
                                    alt="Trapiche"
                                    className={styles.loginFormLogo}
                                />
                            </div>
                        </a>
                        <h1>
                            <span>Bienvenido de vuelta</span>
                        </h1>
                        <div className="text-center">
                            Inicie sesión al sitio administrativo de <br /> Trapiche Digital.
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email" className={styles.loginFormLabel}>
                                Titulo
                            </Label>
                            <Input
                            id="titulo"
                            type="text"
                            placeholder="Titulo de la Publicación"
                            required
                            className={styles.loginFormInput}
                            value={newPost.titulo}
                            onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password" className={styles.loginFormLabel}>
                                Subtitulo
                            </Label>
                            <Input
                            id="subtitulo"
                            type="text"
                            placeholder="Subtitulo de la Publicación"
                            required
                            className={styles.loginFormInput}
                            value={newPost.subtitulo}
                            onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="portada" className={styles.loginFormLabel}>
                                Portada
                            </Label>
                            <Input
                            id="portada"
                            type="text"
                            placeholder="URL de la imagen de portada"
                            required
                            className={styles.loginFormInput}
                            value={newPost.portada}
                            onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="contenido" className={styles.loginFormLabel}>
                                Contenido
                            </Label>
                            <Tiptap />
                        </div>
                        {/* {error && <p className="text-red-500">{error}</p>} */}
                        <Button type="submit" className={`w-full ${styles.loginFormButton}`}>
                            Crear Publicación
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}