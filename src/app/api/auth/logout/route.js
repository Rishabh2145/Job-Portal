// import { NextResponse } from "next/server";

// export async function POST(req) {
//   const body = await req.json();

//   const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API}/signin`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body),
//   });

//   const data = await backendRes.json();

  
//   const res = NextResponse.json({ success: true });
//   res.cookies.set("token", data.token, {
//     httpOnly: true,
//     secure: false,
//     sameSite: "lax",
//     path: "/",
//   });

//   return res;
// }
