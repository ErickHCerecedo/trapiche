import React from "react";

import Link from "next/link"
import MediaDisplay from "@/components/MediaDisplay"
import Insignia from "@/components/ui/insignia"

import styles from "@/styles/PostItem.module.css"
import { formatDate } from "@/lib/formatDate"
import { GrLinkNext } from "react-icons/gr"
//import { Separator } from "@/components/ui/separator"

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
        <div className={styles.postItem}>
            <div className={styles.postItemWrapper}>
                <div className={`${styles.postItemImageContainer} group`}>
                    <Link href={`/${slug}`} scroll={true}>
                        <MediaDisplay
                            src={image}
                            alt={title}
                            width={200}
                            height={200}
                            quality={80}
                            className={`${styles.postItemImage} group-hover:scale-110`}
                            containerClassName="w-full h-full"
                            playable={false}
                        />
                    </Link>
                </div>
                
                <div className={styles.postItemInformation}>
                    <Insignia text={categoria} className="mb-2" />
                    <Link href={`/${slug}`} scroll={true}>
                        <h1 className="text-2xl line-clamp-4 md:h-32 h-auto">{title}</h1>
                    </Link> 
                    {<h2 className="text-lg hidden">{subtitle}</h2>}
                    <div className={`${styles.postItemDetails} md:hidden`}>
                        <p className="text-base text-zinc-500"><span className="">Por </span> {autor}</p>
                        <p className="text-base md:mx-4 text-zinc-500"><span className=""></span> {formatDate(date)}</p>
                    </div>
                    <p className="hidden">{content}</p>
                    <Link href={`/${slug}`}  className={`${styles.postItemButton} group`} scroll={true}>Leer <GrLinkNext className={`${styles.postItemButtonIcon} group-hover:translate-x-4`}/></Link>
                </div>
            </div>
        {/*<Separator orientation="horizontal" className="h-[2px] my-0 bg-black"/>*/}
        </div>
    )
}

export default PostItem
