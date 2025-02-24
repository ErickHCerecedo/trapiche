import React from "react"
import Section from "@/components/Section"
import styles from "@/styles/Articulo.module.css"
import Head from "next/head"
import Link from "next/link"
import Image from "next/image";
import { formatDate } from "@/lib/formatDate"
import type { Metadata, ResolvingMetadata } from "next"
import CopyToClipboard from "@/components/CopyToClipboard"

export async function generateMetadata({
    params,
}:{
    params: Promise<{ id: string }>
}, parent: ResolvingMetadata
): Promise<Metadata> {
    const id = (await params).id
    const data = await fetch(`https://api.trapichedigital.com.mx/api/api_post_read.php?id_entrada=${id}`)
    const post = await data.json()
    
    const previousImages = (await parent).openGraph?.images || []

    return {
        title: `${post.titulo} - Trapiche Digital`,
        description: post.resumen || post.subtitulo,
        openGraph: {
            title: post.titulo,
            description: post.resumen || post.subtitulo,
            images: [post.portada, ...previousImages],
            url: `https://trapichedigital.com.mx/noticias/${id}`,
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title: post.titulo,
            description: post.resumen || post.subtitulo,
            images: [post.portada],
        },
    };
}

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const id = (await params).id
    
    const data = await fetch(`https://api.trapichedigital.com.mx/api/api_post_read.php?id_entrada=${id}`)
    const post = await data.json()
    

    const postUrl = `https://trapichedigital.com.mx/noticias/${id}`;
    
    return (
        <Section>
            <Head>
                {/* Metadatos Open Graph para Facebook e Instagram */}
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
            </Head>

            <div className={styles.articulo}>
                <div className={styles.articuloHeader}>
                    <h1 className={styles.articuloTitulo}>{post.titulo}</h1>
                    <h2 className={styles.articuloSubTitulo}>{post.subtitulo}</h2>
                </div>

                <div className={styles.articuloDetails}>
                    <p className="text-base text-zinc-400"><span className="">Por</span> {post.autor}</p>
                    <p className="text-base md:ml-8 text-zinc-400"><span className=""></span> {formatDate(post.created_at)}</p>
                </div>

                <div className={styles.articuloShare}>
                    {/* <p className={styles.articuloBtnShare} >Compartenos por: </p> */}
                    {/* Facebook */}
                    <Link href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`} target="_blank" rel="noopener noreferrer" className={styles.articuloBtnShare}>
                        <Image src="/facebook.svg" alt="Facebook" width={25} height={25} />
                    </Link>

                    {/* Instagram (No permite compartir enlaces, redirecciona al perfil) */}
                    <Link href="https://www.instagram.com/trapichedigital" target="_blank" rel="noopener noreferrer" className={styles.articuloBtnShare}>
                        <Image src="/instagram.svg" alt="Instagram" width={25} height={25} />
                    </Link>

                    {/* WhatsApp */}
                    <Link href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.titulo + " " + postUrl)}`} target="_blank" rel="noopener noreferrer" className={styles.articuloBtnShare}>
                        <Image src="/whatsapp.svg" alt="WhatsApp" width={25} height={25} />
                    </Link>

                    <CopyToClipboard postUrl={postUrl} />
                    
                </div>


                <div className={styles.articuloImageContainer}>
                    <Image src={post.portada} alt={post.titulo}  width={1000} height={800} className={styles.articuloImage} />
                </div>


                <div className={styles.articuloParagraph} dangerouslySetInnerHTML={{ __html: post.contenido }}/>


            </div>

        </Section>  
    )
  }
