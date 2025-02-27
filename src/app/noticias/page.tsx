import React from 'react';
import Section from "@/components/Section";
import PostList from "@/components/PostList";
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

interface NoticiasProps {
    heroPosts: Post[];
    posts: Post[];
}

async function fetchPosts() {
    const response = await fetch('https://api.trapichedigital.com.mx/api/api_post_index.php');
    const list = await response.json();
    const reversedData = list.reverse();
    const heroPosts = reversedData.slice(0, 3);
    const posts = reversedData.slice(3);
    return { heroPosts, posts };
}

const Noticias: React.FC<NoticiasProps> = async () => {
    const { heroPosts, posts } = await fetchPosts();

    return (
        <Section>
            <h1 className="w-full text-5xl md:text-[6rem] font-serif text-center font-semibold uppercase animate-fade-up animate-delay-500">Esencia Informativa</h1>
            <Hero posts={heroPosts} />
            <PostList posts={posts} />
        </Section>
    );
}

export default Noticias;