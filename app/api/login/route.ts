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

    const response = await fetch(`http://localhost:8000/auth/jwt/login`, {
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

    // Forward any cookies from the backend
    const nextResponse = NextResponse.json(data);
    
    // If the backend sets cookies, forward them
    const setCookie = response.headers.get("set-cookie");
    if (setCookie) {
      nextResponse.headers.set("set-cookie", setCookie);
    }

    return nextResponse;
    
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}