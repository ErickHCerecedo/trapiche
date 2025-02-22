import React from "react";

import Link from "next/link"
import Image from "next/image"

import styles from "@/styles/PostItem.module.css"
import { formatDate } from "@/lib/formatDate"
import { GrLinkNext } from "react-icons/gr"
import { Separator } from "@/components/ui/separator"

interface PostItemProps {
    id_entrada: string;
    title: string;
    subtitle: string;
    autor: string;
    date: string;
    image: string;
    content: string;
}

const PostItem: React.FC<PostItemProps> = ({
    id_entrada,
    title,
    subtitle,
    autor,
    date,
    image,
    content,
}) => {

    return ( 
        <div className={styles.postItem}>
            <div className={styles.postItemWrapper}>
                <Link href={`/noticias/${id_entrada}`} scroll={false}>
                    <div className={`${styles.postItemImageContainer} group`}>
                        <Image
                            src={image}
                            alt={title}
                            width={100}
                            height={100}
                            quality={100}
                            objectFit="contain"
                            className={`${styles.postItemImage} group-hover:scale-110`}
                            style={{ objectFit: "cover", width: "100%", height: "100%" }}
                        />
                    </div>
                </Link>

                <div className={styles.postItemInformation}>
                    <Link href={`/noticias/${id_entrada}`} scroll={false}>
                        <h1>{title}</h1>
                    </Link>
                    <h2>{subtitle}</h2>
                    <div className={styles.postItemDetails}>
                        <p className="text-sm"><span className="font-bold">Por. </span> {autor}</p>
                        <p className="text-sm md:mx-4"><span className="font-bold">Fecha. </span> {formatDate(date)}</p>
                    </div>
                    <p className="hidden">{content}</p>
                    <Link href={`/noticias/${id_entrada}`}  className={`${styles.postItemButton} group`} scroll={false}>Leer <GrLinkNext className={`${styles.postItemButtonIcon} group-hover:translate-x-4`}/></Link>
                </div>
            </div>
        <Separator orientation="horizontal" className="h-[1px] my-0 bg-black"/>
        </div>
    )
}

export default PostItem
