"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { GrLinkNext } from "react-icons/gr"

import PostItem from "@/components/PostItem"
import styles from "@/styles/PostList.module.css"

interface Post {
    id_entrada: string
    titulo: string
    subtitulo: string
    portada: string
    resumen: string
    autor: string
    created_at: string
}

interface PostListProps {
    posts: Post[]
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768)
        }

        handleResize()
        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return (
        <div>
            {isMobile ? (
                <div className={styles.postListWrapper}>
                    <div className={styles.postListMagazine}>
                        <h2 className="text-5xl">Revista</h2>
                        <h1 className="my-4">02 / 2025</h1>

                        <Link href="/revista" scroll={true}>
                            <div
                                className={`${styles.postListImageContainer} group`}
                            >
                                <Image
                                    src="/magazine-holder.png"
                                    alt="Revista"
                                    width={200}
                                    height={100}
                                    quality={80}
                                    className={`${styles.postListImage} group-hover:scale-110`}
                                />
                            </div>
                        </Link>

                        <Link
                            href="/revista"
                            className={`${styles.postListButton} group`}
                            scroll={true}
                        >
                            Leer ahora{" "}
                            <GrLinkNext
                                className={`${styles.postListButtonIcon} group-hover:translate-x-4`}
                            />
                        </Link>
                    </div>

                    <div className={styles.postListNews}>
                        <h2 className="text-5xl">Noticias Recientes</h2>
                        {posts.map((post, index) => (
                            <div key={index}>
                                <PostItem
                                    id_entrada={post.id_entrada}
                                    title={post.titulo}
                                    subtitle={post.subtitulo}
                                    autor={post.autor}
                                    date={post.created_at}
                                    image={post.portada}
                                    content={post.resumen}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className={styles.postListWrapper}>
                    <div className={styles.postListNews}>
                        <h2 className="text-4xl">Noticias Recientes</h2>
                        <h1 className="my-4"></h1>
                        {posts.map((post, index) => (
                            <div key={index}>
                                <PostItem
                                    id_entrada={post.id_entrada}
                                    title={post.titulo}
                                    subtitle={post.subtitulo}
                                    autor={post.autor}
                                    date={post.created_at}
                                    image={post.portada}
                                    content={post.resumen}
                                />
                            </div>
                        ))}
                    </div>

                    <div className={styles.postListMagazine}>
                        <h2 className="text-4xl">Revista</h2>
                        <h1 className="my-4">02 / 2025</h1>

                        <Link href="/revista" scroll={true}>
                            <div
                                className={`${styles.postListImageContainer} group`}
                            >
                                <Image
                                    src="/magazine-holder.png"
                                    alt="Revista"
                                    width={200}
                                    height={100}
                                    quality={80}
                                    className={`${styles.postListImage} group-hover:scale-110`}
                                />
                            </div>
                        </Link>

                        <Link
                            href="/revista"
                            className={`${styles.postListButton} group`}
                            scroll={true}
                        >
                            Leer ahora{" "}
                            <GrLinkNext
                                className={`${styles.postListButtonIcon} group-hover:translate-x-4`}
                            />
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PostList
