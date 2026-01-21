import { NextResponse } from "next/server";

export async function GET(req) {
    const token = req.cookies.get("token")?.value;
    const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API}/user/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
        },
    });

    const data = await backendRes.json();

    return NextResponse.json(data);
}
