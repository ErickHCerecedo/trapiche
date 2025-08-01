import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Método no permitido" })
    }

    const { email, password } = req.body

    try {
        const response = await fetch("http://localhost:8101/login.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            credentials: "include",
            body: new URLSearchParams({
                email,
                password,
            }).toString(),
        })

        const data = await response.json()
        console.log("Respuesta del servidor PHP:", data)

        if (response.ok && data.status === "success") {
            // reenviar cookie al navegador desde PHP
            const cookies = response.headers.get("set-cookie")

            if (cookies) {
                res.setHeader("Set-Cookie", cookies)
            }
            return res.status(200).json(data)
        } else {
            return res
                .status(401)
                .json({ message: data.message || "Credenciales inválidas" })
        }
    } catch (error) {
        console.error("Error en login:", error) // Ahora sí usas 'error'
        return res.status(500).json({ message: "Error interno del servidor" })
    }
}
