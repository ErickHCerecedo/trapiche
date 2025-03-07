"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        if (id === "email") {
            setEmail(value);
        } else if (id === "password") {
            setPassword(value);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log(email, password);
        
        // Introduce una pausa de 5 segundos para ver los logs
        await new Promise(resolve => setTimeout(resolve, 10000));

        const result = await signIn("Credentials", {
            redirect: false,
            email,
            password,
        });

        console.log(result);
        
        if (result?.error) {
            setError(result.error);
        } else {
            router.push("/admin");
        }
    };

        return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="bg-white shadow-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Inicio de sesión</CardTitle>
                    <CardDescription>
                        Ingrese correo y contraseña para acceder a su cuenta.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Correo</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="mail@ejemplo.com"
                                    required
                                    value={email}
                                    onChange={handleInputChange}
                                    onInput={handleInputChange}
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                <Label htmlFor="password">Contraseña</Label>
                                </div>
                                <Input 
                                    id="password" 
                                    type="password" 
                                    placeholder="password123" 
                                    required 
                                    value={password}
                                    onChange={handleInputChange}
                                    onInput={handleInputChange}
                                />
                            </div>
                            {error && <p className="text-red-500">{error}</p>}
                            <Button type="submit" className="w-full bg-black text-white">
                                Login
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
