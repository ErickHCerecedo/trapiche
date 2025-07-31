// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
//import { decrypt } from '@/app/lib/session'
//import { cookies } from 'next/headers'

// Lista de rutas protegidas
const protectedRoutes = ['/admin']
//const publicRoutes = ['/login', '/']

export default async function middleware(request: NextRequest) {
    
    const { pathname } = request.nextUrl
    const sessionToken = request.cookies.get('session_token')?.value

    // Verificar si la ruta está protegida
    const isProtected = protectedRoutes.some((route) => pathname.startsWith(route))

    if (isProtected && !sessionToken) {
        // Redirigir a /login si no hay sesión
        const loginUrl = new URL('/login', request.url)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

// Configuración para que solo se aplique a rutas protegidas
export const config = {
    matcher: ['/admin/:path*'], // Solo middleware en /admin y subrutas
}
