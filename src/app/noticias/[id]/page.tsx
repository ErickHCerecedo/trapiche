"use client"

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Section from "@/components/Section";
import Head from "next/head";
import styles from "@/styles/Articulo.module.css"

interface Post {
    id: string;
    titulo: string;
    subtitulo: string;
    portada: string;
    contenido: string;
    autor: string;
    created_at: string;
}

const Page: React.FC = () => {
    const params = useParams();
    const id = params.id as string;
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            const fetchPost = async () => {
                try {
                    const response = await fetch(`https://trapichedigital.com.mx/api/api_post_read.php?id_entrada=${id}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setPost(data);
                } catch (error) {
                    if (error instanceof Error) {
                        setError(error.message);
                    } else {
                        setError(String(error));
                    }
                } finally {
                    setLoading(false);
                }
            };

            fetchPost();
        }
    }, [id]);

    if (loading) {
        return <div className='w-screen h-screen flex justify-center items-center'>Loading...</div>;
    }

    if (error) {
        return <div className='w-screen h-screen flex justify-center items-center'>Error: {error}</div>;
    }

    if (!post) {
        return <div className='w-screen h-screen flex justify-center items-center'>No post found</div>;
    }

    return (
        <Section>
            <Head>
                <meta property="og:title" content={post.titulo} />
                <meta property="og:description" content={post.subtitulo} />
                <meta property="og:image" content={post.portada} />
                <meta property="og:url" content={`http://localhost:3000/noticias/${post.id}`} />
                <meta property="og:type" content="article" />
                <meta property="og:site_name" content="Trapiche Digital" />
                <meta property="og:locale" content="es_ES" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={post.titulo} />
                <meta name="twitter:description" content={post.subtitulo} />
                <meta name="twitter:image" content={post.portada} />
                <meta name="twitter:url" content={`http://localhost:3000/noticias/${post.id}`} />
            </Head>
            
            <div className={styles.articuloHeader}>
                <h1 className={styles.articuloTitulo}>{post.titulo}</h1>
                <h2 className={styles.articuloSubTitulo}>{post.subtitulo}</h2>
            </div>
            
                
            <div className={styles.articuloDetails}>
                <p className="text-base"><span className="font-bold">Por:</span> {post.autor}</p>
                <p className="text-base md:ml-8"><span className="font-bold">Fecha:</span> {post.created_at}</p>
            </div>

            <div className={styles.articuloImageContainer}>
                <Image
                    src={post.portada}
                    alt={post.titulo}
                    layout="fill"
                    objectFit="cover"
                    className={styles.articuloImage}
                />
            </div>
                
            <div className={styles.articuloParagraph} dangerouslySetInnerHTML={{ __html: post.contenido }}>
                
            </div>

            <div className={styles.articuloParagraph}>
                <p>
                    Un equipo de arqueólogos ha descubierto una antigua ciudad maya en la selva de Guatemala. Utilizando tecnología de escaneo láser, los investigadores han identificado estructuras y templos que datan de hace más de 1,000 años. Este hallazgo proporciona nueva información sobre la civilización maya y su influencia en la región.
                    
                    Un equipo de arqueólogos ha descubierto una antigua ciudad maya en la selva de Guatemala. Utilizando tecnología de escaneo láser, los investigadores han identificado estructuras y templos que datan de hace más de 1,000 años. Este hallazgo proporciona nueva información sobre la civilización maya y su influencia en la región.
                    
                    Un equipo de arqueólogos ha descubierto una antigua ciudad maya en la selva de Guatemala. Utilizando tecnología de escaneo láser, los investigadores han identificado estructuras y templos que datan de hace más de 1,000 años. Este hallazgo proporciona nueva información sobre la civilización maya y su influencia en la región.
                    
                    Un equipo de arqueólogos ha descubierto una antigua ciudad maya en la selva de Guatemala. Utilizando tecnología de escaneo láser, los investigadores han identificado estructuras y templos que datan de hace más de 1,000 años. Este hallazgo proporciona nueva información sobre la civilización maya y su influencia en la región.
                    
                    Un equipo de arqueólogos ha descubierto una antigua ciudad maya en la selva de Guatemala. Utilizando tecnología de escaneo láser, los investigadores han identificado estructuras y templos que datan de hace más de 1,000 años. Este hallazgo proporciona nueva información sobre la civilización maya y su influencia en la región.
                    
                    Un equipo de arqueólogos ha descubierto una antigua ciudad maya en la selva de Guatemala. Utilizando tecnología de escaneo láser, los investigadores han identificado estructuras y templos que datan de hace más de 1,000 años. Este hallazgo proporciona nueva información sobre la civilización maya y su influencia en la región.
                </p>
            </div>
        </Section>
    );
}

export default Page;