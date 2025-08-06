import React from 'react';
import Section from "@/components/Section";
import PostList from "@/components/PostList";
import Hero from '@/components/Hero';
import { API_ENDPOINTS } from '@/lib/api';
import { Separator } from "@/components/ui/separator"

async function fetchPosts() {
    const response = await fetch(API_ENDPOINTS.fetchPosts);
    const json = await response.json();
    if (json.status !== "success" || !Array.isArray(json.data)) {
        return { heroPosts: [], posts: [] };
    }
    const reversedData = json.data.reverse();
    const heroPosts = reversedData.slice(0, 3);
    const posts = reversedData.slice(3);
    return { heroPosts, posts };
}

export default async function Home() {
    const { heroPosts, posts } = await fetchPosts();

    return (
        <Section>
            <h1 className="w-full text-4xl md:text-7xl font-serif text-left font-semibold uppercase animate-fade-up animate-delay-500">
                Las Noticias Más <br className="hidden md:inline" /> Relevantes al Instante
            </h1>
            <Hero posts={heroPosts} />
            <Separator orientation="horizontal" className="h-[2px] mb-0 mt-8 bg-black"/>
            <PostList posts={posts} />
        </Section>
    );
}