"use client"

import React, { useState, useEffect } from "react"

import Link from "next/link"
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"

import styles from "@/styles/Hero.module.css"
import { formatDate } from "@/lib/formatDate"
import { GrLinkNext } from "react-icons/gr"
import { FaCircle } from "react-icons/fa";

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
    const [api, setApi] = useState<CarouselApi | null>(null);
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);
        
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

    useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    return (
        <>
        <Carousel opts={{align: "start", loop: true,}} plugins={[Autoplay({delay: 10000,}),]} className={styles.heroCarrusel} setApi={setApi}>
            <CarouselContent className={`${styles.heroCarrusel} ml-0`}>
                {posts.map((post, index) => (
                    <CarouselItem key={index} className={`${styles.heroCarrusel} pl-0 px-1 md:px-4`}>
                        {isMobile ? (
                            <div className={styles.hero}>
                                <div className={styles.heroMobileWrapper}>
                                    <Link href={`/noticias/${post.id_entrada}`} scroll = {true}>
                                        <div className={`${styles.heroMobileImageContainer} group`}>
                                            <Image
                                                src={post.portada}
                                                alt={post.titulo}
                                                width={500}
                                                height={500}
                                                className={`${styles.heroImage} group-hover:scale-110`}
                                            />
                                        </div>
                                    </Link>

                                    <div className={styles.heroMobileInformation}>
                                        <Link href={`/noticias/${post.id_entrada}`} scroll = {true}><h1>{post.titulo}</h1></Link>
                                        <Link href={`/noticias/${post.id_entrada}`} scroll = {true}><h2>{post.subtitulo}</h2></Link>
                                        <div className='my-4'>
                                            <p className='text-sm text-zinc-500'><span className=''>Por </span> {post.autor}</p>
                                            <p className='text-sm text-zinc-500'><span className=''></span> {formatDate(post.created_at)}</p>
                                        </div>
                                        {post.resumen}
                                        <Link href={`/noticias/${post.id_entrada}`}  className={`${styles.heroButton} group`} scroll = {true}>Leer <GrLinkNext className={`${styles.heroButtonIcon} group-hover:translate-x-4`}/></Link>
                                    </div>
                                </div>
                            </div>           
                        ):(
                            <div className={styles.hero}>
                                <div className={styles.heroWrapper}>
                                    <div className={styles.heroInformation}>
                                        <Link href={`/noticias/${post.id_entrada}`} scroll = {true}><h1>{post.titulo}</h1></Link>
                                        <Link href={`/noticias/${post.id_entrada}`} scroll = {true}><h2 className='mt-4'>{post.subtitulo}</h2></Link>
                                        <div className={styles.heroDetails}>
                                            <p className='text-sm mr-4 text-zinc-500'><span className=''>Por</span> {post.autor}</p>
                                            <p className='text-sm text-zinc-500'><span className=''> </span> {formatDate(post.created_at)}</p>
                                        </div>
                                        {post.resumen}
                                        <Link href={`/noticias/${post.id_entrada}`}  className={`${styles.heroButton} group`} scroll = {true}>Leer <GrLinkNext className={`${styles.heroButtonIcon} group-hover:translate-x-4`}/></Link>
                                    </div>

                                    
                                        <div className={`${styles.heroImageContainer} group`}>
                                            <Link href={`/noticias/${post.id_entrada}`} scroll = {true}>
                                            <Image
                                                src={post.portada}
                                                alt={post.titulo}
                                                width={500}
                                                height={500}
                                                className={`${styles.heroImage} group-hover:scale-110`}
                                            />
                                            </Link>
                                        </div> 
                                </div> 
                            </div>
                        )}
                    </CarouselItem>
                ))}
                
            </CarouselContent>
            <div className="w-[98%] mx-auto h-auto flex justify-between items-center mt-4">
                <div className="flex justify-center items-center">
                    <CarouselPrevious className='static translate-y-0 md:flex border-0 mr-4' />
                    <CarouselNext className='static translate-y-0 md:flex border-0'/>
                </div>
                
                <div className="flex justify-center items-center">
                {Array.from({ length: count }).map((_, index) => (
                    <FaCircle
                        key={index}
                        className={`mx-1 ${index === current ? "text-black" : "text-gray-400"}`}
                        size={12}
                    />
                ))}
                </div>
            </div>
        </Carousel>
        
        </>
    )
}

export default Hero