"use client"

import React from "react"

interface SectionProps {
    children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ children }) => {
    return (
        <div className="w-screen min-h-screen">
        <div className="w-full min-h-screen h-full px-6 md:px-10 pt-20 md:pt-28 pb-10">
        <div className="max-w-[95rem] h-auto py-4 md:py-8 mx-auto border-x-2 border-transparent flex flex-col items-start justify-start">
        {children}
        </div>
        </div>
        </div>
    )
}

export default Section;