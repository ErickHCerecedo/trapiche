import React from "react"

import { API_ENDPOINTS } from "@/lib/api"
import Hero from "@/components/Hero"
import PostList from "@/components/PostList"
import Section from "@/components/Section"

async function fetchPosts() {
    try {
        const response = await fetch(API_ENDPOINTS.fetchPosts)
        if (!response.ok) {
            throw new Error("Failed to fetch posts")
        }
        const list = await response.json()
        const reversedData = list.reverse()
        const heroPosts = reversedData.slice(0, 3)
        const posts = reversedData.slice(3)
        return { heroPosts, posts }
    } catch (error) {
        console.error("Error fetching posts:", error)
        // Return empty arrays if fetch fails
        return { heroPosts: [], posts: [] }
    }
}

export default async function Home() {
    const { heroPosts, posts } = await fetchPosts()

    return (
        <Section>
            <h1 className="w-full text-4xl md:text-7xl font-serif text-left font-semibold uppercase animate-fade-up animate-delay-500">
                Las Noticias Más <br className="hidden md:block" /> Relevantes
                al Instante
            </h1>
            <Hero posts={heroPosts} />
            <PostList posts={posts} />
        </Section>
    )
}
