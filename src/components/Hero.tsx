"use client"

import React, { useState, useEffect } from "react"

import Link from "next/link"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import MediaDisplay from "@/components/MediaDisplay"
import Insignia from "@/components/ui/insignia"

import styles from "@/styles/Hero.module.css"
import { formatDate } from "@/lib/formatDate"
import { ChevronRight } from 'lucide-react';
import { FaCircle } from "react-icons/fa";

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
        <Carousel opts={{align: "start", loop: true,}} plugins={[Autoplay({delay: 10000,}),]} className={`${styles.heroCarrusel} `} setApi={setApi}>
            <CarouselContent className={`${styles.heroCarrusel} ml-0 `}>
                {posts.map((post, index) => (
                    <CarouselItem key={index} className={`${styles.heroCarrusel} pl-0 `}>
                        {/*isMobile ? <></> : <Link href={`/${post.id_entrada}`} scroll = {true}><h1 className="px-2 text-left uppercase animate-fade-up animate-delay-500">{post.titulo}</h1></Link>*/}
                        {isMobile ? (
                            <div className={styles.hero}>
                                <div className={styles.heroMobileWrapper}>
                                    <Link href={`/${post.slug}`} scroll = {true}>
                                        <div className={`${styles.heroMobileImageContainer} group`}>
                                            <MediaDisplay
                                                src={post.portada}
                                                alt={post.titulo}
                                                width={500}
                                                height={500}
                                                quality={80}
                                                className={`${styles.heroImage} group-hover:scale-110`}
                                                containerClassName="w-full h-full"
                                                playable={false}
                                            />
                                        </div>
                                    </Link>

                                    <div className={styles.heroMobileInformation}>
                                        {<Link href={`/${post.slug}`} scroll = {true}><h1>{post.titulo}</h1></Link>}
                                        <Link href={`/${post.slug}`} scroll = {true}><h2>{post.subtitulo}</h2></Link>
                                        <Insignia text={post.categoria} className="my-2" />
                                        <div className='my-4'>
                                            <p className='text-sm text-zinc-500'><span className=''>Por </span> <Link href={`https://www.facebook.com/Trapichedigitaloficial`} scroll={true} className="text-neutral-800 font-bree">{/*post.autor*/} Trapiche Digital</Link></p>
                                            <p className='text-sm text-zinc-500'><span className=''></span> {formatDate(post.created_at)}</p>
                                        </div>
                                        {/*post.resumen*/}
                                        <Link href={`/${post.slug}`}  className={`${styles.heroButton} group`} scroll = {true}>Leer <ChevronRight className={`${styles.heroButtonIcon} group-hover:translate-x-4`}/></Link>
                                    </div>
                                </div>
                            </div>           
                        ):(
                            <div className={styles.hero}>
                                <div className={styles.heroWrapper}>
                                    <div className={styles.heroInformation}>
                                        {<Link href={`/${post.slug}`} className="mb-4" scroll = {true}><h1>{post.titulo}</h1></Link>}
                                        <Link href={`/${post.slug}`} scroll = {true}><h2>{post.subtitulo}</h2></Link>
                                        <Insignia text={post.categoria} className="my-2" />
                                        
                                        <div className={styles.heroDetails}>
                                            <p className='text-base mr-4 text-zinc-500'><span className=''>Por</span> <Link href={`https://www.facebook.com/Trapichedigitaloficial`} scroll={true} className="text-neutral-800 font-bree">{/*post.autor*/} Trapiche Digital</Link></p>
                                            <p className='text-base text-zinc-500'><span className=''> </span> {formatDate(post.created_at)}</p>
                                        </div>
                                        {/*post.resumen*/}
                                        <Link href={`/${post.slug}`}  className={`${styles.heroButton} group`} scroll = {true}>Leer <ChevronRight className={`${styles.heroButtonIcon} group-hover:translate-x-4`}/></Link>
                                        
                                    </div>

                                    
                                    <div className={`${styles.heroImageContainer} group`}>
                                        <Link href={`/${post.slug}`} scroll = {true}>
                                            <MediaDisplay
                                                src={post.portada}
                                                alt={post.titulo}
                                                width={500}
                                                height={500}
                                                quality={80}
                                                className={`${styles.heroImage} `}
                                                containerClassName={'h-full w-full'}
                                                playable={false}
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