import React from "react";

import Image from "next/image"
import Link from "next/link"

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
    //content: string;
}

const PostItem: React.FC<PostItemProps> = ({
    id_entrada,
    title,
    subtitle,
    autor,
    date,
    image,
    //content,
}) => {

    return ( 
        <div className={styles.postItem}>
            <div className={styles.postItemWrapper}>
                <Link href={`/noticias/${id_entrada}`}>
                    <div className={`${styles.postItemImageContainer} group`}>
                        <Image
                            src={image}
                            alt={title}
                            quality={80}
                            fill={true} 
                            style={{objectFit: "cover"}}
                            className={`${styles.postItemImage} group-hover:scale-110`}
                        />
                    </div>
                </Link>

                <div className={styles.postItemInformation}>
                    <Link href={`/noticias/${id_entrada}`}>
                        <h1>{title}</h1>
                    </Link>
                    <h2>{subtitle}</h2>
                    <div className={styles.postItemDetails}>
                        <p className="text-sm"><span className="font-bold">Por. </span> {autor}</p>
                        <p className="text-sm md:mx-4"><span className="font-bold">Fecha. </span> {formatDate(date)}</p>
                    </div>
                    {/*<p>{content}</p>*/}
                    <Link href={`/noticias/${id_entrada}`}  className={`${styles.postItemButton} group`}>Leer <GrLinkNext className={`${styles.postItemButtonIcon} group-hover:translate-x-4`}/></Link>
                </div>
            </div>
        <Separator orientation="horizontal" className="h-[1px] my-0 bg-black"/>
        </div>
    )
}

export default PostItem
