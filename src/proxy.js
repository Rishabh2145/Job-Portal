import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'


export async function proxy(req) {
    const path = req.nextUrl.pathname
    const token = req.cookies.get('token')?.value
    const protectedPath = path.startsWith('/dashboard');
    const logoutPath = path.startsWith('/logout')
    const isAuth = path.startsWith('/auth')
    const verifyPath = path.startsWith('/verify')

    if (logoutPath) {
        const res = NextResponse.redirect(new URL('/auth/login', req.url))
        res.cookies.delete('token')
        return res
    }

    if (token && isAuth) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    if (!token) {
        if (protectedPath || verifyPath) {
            return NextResponse.redirect(new URL('/auth/login', req.url))
        }
        return NextResponse.next()
    }

    try {
        const user = await jwt.verify(token, process.env.NEXT_PUBLIC_SECRET_KEY)
        const isVerify = user.user?.isVerified
        
        if(isAuth){
            return NextResponse.redirect(new URL('/dashboard', req.url))
        }

        if (!isVerify) {
            if (!isAuth) {
                return NextResponse.redirect(new URL('/auth/login', req.url))
            }
            return NextResponse.next()
        }

        return NextResponse.next()
    } catch (err) {
        const res = NextResponse.redirect(new URL('/auth/login', req.url))
        res.cookies.delete('token')
        return res
    }
}

export const config = {
    matcher: ['/dashboard/:path*', '/logout/:path*', '/auth/:path*', '/verify/:path*']
}