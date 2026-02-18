import React from "react";

import Link from "next/link"
import MediaDisplay from "@/components/MediaDisplay"
import Insignia from "@/components/ui/insignia"

import styles from "@/styles/PostItem.module.css"
import { formatDate } from "@/lib/formatDate"
import { ChevronRight } from 'lucide-react';

interface PostItemProps {
    slug: string;
    title: string;
    subtitle: string;
    categoria: string;
    autor: string;
    date: string;
    image: string;
    content: string;
}

const PostItem: React.FC<PostItemProps> = ({
    slug,
    title,
    subtitle,
    categoria,
    autor,
    date,
    image,
    content,
}) => {

    return ( 
        <div className={`${styles.postItem} group`}>
            <div className={styles.postItemWrapper}>
                <div className={`${styles.postItemImageContainer}`}>
                    <Link href={`/${slug}`} scroll={true}>
                        <MediaDisplay
                            src={image}
                            alt={title}
                            width={200}
                            height={200}
                            quality={80}
                            className={`${styles.postItemImage} group-hover:scale-110 transition-transform duration-1000 ease-out`}
                            containerClassName="w-full h-full"
                            playable={false}
                        />
                    </Link>
                </div>
                
                <div className={styles.postItemInformation}>
                    <Insignia text={categoria} className="mb-2" />
                    <Link href={`/${slug}`} scroll={true}>
                        <h1 className="text-2xl line-clamp-4 md:h-32 h-auto group-hover:underline transition-transform duration-300 ease-in-out">{title}</h1>
                    </Link> 
                    {<h2 className="text-lg hidden">{subtitle}</h2>}
                    {<h2 className="text-lg hidden">{autor}</h2>}
                    <div className={`${styles.postItemDetails} md:hidden`}>
                        <p className="text-base text-zinc-500"><span className="">Por </span> <Link href={`https://www.facebook.com/Trapichedigitaloficial`} scroll={true} className="text-neutral-800 font-bree">{/*post.autor*/} Trapiche Digital</Link></p>
                        <p className="text-base md:mx-4 text-zinc-500"><span className=""></span> {formatDate(date)}</p>
                    </div>
                    {<p className="hidden">{content}</p>}
                    <Link href={`/${slug}`}  className={`${styles.postItemButton} group-hover:opacity-100 transition-opacity duration-1000 ease-in-out`} scroll={true}>Leer <ChevronRight className={`${styles.postItemButtonIcon} group-hover:translate-x-4 transition-transform duration-1000 ease-in-out`}/></Link>
                </div>
            </div>
        </div>
    )
}

export default PostItem
