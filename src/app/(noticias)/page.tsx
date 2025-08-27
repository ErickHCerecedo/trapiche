import React from 'react';
import Section from "@/components/Section";
import PostList from "@/components/PostList";
import Hero from '@/components/Hero';
import { API_ENDPOINTS } from '@/lib/api';
import { Separator } from "@/components/ui/separator"

interface PaginationData {
    current_page: number;
    per_page: number;
    total_posts: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
    next_page: number | null;
    prev_page: number | null;
}

interface Post {
    slug: string;
    titulo: string;
    subtitulo: string;
    categoria: string;
    portada: string;
    resumen: string;
    autor: string;
    created_at: string;
}

async function fetchPosts(page: number = 1, limit: number = 12) {
    try {
        // Simple approach: Always fetch from page 1 with enough posts
        // Then slice client-side to get the correct posts for each page
        const totalNeeded = 3 + (page * limit); // Hero posts + current page posts
        
        // Construct URL properly - fetchPosts already includes the base endpoint
        const url = `${API_ENDPOINTS.fetchPosts}?page=1&limit=${totalNeeded}`;
        
        const response = await fetch(url, { 
            cache: "no-store",
            signal: AbortSignal.timeout(10000)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const json = await response.json();
        
        if (json.status !== "success" || !json.data?.posts) {
            console.error('API returned error or invalid data:', json);
            return { posts: [], pagination: null };
        }

        const allPosts: Post[] = json.data.posts;
        const originalPagination: PaginationData = json.data.pagination;
        
        // Calculate the posts for this specific page
        const startIndex = 3 + ((page - 1) * limit); // Skip hero + previous pages
        const endIndex = startIndex + limit;
        const posts = allPosts.slice(startIndex, endIndex);
        
        // Create pagination metadata
        const totalPostsWithoutHero = Math.max(0, originalPagination.total_posts - 3);
        const totalPages = Math.ceil(totalPostsWithoutHero / limit);
        
        const pagination: PaginationData = {
            current_page: page,
            per_page: limit,
            total_posts: totalPostsWithoutHero,
            total_pages: totalPages,
            has_next: page < totalPages,
            has_prev: page > 1,
            next_page: page < totalPages ? page + 1 : null,
            prev_page: page > 1 ? page - 1 : null
        };
        
        return { posts, pagination };
        
    } catch (error) {
        console.error('Error fetching posts:', error);
        return { posts: [], pagination: null };
    }
}

async function fetchHeroPosts() {
    try {
        // Always fetch first 3 posts for hero (most recent)
        const url = `${API_ENDPOINTS.fetchPosts}?page=1&limit=3`;
        
        const response = await fetch(url, { 
            cache: "no-store",
            signal: AbortSignal.timeout(10000)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const json = await response.json();
        
        if (json.status !== "success" || !json.data?.posts) {
            console.error('Hero posts API error:', json);
            return [];
        }

        return json.data.posts;
        
    } catch (error) {
        console.error('Error fetching hero posts:', error);
        return [];
    }
}

export default async function Home({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>
}) {
    // Await searchParams in Next.js 15
    const params = await searchParams;
    const currentPage = Number(params.page) || 1;
    
    // Fetch hero posts (always the 3 most recent)
    const heroPosts = await fetchHeroPosts();
    
    // Fetch posts for pagination
    const { posts, pagination } = await fetchPosts(currentPage, 12);

    return (
        <Section>
            <h1 className="w-full text-4xl md:text-7xl font-serif text-left font-semibold  animate-fade-up animate-delay-500">
                Infórmate a la velocidad de un click <br className="hidden md:inline" />
            </h1>
            
            {/* Hero always visible with latest 3 posts */}
            {heroPosts.length > 0 && (
                <>
                    <Hero posts={heroPosts} />
                    <Separator orientation="horizontal" className="h-[2px] mb-0 mt-8 bg-black"/>
                </>
            )}
            
            <PostList posts={posts} pagination={pagination} currentPage={currentPage} />
        </Section>
    );
}