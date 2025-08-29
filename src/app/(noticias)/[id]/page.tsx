import React from "react"
import Section from "@/components/Section"
import styles from "@/styles/Articulo.module.css"
import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/lib/formatDate"
import type { Metadata, ResolvingMetadata } from "next"
import CopyToClipboard from "@/components/CopyToClipboard"
import { API_ENDPOINTS } from "@/lib/api"
import { notFound } from "next/navigation";
import MediaDisplay from "@/components/MediaDisplay"
import Insignia from "@/components/ui/insignia"

import "@/components/tiptap-templates/simple/simple-editor.scss"
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss"
import "@/components/tiptap-node/code-block-node/code-block-node.scss"
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss"
import "@/components/tiptap-node/list-node/list-node.scss"
import "@/components/tiptap-node/image-node/image-node.scss"
import "@/components/tiptap-node/heading-node/heading-node.scss"
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss"

import '@/styles/_variables.scss'
import '@/styles/_keyframe-animations.scss'

export async function generateMetadata({
    params,
}:{
    params: Promise<{ id: string }>
}, parent: ResolvingMetadata): Promise<Metadata> {
    const id = (await params).id
    
    if (!id || id === 'undefined' || id === 'null') {
        return {
            title: 'Página no encontrada - Trapiche Digital',
            description: 'La página solicitada no existe.',
        };
    }

    try {
        const data = await fetch(API_ENDPOINTS.fetchPostById(id), {
            cache: "no-store",
            signal: AbortSignal.timeout(10000)
        });
        
        if (!data.ok) {
            console.log(`Metadata fetch failed: ${data.status} for ID: ${id}`);
            notFound();
        }
        
        const json = await data.json();

        if (json.status !== "success" || !json.data) {
            notFound();
        }
        
        const post = json.data;
        const previousImages = (await parent).openGraph?.images || []

        return {
            title: `${post.titulo} - Trapiche Digital`,
            description: post.resumen || post.subtitulo,
            openGraph: {
                title: post.titulo,
                description: post.resumen || post.subtitulo,
                images: [post.portada, ...previousImages],
                url: `https://trapichedigital.com.mx/${id}`,
                type: "article",
            },
            twitter: {
                card: "summary_large_image",
                title: post.titulo,
                description: post.resumen || post.subtitulo,
                images: [post.portada],
            },
        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        notFound();
    }
}

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const id = (await params).id
    
    if (!id || id === 'undefined' || id === 'null') {
        notFound();
    }

    try {
        const data = await fetch(API_ENDPOINTS.fetchPostById(id), {
            cache: "no-store",
            signal: AbortSignal.timeout(10000)
        });
        
        if (!data.ok) {
            console.log(`Post fetch failed: ${data.status} for ID: ${id}`);
            notFound();
        }
        
        const json = await data.json();

        if (json.status !== "success" || !json.data) {
            notFound();
        }
        
        const post = json.data;
        const postUrl = `https://trapichedigital.com.mx/${id}`;
        console.log(`Fetched post: ${post}`);

        return (
            <Section>
                <Head>
                    {/* Metadatos Open Graph para Facebook e Instagram */}
                    {post && (
                        <>
                            <meta property="og:title" content={post.titulo} />
                            <meta property="og:description" content={post.resumen || post.subtitulo} />
                            <meta property="og:image" content={post.portada} />
                            <meta property="og:url" content={postUrl} />
                            <meta property="og:type" content="article" />
                            <meta property="og:site_name" content="Trapiche Digital" />
                            <meta property="og:locale" content="es_ES" />

                            {/* Twitter/X Cards */}
                            <meta name="twitter:card" content="summary_large_image" />
                            <meta name="twitter:title" content={post.titulo} />
                            <meta name="twitter:description" content={post.resumen || post.subtitulo} />
                            <meta name="twitter:image" content={post.portada} />
                            <meta name="twitter:url" content={postUrl} />

                            {/* YouTube metadatos (para contenido multimedia) */}
                            <meta name="video" content={post.portada} />
                            <meta name="video:type" content="video/mp4" />
                            <meta name="video:tag" content="noticias, actualidad, digital" />

                            <title>{post.titulo} - Trapiche Digital</title>
                        </>
                    )}
                </Head>

                <div className={styles.articulo}>
                    <div className={styles.articuloHeader}>
                        <h1 className={styles.articuloTitulo}>{post.titulo}</h1>
                        <h2 className={styles.articuloSubTitulo}>{post.subtitulo}</h2>
                    </div>
                    {/* Mostrar categoría con componente Insignia */}
                        {post.categoria && (
                            <Insignia 
                                text={post.categoria} 
                                className="mb-4"
                            />
                        )}
                    <div className={styles.articuloDetails}>
                        <p className="text-base text-zinc-400"><span className="">Por</span> <Link href={`https://www.facebook.com/Trapichedigitaloficial`} scroll={true} className="text-neutral-800 font-bree">{/*post.autor*/} Trapiche Digital</Link></p>
                        <p className="text-base md:ml-8 text-zinc-400"><span className=""></span> {formatDate(post.created_at)}</p>
                    </div>

                    <div className={styles.articuloShare}>
                        {/* <p className={styles.articuloBtnShare} >Compartenos por: </p> */}
                        {/* Facebook */}
                        <Link href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`} target="_blank" rel="noopener noreferrer" className={styles.articuloBtnShare}>
                            <Image src="/facebook.svg" alt="Facebook" width={25} height={25} quality={80}/>
                        </Link>

                        {/* Instagram (No permite compartir enlaces, redirecciona al perfil) */}
                        {/* <Link href="https://www.instagram.com/trapichedigitalmx" target="_blank" rel="noopener noreferrer" className={styles.articuloBtnShare}>
                            <Image src="/instagram.svg" alt="Instagram" width={25} height={25} />
                        </Link> */}

                        {/* WhatsApp */}
                        <Link href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.titulo + " " + postUrl)}`} target="_blank" rel="noopener noreferrer" className={styles.articuloBtnShare}>
                            <Image src="/whatsapp.svg" alt="WhatsApp" width={25} height={25} quality={80}/>
                        </Link>

                        <CopyToClipboard postUrl={postUrl} />
                        
                    </div>


                    <div className={styles.articuloImageContainer}>
                        <MediaDisplay 
                            src={post.portada} 
                            alt={post.titulo}
                            width={1000} 
                            height={800} 
                            quality={80} 
                            className={styles.articuloImage}
                            containerClassName=""
                            playable={true}
                        />
                    </div>

                    <div className={`${styles.articuloParagraph} tiptap ProseMirror`} dangerouslySetInnerHTML={{ __html: post.contenido }}/>


                </div>

            </Section>  
        );
        
    } catch (error) {
        console.error('Error fetching post:', error);
        notFound();
    }
}
