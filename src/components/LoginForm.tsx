"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import styles from "@/styles/LoginForm.module.css";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

    const [credentials, setCredentials] = useState({email: "josemaen@trapichedigital.com.mx", password: "adminTrapiche2025"});
    const [error, setError] = useState("");
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const response = await fetch(API_ENDPOINTS.login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(credentials),
        });

        if (response.ok) {
            router.push('/admin')
        } else {
            const errorData = await response.json();
            setError(errorData.message || "Error al iniciar sesión");
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <a
                            href="#"
                            className="flex flex-col items-center gap-2 w-3/4 font-medium"
                        >
                            <div className="flex h-40 w-auto items-center justify-center rounded-md">
                                <Image
                                    src="/logo-main.png"
                                    width={200}
                                    height={100}
                                    quality={80}
                                    alt="Trapiche"
                                    className={styles.loginFormLogo}
                                />
                            </div>
                        </a>
                        <h1>
                            <span>Bienvenido de vuelta</span>
                        </h1>
                        <div className="text-center">
                            Inicie sesión al sitio administrativo de <br /> Trapiche Digital.
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email" className={styles.loginFormLabel}>
                                Correo
                            </Label>
                            <Input
                            id="email"
                            type="email"
                            placeholder="correo@example.com"
                            required
                            className={styles.loginFormInput}
                            value={credentials.email}
                            onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password" className={styles.loginFormLabel}>
                            Contraseña
                            </Label>
                            <Input
                            id="password"
                            type="password"
                            placeholder="secreto"
                            required
                            className={styles.loginFormInput}
                            value={credentials.password}
                            onChange={handleInputChange}
                            />
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        <Button type="submit" className={`w-full ${styles.loginFormButton}`}>
                            Login
                        </Button>
                    </div>
                </div>
            </form>
            <div className="text-center text-sm text-muted-foreground">
                Al continuar, aceptas nuestros{" "}
                <a href="#" className="underline">
                    Términos de servicio
                </a>{" "}
                y{" "}
                <a href="#" className="underline">
                    Política de privacidad
                </a>.
            </div>
        </div>
    )
}
