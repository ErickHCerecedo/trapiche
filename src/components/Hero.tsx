"use client"

import React, { useState, useEffect } from "react"

import Link from "next/link"
import Image from "next/image";
import {Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

import styles from "@/styles/Hero.module.css"
import { formatDate } from "@/lib/formatDate"
import { GrLinkNext } from "react-icons/gr"


interface Post {
    id_entrada: string;
    titulo: string;
    subtitulo: string;
    portada: string;
    resumen: string;
    autor: string;
    created_at: string;
}

interface HeroProps {
    posts: Post[];
}

const Hero: React.FC<HeroProps> = ({ posts }) => {
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
        <Carousel opts={{align: "start", loop: true,}} plugins={[Autoplay({delay: 10000,}),]} className={styles.heroCarrusel}>
            <CarouselContent className={`${styles.heroCarrusel} ml-0`}>
                {posts.map((post, index) => (
                    <CarouselItem key={index} className={`${styles.heroCarrusel} pl-0 px-1 md:px-4`}>
                        {isMobile ? (
                            <div className={styles.hero}>
                                <div className={styles.heroMobileWrapper}>
                                    <Link href={`/noticias/${post.id_entrada}`} scroll = {false}>
                                        <div className={`${styles.heroMobileImageContainer} group`}>
                                            {/* <img
                                                src={post.portada}
                                                alt={post.titulo}
                                                className={`${styles.heroImage} group-hover:scale-110`}
                                                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                                            /> */}
                                            <Image
                                                src={post.portada}
                                                alt={post.titulo}
                                                className={`${styles.heroImage} group-hover:scale-110`}
                                                style={{ objectFit: "cover" }}
                                                layout="fill"
                                            />
                                        </div>
                                    </Link>

                                    <div className={styles.heroMobileInformation}>
                                        <Link href={`/noticias/${post.id_entrada}`} scroll = {false}><h1>{post.titulo}</h1></Link>
                                        <Link href={`/noticias/${post.id_entrada}`} scroll = {false}><h2>{post.subtitulo}</h2></Link>
                                        <div className='my-4'>
                                            <p className='text-sm'><span className='font-bold'>Por. </span> {post.autor}</p>
                                            <p className='text-sm'><span className='font-bold'>Fecha. </span> {formatDate(post.created_at)}</p>
                                        </div>
                                        {post.resumen}
                                        <Link href={`/noticias/${post.id_entrada}`}  className={`${styles.heroButton} group`} scroll = {false}>Leer <GrLinkNext className={`${styles.heroButtonIcon} group-hover:translate-x-4`}/></Link>
                                    </div>
                                </div>
                            </div>           
                        ):(
                            <div className={styles.hero}>
                                <div className={styles.heroWrapper}>

                                    <div className={styles.heroInformation}>
                                        <Link href={`/noticias/${post.id_entrada}`} scroll = {false}><h1>{post.titulo}</h1></Link>
                                        <Link href={`/noticias/${post.id_entrada}`} scroll = {false}><h2 className='mt-4'>{post.subtitulo}</h2></Link>
                                        <div className={styles.heroDetails}>
                                            <p className='text-sm mr-4'><span className='font-bold'>Por.</span> {post.autor}</p>
                                            <p className='text-sm'><span className='font-bold'>Fecha. </span> {formatDate(post.created_at)}</p>
                                        </div>
                                        {post.resumen}
                                        <Link href={`/noticias/${post.id_entrada}`}  className={`${styles.heroButton} group`} scroll = {false}>Leer <GrLinkNext className={`${styles.heroButtonIcon} group-hover:translate-x-4`}/></Link>
                                    </div>

                                    
                                        <div className={`${styles.heroImageContainer} group`}>
                                            <Link href={`/noticias/${post.id_entrada}`} scroll = {false}>
                                            {/* <img
                                                src={post.portada}
                                                alt={post.titulo}
                                                className={`${styles.heroImage} group-hover:scale-110`}
                                                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                                            /> */}
                                            <Image
                                                src={post.portada}
                                                alt={post.titulo}
                                                className={`${styles.heroImage} group-hover:scale-110`}
                                                style={{ objectFit: "cover" }}
                                                layout="fill"
                                            />
                                            </Link>
                                        </div>
                                    
                                </div> 
                            </div>
                        )}
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className='hidden md:flex' />
            <CarouselNext className='hidden md:flex'/>
        </Carousel>
    )
}

export default Hero