"use client"

import React from "react"

//import { useRouter } from "next/navigation";
//import { useEffect } from "react";

const Page: React.FC = () => {
    //const router = useRouter();

    return (
        <div>
            <h1>Admin Portal</h1>
            <p>Welcome user</p>
            <button onClick={() => alert("Sign Out clicked")}>Sign Out</button>
            {/* Aquí puedes agregar las funcionalidades para crear, editar y eliminar publicaciones */}
        </div>
    )
}

export default Page
