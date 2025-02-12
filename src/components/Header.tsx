"use client"

import React, { useState } from "react"

import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

import { Separator } from "@/components/ui/separator"
import { TfiAlignRight, TfiClose } from "react-icons/tfi"
import styles from "@/styles/Header.module.css"
import logo from "../../public/logo-main.png"
import InstagramIcon from "../../public/instagram.svg"
import YoutubeIcon from "../../public/youtube.svg"
import FacebookIcon from "../../public/facebook.svg"

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    function getMenuClasses() {
        const menuClasses = [
            'transition-all', 
            'duration-300', 
            'ease-in-out',
            'overflow-hidden'
        ]

        if (isOpen) {
            menuClasses.push('max-h-96', 'opacity-100', 'shadow-2xl');
        } else {
            menuClasses.push('max-h-0', 'opacity-0');
        }

        return menuClasses.join(' ')
    }

    const handleMenuClick = (path: string) => {
        router.push(path)
        setIsOpen(false)
    }

    return (
        <header className={`${styles.header}`}>
            <div className={styles.headerWrapper}>
                <div className={styles.headerNavbar}>
                    <div className="logo">
                        <Image src={logo} alt="Trapiche" quality={80} className={styles.headerLogo}/>
                    </div>

                    <div className={styles.headerList}>
                        <button onClick={() => handleMenuClick('../')} className={`${styles.headerItem} group`}>
                            Noticias
                            <span className={`${styles.headerItemHover} group-hover:w-full`}></span>
                        </button>
                        <button onClick={() => handleMenuClick('/revista')} className={`${styles.headerItem} group`}>
                            Revista
                            <span className={`${styles.headerItemHover} group-hover:w-full`}></span>
                        </button>

                        <Separator orientation="vertical" className="h-9 w-[2px] mx-2 bg-foreground" />

                        <Link href="https://www.instagram.com/trapichedigitalmx/" target="_blank" className="mx-2 group relative">
                            <Image src={InstagramIcon} alt="Instagram" width={25} height={25} quality={80}/>
                        </Link>
                        <Link href="https://www.youtube.com/@trapichedigital3998" target="_blank" className="mx-2 group relative">
                            <Image src={YoutubeIcon} alt="Instagram" width={25} height={25} quality={80}/>
                        </Link>
                        <Link href="https://www.facebook.com/Trapichedigitaloficial" target="_blank" className="mx-2 group relative">
                            <Image src={FacebookIcon} alt="Instagram" width={25} height={25} quality={80}/>
                        </Link>
                    </div>
                    <div className={styles.menuButton}>
                        <button onClick={() => {setIsOpen(!isOpen)}} className="focus:outline-none">
                        {isOpen ? <TfiClose /> : <TfiAlignRight />}
                        </button>
                    </div>
                </div>  
            </div>

            <div className={`${styles.mobileMenu} ${getMenuClasses()}`} >
                <button onClick={() => handleMenuClick('../')} className="my-2 text-left">Noticias</button>
                <button onClick={() => handleMenuClick('/revista')} className="my-2 text-left">Revista</button>
                <Separator orientation="horizontal" className="h-[2px] my-1"/>
                <div className="">
                <Link href="https://www.instagram.com/trapichedigitalmx/" target="_blank" className="w-full flex justify-start items-center my-4">
                    <Image src={InstagramIcon} alt="Instagram" width={25} height={25} quality={80}/>
                    <span className="mx-1">Instagram</span>
                </Link>
                <Link href="https://www.youtube.com/@trapichedigital3998" target="_blank" className="w-full flex justify-start items-center my-4">
                    <Image src={YoutubeIcon} alt="Instagram" width={25} height={25} quality={80}/>
                    <span className="mx-1">Youtube</span>
                </Link>
                <Link href="https://www.facebook.com/Trapichedigitaloficial" target="_blank" className="w-full flex justify-start items-center my-4">
                    <Image src={FacebookIcon} alt="Instagram" width={25} height={25} quality={80}/>
                    <span className="mx-1">Facebook</span>
                </Link>
                </div>
            </div>

        </header>
    )
}


export default Header
