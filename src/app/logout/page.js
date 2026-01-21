'use client'

import { useEffect } from "react"

export default function Logout() {
    useEffect(() => {
        localStorage.removeItem('token')
        window.location.href = '/auth/login'
    }, [])
    return (
        <div>Logged Out</div>
    )
}