"use client";

import React from "react";
import { FaLink } from "react-icons/fa6";
import styles from "@/styles/Articulo.module.css";

interface CopyButtonProps {
    postUrl: string;
}

const CopyToClipboard: React.FC<CopyButtonProps> = ({ postUrl }) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(postUrl).then(() => {
            
            //alert("Enlace copiado al portapapeles");
        }).catch(err => {
            console.error("Error al copiar el enlace: ", err);
        });
    };

    return (
        <button onClick={handleCopy} className={styles.articuloBtnShare}>
            <FaLink className="w-[25px] h-[25px]" />
        </button>
    );
};

export default CopyToClipboard;