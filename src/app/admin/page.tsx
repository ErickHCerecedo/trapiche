"use client"

import React from "react"
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page: React.FC = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        console.log("Session:", session);
        console.log("Status:", status);
        if (status === "unauthenticated") {
            //router.push("/login");
        }
    }, [status, router]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Admin Portal</h1>
            <p>Welcome, {session?.user?.name}</p>
            <button onClick={() => signOut()}>Sign Out</button>
            {/* Aquí puedes agregar las funcionalidades para crear, editar y eliminar publicaciones */}
        </div>
    )
}

export default Page;