// app/api/login/route.ts
import { apiClient } from "@/lib/api/client";
import { getErrorMessage } from "@/lib/api/errors";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log("from api/dashboard");

  try {
    // const response = await apiClient("/api/dashboard/data")
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/data`)
    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { error: getErrorMessage(data.detail) },
        { status: response.status }
      );
    }
    const nextResponse = NextResponse.json(data);
    return nextResponse;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}