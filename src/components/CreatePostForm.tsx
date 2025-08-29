"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation";
import { API_ENDPOINTS } from "@/lib/api";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { FileText, Tag, MapPin, X, Edit3, FileImage } from "lucide-react"
import styles from "@/styles/LoginForm.module.css"
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface PostData {
    id?: number;
    titulo: string;
    subtitulo: string;
    categoria: string;
    portada: string;
    contenido: string;
    resumen: string;
    estado: boolean | number;
    tags: string[] | string;
    autor?: {
        nombre: string;
        email: string;
    };
    slug?: string;
}

interface CreatedPost {
    id: number;
    titulo: string;
    subtitulo: string;
    estado: string;
    autor?: {
        nombre: string;
    };
    slug?: string;
}

interface TiptapEditor {
    commands: {
        setContent: (content: string) => void;
    };
}


export function CreatePostForm({
  className,
  initialData,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & { initialData?: PostData }) {
    const [newPost, setNewPost] = useState(() => {
        if (initialData) {
            return {
                titulo: initialData.titulo || "",
                subtitulo: initialData.subtitulo || "",
                categoria: initialData.categoria || "",
                portada: initialData.portada || "",
                contenido: initialData.contenido || "",
                resumen: initialData.resumen || "",
                estado: typeof initialData.estado === "boolean" ? initialData.estado : initialData.estado === 1,
                tags: typeof initialData.tags === "string" ? initialData.tags.split(",").map((t: string) => t.trim()).filter(Boolean) : initialData.tags || [],
            };
        }
        return {
            titulo: "", 
            subtitulo: "",
            categoria: "",
            portada: "",
            contenido: "",
            resumen: "",
            estado: true,
            tags: [],
        };
    });
    const [tagInput, setTagInput] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const [createdPost, setCreatedPost] = useState<CreatedPost | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const editorRef = useRef<TiptapEditor | null>(null);
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPost({
            ...newPost,
            [e.target.id]: e.target.value
        });
    };

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewPost({
            ...newPost,
            [e.target.id]: e.target.value
        });
    };

    const handleSwitchChange = (checked: boolean) => {
        setNewPost({
            ...newPost,
            estado: checked
        });
    };

    const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTagInput(e.target.value);
    };

    const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const trimmedTag = tagInput.trim();
            if (trimmedTag && !newPost.tags.includes(trimmedTag)) {
                setNewPost({
                    ...newPost,
                    tags: [...newPost.tags, trimmedTag]
                });
                setTagInput("");
            }
        }
    };

    const removeTag = (tagToRemove: string) => {
        setNewPost({
            ...newPost,
            tags: newPost.tags.filter((tag: string) => tag !== tagToRemove)
        });
    };

    const handleEditorReady = (editor: TiptapEditor) => {
        editorRef.current = editor;
    };

    const handleContentChange = (html: string) => {
        setNewPost(prev => ({
            ...prev,
            contenido: html
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});
        
        
        const postData = {
            titulo: newPost.titulo,
            subtitulo: newPost.subtitulo,
            categoria: newPost.categoria,
            portada: newPost.portada,
            contenido: newPost.contenido,
            resumen: newPost.resumen,
            tags: newPost.tags.join(', '), 
            estado: newPost.estado, 
        };

        console.log("Post data: ", postData);

        try {
            let response, result;
            if (initialData && initialData.id) {
                // Editar publicación existente
                response = await fetch(API_ENDPOINTS.updatePost, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        id_entrada: initialData.id,
                        ...postData,
                    }),
                });
                result = await response.json();
            } else {
                // Crear nueva publicación
                response = await fetch(API_ENDPOINTS.createPost, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify(postData),
                });
                result = await response.json();
            }

            if (response.ok && result.status === 'success') {
                // ✅ Éxito - Mostrar dialog de éxito
                setCreatedPost(result.data);
                setShowSuccessDialog(true);
            } else {
                const errorMsg = result.message || 'Error desconocido al guardar la publicación';
                setErrorMessage(errorMsg);
                setShowErrorDialog(true);
                // También mostrar error en el formulario si es específico
                if (response.status === 400) {
                    setErrors({ general: 'Por favor verifica que todos los campos estén completos correctamente.' });
                } else if (response.status === 401) {
                    setErrors({ general: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.' });
                } else {
                    setErrors({ general: 'Ocurrió un error inesperado. Por favor, intenta nuevamente.' });
                }
            }
        } catch (error) {
            setErrorMessage(`No se pudo conectar con el servidor. Verifica tu conexión a internet. ${error}`);
            setShowErrorDialog(true);
            setErrors({ general: 'Error de conexión con el servidor.'});
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setNewPost({
            titulo: "", 
            subtitulo: "",
            categoria: "",
            portada: "",
            contenido: "",
            resumen: "",
            estado: true,
            tags: [],
        });
        setTagInput("");
        setErrors({});
        // Limpiar el editor si está disponible
        if (editorRef.current) {
            editorRef.current.commands.setContent('');
        }
    };

    return (
        <div className={cn("flex flex-col gap-8", className)} {...props}>
            <form onSubmit={handleSubmit}>
                <div className="space-y-8">
                    <div className="flex flex-col items-center gap-2">
                        <h1 className="text-3xl font-bold text-gray-800">
                            {initialData && initialData.id ? "Actualizar Post" : "Crear Nueva Publicación"}
                        </h1>
                        <p className="text-gray-600">Completa los campos para {initialData && initialData.id ? "actualizar" : "crear"} tu publicación</p>
                    </div>
                    
                    {/* Formulario unificado */}
                    <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                        <div className="space-y-10">
                            {/* Sección 1: Estado de la Publicación */}
                            <div>
                                <h2 className="font-semibold mb-6 text-gray-800 border-b border-gray-200 pb-3">
                                    Estado de la Publicación
                                </h2>
                                <div className="gap-2 flex items-center justify-between">
                                    <Label
                                        htmlFor="estado" 
                                        className={`${styles.loginFormLabel} flex items-center gap-2 ${newPost.estado ? 'text-green-700' : 'text-gray-500'} font-medium`}
                                    >
                                        {newPost.estado ? 'Publicación Activa' : 'Publicación Inactiva'}
                                    </Label>
                                    <Switch
                                        checked={newPost.estado}
                                        onCheckedChange={handleSwitchChange}
                                        className={`transition-colors ${newPost.estado ? '[&>span]:bg-green-500 data-[state=checked]:bg-green-600' : '[&>span]:bg-gray-400 bg-gray-300'}`}
                                    />
                                </div>
                            </div>

                            {/* Sección 2: Información Básica */}
                            <div>
                                <h2 className="font-semibold mb-6 text-gray-800 border-b border-gray-200 pb-3">
                                    Información Básica
                                </h2>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="titulo" className={`${styles.loginFormLabel} flex items-center gap-2`}>
                                                <FileText size={16} />
                                                Título
                                            </Label>
                                            <Input
                                                id="titulo"
                                                type="text"
                                                placeholder="Título de la Publicación"
                                                required
                                                className={`${styles.loginFormInput} ${errors.titulo ? 'border-red-500' : 'border-gray-300'}`}
                                                value={newPost.titulo}
                                                onChange={handleInputChange}
                                            />
                                            {errors.titulo && <p className="text-red-500 text-sm">{errors.titulo}</p>}
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="categoria" className={`${styles.loginFormLabel} flex items-center gap-2`}>
                                                <MapPin size={16} />
                                                Categoría
                                            </Label>
                                            <Input
                                                id="categoria"
                                                type="text"
                                                placeholder="Ej: San Felipe Orizatlán, Molango, etc."
                                                className={`${styles.loginFormInput} ${errors.categoria ? 'border-red-500' : 'border-gray-300'}`}
                                                value={newPost.categoria}
                                                onChange={handleInputChange}
                                            />
                                            {errors.categoria && <p className="text-red-500 text-sm">{errors.categoria}</p>}
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="subtitulo" className={`${styles.loginFormLabel} flex items-center gap-2`}>
                                            <Edit3 size={16} />
                                            Subtítulo
                                        </Label>
                                        <Input
                                            id="subtitulo"
                                            type="text"
                                            placeholder="Subtítulo de la Publicación"
                                            required
                                            className={`${styles.loginFormInput} ${errors.subtitulo ? 'border-red-500' : 'border-gray-300'}`}
                                            value={newPost.subtitulo}
                                            onChange={handleInputChange}
                                        />
                                        {errors.subtitulo && <p className="text-red-500 text-sm">{errors.subtitulo}</p>}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="portada" className={`${styles.loginFormLabel} flex items-center gap-2`}>
                                            <FileImage size={16} />
                                            Imagen de Portada
                                        </Label>
                                        <Input
                                            id="portada"
                                            type="url"
                                            placeholder="https://ejemplo.com/imagen.jpg"
                                            required
                                            className={`${styles.loginFormInput} ${errors.portada ? 'border-red-500' : 'border-gray-300'}`}
                                            value={newPost.portada}
                                            onChange={handleInputChange}
                                        />
                                        {errors.portada && <p className="text-red-500 text-sm">{errors.portada}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Sección 3: Contenido */}
                            <div>
                                <h2 className="font-semibold mb-6 text-gray-800 border-b border-gray-200 pb-3">
                                    Contenido de la Publicación
                                </h2>
                                <div className="space-y-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="contenido" className={`${styles.loginFormLabel} flex items-center gap-2`}>
                                            <FileText size={16} />
                                            Contenido Principal
                                        </Label>
                                        <div className="border border-black rounded-lg p-1">
                                            <SimpleEditor 
                                                onEditorReady={handleEditorReady}
                                                onContentChange={handleContentChange}
                                                className="border-none"
                                                placeholder="Escribe aquí el contenido principal de tu publicación. Puedes usar formato de texto, agregar imágenes, listas y más..."
                                                initialContent={newPost.contenido}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="resumen" className={`${styles.loginFormLabel} flex items-center gap-2`}>
                                            <FileText size={16} />
                                            Resumen ({newPost.resumen.length}/500)
                                        </Label>
                                        <Textarea
                                            id="resumen"
                                            placeholder="Resumen breve de la publicación para SEO y redes sociales"
                                            maxLength={500}
                                            rows={4}
                                            className={`${styles.loginFormInput} ${errors.resumen ? 'border-red-500' : 'border-gray-300'}`}
                                            value={newPost.resumen}
                                            onChange={handleTextareaChange}
                                        />
                                        {errors.resumen && <p className="text-red-500 text-sm">{errors.resumen}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Sección 4: Tags */}
                            <div>
                                <h2 className="font-semibold mb-6 text-gray-800 border-b border-gray-200 pb-3">
                                    Tags y Etiquetas
                                </h2>
                                <div className="grid gap-4">
                                    <Label htmlFor="tags" className={`${styles.loginFormLabel} flex items-center gap-2`}>
                                        <Tag size={16} />
                                        Tags (presiona Enter para agregar)
                                    </Label>
                                    {newPost.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                            {newPost.tags.map((tag: string, index: number) => (
                                                <Badge 
                                                    key={index} 
                                                    variant="secondary" 
                                                    className="cursor-pointer bg-black hover:bg-red-500 text-white transition-colors duration-200 flex items-center gap-1 text-base px-3 py-1 font-light"
                                                    onClick={() => removeTag(tag)}
                                                >
                                                    {tag} <X size={12} />
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                    <Input
                                        id="tags"
                                        type="text"
                                        placeholder="Escribe un tag y presiona Enter (ej: política, deportes, cultura)"
                                        className={`${styles.loginFormInput} border-gray-300`}
                                        value={tagInput}
                                        onChange={handleTagInputChange}
                                        onKeyPress={handleTagKeyPress}
                                    />
                                    <p className="text-sm text-gray-600">💡 Los tags ayudan a categorizar tu contenido y mejorar el SEO</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mensaje de error general */}
                    {errors.general && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-red-700 text-sm">{errors.general}</p>
                        </div>
                    )}

                    {/* Botón de envío */}
                    <div className="flex justify-center pt-4">
                        <Button 
                            type="submit" 
                            className={`${styles.loginFormButton} flex items-center justify-center gap-2 px-8 py-3 text-lg font-medium transition-all duration-200 hover:shadow-lg`}
                            disabled={!newPost.titulo || !newPost.contenido || isSubmitting}
                        >
                            {isSubmitting
                                ? (initialData && initialData.id ? "Actualizando..." : "Creando...")
                                : (initialData && initialData.id ? "Actualizar Publicación" : "Crear Publicación")}
                        </Button>
                    </div>
                </div>
            </form>

            {/* Dialog de Éxito */}
            <AlertDialog open={showSuccessDialog} onOpenChange={(open) => open && setShowSuccessDialog(open)}>
                <AlertDialogContent className="bg-white border border-gray-200 shadow-lg">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-2xl font-bold text-gray-800 mb-2">
                            {initialData && initialData.id ? "¡Publicación actualizada correctamente!" : "¡Publicación creada exitosamente!"}
                        </AlertDialogTitle>
                        <hr className="border-gray-200 mb-4" />
                        {/* <AlertDialogDescription> */}
                            {createdPost && (
                                <div className="space-y-3">
                                    <div className="">
                                        <p className="mb-2">{createdPost.titulo}</p>
                                        <p className="text-lg mb-2">{createdPost.subtitulo}</p>
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className={`px-2 py-1 rounded text-xs ${createdPost.estado === 'Activa' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'}`}>
                                                {createdPost.estado}
                                            </span>
                                            <span>•</span>
                                            <span>Por {createdPost.autor?.nombre}</span>
                                        </div>
                                    </div>
                                    <div className="">
                                        <p><code className="bg-gray-100 px-1 py-0.5 rounded text-xs">{`${window.location.origin}/${createdPost.slug || createdPost.id}`}</code></p>
                                    </div>
                                </div>
                            )}
                        {/* </AlertDialogDescription> */}
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex gap-2">
                        <AlertDialogAction
                            onClick={() => {
                                setShowSuccessDialog(false);
                                resetForm();
                                router.push('/admin');
                            }}
                            className={`${styles.loginFormButton} flex-1`}
                        >
                            Aceptar
                        </AlertDialogAction>
                        <AlertDialogCancel
                            onClick={() => {
                                if (createdPost) {
                                    window.open(`${window.location.origin}/${createdPost.slug || createdPost.id}`, '_blank');
                                }
                                setShowSuccessDialog(false);
                            }}
                            className={`${styles.loginFormButton} flex-1`}
                        >
                            Ver Publicación
                        </AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Dialog de Error */}
            <AlertDialog open={showErrorDialog} onOpenChange={(open) => open && setShowErrorDialog(open)}>
                <AlertDialogContent className="bg-white border border-gray-200 shadow-lg">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-2xl font-bold text-gray-800 mb-2">
                            {initialData && initialData.id ? "Error al Actualizar Publicación" : "Error al Crear Publicación"}
                        </AlertDialogTitle>
                        <hr className="border-gray-200 mb-4" />
                        {/* <AlertDialogDescription> */}
                            <div className="space-y-2">
                                <p className="text-gray-700">{errorMessage}</p>
                                <div className="bg-red-50 border border-red-200 rounded p-3 mt-3">
                                    <p className="text-sm text-red-700">
                                        <strong>Qué puedes hacer:</strong>
                                    </p>
                                    <ul className="text-sm text-red-600 mt-1 ml-4 list-disc">
                                        <li>Verifica que todos los campos estén completos</li>
                                        <li>Asegúrate de que tu sesión siga activa</li>
                                        <li>Intenta nuevamente en unos segundos</li>
                                    </ul>
                                </div>
                            </div>
                        {/* </AlertDialogDescription> */}
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction
                            onClick={() => setShowErrorDialog(false)}
                            className={`${styles.loginFormButton}`}
                        >
                            Entendido, Intentar de Nuevo
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}