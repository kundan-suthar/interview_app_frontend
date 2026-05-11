// app/api/login/route.ts
import { getErrorMessage } from "@/lib/api/errors";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log("from api/login");

  try {
    const formData = await request.formData();
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }
    console.log(`${process.env.NEXT_PUBLIC_API_URL}/login`)
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        username,
        password,
      }),
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: getErrorMessage(data.detail) },
        { status: response.status }
      );
    }
    console.log("login data ", data)

    // Forward any cookies from the backend
    // const nextResponse = NextResponse.json(data);

    // // If the backend sets cookies, forward them
    // const setCookie = response.headers.get("set-cookie");
    // if (setCookie) {
    //   nextResponse.headers.set("set-cookie", setCookie);
    // }

    const nextResponse = NextResponse.json({ access_token: data.access_token });

    nextResponse.cookies.set("refresh_token", data.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    nextResponse.cookies.set("is_verified", data.is_verified, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return nextResponse;

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}