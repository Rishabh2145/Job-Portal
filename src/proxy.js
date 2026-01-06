import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'


export async function proxy(req) {
    const { pathname } = req.nextUrl
    const token = req.cookies.get('token')?.value
    const protectedPath = pathname.startsWith('/dashboard');
    const logoutPath = pathname.startsWith('/logout')
    const logged = pathname.startsWith('/login') || pathname.startsWith('/signup')

    if (logoutPath) {
        const res = NextResponse.redirect(new URL('/login', req.url))
        res.cookies.delete('token')
        return res
    }

    if (!protectedPath && !token) {
        return NextResponse.next()
    }

    if (protectedPath && !token) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    try {
        const user = await jwt.verify(token, process.env.NEXT_PUBLIC_SECRET_KEY)
        if (logged) {
            return NextResponse.redirect(new URL('/dashboard', req.url))
        }

        if (protectedPath && token) {
            return NextResponse.next()
        }

    } catch (err) {
        const res = NextResponse.redirect(new URL('/login', req.url))
        res.cookies.delete('token')
        return res
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*', '/logout/:path*', '/login/:path*', '/signup/:path*']
}