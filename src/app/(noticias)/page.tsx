import React from 'react';
import Section from "@/components/Section";
import PostList from "@/components/PostList";
import Hero from '@/components/Hero';
import { API_ENDPOINTS } from '@/lib/api';

interface Post {
    id_entrada: string;
    titulo: string;
    subtitulo: string;
    portada: string;
    resumen: string;
    autor: string;
    created_at: string;
}

interface NoticiasProps {
    heroPosts: Post[];
    posts: Post[];
}

async function fetchPosts() {
    const response = await fetch(API_ENDPOINTS.fetchPosts);
    const list = await response.json();
    const reversedData = list.reverse();
    const heroPosts = reversedData.slice(0, 3);
    const posts = reversedData.slice(3);
    return { heroPosts, posts };
}

const Home: React.FC<NoticiasProps> = async () => {
    const { heroPosts, posts } = await fetchPosts();

    return (
        <Section>
            <h1 className="w-full text-4xl md:text-7xl font-serif text-left font-semibold uppercase animate-fade-up animate-delay-500">
                Las Noticias Más {typeof window !== "undefined" && window.innerWidth > 768 && <br />} Relevantes al Instante
            </h1>
            <Hero posts={heroPosts} />
            <PostList posts={posts} />
        </Section>
    );
}

export default Home;