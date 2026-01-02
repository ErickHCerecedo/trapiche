"use client"

import React, { useState, useEffect } from "react";

import Link from "next/link"
import Image from "next/image";
import PostItem from "@/components/PostItem"
import Pagination from "@/components/Pagination"

import styles from "@/styles/PostList.module.css"
import { ChevronRight } from 'lucide-react';

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

interface PostListProps {
    posts: Post[];
    pagination: PaginationData | null;
    currentPage: number;
}

const PostList:  React.FC<PostListProps> = ({ posts, pagination /* , currentPage */ }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            {isMobile ? (
                <div className={styles.postListWrapper}>
                    <div className={styles.postListMagazine}>
                        <h2 className="text-4xl">Revista</h2>
                        <h1 className='my-4'>02 / 2025</h1>

                        <Link href="/revista" scroll={true}>
                            <div className={`${styles.postListImageContainer} group`}>
                                <Image
                                    src="https://res.cloudinary.com/da6tubbm8/image/upload/v1767336395/TRAPICHE_DICIEMBRE_bxpapm.png"
                                    alt="Revista"
                                    width={200}
                                    height={100}
                                    quality={75}
                                    loading="lazy"
                                    className={`${styles.postListImage} group-hover:scale-110`}
                                />
                            </div>
                        </Link>
                        
                        <Link href="/revista"  className={`${styles.postListButton} group`} scroll={true}>Leer ahora <ChevronRight className={`${styles.postListButtonIcon} group-hover:translate-x-4`}/></Link>
                    </div>
                    
                    <div className={styles.postListNews}>
                        <h2 className="text-4xl">Noticias Recientes</h2>
                        {posts.length > 0 ? (
                            posts.map((post, index) => (
                                <div key={`${post.slug}-${index}`}>
                                    <PostItem
                                        slug={post.slug}
                                        title={post.titulo}
                                        subtitle={post.subtitulo}
                                        categoria={post.categoria}
                                        autor={post.autor}
                                        date={post.created_at}
                                        image={post.portada}    
                                        content={post.resumen}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-zinc-500">
                                No hay noticias disponibles
                            </div>
                        )}
                        
                        {/* Pagination for mobile */}
                        {pagination && <Pagination pagination={pagination} />}
                    </div>
                </div>
            ):(      
                <div className={styles.postListWrapper}>
                    <div className={styles.postListNews}>
                        <h2 className="text-2xl">Noticias Recientes</h2>
                        <h1 className='my-4'></h1>
                        {posts.length > 0 ? (
                            <div className="flex flex-wrap justify-between">
                                {posts.map((post, index) => (
                                    <div key={`${post.slug}-${index}`} className="w-[32%]">
                                        <PostItem
                                            slug={post.slug}
                                            title={post.titulo}
                                            subtitle={post.subtitulo}
                                            categoria={post.categoria}
                                            autor={post.autor}
                                            date={post.created_at}
                                            image={post.portada}
                                            content={post.resumen}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-zinc-500">
                                No hay noticias disponibles
                            </div>
                        )}
                        
                        {/* Pagination for desktop */}
                        {pagination && <Pagination pagination={pagination} />}
                    </div>

                    <div className={styles.postListMagazine}>
                        <h2 className="text-2xl">Revista</h2>
                        <h1 className='my-4'>02 / 2025</h1>

                        <Link href="/revista" scroll={true}>
                            <div className={`${styles.postListImageContainer} group`} >
                                <Image
                                    src="https://res.cloudinary.com/da6tubbm8/image/upload/v1767336395/TRAPICHE_DICIEMBRE_bxpapm.png"
                                    alt="Revista"
                                    width={200}
                                    height={100}
                                    quality={75}
                                    loading="lazy"
                                    className={`${styles.postListImage} group-hover:scale-110`}
                                />
                            </div>
                        </Link>
                        
                        <Link href="/revista"  className={`${styles.postListButton} group`} scroll={true}>Leer ahora <ChevronRight className={`${styles.postListButtonIcon} group-hover:translate-x-4`}/></Link>
                    </div>
                </div> 
            )}
        </div>
)};

export default PostList

