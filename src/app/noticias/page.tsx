"use client"

import React, { useState, useEffect } from 'react';

import Section from "@/components/Section"
import PostList from "@/components/PostList"
import Hero from '@/components/Hero';

interface Post {
    id_entrada: string;
    titulo: string;
    subtitulo: string;
    portada: string;
    resumen: string;
    autor: string;
    created_at: string;
}

const Noticias: React.FC =  () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [heroPosts, setHeroPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /* const data = await fetch('https://api.trapichedigital.com.mx/api/api_post_index.php');
    const list = await data.json()
    const reversedData = data.reverse(); */

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('https://api.trapichedigital.com.mx/api/api_post_index.php');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                //console.log(response);
                
                const data = await response.json();
                const reversedData = data.reverse();
                setHeroPosts(reversedData.slice(0, 3));
                setPosts(reversedData.slice(3));
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

        fetchPosts();
    }, []);

    if (loading) {
        return <div className='w-screen h-screen flex justify-center items-center'>Loading...</div>;
    } 
    
    if (error) {
        return <div>Error: {error}</div>;
    }


    return (
        <Section>
            <h1 className="w-full text-5xl md:text-[6rem] font-serif text-center font-semibold uppercase animate-fade-up animate-delay-500">La noticia en primera linea</h1>
            <Hero posts={heroPosts} />
            <PostList posts={posts} />
        </Section>
    )
}

export default Noticias
